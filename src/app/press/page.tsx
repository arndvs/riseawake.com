import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'

const RELEASES = [
  {
    date: 'February 3, 2025',
    headline:
      'RISE™ Technologies Confirms Next-Generation Vertical Navigation Platform in Development',
    tag: 'Product',
    href: '/press/rise-move-announcement',
    summary:
      'RISE™ confirms the RISE™ Move is in active development. Staircase navigation, both directions. No further details at this time.',
    featured: true,
  },
  {
    date: 'November 8, 2024',
    headline:
      'RISE™ Closes $120M Series C to Accelerate Global Push Mode Deployment',
    tag: 'Funding',
    href: '/investors',
    summary:
      'Series C funding to expand international Push Mode availability and accelerate R&D. Existing investors participated.',
    featured: false,
  },
  {
    date: 'August 14, 2024',
    headline:
      'RISE™ Push Mode Compliance Rate Reaches 98% Across Active User Base',
    tag: 'Data',
    href: '/investors/financials',
    summary:
      'RISE™ reports 98% Push Mode compliance rate among active users, up from 94% in the prior year. The remaining 2% is being studied.',
    featured: false,
  },
  {
    date: 'March 1, 2024',
    headline: 'RISE™ Technologies Publishes FY2023 Annual Report',
    tag: 'Financial',
    href: '/investors/annual-report',
    summary:
      'FY2023 revenue of $38.2M, 47,000 units shipped, waitlist of 340,000. Full report available.',
    featured: false,
  },
]

export default function PressPage() {
  return (
    <main>
      <Navbar />

      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Press
          </p>
          <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight text-foreground">
            Press Releases
          </h1>
          <p className="mb-4 max-w-xl text-sm leading-loose text-foreground-muted">
            Official communications from RISE™ Technologies, Inc.
          </p>
          <p className="mb-16 text-xs leading-relaxed text-foreground-muted/50">
            Media inquiries: press@riseawake.com · Response time: 5 business
            days · Dr. Voss is available for comment on most topics. She is not
            available for comment on The Push Pro or the Move&rsquo;s timeline.
          </p>

          <div className="flex flex-col gap-4">
            {RELEASES.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className={`group block rounded-sm border p-7 no-underline ${
                  r.featured
                    ? 'border-edge bg-foreground/3'
                    : 'border-edge-subtle bg-surface-alt'
                }`}
              >
                <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-sm border border-accent/12 bg-accent/8 px-2 py-1 text-[10px] text-accent/65">
                      {r.tag}
                    </span>
                    {r.featured && (
                      <span className="rounded-sm border border-edge-subtle bg-foreground/4 px-2 py-1 text-[10px] text-foreground-muted">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-foreground-muted/50">
                    {r.date}
                  </span>
                </div>
                <h2 className="mb-3 text-sm leading-relaxed font-medium text-foreground-secondary">
                  {r.headline}
                </h2>
                <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                  {r.summary}
                </p>
                <span className="inline-block text-xs text-foreground-muted transition-colors duration-300 group-hover:text-foreground-secondary">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
