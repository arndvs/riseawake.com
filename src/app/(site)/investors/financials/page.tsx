'use client'

import { InvestorLayout } from '@/components/investors/investor-layout'
import {
  formatFYLabel,
  formatRevenue,
  latestMetrics,
  latestPublishedFiscalYear,
  npsChartData,
  revenueChartData,
  waitlistChartData,
} from '@/lib/temporal'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const ACTIVE_MARKETS = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'New Zealand',
  'Ireland',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
]

const UNIT_ECONOMICS = [
  { label: 'Customer Acquisition Cost', value: '$180', bar: 7.5 },
  { label: 'Payback Period', value: '27 days', bar: 3 },
  { label: 'Customer LTV', value: '$2,400', bar: 100 },
]

const GRID_COLOR = 'var(--color-edge-subtle)'
const ACCENT = 'var(--color-brand)'
const MUTED = 'var(--color-foreground-muted)'

const tooltipStyle = {
  background: 'var(--color-surface-alt)',
  border: '1px solid var(--color-edge-subtle)',
  borderRadius: '2px',
  color: 'var(--color-foreground-secondary)',
  fontSize: '11px',
} as const

export default function FinancialsPage() {
  const REVENUE_DATA = revenueChartData()
  const WAITLIST_DATA = waitlistChartData()
  const NPS_DATA = npsChartData()
  const LATEST = latestMetrics()
  const LATEST_FY = formatFYLabel(latestPublishedFiscalYear())

  return (
    <InvestorLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 pt-8">
            <p className="mb-4 text-eyebrow text-foreground-muted uppercase">
              Key Metrics
            </p>
            <h1 className="mb-4 font-display text-section tracking-tight text-foreground-strong">
              Financials & Data
            </h1>
            <p className="max-w-xl text-body text-foreground-secondary">
              {LATEST_FY} key performance indicators. All figures unaudited.
              Push Mode compliance data independently verified by RISE Internal
              Analytics.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-edge-subtle bg-surface-alt p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-eyebrow text-foreground-muted uppercase">
                  Revenue Growth
                </p>
                <p className="font-display text-3xl text-foreground-strong">
                  {formatRevenue(LATEST.revenue)}{' '}
                  <span className="text-base text-brand">{LATEST_FY}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-foreground-muted/60">
                  Push Launch →
                </p>
                <p className="text-xs text-foreground-muted/40">FY2021</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid vertical={false} stroke={GRID_COLOR} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: MUTED, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: MUTED, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`$${v}M`, 'Revenue']}
                />
                <ReferenceLine
                  x="FY21"
                  stroke={ACCENT}
                  strokeDasharray="4 4"
                  strokeOpacity={0.3}
                  label={{
                    value: 'Push Launch',
                    fill: ACCENT,
                    fontSize: 10,
                    opacity: 0.5,
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill={ACCENT}
                  fillOpacity={0.7}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-10 rounded-xl border border-edge-subtle bg-surface-alt p-8">
            <div className="mb-6">
              <p className="mb-1 text-eyebrow text-foreground-muted uppercase">
                Waitlist vs. Units Shipped
              </p>
              <p className="text-sm text-foreground-muted">
                Demand constraint, not supply constraint.{' '}
                <span className="text-foreground-muted/60 italic">
                  This is intentional.
                </span>
              </p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={WAITLIST_DATA}>
                <CartesianGrid stroke={GRID_COLOR} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: MUTED, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: MUTED, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) =>
                    v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v
                  }
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [Number(v).toLocaleString()]}
                />
                <Line
                  type="monotone"
                  dataKey="waitlist"
                  stroke={ACCENT}
                  strokeWidth={2}
                  dot={{ fill: ACCENT, r: 4 }}
                  name="Waitlist"
                />
                <Line
                  type="monotone"
                  dataKey="shipped"
                  stroke={MUTED}
                  strokeWidth={2}
                  dot={{ fill: MUTED, r: 4 }}
                  name="Units Shipped"
                  strokeDasharray="6 3"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-4 bg-brand" />
                <span className="text-[10px] text-foreground-muted">
                  Waitlist
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-4 border-t border-dashed border-foreground-muted" />
                <span className="text-[10px] text-foreground-muted">
                  Units Shipped
                </span>
              </div>
            </div>
          </div>

          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-edge-subtle bg-surface-alt p-8">
              <p className="mb-6 text-eyebrow text-foreground-muted uppercase">
                Unit Economics
              </p>
              <div className="flex flex-col gap-4">
                {UNIT_ECONOMICS.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between">
                      <span className="text-xs text-foreground-muted">
                        {item.label}
                      </span>
                      <span className="text-xs font-medium text-foreground-secondary">
                        {item.value}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-edge-subtle">
                      <div
                        className="h-1 rounded-full bg-brand/70"
                        style={{ width: `${item.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[10px] leading-relaxed text-foreground-muted/60">
                LTV/CAC ratio: 13.3x. Payback in 27 days. RISE notes these
                figures are unusual. They reflect a product that works.
              </p>
            </div>

            <div className="rounded-xl border border-edge-subtle bg-surface-alt p-8">
              <p className="mb-6 text-eyebrow text-foreground-muted uppercase">
                Push Mode Compliance
              </p>
              <div className="mb-6 flex items-end gap-6">
                <div className="flex-1 text-center">
                  <p className="mb-2 font-display text-5xl tracking-tight text-foreground-muted">
                    74%
                  </p>
                  <p className="text-xs text-foreground-muted/60">RISE Nudge</p>
                  <p className="mt-1 text-[10px] text-foreground-muted/40">
                    Previous generation
                  </p>
                </div>
                <div className="flex-1 text-center">
                  <p className="mb-2 font-display text-5xl tracking-tight text-brand">
                    98%
                  </p>
                  <p className="text-xs text-foreground-secondary">RISE Push</p>
                  <p className="mt-1 text-[10px] text-brand/70">
                    Current generation
                  </p>
                </div>
              </div>
              <div className="border-t border-edge-subtle pt-4">
                <p className="text-xs leading-relaxed text-foreground-muted/60">
                  +24 percentage points. The value of removing the decision.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10 rounded-xl border border-edge-subtle bg-surface-alt p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-eyebrow text-foreground-muted uppercase">
                  Net Promoter Score Trend
                </p>
                <p className="font-display text-3xl text-foreground-strong">
                  {LATEST.npsRange[1]}{' '}
                  <span className="text-base text-foreground-muted">
                    Q3 {LATEST_FY.slice(2)}
                  </span>
                </p>
              </div>
              <p className="max-w-xs text-right text-[10px] leading-relaxed text-foreground-muted/60">
                NPS measured at 90 days post-delivery. Pre-delivery NPS not
                measured — customers on waitlist cannot yet form a product
                opinion.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={NPS_DATA}>
                <CartesianGrid stroke={GRID_COLOR} />
                <XAxis
                  dataKey="period"
                  tick={{ fill: MUTED, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: MUTED, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [v, 'NPS']}
                />
                <ReferenceLine
                  y={50}
                  stroke={GRID_COLOR}
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="nps"
                  stroke={ACCENT}
                  strokeWidth={2.5}
                  dot={{ fill: ACCENT, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-10 rounded-xl border border-edge-subtle bg-surface-alt p-8">
            <p className="mb-2 text-eyebrow text-foreground-muted uppercase">
              Geographic Presence
            </p>
            <p className="mb-6 text-sm text-foreground-muted">
              {ACTIVE_MARKETS.length} active markets · 89 planned ·{' '}
              <span className="text-foreground-muted/60 italic">
                The morning is universal.
              </span>
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {ACTIVE_MARKETS.map((market) => (
                <span
                  key={market}
                  className="rounded-xl border border-brand/15 bg-brand/10 px-3 py-1.5 text-[10px] text-brand"
                >
                  {market}
                </span>
              ))}
              <span className="rounded-xl border border-edge-subtle bg-surface-inset px-3 py-1.5 text-[10px] text-foreground-muted/60">
                +75 planned
              </span>
            </div>
            <p className="text-[10px] leading-relaxed text-foreground-muted/60">
              Planned markets pending regulatory review of autonomous morning
              routing device classification in each jurisdiction. RISE is
              engaged with regulators in all 75 planned markets. Progress is
              being made.
            </p>
          </div>

          <div className="rounded-xl border border-edge-subtle/60 bg-surface-inset p-4">
            <p className="text-[10px] leading-loose text-foreground-muted">
              All figures unaudited. Push Mode compliance data independently
              verified by RISE Internal Analytics. Third-party verification
              pending. NPS measured at 90 days post-delivery. Unit economics
              calculated using median knowledge worker salary in US market.
              Geographic expansion market count subject to regulatory approval.
              RISE is not responsible for investment decisions made based on
              these figures.
            </p>
          </div>
        </div>
      </section>
    </InvestorLayout>
  )
}
