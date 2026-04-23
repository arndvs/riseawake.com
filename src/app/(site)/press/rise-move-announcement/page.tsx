import { Link } from '@/components/link'

export default function MoveAnnouncementPage() {
  return (
    <main>

      <article className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-12 text-xs text-foreground-muted/60">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/press" className="transition-colors hover:text-foreground-muted">Press</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground-muted">RISE™ Move Announcement</li>
            </ol>
          </nav>

          <div className="mb-12 border-b border-edge-subtle pb-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-xl border border-accent/12 bg-accent/8 px-2 py-1 text-[10px] tracking-[0.14em] text-accent/65 uppercase">
                Product
              </span>
              <span className="rounded-xl border border-edge-subtle bg-foreground/3 px-2 py-1 text-[10px] tracking-[0.14em] text-foreground-muted uppercase">
                Press Release
              </span>
            </div>

            <p className="mb-3 text-xs text-foreground-muted/50">
              FOR IMMEDIATE RELEASE
            </p>

            <h1 className="mb-6 font-display text-subsection leading-snug tracking-tight text-foreground">
              RISE™ Technologies Confirms Next-Generation Vertical Navigation
              Platform in Development
            </h1>

            <p className="text-sm text-foreground-muted">
              <strong className="text-foreground-secondary">
                SAN FRANCISCO, CA — February 3, 2025
              </strong>
            </p>
          </div>

          <div className="mb-14 space-y-5 text-sm leading-loose text-foreground-muted">
            <p>
              RISE™ Technologies, Inc. today confirmed that its research and
              development team is actively developing a next-generation smart
              adjustable base platform with vertical navigation capability, to
              be named the{' '}
              <strong className="font-medium text-foreground-secondary">
                RISE™ Move
              </strong>
              .
            </p>
            <p>
              The announcement addresses a known limitation of the current RISE™
              Push, which operates on flat and gradual-gradient surfaces only.
              Staircase navigation — in either direction — has not been
              supported in any RISE™ product to date. This limitation is
              documented in the Push&rsquo;s product specifications, disclosed
              during the activation process at Stage 5, and addressed in{' '}
              <Link
                href="/legal/terms#s7"
                className="text-foreground-secondary underline"
              >
                Section 7 of the Terms of Service
              </Link>
              .
            </p>

            <blockquote className="my-8 border-l-2 border-foreground-muted/30 pl-6">
              <p className="mb-3 text-base leading-relaxed text-foreground-secondary italic">
                &ldquo;We are aware of the stairs. All of them. Both directions.
                We are doing something about it.&rdquo;
              </p>
              <p className="text-xs text-foreground-muted">
                — Dr. Eleanor Voss, Founder & Chief Executive Officer, RISE™
                Technologies, Inc.
              </p>
            </blockquote>

            <p>RISE™ confirmed the following regarding the RISE™ Move:</p>

            <ul className="space-y-2 pl-4">
              {[
                'A next-generation vertical navigation platform is in active development',
                'The platform will support staircase traversal in both directions — ascending and descending — attended and unattended',
                'The solo return commute will include staircase navigation. The bed will come home.',
                'The RISE™ Move is a distinct product. It is not an update to the current Push.',
                'The RISE™ Move will be priced as a premium product, above the current Push',
                'The RISE™ Move will include a recurring Vertical Navigation Services (VNS) subscription, required for staircase capability',
                'Current RISE™ Push and Nudge owners will not receive preferential pricing',
                'No timeline has been established for announcement or release',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-foreground-muted"
                >
                  <span className="shrink-0 text-foreground-muted/50">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <p>
              RISE™ declined to provide additional details, including the
              Move&rsquo;s form factor, hardware price, VNS subscription fee,
              first available date, or any specification beyond the above. RISE™
              also declined to comment on whether the Move will include Push
              Mode, whether Push Mode in the Move will have an off switch, and
              whether current Push owners will be able to trade in their
              existing device.
            </p>

            <blockquote className="my-8 border-l-2 border-edge-subtle pl-6">
              <p className="mb-3 text-base leading-relaxed text-foreground-secondary/70 italic">
                &ldquo;We are not currently accepting questions about the RISE™
                Move beyond what has been disclosed today. The fact that it
                exists, that it navigates stairs in both directions, and that it
                will cost more than the Push — that is what we are saying today.
                We look forward to saying more when we are ready to say
                more.&rdquo;
              </p>
              <p className="text-xs text-foreground-muted">
                — Dr. Eleanor Voss
              </p>
            </blockquote>

            <p>
              Push owners who wish to be notified when additional information
              becomes available may join the notification list at{' '}
              <Link
                href="/move"
                className="text-foreground-secondary underline"
              >
                riseawake.com/move
              </Link>
              . Joining the list does not reserve a unit, establish pricing, or
              constitute any agreement with RISE™. Current Push owners will be
              notified at the same time as all other registrants. There is no
              priority queue.
            </p>

            <p className="text-foreground-muted/60">
              The RISE™ Push remains available by waitlist at{' '}
              <Link
                href="/products/push"
                className="text-foreground-muted underline"
              >
                riseawake.com/products/push
              </Link>
              . The Push is not being discontinued. It operates on flat
              surfaces. It will continue to do so.
            </p>
          </div>

          <div className="border-t border-edge-subtle pt-8 pb-8">
            <p className="mb-4 text-xs font-medium text-foreground-muted">
              About RISE™ Technologies, Inc.
            </p>
            <p className="mb-6 text-xs leading-relaxed text-foreground-muted/60">
              RISE™ Technologies, Inc. develops smart adjustable base platforms
              for people who need a little push. The company&rsquo;s current
              product, The Push, features Push Mode autonomous morning routing
              and is available by waitlist at riseawake.com. RISE™ is
              headquartered in San Francisco, California. The company was
              founded in 2009 by Dr. Eleanor Voss, who has not been late to a
              meeting since 2021.
            </p>

            <p className="mb-3 text-xs font-medium text-foreground-muted">
              Forward-Looking Statements
            </p>
            <p className="mb-6 text-xs leading-relaxed text-foreground-muted/50">
              This press release contains forward-looking statements within the
              meaning of applicable securities laws. These statements involve
              risks and uncertainties. The RISE™ Move may not be released on any
              particular timeline, at any particular price, or at all. RISE™ is
              not responsible for expectations created by this release. Current
              Push owners who purchased in anticipation of staircase capability
              based on this or any other communication should review{' '}
              <Link
                href="/legal/terms#s7"
                className="text-foreground-muted/60 underline"
              >
                Section 7 of the Terms of Service
              </Link>
              . The Move is in development. Development takes time. RISE™ does
              not comment on how much time.
            </p>

            <p className="mb-3 text-xs font-medium text-foreground-muted">
              Media Contact
            </p>
            <p className="text-xs leading-relaxed text-foreground-muted/60">
              press@riseawake.com · Response time: 5 business days
              <br />
              Dr. Voss is available for comment. She is not available for
              comment on the Move&rsquo;s timeline, price, or whether it will
              have an off switch.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-edge-subtle pt-6">
            <Link href="/press" className="text-xs text-foreground-muted">
              ← All Press Releases
            </Link>
            <Link href="/move" className="text-xs text-accent/60">
              Join the Move waitlist →
            </Link>
          </div>
        </div>
      </article>

    </main>
  )
}
