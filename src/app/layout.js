import './globals.css'
import { Oswald } from '@next/font/google'
import ClientLayout from './ClientLayout'

// Configure Oswald font
const oswald = Oswald({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata = {
  title: 'MovieFlix - Popular Movies',
  description: 'Discover the most popular movies',
}

// RootLayout is a server component: no 'use client' here
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="font-oswald bg-slate-900 text-white">
        {/* Wrap children once with ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
