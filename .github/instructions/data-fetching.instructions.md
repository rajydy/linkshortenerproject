---
description: "Use when fetching or mutating application data, writing Drizzle queries, or accessing Neon PostgreSQL from the Next.js App Router."
applyTo: "src/app/**/*.tsx, data/**/*.ts, db/**/*.ts"
---
# Data Fetching

- Fetch and render application data in Next.js App Router Server Components. Do not query the database from Client Components.
- Keep database access in server-only helpers under `data/`; components should call those helpers rather than query Drizzle directly.
- Implement database interactions with Drizzle ORM and the shared client exported from `db/index.ts`. The client connects to Neon PostgreSQL using the server-side `DATABASE_URL`.
- Define and update database models in `db/schema.ts`; use its inferred select and insert types instead of duplicating row shapes.
- For user-owned records, derive the Clerk user ID from the authenticated server session and include it in the database query filter. Never trust a client-supplied owner ID.
- Select only the fields needed by the caller. Avoid passing database clients, credentials, or unnecessary records to Client Components.
- Keep request-specific auth and database reads outside cached scopes unless the cache key and invalidation are explicitly scoped to the user.
- Follow Next.js Cache Components requirements: put request-time reads such as Clerk `auth()` inside an async child under `<Suspense>`.
- Let database failures surface through the existing Next.js error handling; do not silently return success-shaped fallback data.
