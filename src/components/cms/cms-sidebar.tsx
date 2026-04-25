'use client'

import { daysSinceArvin } from '@/lib/internal-time'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  AlertTriangle,
  ChevronsUpDown,
  FileText,
  FolderLock,
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Settings,
  Sun,
  User,
  UserPlus,
  Users,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// ─── Nav configuration ───────────────────────────────────────────────────────
const MAIN_NAV = [
  { href: '/internal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/internal/documents', label: 'Documents', icon: FileText, badge: 19 },
  { href: '/internal/applications', label: 'Applications', icon: Mail },
  { href: '/internal/waitlist', label: 'Waitlist', icon: UserPlus, badge: '340K' },
  { href: '/internal/incidents', label: 'Incidents', icon: AlertTriangle, badge: 3 },
] as const

const SYSTEM_NAV = [
  { href: '/internal/dataroom', label: 'Dataroom', icon: FolderLock },
  { href: '/internal/media', label: 'Media', icon: Image },
  { href: '/internal/users', label: 'Users', icon: Users, badge: 3 },
  { href: '/internal/settings', label: 'Settings', icon: Settings },
] as const

function isActive(pathname: string, href: string, label: string): boolean {
  if (label === 'Dashboard') return pathname === '/internal'
  if (label === 'Documents') return pathname === '/internal/documents' || pathname.startsWith('/internal/docs/')
  return pathname.startsWith(href)
}

// ─── Logo (icon-only for collapsed state) ────────────────────────────────────
function SidebarLogo() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" className="size-7 shrink-0">
      <rect width="28" height="28" rx="4" className="fill-brand/15" />
      <rect x="0.5" y="0.5" width="27" height="27" rx="3.5" className="stroke-brand/40" strokeWidth="0.5" />
      <path d="M24 24H4" className="stroke-foreground/20" strokeWidth="1" strokeLinecap="round" />
      <path d="M6.93 12.93l1.41 1.41M21.07 12.93l-1.41 1.41M4 20h2M22 20h2" className="stroke-brand/50" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 20a4 4 0 0 0-8 0" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 4v8M10 8l4-4 4 4" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Theme toggle for sidebar footer ─────────────────────────────────────────
function SidebarThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex size-7 items-center justify-center rounded-md text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

// ─── Sidebar component ───────────────────────────────────────────────────────
export function CmsSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      {/* ── Header: Logo + branding ── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
              <Link href="/internal">
                <SidebarLogo />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="text-sm font-semibold tracking-wide">RISE Internal</span>
                  <span className="text-xs text-sidebar-foreground/50">Document System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Main nav group ── */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(pathname, item.href, item.label)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  {'badge' in item && item.badge !== undefined && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ── System nav group ── */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SYSTEM_NAV.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(pathname, item.href, item.label)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  {'badge' in item && item.badge !== undefined && (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: user + theme toggle ── */}
      <SidebarFooter>
        {!isCollapsed && (
          <div className="px-2 pb-1">
            <p className="text-[10px] text-sidebar-foreground/30">Payload v3.0.0-beta.67</p>
            <p className="text-[10px] text-sidebar-foreground/30">Built by Arvin Reyes</p>
            <p className="text-[10px] text-sidebar-foreground/20">Last deployed Aug 12, 2024 ({daysSinceArvin()}d ago)</p>
          </div>
        )}

        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar size="sm" className="size-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">AR</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate text-xs font-medium">arvin reyes</span>
                    <span className="truncate text-[10px] text-sidebar-foreground/50">areyes@riseawake.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side={isCollapsed ? 'right' : 'top'} align="end" sideOffset={4}>
                <DropdownMenuItem className="gap-2">
                  <User className="size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <LogOut className="size-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          {/* Theme toggle row */}
          <SidebarMenuItem>
            <div className={cn('flex items-center px-2 py-1', isCollapsed && 'justify-center')}>
              <SidebarThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
