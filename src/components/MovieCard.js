// components/MovieCard.js
'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function MovieCard({ movie }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const {
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  } = movie

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/placeholder-movie.jpg'
  const year = release_date ? new Date(release_date).getFullYear() : 'N/A'
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A'

  return (
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

        {/* Overlay with overview on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm line-clamp-4">
            {overview || 'No description available'}
          </div>
        </div>

        {/* Rating badge */}
        {vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold px-2 py-1 rounded-full text-xs">
            ⭐ {rating}
          </div>
        )}
      </div>

      {/* Movie info */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-400">{year}</p>
      </div>
    </div>
  )
}
