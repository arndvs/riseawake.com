'use client'

import { Link } from '@/components/link'
import { useEffect, useState } from 'react'

const SERVICES = [
  {
    name: 'Push Mode',
    status: 'operational',
    uptime: '99.97%',
    description: 'Autonomous morning routing, activation, and delivery.',
    detail: null,
  },
  {
    name: 'Self-Making Mechanism',
    status: 'operational',
    uptime: '99.94%',
    description: 'Sheet tensioning and pneumatic pillow node cycle.',
    detail: null,
  },
  {
    name: 'Solo Return Commute',
    status: 'operational',
    uptime: '99.71%',
    description: 'Autonomous return navigation after Push Mode completion.',
    detail:
      '3 incidents in last 90 days. All resolved. SC-0134 (parking), SC-0151 (closed road), SC-0158 (dog, resolved without rerouting). No service impact.',
  },
  {
    name: 'RISE Index Scoring',
    status: 'operational',
    uptime: '100%',
    description: 'Compliance score calculation and session updates.',
    detail: null,
  },
  {
    name: 'Audio Data Collection',
    status: 'operational',
    uptime: '100%',
    description: 'Environmental audio monitoring and ML classification.',
    detail: null,
  },
  {
    name: 'Audio Data Retention System',
    status: 'operational',
    uptime: '100%',
    description: 'Long-term retention of classified audio content.',
    detail:
      'Operating correctly. Retention duration for snoring reclassified in v4.1.1.',
  },
  {
    name: 'RISE Platform Integration',
    status: 'operational',
    uptime: '99.82%',
    description: 'Calendar, transit, and environmental data integration.',
    detail: null,
  },
  {
    name: 'DataKit SDK \u2014 Essentials',
    status: 'degraded',
    uptime: '98.3%',
    description: 'Read-only .rsm file access and session data.',
    detail:
      'Date filter post-2019 known issue: historical RISE Index data filtered by date returns incomplete results for dates before January 1, 2020. Work ongoing. No ETA. Appendix B updated.',
  },
  {
    name: 'DataKit SDK \u2014 Pro',
    status: 'operational',
    uptime: '99.6%',
    description: 'Extended session history, audio classification metadata.',
    detail: null,
  },
  {
    name: 'DataKit SDK \u2014 Enterprise',
    status: 'operational',
    uptime: '99.6%',
    description: 'Full data access including restricted categories.',
    detail: null,
  },
  {
    name: 'Data Subject Request Processing',
    status: 'operational',
    uptime: null,
    description: 'Physical form processing, 6\u201318 month standard timeline.',
    detail:
      'Currently processing 2,847 active requests. Standard timeline applies. The Data Request Hotline (Mon\u2013Fri 11:00am\u201311:30am PT) is operational. Average hold time: 55 minutes.',
  },
  {
    name: 'Activation Portal',
    status: 'operational',
    uptime: '99.91%',
    description:
      '12-stage device activation, floorplan mapping, RISE Index calculation.',
    detail: null,
  },
  {
    name: 'Staircase Navigation',
    status: 'maintenance',
    uptime: '0%',
    description: 'Vertical floor transition \u2014 upward and downward.',
    detail:
      'Staircase navigation is not available in the current product generation. RISE Move is in active development. No timeline. No price. Both directions.',
  },
  {
    name: 'Push Pro Features',
    status: 'unavailable',
    uptime: null,
    description: 'Next-generation Push Mode features.',
    detail:
      'Push Pro has been acknowledged. Specifications have not been disclosed. No timeline. Status updates will appear here when available.',
  },
]

