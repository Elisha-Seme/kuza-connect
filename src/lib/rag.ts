/**
 * RAG pipeline utilities.
 * - embedText()      — call Voyage AI to get a 512-dim embedding
 * - retrieveContext() — embed query, search Supabase pgvector, return context string
 */

import { createClient } from '@supabase/supabase-js'

// ── Supabase client (server-side only — uses service role key) ───────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key)
}

// ── Voyage AI embedding ───────────────────────────────────────────────────────
export async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.VOYAGE_API_KEY
  if (!apiKey) throw new Error('Missing VOYAGE_API_KEY')

  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'voyage-3-lite',
      input: [text],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Voyage AI error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.data[0].embedding as number[]
}

// ── Vector search ─────────────────────────────────────────────────────────────
interface MatchedChunk {
  id: string
  content: string
  metadata: { title: string; source: string }
  similarity: number
}

async function searchChunks(queryEmbedding: number[], topK = 4): Promise<MatchedChunk[]> {
  const supabase = getSupabase()

  const { data, error } = await supabase.rpc('match_site_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.45,
    match_count: topK,
  })

  if (error) throw new Error(`Supabase search error: ${error.message}`)
  return (data as MatchedChunk[]) ?? []
}

// ── Main RAG function ─────────────────────────────────────────────────────────
/**
 * Given a user query, returns a formatted context string to inject into the
 * system prompt. Returns null if no relevant chunks are found or if RAG is
 * not configured (missing env vars).
 */
export async function retrieveContext(query: string): Promise<string | null> {
  try {
    const embedding = await embedText(query)
    const chunks = await searchChunks(embedding)

    if (!chunks.length) return null

    const context = chunks
      .map((c, i) =>
        `[Source ${i + 1}: ${c.metadata?.title ?? c.id}]\n${c.content}`
      )
      .join('\n\n---\n\n')

    return context
  } catch (err) {
    // Silently degrade — chat still works, just without RAG context
    console.error('[RAG] retrieveContext failed:', err)
    return null
  }
}
