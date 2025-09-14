'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import MovieCard from './MovieCard'
import SkeletonRail from './SkeletonRail'

export default function GenreCarousel({
  title,
  apiEndpoint,
  accentColor,
  mediaType,
  className = '',
  genreId,
}) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingNext, setLoadingNext] = useState(false)

  const containerRef = useRef(null)
  const scrollTimeoutRef = useRef(null)
    console.log(apiEndpoint)
  useEffect(() => {
    let isMounted = true
    setLoading(true)

    fetch(`${apiEndpoint}?page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setItems(data.results)
          setPage(1)
          setTotalPages(data.total_pages)
          containerRef.current?.scrollTo({ left: 0 })
          setLoading(false)
        }
      })
      .catch(() => isMounted && setLoading(false))

    return () => {
      isMounted = false
    }
  }, [apiEndpoint])

  const loadNextPage = () => {
    if (loadingNext || loading || page >= totalPages) return
    setLoadingNext(true)

    fetch(`${apiEndpoint}?page=${page + 1}`)
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      })
      .finally(() => setLoadingNext(false))
  }

  const onScroll = () => {
    if (!containerRef.current) return
    clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      if (scrollWidth - scrollLeft - clientWidth < 150) {
        loadNextPage()
      }
      updateArrows()
    }, 100)
  }

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth + 10 < scrollWidth)
  }

  const scrollAmount = 450

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    setTimeout(updateArrows, 500)
  }

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    setTimeout(updateArrows, 500)
  }

  useEffect(() => {
    updateArrows()
  }, [items])

  return (
    <section className={`relative ${className}`}>
      <div
        className={`flex items-center justify-between px-4 py-3 mb-2 rounded-t-md bg-gradient-to-r ${accentColor} text-white font-semibold`}
      >
        <h3 className="text-xl">{title}</h3>
        <Link href={`/genres/${mediaType}/${genreId}`} className="text-sm hover:underline">
          See All →
        </Link>
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            aria-label="Scroll left"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-80 transition-opacity shadow-lg"
          >
            ‹
          </button>
        )}

        {canScrollRight && (
          <button
            aria-label="Scroll right"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-80 transition-opacity shadow-lg"
          >
            ›
          </button>
        )}

        <div
          ref={containerRef}
          onScroll={onScroll}
          className="flex overflow-x-auto scrollbar-none space-x-4 py-2 px-10 scroll-smooth min-h-[300px]"
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={`${mediaType}-${item.id}`}
                className="flex-shrink-0 w-40 sm:w-44 md:w-48 lg:w-52"
              >
                <MovieCard movie={item} mediaType={mediaType} />
              </div>
            ))
          ) : (
            <SkeletonRail count={9} />
          )}

          {loadingNext && !loading && <SkeletonRail count={9} />}
        </div>
      </div>
    </section>
  )
}