const INCIDENTS = [
  {
    id: 'INC-2025-003',
    date: 'March 14, 2025',
    status: 'resolved',
    title: 'Pillow node timing deviation on post-October 2024 hardware',
    duration: 'Identified March 8, resolved March 14 (v4.1.2)',
    affected: 'Self-Making Mechanism',
    detail:
      'Pillow node completing centering cycle 2.3 seconds ahead of optimal timing on units manufactured after October 2024. One user reported this. Patch shipped March 14.',
  },
  {
    id: 'INC-2025-002',
    date: 'February 28, 2025',
    status: 'resolved',
    title: 'Snoring misclassified as potentially significant audio content',
    duration: 'Introduced v3.1.4 (March 2024), resolved v4.1.1 (February 2025)',
    affected: 'Audio Data Collection',
    detail:
      'Ambient snoring was being classified as potentially significant content and retained indefinitely. Resolved in v4.1.1. Audio retained under prior classification cannot be reclassified.',
  },
  {
    id: 'INC-2025-001',
    date: 'January 22, 2025',
    status: 'resolved',
    title: 'RISE Index recalculation following v2 methodology update',
    duration: 'January 15\u201322, 2025',
    affected: 'RISE Index Scoring',
    detail:
      'All active user scores recalculated under v2 methodology. Average change: \u00B14 points. Some users saw larger changes. Methodology remains proprietary. Changes not explained individually.',
  },
  {
    id: 'INC-2024-012',
    date: 'November 3, 2024',
    status: 'resolved',
    title: 'SC-0134 \u2014 Solo commute parking citation',
    duration: 'October 29 (incident), November 3 (patched v4.0.2)',
    affected: 'Solo Return Commute',
    detail:
      'Device received a parking citation during solo return commute. Root cause: street-side parking enforcement zones not tagged as avoidable. Patched in v4.0.2. Citation responsibility: account holder. See disclaimer.',
  },
  {
    id: 'INC-2024-008',
    date: 'October 22, 2024',
    status: 'resolved',
    title: 'SC-0047 \u2014 Low-profile furniture obstacle encounter',
    duration: 'October 14 (incident), October 22 (patched v4.0.1)',
    affected: 'Solo Return Commute',
    detail:
      'Device encountered a coffee table (height: 12 inches) during solo return commute. Obstacle detection did not trigger at this height. Resolved in v4.0.1: sensor sweep angle expanded.',
  },
  {
    id: 'INC-2021-001',
    date: 'October 7, 2021',
    status: 'monitoring',
    title: 'Staircase navigation \u2014 permanent planned maintenance',
    duration: 'Opened October 7, 2021. No ETA.',
    affected: 'Staircase Navigation',
    detail:
      'The Push cannot navigate staircases. This is a hardware constraint, not a software bug. Addressed in RISE Move development. No timeline. This incident will be closed when the Move ships. Not before.',
  },
]

const STATUS_STYLES: Record<
  string,
  {
    dot: string
    glow: string
    border: string
    label: string
    badge: string
    detailText: string
  }
> = {
  operational: {
    dot: 'bg-emerald-500',
    glow: '',
    border: 'border-edge-subtle',
    label: 'Operational',
    badge: 'bg-emerald-500/8 text-emerald-500/80',
    detailText: 'text-foreground-muted',
  },
  degraded: {
    dot: 'bg-yellow-500',
    glow: 'shadow-[0_0_6px_rgba(234,179,8,0.5)]',
    border: 'border-yellow-500/10',
    label: 'Degraded',
    badge: 'bg-yellow-500/8 text-yellow-500/80',
    detailText: 'text-yellow-500/60',
  },
  maintenance: {
    dot: 'bg-accent',
    glow: 'shadow-[0_0_6px_rgba(var(--color-accent),0.5)]',
    border: 'border-accent/10',
    label: 'Maintenance',
    badge: 'bg-accent/8 text-accent/80',
    detailText: 'text-accent/60',
  },
  unavailable: {
    dot: 'bg-red-500/70',
    glow: 'shadow-[0_0_6px_rgba(239,68,68,0.5)]',
    border: 'border-red-500/10',
    label: 'Unavailable',
    badge: 'bg-red-500/6 text-red-500/60',
    detailText: 'text-foreground-muted',
  },
}

const INCIDENT_STYLES: Record<string, { className: string; label: string }> = {
  resolved: { className: 'text-emerald-500/70', label: 'Resolved' },
  monitoring: { className: 'text-yellow-500/70', label: 'Monitoring' },
  ongoing: { className: 'text-red-500/70', label: 'Ongoing' },
}

function Clock() {
  const [now, setNow] = useState('')

  useEffect(() => {
    const fmt = () => {
      const d = new Date()
      setNow(
        d.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC',
          timeZoneName: 'short',
        }),
      )
    }
    fmt()
    const iv = setInterval(fmt, 1000)
    return () => clearInterval(iv)
  }, [])

  return <>{now}</>
}

