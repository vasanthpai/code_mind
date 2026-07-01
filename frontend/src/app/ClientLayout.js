'use client'

import { usePathname } from 'next/navigation'
import Header from '../components/Header'
import { AuthProvider } from '../app/auth/authContext'

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  // Hide header on these specific routes
  const hideHeaderPaths = ['/auth/login', '/auth/register', '/auth/forgot-password','/profile']
  const shouldShowHeader = !hideHeaderPaths.includes(pathname)

  return (
    <AuthProvider>
      {/* Conditionally show header */}
      {shouldShowHeader && <Header />}
      {/* Render passed children once */}
      {children}
    </AuthProvider>
  )
}
