'use client'

import { useState, useCallback } from 'react'

export function useMovies(initialItems, initialTotalPages, apiEndpoint = '/api/movies') {
  const [items, setItems] = useState(initialItems)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(currentPage < initialTotalPages)
  const [error, setError] = useState(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const nextPage = currentPage + 1
      const res = await fetch(`${apiEndpoint}?page=${nextPage}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()

      setItems(prev => [...prev, ...data.results])
      setCurrentPage(nextPage)
      setHasMore(nextPage < data.total_pages)
    } catch (err) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [currentPage, hasMore, loading, apiEndpoint])

  const retry = useCallback(() => {
    if (error) loadMore()
  }, [error, loadMore])

  return { items, loading, error, hasMore, loadMore, retry }
}
