# Changelog

## 2026-10-03 — Comprehensive domain-sales optimization

### I. Technical foundation
- Forced HTTPS + apex canonical redirects in `src/worker.ts` (www → apex, /index.html → /).
- Worker + `public/_headers` inject free-plan security headers: HSTS, nosniff,
  SAMEORIGIN, strict referrer policy, permissions-policy, and a tight CSP
  (self + Cloudflare Stream + Google Fonts only).
- Long-cache immutable build assets (`/_assets/*`, `/_astro/*`); HTML stays fresh.
- SEO `Layout`: price-aware title (`ABQ.Dog | Premium Domain for Sale | …`),
  meta description with $100,000 + CTA, OG/Twitter, per-page canonicals,
  robots (404 = noindex), Google verification retained.
- Schema.org: WebSite + Product/Offer ($100k USD, InStock, Desert Rich seller)
  + Organization + FAQPage + BreadcrumbList; Article schema on insight posts.
- Sitemap via `@astrojs/sitemap` (6 URLs, 404 excluded); `robots.txt` points at
  `sitemap-index.xml`. Custom `404.astro` added.
- Performance: removed render-blocking font `@import`; preconnect + print-media
  font swap; hero Stream iframe replaced with click-to-play facade poster
  (zero eager iframes, ~39KB HTML); `fetchpriority=high` poster, skip link,
  `color-scheme`, reduced-motion support.

### II. SEO
- Keyword coverage: "buy .dog domains", "domain marketplace",
  "ABQ.Dog for sale", "premium domain names", "investment domains" woven into
  H1/H2s, copy, tags, and three new insight posts.
- H1/H2 hierarchy: single H1 per page; keyword-rich H2s.
- Internal linking: `/insights/` hub + 4 posts with related-post links,
  breadcrumbs, homepage preview cards, valuation/transfer cross-links.

### III. CRO
- Above-the-fold: $100,000 price + Buy Now / Make Offer / Why-this-domain CTAs.
- Tiered footer CTAs (Buy Now / Make Offer / Contact Agent) with prefilled
  mailto bodies + `data-cta` tracking hooks.
- Trust: escrow/SSL/registrar-push badges + guarantee bar.
- Urgency: "1 of 1" badge, weekly viewer counter (localStorage, no backend).
- Social proof: buyer-outcome cards (labeled illustrative) + FAQ.
- Exit-intent popup: brief offer, localStorage lead capture + mailto handoff,
  desktop mouse-out + 45s mobile fallback, once-per-visitor.

### IV. Mobile
- All tap targets ≥48px (`min-h-12`); 16px-minimum body copy; sticky header +
  collapsible nav; no horizontal scroll (container-narrow grid); lazy video.

### V. Authority content
- New posts: `domain-valuation-guide`, `albuquerque-dog-market`,
  `transfer-checklist` (+ existing `albuquerque-dogs`) — weekly-cadence-ready
  collection powering the DA/content-marketing loop.

### VI. Design
- Kept bark/sage minimal system; added CSS brand mockups (van wrap, booking
  page, SERP), scroll-reveal animations, card hover states, dark/light toggle
  (localStorage + prefers-color-scheme), focus-visible rings.

### VII. Validation
- `npm run build`: 7 pages, sitemap generated, no errors.
- Verified: single H1, 0 eager iframes, Product+FAQ schema present,
  36× 48px targets, canonical/sitemap/robots/_headers in `dist/`.
- Still to do post-deploy: Lighthouse run, GSC sitemap submit, 48hr monitoring.

### Deploy (Cloudflare Workers free plan)
- Build: `npm run build` → `dist/`. Worker: `src/worker.ts` + `[assets]`.
- No paid bindings. Deploy: `npx wrangler deploy` or Pages-connected GitHub.
