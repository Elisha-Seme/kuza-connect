/**
 * KuzaConnect RAG Ingestion Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Run once (and re-run whenever site content changes):
 *   node scripts/ingest.mjs
 *
 * Required env vars (in .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   VOYAGE_API_KEY
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// ── Load .env.local ──────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url)
const __dir = dirname(__filename)
const envPath = join(__dir, '..', '.env.local')

try {
  const raw = readFileSync(envPath, 'utf-8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
  console.log('✓ Loaded .env.local')
} catch {
  console.warn('⚠  Could not load .env.local — using existing environment variables')
}

// ── Validate env ─────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const VOYAGE_KEY   = process.env.VOYAGE_API_KEY

if (!SUPABASE_URL || !SUPABASE_KEY || !VOYAGE_KEY) {
  console.error('\n❌ Missing required environment variables:')
  if (!SUPABASE_URL) console.error('   • NEXT_PUBLIC_SUPABASE_URL')
  if (!SUPABASE_KEY) console.error('   • SUPABASE_SERVICE_ROLE_KEY')
  if (!VOYAGE_KEY)   console.error('   • VOYAGE_API_KEY')
  console.error('\nAdd them to your .env.local file and re-run.\n')
  process.exit(1)
}

// ── Load content chunks ───────────────────────────────────────────────────────
// We import the compiled JS (ts-node not required — Next.js compiles to .next)
// For the script, we read and eval the TypeScript as plain text via a simple parse.
// To avoid needing tsx/ts-node, we just inline the chunk extraction here.

const require = createRequire(import.meta.url)

let SITE_CHUNKS
try {
  // Try loading from the compiled Next.js output first
  const mod = require('../.next/server/chunks/site-content.js')
  SITE_CHUNKS = mod.SITE_CHUNKS
} catch {
  // Fallback: parse the TypeScript source directly
  const src = readFileSync(join(__dir, '..', 'src', 'lib', 'site-content.ts'), 'utf-8')
  // Strip TypeScript-only syntax and evaluate
  const jsCode = src
    .replace(/^export type[\s\S]*?^}/gm, '')
    .replace(/^import[\s\S]*?from.*$/gm, '')
    .replace(/: ContentChunk\[\]/g, '')
    .replace(/export const /g, 'const ')
  // Use a scoped eval
  const fn = new Function(`${jsCode}\n return SITE_CHUNKS`)
  SITE_CHUNKS = fn()
}

if (!SITE_CHUNKS || !SITE_CHUNKS.length) {
  console.error('❌ Could not load SITE_CHUNKS from site-content.ts')
  process.exit(1)
}

console.log(`✓ Loaded ${SITE_CHUNKS.length} content chunks`)

// ── Voyage AI embedding ───────────────────────────────────────────────────────
async function embedBatch(texts) {
  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VOYAGE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'voyage-3-lite',
      input: texts,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Voyage AI error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.data.map((d) => d.embedding)
}

// ── Supabase upsert ──────────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function upsertChunks(chunks, embeddings) {
  const rows = chunks.map((chunk, i) => ({
    id: chunk.id,
    content: chunk.content,
    metadata: { title: chunk.title, source: chunk.source },
    embedding: embeddings[i],
  }))

  const { error } = await supabase
    .from('site_documents')
    .upsert(rows, { onConflict: 'id' })

  if (error) throw new Error(`Supabase upsert error: ${error.message}`)
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 Starting ingestion...\n')

  // Process in batches of 8 (Voyage AI limit per request is 128, but we keep it small)
  const BATCH = 8
  let processed = 0

  for (let i = 0; i < SITE_CHUNKS.length; i += BATCH) {
    const batch = SITE_CHUNKS.slice(i, i + BATCH)
    const texts = batch.map((c) => `${c.title}\n\n${c.content}`)

    process.stdout.write(`  Embedding batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(SITE_CHUNKS.length / BATCH)}...`)

    const embeddings = await embedBatch(texts)
    await upsertChunks(batch, embeddings)

    processed += batch.length
    console.log(` ✓ (${processed}/${SITE_CHUNKS.length} chunks)`)

    // Small delay to respect rate limits
    if (i + BATCH < SITE_CHUNKS.length) {
      await new Promise((r) => setTimeout(r, 300))
    }
  }

  console.log(`\n✅ Ingestion complete! ${SITE_CHUNKS.length} chunks stored in Supabase.\n`)
  console.log('Your RAG chatbot is ready. Restart your dev server to pick up the changes.\n')
}

main().catch((err) => {
  console.error('\n❌ Ingestion failed:', err.message)
  process.exit(1)
})
