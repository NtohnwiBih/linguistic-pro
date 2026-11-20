# linguisticPro

AI-powered language exam preparation, launching first with **IELTS** (Academic and General Training) as an installable PWA.

The learning loop: **Practice → Evaluate → Explain → Diagnose → Review → Improve**.

## Status

| Part | State |
| --- | --- |
| `apps/web` (Next.js) | In progress: website and auth views |
| `apps/api` (NestJS) | Planned |
| `packages/database` (Prisma) | Planned |
| `packages/shared` (zod schemas) | Planned |

## Tech stack

- **Web:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, next-intl, next-themes, Zustand, TanStack Query, React Hook Form + Zod
- **API (planned):** NestJS, PostgreSQL 17 + pgvector via Prisma, Redis + BullMQ, OpenAI behind a provider abstraction
- **Infra:** Docker Compose (Postgres, Redis, MinIO, Mailpit), pnpm workspaces, Turborepo

## Repository layout

```text
linguistic-pro/
├── apps/
│   ├── web/              # Next.js app
│   └── api/              # NestJS API (planned)
├── packages/             # shared code (planned)
├── docker-compose.yml    # local infrastructure
├── Makefile
├── pnpm-workspace.yaml
└── turbo.json
```

## Getting started

Requirements: Node.js 22+, pnpm 10, Docker.

```bash
pnpm install
cp .env.example .env        # then edit the values
make dev-web                # http://localhost:3000
```

Start the local infrastructure when the API needs it:

```bash
make up      # Postgres, Redis, MinIO, Mailpit
make down    # stop
```

## Commands

Run `make help` for the full list.

| Command | What it does |
| --- | --- |
| `make dev-web` | Run the web app |
| `make up` / `make down` | Start / stop local infrastructure |
| `make lint` | Lint all packages |
| `make typecheck` | Typecheck all packages |
| `make test` | Run all tests |
| `make build` | Build all packages |

## Branches

- `development`: integration branch, all work lands here.
- `production`: release branch. Only updated by merging `development`.

## Environment variables

Copy `.env.example` to `.env`. Never commit `.env`; only `.env.example` is tracked.
