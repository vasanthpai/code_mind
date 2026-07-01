export default async function handler(req, res) {
  const { genreId } = req.query
  const page = req.query.page || 1
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  if (!TMDB_API_KEY) return res.status(500).json({ error: 'Missing TMDB_API_KEY' })
    console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`)

  try {
    const apiRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
    )
    if (!apiRes.ok) throw new Error('TMDB API error')
    const data = await apiRes.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
