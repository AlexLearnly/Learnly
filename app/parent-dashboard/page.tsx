'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

const MOCK_STUDENTS = [
  {
    name: 'Emma',
    grade: '9th Grade',
    sessions: 12,
    weakAreas: ['quadratic equations', 'verb conjugation'],
    subjects: ['Math', 'French'],
    mastery: 74,
    lastActive: '2 hours ago',
  },
  {
    name: 'Jake',
    grade: '7th Grade',
    sessions: 8,
    weakAreas: ['essay structure'],
    subjects: ['English', 'History'],
    mastery: 61,
    lastActive: 'Yesterday',
  },
]

export default function ParentDashboard() {
  const router   = useRouter()
  const supabase = createClient()
  const [user, setUser]           = useState<any>(null)
  const [selected, setSelected]   = useState(0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const role = user?.user_metadata?.role || 'parent'
  const isSchool = role === 'school'
  const name = user?.user_metadata?.full_name?.split(' ')[0] || 'there'
  const student = MOCK_STUDENTS[selected]

  return (
    <div className="min-h-screen bg-[#F2F7F4] font-sans">
      {/* NAV */}
      <nav className="bg-white border-b border-forest/10 px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <span className="text-xs bg-mist text-deep px-3 py-1 rounded-full font-medium">
            {isSchool ? '🏫 School account' : '👨‍👩‍👧 Parent account'}
          </span>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-forest transition-colors">Log out</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-1">
            {isSchool ? `${user?.user_metadata?.organization || 'Your school'} dashboard` : `Hey ${name} 👋`}
          </h1>
          <p className="text-gray-400 text-sm">
            {isSchool ? 'Monitor all your students\' progress in one place.' : 'Here\'s how your children are doing.'}
          </p>
        </div>

        {/* OVERVIEW STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: isSchool ? 'Total students' : 'Children',    value: MOCK_STUDENTS.length },
            { label: 'Total sessions',  value: MOCK_STUDENTS.reduce((a,s) => a + s.sessions, 0) },
            { label: 'Avg. mastery',    value: Math.round(MOCK_STUDENTS.reduce((a,s) => a + s.mastery, 0) / MOCK_STUDENTS.length) + '%' },
            { label: 'Weak areas',      value: MOCK_STUDENTS.reduce((a,s) => a + s.weakAreas.length, 0) },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-forest/10 p-5">
              <p className="font-serif text-2xl text-forest mb-1">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* STUDENT LIST */}
          <div className="md:col-span-1">
            <h2 className="font-medium text-ink mb-3 text-sm">
              {isSchool ? 'Students' : 'Children'}
            </h2>
            <div className="flex flex-col gap-2">
              {MOCK_STUDENTS.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${selected === i ? 'border-forest bg-white shadow-sm' : 'border-transparent bg-white/60 hover:bg-white'}`}
                >
                  <div className="w-9 h-9 bg-mist rounded-full flex items-center justify-center font-serif text-deep font-medium flex-shrink-0">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink text-sm">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.grade} · {s.lastActive}</p>
                  </div>
                  <div className="text-xs font-medium text-forest">{s.mastery}%</div>
                </button>
              ))}

              {/* ADD STUDENT */}
              <button className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-gray-200 text-left hover:border-forest transition-colors group">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-mist group-hover:text-forest transition-colors">+</div>
                <p className="text-sm text-gray-400 group-hover:text-forest transition-colors">
                  Add {isSchool ? 'student' : 'child'}
                </p>
              </button>
            </div>
          </div>

          {/* STUDENT DETAIL */}
          <div className="md:col-span-2">
            <h2 className="font-medium text-ink mb-3 text-sm">{student.name}'s progress</h2>
            <div className="bg-white rounded-2xl border border-forest/10 p-6">

              {/* MASTERY BAR */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-ink">Overall mastery</span>
                  <span className="text-sm font-medium text-forest">{student.mastery}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-2 bg-forest rounded-full transition-all" style={{ width: `${student.mastery}%` }} />
                </div>
              </div>

              {/* SUBJECTS */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 mb-3">ACTIVE SUBJECTS</p>
                <div className="flex gap-2 flex-wrap">
                  {student.subjects.map(s => (
                    <span key={s} className="text-xs px-3 py-1.5 bg-mist text-deep rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </div>

              {/* WEAK AREAS */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-400 mb-3">WEAK AREAS TO WATCH</p>
                {student.weakAreas.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {student.weakAreas.map(w => (
                      <span key={w} className="text-xs px-3 py-1.5 bg-amber/10 text-amber-800 rounded-full border border-amber/20">{w}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No weak areas identified yet.</p>
                )}
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Total sessions</p>
                  <p className="font-serif text-2xl text-ink">{student.sessions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Last active</p>
                  <p className="font-serif text-2xl text-ink">{student.lastActive}</p>
                </div>
              </div>
            </div>

            {/* NOTE */}
            <p className="text-xs text-gray-400 mt-3 text-center">
              Full real-time tracking coming soon — data shown is a preview.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
