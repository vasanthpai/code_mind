'use client'

import { useEffect, useState } from 'react'
import MovieGrid from './MovieGrid'
import LoadingSpinner from './LoadingSpinner'

export default function MediaGrid({ apiEndpoint }) {
  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiEndpoint}?page=1`)
      .then(res => res.json())
      .then(data => {
        setItems(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [apiEndpoint])

  if (loading) return <LoadingSpinner />

  return <MovieGrid initialMovies={items} totalPages={totalPages} apiEndpoint={apiEndpoint} />
}
