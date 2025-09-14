'use client'

import { usePathname } from 'next/navigation'
import Header from '../components/Header'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  // Hide header on these specific routes
  const hideHeaderPaths = ['/login', '/signup']
  const shouldShowHeader = !hideHeaderPaths.includes(pathname)

  return (
    <>
      {/* Conditionally show header */}
      {shouldShowHeader && <Header />}
      {/* Render passed children once */}
      {children}
    </>
  )
}
