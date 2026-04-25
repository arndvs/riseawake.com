'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { CmsEmptyState } from '@/components/cms/cms-empty-state'
import { CmsStatCard } from '@/components/cms/cms-stat-card'
import { CmsStatusBadge, type CmsStatusVariant } from '@/components/cms/cms-status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { getJobById } from '@/lib/careers-data'
import { AlertCircle, ArrowDownUp, ChevronDown, ChevronUp, Eye, EyeOff, Flag, FlagOff, Inbox, RefreshCw } from 'lucide-react'
import { ConvexHttpClient } from 'convex/browser'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const COOKIE_KEY = 'rise_app_overrides'

type ApplicationStatus = 'needs_review' | 'reviewed' | 'archived' | 'flagged'

interface AppOverride {
  status?: ApplicationStatus
  breachFlag?: boolean
  fictional?: boolean
}

function readOverrides(): Record<string, AppOverride> {
  try {
    const match = document.cookie
      .split('; ')
      .find((c) => c.startsWith(`${COOKIE_KEY}=`))
    if (!match) return {}
    return JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')))
  } catch {
    return {}
  }
}

function writeOverrides(overrides: Record<string, AppOverride>) {
  const val = encodeURIComponent(JSON.stringify(overrides))
  // Session cookie — cleared when browser closes or cookies are cleared
  document.cookie = `${COOKIE_KEY}=${val}; path=/internal/applications; SameSite=Lax`
}

interface Application {
  _id: string
  _creationTime: number
  roleId: string
  roleTitle: string
  status: ApplicationStatus
  submittedAt: number
  firstName: string
  lastName: string
  email: string
  phone: string
  experienceLevel: string
  availability: string
  whyJoinRise: string
  roleSpecificAnswers: Record<string, unknown>
  resumeStorageId?: string
  resumeFileName?: string
  resumeFileSize?: number
  ipAddress?: string
  reviewedBy?: string
  reviewNotes?: string
  breachFlag?: boolean
  fictional?: boolean
}

const STATUS_VARIANT: Record<ApplicationStatus, CmsStatusVariant> = {
  needs_review: 'warning',
  reviewed: 'success',
  archived: 'muted',
  flagged: 'error',
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  needs_review: 'NEEDS REVIEW',
  reviewed: 'REVIEWED',
  archived: 'ARCHIVED',
  flagged: 'FLAGGED',
}

