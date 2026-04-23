import { Link } from './link'
import { Logo } from './logo'

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-xs tracking-[0.16em] text-foreground-muted uppercase">
      {children}
    </p>
  )
}

function FooterLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className="text-xs text-foreground-secondary transition-colors duration-200 hover:text-foreground"
    />
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-edge bg-surface-alt">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo className="mb-4 h-7" />
            <p className="mb-4 max-w-48 text-xs leading-relaxed text-foreground-muted">
              Smart Adjustable Base technology for people who need a little
              push.
            </p>
            <p className="text-xs leading-relaxed text-foreground-muted italic">
              &ldquo;Push Mode cannot be manually interrupted once initiated,
              This is a feature, not a limitation.&rdquo;
            </p>
          </div>

          <div>
            <FooterHeading>Products</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/products/nudge">The Nudge</FooterLink>
              <FooterLink href="/products/push">The Push</FooterLink>
              <FooterLink href="/activate">Activate</FooterLink>
              <span className="text-xs text-foreground-muted">
                The Push Pro{' '}
                <span className="text-[10px] text-foreground-muted/40">
                  — Coming Soon
                </span>
              </span>
              <Link
                href="/move"
                className="text-xs text-accent/50 transition-colors duration-200 hover:text-accent"
              >
                RISE™ Move{' '}
                <span className="text-[10px] text-accent/30">
                  — In Development
                </span>
              </Link>
            </div>
          </div>

          <div>
            <FooterHeading>Company</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/about">Our Story</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
              <FooterLink href="/help">Support</FooterLink>
              <FooterLink href="/help#faq">FAQ</FooterLink>
              <FooterLink href="/help#warranty">Warranty</FooterLink>
            </div>
          </div>

          <div>
            <FooterHeading>Platform</FooterHeading>
            <div className="flex flex-col gap-3">
              <FooterLink href="/data-request">Data Request</FooterLink>
              <FooterLink href="/security">Security</FooterLink>
              <FooterLink href="/sdk">Developer SDK</FooterLink>
              <FooterLink href="/sdk/documentation">SDK Docs</FooterLink>
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

        <div className="mb-10 border-t border-edge-subtle pt-8">
          <div className="flex flex-wrap items-center gap-8">
            <span className="text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
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
                className="text-[10px] text-foreground-muted transition-colors duration-200 hover:text-foreground-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-edge-subtle pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <p className="text-[11px] text-foreground-muted">
              &copy; {year} RISE™ Technologies, Inc. All rights reserved.
            </p>
            <FooterLink href="/sitemap">Sitemap</FooterLink>
          </div>
          <p className="max-w-md text-left text-[11px] text-foreground-muted/60 md:text-right">
            RISE™ is not responsible for productivity gains, lifestyle
            improvements, career advancement, relationship outcomes, or
            existential reckonings resulting from Push Mode. Results may exceed
            expectations.
          </p>
        </div>
      </div>
    </footer>
  )
}
