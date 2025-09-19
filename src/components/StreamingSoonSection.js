'use client'

import { useState, useEffect } from 'react'
import StreamingCard from './StreamingCard'
import SkeletonList from './SkeletonList'

export default function StreamingSoonSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingNext, setLoadingNext] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchSoon = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) setLoading(true)
      else setLoadingNext(true)
      const res = await fetch(`/api/streaming?page=${pageNum}`)
      const data = await res.json()
      const soonItems = data.soon || []

      if (append) setItems(prev => [...prev, ...soonItems])
      else setItems(soonItems)

      setHasMore(soonItems.length > 0)
      setPage(pageNum)
    } finally {
      setLoading(false)
      setLoadingNext(false)
    }
  }

  useEffect(() => { fetchSoon() }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        !loadingNext &&
        hasMore
      ) {
        fetchSoon(page + 1, true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, loadingNext, hasMore])

  if (loading) return <SkeletonList count={8}/>

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-pink-200">Streaming Soon</h2>
      <div className="space-y-6 mb-12">
        {items.length ? items.map(item => (<StreamingCard key={`${item.media_type}-${item.id}`} item={item} />)) : <p className="text-gray-400 py-12 text-center">No upcoming content.</p>}
        {loadingNext && <SkeletonList count={4} />}
      </div>
    </section>
  )
}
