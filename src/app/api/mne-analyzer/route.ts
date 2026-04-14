import { anthropic } from '@/lib/anthropic'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import JSZip from 'jszip'

// ─── text from PPTX (zip XML extraction) ───────────────────────────────────
async function extractPptxText(buffer: ArrayBuffer): Promise<string> {
  const zip = await JSZip.loadAsync(buffer)
  const slideFiles = Object.keys(zip.files).filter(
    (f) => f.startsWith('ppt/slides/slide') && f.endsWith('.xml')
  ).sort()
  const parts: string[] = []
  for (const file of slideFiles) {
    const xml = await zip.files[file].async('string')
    const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (text) parts.push(text)
  }
  return parts.join('\n\n')
}

// ─── text from RTF (strip control words) ───────────────────────────────────
function extractRtfText(rtf: string): string {
  return rtf
    .replace(/\\[a-z]+[-]?\d*[ ]?/g, '')
    .replace(/[{}\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? ''
    let reportText = ''
    let reportContext = ''
    let fileBuffer: ArrayBuffer | null = null
    let fileName = ''
    let fileType = ''
    let isPdf = false

    // ── Parse request ──────────────────────────────────────────────────────
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      reportContext = (form.get('reportContext') as string) ?? ''
      const file = form.get('file') as File | null

      if (file) {
        fileName = file.name
        fileType = file.type || ''
        const ext = fileName.split('.').pop()?.toLowerCase() ?? ''
        fileBuffer = await file.arrayBuffer()

        if (ext === 'pdf' || fileType === 'application/pdf') {
          isPdf = true
        } else if (ext === 'docx' || fileType.includes('wordprocessingml')) {
          const nodeBuffer = Buffer.from(fileBuffer)
          const result = await mammoth.extractRawText({ buffer: nodeBuffer })
          reportText = result.value
        } else if (['xlsx', 'xls'].includes(ext) || fileType.includes('spreadsheet') || fileType.includes('excel')) {
          const wb = XLSX.read(fileBuffer, { type: 'array' })
          const sheets: string[] = []
          wb.SheetNames.forEach((name) => {
            const csv = XLSX.utils.sheet_to_csv(wb.Sheets[name])
            sheets.push(`=== Sheet: ${name} ===\n${csv}`)
          })
          reportText = sheets.join('\n\n')
        } else if (ext === 'pptx' || fileType.includes('presentationml')) {
          reportText = await extractPptxText(fileBuffer)
        } else if (ext === 'rtf') {
          const rtf = new TextDecoder().decode(fileBuffer)
          reportText = extractRtfText(rtf)
        } else {
          reportText = new TextDecoder().decode(fileBuffer)
        }
      } else {
        reportText = (form.get('reportText') as string) ?? ''
      }
    } else {
      const body = await request.json()
      reportText = body.reportText ?? ''
      reportContext = body.reportContext ?? ''
    }

    // ── Validate ───────────────────────────────────────────────────────────
    if (!isPdf && (!reportText || reportText.trim().length < 50)) {
      return Response.json(
        { error: 'Could not extract enough text from the document. Please try a different format or paste the content manually.' },
        { status: 400 }
      )
    }

    // ── Build prompt ───────────────────────────────────────────────────────
    const analysisInstruction = `You are a monitoring and evaluation expert at KuzaConnect. Analyse the ${fileName ? `document "${fileName}"` : 'M&E report content'} and provide a structured analysis.

Context provided: ${reportContext || 'None'}

Respond with ONLY valid JSON in this exact format — no markdown, no code fences, no preamble:
{
  "title": "<inferred report title or 'M&E Report Analysis'>",
  "type": "<Assessment | Progress Report | Evaluation | Baseline | Endline | Other>",
  "keyFindings": [
    {"finding": "<finding>", "significance": "<High|Medium|Low>", "evidence": "<evidence from report>"}
  ],
  "achievements": ["<achievement 1>", "<achievement 2>", "<achievement 3>"],
  "risks": [
    {"risk": "<risk description>", "severity": "<High|Medium|Low>", "mitigation": "<suggested mitigation>"}
  ],
  "dataGaps": ["<gap 1>", "<gap 2>"],
  "recommendations": [
    {"recommendation": "<recommendation>", "priority": "<High|Medium|Low>", "owner": "<who should act>"}
  ],
  "overallAssessment": "<2-3 sentence overall assessment of programme performance>",
  "kuzaSupportAreas": ["<area where KuzaConnect could add value 1>", "<area 2>"]
}`

    // ── Call Claude ────────────────────────────────────────────────────────
    let message
    if (isPdf && fileBuffer) {
      const base64 = Buffer.from(fileBuffer).toString('base64')
      message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'document',
                source: { type: 'base64', media_type: 'application/pdf', data: base64 },
              },
              { type: 'text', text: analysisInstruction },
            ],
          },
        ],
      })
    } else {
      message = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `${analysisInstruction}\n\nReport Content:\n---\n${reportText.slice(0, 15000)}\n---`,
          },
        ],
      })
    }

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return Response.json({ error: 'Analysis produced an unexpected response. Please try again.' }, { status: 500 })
    }
    const result = JSON.parse(jsonMatch[0])
    return Response.json(result)

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred'
    console.error('[mne-analyzer]', err)
    return Response.json({ error: message }, { status: 500 })
  }
}
