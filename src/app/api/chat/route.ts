import { anthropic, KUZA_SYSTEM_PROMPT } from '@/lib/anthropic'

export async function POST(request: Request) {
  const { messages } = await request.json()

  if (!messages || !Array.isArray(messages)) {
    return Response.json({ error: 'Invalid messages' }, { status: 400 })
  }

  const stream = await anthropic.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: KUZA_SYSTEM_PROMPT,
    messages,
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}
