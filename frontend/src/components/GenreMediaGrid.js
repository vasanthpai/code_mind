'use client'

import MovieCard from './MovieCard'
import SkeletonGrid from './SkeletonGrid'
import { useMovies } from '../hooks/useMovies'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function GenreMediaGrid({ initialItems, mediaType, apiEndpoint, totalPages }) {
  const {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    retry,
  } = useMovies(initialItems, totalPages, apiEndpoint)

  const lastItemRef = useIntersectionObserver(loadMore, {
    threshold: 0.1,
    rootMargin: '200px',
  })

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <div key={`${mediaType}-${item.id}`} ref={isLast && hasMore && !loading ? lastItemRef : null}>
            <MovieCard movie={item} mediaType={mediaType} />
          </div>
        )
      })}
      {loading && <SkeletonGrid count={10} />}

      {error && (
        <div className="col-span-full text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={retry}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}
