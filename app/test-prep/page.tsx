'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

const EXAMS = [
  {
    category: 'College Admissions',
    tests: [
      { id: 'SAT',  name: 'SAT',  icon: '📝', desc: 'Math, Reading & Writing', time: '2h 14m', sections: ['Math', 'Reading & Writing'], difficulty: 'High School' },
      { id: 'ACT',  name: 'ACT',  icon: '📝', desc: 'English, Math, Reading, Science', time: '2h 55m', sections: ['English', 'Math', 'Reading', 'Science'], difficulty: 'High School' },
      { id: 'PSAT', name: 'PSAT', icon: '📝', desc: 'Practice SAT for 10th–11th grade', time: '2h 4m', sections: ['Math', 'Reading & Writing'], difficulty: 'High School' },
    ]
  },
  {
    category: 'Graduate Admissions',
    tests: [
      { id: 'GRE',  name: 'GRE',  icon: '🎓', desc: 'Verbal, Quantitative, Analytical Writing', time: '1h 58m', sections: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'], difficulty: 'Graduate' },
      { id: 'GMAT', name: 'GMAT', icon: '🎓', desc: 'Business school admissions', time: '2h 15m', sections: ['Quantitative', 'Verbal', 'Data Insights'], difficulty: 'Graduate' },
      { id: 'LSAT', name: 'LSAT', icon: '⚖️', desc: 'Law school admissions', time: '2h 20m', sections: ['Logical Reasoning', 'Analytical Reasoning', 'Reading Comprehension'], difficulty: 'Graduate' },
      { id: 'MCAT', name: 'MCAT', icon: '🩺', desc: 'Medical school admissions', time: '7h 30m', sections: ['Bio/Biochem', 'Chem/Physics', 'Psych/Sociology', 'CARS'], difficulty: 'Graduate' },
    ]
  },
  {
    category: 'Professional Licensing',
    tests: [
      { id: 'BAR',   name: 'Bar Exam',   icon: '⚖️', desc: 'State bar licensing for lawyers', time: '2 days', sections: ['MBE', 'MEE', 'MPT'], difficulty: 'Professional' },
      { id: 'CPA',   name: 'CPA Exam',   icon: '💼', desc: 'Certified Public Accountant', time: '4 sections', sections: ['AUD', 'FAR', 'REG', 'BAR'], difficulty: 'Professional' },
      { id: 'USMLE', name: 'USMLE',      icon: '🩺', desc: 'United States Medical Licensing', time: '8h per step', sections: ['Step 1', 'Step 2 CK', 'Step 3'], difficulty: 'Professional' },
      { id: 'PE',    name: 'PE Exam',    icon: '⚙️', desc: 'Professional Engineer licensing', time: '8h', sections: ['Morning', 'Afternoon'], difficulty: 'Professional' },
    ]
  },
  {
    category: 'Language Proficiency',
    tests: [
      { id: 'TOEFL', name: 'TOEFL', icon: '🌐', desc: 'English proficiency for universities', time: '3h', sections: ['Reading', 'Listening', 'Speaking', 'Writing'], difficulty: 'All levels' },
      { id: 'IELTS', name: 'IELTS', icon: '🌐', desc: 'International English language testing', time: '2h 45m', sections: ['Listening', 'Reading', 'Writing', 'Speaking'], difficulty: 'All levels' },
      { id: 'DELF',  name: 'DELF/DALF', icon: '🇫🇷', desc: 'French language certification', time: 'Varies', sections: ['Comprehension', 'Production'], difficulty: 'All levels' },
    ]
  },
  {
    category: 'High School & AP',
    tests: [
      { id: 'AP', name: 'AP Exams',   icon: '📚', desc: 'Advanced Placement — all subjects', time: '2–3h', sections: ['Multiple Choice', 'Free Response'], difficulty: 'High School' },
      { id: 'IB', name: 'IB Diploma', icon: '📚', desc: 'International Baccalaureate', time: 'Varies', sections: ['Internal Assessment', 'External Exams'], difficulty: 'High School' },
    ]
  },
]

const STRATEGIES = [
  { icon: '🧠', name: 'Spaced repetition',   desc: 'Review material at increasing intervals to lock it into long-term memory.' },
  { icon: '⏱️', name: 'Timed practice',      desc: 'Simulate real test conditions to build speed and reduce anxiety.' },
  { icon: '❌', name: 'Wrong answer review', desc: 'Study your mistakes more than your correct answers — that is where growth is.' },
  { icon: '🗣️', name: 'Active recall',       desc: 'Test yourself without looking at notes. Forces your brain to retrieve information.' },
  { icon: '✍️', name: 'Feynman technique',   desc: 'Explain concepts in simple terms as if teaching someone else.' },
  { icon: '📊', name: 'Weakness targeting',  desc: 'Learnly identifies your weak sections and drills those hardest.' },
]

const DIFF_COLORS: Record<string, string> = {
  'High School':  'bg-blue-50 text-blue-700',
  'Graduate':     'bg-purple-50 text-purple-700',
  'Professional': 'bg-amber/10 text-amber-800',
  'All levels':   'bg-mist text-deep',
}

export default function TestPrepPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = EXAMS.map(cat => ({
    ...cat,
    tests: cat.tests.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => cat.tests.length > 0)

  const selectedExam = EXAMS.flatMap(c => c.tests).find(t => t.id === selected)

  return (
    <div className="min-h-screen bg-[#F2F7F4] font-sans">
      <nav className="bg-white border-b border-forest/10 px-6 h-16 flex items-center justify-between sticky top-0 z-10">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-forest transition-colors">← Dashboard</Link>
          <Link href="/signup" className="text-sm font-medium bg-forest text-white px-4 py-2 rounded-lg hover:bg-deep transition-colors">Get started free</Link>
        </div>
      </nav>

      <div className="bg-deep px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sage/20 text-sage text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            🎯 Powered by AI · All major exams covered
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white tracking-tight mb-4">
            Ace any exam.<br /><em className="text-sage">With a tutor that knows the test.</em>
          </h1>
          <p className="text-white/60 text-sm max-w-lg mx-auto mb-6">
            Learnly knows the format, question types, and scoring of every major exam. It drills your weak areas, simulates real test conditions, and teaches you proven strategies.
          </p>
          <div className="flex items-center max-w-sm mx-auto bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exams — SAT, Bar, MCAT…" className="bg-transparent text-white placeholder-white/40 text-sm outline-none flex-1" />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {!selected ? (
          <>
            {filtered.map(cat => (
              <div key={cat.category} className="mb-10">
                <h2 className="font-medium text-ink mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-forest rounded-full inline-block" />{cat.category}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {cat.tests.map(test => (
                    <button key={test.id} onClick={() => setSelected(test.id)} className="bg-white border border-forest/10 rounded-2xl p-5 text-left hover:border-forest hover:shadow-md hover:-translate-y-0.5 transition-all group">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{test.icon}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${DIFF_COLORS[test.difficulty]}`}>{test.difficulty}</span>
                      </div>
                      <h3 className="font-medium text-ink mb-1 group-hover:text-forest transition-colors">{test.name}</h3>
                      <p className="text-xs text-gray-400 mb-3 leading-relaxed">{test.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>⏱ {test.time}</span><span>·</span><span>{test.sections.length} sections</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-6 bg-white rounded-2xl border border-forest/10 p-8">
              <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">BUILT-IN STUDY STRATEGIES</p>
              <h2 className="font-serif text-2xl text-ink mb-6 tracking-tight">How Learnly helps you <em className="text-forest">actually prepare.</em></h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {STRATEGIES.map(s => (
                  <div key={s.name} className="flex gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
                    <div>
                      <p className="font-medium text-ink text-sm mb-1">{s.name}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : selectedExam && (
          <div className="max-w-3xl mx-auto">
            <button onClick={() => setSelected(null)} className="text-sm text-gray-400 hover:text-forest transition-colors mb-6 flex items-center gap-1">← Back to all exams</button>
            <div className="bg-white rounded-2xl border border-forest/10 p-7 mb-5">
              <div className="flex items-start gap-4 mb-5">
                <span className="text-4xl">{selectedExam.icon}</span>
                <div>
                  <h2 className="font-serif text-3xl text-ink tracking-tight">{selectedExam.name}</h2>
                  <p className="text-gray-400 text-sm">{selectedExam.desc}</p>
                </div>
                <span className={`ml-auto text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0 ${DIFF_COLORS[selectedExam.difficulty]}`}>{selectedExam.difficulty}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F2F7F4] rounded-xl p-4"><p className="text-xs text-gray-400 mb-1">Test duration</p><p className="font-medium text-ink text-sm">⏱ {selectedExam.time}</p></div>
                <div className="bg-[#F2F7F4] rounded-xl p-4"><p className="text-xs text-gray-400 mb-1">Sections</p><p className="font-medium text-ink text-sm">📋 {selectedExam.sections.length} sections</p></div>
                <div className="bg-[#F2F7F4] rounded-xl p-4"><p className="text-xs text-gray-400 mb-1">Mode</p><p className="font-medium text-ink text-sm">🎯 Adaptive AI</p></div>
              </div>
              <p className="text-xs font-medium tracking-widest text-gray-400 mb-3">SECTIONS WE COVER</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedExam.sections.map(s => <span key={s} className="text-xs px-3 py-1.5 bg-mist text-deep rounded-full font-medium">{s}</span>)}
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href={`/tutor?subject=${selectedExam.name}&mode=test`} className="flex flex-col gap-1 bg-forest text-white rounded-xl p-4 hover:bg-deep transition-colors">
                  <span className="font-medium text-sm">🎯 Start practice session</span>
                  <span className="text-white/60 text-xs">Guided prep — Learnly asks, you answer</span>
                </Link>
                <Link href={`/tutor?subject=${selectedExam.name}&mode=test&timed=true`} className="flex flex-col gap-1 bg-deep text-white rounded-xl p-4 hover:bg-black/80 transition-colors border border-white/10">
                  <span className="font-medium text-sm">⏱ Timed mock exam</span>
                  <span className="text-white/60 text-xs">Simulate real test conditions with a timer</span>
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-forest/10 p-6">
              <h3 className="font-medium text-ink mb-4">💡 Top strategies for the {selectedExam.name}</h3>
              <div className="flex flex-col gap-3">
                {[
                  'Master the format first — know exactly how many questions, what types, and how scoring works.',
                  'Focus on your weak sections. Learnly tracks these automatically and drills them hardest.',
                  'Do timed practice from day one — timing anxiety is one of the biggest score killers.',
                  'Review every wrong answer in detail. Understanding why you got it wrong is more valuable than getting 10 more right.',
                  'In the final week, do full mock exams back to back to build stamina.',
                ].map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-mist text-deep rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">{i+1}</span>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
