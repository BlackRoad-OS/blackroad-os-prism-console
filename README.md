# BlackRoad OS – Prism Console

Operator / admin console for BlackRoad OS services. This frontend surfaces system health, environment metadata, and operator workflows for the broader BlackRoad OS platform.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript

## Getting Started
Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Visit http://localhost:3000 by default.

## Build & Start
Production build and runtime (default port 8080 for deployment targets like Railway):

```bash
npm run build
npm start
```

## Environment Variables
See `.env.example` for available variables. Key values:
- `OS_ROOT` – base BlackRoad OS root URL
- `SERVICE_BASE_URL` – public URL for this console
- `CORE_API_URL`, `AGENTS_API_URL` – optional upstream APIs

## Health & Info
- `/api/health` – health payload including service id and readiness
- `/api/info` – static metadata about the Prism Console service
- `/api/version` – version and environment snapshot
- `/api/debug-env` – safe environment surface for troubleshooting

## Deployment (Railway)
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Port: `8080`
- Healthcheck: `/api/health`

## Additional Notes
- Base URL: https://console.blackroad.systems
- OS Root: https://blackroad.systems
