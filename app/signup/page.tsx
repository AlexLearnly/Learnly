'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

type Role = 'student' | 'parent' | 'school'

const ROLES: { id: Role; label: string; emoji: string; desc: string }[] = [
  { id: 'student', emoji: '🎒', label: 'Student',        desc: 'I want to learn and get homework help' },
  { id: 'parent',  emoji: '👨‍👩‍👧', label: 'Parent',         desc: 'I want to track my child\'s progress' },
  { id: 'school',  emoji: '🏫', label: 'School / Tutor', desc: 'I manage multiple students' },
]

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()
  const [role,     setRole]     = useState<Role | null>(null)
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [org,      setOrg]      = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!role) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name, role, organization: org } }
    })
    if (error) { setError(error.message); setLoading(false) }
    else {
      if (role === 'student') router.push('/dashboard')
      else router.push('/parent-dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F7F4] flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8"><Logo /></div>
      <div className="w-full max-w-md bg-white rounded-2xl border border-forest/10 shadow-sm p-8">
        <h1 className="font-serif text-2xl text-ink mb-1 tracking-tight">Create your account</h1>
        <p className="text-sm text-gray-400 mb-7">Start learning smarter — it's free</p>

        {/* ROLE SELECTOR */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 mb-3">I am a…</p>
          <div className="flex flex-col gap-2">
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${role === r.id ? 'border-forest bg-mist' : 'border-gray-200 hover:border-forest/40'}`}
              >
                <span className="text-xl">{r.emoji}</span>
                <div>
                  <p className={`text-sm font-medium ${role === r.id ? 'text-deep' : 'text-ink'}`}>{r.label}</p>
                  <p className="text-xs text-gray-400">{r.desc}</p>
                </div>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 flex-shrink-0 ${role === r.id ? 'border-forest bg-forest' : 'border-gray-300'}`} />
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        {role && (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                {role === 'school' ? 'Your name' : 'Full name'}
              </label>
              <input
                type="text" required value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                placeholder={role === 'parent' ? 'Jane Smith' : role === 'school' ? 'Mr. Johnson' : 'Alex'}
              />
            </div>
            {(role === 'school') && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">School / Organization name</label>
                <input
                  type="text" value={org}
                  onChange={e => setOrg(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                  placeholder="Lincoln High School"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Password</label>
              <input
                type="password" required minLength={6} value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
                placeholder="Min. 6 characters"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full bg-forest text-white font-medium py-3 rounded-xl hover:bg-deep transition-colors disabled:opacity-50 text-sm mt-2"
            >
              {loading ? 'Creating account…' : `Create ${role === 'school' ? 'school' : role} account`}
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-forest font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
