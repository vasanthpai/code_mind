'use client'

import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'
import SkeletonGrid from './SkeletonGrid'

export default function GenreMediaGrid({ initialItems, mediaType, apiEndpoint, totalPages }) {
  const [items, setItems] = useState(initialItems)
  const [page, setPage] = useState(1)
  const [loadingNext, setLoadingNext] = useState(false)

  const loadNextPage = () => {
    if (loadingNext || page >= totalPages) return
    setLoadingNext(true)

    fetch(`${apiEndpoint}?page=${page + 1}`)
      .then(res => res.json())
      .then(data => {
        setItems(prev => [...prev, ...data.results])
        setPage(prev => prev + 1)
      })
      .finally(() => setLoadingNext(false))
  }

  // Trigger lazy loading on window scroll near bottom
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      ) {
        loadNextPage()
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [page, loadingNext])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
      {items.map(item => (
        <MovieCard key={`${mediaType}-${item.id}`} movie={item} mediaType={mediaType} />
      ))}
      {loadingNext && <SkeletonGrid count={10} />}
    </div>
  )
}
