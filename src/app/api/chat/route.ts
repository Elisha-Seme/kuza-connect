import { anthropic } from '@/lib/anthropic'
import { retrieveContext } from '@/lib/rag'

const BASE_SYSTEM = `You are Kuza Assistant, a helpful AI for KuzaConnect — an education consulting organisation based in Nairobi, Kenya.

KuzaConnect helps governments, NGOs, and development partners build education system capacity across the Global South. They have 15+ years of experience, 100+ expert associates, and have worked in 20+ countries.

FORMATTING RULES — always follow these:
- Use **bold** for key terms, service names, and important phrases
- Use ## for a section heading when covering 2+ distinct topics
- Use bullet lists (- item) for 3 or more parallel points
- Use numbered lists (1. item) for sequential steps
- Use *italic* for emphasis or quoting a principle
- Keep responses concise, warm, and professional
- Never invent specific facts, numbers, or claims not in your context`

const RAG_SUFFIX = (context: string) => `

## RETRIEVED CONTEXT
Use the information below to answer the user's question accurately. Base your answer primarily on this context. If the question is not covered, answer from your general knowledge about KuzaConnect.

${context}

---
Answer only based on the above context and your knowledge of KuzaConnect. Do not fabricate details.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages' }, { status: 400 })
    }

    // Pull the latest user message to use as the RAG query
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')
    const query = lastUserMsg?.content ?? ''

    // Retrieve relevant context chunks (degrades gracefully if RAG not configured)
    const context = query ? await retrieveContext(query) : null

    const systemPrompt = context
      ? BASE_SYSTEM + RAG_SUFFIX(context)
      : BASE_SYSTEM

    const stream = await anthropic.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
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
  } catch (err) {
    console.error('[Chat API]', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
