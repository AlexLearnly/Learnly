'use client'
import { useEffect, useRef, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

type ImageAttachment = { base64: string; mediaType: string; preview: string }
type Message = {
  role: 'user' | 'assistant'
  content: string
  image?: ImageAttachment
}

const QUICK_PROMPTS = [
  'Help me with homework',
  'Quiz me on my weak spots',
  'Explain a concept simply',
  'Check my answer',
]

function TutorContent() {
  const router   = useRouter()
  const params   = useSearchParams()
  const subject  = params.get('subject') || 'Math'
  const supabase = createClient()

  const [messages,  setMessages]  = useState<Message[]>([])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [mode,      setMode]      = useState<'homework' | 'test'>('homework')
  const [mistakes,  setMistakes]  = useState<string[]>([])
  const [image,     setImage]     = useState<ImageAttachment | null>(null)
  const bottomRef   = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
    })
    const stored = localStorage.getItem('learnly_mistakes')
    if (stored) setMistakes(JSON.parse(stored))
    const s = localStorage.getItem('learnly_sessions')
    const count = s ? parseInt(s) + 1 : 1
    localStorage.setItem('learnly_sessions', String(count))
    setMessages([{
      role: 'assistant',
      content: `Hi! I'm your ${subject} tutor. I'll track your weak spots as we go and make sure we revisit anything that trips you up.\n\nWhat are you working on today? You can also send me a photo of a problem!`
    }])
  }, [subject])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      setImage({ base64, mediaType: file.type, preview: result })
    }
    reader.readAsDataURL(file)
  }

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
    if ((!content && !image) || loading) return
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const userMsg: Message = { role: 'user', content: content || 'Here is my problem:', image: image || undefined }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated, subject, mode, mistakes }),
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

  const canSend = (input.trim() || image) && !loading

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
          <button onClick={() => setMode('homework')} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${mode === 'homework' ? 'bg-mist text-deep border border-forest/20' : 'text-gray-400 hover:text-forest'}`}>Homework</button>
          <button onClick={() => setMode('test')}     className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${mode === 'test'     ? 'bg-mist text-deep border border-forest/20' : 'text-gray-400 hover:text-forest'}`}>Test prep</button>
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
            <div className={`max-w-[80%] flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              {m.image && (
                <img
                  src={m.image.preview}
                  alt="Attached"
                  className="rounded-xl max-w-[240px] max-h-[200px] object-cover border border-forest/10"
                />
              )}
              {m.content && (
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-forest text-white rounded-br-sm' : 'bg-white border border-forest/10 text-gray-700 rounded-bl-sm'}`}
                  dangerouslySetInnerHTML={{ __html: renderMessage(m.content) }}
                />
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 items-end">
            <div className="w-7 h-7 bg-sage rounded-full flex items-center justify-center text-deep font-serif text-xs font-medium flex-shrink-0 mb-1">L</div>
            <div className="bg-white border border-forest/10 rounded-2xl rounded-bl-sm px-4 py-3.5 flex gap-1.5">
              {[0,200,400].map(d => <span key={d} className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce-dot" style={{animationDelay:`${d}ms`}} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* QUICK PROMPTS */}
      {messages.length <= 1 && (
        <div className="flex gap-2 px-4 md:px-6 pb-3 flex-wrap max-w-3xl mx-auto w-full">
          {QUICK_PROMPTS.map(p => (
            <button key={p} onClick={() => send(p)} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-forest hover:text-forest transition-colors">{p}</button>
          ))}
        </div>
      )}

      {/* INPUT AREA */}
      <div className="bg-white border-t border-gray-100 px-4 md:px-6 py-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {/* Image preview */}
          {image && (
            <div className="relative w-fit">
              <img src={image.preview} alt="Preview" className="h-20 w-auto rounded-xl border border-forest/20 object-cover" />
              <button
                onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white rounded-full text-xs flex items-center justify-center hover:bg-gray-800"
              >×</button>
            </div>
          )}
          <div className="flex gap-2 items-end">
            {/* Image upload button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-forest hover:text-forest transition-colors"
              title="Attach a photo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder={`Ask a ${subject} question or attach a photo…`}
              className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors leading-relaxed font-sans"
            />
            <button
              onClick={() => send()}
              disabled={!canSend}
              className="bg-forest text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-deep transition-colors disabled:opacity-40 flex-shrink-0"
            >Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TutorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2F7F4] flex items-center justify-center"><p className="text-gray-400 text-sm">Loading…</p></div>}>
      <TutorContent />
    </Suspense>
  )
}
