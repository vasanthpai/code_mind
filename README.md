# MovieFlix

A movie/TV series discovery app backed by TMDB, with a small self-hosted auth service.

## Structure

This repo has two independent projects:

| Directory | Stack | Purpose |
|---|---|---|
| [`frontend/`](frontend/) | Next.js 15 (App Router), React 19, Tailwind CSS 4 | Browse movies/series, genres, streaming availability; login/register UI |
| [`backend/`](backend/) | Express 5, MongoDB (Mongoose) | User registration/login API, issues JWTs |

The frontend calls the backend for auth (via its own `/api/auth/*` proxy routes) and calls TMDB directly (via its own `/api/movies`, `/api/series`, `/api/genre/*` routes) for movie/series data.

Each project has its own `package.json`, dependencies, and deployment (see each subproject's README).

## Quick start

You need both projects running locally, plus a MongoDB instance for the backend.

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, etc.
npm install
npm run dev             # http://localhost:5000

# Terminal 2 — frontend
cd frontend
cp .env.local.example .env.local   # fill in TMDB keys, backend URL, etc.
npm install
npm run dev              # http://localhost:3000
```

See [`backend/README.md`](backend/README.md) and [`frontend/README.md`](frontend/README.md) for details on env vars, scripts, and API endpoints.
