import Link from 'next/link'

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 no-underline">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${dark ? 'bg-sage' : 'bg-forest'}`}>
        <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
          <path
            d="M13 6 C13 6 9 5 5 7 L5 20 C9 18 13 19 13 19 C13 19 17 18 21 20 L21 7 C17 5 13 6 13 6Z"
            stroke={dark ? '#1B4332' : 'white'}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="13" y1="6" x2="13" y2="19" stroke={dark ? '#1B4332' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
      <span className={`font-serif text-xl tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        Learn<span className={dark ? 'text-sage' : 'text-forest'}>ly</span>
      </span>
    </Link>
  )
}
