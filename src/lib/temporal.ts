// lib/temporal.ts
// Dynamic temporal system for the RISE universe.
//
// Three layers:
//   1. LORE — fixed historical dates, never change (founding 2009, Arvin departure, etc.)
//   2. STATS — FY2020-2024 are canon; FY2025+ are projected via a growth model
//   3. ADMIN — dates computed relative to "now" so they never go stale
//
// Usage:
//   import { rise } from '@/lib/temporal'
//   rise.latestFY()          → "FY2025"  (in April 2026)
//   rise.revenue()           → "$143.1M" (FY2025 projected)
//   rise.legalLastUpdated()  → "January 1, 2026" (computed from now)
//   rise.fy(2024).revenue    → 89.4 (canon — never changes)

// ━━ CANON FY DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface FYMetrics {
  revenue: number // millions, e.g. 89.4
  units: number // cumulative shipped that year
  margin: number // decimal, e.g. 0.68
  marginAudited: number // one-decimal precision from Deloitte audit
  employees: number
  waitlist: number
  npsRange: [number, number] // [Q1, Q3] NPS values
  markets: number
}

/**
 * Established lore. Authoritative source: dataroom (audited).
 * Revenue, units, waitlist consistent across all four source files.
 * Margin: annual-report rounds to whole %; dataroom uses one-decimal.
 */
const CANON: Record<number, FYMetrics> = {
  2020: {
    revenue: 2.1,
    units: 940,
    margin: 0.12,
    marginAudited: 0.12,
    employees: 28,
    waitlist: 0,
    npsRange: [0, 0],
    markets: 1,
  },
  2021: {
    revenue: 8.4,
    units: 3_800,
    margin: 0.41,
    marginAudited: 0.41,
    employees: 48,
    waitlist: 12_000,
    npsRange: [31, 38],
    markets: 3,
  },
  2022: {
    revenue: 23.7,
    units: 10_600,
    margin: 0.55,
    marginAudited: 0.548,
    employees: 120,
    waitlist: 45_000,
    npsRange: [44, 51],
    markets: 5,
  },
  2023: {
    revenue: 38.2,
    units: 17_100,
    margin: 0.63,
    marginAudited: 0.631,
    employees: 234,
    waitlist: 121_000,
    npsRange: [57, 63],
    markets: 8,
  },
  2024: {
    revenue: 89.4,
    units: 47_000,
    margin: 0.68,
    marginAudited: 0.68,
    employees: 312,
    waitlist: 340_000,
    npsRange: [67, 71],
    markets: 14,
  },
}

// ━━ GROWTH MODEL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Decaying growth rates: RISE is maturing toward IPO.
// Growth decelerates each year but never goes negative.

const GROWTH_RATES = {
  revenue: [0.6, 0.4, 0.3, 0.25, 0.2],
  units: [0.53, 0.35, 0.25, 0.2, 0.15],
  employees: [0.22, 0.18, 0.15, 0.12, 0.1],
  waitlist: [0.21, 0.15, 0.12, 0.1, 0.08],
  markets: [4, 3, 2, 2, 1], // absolute additions per year
  nps: [3, 2, 2, 1, 1], // absolute NPS gain per year
} as const

function rate(rates: readonly number[], yearIndex: number): number {
  return rates[Math.min(yearIndex, rates.length - 1)]!
}

/**
 * Get FY metrics for any year. FY2020–2024 return canon data.
 * FY2025+ are projected from FY2024 using decaying growth rates.
 */
export function fyMetrics(fy: number): FYMetrics {
  if (fy in CANON) return CANON[fy]!
  if (fy < 2020) return CANON[2020]!

  const base = CANON[2024]!
  let { revenue, units, employees, waitlist, markets } = base
  let npsQ1 = base.npsRange[0]

  for (let i = 0; i < fy - 2024; i++) {
    revenue *= 1 + rate(GROWTH_RATES.revenue, i)
    units *= 1 + rate(GROWTH_RATES.units, i)
    employees *= 1 + rate(GROWTH_RATES.employees, i)
    waitlist *= 1 + rate(GROWTH_RATES.waitlist, i)
    markets += rate(GROWTH_RATES.markets, i)
    npsQ1 += rate(GROWTH_RATES.nps, i)
  }

  // Margin approaches 78% asymptotically
  const margin = 0.78 - (0.78 - 0.68) * Math.pow(0.7, fy - 2024)

  return {
    revenue: Math.round(revenue * 10) / 10,
    units: Math.round(units / 100) * 100,
    margin: Math.round(margin * 100) / 100,
    marginAudited: Math.round(margin * 1000) / 1000,
    employees: Math.round(employees),
    waitlist: Math.round(waitlist / 1_000) * 1_000,
    npsRange: [Math.min(npsQ1, 96), Math.min(npsQ1 + 4, 98)],
    markets: Math.round(markets),
  }
}

