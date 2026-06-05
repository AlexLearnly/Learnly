'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

const SUBJECTS = [
  { name: 'Math',        emoji: '📐', color: 'from-blue-50 to-blue-100',   accent: '#3B82F6', light: '#EFF6FF' },
  { name: 'Science',     emoji: '🔬', color: 'from-purple-50 to-purple-100', accent: '#8B5CF6', light: '#F5F3FF' },
  { name: 'History',     emoji: '📜', color: 'from-amber-50 to-amber-100',  accent: '#F59E0B', light: '#FFFBEB' },
  { name: 'English',     emoji: '✏️', color: 'from-rose-50 to-rose-100',    accent: '#F43F5E', light: '#FFF1F2' },
  { name: 'Programming', emoji: '💻', color: 'from-teal-50 to-teal-100',    accent: '#14B8A6', light: '#F0FDFA' },
  { name: 'Economics',   emoji: '📊', color: 'from-green-50 to-green-100',  accent: '#22C55E', light: '#F0FDF4' },
  { name: 'French',      emoji: '🇫🇷', color: 'from-indigo-50 to-indigo-100', accent: '#6366F1', light: '#EEF2FF' },
  { name: 'Spanish',     emoji: '🇪🇸', color: 'from-orange-50 to-orange-100', accent: '#F97316', light: '#FFF7ED' },
  { name: 'Chinese',     emoji: '🇨🇳', color: 'from-red-50 to-red-100',     accent: '#EF4444', light: '#FEF2F2' },
]

const TIPS = [
  'Try explaining a concept back to Learnly — teaching is the best way to learn.',
  'Struggling with a topic? Ask Learnly to explain it 3 different ways.',
  'Photo a problem from your textbook and Learnly will walk you through it.',
  'Use Test Prep mode the night before an exam for a targeted review.',
  'Your weak areas are tracked automatically — revisit them often.',
]

export default function Dashboard() {
  const router   = useRouter()
  const supabase = createClient()
  const [user,     setUser]     = useState<any>(null)
  const [mistakes, setMistakes] = useState<string[]>([])
  const [sessions, setSessions] = useState(0)
  const [tip,      setTip]      = useState(0)
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
    const stored = localStorage.getItem('learnly_mistakes')
    if (stored) setMistakes(JSON.parse(stored))
    const s = localStorage.getItem('learnly_sessions')
    if (s) setSessions(parseInt(s))
    setTip(Math.floor(Math.random() * TIPS.length))

    const h = new Date().getHours()
    setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening')
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there'
  const mastery = sessions > 0 ? Math.min(Math.round((sessions * 8) + (mistakes.length * -3) + 40), 100) : 0

  return (
    <div className="min-h-screen bg-[#F2F7F4] font-sans">

      {/* NAV */}
      <nav className="bg-white border-b border-forest/10 px-6 h-16 flex items-center justify-between sticky top-0 z-10">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-mist px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-sage rounded-full" />
            <span className="text-xs font-medium text-deep">Free plan</span>
          </div>
          <button className="text-xs font-medium bg-forest text-white px-4 py-2 rounded-lg hover:bg-deep transition-colors">Upgrade to Pro</button>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-forest transition-colors ml-1">Log out</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* HERO GREETING */}
        <div className="relative bg-deep rounded-3xl px-8 py-8 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_100%_50%,rgba(82,183,136,0.15),transparent)] pointer-events-none" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-10">
            <div className="font-serif text-[120px] text-white leading-none">L</div>
          </div>
          <div className="relative z-10">
            <p className="text-white/50 text-sm mb-1">{greeting} 👋</p>
            <h1 className="font-serif text-3xl md:text-4xl text-white tracking-tight mb-3">
              Ready to learn, <span className="text-sage">{name}?</span>
            </h1>
            <p className="text-white/60 text-sm max-w-md">
              {sessions === 0
                ? 'Pick a subject below to start your first session.'
                : `You've completed ${sessions} session${sessions !== 1 ? 's' : ''}. Keep going — consistency is everything.`}
            </p>

            {/* PROGRESS BAR */}
            {sessions > 0 && (
              <div className="mt-5 max-w-sm">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/50 text-xs">Overall mastery</span>
                  <span className="text-sage text-xs font-medium">{mastery}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full">
                  <div className="h-1.5 bg-sage rounded-full transition-all duration-700" style={{ width: `${mastery}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Sessions completed', value: sessions,        icon: '🎯', bg: 'bg-white' },
            { label: 'Weak areas tracked', value: mistakes.length, icon: '⚡', bg: 'bg-white' },
            { label: 'Subjects available', value: SUBJECTS.length, icon: '📚', bg: 'bg-white' },
            { label: 'Day streak',          value: sessions > 0 ? '🔥 ' + Math.min(sessions, 7) : '—', icon: '', bg: 'bg-white' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl border border-forest/8 px-5 py-4`}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-serif text-2xl text-ink font-medium mb-0.5">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* SUBJECTS GRID */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-ink">Choose a subject</h2>
              <span className="text-xs text-gray-400">{SUBJECTS.length} available</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUBJECTS.map(s => (
                <Link
                  key={s.name}
                  href={`/tutor?subject=${s.name}`}
                  className={`bg-gradient-to-br ${s.color} rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.02] hover:shadow-md transition-all border border-white group`}
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <p className="font-medium text-ink text-sm group-hover:text-forest transition-colors">{s.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Start session →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">

            {/* DAILY TIP */}
            <div className="bg-white rounded-2xl border border-forest/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">💡</span>
                <p className="text-xs font-medium text-gray-400 tracking-wide">STUDY TIP</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">"{TIPS[tip]}"</p>
            </div>

            {/* WEAK AREAS */}
            <div className="bg-white rounded-2xl border border-forest/10 p-5 flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">⚡</span>
                <p className="text-xs font-medium text-gray-400 tracking-wide">WEAK AREAS</p>
              </div>
              {mistakes.length > 0 ? (
                <>
                  <p className="text-xs text-gray-400 mb-3">Learnly will focus on these in your next sessions.</p>
                  <div className="flex flex-wrap gap-2">
                    {mistakes.map(m => (
                      <span key={m} className="text-xs px-2.5 py-1 bg-amber/10 text-amber-800 rounded-full border border-amber/20">{m}</span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <p className="text-sm text-gray-400">No weak areas yet.</p>
                  <p className="text-xs text-gray-300 mt-1">Start a session and Learnly will track them automatically.</p>
                </div>
              )}
            </div>

            {/* TEST PREP SHORTCUT */}
            <Link href="/test-prep" className="bg-amber/10 border border-amber/20 rounded-2xl p-5 block hover:bg-amber/20 transition-colors">
              <p className="text-amber-800 font-medium text-sm mb-1 flex items-center gap-2"><span>🎯</span> Test Prep Center</p>
              <p className="text-amber-700/60 text-xs mb-3">SAT, LSAT, MCAT, Bar Exam, GRE and more.</p>
              <span className="text-xs font-semibold text-amber-800">Browse all exams →</span>
            </Link>

            {/* QUICK START */}
            <div className="bg-forest rounded-2xl p-5">
              <p className="text-white font-medium text-sm mb-1">Continue where you left off</p>
              <p className="text-white/60 text-xs mb-4">Jump back into your last subject.</p>
              <Link
                href="/tutor?subject=Math"
                className="block text-center bg-white text-forest text-xs font-semibold py-2.5 rounded-xl hover:bg-mist transition-colors"
              >
                Start session →
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
