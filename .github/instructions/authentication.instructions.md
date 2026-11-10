---
description: "Use when changing Clerk authentication, sign-in or sign-up flows, route protection, or auth-related routing."
applyTo: "src/app/page.tsx, src/app/dashboard/**, src/app/sign-in/**, src/app/sign-up/**, src/proxy.ts"
---
# Authentication

- Use Clerk as the app's only authentication provider. Do not add a parallel or custom authentication system.
- Require an authenticated Clerk user to access `/dashboard`; unauthenticated visitors must sign in before access is granted.
- Redirect authenticated visitors from `/` to `/dashboard`.
- Always present Clerk sign-in and sign-up flows in modals. Do not expose them as standalone full-page flows or route users to separate sign-in/sign-up pages.
