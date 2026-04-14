-- ─────────────────────────────────────────────────────────────────────────────
-- KuzaConnect RAG Setup — run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste and run
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Enable the pgvector extension
create extension if not exists vector;

-- 2. Create the documents table
--    voyage-3-lite produces 512-dimensional embeddings
create table if not exists site_documents (
  id       text primary key,
  content  text not null,
  metadata jsonb default '{}',
  embedding vector(512)
);

-- 3. Create an IVFFlat index for fast cosine similarity search
--    (run AFTER inserting data; skip on empty table — recreate after ingestion)
-- create index on site_documents using ivfflat (embedding vector_cosine_ops)
--   with (lists = 10);

-- 4. Similarity search function used by the chat API
create or replace function match_site_documents(
  query_embedding vector(512),
  match_threshold float default 0.45,
  match_count     int   default 4
)
returns table(
  id         text,
  content    text,
  metadata   jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) as similarity
  from site_documents
  where 1 - (embedding <=> query_embedding) > match_threshold
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- 5. Row Level Security — allow public read (content is non-sensitive)
alter table site_documents enable row level security;

create policy "Public read access"
  on site_documents for select
  using (true);

-- Done. Now:
--   1. Add VOYAGE_API_KEY and SUPABASE_SERVICE_ROLE_KEY to .env.local
--   2. Run: node scripts/ingest.mjs
--   3. Deploy to Vercel (add both env vars there too)
