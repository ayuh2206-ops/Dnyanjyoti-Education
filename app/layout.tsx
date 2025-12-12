import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dnyanjyoti - Master The Descriptive Pattern',
  description: 'Conquer the Fear of the New Descriptive Pattern. Master the exact Framework Method used by 350+ Officers to clear the exam in their first attempt.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
