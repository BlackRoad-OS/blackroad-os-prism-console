# BlackRoad OS – Prism Console

Operator / admin console for BlackRoad OS services. The app is a Next.js (App Router) frontend that surfaces environment metadata, service health, and operator workflows.

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
- **Required env vars** (production):
  - `PORT`: provided by Railway; the app listens on this port.
  - `HOST`: set to `0.0.0.0` to bind to all interfaces (defaulted in `npm start`).
  - `NODE_ENV`: set to `production` in Railway.
  - `PUBLIC_CONSOLE_URL`: public URL for the console (used for links and health checks).
  - `NEXT_PUBLIC_OPERATOR_API_URL` / `OPERATOR_API_URL`: base URL for the Operator API (public vs server-side).
  - `NEXT_PUBLIC_CORE_API_URL` / `CORE_API_URL`: base URL for the Core API (public vs server-side).
  - `NEXT_PUBLIC_AGENTS_API_URL` / `AGENTS_API_URL`: base URL for the Agents API (public vs server-side).

## Local Development
Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000 during development.

## Project Notes
- Next.js 16 with the App Router and TypeScript.
- Production build outputs a standalone server (`.next/standalone`) suitable for Railway or container runtimes.
- Additional informational endpoints live under `/api` (e.g., `/api/health`, `/api/info`, `/api/version`).
