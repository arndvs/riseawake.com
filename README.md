# RISE Technologies, Inc.

The official corporate website for RISE Technologies, Inc.

For people who need a little push.

---

## About

RISE Technologies builds Smart Adjustable Base technology. The flagship product — The Push — delivers a 98% morning compliance rate. There is no off switch. There has never been an off switch. RISE considers this section of the README complete.

This repository contains the full riseawake.com web platform: consumer product pages, investor relations, legal documentation, internal document management, the PM-1 Remote simulation, the 12-stage Activation configurator, and approximately 50 other pages that function exactly as designed.

## Stack

| Layer     | Technology                                                  |
| --------- | ----------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19)     |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com)                  |
| CMS       | [Sanity v5](https://www.sanity.io) (blog, Studio at `/cms`) |
| Auth      | [Clerk](https://clerk.com) (studio authentication)          |
| Backend   | [Convex](https://convex.dev)                                |
| AI Images | [ImageKit](https://imagekit.io) (AI image generation)       |
| Charts    | [Recharts](https://recharts.org) (investor financials)      |
| UI        | [Headless UI](https://headlessui.dev)                       |
| Hosting   | [Vercel](https://vercel.com)                                |

## Getting Started

Requires Node.js ≥ 20 and pnpm ≥ 9.

```bash
pnpm install
```

Create a `.env.local` file with your Sanity project credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Sanity Studio is available at [http://localhost:3000/cms](http://localhost:3000/cms).

## Site Structure

### Consumer

`/` · `/about` · `/products/push` · `/products/nudge` · `/move` · `/activate` · `/help` · `/blog` · `/blog/[slug]`

### Platform

`/data-request` · `/sdk` · `/sdk/documentation` · `/index-score` · `/security` · `/security/trust-center`

### Investors

`/investors` · `/investors/vision` · `/investors/shareholder-letter` · `/investors/annual-report` · `/investors/meeting-minutes` · `/investors/financials` · `/investors/press`

### Legal

`/legal` · `/legal/terms` · `/legal/privacy` · `/legal/push-mode-eula` · `/legal/sleep-data-policy` · `/legal/autonomous-navigation` · `/legal/disclaimer`

### Press

`/press` · `/press/rise-move-announcement`

### Internal

`/internal` · `/internal/docs/[slug]` · `/internal/users` · `/internal/media` · `/internal/settings`

The internal document management system is publicly accessible. The authentication middleware was not completed. This is a known issue. It is in Arvin's TODO list. Arvin is no longer at RISE.

### Hidden

`/remote` · `/internal/docs/arvin-final-commit`

These routes are excluded from `robots.txt`. Excluding them does not resolve the access issue but does reduce discoverability. RISE considers this an acceptable interim measure.

## Products

- **The Push** (RP-01) — Smart Adjustable Base. Sold out. 340,000 waitlist.
- **The Nudge** (RN-01) — Permanently discontinued. We respect the role it played.
- **The Push Pro** — We are not currently accepting questions about The Push Pro.
- **RISE Move** — Autonomous vertical navigation. In development. There is no timeline. There is no loyalty discount.

## Scripts

```bash
pnpm dev          # development server
pnpm build        # production build
pnpm start        # production server
pnpm lint         # eslint
pnpm typegen      # regenerate Sanity types
```

## License

Proprietary. RISE Technologies, Inc. All rights reserved.

Users own the hardware they have purchased. They do not own anything that runs on it.

---

_Push Mode cannot be manually interrupted once initiated. This is a feature, not a limitation. Have a productive day!_
