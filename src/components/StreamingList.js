'use client'

import { useState, useEffect } from 'react'
import StreamingCard from './StreamingCard'
import LoadingSpinner from './LoadingSpinner'
import SkeletonList from './SkeletonList'

export default function StreamingList({ type = 'now', region = 'US' }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingNext, setLoadingNext] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadStreamingData = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true)
      } else {
        setLoadingNext(true)
      }

      const response = await fetch(`/api/streaming?type=${type}&region=${region}&page=${pageNum}`)
      const data = await response.json()

      if (append) {
        setItems(prev => [...prev, ...data.results])
      } else {
        setItems(data.results)
      }

      setHasMore(pageNum < data.total_pages && data.results.length > 0)
      setPage(pageNum)
    } catch (error) {
      console.error('Error loading streaming data:', error)
    } finally {
      setLoading(false)
      setLoadingNext(false)
    }
  }

  // Lazy loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        !loadingNext &&
        hasMore
      ) {
        loadStreamingData(page + 1, true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, loadingNext, hasMore])

  // Reset and load data when type or region changes
  useEffect(() => {
    setItems([])
    setPage(1)
    setHasMore(true)
    loadStreamingData(1, false)
  }, [type, region])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {type === 'now' ? 'Currently Streaming' : 'Coming Soon to Streaming'}
        </h2>
        <p className="text-gray-400 mt-2">
          {type === 'now' 
            ? `Latest movies and series available on OTT platforms in ${region}` 
            : `Upcoming releases coming to streaming platforms in ${region}`}
        </p>
      </div>

      {/* Content List */}
      <div className="space-y-6">
        {items.length > 0 ? (
          items.map((item, index) => (
            <StreamingCard key={`${item.media_type}-${item.id}-${index}`} item={item} />
          ))
        ) : (
          !loading && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {type === 'now' 
                  ? `No content currently streaming in ${region}` 
                  : `No upcoming streaming content in ${region}`}
              </p>
            </div>
          )
        )}
      </div>

      {/* Loading skeleton for next page */}
      {loadingNext && (
        <div className="space-y-6">
          <SkeletonList count={6} />
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No more content to load</p>
        </div>
      )}
    </div>
  )
}
