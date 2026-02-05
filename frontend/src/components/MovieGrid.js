'use client'

import MovieCard from './MovieCard'
import LoadingSpinner from './LoadingSpinner'
import SkeletonCard from './SkeletonCard'
import { useMovies } from '../hooks/useMovies'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function MovieGrid({ initialMovies, totalPages, apiEndpoint }) {
  const {
    items,
    loading,
    error,
    hasMore,
    loadMore,
    retry,
  } = useMovies(initialMovies, totalPages, apiEndpoint)
  
  const lastItemRef = useIntersectionObserver(loadMore, {
    threshold: 0.1,
    rootMargin: '200px',
  })

  // Determine media type for child cards
  const mediaType = apiEndpoint === '/api/movies' ? 'movie' : 'series'

  // DEDUPLICATE items before rendering
  const dedupedItems = items.filter(
    (item, idx, arr) =>
      arr.findIndex(
        x => (mediaType) + '-' + x.id === (mediaType) + '-' + item.id
      ) === idx
  )

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {dedupedItems.map((item, idx) => {
          const isLast = idx === dedupedItems.length - 1
          return (
            <div 
              key={`${mediaType}-${item.id}`}
              ref={isLast && hasMore && !loading ? lastItemRef : null}
            >
              <MovieCard movie={item} mediaType={mediaType} />
            </div>
          )
        })}
        
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCard key={`skel-${idx}`} />
            ))}
          </>
        )}
      </div>

      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={retry}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!hasMore && dedupedItems.length > 0 && !loading && (
        <div className="text-center py-8 text-gray-400 text-lg">
          🎬 You've seen all the {mediaType === 'movie' ? 'movies' : 'TV series'}!
        </div>
      )}
    </div>
  )
}
