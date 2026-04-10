'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { Link } from './link'
import { Logo } from './logo'

const links = [
  { href: '/about', label: 'Our Story' },
  { href: '/products/nudge', label: 'The Nudge' },
  { href: '/products/push', label: 'The Push' },
  { href: '/move', label: 'Move' },
  { href: '/activate', label: 'Activate' },
  { href: '/help', label: 'Support' },
  { href: '/blog', label: 'Blog' },
]

function DesktopNav() {
  return (
    <nav className="relative hidden items-center gap-8 lg:flex">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-xs font-medium uppercase tracking-widest text-foreground-secondary transition-colors duration-200 hover:text-foreground"
        >
          {label}
        </Link>
      ))}
      <Link
        href="/products/push"
        className="rounded-pill bg-accent px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors duration-200 hover:bg-accent-hover"
      >
        Shop Now
      </Link>
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg text-foreground-secondary hover:text-foreground lg:hidden"
      aria-label="Open main menu"
    >
      {({ open }) => (open ? <X className="size-6" /> : <Menu className="size-6" />)}
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="border-t border-edge bg-page/97 backdrop-blur-xl lg:hidden">
      <div className="flex flex-col gap-6 px-6 py-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium uppercase tracking-widest text-foreground-secondary transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/products/push"
          className="rounded-pill bg-accent px-5 py-3 text-center text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-accent-hover"
        >
          Shop Now
        </Link>
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="fixed inset-x-0 top-0 z-50 border-b border-edge/0 bg-page/85 backdrop-blur-xl transition-all duration-500 data-open:border-edge">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-6">
          <Link href="/" title="Home">
            <Logo className="h-7" />
          </Link>
          {banner && (
            <div className="hidden items-center lg:flex">
              {banner}
            </div>
          )}
        </div>
        <DesktopNav />
        <MobileNavButton />
      </div>
      <MobileNav />
    </Disclosure>
  )
}
