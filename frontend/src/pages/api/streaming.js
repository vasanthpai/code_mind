export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { page = 1, type = 'now', region = 'IN' } = req.query
  const apiKey = process.env.TMDB_API_KEY

  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split('T')[0]

    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    // Date filters based on type
    let movieDateFilter, tvDateFilter, sortOrder

    if (type === 'now') {
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      movieDateFilter = `primary_release_date.gte=${threeMonthsAgo.toISOString().split('T')[0]}&primary_release_date.lte=${todayStr}`
      tvDateFilter = `first_air_date.gte=${threeMonthsAgo.toISOString().split('T')[0]}&first_air_date.lte=${todayStr}`
      sortOrder = 'desc'
    } else {
      movieDateFilter = `primary_release_date.gte=${tomorrowStr}`
      tvDateFilter = `first_air_date.gte=${tomorrowStr}`
      sortOrder = 'asc'
    }

    // Fetch movies with providers
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=release_date.${sortOrder}&${movieDateFilter}&watch_region=${region}&with_watch_providers=119|2100|8|175|2336|122|237|232|350|309|532|482|2177&page=${page}`
    )
    const moviesData = await movieRes.json()

    // Fetch TV series with providers  
    const tvRes = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=first_air_date.${sortOrder}&${tvDateFilter}&watch_region=${region}&with_watch_providers=119|2100|8|175|2336|122|237|232|350|309|532|482|2177&page=${page}`
    )
    const seriesData = await tvRes.json()

    // Add media_type
    const movies = (moviesData.results || []).map(item => ({
      ...item,
      media_type: 'movie'
    }))
    const series = (seriesData.results || []).map(item => ({
      ...item,
      media_type: 'tv'
    }))

    // Combine and sort
    const combined = [...movies, ...series].sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date || 0)
      const dateB = new Date(b.release_date || b.first_air_date || 0)
      return type === 'now' ? dateB - dateA : dateA - dateB
    })

    // Fetch real providers for each item
    const itemsWithProviders = await Promise.all(
      combined.map(async (item) => {
        try {
          const providersRes = await fetch(
            `https://api.themoviedb.org/3/${item.media_type}/${item.id}/watch/providers?api_key=${apiKey}`
          )
          const providersData = await providersRes.json()
          
          const regionProviders = providersData.results?.[region]
          const providers = regionProviders?.flatrate || []
          const watchLink = regionProviders?.link || null

          return {
            ...item,
            providers: providers,
            watchLink: watchLink
          }
        } catch (error) {
          console.error(`Error fetching providers for ${item.media_type} ${item.id}:`, error)
          return {
            ...item,
            providers: [],
            watchLink: null
          }
        }
      })
    )

    // Filter out items with no providers
    const filteredItems = itemsWithProviders.filter(item => item.providers.length > 0)

    return res.status(200).json({
      results: filteredItems,
      total_pages: Math.max(moviesData.total_pages || 1, seriesData.total_pages || 1),
      total_results: filteredItems.length,
      region: region
    })

  } catch (error) {
    console.error('Streaming API error:', error)
    return res.status(500).json({ error: 'Failed to fetch streaming data' })
  }
}
