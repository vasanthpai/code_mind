import { Suspense } from 'react'
import StreamingTabs from '../../components/StreamingTabs'
import LoadingSpinner from '../../components/LoadingSpinner'

export const metadata = {
  title: 'Streaming Now & Soon | MovieFlix',
  description: 'Latest and upcoming streaming movies and series on OTT platforms',
}

export default function StreamingPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Streaming Content
        </h1>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Discover what's streaming now and what's coming soon to OTT platforms
        </p>

        <Suspense fallback={<LoadingSpinner />}>
          <StreamingTabs />
        </Suspense>
      </div>
    </main>
  )
}
