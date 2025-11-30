# BlackRoad OS Prism Console - Development Makefile

.PHONY: help install dev build test lint health version clean docker-build docker-run

PORT := 3000

help:
	@echo "BlackRoad OS Prism Console - Development Commands"
	@echo ""
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Run development server"
	@echo "  make build      - Build for production"
	@echo "  make test       - Run tests"
	@echo "  make lint       - Run linter"
	@echo "  make health     - Check health endpoint"
	@echo "  make version    - Check version endpoint"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-run   - Run Docker container"
	@echo ""

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

test:
	pnpm test

lint:
	pnpm lint

health:
	@curl -sf http://localhost:$(PORT)/api/health | python3 -m json.tool || echo "Service not running on port $(PORT)"

version:
	@curl -sf http://localhost:$(PORT)/api/version | python3 -m json.tool || echo "Service not running on port $(PORT)"

clean:
	rm -rf .next node_modules

docker-build:
	docker build -t blackroad-os-prism-console .

docker-run:
	docker run -p $(PORT):$(PORT) -e PORT=$(PORT) blackroad-os-prism-console