export default function StatusPage() {
  const [expandedInc, setExpandedInc] = useState<Record<string, boolean>>({})

  const degradedCount = SERVICES.filter(
    (s) => s.status === 'degraded' || s.status === 'unavailable',
  ).length

  return (
    <main>
      {/* Overall status hero */}
      <section className="relative px-6 pt-40 pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-eyebrow text-foreground-muted uppercase">
            System Status
          </p>

          <div className="mb-6 rounded-lg border border-edge bg-surface-alt p-8">
            <div className="mb-4 flex items-center gap-4">
              <div
                className={`h-3 w-3 rounded-full ${
                  degradedCount > 0
                    ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]'
                    : 'bg-emerald-500 shadow-[0_0_8px_rgba(80,200,130,0.4)]'
                }`}
              />
              <h1 className="font-display text-2xl tracking-tight text-foreground">
                {degradedCount === 0
                  ? 'All systems operational.'
                  : `${degradedCount} system${degradedCount > 1 ? 's' : ''} degraded or unavailable.`}
              </h1>
            </div>
            <p className="text-[11px] leading-relaxed text-foreground-muted">
              Push Mode is operational. The self-making mechanism is
              operational. The staircase is not operational. This has been the
              case since October 7, 2021. Last checked: <Clock />
            </p>
          </div>

          {/* Uptime bar visual */}
          <div className="mb-1.5 flex gap-0.5">
            {Array.from({ length: 90 }).map((_, i) => (
              <div
                key={i}
                className={`h-6 flex-1 rounded-[1px] ${
                  i === 23 || i === 61 || i === 74
                    ? 'bg-yellow-500/50'
                    : 'bg-emerald-500/35'
                }`}
              />
            ))}
          </div>
          <p className="text-[9px] text-foreground-muted/50">
            90-day uptime &mdash; Push Mode. 3 incidents marked.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-edge-subtle px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-eyebrow text-foreground-muted uppercase">
            Services
          </p>
          <div className="flex flex-col gap-2">
            {SERVICES.map((svc) => {
              const ss = STATUS_STYLES[svc.status]!
              return (
                <div
                  key={svc.name}
                  className={`rounded border p-4 ${ss.border} bg-surface-alt`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${ss.dot} ${ss.glow}`}
                    />
                    <div className="flex-1">
                      <div className="mb-0.5 flex items-center gap-2.5">
                        <span className="text-xs font-medium text-foreground-secondary">
                          {svc.name}
                        </span>
                        <span
                          className={`rounded-sm px-1.5 py-0.5 text-[9px] tracking-wider uppercase ${ss.badge}`}
                        >
                          {ss.label}
                        </span>
                        {svc.uptime && (
                          <span className="ml-auto text-[9px] text-foreground-muted/50">
                            {svc.uptime} uptime
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] leading-snug text-foreground-muted">
                        {svc.description}
                      </p>
                      {svc.detail && (
                        <p
                          className={`mt-1.5 text-[10px] leading-relaxed italic ${ss.detailText}`}
                        >
                          {svc.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Incident history */}
      <section className="border-t border-edge-subtle bg-surface px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-eyebrow text-foreground-muted uppercase">
            Incident History
          </p>
          <div className="flex flex-col gap-3">
            {INCIDENTS.map((inc) => {
              const is_ = INCIDENT_STYLES[inc.status]!
              const open = expandedInc[inc.id]
              return (
                <div
                  key={inc.id}
                  className="overflow-hidden rounded border border-edge-subtle bg-surface-alt"
                >
                  <button
                    aria-expanded={open}
                    aria-controls={`incident-${inc.id}`}
                    onClick={() =>
                      setExpandedInc((e) => ({
                        ...e,
                        [inc.id]: !e[inc.id],
                      }))
                    }
                    className="w-full cursor-pointer border-none bg-transparent p-4 text-left"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`mt-0.5 shrink-0 rounded-sm bg-foreground/[0.04] px-1.5 py-0.5 text-[9px] tracking-wider uppercase ${is_.className}`}
                      >
                        {is_.label}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-foreground-secondary">
                          {inc.title}
                        </p>
                        <p className="mt-0.5 text-[10px] text-foreground-muted">
                          {inc.id} · {inc.date} · {inc.affected}
                        </p>
                      </div>
                      <span className="mt-0.5 shrink-0 text-[9px] text-foreground-muted/50">
                        {open ? '\u25B2' : '\u25BC'}
                      </span>
                    </div>
                  </button>
                  {open && (
                    <div
                      id={`incident-${inc.id}`}
                      className="border-t border-edge-subtle px-4 pb-4"
                    >
                      <p className="mt-3 text-[11px] leading-relaxed text-foreground-muted">
                        {inc.detail}
                      </p>
                      <p className="mt-2 text-[9px] text-foreground-muted/50 italic">
                        Duration: {inc.duration}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-4 text-[9px] leading-relaxed text-foreground-muted/40">
            Full incident archive available upon request. Not all incidents are
            listed here. Incidents classified as internal are documented in the
            RISE internal system.{' '}
            <Link
              href="/internal"
              className="text-foreground-muted/50 underline"
            >
              /internal
            </Link>
          </p>
        </div>
      </section>

      {/* Subscribe */}
      <section className="border-t border-edge-subtle px-6 py-12 text-center">
        <div className="mx-auto max-w-md">
          <p className="mb-1.5 text-xs text-foreground-secondary">
            Subscribe to status updates
          </p>
          <p className="mb-4 text-[10px] leading-relaxed text-foreground-muted">
            Receive notifications when Push Mode status changes. You will not be
            notified about staircase navigation updates until the Move is ready.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              aria-label="Email address for status updates"
              placeholder="your@email.com"
              className="flex-1 rounded border border-edge bg-surface-alt px-3.5 py-2.5 text-xs text-foreground outline-none"
            />
            <button className="cursor-pointer rounded bg-accent px-5 py-2.5 text-[11px] font-medium tracking-wider whitespace-nowrap text-accent-on uppercase">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-[9px] leading-relaxed text-foreground-muted/30">
            Subscribing adds you to the RISE communications list.
            Unsubscribing removes your waitlist position. This is described in
            the{' '}
            <a href="/legal/terms" className="underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
