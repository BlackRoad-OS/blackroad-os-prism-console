# Prism Console (Gen-0)

Prism Console is the single-pane-of-glass for every BlackRoad environment. This scaffold keeps the surface minimal and agent-extendable while wiring up the App Router, Tailwind, shadcn-style tokens, and CI hooks.

## Getting Started

Install deps and run locally:

```bash
pnpm install
pnpm dev  # http://localhost:3000
```

Environment variables live in `.env.local` (see `prisma-console.env.example`).

## Commands

- `pnpm dev` – start the Next.js dev server
- `pnpm lint` – run eslint with Next.js presets
- `pnpm test` – run vitest (jsdom)
- `pnpm build` – create a production build (also writes `public/sig.beacon.json`)
- `pnpm start` – start the production server on `$PORT`

## API surface

- `GET /api/health` → `{ status: "ok", uptime: number }`
- `GET /api/version` → `{ version: string, commit: string }`

## Deployment

Dockerized runtime matches the local workflow:

```bash
docker build -t blackroad/prism-console:0.0.1 .
docker run -e PORT=3000 -p 3000:3000 blackroad/prism-console:0.0.1
```

Railway support is provided via `railway.toml`; adjust environment variables as needed.

## Roadmap breadcrumbs

- TODO(prism-next): Wire `lib/fetcher.ts` to the BlackRoad OS API Gateway
- TODO(prism-next): Stream deployment events over `$CORE_HUB/ws`
- TODO(prism-next): Replace placeholder cards with live environment KPIs
