# Frontend

Next.js 15 (App Router) app for browsing movies, TV series, genres, and streaming availability, backed by [TMDB](https://www.themoviedb.org/documentation/api). Auth screens proxy to the [backend](../backend) API.

## Setup

```bash
cp .env.local.example .env.local   # fill in real values
npm install
npm run dev                         # http://localhost:3000
```

The [backend](../backend) should be running (or `NEXT_PUBLIC_BACKEND_URL` pointed at a running instance) for login/register to work.

## Environment variables

| Variable | Description |
|---|---|
| `TMDB_API_KEY` | TMDB API key used server-side by the `/api/*` routes |
| `MOVIE_API_KEY` | Additional movie data API key (server-side) |
| `NEXT_PUBLIC_APP_URL` | This app's own base URL, used for server-side fetches to its own API routes |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the backend auth API |

## Structure

- `src/app/` — pages and layouts (App Router): home, movies, series, genres, streaming, profile, auth screens
- `src/pages/api/` — API routes (Pages Router, coexists with the App Router by design): TMDB proxies (`movies`, `series`, `genre/*`) and backend auth proxies (`auth/login`, `auth/register`)
- `src/components/` — shared UI components
- `src/hooks/` — `useMovies` (paginated fetch/append state) and `useIntersectionObserver` (infinite-scroll trigger), shared by the grid components
- `src/data/genres.js` — static TMDB genre id/name list

## Scripts

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — ESLint
