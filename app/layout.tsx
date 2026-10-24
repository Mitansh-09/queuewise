import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QueueWise | Simple queues for local businesses',
  description: 'Join a same-day queue, follow your place, and help local service teams manage walk-ins and bookings.',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
