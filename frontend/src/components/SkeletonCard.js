// components/SkeletonCard.js
'use client'

export default function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="aspect-[2/3] bg-gray-700"></div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  )
}
