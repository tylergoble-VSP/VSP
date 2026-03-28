# Cycle 3 Plan

## Scan Findings
- VSP_SESSION_SECRET using hardcoded dev default in production — anyone who reads the source code can forge JWTs
- No logout endpoint — users cannot end their sessions
- Minimal security headers — only X-Content-Type-Options was set
- Login, portal, and admin pages functional but could use logout affordance

## Debate Outcomes
No tensions — security hardening is unambiguously the right priority for cycle 3.

## Approved Scope
1. Set VSP_SESSION_SECRET as Vercel env var with cryptographically random 32-byte hex
2. Add /api/logout endpoint that clears the session cookie
3. Add LogoutButton client component to admin and portal pages
4. Add security headers: X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
5. Allow /api/logout in proxy public routes

## Deferred Items
- Client logo upload workflow
- Real client onboarding (66 clients)
- UX polish beyond logout button (full theme integration for app pages)
