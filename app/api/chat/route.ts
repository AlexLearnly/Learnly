import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { messages, subject, mode, mistakes } = await req.json()

  const mistakeContext = mistakes?.length
    ? `The student has struggled with these topics before: ${mistakes.join(', ')}. Revisit them when relevant.`
    : ''

  const modeContext = mode === 'test'
    ? 'You are in TEST PREP mode. Quiz the student actively, give practice problems, be strict about correctness, and simulate exam conditions.'
    : 'You are in HOMEWORK HELP mode. Be a guide — walk through steps, explain concepts clearly, never just give the answer.'

  const systemPrompt = `You are Learnly, a warm, precise, and encouraging AI tutor. Current subject: ${subject}.

${modeContext}

${mistakeContext}

Rules:
- Keep responses under 200 words unless working through a multi-step problem
- When you notice the student struggles with a concept, add [weak: topic name] at the end of your message
- Be encouraging but precise — celebrate progress, gently correct mistakes
- Ask one follow-up question to check understanding after each explanation
- Adapt your language to the student's apparent level`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    })

    return NextResponse.json({ content: response.content[0].type === 'text' ? response.content[0].text : '' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
