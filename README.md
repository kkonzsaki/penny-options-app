# Penny Options Scout — Full Project (Tradier-backed)

This repository contains a demo full-stack application that identifies optionable low-priced stocks and suggests option contracts.
It includes:
- backend (FastAPI) with auth, Tradier client, scoring
- worker that polls Tradier and upserts signals
- frontend (React + Vite + Tailwind) UI
- docker-compose for local development with Postgres

**Important:** Replace values in `.env.sample` and rename to `.env` before running.

Quick start (local):
```bash
cp .env.sample .env
# fill .env with keys
docker compose up --build
```

For deployment to Render follow the instructions in the conversation.
