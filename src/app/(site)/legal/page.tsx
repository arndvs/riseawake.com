import { Link } from '@/components/link'
import { rise } from '@/lib/temporal'

const DOCS = [
  {
    title: 'Terms of Service',
    sections: '25 sections',
    desc: 'The foundational agreement governing your use of RISE™ products and services. Everything else refers back to this.',
    href: '/legal/terms',
    flag: null,
  },
  {
    title: 'Privacy Policy',
    sections: '31 sections',
    desc: 'A comprehensive account of the data RISE™ collects, retains, shares, and acts upon. Includes audio, occupancy, and inferred behavioral data.',
    href: '/legal/privacy',
    flag: 'Includes audio recording disclosure',
  },
  {
    title: 'Push Mode EULA',
    sections: '19 sections',
    desc: "The End User License Agreement governing Push Mode. Covers license scope, modification rights, and the acknowledgment that Push Mode has no off switch.",
    href: '/legal/push-mode-eula',
    flag: null,
  },
  {
    title: 'Sleep & Environmental Data Policy',
    sections: '14 sections',
    desc: 'The bedroom-specific data policy. Covers occupancy detection, relationship status inference, audio classification, and the 2,048-sensor pressure array.',
    href: '/legal/sleep-data-policy',
    flag: 'Contains Appendix C reference',
  },
  {
    title: 'Autonomous Navigation Disclosure',
    sections: '11 sections',
    desc: "Covers the Push's solo return commute, third-party encounters, traffic interactions, elevator use, and allocation of liability for autonomous navigation incidents.",
    href: '/legal/autonomous-navigation',
    flag: null,
  },
  {
    title: 'General Disclaimer',
    sections: '8 sections',
    desc: 'Limitations of liability covering physical harm scenarios, the liability cap calculation, and the relationship between the liability cap and the RISE™ Index.',
    href: '/legal/disclaimer',
    flag: 'Liability cap may be lower than expected',
  },
]

export default function LegalHubPage() {
  const LEGAL_V = rise.legalVersion().replace('Version ', 'v')

  return (
    <main>

      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-eyebrow uppercase text-foreground-muted">
            Legal
          </p>
          <h1 className="mb-6 font-display text-display tracking-tight text-foreground-strong">
            Legal Documents
          </h1>
          <p className="mb-4 max-w-xl text-body text-foreground-secondary">
            RISE™ maintains six primary legal documents governing the use of its
            products and services. All documents are {LEGAL_V}, updated{' '}
            {rise.legalLastUpdated()}.
          </p>
          <p className="mb-16 text-xs italic leading-relaxed text-foreground-muted/50">
            By using any RISE™ product or service, you have accepted all of the
            following. We appreciate that you are reading them now. Most people
            do not.
          </p>

          <div className="mb-16 grid gap-4 md:grid-cols-2">
            {DOCS.map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="group block no-underline"
              >
                <div className="flex h-full flex-col rounded-xl border border-edge-subtle bg-surface-alt p-7">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h2 className="text-sm font-medium text-foreground-secondary">
                      {doc.title}
                    </h2>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-xl border border-edge-subtle bg-foreground/4 px-2 py-0.5 text-[10px] text-foreground-muted/50">
                        {LEGAL_V}
                      </span>
                      <span className="text-[10px] text-foreground-muted/40">
                        {doc.sections}
                      </span>
                    </div>
                  </div>
                  <p className="mb-4 text-xs leading-relaxed text-foreground-muted">
                    {doc.desc}
                  </p>
                  {doc.flag && (
                    <p className="inline-block self-start rounded-xl border border-accent/12 bg-accent/8 px-2 py-1 text-[10px] text-accent/70">
                      {doc.flag}
                    </p>
                  )}
                  <div className="mt-4 flex justify-end border-t border-edge-subtle pt-4">
                    <span className="text-xs text-foreground-muted transition-colors duration-300 group-hover:text-foreground-secondary">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-xl border border-edge-subtle bg-foreground/2 p-6">
            <p className="text-xs leading-loose text-foreground-muted">
              These documents cross-reference each other extensively. Reading
              one document in full requires reading all of them. RISE™
              recommends beginning with the Terms of Service, then proceeding to
              the Privacy Policy, then the Push Mode EULA, then the Sleep &
              Environmental Data Policy, then the Autonomous Navigation
              Disclosure, and finally the General Disclaimer. This reading order
              will take approximately 4–6 hours. RISE™ considers this time well
              spent. The alternative is not reading them, which you have already
              done, and which also constitutes acceptance.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
