'use client'

import { Link } from '@/components/link'
import { useEffect, useMemo, useState } from 'react'

type TOCItem = {
  id: string
  label: string
  level?: number
}

type Props = {
  title: string
  version: string
  lastUpdated: string
  toc: TOCItem[]
  children: React.ReactNode
  relatedDocs?: { label: string; href: string }[]
}

export function LegalLayout({
  title,
  version,
  lastUpdated,
  toc,
  children,
  relatedDocs,
}: Props) {
  const [activeSection, setActiveSection] = useState<string>('')

  const tocIds = useMemo(() => toc.map(({ id }) => id), [toc])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    tocIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [tocIds])

  return (
    <div className="min-h-screen">
      <div className="border-b border-edge-subtle bg-surface-alt/80 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/legal"
              className="text-xs tracking-[0.16em] text-foreground-muted uppercase"
            >
              ← Legal
            </Link>
            <span className="text-edge">|</span>
            <span className="text-xs text-foreground-muted">{title}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-xl border border-edge-subtle bg-foreground/4 px-2 py-1 text-[10px] text-foreground-muted">
              {version}
            </span>
            <span className="text-[10px] text-foreground-muted/50">
              Last updated {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-12 px-6 py-12">
        <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-56 shrink-0 self-start overflow-y-auto lg:block">
          <p className="mb-4 text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
            Contents
          </p>
          <nav className="flex flex-col gap-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`border-l py-1 pr-2 text-xs leading-normal transition-colors duration-150 ${
                  activeSection === item.id
                    ? 'border-accent/60 text-foreground-secondary'
                    : 'border-transparent text-foreground-muted'
                } ${item.level === 2 ? 'pl-3' : 'pl-2'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {relatedDocs && relatedDocs.length > 0 && (
            <div className="mt-8 border-t border-edge-subtle pt-6">
              <p className="mb-4 text-[10px] tracking-[0.2em] text-foreground-muted/50 uppercase">
                Related
              </p>
              <div className="flex flex-col gap-2">
                {relatedDocs.map((doc) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className="text-xs leading-normal text-foreground-muted/50 transition-colors duration-150 hover:text-foreground-secondary"
                  >
                    {doc.label} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="max-w-3xl min-w-0 flex-1">
          <h1 className="mb-2 font-display text-subsection tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mb-10 text-xs text-foreground-muted/50">
            {version} · Last updated {lastUpdated} · RISE™ Technologies, Inc.
          </p>

          <div className="legal-content">{children}</div>

          <AcceptanceClause />
        </main>
      </div>
    </div>
  )
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="mb-4 flex items-baseline gap-3 text-sm font-medium text-foreground-secondary">
        <span className="font-sans text-[11px] text-foreground-muted/50">
          {number}
        </span>
        {title}
      </h2>
      <div className="legal-body">{children}</div>
    </section>
  )
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-body text-foreground-muted">
      {children}
    </p>
  )
}

export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-accent/12 bg-accent/6 px-4 py-3 text-xs leading-relaxed text-foreground-muted">
      {children}
    </div>
  )
}

export function AppendixNote({ label }: { label: string }) {
  return (
    <span className="mx-1 inline-block rounded-xl border border-edge-subtle bg-foreground/4 px-2 py-0.5 text-[10px] text-foreground-muted/50">
      {label} — forthcoming
    </span>
  )
}

export function AcceptanceClause() {
  return (
    <div className="mt-16 border-t border-edge-subtle pt-8 text-xs leading-loose text-foreground-muted">
      <p className="mb-3">
        By using RISE™ products, accessing RISE™ services, sleeping within range
        of a RISE™ device, being present in a residence where a RISE™ device is
        registered, or interacting with someone who has accepted these terms,
        you have accepted these terms.
      </p>
      <p className="mb-3">
        If you have not accepted these terms, please don't press the button on
        the PM-1 remote to initiate the opt-out process.
      </p>
      <p className="mb-3 rounded-xl border border-edge-subtle bg-foreground/3 px-3 py-2">
        <em>
          Note: The PM-1 remote initiates Push Mode. There is no opt-out
          process. Continued presence in the sleep environment constitutes
          acceptance.
        </em>
      </p>
      <p className="text-foreground-muted/40">Have a productive day.</p>
    </div>
  )
}
