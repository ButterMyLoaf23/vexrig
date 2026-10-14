# vexrig
# VexRig

VexRig is a SvelteKit and Express PC builder backed by PostgreSQL and Prisma.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and update `DATABASE_URL`.
3. Create the database schema with `npm run db:migrate`.
4. Start the frontend and API with `npm run dev`.

The frontend runs on the Vite port shown in the terminal. The API runs on
`http://localhost:3000`, with a database-backed health check at
`GET /api/health`.

## GitHub Pages

Pushes to `main` build and deploy the SvelteKit frontend through GitHub Actions.
In the repository settings, set Pages → Build and deployment → Source to
**GitHub Actions**. GitHub Pages can host the frontend, but it cannot run the
Express API or PostgreSQL database; those need a separate backend deployment.
