import { anthropic } from '@/lib/anthropic'

export async function POST(request: Request) {
  const { country, orgType, challenge, scale } = await request.json()

  const prompt = `You are a KuzaConnect service advisor. Based on the following details about a potential partner, recommend the most relevant KuzaConnect services and explain why they are a good fit.

Partner Details:
- Country/Region: ${country}
- Organisation Type: ${orgType}
- Primary Challenge: ${challenge}
- Scale of Work: ${scale}

KuzaConnect Service Areas:
METHODOLOGY: Foundation Learning, Teacher Development, Curriculum Development, Accountability Systems, Employability, Gender & Inclusion, EdTech
ORGANISATIONAL: Strategy, Policy Support, Business Growth/Fundraising, Solution Design, Project Management, Budget Management, M&E

Respond in this exact JSON format:
{
  "primaryService": "Name of the single most relevant service",
  "primaryReason": "2-3 sentence explanation of why this is the best fit",
  "additionalServices": ["Service 2", "Service 3"],
  "additionalReasons": ["Reason for service 2", "Reason for service 3"],
  "approach": "One paragraph describing how KuzaConnect would approach supporting this partner",
  "nextStep": "A specific, actionable next step they should take"
}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const result = JSON.parse(jsonMatch?.[0] ?? '{}')
    return Response.json(result)
  } catch {
    return Response.json({ error: 'Failed to parse recommendation' }, { status: 500 })
  }
}
