'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

type Message = { role: 'user' | 'assistant'; content: string }

const QUICK_PROMPTS = [
  'Help me with homework',
  'Quiz me on my weak spots',
  'Explain a concept simply',
  'Check my answer',
]

export default function TutorPage() {
  const router       = useRouter()
  const params       = useSearchParams()
  const subject      = params.get('subject') || 'Math'
  const supabase     = createClient()

  const [messages,  setMessages]  = useState<Message[]>([])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [mode,      setMode]      = useState<'homework' | 'test'>('homework')
  const [mistakes,  setMistakes]  = useState<string[]>([])
  const [sessions,  setSessions]  = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
    })
    const stored = localStorage.getItem('learnly_mistakes')
    if (stored) setMistakes(JSON.parse(stored))
    const s = localStorage.getItem('learnly_sessions')
    const count = s ? parseInt(s) + 1 : 1
    setSessions(count)
    localStorage.setItem('learnly_sessions', String(count))

    // Greeting
    setMessages([{
      role: 'assistant',
      content: `Hi! I'm your ${subject} tutor. I'll track your weak spots as we go and make sure we revisit anything that trips you up.\n\nWhat are you working on today?`
    }])
  }, [subject])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function trackMistake(text: string) {
    const matches = text.match(/\[weak: ([^\]]+)\]/g)
    if (!matches) return
    const topics = matches.map(m => m.replace('[weak: ', '').replace(']', ''))
    const updated = Array.from(new Set([...mistakes, ...topics]))
    setMistakes(updated)
    localStorage.setItem('learnly_mistakes', JSON.stringify(updated))
  }

  async function send(text?: string) {
    const content = text || input.trim()
    if (!content || loading) return
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const userMsg: Message = { role: 'user', content }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map(m => ({ role: m.role, content: m.content })),
          subject, mode, mistakes,
        }),
      })
      const data = await res.json()
      const reply = data.content || 'Sorry, something went wrong.'
      trackMistake(reply)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error — please try again.' }])
    }
    setLoading(false)
  }

  function renderMessage(text: string) {
    return text
      .replace(/\[weak: ([^\]]+)\]/g, '<span class="inline-block text-xs px-2 py-0.5 bg-amber/20 text-amber-700 rounded mx-1">weak: $1</span>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="min-h-screen bg-[#F2F7F4] flex flex-col font-sans">
      {/* NAV */}
      <nav className="bg-white border-b border-forest/10 px-4 md:px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-forest transition-colors text-sm">← Back</Link>
          <span className="text-gray-200">|</span>
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('homework')}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${mode === 'homework' ? 'bg-mist text-deep border border-forest/20' : 'text-gray-400 hover:text-forest'}`}
          >Homework</button>
          <button
            onClick={() => setMode('test')}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${mode === 'test' ? 'bg-mist text-deep border border-forest/20' : 'text-gray-400 hover:text-forest'}`}
          >Test prep</button>
        </div>
      </nav>

      {/* SUBJECT HEADER */}
      <div className="bg-deep px-6 py-4 flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 bg-sage rounded-full flex items-center justify-center font-serif text-deep font-medium">L</div>
        <div>
          <p className="text-white font-medium text-sm">{subject} tutor</p>
          <p className="text-white/50 text-xs">Remembers your weak spots · {mode === 'test' ? 'Test prep mode' : 'Homework help mode'}</p>
        </div>
        {mistakes.length > 0 && (
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 bg-amber rounded-full" />
            <span className="text-white/60 text-xs">{mistakes.length} weak {mistakes.length === 1 ? 'area' : 'areas'} tracked</span>
          </div>
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 flex flex-col gap-4 max-w-3xl w-full mx-auto">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 items-end ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-7 h-7 bg-sage rounded-full flex items-center justify-center text-deep font-serif text-xs font-medium flex-shrink-0 mb-1">L</div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-forest text-white rounded-br-sm'
                  : 'bg-white border border-forest/10 text-gray-700 rounded-bl-sm'
              }`}
              dangerouslySetInnerHTML={{ __html: renderMessage(m.content) }}
            />
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 items-end">
            <div className="w-7 h-7 bg-sage rounded-full flex items-center justify-center text-deep font-serif text-xs font-medium flex-shrink-0 mb-1">L</div>
            <div className="bg-white border border-forest/10 rounded-2xl rounded-bl-sm px-4 py-3.5 flex gap-1.5">
              {[0, 200, 400].map(d => (
                <span key={d} className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce-dot" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* QUICK PROMPTS */}
      {messages.length <= 1 && (
        <div className="flex gap-2 px-4 md:px-6 pb-3 flex-wrap max-w-3xl mx-auto w-full">
          {QUICK_PROMPTS.map(p => (
            <button
              key={p}
              onClick={() => send(p)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-forest hover:text-forest transition-colors"
            >{p}</button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="bg-white border-t border-gray-100 px-4 md:px-6 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={`Ask a ${subject} question, paste a problem…`}
            className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors leading-relaxed font-sans"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="bg-forest text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-deep transition-colors disabled:opacity-40 flex-shrink-0"
          >Send</button>
        </div>
      </div>
    </div>
  )
}
