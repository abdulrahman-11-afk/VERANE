# VÉRANE

Premium fashion commerce built with Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Stripe.

## Local setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `DATABASE_URL` plus integration keys.
4. Run `npm run db:generate` and `npm run db:migrate`.
5. Run `npm run db:seed` to load the catalog.
6. Run `npm run dev` and open http://localhost:3000.

Without a database, the storefront uses the typed catalog fallback so the UI and product browsing remain available. Cart state is persisted in local storage for guests. Stripe checkout and account synchronization activate after credentials and database configuration are provided.

## Production notes

Prisma owns the relational data model in `prisma/schema.prisma`. API routes validate input server-side. Add a real session provider, email transport, webhook signature verification, and rate limiting before deploying. Never expose server-only keys to client components.
