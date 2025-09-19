'use client'

import { useState } from 'react'
import StreamingList from './StreamingList'
import useUserLocation from '../hooks/useUserLocation'
import LoadingSpinner from './LoadingSpinner'

export default function StreamingTabs() {
  const [activeTab, setActiveTab] = useState('now')
  const { region, loading } = useUserLocation()

  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
        <p className="text-gray-400 mt-4">Detecting your location for regional content...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Region Display */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-400">
          Showing content available in: <span className="text-purple-400 font-semibold">{region}</span>
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-center space-x-6 mb-12">
        <button
          onClick={() => setActiveTab('now')}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === 'now'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          Streaming Now
        </button>
        <button
          onClick={() => setActiveTab('soon')}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === 'soon'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          Streaming Soon
        </button>
      </div>

      {/* Content */}
      <StreamingList key={`${activeTab}-${region}`} type={activeTab} region={region} />
    </div>
  )
}
