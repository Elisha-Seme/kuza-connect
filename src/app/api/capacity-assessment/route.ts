import { anthropic } from '@/lib/anthropic'

export async function POST(request: Request) {
  const { orgName, orgType, country, answers } = await request.json()

  const answerText = Object.entries(answers as Record<string, string>)
    .map(([q, a]) => `- ${q}: ${a}`)
    .join('\n')

  const prompt = `You are an education capacity development expert at KuzaConnect. Analyse the following capacity assessment responses for an organisation and provide a structured capacity gap analysis.

Organisation: ${orgName}
Type: ${orgType}
Country: ${country}

Assessment Responses:
${answerText}

Provide a JSON response in this exact format:
{
  "overallScore": <number 1-100>,
  "overallLevel": "<Foundational | Developing | Established | Advanced>",
  "summary": "<2-3 sentence overall assessment>",
  "dimensions": [
    {
      "name": "Leadership & Strategy",
      "score": <1-100>,
      "level": "<Foundational|Developing|Established|Advanced>",
      "finding": "<key finding>",
      "recommendation": "<specific recommendation>"
    },
    {
      "name": "Technical Capacity",
      "score": <1-100>,
      "level": "<Foundational|Developing|Established|Advanced>",
      "finding": "<key finding>",
      "recommendation": "<specific recommendation>"
    },
    {
      "name": "Data & Learning Systems",
      "score": <1-100>,
      "level": "<Foundational|Developing|Established|Advanced>",
      "finding": "<key finding>",
      "recommendation": "<specific recommendation>"
    },
    {
      "name": "Financial Management",
      "score": <1-100>,
      "level": "<Foundational|Developing|Established|Advanced>",
      "finding": "<key finding>",
      "recommendation": "<specific recommendation>"
    },
    {
      "name": "Partnerships & Influence",
      "score": <1-100>,
      "level": "<Foundational|Developing|Established|Advanced>",
      "finding": "<key finding>",
      "recommendation": "<specific recommendation>"
    }
  ],
  "topPriorities": ["Priority 1", "Priority 2", "Priority 3"],
  "kuzaRecommendation": "<How KuzaConnect can specifically support this organisation>"
}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const result = JSON.parse(jsonMatch?.[0] ?? '{}')
    return Response.json(result)
  } catch {
    return Response.json({ error: 'Failed to parse assessment' }, { status: 500 })
  }
}
