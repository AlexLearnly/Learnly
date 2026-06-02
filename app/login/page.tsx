'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Logo from '@/components/Logo'

type Role = 'student' | 'parent' | 'school'

const ROLES: { id: Role; label: string; emoji: string }[] = [
  { id: 'student', emoji: '🎒', label: 'Student' },
  { id: 'parent',  emoji: '👨‍👩‍👧', label: 'Parent' },
  { id: 'school',  emoji: '🏫', label: 'School / Tutor' },
]

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [role,     setRole]     = useState<Role>('student')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    // Route based on role metadata or selected role
    const userRole = data.user?.user_metadata?.role || role
    if (userRole === 'student') router.push('/dashboard')
    else router.push('/parent-dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F2F7F4] flex flex-col items-center justify-center px-4">
      <div className="mb-8"><Logo /></div>
      <div className="w-full max-w-sm bg-white rounded-2xl border border-forest/10 shadow-sm p-8">
        <h1 className="font-serif text-2xl text-ink mb-1 tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-400 mb-6">Log in to continue</p>

        {/* ROLE TABS */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${role === r.id ? 'bg-white text-ink shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span>{r.emoji}</span>
              <span className="hidden sm:inline">{r.label}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-forest transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-forest text-white font-medium py-3 rounded-xl hover:bg-deep transition-colors disabled:opacity-50 text-sm mt-2"
          >
            {loading ? 'Logging in…' : `Log in as ${role === 'school' ? 'school' : role}`}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-forest font-medium hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
