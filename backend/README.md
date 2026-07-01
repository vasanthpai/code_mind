# Backend

Express + MongoDB API providing user registration and login for the [frontend](../frontend).

## Setup

```bash
cp .env.example .env   # fill in real values
npm install
npm run dev             # nodemon, http://localhost:5000
# or
npm start                # plain node
```

Requires a running MongoDB instance reachable at `MONGODB_URI`.

## Environment variables

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign auth JWTs |
| `CLIENT_URL` | Origin allowed via CORS (the frontend's URL) |

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check, returns `{ status: 'ok' }` |
| `POST` | `/api/auth/register` | Body: `{ email, password, name }`. Returns `{ token, user }` |
| `POST` | `/api/auth/login` | Body: `{ email, password }`. Returns `{ token, user }` |
