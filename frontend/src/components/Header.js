'use client'

import Link from 'next/link'
import { useAuth } from '../app/auth/authContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const { user, setUser } = useAuth()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    setUser(null)
    setLoggingOut(false)
    router.push('/auth/login')
  }

  return (
    <header className="bg-yellow-400 text-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Left: Logo */}
        <div className="text-xl font-bold">
          <Link href="/">TV TIME</Link>
        </div>

        {/* Navigation Menu */}
        <nav className="space-x-6 hidden md:flex">
          <Link href="/series" className="hover:text-gray-700">Shows</Link>
          <Link href="/movies" className="hover:text-gray-700">Movies</Link>
          <Link href="/genres" className="hover:text-gray-700">Genres</Link>
          <Link href="/streaming" className="hover:text-gray-700">Streaming</Link>
        </nav>

        {/* Search Input (optional) */}
        <input
          type="text"
          placeholder="Search titles"
          className="hidden md:block w-64 px-3 py-2 border-b-2 border-black bg-yellow-400 placeholder-black focus:outline-none"
        />

        {/* User or Login/Signup */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center space-x-2 px-3 py-1 rounded-md border border-transparent hover:border-black hover:bg-yellow-300 transition"
              >
                <UserIcon />
                <span className="font-semibold text-black select-none">
                  Hi, {user.name || user.firstName || 'User'}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center space-x-2 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                title="Logout"
              >
                <LogoutIcon />
                <span>{loggingOut ? 'Logging Out...' : 'Logout'}</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:underline font-semibold">
                Log in
              </Link>
              <span className="font-semibold">|</span>
              <Link href="/auth/register" className="hover:underline font-semibold">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function UserIcon() {
  return (
    <svg
      className="h-6 w-6 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 20a7 7 0 0113 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg
      className="h-5 w-5 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m0-8V7a2 2 0 114 0v1"
      />
    </svg>
  )
}
