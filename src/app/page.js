'use client'

import { useEffect, useState } from 'react'
import MovieGrid from '../components/MovieGrid'
import LoadingSpinner from '../components/LoadingSpinner'

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch('/api/movies?page=1')
      .then(res => res.json())
      .then(data => {
        setMovies(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(() => {
        setMovies([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Popular Movies
        </h1>
        <p className="text-xl text-gray-300">
          Discover trending movies with infinite scroll
        </p>
      </header>

      <MovieGrid initialMovies={movies} totalPages={totalPages} />
    </main>
  )
}
