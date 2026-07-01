import Image from 'next/image'
import Link from 'next/link'

export default function StreamingCard({ item }) {
  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
    media_type,
    providers = [],
    watchLink,
    genres,
    genre_ids,
    original_language
  } = item

  const displayTitle = title || name
  const releaseDate = release_date || first_air_date
  const mediaTypeLabel = media_type === 'movie' ? 'Movie' : media_type === 'tv' ? 'Series' : 'Other'
  const linkPath = media_type === 'movie' ? `/movies/${id}` : `/series/${id}`

  // Genres: use genres array from TMDB (if present), else fallback to none
  const displayGenres = genres?.length
    ? genres.map(g => g.name).join(', ')
    : '' // If you want genre names for 'genre_ids', you can map them with a static genre list

  // Languages: TMDB provides an ISO code (e.g. "en", "hi"); convert to readable name
  const displayLanguage = original_language
    ? new Intl.DisplayNames(['en'], { type: 'language' }).of(original_language)
    : 'N/A'

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBA'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400'
    if (rating >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  // Default image based on media type
  const getDefaultImage = () => {
    if (media_type === 'movie') {
      return '/placeholder-movie.jpg'
    } else if (media_type === 'tv') {
      return '/placeholder-series.jpg'
    }
    return '/placeholder-movie.jpg'
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="flex-shrink-0">
          <Link href={linkPath}>
            <div className="relative w-32 h-48 rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w342${poster_path}`
                    : getDefaultImage()
                }
                alt={displayTitle}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Title and Type */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <Link href={linkPath}>
              <h2 className="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                {displayTitle}
              </h2>
            </Link>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-600/20 text-purple-300 border border-purple-600/30">
              {mediaTypeLabel}
            </span>
          </div>

          {/* Details Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {/* Release Date */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-300">{formatDate(releaseDate)}</span>
            </div>

            {/* Genre */}
            {displayGenres && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" />
                </svg>
                <span className="text-gray-300">{displayGenres}</span>
              </div>
            )}

            {/* Language */}
            {displayLanguage && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1.75A8.25 8.25 0 1018.25 10 8.26 8.26 0 0010 1.75zm0 15A6.75 6.75 0 1116.75 10 6.75 6.75 0 0110 16.75z" />
                </svg>
                <span className="text-gray-300">{displayLanguage}</span>
              </div>
            )}

            {/* Rating */}
            {vote_average > 0 && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className={`font-semibold ${getRatingColor(vote_average)}`}>
                  {vote_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* OTT Providers */}
          {providers && providers.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Available on:</span>
              <div className="flex gap-2">
                {providers.slice(0, 6).map((provider) => (
                  <a
                    key={provider.provider_id}
                    href={watchLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-8 h-8 rounded-md overflow-hidden hover:scale-110 transition-transform duration-200"
                    title={`Watch on ${provider.provider_name}`}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      fill
                      className="object-contain"
                    />
                  </a>
                ))}
                {providers.length > 6 && (
                  <div className="w-8 h-8 bg-slate-700 rounded-md flex items-center justify-center">
                    <span className="text-xs text-gray-300">+{providers.length - 6}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
