'use client'

import { useState, useEffect } from 'react'
import StreamingCard from './StreamingCard'
import SkeletonList from './SkeletonList'
import LoadingSpinner from './LoadingSpinner'

export default function StreamingNowSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingNext, setLoadingNext] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchNow = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) setLoading(true)
      else setLoadingNext(true)
      const res = await fetch(`/api/streaming?page=${pageNum}`)
      const data = await res.json()
      const nowItems = data.now || []

      if (append) setItems(prev => [...prev, ...nowItems])
      else setItems(nowItems)

      setHasMore(nowItems.length > 0) // crude but effective, improve for prod
      setPage(pageNum)
    } finally {
      setLoading(false)
      setLoadingNext(false)
    }
  }

  useEffect(() => { fetchNow() }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        !loadingNext &&
        hasMore
      ) {
        fetchNow(page + 1, true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, loadingNext, hasMore])

  if (loading) return <SkeletonList count={8}/>

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-purple-200">Streaming Now</h2>
      <div className="space-y-6 mb-12">
        {items.length ? items.map(item => (<StreamingCard key={`${item.media_type}-${item.id}`} item={item} />)) : <p className="text-gray-400 py-12 text-center">No content available.</p>}
        {loadingNext && <SkeletonList count={4} />}
      </div>
    </section>
  )
}
