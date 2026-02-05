import { notFound } from 'next/navigation'
import GenreMediaGrid from '../../../../components/GenreMediaGrid'
import genresList from '../../../../data/genres'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { mediaType, genreId } = params
  const genreName = genresList[mediaType]?.find(g => `${g.id}` === genreId)?.name || 'Genre'
  return {
    title: `${genreName} ${mediaType === 'movies' ? 'Movies' : 'TV Series'} | MovieFlix`,
  }
}

export default async function GenrePage({ params }) {
  const { mediaType, genreId } = params
  const genreName = genresList[mediaType]?.find(g => `${g.id}` === genreId)?.name

  if (!genreName) notFound()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/genre/${mediaType}/${genreId}?page=1`
  )
  if (!res.ok) throw new Error('Failed to fetch genre content')
  const initialData = await res.json()

  return (
    <main className="min-h-screen bg-slate-900 text-white px-6 py-8">
      <h1 className="mb-8 text-4xl font-bold">
        {genreName} {mediaType === 'movies' ? 'Movies' : 'TV Series'}
      </h1>
      <GenreMediaGrid
        initialItems={initialData.results}
        mediaType={mediaType}
        apiEndpoint={`/api/genre/${mediaType}/${genreId}`}
        totalPages={initialData.total_pages}
        vertical={true}  // flag to render vertical grid with vertical lazy loading
      />
    </main>
  )
}
