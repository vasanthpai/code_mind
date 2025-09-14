import './globals.css'
import { Oswald } from '@next/font/google'

// Configure Oswald font weights and subsets as needed
const oswald = Oswald({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
})

export const metadata = {
  title: 'MovieFlix - Popular Movies',
  description: 'Discover the most popular movies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="font-oswald">{children}</body>
    </html>
  )
}
