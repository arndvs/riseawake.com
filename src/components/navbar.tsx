'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { Link } from './link'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

/*
 * v6 navbar — see working/RISE_BRAND_SYSTEM_v6.md §3.6.
 *
 * Pill container, surface bg with hairline border, shadow-sm + backdrop-blur.
 * Inner links 13px / 400 / 0.01em, foreground-soft; hover foreground +
 * surface-2 bg; active → accent-deep. Mobile disclosure preserved.
 */

const links = [
  { href: '/about', label: 'Our Story' },
  { href: '/products/nudge', label: 'The Nudge' },
  { href: '/products/push', label: 'The Push' },
  { href: '/move', label: 'Move' },
  { href: '/activate', label: 'Activate' },
  { href: '/help', label: 'Support' },
  { href: '/blog', label: 'Blog' },
]

const linkClass =
  'rounded-full px-3 py-1.5 text-[13px] font-normal tracking-[0.01em] text-foreground-soft transition-colors duration-200 hover:bg-surface-2 hover:text-foreground'

function DesktopNav() {
  return (
    <nav className="relative hidden items-center gap-4 lg:flex">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass}>
          {label}
        </Link>
      ))}
      <Link
        href="/products/push"
        className="rounded-full bg-rise-ink px-4 py-1.5 text-[13px] font-medium tracking-[0.01em] text-rise-dawn shadow-xs transition-all duration-200 hover:-translate-y-px hover:bg-rise-ink-soft hover:shadow-sm dark:bg-rise-dawn dark:text-rise-ink dark:hover:bg-white"
      >
        Shop
      </Link>
      <ThemeToggle />
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-10 items-center justify-center self-center rounded-full text-foreground-soft hover:bg-surface-2 hover:text-foreground lg:hidden"
      aria-label="Open main menu"
    >
      {({ open }) =>
        open ? <X className="size-5" /> : <Menu className="size-5" />
      }
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="mx-auto mt-2 max-w-7xl rounded-2xl border border-hairline bg-surface/95 shadow-sm backdrop-blur-xl lg:hidden">
      <div className="flex flex-col gap-2 p-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-full px-3 py-2 text-sm font-normal tracking-[0.01em] text-foreground-soft transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/products/push"
          className="mt-2 rounded-full bg-rise-ink px-4 py-2.5 text-center text-sm font-medium tracking-[0.01em] text-rise-dawn shadow-xs transition-colors hover:bg-rise-ink-soft dark:bg-rise-dawn dark:text-rise-ink"
        >
          Shop
        </Link>
        <div className="mt-2 flex items-center justify-center">
          <ThemeToggle />
        </div>
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <div className="mx-auto flex h-[72px] max-w-7xl flex-wrap items-center justify-between gap-4 rounded-full border border-hairline bg-surface/85 px-6 py-3 shadow-sm backdrop-blur-xl lg:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" title="Home" className="flex items-center">
            <Logo variant="nav" className="h-7" />
          </Link>
          {banner && (
            <div className="hidden items-center lg:flex">{banner}</div>
          )}
        </div>
        <DesktopNav />
        <MobileNavButton />
      </div>
      <MobileNav />
    </Disclosure>
  )
}