// ━━ CURRENT STATE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Most recently completed fiscal year.
 * RISE publishes annual results by March, so:
 * - March onwards → FY(year - 1) results are "published"
 * - Jan/Feb → FY(year - 2) is still the latest published
 */
export function latestFiscalYear(): number {
  const now = new Date()
  return now.getMonth() >= 2 ? now.getFullYear() - 1 : now.getFullYear() - 2
}

/** Latest published FY metrics */
export function latestMetrics(): FYMetrics {
  return fyMetrics(latestFiscalYear())
}

// ━━ FORMATTERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function formatRevenue(millions: number): string {
  return `$${millions.toFixed(1)}M`
}

export function formatCount(n: number): string {
  return n.toLocaleString('en-US')
}

export function formatPercent(decimal: number): string {
  return `${Math.round(decimal * 100)}%`
}

export function formatFYLabel(fy: number): string {
  return `FY${fy}`
}

export function formatFYShort(fy: number): string {
  return `FY${String(fy).slice(2)}`
}

/** YoY revenue growth rate as a formatted string like "+134%" */
export function yoyGrowth(fy: number): string {
  const current = fyMetrics(fy)
  const prev = fyMetrics(fy - 1)
  const pct = Math.round(
    ((current.revenue - prev.revenue) / prev.revenue) * 100,
  )
  return `+${pct}%`
}

// ━━ ADMIN DATES (relative to now — never go stale) ━━━━━━━━━━━━━━━━━━━━━━━━

// Shared formatters for admin date functions
function formatLongDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

/** Deterministic "recent month start" seeded by the current date. */
function seededRecentMonthStart(now: Date, min: number, max: number): Date {
  const daySeed = now.getFullYear() * 400 + now.getMonth() * 32 + now.getDate()
  const monthsAgo = (daySeed % (max - min + 1)) + min
  return new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1)
}

/**
 * Legal "last updated" date. Always the 1st of a recent month (1–4 months ago).
 * Deterministic for a given day so it doesn't flicker on re-render.
 */
export function legalLastUpdated(): string {
  return formatLongDate(seededRecentMonthStart(new Date(), 1, 4))
}

/**
 * Legal version string. Increments 0.1 per completed fiscal year from 4.2 baseline.
 * FY2024 → 4.2, FY2025 → 4.3, FY2026 → 4.4, etc.
 */
export function legalVersion(): string {
  const yearsBeyond = latestFiscalYear() - 2024
  const version = 4.2 + yearsBeyond * 0.1
  return `Version ${version.toFixed(1)}`
}

/**
 * Job posting date. Computed relative to now so postings always look recent.
 * Each job gets a stable date (2–10 weeks ago) seeded by its ID.
 */
export function jobPostedDate(jobId: string): string {
  let hash = 0
  for (let i = 0; i < jobId.length; i++) {
    hash = ((hash << 5) - hash + jobId.charCodeAt(i)) | 0
  }
  const daysAgo = (Math.abs(hash) % 56) + 14 // 2–10 weeks ago
  const date = new Date(Date.now() - daysAgo * 86_400_000)
  return formatLongDate(date)
}

/**
 * SDK / documentation "Last updated" date. Within the last 1–3 months.
 * Stable per calendar month.
 */
export function sdkLastUpdated(): string {
  return formatMonthYear(seededRecentMonthStart(new Date(), 1, 3))
}

/**
 * Sitemap / meta "Last generated" date. Within the last 1–3 weeks.
 * Stable per calendar week.
 */
export function sitemapGeneratedDate(): string {
  const now = new Date()
  const weekSeed = Math.floor(now.getTime() / (7 * 86_400_000))
  const daysAgo = (weekSeed % 14) + 7 // 1-3 weeks ago
  return formatLongDate(new Date(Date.now() - daysAgo * 86_400_000))
}

/**
 * Sitemap "Next review" date. 3 months from the generated date.
 */
export function sitemapNextReview(): string {
  const now = new Date()
  return formatLongDate(new Date(now.getFullYear(), now.getMonth() + 3, 1))
}

/**
 * Date the IT team was "notified" about the sitemap problem.
 * Always 2–3 weeks before the generated date. The notification
 * predates the generation — and the routes remain listed.
 */
