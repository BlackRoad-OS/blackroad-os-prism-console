# BlackRoad OS Infrastructure Bible

**Version:** 1.0.0  
**Last Updated:** December 12, 2025  
**Author:** Alexa Louise Amundson (Cecilia)  
**Organization:** BlackRoad OS, Inc.

-----

## Table of Contents

1. [Philosophy: Why This Architecture](#philosophy-why-this-architecture)
1. [The Three Layers](#the-three-layers)
1. [Hardware Inventory](#hardware-inventory)
1. [Service Inventory](#service-inventory)
1. [Network Architecture](#network-architecture)
1. [Cloudflare Setup](#cloudflare-setup)
1. [Tailscale Mesh Network](#tailscale-mesh-network)
1. [Docker & Containers](#docker--containers)
1. [Deployment Pipeline](#deployment-pipeline)
1. [Domain Routing](#domain-routing)
1. [Failover Strategy](#failover-strategy)
1. [Local LLM Infrastructure](#local-llm-infrastructure)
1. [API Integration Layer](#api-integration-layer)
1. [Security Model](#security-model)
1. [Monitoring & Logging](#monitoring--logging)
1. [Cost Analysis](#cost-analysis)
1. [Setup Checklist](#setup-checklist)
1. [Troubleshooting](#troubleshooting)

-----

## Philosophy: Why This Architecture

### The Problem with Traditional Cloud

Traditional cloud architecture (AWS, GCP, Azure) solves problems that most individual builders and small teams don’t have:

- 99.99% uptime SLAs (you need 99% for real users)
- Infinite horizontal scaling (you need to handle 1,000-10,000 users)
- Enterprise compliance (you need basic security)
- Someone to sue when it breaks (you need it to just work)

The result is:

- $500-5,000+/month in cloud bills
- Vendor lock-in across 47 services
- Complexity that requires a DevOps team
- Your data living on someone else’s computers

### The BlackRoad Approach

```
YOU OWN THE COMPUTE.
THE CLOUD IS JUST ROUTING.
```

This architecture is built on three principles:

1. **Sovereignty**: Your hardware, your data, your control
1. **Simplicity**: Minimum viable infrastructure, maximum capability
1. **Economics**: One-time hardware costs + ~$50/month operational

### What This Enables

- Run local LLMs without per-token costs
- Keep sensitive data on your own network
- Full control over the entire stack
- No surprise cloud bills
- Actual understanding of what’s running and why

-----

## The Three Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                        LAYER 3: YOU BUILD                        │
│                                                                  │
│   Lucidia Core │ Agent Orchestration │ Memory Systems │ UI/API  │
│                                                                  │
│   This is what only YOU can build. The 1,000 agents. The        │
│   Z-framework. The paraconsistent logic. The recursive AI.      │
├─────────────────────────────────────────────────────────────────┤
│                     LAYER 2: SERVICES VIA API                    │
│                                                                  │
│   Stripe │ Canva │ HuggingFace │ Google Drive │ Ollama │ Qwen   │
│                                                                  │
│   Don't rebuild these. Just call them. They've spent millions   │
│   making payment rails, model hosting, design tools work.       │
├─────────────────────────────────────────────────────────────────┤
│                      LAYER 1: INFRASTRUCTURE                     │
│                                                                  │
│   Cloudflare (Edge) → Your Hardware (Compute) → Droplet (Backup)│
│                                                                  │
│   This document is primarily about this layer.                  │
└─────────────────────────────────────────────────────────────────┘
```

-----

## Hardware Inventory

### Current Fleet

|Device              |Hostname          |Role                    |Specs                  |IP (Tailscale)|
|--------------------|------------------|------------------------|-----------------------|--------------|
|Raspberry Pi 5 #1   |`pi5-alpha`       |Agent Pool / API Gateway|Quad A76, 8GB          |`100.x.x.1`   |
|Raspberry Pi 5 #2   |`pi5-beta`        |Agent Pool              |Quad A76, 8GB          |`100.x.x.2`   |
|Raspberry Pi 5 #3   |`pi5-gamma`       |Database / State        |Quad A76, 8GB          |`100.x.x.3`   |
|Raspberry Pi 400    |`pi400-delta`     |Monitoring / Logs       |Quad A72, 4GB          |`100.x.x.4`   |
|Raspberry Pi Zero   |`pi0-epsilon`     |Health Checks Only      |Single A53, 512MB      |`100.x.x.5`   |
|Jetson Orin Nano    |`jetson-prime`    |LLM Inference           |6-core + 1024 CUDA, 8GB|`100.x.x.10`  |
|DigitalOcean Droplet|`droplet-failover`|Backup / Failover       |1 vCPU, 1GB            |`100.x.x.100` |

### Role Definitions

**Agent Pool (Pi 5s)**

- Runs containerized agent instances
- Handles HTTP API requests
- Manages WebSocket connections
- Executes orchestration logic

**LLM Inference (Jetson)**

- Runs vLLM or llama.cpp
- Serves model inference requests
- Handles embedding generation
- ONLY device that runs actual AI models

**Database/State (Pi 5 #3)**

- PostgreSQL or SQLite
- Milvus vector database
- Append-only memory journals
- State persistence

**Monitoring (Pi 400)**

- Prometheus metrics collection
- Grafana dashboards
- Log aggregation
- Health check orchestration

**Failover (Droplet)**

- Minimal API that returns “system down for maintenance”
- SSH jump host when home network is unreachable
- Backup cloudflared tunnel endpoint

-----

## Service Inventory

### Cloudflare (Current State)

**Workers (59 total - NEEDS CLEANUP)**

Core Workers to KEEP:

- `blackroad-edge-gateway` - Main entry point, routes all traffic
- `blackroad-api-gateway` - API routing and auth
- `blackroad-auth` - Authentication/identity
- `blackroad-router` - Domain-based routing
- `lucidia-core` - Lucidia system entry point
- `cece` - Cecilia agent interface

Workers to EVALUATE:

- `blackroad-billing`, `blackroad-stripe-*` - Consolidate into one
- `blackroad-*-router` (7 different routers) - Consolidate
- Various templates and tests - DELETE

**KV Namespaces (16 total)**

Essential:

- `API_KEYS` - API key storage
- `API_KEY_METADATA` - Key metadata
- `IDENTITIES` - User/agent identities
- `RATE_LIMITS` / `RATE_LIMIT` - Rate limiting (consolidate these)
- `CACHE` - General caching
- `BILLING` - Billing state

Evaluate/Consolidate:

- `blackroad-router-*` namespaces
- `blackroad-api-*` namespaces
- `TELEMETRY_KV`

**D1 Databases (4 total)**

- `blackroad-os-main` - Primary database
- `blackroad-logs` - Log storage
- `blackroad-d1-database` - Generic (evaluate purpose)
- `openapi-template-db` - DELETE (template artifact)

**R2 Buckets (6 total)**

- `blackroad-os-core-storage` - Core system files
- `blackroad-os-agents-storage` - Agent data/state
- `blackroad-os-api-storage` - API artifacts
- `blackroad-os-api-gateway-storage` - Gateway config
- `blackroad-os-mesh-storage` - Mesh network data
- `lucidia-core-storage` - Lucidia system files

-----

## Network Architecture

### The Traffic Flow

```
                         INTERNET
                            │
                            ▼
                    ┌───────────────┐
                    │  CLOUDFLARE   │
                    │   (DNS/CDN)   │
                    └───────┬───────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
    ┌───────────────┐               ┌───────────────┐
    │   WORKERS     │               │   TUNNELS     │
    │ (Edge Logic)  │               │ (To Hardware) │
    └───────┬───────┘               └───────┬───────┘
            │                               │
            │   ┌───────────────────────────┘
            │   │
            ▼   ▼
    ┌─────────────────────────────────────────────────┐
    │              TAILSCALE MESH                      │
    │                                                  │
    │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
    │  │  Pi 5   │──│  Pi 5   │──│  Pi 5   │         │
    │  │ (alpha) │  │ (beta)  │  │ (gamma) │         │
    │  └────┬────┘  └────┬────┘  └────┬────┘         │
    │       │            │            │               │
    │       └────────────┼────────────┘               │
    │                    │                            │
    │              ┌─────┴─────┐                      │
    │              │  JETSON   │                      │
    │              │  (LLM)    │                      │
    │              └───────────┘                      │
    │                                                  │
    │  ┌─────────┐              ┌─────────────────┐   │
    │  │ Pi 400  │              │ DO Droplet      │   │
    │  │ (mon)   │              │ (failover)      │   │
    │  └─────────┘              └─────────────────┘   │
    └─────────────────────────────────────────────────┘
```

### Why This Design

1. **Cloudflare Workers** handle edge logic (routing, auth, rate limiting) at 200+ global edge locations
1. **Cloudflare Tunnels** create secure outbound connections from your hardware (no open ports, no static IP needed)
1. **Tailscale** creates a private mesh between all your devices regardless of physical location
1. **Your Hardware** does the actual compute work
1. **Droplet** is the escape hatch when your home network fails

-----

## Cloudflare Setup

### Step 1: Domain Configuration

For each domain (blackroad.io, lucidia.earth, etc.):

1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
1. Change nameservers to Cloudflare:
   
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
1. Wait for propagation (usually 10-60 minutes)
1. Domain now managed by Cloudflare

### Step 2: DNS Records

Basic DNS setup for a domain pointing to your tunnel:

```
Type    Name        Content                         Proxy
────────────────────────────────────────────────────────────
CNAME   @           <tunnel-id>.cfargotunnel.com    Proxied
CNAME   www         <tunnel-id>.cfargotunnel.com    Proxied
CNAME   api         <tunnel-id>.cfargotunnel.com    Proxied
CNAME   agents      <tunnel-id>.cfargotunnel.com    Proxied
```

The tunnel ID comes from Step 3.

### Step 3: Tunnel Setup

**On each Pi/Jetson, install cloudflared:**

```bash
# For Raspberry Pi (ARM64)
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/

# Login to Cloudflare
cloudflared tunnel login
# This opens a browser - authenticate with your Cloudflare account

# Create a tunnel
cloudflared tunnel create pi5-alpha
# This outputs a tunnel ID and creates credentials file

# Note the tunnel ID (e.g., a]1234abcd-5678-efgh-9012-ijklmnop3456)
```

**Create tunnel config:**

```yaml
# /home/pi/.cloudflared/config.yml

tunnel: <your-tunnel-id>
credentials-file: /home/pi/.cloudflared/<tunnel-id>.json

ingress:
  # API requests go to local API server
  - hostname: api.blackroad.io
    service: http://localhost:8000
  
  # Agent requests go to agent pool
  - hostname: agents.blackroad.io
    service: http://localhost:8001
  
  # Main website
  - hostname: blackroad.io
    service: http://localhost:3000
  
  # Catch-all (required)
  - service: http_status:404
```

**Run the tunnel:**

```bash
# Test it first
cloudflared tunnel run pi5-alpha

# Then install as service
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

### Step 4: Workers (Simplified)

Instead of 59 workers, you need approximately 5:

**1. Edge Gateway (`blackroad-edge-gateway`)**

```javascript
// Routes all incoming requests to appropriate backend
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname;
    
    // Route based on domain
    const routes = {
      'api.blackroad.io': 'https://pi5-alpha.tail<xxxxx>.ts.net:8000',
      'agents.blackroad.io': 'https://pi5-beta.tailxxxxx.ts.net:8001',
      'llm.blackroad.io': 'https://jetson-prime.tailxxxxx.ts.net:8080',
    };
    
    const backend = routes[hostname];
    if (backend) {
      return fetch(backend + url.pathname + url.search, request);
    }
    
    return new Response('Not Found', { status: 404 });
  }
}
```

**2. Auth Gateway (`blackroad-auth`)**

```javascript
// Validates API keys and JWT tokens
export default {
  async fetch(request, env) {
    const apiKey = request.headers.get('X-API-Key');
    
    if (!apiKey) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    // Check API key in KV
    const keyData = await env.API_KEYS.get(apiKey);
    if (!keyData) {
      return new Response('Invalid API Key', { status: 403 });
    }
    
    // Add user info to request headers and forward
    const newRequest = new Request(request);
    newRequest.headers.set('X-User-ID', JSON.parse(keyData).userId);
    
    return fetch(newRequest);
  }
}
```

**3. Rate Limiter (`blackroad-ratelimit`)**

```javascript
// Rate limits by API key
export default {
  async fetch(request, env) {
    const apiKey = request.headers.get('X-API-Key') || 'anonymous';
    const key = `rate:${apiKey}:${Math.floor(Date.now() / 60000)}`;
    
    const current = parseInt(await env.RATE_LIMITS.get(key) || '0');
    const limit = 100; // 100 requests per minute
    
    if (current >= limit) {
      return new Response('Rate Limited', { status: 429 });
    }
    
    await env.RATE_LIMITS.put(key, String(current + 1), { expirationTtl: 120 });
    
    return fetch(request);
  }
}
```

**4. Billing/Stripe (`blackroad-billing`)**

```javascript
// Handles all Stripe webhooks and billing logic
// Consolidate blackroad-stripe-billing, blackroad-stripe-webhooks, blackroad-stripe-checkout
```

**5. Telemetry (`blackroad-telemetry`)**

```javascript
// Collects and forwards logs/metrics
```

### Step 5: KV Cleanup

Consolidate to these namespaces:

|Namespace   |Purpose                                 |
|------------|----------------------------------------|
|`AUTH`      |API keys, tokens, sessions              |
|`IDENTITY`  |User and agent identities               |
|`RATE_LIMIT`|Rate limiting counters                  |
|`CACHE`     |General response caching                |
|`BILLING`   |Billing state and subscription info     |
|`STATE`     |Application state that needs edge access|

-----

## Tailscale Mesh Network

### Why Tailscale

- Creates encrypted WireGuard tunnels between all devices
- Works through NAT, firewalls, carrier-grade NAT
- No open ports required
- Devices get stable IPs (100.x.x.x range)
- Free for up to 100 devices

### Setup on Each Device

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Connect to your network
sudo tailscale up

# First time: authenticate via URL
# This adds the device to your tailnet
```

### Tailscale ACLs

In your Tailscale admin console, set up ACLs:

```json
{
  "acls": [
    // Allow all devices to talk to each other
    {"action": "accept", "src": ["*"], "dst": ["*:*"]},
  ],
  "tagOwners": {
    "tag:server": ["autogroup:admin"],
    "tag:infra": ["autogroup:admin"],
  }
}
```

### Device Naming

After setup, each device gets a Tailscale hostname:

```
pi5-alpha.tailXXXXX.ts.net
pi5-beta.tailXXXXX.ts.net
jetson-prime.tailXXXXX.ts.net
droplet-failover.tailXXXXX.ts.net
```

These hostnames work from anywhere in your tailnet, even if the devices are in different physical locations.

-----

## Docker & Containers

### Why Docker

- “It works on my machine” → “It works everywhere”
- Identical environments across Pi, Jetson, Droplet
- Easy rollback (just run previous image)
- Clean separation of concerns

### Base Dockerfile for Services

```dockerfile
# Dockerfile.base
FROM python:3.11-slim

WORKDIR /app

# Install common dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Default command
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Multi-Architecture Builds

Your devices have different architectures:

- Pi 5, Pi 400, Pi Zero: ARM64
- Jetson: ARM64 (but with CUDA)
- Droplet: AMD64

Build for multiple architectures:

```bash
# Enable buildx
docker buildx create --use

# Build for multiple platforms
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ghcr.io/blackroad-os/api:latest \
  --push .
```

### Docker Compose for Local Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: ./api
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/blackroad
      - JETSON_URL=http://jetson-prime.tailXXXXX.ts.net:8080
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=blackroad
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

-----

## Deployment Pipeline

### The Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   CODE       │────▶│    BUILD     │────▶│   DEPLOY     │
│              │     │              │     │              │
│ - Cursor     │     │ - GitHub     │     │ - Pi pulls   │
│ - Pyto       │     │   Actions    │     │   new image  │
│ - Working    │     │ - Docker     │     │ - Restart    │
│   Copy       │     │   buildx     │     │   container  │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
    git push          Build image          Watchtower OR
    to main           Push to GHCR         SSH + docker pull
```

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Pi
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: pi5-alpha.tailXXXXX.ts.net
          username: pi
          key: ${{ secrets.PI_SSH_KEY }}
          script: |
            docker pull ghcr.io/${{ github.repository }}:latest
            docker stop api || true
            docker rm api || true
            docker run -d --name api \
              -p 8000:8000 \
              --restart unless-stopped \
              ghcr.io/${{ github.repository }}:latest
```

### Alternative: Watchtower (Auto-Update)

Run Watchtower on each Pi to automatically pull new images:

```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 300 \
  --cleanup
```

This checks for new images every 5 minutes and auto-updates.

### Manual Deployment (Emergency/Phone)

From Shellfish or any SSH client:

```bash
# SSH to Pi via Tailscale
ssh pi@pi5-alpha.tailXXXXX.ts.net

# Pull latest and restart
docker pull ghcr.io/blackroad-os/api:latest
docker-compose down
docker-compose up -d
```

-----

## Domain Routing

### Domain Map

|Domain             |Purpose                 |Routes To             |
|-------------------|------------------------|----------------------|
|blackroad.io       |Main company site       |Pi 5 Alpha (port 3000)|
|api.blackroad.io   |Public API              |Pi 5 Alpha (port 8000)|
|agents.blackroad.io|Agent interactions      |Pi 5 Beta (port 8001) |
lucidia.earth      |Lucidia platform        |Pi 5 Alpha (port 3001)|
|llm.blackroad.io   |LLM inference (internal)|Jetson (port 8080)    |
|status.blackroad.io|Status page             |Cloudflare Worker     |

### Cloudflare Tunnel Config (Combined)

```yaml
# /home/pi/.cloudflared/config.yml on Pi 5 Alpha

tunnel: <tunnel-id>
credentials-file: /home/pi/.cloudflared/<tunnel-id>.json

ingress:
  # Main site
  - hostname: blackroad.io
    service: http://localhost:3000
  - hostname: www.blackroad.io
    service: http://localhost:3000
  
  # API
  - hostname: api.blackroad.io
    service: http://localhost:8000
  
  # Lucidia
  - hostname: lucidia.earth
    service: http://localhost:3001
  - hostname: www.lucidia.earth
    service: http://localhost:3001
  
  # Internal routing via Tailscale
  - hostname: agents.blackroad.io
    service: http://pi5-beta.tailXXXXX.ts.net:8001
  
  - hostname: llm.blackroad.io
    service: http://jetson-prime.tailXXXXX.ts.net:8080
  
  # Catch-all
  - service: http_status:404
```

-----

## Failover Strategy

### When Home Internet Dies

1. Cloudflare detects tunnel is down (within 30 seconds)
1. Traffic fails over to Droplet tunnel
1. Droplet serves maintenance page OR proxies to cached responses

### Droplet Setup

```bash
# On your DigitalOcean droplet

# Install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Create failover tunnel
cloudflared tunnel login
cloudflared tunnel create droplet-failover

# Config
cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: <failover-tunnel-id>
credentials-file: /home/user/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: "*.blackroad.io"
    service: http://localhost:8080
  - hostname: "*.lucidia.earth"
    service: http://localhost:8080
  - service: http_status:404
