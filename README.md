# BlackRoad OS — Prism Console

## Short Description

Admin console for deployments, observability, environments, and system control.

## Long Description

Prism Console is the command center of BlackRoad OS. It exposes environment controls, deployment dashboards, worker health, agent supervision, configuration management, secrets overview (abstracted), and unified observability tools. It serves founders, engineers, and operators.

## Structured Table

| Field | Value |
| --- | --- |
| **Purpose** | Admin, ops, observability, environments |
| **Depends On** | API Gateway, Operator Engine |
| **Used By** | Founders, devs, ops |
| **Owner** | Alexa + Cece (Prism Operations Group) |
| **Status** | Active — mission critical |

## Roadmap Board (Prism)

Columns:

- Backlog
- UI Wireframing
- Integration Layer
- Telemetry
- Review
- Prod Ready

Sample tasks:

- Agent lifecycle dashboard
- Deployment monitor
- Worker queue timeline
- Error heatmaps
- Rail & Cloudflare integrated view

## Deployment

Prism Console deploys to the Railway project **`blackroad-prism-console`** as the service **`prism-console-web`**. It fronts environments published via Cloudflare:

- **Production:** `https://console.blackroad.systems`
- **Staging:** `https://staging.console.blackroad.systems`
- **Dev:** Railway-provided dev URL (optionally `https://dev.console.blackroad.systems`)

### Runtime commands

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run start`

### Environment variables

| Variable | Purpose | Prod | Staging | Dev |
| --- | --- | --- | --- | --- |
| `NODE_ENV` | Runtime environment | `production` | `staging` | `development` |
| `CORE_API_URL` | Core backend base URL | `https://core.blackroad.systems` | `https://staging.core.blackroad.systems` | Core dev Railway URL |
| `AGENTS_API_URL` | Agents API base URL | `https://agents.blackroad.systems` | `https://staging.agents.blackroad.systems` | Agents dev Railway URL |
| `PUBLIC_CONSOLE_URL` | Console base URL | `https://console.blackroad.systems` | `https://staging.console.blackroad.systems` | Dev console URL |
| `NEXT_PUBLIC_CORE_API_URL` | Browser-safe core URL | `https://core.blackroad.systems` | `https://staging.core.blackroad.systems` | Core dev Railway URL |
| `NEXT_PUBLIC_AGENTS_API_URL` | Browser-safe agents URL | `https://agents.blackroad.systems` | `https://staging.agents.blackroad.systems` | Agents dev Railway URL |
| `NEXT_PUBLIC_CONSOLE_URL` | Browser-safe console URL | `https://console.blackroad.systems` | `https://staging.console.blackroad.systems` | Dev console URL |
| `DATABASE_URL` | (Optional) Metrics DB connection string | as provisioned | as provisioned | as provisioned |
| `SKIP_ENV_VALIDATION` | (Optional) Set to `true` to bypass env enforcement during local builds | optional | optional | `true` (in build script) |

### Health and status

- `GET /health` — lightweight liveness JSON suitable for Railway checks.
- `GET /status` — static status board that surfaces configured backend URLs; ready to wire to real health endpoints later.

### Railway definition

`railway.json` declares the project + service so `railway up` deploys with the right commands and port. Set `RAILWAY_TOKEN` in CI/CD and provide the above env vars per environment before deploying.
