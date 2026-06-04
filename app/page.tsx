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

          {/* VALUE PROP BADGE */}
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 text-amber-800 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-up">
            💸 Private tutors cost $60–$100/hr. Learnly costs $12/month.
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-ink leading-[1.08] tracking-tight mb-6 animate-fade-up" style={{animationDelay:'0.1s'}}>
            Your personal tutor.<br /><em className="text-forest">Without the price tag.</em>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up" style={{animationDelay:'0.2s'}}>
            Learnly replaces expensive tutors with AI that remembers your mistakes, adapts to how you learn, and is available 24/7 — for less than a single tutoring session.
          </p>

          {/* PRICE COMPARISON */}
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap animate-fade-up" style={{animationDelay:'0.25s'}}>
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">
              <span className="text-sm line-through text-red-400 font-medium">$60–$100/hr</span>
              <span className="text-xs text-red-400">private tutor</span>
            </div>
            <span className="text-gray-300 font-light text-xl">→</span>
            <div className="flex items-center gap-2 bg-mist border border-forest/20 px-4 py-2.5 rounded-xl">
              <span className="text-sm text-forest font-bold">$12/month</span>
              <span className="text-xs text-forest/70">with Learnly</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-up" style={{animationDelay:'0.3s'}}>
            <Link href="/signup" className="bg-forest text-white font-medium px-8 py-3.5 rounded-xl hover:bg-deep transition-all hover:-translate-y-0.5 text-sm">
              Try free for 7 days →
            </Link>
            <a href="#features" className="text-gray-600 border border-gray-200 px-6 py-3.5 rounded-xl hover:border-forest hover:bg-mist transition-all text-sm">
              See how it works
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4 animate-fade-up" style={{animationDelay:'0.4s'}}>
            No credit card required · Cancel anytime
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

      {/* VS SECTION */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-medium tracking-widest text-gray-400 mb-10">WHY LEARNLY BEATS A PRIVATE TUTOR</p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '💰', title: 'Save thousands a year', body: 'The average family spends $2,000–$5,000/year on tutoring. Learnly is $144/year — that&apos;s a 95% saving.' },
              { icon: '🕐', title: 'Available 24/7', body: 'No scheduling, no cancellations, no waiting. Learnly is there at 11pm before a morning exam.' },
              { icon: '🧠', title: 'Never forgets your mistakes', body: 'A human tutor forgets what you struggled with last week. Learnly remembers every weak spot and comes back to it.' },
            ].map(c => (
              <div key={c.title} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#F2F7F4]">
                <span className="text-3xl">{c.icon}</span>
                <h3 className="font-medium text-ink text-sm">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          {/* COMPARISON TABLE */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-3 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-400 tracking-widest">
              <span></span>
              <span className="text-center">Private Tutor</span>
              <span className="text-center text-forest">Learnly</span>
            </div>
            {[
              { label: 'Cost',              tutor: '$60–$100/hr',    learnly: '$12/month' },
              { label: 'Available',         tutor: '1–2 hrs/week',   learnly: '24/7 unlimited' },
              { label: 'Remembers mistakes',tutor: 'Sometimes',      learnly: 'Always' },
              { label: 'All subjects',      tutor: 'Usually 1–2',    learnly: '9 subjects' },
              { label: 'Photo problems',    tutor: 'In person only',  learnly: 'Yes, instantly' },
              { label: 'Voice explanations',tutor: 'Yes',            learnly: 'Yes' },
            ].map((r, i) => (
              <div key={r.label} className={`grid grid-cols-3 px-6 py-3.5 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <span className="text-gray-500 font-medium text-xs">{r.label}</span>
                <span className="text-center text-gray-400 text-xs">{r.tutor}</span>
                <span className="text-center text-forest font-semibold text-xs">{r.learnly}</span>
              </div>
            ))}
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
          <h2 className="font-serif text-4xl text-ink mb-2 tracking-tight">Try free for 7 days.<br /><em className="text-forest">Cancel anytime.</em></h2>
          <p className="text-gray-400 text-sm mb-6">No credit card required to start.</p>

          {/* Trial banner */}
          <div className="flex items-center justify-center gap-3 bg-deep rounded-2xl px-6 py-4 max-w-xl mx-auto mb-10 flex-wrap">
            <span className="text-xl">🎁</span>
            <p className="text-white text-sm font-medium text-center">Every Pro & Family plan includes a <span className="text-sage font-semibold">7-day free trial</span> — full access, no charge until day 8.</p>
          </div>

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
              <div className="flex items-baseline gap-2 mb-1">
                <p className="font-serif text-5xl text-white tracking-tight">$12</p>
                <span className="text-white/40 text-sm">/ mo after trial</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-sage/20 text-sage text-xs font-semibold px-2.5 py-1 rounded-full">7 DAYS FREE</span>
                <span className="text-white/40 text-xs">then $12/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-white/80">
                {['Unlimited sessions','Full mistake memory','Test prep mode','Advanced dashboard','Priority support'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-sage text-xs">✓</span>{i}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-sage text-deep text-sm font-semibold py-3 rounded-xl hover:bg-[#74c9a0] transition-colors">
                Start free 7-day trial →
              </Link>
              <p className="text-xs text-white/30 text-center mt-3">No credit card required · Cancel anytime</p>
            </div>
            {/* Family */}
            <div className="bg-white border border-forest/10 rounded-2xl p-7">
              <p className="text-xs font-medium tracking-widest text-gray-400 mb-2">FAMILY</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="font-serif text-5xl text-ink tracking-tight">$29</p>
                <span className="text-gray-400 text-sm">/ mo after trial</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-mist text-deep text-xs font-semibold px-2.5 py-1 rounded-full">7 DAYS FREE</span>
                <span className="text-gray-400 text-xs">up to 5 seats</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                {['Everything in Pro','Up to 5 profiles','Parent dashboard','Bulk pricing available'].map(i => (
                  <li key={i} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-mist flex items-center justify-center text-forest text-xs">✓</span>{i}</li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center border border-forest/30 text-forest text-sm font-medium py-3 rounded-xl hover:bg-mist transition-colors">
                Start free 7-day trial →
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">No credit card required · Cancel anytime</p>
            </div>
          </div>

          {/* Reassurance */}
          <div className="flex justify-center gap-8 flex-wrap mt-8">
            {['✓ No credit card needed','✓ Cancel before day 8, pay nothing','✓ Full Pro access from day one'].map(r => (
              <span key={r} className="text-sm text-gray-400">{r}</span>
            ))}
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
