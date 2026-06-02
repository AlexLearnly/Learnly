import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Learnly — Your smartest study partner',
  description: 'AI-powered personal tutor that learns your mistakes and helps you master any subject.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
