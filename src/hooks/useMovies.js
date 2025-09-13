'use client'

import { useState, useCallback } from 'react'

export function useMovies(initialMovies, initialTotalPages) {
  const [movies, setMovies] = useState(initialMovies)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(currentPage < initialTotalPages)
  const [error, setError] = useState(null)

  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const nextPage = currentPage + 1
      const res = await fetch(`/api/movies?page=${nextPage}`)
      if (!res.ok) throw new Error('Failed to fetch movies')
      const data = await res.json()

      setMovies(prev => [...prev, ...data.results])
      setCurrentPage(nextPage)
      setHasMore(nextPage < data.total_pages)
    } catch (err) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [currentPage, hasMore, loading])

  const retry = useCallback(() => {
    if (error) {
      loadMoreMovies()
    }
  }, [error, loadMoreMovies])

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMoreMovies,
    retry,
  }
}
