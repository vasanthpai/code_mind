'use client'

import Link from 'next/link'

export default function Header() {
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
        </nav>

        {/* Search Input (optional) */}
        <input
          type="text"
          placeholder="Search titles"
          className="hidden md:block w-64 px-3 py-2 border-b-2 border-black bg-yellow-400 placeholder-black focus:outline-none"
        />

        {/* Log in / Sign up */}
        <div className="flex space-x-4">
          <Link href="/login" className="hover:underline">Log in</Link>
          <span>|</span>
          <Link href="/signup" className="hover:underline">Sign up</Link>
        </div>
      </div>
    </header>
  )
}
