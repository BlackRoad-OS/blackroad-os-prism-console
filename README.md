# BlackRoad OS – Prism Console

Prism Console is the operator-facing cockpit for the BlackRoad OS universe. It runs on Next.js (App Router) with TypeScript and
presents environment health, agents, finance, and RoadChain history. Prism speaks to **blackroad-os-api** using
`NEXT_PUBLIC_API_BASE_URL` and participates in the shared GitHub Project **"BlackRoad OS - Master Orchestration"** alongside
core, operator, web, docs, and infra repos.

## Pages
- **Dashboard**: System overview with service health, throughput, and a quick glance at agents + events.
- **Agents**: Filterable agent registry with status pills and a detail viewer for raw metadata.
- **Finance**: Wallet-style snapshot of treasury, infra costs, savings, and trend hints.
- **Events / RoadChain**: Event stream filters plus a lightweight RoadChain block explorer (mocked until the API endpoint ships).

### Operator doctrine
- **Prism Console Agent prompt**: See `docs/PRISM_CONSOLE_PROMPT.md` for the live UX mission brief that defines the console's role, goals, and canonical surfaces.

## Getting started
Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000 during development.

### Environment variables
Create `.env.local` with at least:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_ENV=dev
```

`NEXT_PUBLIC_API_BASE_URL` should point to the `blackroad-os-api` instance that exposes health, agents, finance, events, and
roadchain endpoints. The UI falls back to typed mock data if the API is unreachable, so the console remains navigable.

## Deployment quick reference
- **Build**: `npm run build`
- **Start**: `npm start` (standalone Next.js server)
- **Health**: `GET /health` returns `{ "status": "ok", "service": "prism-console" }`

Environment tips for Railway or container runtimes:
- `PORT`: provided by the platform; set `HOST=0.0.0.0` when starting.
- `NODE_ENV`: `production` for deployment.
- `NEXT_PUBLIC_API_BASE_URL`: target the correct `blackroad-os-api` environment.
- `NEXT_PUBLIC_ENV`: label shown in the top status bar.

## Tech notes
- Next.js 16 (App Router) + React + TypeScript.
- Styling via `globals.css` tokens (dark-mode first, no hard-coded brand colors in components).
- Mock data lives in `src/lib/apiClient.ts` to keep the UI usable until the backend endpoints are live.