export function sitemapNotificationDate(): string {
  const now = new Date()
  const weekSeed = Math.floor(now.getTime() / (7 * 86_400_000))
  const genDaysAgo = (weekSeed % 14) + 7
  const notifyDaysAgo = genDaysAgo + 14 + (weekSeed % 7) // 2-3 weeks earlier
  return formatLongDate(new Date(Date.now() - notifyDaysAgo * 86_400_000))
}

// ━━ CHART DATA BUILDERS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Revenue chart data array from FY2020 through the latest published FY. */
export function revenueChartData(): { year: string; revenue: number }[] {
  const endFY = latestFiscalYear()
  const data: { year: string; revenue: number }[] = []
  for (let fy = 2020; fy <= endFY; fy++) {
    data.push({ year: formatFYShort(fy), revenue: fyMetrics(fy).revenue })
  }
  return data
}

/** Waitlist vs. shipped chart data from FY2021 through the latest published FY. */
export function waitlistChartData(): {
  year: string
  shipped: number
  waitlist: number
}[] {
  const endFY = latestFiscalYear()
  const data: { year: string; shipped: number; waitlist: number }[] = []
  for (let fy = 2021; fy <= endFY; fy++) {
    const m = fyMetrics(fy)
    data.push({
      year: formatFYShort(fy),
      shipped: m.units,
      waitlist: m.waitlist,
    })
  }
  return data
}

/** NPS chart data. Canon through FY2024, projected beyond. */
export function npsChartData(): { period: string; nps: number }[] {
  const endFY = latestFiscalYear()
  const data: { period: string; nps: number }[] = []

  // Canon NPS data points (quarterly)
  const canonNPS: [string, number][] = [
    ['Q1 21', 31],
    ['Q3 21', 38],
    ['Q1 22', 44],
    ['Q3 22', 51],
    ['Q1 23', 57],
    ['Q3 23', 63],
    ['Q1 24', 67],
    ['Q3 24', 71],
  ]

  for (const [period, nps] of canonNPS) {
    data.push({ period, nps })
  }

  // Project beyond FY2024
  for (let fy = 2025; fy <= endFY; fy++) {
    const m = fyMetrics(fy)
    const shortYear = String(fy).slice(2)
    data.push({ period: `Q1 ${shortYear}`, nps: m.npsRange[0] })
    data.push({ period: `Q3 ${shortYear}`, nps: m.npsRange[1] })
  }

  return data
}

/** Annual report FINANCIALS table data through the latest published FY. */
export function financialsTableData(): {
  year: string
  revenue: string
  margin: string
  units: string
}[] {
  const endFY = latestFiscalYear()
  const data: {
    year: string
    revenue: string
    margin: string
    units: string
  }[] = []
  for (let fy = 2020; fy <= endFY; fy++) {
    const m = fyMetrics(fy)
    data.push({
      year: formatFYLabel(fy),
      revenue: formatRevenue(m.revenue),
      margin: formatPercent(m.margin),
      units: formatCount(m.units),
    })
  }
  return data
}

// ━━ CONVENIENCE FACADE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Single import for most consumer pages:
//   import { rise } from '@/lib/temporal'

export const rise = {
  // Current state
  latestFY: () => formatFYLabel(latestFiscalYear()),
  latestFYShort: () => formatFYShort(latestFiscalYear()),
  latestFYYear: latestFiscalYear,

  // Formatted headline stats (for the latest published FY)
  revenue: () => formatRevenue(latestMetrics().revenue),
  units: () => formatCount(latestMetrics().units),
  margin: () => formatPercent(latestMetrics().margin),
  employees: () => formatCount(latestMetrics().employees),
  waitlist: () => formatCount(latestMetrics().waitlist),
  nps: () => String(latestMetrics().npsRange[1]),
  markets: () => String(latestMetrics().markets),
  yoyGrowth: () => yoyGrowth(latestFiscalYear()),

  // Raw metrics for a specific FY
  fy: fyMetrics,

  // Admin dates (always fresh)
  legalLastUpdated,
  legalVersion,
  jobPostedDate,
  sdkLastUpdated,
  sitemapGeneratedDate,
  sitemapNotificationDate,
  sitemapNextReview,

  // Chart data builders
  revenueChartData,
  waitlistChartData,
  npsChartData,
  financialsTableData,

  // Lore anchors (for reference — these never change)
  FOUNDING_YEAR: 2009 as const,
  ARVIN_DEPARTURE: new Date(2024, 7, 12),
  IPO_TARGET: 'Q3 2026' as const,
} as const
