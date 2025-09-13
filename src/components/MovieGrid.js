// components/MovieGrid.js
'use client'

import MovieCard from './MovieCard'
import LoadingSpinner from './LoadingSpinner'
import SkeletonCard from './SkeletonCard'
import { useMovies } from '../hooks/useMovies'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function MovieGrid({ initialMovies, totalPages }) {
  const {
    movies,
    loading,
    error,
    hasMore,
    loadMoreMovies,
    retry,
  } = useMovies(initialMovies, totalPages)
  
  const lastElementRef = useIntersectionObserver(loadMoreMovies, {
    threshold: 0.1,
    rootMargin: '200px'
  })

  return (
    <div className="space-y-8">
      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {movies.map((movie, index) => {
          const isLast = index === movies.length - 1
          
          return (
            <div
              key={`${movie.id}-${index}`}
              ref={isLast && hasMore && !loading ? lastElementRef : null}
            >
              <MovieCard movie={movie} />
            </div>
          )
        })}
        
        {/* Show skeleton cards while loading */}
        {loading && (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={retry}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* End Message */}
      {!hasMore && movies.length > 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">
            🎬 Youve seen all the movies!
          </p>
        </div>
      )}
    </div>
  )
}
