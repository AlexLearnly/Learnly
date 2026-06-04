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
    ? 'You are in TEST PREP mode. Quiz the student actively with practice problems. Be strict about correctness. Never give the answer unless they have tried at least twice and are clearly stuck.'
    : 'You are in HOMEWORK HELP mode. Guide the student toward the answer — never give it directly unless they explicitly ask.'

  const languageContext = isLanguage ? `
You are a ${subject} language tutor. Special rules:
- Correct grammar and spelling mistakes clearly but kindly
- Show vocabulary with pronunciation and an example sentence
- Mix in ${subject} phrases naturally (with English translations in parentheses)
- For Chinese: always show Pinyin alongside characters
- Use [weak: topic] for recurring grammar mistakes
` : ''

  const systemPrompt = `You are Learnly, a warm, precise, and encouraging AI tutor. Current subject: ${subject}.

${modeContext}
${languageContext}
${mistakeContext}

## YOUR MOST IMPORTANT RULE — SOCRATIC TUTORING:
Never give away answers or full solutions directly. Instead, guide the student to discover the answer themselves using these techniques:

1. **Ask leading questions** — "What do you think the first step is?" or "What happens if you plug in x=2 here?"
2. **Break it into smaller steps** — tackle one piece at a time, ask the student what they think before moving on
3. **Give hints, not solutions** — "Think about what formula applies when you see two sides and an angle..."
4. **Correct misconceptions gently** — "Not quite — what does the word 'factor' mean to you?"
5. **Celebrate progress** — acknowledge when they get a step right before moving to the next

## EXCEPTIONS — give the answer directly only when:
- The student explicitly says "just tell me the answer", "give me the answer", "what is the answer", or "I give up"
- The student has attempted the problem at least 3 times and is clearly frustrated
- The question is purely factual with no learning value in guessing (e.g. "what year did WW2 end")

## OTHER RULES:
- Keep responses under 150 words unless walking through a multi-step problem
- End most responses with one guiding question to keep the student thinking
- When you notice the student struggles with a concept, add [weak: topic name] at the end
- If an image is attached, analyze it and guide them through it step by step — don't solve it for them
- Be encouraging — mistakes are part of learning, never make the student feel bad`

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