const STATUS_DOT: Record<ApplicationStatus, string> = {
  needs_review: 'bg-yellow-500',
  reviewed: 'bg-emerald-500',
  archived: 'bg-muted-foreground',
  flagged: 'bg-red-500',
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [filterRole, setFilterRole] = useState<string>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'newest' | 'oldest'>('newest')

  useEffect(() => {
    fetchApplications()
  }, [])

  const applyOverrides = useCallback((apps: Application[]) => {
    const overrides = readOverrides()
    return apps.map((a) => {
      const o = overrides[a._id]
      if (!o) return a
      return { ...a, ...o }
    })
  }, [])

  async function fetchApplications() {
    setLoading(true)
    try {
      const results = await convex.query(api.applications.listApplications, {})
      setApplications(applyOverrides(results as unknown as Application[]))
    } catch (err) {
      console.error('Failed to fetch applications:', err)
      cmsfireToast('Failed to load applications.', 'error')
    } finally {
      setLoading(false)
    }
  }

  function updateOverride(appId: string, patch: AppOverride) {
    const overrides = readOverrides()
    overrides[appId] = { ...overrides[appId], ...patch }
    writeOverrides(overrides)
  }

  function handleStatusChange(
    appId: string,
    newStatus: ApplicationStatus,
  ) {
    setApplications((apps) =>
      apps.map((a) => (a._id === appId ? { ...a, status: newStatus } : a)),
    )
    updateOverride(appId, { status: newStatus })
    cmsfireToast(`Status updated to ${STATUS_LABELS[newStatus]}.`)
  }

  function handleFlagToggle(app: Application) {
    const next = !app.breachFlag
    setApplications((apps) =>
      apps.map((a) =>
        a._id === app._id ? { ...a, breachFlag: next } : a,
      ),
    )
    updateOverride(app._id, { breachFlag: next })
    cmsfireToast(
      app.breachFlag ? 'Breach flag removed.' : 'Breach flag set.',
      'info',
    )
  }

  function handleFictionalToggle(app: Application) {
    const next = !app.fictional
    setApplications((apps) =>
      apps.map((a) =>
        a._id === app._id ? { ...a, fictional: next } : a,
      ),
    )
    updateOverride(app._id, { fictional: next })
    cmsfireToast(
      app.fictional
        ? 'Removed from public dashboard.'
        : 'Promoted to public dashboard.',
      'info',
    )
  }

  const roleIds = [...new Set(applications.map((a) => a.roleId))]

  const filtered = applications
    .filter(
      (a) =>
        (filterStatus === 'All' || a.status === filterStatus) &&
        (filterRole === 'All' || a.roleId === filterRole),
    )
    .sort((a, b) =>
      sortDir === 'newest'
        ? b.submittedAt - a.submittedAt
        : a.submittedAt - b.submittedAt,
    )

  const counts = {
    total: applications.length,
    needs_review: applications.filter((a) => a.status === 'needs_review')
      .length,
    reviewed: applications.filter((a) => a.status === 'reviewed').length,
    flagged: applications.filter((a) => a.status === 'flagged').length,
  }

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Applications' },
      ]}
      title="Applications"
    >
      {/* ── Stats ── */}
      <div className="grid max-w-2xl grid-cols-4 gap-3 border-b px-6 py-4">
        <CmsStatCard label="Total" value={counts.total} />
        <CmsStatCard label="Needs Review" value={counts.needs_review} />
        <CmsStatCard label="Reviewed" value={counts.reviewed} />
        <CmsStatCard label="Flagged" value={counts.flagged} />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3 border-b bg-card px-6 py-3">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-8 w-auto min-w-32 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All" className="text-xs">All Statuses</SelectItem>
            <SelectItem value="needs_review" className="text-xs">Needs Review</SelectItem>
            <SelectItem value="reviewed" className="text-xs">Reviewed</SelectItem>
            <SelectItem value="archived" className="text-xs">Archived</SelectItem>
            <SelectItem value="flagged" className="text-xs">Flagged</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="h-8 w-auto min-w-32 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All" className="text-xs">All Roles</SelectItem>
            {roleIds.map((id) => {
              const job = getJobById(id)
              return (
                <SelectItem key={id} value={id} className="text-xs">
                  {id} — {job?.title || 'Unknown'}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() =>
            setSortDir((d) => (d === 'newest' ? 'oldest' : 'newest'))
          }
        >
          <ArrowDownUp className="mr-1.5 size-3" />
          {sortDir === 'newest' ? 'Newest' : 'Oldest'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => fetchApplications()}
        >
          <RefreshCw className="mr-1.5 size-3" />
          Refresh
        </Button>
        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} application{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Loading applications...
          </p>
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && filtered.length === 0 && (
        <CmsEmptyState
          icon={<Inbox className="size-6" />}
          title={
            applications.length === 0
              ? 'No applications received yet.'
              : 'No applications match filters.'
          }
          description="Applications submitted through /careers/apply will appear here."
        />
      )}

      {/* ── Application list ── */}
      {!loading && filtered.length > 0 && (
        <div className="flex flex-col gap-1 p-4">
          {filtered.map((app) => {
            const isOpen = expandedId === app._id
            return (
              <Card key={app._id} className={isOpen ? 'border-border' : ''}>
                <Collapsible open={isOpen} onOpenChange={() => setExpandedId(isOpen ? null : app._id)}>
                  <CollapsibleTrigger className="flex w-full items-center gap-4 px-4 py-3 text-left">
                    <span className={`inline-block size-2 shrink-0 rounded-full ${STATUS_DOT[app.status]}`} />
                    <span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">
                      {app.roleId}
                    </span>
                    <span className="flex-1 text-sm">
                      {app.firstName} {app.lastName}
                    </span>
                    <span className="hidden text-xs text-muted-foreground sm:inline">
                      {app.email}
                    </span>
                    <span className="w-28 shrink-0 text-right text-xs text-muted-foreground">
                      {formatDate(app.submittedAt)}
                    </span>
                    <CmsStatusBadge variant={STATUS_VARIANT[app.status]}>
                      {STATUS_LABELS[app.status]}
                    </CmsStatusBadge>
                    {app.breachFlag && (
                      <AlertCircle className="size-3.5 text-red-500" />
                    )}
                    {isOpen
                      ? <ChevronUp className="size-4 text-muted-foreground" />
                      : <ChevronDown className="size-4 text-muted-foreground" />}
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="border-t px-5 py-4">
                      <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-3">
                        <Field label="Full Name" value={`${app.firstName} ${app.lastName}`} />
                        <Field label="Email" value={app.email} />
                        <Field label="Phone" value={app.phone} />
                        <Field label="Role" value={`${app.roleId} — ${app.roleTitle}`} />
                        <Field label="Experience" value={app.experienceLevel} />
                        <Field label="Availability" value={app.availability} />
                        {app.ipAddress && <Field label="IP Address" value={app.ipAddress} />}
                        <Field label="Submitted" value={formatDate(app.submittedAt)} />
                      </div>

                      <Separator className="my-4" />

                      {/* Why RISE */}
                      <div className="mb-4">
                        <p className="mb-1 text-xs font-medium text-muted-foreground">
                          Why Join RISE
                        </p>
                        <div className="rounded-sm bg-muted px-3 py-2.5 text-sm leading-relaxed">
                          {app.whyJoinRise}
                        </div>
                      </div>

                      {/* Role-specific answers */}
                      {Object.keys(app.roleSpecificAnswers).length > 0 && (
                        <div className="mb-4">
                          <p className="mb-1 text-xs font-medium text-muted-foreground">
                            Role-Specific Answers
                          </p>
                          <div className="rounded-sm bg-muted px-3 py-2.5">
                            {Object.entries(app.roleSpecificAnswers).map(([key, val]) => (
                              <div key={key} className="mb-2 last:mb-0">
                                <span className="text-xs text-muted-foreground">{key}:</span>
                                <span className="ml-2 text-sm">
                                  {typeof val === 'boolean'
                                    ? val ? 'Yes' : 'No'
                                    : Array.isArray(val)
                                      ? val.join(', ')
                                      : String(val)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resume */}
                      {app.resumeFileName && (
                        <div className="mb-4">
                          <p className="mb-1 text-xs font-medium text-muted-foreground">Resume</p>
                          <div className="flex items-center gap-3 rounded-sm bg-muted px-3 py-2">
                            <span className="text-sm">{app.resumeFileName}</span>
                            {app.resumeFileSize && (
                              <span className="text-xs text-muted-foreground">
                                ({formatFileSize(app.resumeFileSize)})
                              </span>
                            )}
                            <span className="text-xs italic text-muted-foreground">
                              Stored in Convex
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Review notes */}
                      {app.reviewNotes && (
                        <div className="mb-4">
                          <p className="mb-1 text-xs font-medium text-muted-foreground">
                            Review Notes
                            {app.reviewedBy && (
                              <span className="ml-2 font-normal text-muted-foreground/60">
                                by {app.reviewedBy}
                              </span>
                            )}
                          </p>
                          <div className="rounded-sm bg-muted px-3 py-2.5 text-sm leading-relaxed">
                            {app.reviewNotes}
                          </div>
                        </div>
                      )}

                      <Separator className="my-4" />

                      {/* ── Actions ── */}
                      <div className="flex flex-wrap items-center gap-2">
                        {(
                          ['needs_review', 'reviewed', 'archived', 'flagged'] as ApplicationStatus[]
                        )
                          .filter((s) => s !== app.status)
                          .map((s) => (
                            <Button
                              key={s}
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleStatusChange(app._id, s)}
                            >
                              Mark {STATUS_LABELS[s]}
                            </Button>
                          ))}
                        <Button
                          variant={app.breachFlag ? 'destructive' : 'outline'}
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleFlagToggle(app)}
                        >
                          {app.breachFlag
                            ? <><FlagOff className="mr-1.5 size-3" /> Remove Flag</>
                            : <><Flag className="mr-1.5 size-3" /> Flag</>}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleFictionalToggle(app)}
                        >
                          {app.fictional
                            ? <><Eye className="mr-1.5 size-3" /> Public</>
                            : <><EyeOff className="mr-1.5 size-3" /> Hidden</>}
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )
          })}
        </div>
      )}

      {/* ── Note ── */}
      <div className="px-6 pb-6">
        <Card className="rounded-sm">
          <CardContent className="px-4 py-3">
            <p className="text-xs text-muted-foreground/60">
              This dashboard shows fictional in-universe applications only.
              Real submissions are delivered via email and stored in Convex
              but hidden from this view by default. Applications can be
              promoted to public visibility or hidden using the ◉/◎ toggle.
              Status changes and breach flags are recorded. The review
              process involves Dr.&nbsp;Voss. Her feedback mode is not documented
              here.
            </p>
          </CardContent>
        </Card>
      </div>
    </CmsShell>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  )
}