# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # eslint
```

No test suite configured.

## Architecture

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui components via `@base-ui/react`.

**Route groups:**
- `(auth)` — `/login`, `/register` — public
- `(dashboard)` — `/dashboard`, `/transactions`, `/categories` — protected

Root `/` redirects to `/login`. Route protection lives in `src/proxy.ts` (middleware pattern), keying off a `token` cookie.

**Feature modules** (`src/features/<feature>/`):
Each feature has:
- `services/I<X>Service.ts` — interface
- `services/<X>Service.ts` — real implementation (calls `NEXT_PUBLIC_API_URL`, default `http://localhost:8080`)
- `services/Fake<X>Service.ts` — in-memory stub
- `services/index.ts` — exports singleton; switches real vs fake via `NEXT_PUBLIC_USE_FAKE_SERVICES` (fake when `!== 'false'`, so **fake is the default**)
- `actions/<x>-actions.ts` — Next.js Server Actions (`'use server'`) that call the service
- `components/` — feature UI components

Features: `auth`, `categories`, `transactions`.

**Auth flow:** Server Actions call auth service → set `token` and `auth` cookies → middleware reads `token` for route protection. Client reads `auth` cookie via `src/lib/auth.ts` (`useAuthUser`, `getAuthData`, `clearAuthData`).

**API:** Backend speaks Spanish field names (`contrasena`, `primer_nombre`, `categoriaId`, `tipo: 'INGRESO'|'GASTO'`). Real services send `Authorization: Bearer <token>` header, reading token from cookies server-side.

**UI layout:** Dashboard uses `src/app/(dashboard)/layout.tsx` (client component) with `Sidebar` (desktop), `MobileHeader` + `BottomNav` (mobile). UI primitives in `src/components/ui/` (shadcn generated — edit carefully). Feature-specific display components in `src/components/dashboard/`.

## Environment variables

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend base URL | `http://localhost:8080` |
| `NEXT_PUBLIC_USE_FAKE_SERVICES` | Set to `'false'` to use real API | fake (default) |
