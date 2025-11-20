# BlackRoad OS — Prism Console

Operator console UI for BlackRoad OS built with Next.js (App Router + TypeScript).

## Running locally

1. Install dependencies: `npm ci`
2. Set environment variables (see below). You can use a `.env.local` file for local development.
3. Start the dev server: `npm run dev`
4. Visit `http://localhost:3000` to load the console.

## Key routes

- `/` — Overview of configured upstream endpoints.
- `/status` — Live health table that polls each configured `/health` endpoint.
- `/health` — UI that consumes the `/api/health` JSON endpoint and shows service badges.
- `/agents` — Lists agents via `AGENTS_API_URL/agents` and triggers `AGENTS_API_URL/agents/run` through internal API proxies.
- `/api/health` and `/api/version` — Machine-friendly health and version metadata.

## Configuration

Environment variables are centralized in `src/lib/config.ts`. Server-side values stay private; `NEXT_PUBLIC_*` values are exposed to the browser.

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | Runtime environment selector (`development` \| `staging` \| `production`). |
| `CORE_API_URL` | Server-side Core API base URL used for backend calls. |
| `AGENTS_API_URL` | Server-side Agents API base URL for listing/running agents. |
| `PUBLIC_CONSOLE_URL` | Public URL for this console; also used for the operator badge. |
| `NEXT_PUBLIC_CORE_API_URL` | Browser-safe Core API base URL (if direct browser calls are allowed). |
| `NEXT_PUBLIC_AGENTS_API_URL` | Browser-safe Agents API base URL (if direct browser calls are allowed). |
| `SKIP_ENV_VALIDATION` | Optional; set to `true` in dev to bypass strict env checks. |

> Keep sensitive URLs in server-side vars (`CORE_API_URL`, `AGENTS_API_URL`). Only expose endpoints in `NEXT_PUBLIC_*` if they are safe for the browser.

## Wiring to backend services

- Health polling: `/api/health` calls each configured service and appends `/health` to the base URL. `/status` renders the live results.
- Version metadata: `/api/version` (and `/version`) returns the build version, environment, and timestamp.
- Agents: `/api/agents` proxies `GET {AGENTS_API_URL}/agents`; `/api/agents/run` proxies `POST {AGENTS_API_URL}/agents/run`. The `/agents` page consumes these endpoints.

## Deployment

- Railway service: `prism-console-web` defined in `railway.json` (build `npm run build`, start `npm run start`, health check `/api/health`).
- GitHub Actions: `.github/workflows/console-deploy.yaml` installs dependencies, runs lint+build, deploys to the correct Railway environment (`dev`/`staging`/`prod`), and performs a post-deploy health check.

Production and staging URLs remain `https://console.blackroad.systems` and `https://staging.console.blackroad.systems`; dev uses the Railway-provided URL (or `DEV_CONSOLE_URL` in CI for health checks).
