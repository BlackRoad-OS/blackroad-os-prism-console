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

