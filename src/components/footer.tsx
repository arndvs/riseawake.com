import { Link } from './link'
import { Logo } from './logo'

/*
 * v6 footer — see working/RISE_BRAND_SYSTEM_v6.md §3.12.
 *
 * 1px hairline top, surface-2 bg, muted 12px text, 0.04em tracking. The
 * poetic Push Mode line carries an italic terracotta em (Fraunces opsz 14 /
 * SOFT 100 / WONK 1). Drops v5 surface-alt + foreground-subtle aliases.
 */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
      {children}
    </p>
  )
}

function FooterLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className="text-[12px] tracking-[0.04em] text-foreground-soft transition-colors duration-200 hover:text-foreground"
    />
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-surface-2">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo variant="nav" className="mb-5 h-7" />
            <p className="mb-4 max-w-xs text-[12px] leading-relaxed tracking-[0.04em] text-foreground-soft">
              Smart Adjustable Base technology for people who need a little
              push.
            </p>
            <p className="max-w-xs text-[12px] leading-relaxed tracking-[0.04em] text-muted">
              &ldquo;Push Mode cannot be manually interrupted once initiated.
              This is a{' '}
              <em
                className="not-italic text-rise-horizon"
                style={{
                  fontStyle: 'italic',
                  fontVariationSettings: '"opsz" 14, "SOFT" 100, "WONK" 1',
                }}
              >
                feature
              </em>
              , not a limitation.&rdquo;
            </p>
          </div>

          <div>
            <FooterHeading>Products</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/products/nudge">The Nudge</FooterLink>
              <FooterLink href="/products/push">The Push</FooterLink>
              <FooterLink href="/activate">Activate</FooterLink>
              <FooterLink href="/products/push">The PUSH+</FooterLink>
              <Link
                href="/move"
                className="text-[12px] tracking-[0.04em] text-rise-rise/60 transition-colors duration-200 hover:text-rise-rise"
              >
                RISE Move{' '}
                <span className="text-[10px] text-rise-rise/40">
                  — In Development
                </span>
              </Link>
            </div>
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/about">Our Story</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/enterprise">Enterprise</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
              <FooterLink href="/help">Support</FooterLink>
              <FooterLink href="/help#faq">FAQ</FooterLink>
              <FooterLink href="/help#warranty">Warranty</FooterLink>
            </div>
          </div>

          <div>
            <FooterHeading>Platform</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/index-score">RISE Index</FooterLink>
              <FooterLink href="/data-request">Data Request</FooterLink>
              <FooterLink href="/security">Security</FooterLink>
              <FooterLink href="/sdk">Developer SDK</FooterLink>
              <FooterLink href="/sdk/documentation">SDK Docs</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
              <FooterLink href="/status">Status</FooterLink>
            </div>
          </div>

          <div>
            <FooterHeading>Legal</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/legal/terms">Terms of Service</FooterLink>
              <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/legal/push-mode-eula">
                Push Mode EULA
              </FooterLink>
              <FooterLink href="/legal/sleep-data-policy">
                Sleep Data Policy
              </FooterLink>
              <FooterLink href="/legal/autonomous-navigation">
                Autonomous Navigation
              </FooterLink>
              <FooterLink href="/legal/disclaimer">Disclaimer</FooterLink>
            </div>
          </div>
        </div>

        <div className="mb-10 border-t border-hairline pt-8">
          <div className="flex items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-8">
              <span className="text-[10px] tracking-[0.2em] text-muted uppercase">
                Investors
              </span>
              {[
                { label: 'IR Hub', href: '/investors' },
                { label: 'Annual Report', href: '/investors/annual-report' },
                {
                  label: 'Shareholder Letter',
                  href: '/investors/shareholder-letter',
                },
                { label: 'Vision 2045', href: '/investors/vision' },
                { label: 'Financials', href: '/investors/financials' },
                { label: 'Press', href: '/investors/press' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[10px] tracking-[0.04em] text-muted transition-colors duration-200 hover:text-foreground-soft"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <a
              href="https://github.com/arndvs/riseawake.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-200 hover:text-foreground-soft"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <p className="text-[11px] tracking-[0.04em] text-muted">
              &copy; {year} RISE Technologies, Inc. All rights reserved.
            </p>
            <FooterLink href="/sitemap">Sitemap</FooterLink>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/#refer"
              className="text-[11px] text-muted transition-colors duration-200 hover:text-rise-rise"
            >
              Know someone who needs a push? →
            </Link>
            <p className="max-w-md text-left text-[11px] tracking-[0.04em] text-muted md:text-right">
              RISE is not responsible for productivity gains, lifestyle
              improvements, career advancement, relationship outcomes, or
              existential reckonings resulting from Push Mode. Results may exceed
              expectations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
