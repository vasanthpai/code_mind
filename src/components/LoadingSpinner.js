// components/LoadingSpinner.js
'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-8 h-8 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">Loading more movies...</p>
    </div>
  )
}
