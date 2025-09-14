'use client'

import { useState } from 'react'
import MediaGrid from '../components/MediaGrid'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('movies')

  return (
    <>
      <main className="min-h-screen bg-slate-900 text-white px-4">
        <h1 className="text-center text-4xl font-bold py-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Popular {activeTab === 'movies' ? 'Movies' : 'TV Series'}
        </h1>

        <div className="text-center space-x-6 mb-6">
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === 'movies'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab('series')}
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === 'series'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            TV Series
          </button>
        </div>

        <MediaGrid apiEndpoint={activeTab === 'movies' ? '/api/movies' : '/api/series'} />
      </main>
    </>
  )
}
