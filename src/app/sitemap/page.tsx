import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'

const SECTIONS = [
  {
    label: 'Consumer',
    routes: [
      { path: '/', desc: 'Homepage' },
      { path: '/about', desc: 'Company history & product timeline' },
      { path: '/products/nudge', desc: 'The Nudge — discontinued' },
      { path: '/products/push', desc: 'The Push — sold out, waitlist' },
      { path: '/move', desc: 'RISE™ Move — in development' },
      { path: '/activate', desc: 'Device activation' },
      { path: '/help', desc: 'Support & FAQ' },
      { path: '/press', desc: 'Press releases' },
      { path: '/blog', desc: 'Blog' },
    ],
  },
  {
    label: 'Platform',
    routes: [
      { path: '/data-request', desc: 'Data subject request process' },
      { path: '/sdk', desc: 'DataKit SDK' },
      { path: '/sdk/documentation', desc: 'SDK documentation' },
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
        desc: 'DOC-008 — RISE™ Index Methodology [RESTRICTED]',
      },
      {
        path: '/internal/docs/audio-data-access-log-summary',
        desc: 'DOC-009 — Audio Data Access Log Summary [CONFIDENTIAL]',
      },
      { path: '/internal/media', desc: 'Media — 0 files' },
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
          <p
            className="mb-4 text-eyebrow uppercase"
            style={{
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.2em',
            }}
          >
            riseawake.com
          </p>
          <h1
            className="mb-4 font-display text-section"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            Sitemap
          </h1>
          <p
            className="mb-2 text-xs"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Last generated automatically: March 1, 2025
          </p>
          <p
            className="mb-16 text-xs"
            style={{
              color: 'rgba(255,255,255,0.18)',
              fontStyle: 'italic',
            }}
          >
            RISE™ reviews sitemap contents quarterly. The next review is
            scheduled for June 1, 2025. If you believe a URL has been listed in
            error, please contact webmaster@riseco.online.
          </p>

          <div className="flex flex-col gap-10">
            {SECTIONS.map((section) => (
              <div key={section.label}>
                <p
                  className="mb-4 text-[10px] tracking-widest uppercase"
                  style={{
                    color: section.isInternal
                      ? 'rgba(234,179,8,0.6)'
                      : 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.2em',
                    borderBottom: section.isInternal
                      ? '1px solid rgba(234,179,8,0.15)'
                      : '1px solid rgba(255,255,255,0.06)',
                    paddingBottom: '8px',
                  }}
                >
                  {section.label}
                  {section.isInternal && (
                    <span
                      className="ml-3"
                      style={{
                        color: 'rgba(234,179,8,0.4)',
                        fontSize: '9px',
                      }}
                    >
                      ← this section should not be here
                    </span>
                  )}
                </p>
                <div className="flex flex-col gap-1">
                  {section.routes.map((route) => (
                    <div key={route.path} className="flex items-baseline gap-4">
                      <Link
                        href={route.path}
                        className="shrink-0 font-mono text-xs transition-colors duration-150 hover:text-white"
                        style={{
                          color: section.isInternal
                            ? 'rgba(234,179,8,0.7)'
                            : 'rgba(42,92,219,0.7)',
                          minWidth: '300px',
                        }}
                      >
                        {route.path}
                      </Link>
                      <span
                        className="text-xs"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                      >
                        {route.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-16 pt-8"
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <p
              className="text-[10px]"
              style={{
                color: 'rgba(255,255,255,0.15)',
                lineHeight: 1.8,
              }}
            >
              This sitemap was generated automatically on March 1, 2025 by the
              RISE™ site management system. RISE™ reviews sitemap contents
              quarterly. Quarterly reviews are scheduled and conducted by the IT
              team. The IT team has been notified that the Internal section of
              this sitemap contains routes that should not be publicly indexed.
              The notification was sent February 12, 2025. This sitemap was
              generated March 1, 2025. The routes remain listed.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
