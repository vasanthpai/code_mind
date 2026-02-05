'use client'

import { useState } from 'react'
import GenreCarousel from '../../components/GenreCarousel'

const movieGenres = [
  { id: 28, name: 'Action', color: 'from-red-600 to-red-800', icon: '🎬' },
  { id: 12, name: 'Adventure', color: 'from-green-600 to-green-800', icon: '🗺️' },
  { id: 16, name: 'Animation', color: 'from-pink-500 to-pink-700', icon: '🎨' },
  { id: 35, name: 'Comedy', color: 'from-yellow-400 to-yellow-600', icon: '😂' },
  { id: 80, name: 'Crime', color: 'from-gray-800 to-gray-900', icon: '🕵️‍♂️' },
  { id: 99, name: 'Documentary', color: 'from-indigo-600 to-indigo-800', icon: '🎥' },
  { id: 18, name: 'Drama', color: 'from-blue-600 to-blue-800', icon: '🎭' },
  { id: 10751, name: 'Family', color: 'from-purple-600 to-purple-800', icon: '👨‍👩‍👧' },
  { id: 14, name: 'Fantasy', color: 'from-violet-700 to-violet-900', icon: '🧙‍♂️' },
  { id: 36, name: 'History', color: 'from-yellow-700 to-yellow-900', icon: '🏰' },
  { id: 27, name: 'Horror', color: 'from-gray-700 to-gray-900', icon: '😱' },
  { id: 10402, name: 'Music', color: 'from-rose-600 to-rose-800', icon: '🎵' },
  { id: 9648, name: 'Mystery', color: 'from-emerald-600 to-emerald-800', icon: '🕵️‍♀️' },
  { id: 10749, name: 'Romance', color: 'from-pink-600 to-pink-800', icon: '❤️' },
  { id: 878, name: 'Science Fiction', color: 'from-cyan-600 to-cyan-800', icon: '🚀' },
  { id: 10770, name: 'TV Movie', color: 'from-slate-600 to-slate-800', icon: '📺' },
  { id: 53, name: 'Thriller', color: 'from-red-700 to-red-900', icon: '🔪' },
  { id: 10752, name: 'War', color: 'from-zinc-700 to-zinc-900', icon: '🎖️' },
  { id: 37, name: 'Western', color: 'from-yellow-800 to-yellow-900', icon: '🤠' },
]

const seriesGenres = [
  { id: 10759, name: 'Action & Adventure', color: 'from-red-600 to-red-900', icon: '🚀' },
  { id: 16, name: 'Animation', color: 'from-pink-500 to-pink-700', icon: '🎨' },
  { id: 35, name: 'Comedy', color: 'from-yellow-400 to-yellow-600', icon: '😂' },
  { id: 80, name: 'Crime', color: 'from-gray-800 to-gray-900', icon: '🕵️‍♂️' },
  { id: 99, name: 'Documentary', color: 'from-indigo-600 to-indigo-800', icon: '🎥' },
  { id: 18, name: 'Drama', color: 'from-blue-600 to-blue-800', icon: '🎭' },
  { id: 10751, name: 'Family', color: 'from-purple-600 to-purple-800', icon: '👨‍👩‍👧' },
  { id: 10762, name: 'Kids', color: 'from-cyan-600 to-cyan-800', icon: '🧸' },
  { id: 9648, name: 'Mystery', color: 'from-emerald-600 to-emerald-800', icon: '🕵️‍♀️' },
  { id: 10763, name: 'News', color: 'from-slate-600 to-slate-800', icon: '📰' },
  { id: 10764, name: 'Reality', color: 'from-yellow-700 to-yellow-900', icon: '📺' },
  { id: 10765, name: 'Sci-Fi & Fantasy', color: 'from-cyan-700 to-cyan-900', icon: '🛸' },
  { id: 10766, name: 'Soap', color: 'from-pink-600 to-pink-800', icon: '🧼' },
  { id: 10767, name: 'Talk', color: 'from-rose-600 to-rose-800', icon: '🗣️' },
  { id: 10768, name: 'War & Politics', color: 'from-zinc-700 to-zinc-900', icon: '🎖️' },
  { id: 37, name: 'Western', color: 'from-yellow-800 to-yellow-900', icon: '🤠' },
]


export default function GenresPage() {
  const [activeTab, setActiveTab] = useState('movie')

  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <h1 className="mb-12 text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        Explore Movies & TV Series by Genre
      </h1>

      <div className="flex justify-center space-x-6 mb-12">
        <button
          onClick={() => setActiveTab('movie')}
          className={`px-6 py-3 rounded font-semibold ${
            activeTab === 'movie' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300'
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setActiveTab('series')}
          className={`px-6 py-3 rounded font-semibold ${
            activeTab === 'series' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300'
          }`}
        >
          TV Series
        </button>
      </div>

      <section>
        {(activeTab === 'movie' ? movieGenres : seriesGenres).map(({ id, name, color, icon }) => (
          <GenreCarousel
            key={id}
            title={`${icon} ${name} ${activeTab === 'movie' ? 'Movies' : 'Series'}`}
            apiEndpoint={`/api/genre/${activeTab}/${id}`}
            accentColor={color}
            mediaType={activeTab}
            genreId={id}
            className="mb-12"
          />
        ))}
      </section>
    </main>
  )
}
