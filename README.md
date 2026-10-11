# Rowdy Byte Portfolio

Portfolio and blog for Rowdy Verbeek, built with SvelteKit, Svelte 5, TypeScript, Tailwind CSS, and Drizzle ORM.

## Requirements

- Node.js 22
- pnpm 9
- A configured `DATABASE_URL` for database-backed features
- A configured `RESEND_API_KEY` for the contact form

## Getting started

```bash
pnpm install
pnpm dev
```

The development server is available at `http://localhost:5173`.

## Checks and build

```bash
pnpm check
pnpm lint
pnpm build
```

## Deployment

Vercel Production tracks the `main` branch. Pushes to `main` create production deployments. Other branches can be used for preview deployments.
