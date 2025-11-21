# BlackRoad OS – Prism Console

Operator / admin console for BlackRoad OS services. This frontend surfaces system health, environment metadata, and operator workflows for the broader BlackRoad OS platform.

## Tech Stack
- Next.js (App Router)
- React
- TypeScript

## Getting Started
Install dependencies and run the development server:

```bash
# blackroad-os-prism-console

Prism console for BlackRoad OS — environments, deployments, observability, admin views.

## Project Structure

```
blackroad-os-prism-console/
├── frontend/          # Next.js application
│   ├── app/          # Next.js App Router pages
│   │   ├── environments/  # Environments page
│   │   ├── deployments/   # Deployments page
│   │   └── logs/          # Logs page
│   └── components/   # Reusable React components
├── backend/          # Placeholder for future API services
└── infra/            # Infrastructure and environment configs
    └── env.example   # Environment configuration template
```

## Getting Started

### Frontend Development

```bash
cd frontend
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
The application will be available at `http://localhost:3000`.

### Features

- **Environments**: Manage deployment environments
- **Deployments**: Track and control application deployments  
- **Logs**: Monitor and analyze system logs

## Deployment

This project is designed to be deployed on:
- **Frontend**: Railway or Cloudflare Pages
- **Backend**: Railway (when implemented)

See `infra/env.example` for required environment variables.

## Development Roadmap

- [x] Basic Next.js frontend structure
- [x] Sidebar navigation
- [x] Placeholder pages for main sections
- [ ] Backend API implementation
- [ ] Database integration
- [ ] Authentication
- [ ] Deployment automation
- [ ] Cloudflare/Railway integration

## License

See [LICENSE](LICENSE) file for details.

