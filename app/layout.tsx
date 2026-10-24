import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QueueWise | Clinic queue management',
  description: 'Book a same-day clinic token, follow the queue estimate, and manage appointments and walk-ins.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
