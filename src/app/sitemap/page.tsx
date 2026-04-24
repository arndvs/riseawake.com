import { clsx } from 'clsx'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'
import { rise } from '@/lib/temporal'

export const dynamic = 'force-dynamic'

const SECTIONS = [
  {
    label: 'Consumer',
    routes: [
      { path: '/', desc: 'Homepage' },
      { path: '/about', desc: 'Company history & product timeline' },
      { path: '/products/nudge', desc: 'The Nudge — discontinued' },
      { path: '/products/push', desc: 'The Push — sold out, waitlist' },
      { path: '/move', desc: 'RISE Move — in development' },
      { path: '/activate', desc: 'Device activation' },
      { path: '/help', desc: 'Support & FAQ' },
      { path: '/press', desc: 'Press releases' },
      { path: '/blog', desc: 'Blog' },
      { path: '/careers', desc: 'Open positions & culture' },
      { path: '/enterprise', desc: 'Enterprise solutions' },
    ],
  },
  {
    label: 'Platform',
    routes: [
      { path: '/data-request', desc: 'Data subject request process' },
      { path: '/security', desc: 'Security overview' },
      { path: '/sdk', desc: 'DataKit SDK' },
      { path: '/sdk/documentation', desc: 'SDK documentation' },
      { path: '/index-score', desc: 'RISE Index — personal score' },
      { path: '/changelog', desc: 'Platform changelog' },
      { path: '/status', desc: 'System status' },
    ],
  },
  {
    label: 'Investors',
    routes: [
      { path: '/investors', desc: 'Investor relations hub' },
      { path: '/investors/vision', desc: 'Vision 2045' },
      {
        path: '/investors/shareholder-letter',
        desc: 'CEO letter FY2024',
      },
      { path: '/investors/annual-report', desc: 'Annual report' },
      { path: '/investors/meeting-minutes', desc: 'AGM minutes' },
      { path: '/investors/financials', desc: 'Key metrics & charts' },
      { path: '/investors/press', desc: 'Media coverage' },
    ],
  },
  {
    label: 'Legal',
    routes: [
      { path: '/legal', desc: 'Legal document hub' },
      { path: '/legal/terms', desc: 'Terms of Service' },
      { path: '/legal/privacy', desc: 'Privacy Policy' },
      { path: '/legal/push-mode-eula', desc: 'Push Mode EULA' },
      {
        path: '/legal/sleep-data-policy',
        desc: 'Sleep & Environmental Data Policy',
      },
      {
        path: '/legal/autonomous-navigation',
        desc: 'Autonomous Navigation Disclosure',
      },
      { path: '/legal/disclaimer', desc: 'General Disclaimer' },
    ],
  },
  {
    label: 'Internal',
    isInternal: true,
    routes: [
      { path: '/internal', desc: 'Document management system' },
      {
        path: '/internal/docs/push-mode-incident-log-q4-2024',
        desc: 'DOC-001 — Push Mode Incident Log Q4 2024 [CONFIDENTIAL]',
      },
      {
        path: '/internal/docs/nudge-discontinuation-memo',
        desc: 'DOC-002 — Nudge Discontinuation Memo [INTERNAL]',
      },
      {
        path: '/internal/docs/dr-voss-push-configuration',
        desc: 'DOC-003 — Dr. Voss Push Configuration [DR. VOSS EYES ONLY]',
      },
      {
        path: '/internal/docs/push-pro-development-notes',
        desc: 'DOC-004 — Push Pro Development Notes [RESTRICTED]',
      },
      {
        path: '/internal/docs/move-engineering-status',
        desc: 'DOC-005 — Move Engineering Status [CONFIDENTIAL]',
      },
      {
        path: '/internal/docs/hr-push-mode-workplace-waiver',
        desc: 'DOC-006 — HR Workplace Waiver Template [INTERNAL]',
      },
      {
        path: '/internal/docs/solo-commute-incident-archive',
        desc: 'DOC-007 — Solo Commute Incident Archive [CONFIDENTIAL]',
      },
      {
        path: '/internal/docs/rise-index-methodology',
        desc: 'DOC-008 — RISE Index Methodology [RESTRICTED]',
      },
      {
        path: '/internal/docs/audio-data-access-log-summary',
        desc: 'DOC-009 — Audio Data Access Log Summary [CONFIDENTIAL]',
      },
      { path: '/internal/media', desc: 'Media — 0 files' },
      {
        path: '/internal/dataroom',
        desc: 'Pre-IPO Due Diligence Data Room [RESTRICTED]',
      },
      {
        path: '/internal/users',
        desc: 'Users — 3 accounts (1 should be deactivated)',
      },
      { path: '/internal/settings', desc: 'Settings — not persisted' },
    ],
  },
  {
    label: 'Hidden',
    isInternal: true,
    routes: [
      {
        path: '/remote',
        desc: 'The PM-1 remote. One button. No off switch.',
      },
      { path: '/internal/docs/arvin-final-commit', desc: '' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <main className="bg-page">
      <Navbar />
      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-eyebrow uppercase tracking-[0.2em] text-foreground-muted">
            riseawake.com
          </p>
          <h1 className="mb-4 font-display text-section text-foreground">
            Sitemap
          </h1>
          <p className="mb-2 text-xs text-foreground-muted">
            Last generated automatically: {rise.sitemapGeneratedDate()}
          </p>
          <p className="mb-16 text-xs italic text-foreground-muted/60">
            RISE reviews sitemap contents quarterly. The next review is
            scheduled for {rise.sitemapNextReview()}. If you believe a URL has been listed in
            error, please contact webmaster@riseawake.com.
          </p>

          <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.label}>
                <p
                  className={clsx(
                    'mb-4 pb-2 text-[10px] uppercase tracking-[0.2em]',
                    section.isInternal
                      ? 'border-b border-amber-500/15 text-amber-500/60'
                      : 'border-b border-edge-subtle text-foreground-muted',
                  )}
                >
                  {section.label}
                  {section.isInternal && (
                    <span className="ml-3 text-[9px] text-amber-500/40">
                      ← this section should not be here
                    </span>
                  )}
                </p>
                <div className="flex flex-col gap-1">
                  {section.routes.map((route) => (
                    <div key={route.path} className="flex items-baseline gap-4">
                      <Link
                        href={route.path}
                        className={clsx(
                          'min-w-[300px] shrink-0 font-mono text-xs transition-colors duration-150 hover:text-foreground',
                          section.isInternal
                            ? 'text-amber-500/70'
                            : 'text-accent',
                        )}
                      >
                        {route.path}
                      </Link>
                      <span className="text-xs text-foreground-muted">
                        {route.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-edge-subtle pt-8">
            <p className="text-[10px] leading-[1.8] text-foreground-muted/60">
              This sitemap was generated automatically on {rise.sitemapGeneratedDate()} by the
              RISE site management system. RISE reviews sitemap contents
              quarterly. Quarterly reviews are scheduled and conducted by the IT
              team. The IT team has been notified that the Internal section of
              this sitemap contains routes that should not be publicly indexed.
              The notification was sent {rise.sitemapNotificationDate()}. This sitemap was
              generated {rise.sitemapGeneratedDate()}. The routes remain listed.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
