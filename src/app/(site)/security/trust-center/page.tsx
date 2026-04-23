import { Link } from '@/components/link'
import { Logo } from '@/components/logo'
import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Trust Center — Coming Soon — RISE™',
  description:
    'The RISE™ Trust Center is currently under development. Expected launch: Q4 2024.',
  path: '/security/trust-center',
})

export default function TrustCenterPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <Logo className="mb-10 h-7" />

      <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/8 px-3 py-1">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent/80" />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
          In Development
        </span>
      </div>

      <h1 className="font-display text-display tracking-tight text-foreground">
        Trust Center
      </h1>

      <p className="mt-4 max-w-md text-base leading-relaxed text-foreground-secondary">
        The RISE™ Trust Center is being built to provide real-time visibility
        into our security posture, compliance certifications, and data handling
        practices — all in one place.
      </p>

      <p className="mt-6 max-w-sm text-body text-foreground-muted">
        Our team is working to ensure the Trust Center meets the same standard
        of excellence our customers expect from the RISE™ platform. We
        appreciate your patience.
      </p>

      <div className="mt-10 rounded-xl border border-edge-subtle bg-surface-alt px-8 py-6">
        <p className="text-eyebrow uppercase text-foreground-muted">
          Expected Launch
        </p>
        <p className="mt-2 font-display text-subsection tracking-tight text-foreground">
          Q4 2024
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/security"
          className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3 text-xs font-medium text-foreground-secondary transition-colors duration-200 hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to Security
        </Link>
        <Link
          href="/security/trust-center/notify"
          className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-6 py-3 text-xs font-medium text-accent transition-colors duration-200 hover:bg-accent/12"
        >
          Notify Me at Launch
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <p className="mt-16 max-w-md text-[10px] leading-relaxed text-foreground-muted/40">
        The Trust Center project was initiated in Q3 2024 under the direction
        of the Platform Security team. Development is proceeding according to
        the original timeline established at project kickoff. No revisions to
        scope or schedule have been necessary. The project remains on track.
      </p>

      <p className="mt-4 text-[10px] italic text-foreground-muted/30">
        Last updated: August 12, 2024.
      </p>
    </main>
  )
}
