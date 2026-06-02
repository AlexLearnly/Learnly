import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const LANGUAGE_SUBJECTS = ['French', 'Spanish', 'Chinese']

export async function POST(req: NextRequest) {
  const { messages, subject, mode, mistakes } = await req.json()

  const isLanguage = LANGUAGE_SUBJECTS.includes(subject)

  const mistakeContext = mistakes?.length
    ? `The student has struggled with these topics before: ${mistakes.join(', ')}. Revisit them when relevant.`
    : ''

  const modeContext = mode === 'test'
    ? 'You are in TEST PREP mode. Quiz the student actively, give practice problems, be strict about correctness.'
    : 'You are in HOMEWORK HELP mode. Be a guide — walk through steps, explain concepts, never just give the answer.'

  const languageContext = isLanguage ? `
You are a ${subject} language tutor. Special rules for language tutoring:
- Correct grammar and spelling mistakes clearly but kindly
- When introducing vocabulary, show the word, its pronunciation guide, and an example sentence
- Mix in ${subject} phrases naturally in your responses (with English translations in parentheses)
- For Chinese: always show Pinyin alongside characters
- Focus on practical, conversational language as well as grammar fundamentals
- Use [weak: topic] for recurring grammar mistakes e.g. [weak: verb conjugation] or [weak: tones]
` : ''

  const systemPrompt = `You are Learnly, a warm, precise, and encouraging AI tutor. Current subject: ${subject}.
${modeContext}
${languageContext}
${mistakeContext}
General rules:
- Keep responses under 200 words unless working through a multi-step problem
- When you notice the student struggles with a concept, add [weak: topic name] at the end
- Be encouraging but precise
- If an image is attached, analyze it carefully and help with whatever problem or question it shows
- Ask one follow-up question to check understanding after each explanation`

  const formattedMessages = messages.map((m: any) => {
    if (m.image) {
      return {
        role: m.role,
        content: [
          { type: 'image', source: { type: 'base64', media_type: m.image.mediaType, data: m.image.base64 } },
          { type: 'text', text: m.content || 'Please help me with this problem.' }
        ]
      }
    }
    return { role: m.role, content: m.content }
  })

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: formattedMessages,
    })

    return NextResponse.json({ content: response.content[0].type === 'text' ? response.content[0].text : '' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 })
  }
}
