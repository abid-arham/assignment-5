# Project Status

**Stack:** Next.js 16.3.0, React 19, TypeScript, Tailwind CSS, shadcn/ui

## Structure
- `app/(authGroup)/` — login, register
- `app/(dashboardGroup)/` — dashboard, admin, technician views
- `app/(publicGroup)/` — services page
- `service/` — API calls (getMe, logout)
- `components/ui/` — shadcn components

## Unstaged Changes
- Auth refactor: moved `app/(auth)/` → `app/(authGroup)/`
- Modified: layout, api.ts, types.ts, package deps
- New: sonner toast, service layer

## Next
Stage and commit the auth refactor changes.
