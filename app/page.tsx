'use client'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-forest/10 px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-500 hover:text-forest transition-colors">Features</a>
          <a href="#pricing"  className="text-sm text-gray-500 hover:text-forest transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login"  className="text-sm text-gray-600 hover:text-forest transition-colors px-3 py-2">Log in</Link>
          <Link href="/signup" className="text-sm font-medium bg-forest text-white px-4 py-2 rounded-lg hover:bg-deep transition-colors">Get started free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#D8F3DC,transparent)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-mist text-deep text-xs font-medium px-4 py-2 rounded-full mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 bg-sage rounded-full" />
            Now in early access
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-ink leading-[1.08] tracking-tight mb-6 animate-fade-up" style={{animationDelay:'0.1s'}}>
            The tutor that<br /><em className="text-forest">learns you.</em>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{animationDelay:'0.2s'}}>
            Learnly adapts to how you study — tracking mistakes, reinforcing weak spots, and helping you actually understand the material.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-up" style={{animationDelay:'0.3s'}}>
            <Link href="/signup" className="bg-forest text-white font-medium px-8 py-3.5 rounded-xl hover:bg-deep transition-all hover:-translate-y-0.5 text-sm">
              Start for free
            </Link>
            <a href="#features" className="text-gray-600 border border-gray-200 px-6 py-3.5 rounded-xl hover:border-forest hover:bg-mist transition-all text-sm">
              See how it works
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-6 animate-fade-up" style={{animationDelay:'0.4s'}}>
            No credit card required
          </p>
        </div>

        {/* CHAT PREVIEW */}
        <div className="relative z-10 mt-16 w-full max-w-lg bg-white rounded-2xl border border-forest/15 overflow-hidden shadow-[0_24px_80px_rgba(27,67,50,0.12)] animate-fade-up" style={{animationDelay:'0.5s'}}>
          <div className="bg-deep px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center font-serif text-sm text-deep font-medium">L</div>
            <div>
              <p className="text-white text-sm font-medium">Learnly</p>
              <p className="text-white/50 text-xs">Math · SAT prep mode</p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3 bg-white">
            <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-gray-700 leading-relaxed max-w-[85%]">
              You've missed quadratic equations 3 times this week. Let's tackle it now before your exam.
            </div>
            <div className="bg-forest text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed max-w-[85%] self-end">
              I always mess up the negative signs when factoring.
            </div>
            <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-gray-700 leading-relaxed max-w-[85%]">
              Exactly where most students slip up.{' '}
              <span className="inline-block text-xs px-2 py-0.5 bg-amber/20 text-amber-700 rounded">weak area: sign errors</span>
              <br /><br />
              Let's try one together — factor x² − 5x + 6.
            </div>
            <div className="flex gap-1 px-3 py-2.5 bg-gray-50 rounded-2xl rounded-bl-sm w-fit">
              {[0,200,400].map(d => (
                <span key={d} className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce-dot" style={{animationDelay:`${d}ms`}} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-[#F2F7F4] px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest text-sage mb-3">WHAT MAKES LEARNLY DIFFERENT</p>
          <h2 className="font-serif text-4xl md:text-5xl text-ink mb-4 tracking-tight">Not just a chatbot.<br /><em className="text-forest">A tutor that remembers.</em></h2>
          <p className="text-gray-400 max-w-md mx-auto mb-14">Every session makes Learnly smarter about how you learn.</p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[
              { icon: '🧠', title: 'Mistake memory',    desc: 'Tracks every concept you struggle with and brings it back at the right moment.' },
              { icon: '📚', title: 'All subjects',      desc: 'Math, science, history, English, coding — covered with the same depth.' },
              { icon: '📝', title: 'Homework help',     desc: 'Paste any problem and get a step-by-step walkthrough, not just the answer.' },
              { icon: '🎯', title: 'Test prep mode',    desc: 'Quizzes you on exactly what you\'re weak on, in the format your test uses.' },
              { icon: '📈', title: 'Progress tracking', desc: 'See your mastery grow with clear charts by topic.' },
              { icon: '👨‍👩‍👧', title: 'Family plans',     desc: 'Parents track multiple kids. Schools can seat entire classrooms.' },
            ].map(f => (
              <div key={f.title} className="bg-white border border-forest/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center text-lg mb-4">{f.icon}</div>
                <h3 className="font-medium text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-[#F2F7F4]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest text-sage mb-3">PRICING</p>
          <h2 className="font-serif text-4xl text-ink mb-2 tracking-tight">Start free. Upgrade when<br /><em className="text-forest">you're ready.</em></h2>
          <p className="text-gray-400 text-sm mb-14">No credit card required for the free tier.</p>
          <div className="grid md:grid-cols-3 gap-5 text-left">
            {/* Free */}
            <div className="bg-white border border-forest/10 rounded-2xl p-7">
              <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">FREE</p>
              <p className="font-serif text-5xl text-ink mb-1 tracking-tight">$0</p>
              <p className="text-xs text-gray-400 mb-6">forever</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                {['5 sessions per day','All subjects','Homework help','Basic progress tracking'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-mist flex items-center justify-center text-forest text-xs">✓</span>{i}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center border border-forest/30 text-forest text-sm font-medium py-3 rounded-xl hover:bg-mist transition-colors">
                Get started free
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-deep border-2 border-deep rounded-2xl p-7 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">MOST POPULAR</div>
              <p className="text-xs font-medium tracking-widest text-white/50 mb-2">PRO</p>
              <p className="font-serif text-5xl text-white mb-1 tracking-tight">$12</p>
              <p className="text-xs text-white/40 mb-6">per month</p>
              <ul className="space-y-3 mb-8 text-sm text-white/80">
                {['Unlimited sessions','Full mistake memory','Test prep mode','Advanced dashboard','Priority support'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-sage text-xs">✓</span>{i}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-sage text-deep text-sm font-semibold py-3 rounded-xl hover:bg-[#74c9a0] transition-colors">
                Start 7-day free trial
              </Link>
            </div>
            {/* Family */}
            <div className="bg-white border border-forest/10 rounded-2xl p-7">
              <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">FAMILY</p>
              <p className="font-serif text-5xl text-ink mb-1 tracking-tight">$29</p>
              <p className="text-xs text-gray-400 mb-6">per month · 5 seats</p>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                {['Everything in Pro','Up to 5 profiles','Parent dashboard','Bulk pricing available'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-mist flex items-center justify-center text-forest text-xs">✓</span>{i}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center border border-forest/30 text-forest text-sm font-medium py-3 rounded-xl hover:bg-mist transition-colors">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 py-8 flex items-center justify-between flex-wrap gap-4">
        <Logo />
        <p className="text-xs text-gray-400">© 2026 Learnly. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy','Terms','Contact'].map(l => (
            <a key={l} href="#" className="text-xs text-gray-400 hover:text-forest transition-colors">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
