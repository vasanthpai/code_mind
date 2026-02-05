export default async function handler(req, res) {
  const { id } = req.query
  const TMDB_API_KEY = process.env.TMDB_API_KEY
  if (!TMDB_API_KEY) {
    return res.status(500).json({ error: 'Missing TMDB_API_KEY' })
  }

  try {
    const apiRes = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
    )
    console.log(apiRes)
    if (!apiRes.ok) throw new Error('TMDB movie details error')
    const data = await apiRes.json()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
