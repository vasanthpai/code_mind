'use client'

import { useState } from 'react'
import MediaGrid from '../../components/MediaGrid'

export default function HomePage() {

  return (
    <>
      <main className="min-h-screen bg-slate-900 text-white px-4">
        <h1 className="text-center text-4xl font-bold py-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Popular TV Series
        </h1>

        <MediaGrid apiEndpoint='/api/series' />
      </main>
    </>
  )
}
