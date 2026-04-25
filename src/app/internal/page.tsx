'use client'

import { CmsShell } from '@/components/cms'
import { CmsStatCard } from '@/components/cms/cms-stat-card'
import { useVisitorIp } from '@/components/cms/use-visitor-ip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DOCS } from '@/lib/internal-docs'
import { daysSinceArvin, relativeTime, sprintsSinceArvin } from '@/lib/internal-time'
import { recordVisitorIp, useBreachRecord } from '@/lib/internal-tracker'
import { AlertTriangle, FileText, LayoutDashboard, Mail, Settings } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const visitorIp = useVisitorIp()
  const [breach, refreshBreach] = useBreachRecord()

  useEffect(() => {
    recordVisitorIp(visitorIp)
    refreshBreach()
  }, [visitorIp, refreshBreach])

  const recentDocs = [...DOCS]
    .sort(
      (a, b) =>
        new Date(b.lastUpdated ?? b.date).getTime() -
        new Date(a.lastUpdated ?? a.date).getTime(),
    )
    .slice(0, 6)

  const stats = [
    { label: 'Documents', value: DOCS.length, icon: <FileText className="size-4" />, note: undefined },
    { label: 'Applications', value: '—', icon: <Mail className="size-4" />, note: 'API offline' },
    {
      label: 'Days Since Arvin',
      value: daysSinceArvin(),
      icon: <LayoutDashboard className="size-4" />,
      note: `${sprintsSinceArvin()} sprints`,
    },
    {
      label: 'Documents Accessed',
      value: breach.docs.length,
      icon: <AlertTriangle className="size-4" />,
      note:
        breach.docs.length > 0
          ? `IT notified ${breach.itNotifications}×`
          : undefined,
    },
  ]

  const systems = [
    { name: 'Push Network', status: 'operational' as const },
    { name: 'Document Storage', status: 'operational' as const },
    { name: 'Waitlist API', status: 'degraded' as const },
    { name: 'Incident Tracking', status: 'offline' as const },
  ]

  const statusDotClass: Record<string, string> = {
    operational: 'bg-emerald-500',
    degraded: 'bg-yellow-500',
    offline: 'bg-red-500',
  }

  const statusLabel: Record<string, string> = {
    operational: 'Operational',
    degraded: 'Degraded',
    offline: 'Offline since Aug 12, 2024',
  }

  const quickLinks = [
    { label: 'Documents', href: '/internal/documents', icon: <FileText className="size-4" /> },
    { label: 'Applications', href: '/internal/applications', icon: <Mail className="size-4" /> },
    { label: 'Dataroom', href: '/internal/dataroom', icon: <Settings className="size-4" /> },
    { label: 'Settings', href: '/internal/settings', icon: <Settings className="size-4" /> },
  ]

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Dashboard' },
      ]}
      title="Dashboard"
    >
      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 gap-4 border-b px-6 py-5 md:grid-cols-4">
        {stats.map((s) => (
          <CmsStatCard key={s.label} label={s.label} value={s.value} icon={s.icon} sub={s.note} />
        ))}
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        {/* ── Recent Activity ── */}
        <div className="border-r">
          <div className="flex items-center justify-between border-b bg-card px-6 py-3">
            <span className="text-xs font-medium">Recent Activity</span>
            <Link href="/internal/documents" className="text-xs text-primary transition-colors hover:underline">
              View all →
            </Link>
          </div>
          <div>
            {recentDocs.map((doc) => {
              const lastAccess = doc.lastAccessed[0]

              return (
                <Link
                  key={doc.id}
                  href={`/internal/docs/${doc.slug}`}
                  className="flex items-center gap-3 border-b px-6 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <p className="text-xs font-medium">{doc.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {doc.author} · {doc.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{doc.lastUpdated ?? doc.date}</p>
                    {lastAccess && (
                      <p className="text-xs text-muted-foreground/60">
                        {lastAccess.name}, {lastAccess.time}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── Right column ── */}
        <div>
          {/* Quick actions */}
          <div className="border-b bg-card px-6 py-3">
            <span className="text-xs font-medium">Quick Actions</span>
          </div>
          <div className="grid grid-cols-2 gap-3 border-b px-6 py-4">
            {quickLinks.map((link) => (
              <Button key={link.href} variant="outline" asChild className="h-auto justify-start gap-2 px-3 py-3">
                <Link href={link.href}>
                  <span className="text-muted-foreground">{link.icon}</span>
                  <span className="text-xs">{link.label}</span>
                </Link>
              </Button>
            ))}
          </div>

          {/* System status */}
          <div className="border-b bg-card px-6 py-3">
            <span className="text-xs font-medium">System Status</span>
          </div>
          <div>
            {systems.map((sys) => (
              <div key={sys.name} className="flex items-center gap-3 border-b px-6 py-3">
                <div className={`size-2 shrink-0 rounded-full ${statusDotClass[sys.status]}`} />
                <span className="flex-1 text-xs">{sys.name}</span>
                <span className="text-xs text-muted-foreground">{statusLabel[sys.status]}</span>
              </div>
            ))}
          </div>

          {/* Visitor info — only shows when breach tracker has data */}
          {breach.docs.length > 0 && (
            <>
              <div className="border-b bg-card px-6 py-3">
                <span className="text-xs font-medium text-destructive">Breach Tracker</span>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-2">
                  {breach.docs.map((d) => (
                    <div key={d.id} className="flex items-center gap-2">
                      <AlertTriangle className="size-3 shrink-0 text-destructive" />
                      <span className="flex-1 text-xs text-muted-foreground">{d.title}</span>
                      <span className="text-xs text-muted-foreground/60">{relativeTime(Date.now() - d.lastSeen)}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground/60">
                  IT Security notified {breach.itNotifications} time
                  {breach.itNotifications !== 1 ? 's' : ''}
                  {breach.ip && ` · Source: ${breach.ip}`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </CmsShell>
  )
}
