.DEFAULT_GOAL := help
COMPOSE := docker compose

.PHONY: help install dev dev-web dev-api up down reset logs ps lint typecheck test build clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

dev: up ## Start infrastructure, then run web and api
	pnpm dev

dev-web: ## Run only the web app
	pnpm --filter @linguisticpro/web dev

dev-api: ## Run only the api
	pnpm --filter @linguisticpro/api dev

up: ## Start postgres, redis, minio, mailpit
	$(COMPOSE) up -d

down: ## Stop infrastructure
	$(COMPOSE) down

reset: ## Stop infrastructure and DELETE all local data
	$(COMPOSE) down -v

logs: ## Follow infrastructure logs
	$(COMPOSE) logs -f

ps: ## Show running containers
	$(COMPOSE) ps

lint: ## Lint all packages
	pnpm lint

typecheck: ## Typecheck all packages
	pnpm typecheck

test: ## Run all tests
	pnpm test

build: ## Build all packages
	pnpm build

clean: ## Remove build output and node_modules
	rm -rf node_modules apps/*/node_modules apps/*/.next apps/*/dist packages/*/node_modules .turbo