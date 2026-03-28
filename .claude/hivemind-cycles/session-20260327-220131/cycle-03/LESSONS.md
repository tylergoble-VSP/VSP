# Cycle 3 Lessons

## Gap Analysis
- Security items were straightforward to implement — the session secret, logout, and headers were all standard patterns. The real gap from Cycle 1 was not implementing these from the start.
- UX polish (full theme integration) was partially addressed with the logout button but the broader theme work was deferred. The inline styles on app pages work well enough that this isn't urgent.

## Pattern Recognition
- Vercel's `headers` config in vercel.json is the right place for security headers — they apply to all routes including static files, unlike Next.js middleware/proxy which only runs on dynamic routes.
- Client components (LogoutButton) can be cleanly composed into server-rendered pages. The pattern of a small `'use client'` component imported into a server page is clean.

## Process Observations
- This cycle was the fastest of the three — focused scope with no platform surprises. Security hardening is well-trodden ground.
- The local build Bus error is a recurring friction point. All validation has to happen via Vercel deploy + curl verification.

## Recommendations for Future Work
1. **Real client onboarding** — test `/new-vsp-client` with actual clients. The 66-client migration is the next major milestone.
2. **Content-Security-Policy** — the most impactful remaining security header, but requires careful tuning for inline styles and Google Fonts.
3. **Full theme integration** — migrate inline styles on app pages to CSS classes from vsp-theme.css for consistency and maintainability.
