import Image from 'next/image'
import Link from 'next/link'
import BackButton from '../../../components/backButton'


export default async function SeriesDetail({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/series/${params.id}`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch series')
  const show = await res.json()

  const backdrop = show.backdrop_path
    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
    : '/placeholder-movie.jpg'

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 p-8">
          <h1 className="text-4xl lg:text-6xl font-bold">{show.name}</h1>
          <p className="mt-2 text-lg text-gray-300">
            {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'} •{' '}
            {show.episode_run_time?.[0] ?? 'N/A'}m per ep •{' '}
            {show.genres?.map((g) => g.name).join(', ')}
          </p>
          <Link href="/">
            <BackButton />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-300">{show.overview}</p>

          {show.videos?.results.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold">Trailer</h3>
              <iframe
                className="w-full aspect-video mt-2"
                src={`https://www.youtube.com/embed/${show.videos.results[0].key}`}
                allowFullScreen
              />
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <h3 className="text-xl font-semibold">Cast</h3>
          <ul className="grid grid-cols-3 gap-4 mt-4">
            {show.credits?.cast.slice(0, 6).map((person) => (
              <li key={person.id} className="text-center">
                <Image
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                      : '/placeholder-movie.jpg'
                  }
                  alt={person.name}
                  width={100}
                  height={150}
                  className="rounded"
                />
                <p className="mt-2 text-sm">{person.name}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  )
}
