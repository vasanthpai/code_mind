'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-4">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 mb-8 select-none">
        404
      </h1>
      <p className="text-2xl sm:text-3xl font-semibold mb-4">Oops! Page not found.</p>
      <p className="text-center text-gray-400 max-w-md mb-8">
        The movie you're looking for isn't available here. Maybe it's still in production or lost in the edits.
      </p>
      <Link href="/" className="px-6 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition">
          Go Back Home
      </Link>
    </main>
  )
}
