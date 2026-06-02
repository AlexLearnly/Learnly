'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

const SUBJECTS = [
  { name: 'Math',        emoji: '📐' },
  { name: 'Science',     emoji: '🔬' },
  { name: 'History',     emoji: '📜' },
  { name: 'English',     emoji: '✏️' },
  { name: 'Programming', emoji: '💻' },
  { name: 'Economics',   emoji: '📊' },
  { name: 'French',      emoji: '🇫🇷' },
  { name: 'Spanish',     emoji: '🇪🇸' },
  { name: 'Chinese',     emoji: '🇨🇳' },
]

export default function Dashboard() {
  const router   = useRouter()
  const supabase = createClient()
  const [user, setUser]       = useState<any>(null)
  const [mistakes, setMistakes] = useState<string[]>([])
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
    const stored = localStorage.getItem('learnly_mistakes')
    if (stored) setMistakes(JSON.parse(stored))
    const s = localStorage.getItem('learnly_sessions')
    if (s) setSessions(parseInt(s))
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen bg-[#F2F7F4] font-sans">
      {/* NAV */}
      <nav className="bg-white border-b border-forest/10 px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden md:block">{user?.email}</span>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-forest transition-colors">Log out</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* GREETING */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-1">
            Hey {name} 👋
          </h1>
          <p className="text-gray-400">What are we studying today?</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Sessions',      value: sessions,         color: 'bg-mist text-deep' },
            { label: 'Weak areas',    value: mistakes.length,  color: 'bg-amber/20 text-amber-800' },
            { label: 'Subjects',      value: SUBJECTS.length,  color: 'bg-mist text-deep' },
            { label: 'Streak',        value: '🔥 1 day',       color: 'bg-mist text-deep' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-forest/10 p-5">
              <p className={`text-2xl font-serif font-medium mb-1 ${s.color.split(' ')[1]}`}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* SUBJECTS */}
        <h2 className="font-medium text-ink mb-4">Pick a subject</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {SUBJECTS.map(s => (
            <Link
              key={s.name}
              href={`/tutor?subject=${s.name}`}
              className="bg-white border border-forest/10 rounded-2xl p-6 flex items-center gap-4 hover:border-forest hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <p className="font-medium text-ink group-hover:text-forest transition-colors">{s.name}</p>
                <p className="text-xs text-gray-400">Start session →</p>
              </div>
            </Link>
          ))}
        </div>

        {/* WEAK AREAS */}
        {mistakes.length > 0 && (
          <div className="bg-white rounded-2xl border border-amber/30 p-6">
            <h2 className="font-medium text-ink mb-1">Your weak areas</h2>
            <p className="text-xs text-gray-400 mb-4">Learnly will revisit these in your next sessions</p>
            <div className="flex flex-wrap gap-2">
              {mistakes.map(m => (
                <span key={m} className="text-xs px-3 py-1.5 bg-amber/10 text-amber-800 rounded-full border border-amber/20">{m}</span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
