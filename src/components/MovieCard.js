'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MovieCard({ movie, mediaType = 'movie' }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Use 'title' for movies, 'name' for series
  const title = movie.title || movie.name || 'Untitled'

  // Use 'release_date' for movies, 'first_air_date' for series
  const dateStr = movie.release_date || movie.first_air_date || ''
  const year = dateStr ? new Date(dateStr).getFullYear() : 'N/A'

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg'

  // Build navigation path based on media type
  const hrefPath = mediaType === 'movie' ? `/movies/${movie.id}` : `/series/${movie.id}`

  return (
    <Link href={hrefPath} className="group block">
      <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer">
        <div className="relative aspect-[2/3] bg-gray-700">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}
          <Image
            src={posterUrl}
            alt={`${title} poster`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true)
              setImageLoaded(true)
            }}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            loading="lazy"
          />
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-xs">
              ⭐ {rating}
            </div>
          )}
        </div>
        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-400">{year}</p>
        </div>
      </div>
    </Link>
  )
}
