// pages/api/series.js
export default async function handler(req, res) {
  const { page = 1 } = req.query
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  if (!TMDB_API_KEY) {
    return res.status(500).json({ error: 'Missing TMDB_API_KEY environment variable' })
  }

  try {
    const apiRes = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${TMDB_API_KEY}&page=${page}`)
    if (!apiRes.ok) throw new Error('TMDB API error')
    const data = await apiRes.json()

    res.status(200).json({
      page: data.page,
      results: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results,
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unknown error' })
  }
}
