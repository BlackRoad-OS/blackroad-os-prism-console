# BlackRoad OS – Prism Console

Operator / admin console for BlackRoad OS services. The app is a Next.js (App Router) frontend that surfaces environment metadata, service health, agent observability, finance telemetry, and the event stream.

## Features
- Overview dashboard with finance summary, agent counts, and latest events.
- Agents list and detail drill-down with recent tasks.
- Finance view with cash balance, runway, forecast buckets, and example statements.
- Events stream with basic filters.

## Local Development
Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000 during development.

### Environment
Set up `.env.local` (see `.env.example`) with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_ENV=dev
```

Additional optional URLs remain supported:
- `NEXT_PUBLIC_OPERATOR_API_URL` / `OPERATOR_API_URL`
- `NEXT_PUBLIC_CORE_API_URL` / `CORE_API_URL`
- `NEXT_PUBLIC_AGENTS_API_URL` / `AGENTS_API_URL`
- `PUBLIC_CONSOLE_URL`

## Deployment Quick Reference (Railway)
- **Build**: `npm run build`
- **Start**: `npm start` (runs the standalone Next.js server with `HOST=0.0.0.0` and `PORT=${PORT:-8080}`)
- **Health**: `GET /health`
  ```json
  {
    "status": "ok",
    "service": "prism-console"
  }
  ```

Production tips:
- `PORT`: provided by Railway; the app listens on this port.
- `HOST`: set to `0.0.0.0` to bind to all interfaces (defaulted in `npm start`).
- `NODE_ENV`: set to `production` in Railway.
- `NEXT_PUBLIC_API_BASE_URL`: target `blackroad-os-api` environment.
- `NEXT_PUBLIC_ENV`: label displayed in the console top bar.

## Project Notes
- Next.js 16 with the App Router and TypeScript.
- Production build outputs a standalone server (`.next/standalone`) suitable for Railway or container runtimes.
- Additional informational endpoints live under `/api` (e.g., `/api/health`, `/api/info`, `/api/version`).
- See `docs/overview.md` for a product-focused overview of Prism Console.
