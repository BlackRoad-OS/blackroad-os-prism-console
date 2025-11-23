# Prism Console Overview

Prism Console is the internal observability and control panel for BlackRoad OS. It provides a human-friendly way to inspect the state of agents, finance, and cross-system events.

## What you can see today

- **Dashboard**: A single view of finance health, agent population, and recent events.
- **Agents**: List of registered agents, their domains and capabilities, with drill-down into task history.
- **Finance**: Read-only summary of cash balance, burn, runway, cash forecast, and example statements.
- **Events**: Filterable stream of recent system and agent events.

## Connectivity

The console talks to `blackroad-os-api` via the `NEXT_PUBLIC_API_BASE_URL` environment variable. Health indicators pull from `/health` on that base URL.

## Running locally

```bash
npm install
npm run dev
```

Configure environment variables (for example in `.env.local`):

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_ENV=dev
```

## Environments

You can point the console at different stacks by updating `NEXT_PUBLIC_API_BASE_URL` (and any `NEXT_PUBLIC_*` service URLs) to staging or production endpoints. The TopBar shows the current environment label.
