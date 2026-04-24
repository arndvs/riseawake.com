'use client'

import PayloadShell, {
  fireToast,
  P,
} from '@/components/payload/PayloadShell'
import { getJobById } from '@/lib/careers-data'
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

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  needs_review: '#eab308',
  reviewed: '#22c55e',
  archived: '#555555',
  flagged: '#ef4444',
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  needs_review: 'NEEDS REVIEW',
  reviewed: 'REVIEWED',
  archived: 'ARCHIVED',
  flagged: 'FLAGGED',
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', {
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
      fireToast('Failed to load applications.', 'error')
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
    fireToast(`Status updated to ${STATUS_LABELS[newStatus]}.`)
  }

  function handleFlagToggle(app: Application) {
    const next = !app.breachFlag
    setApplications((apps) =>
      apps.map((a) =>
        a._id === app._id ? { ...a, breachFlag: next } : a,
      ),
    )
    updateOverride(app._id, { breachFlag: next })
    fireToast(
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
    fireToast(
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
    <PayloadShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Applications' },
      ]}
      title="Applications"
    >
      {/* ── Stats ── */}
      <div
        className="mb-6 grid grid-cols-4 gap-3"
        style={{ maxWidth: '600px' }}
      >
        {[
          { label: 'Total', value: counts.total, color: P.blue },
          {
            label: 'Needs Review',
            value: counts.needs_review,
            color: STATUS_COLORS.needs_review,
          },
          {
            label: 'Reviewed',
            value: counts.reviewed,
            color: STATUS_COLORS.reviewed,
          },
          {
            label: 'Flagged',
            value: counts.flagged,
            color: STATUS_COLORS.flagged,
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-sm px-3 py-2.5"
            style={{
              background: P.elevation100,
              border: `1px solid ${P.border}`,
            }}
          >
            <p className="text-[10px]" style={{ color: P.textFaint }}>
              {label}
            </p>
            <p
              className="mt-1 text-lg font-semibold"
              style={{ color }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div
        className="mb-4 flex flex-wrap items-center gap-3"
        style={{
          background: P.elevation50,
          border: `1px solid ${P.border}`,
          borderRadius: '4px',
          padding: '10px 14px',
        }}
      >
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-sm px-2.5 py-1.5 text-[11px]"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.borderStrong}`,
            color: P.text,
            cursor: 'pointer',
          }}
        >
          <option value="All">All Statuses</option>
          <option value="needs_review">Needs Review</option>
          <option value="reviewed">Reviewed</option>
          <option value="archived">Archived</option>
          <option value="flagged">Flagged</option>
        </select>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-sm px-2.5 py-1.5 text-[11px]"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.borderStrong}`,
            color: P.text,
            cursor: 'pointer',
          }}
        >
          <option value="All">All Roles</option>
          {roleIds.map((id) => {
            const job = getJobById(id)
            return (
              <option key={id} value={id}>
                {id} — {job?.title || 'Unknown'}
              </option>
            )
          })}
        </select>
        <button
          onClick={() =>
            setSortDir((d) => (d === 'newest' ? 'oldest' : 'newest'))
          }
          className="rounded-sm px-2.5 py-1.5 text-[11px]"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.borderStrong}`,
            color: P.textMuted,
            cursor: 'pointer',
          }}
        >
          {sortDir === 'newest' ? '↓ Newest' : '↑ Oldest'}
        </button>
        <button
          onClick={() => fetchApplications()}
          className="rounded-sm px-2.5 py-1.5 text-[11px]"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.borderStrong}`,
            color: P.textMuted,
            cursor: 'pointer',
          }}
        >
          ↻ Refresh
        </button>
        <span className="ml-auto text-[10px]" style={{ color: P.textFaint }}>
          {filtered.length} application{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="py-12 text-center">
          <p className="text-xs" style={{ color: P.textMuted }}>
            Loading applications...
          </p>
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-xs" style={{ color: P.textMuted }}>
            {applications.length === 0
              ? 'No applications received yet.'
              : 'No applications match filters.'}
          </p>
          <p
            className="mt-2 text-[10px]"
            style={{ color: P.textFaint }}
          >
            Applications submitted through /careers/apply will appear here.
          </p>
        </div>
      )}

      {/* ── Application list ── */}
      {!loading && filtered.length > 0 && (
        <div className="flex flex-col gap-1">
          {filtered.map((app) => {
            const isOpen = expandedId === app._id
            return (
              <div
                key={app._id}
                className="rounded-sm"
                style={{
                  background: P.elevation50,
                  border: `1px solid ${isOpen ? P.borderStrong : P.border}`,
                }}
              >
                {/* ── Row header ── */}
                <button
                  onClick={() =>
                    setExpandedId(isOpen ? null : app._id)
                  }
                  className="payload-row flex w-full items-center gap-4 px-4 py-3 text-left"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderBottom: isOpen
                      ? `1px solid ${P.border}`
                      : 'none',
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{
                      background:
                        STATUS_COLORS[app.status],
                    }}
                  />
                  <span
                    className="w-20 shrink-0 text-[10px] font-mono"
                    style={{ color: P.textMuted }}
                  >
                    {app.roleId}
                  </span>
                  <span
                    className="flex-1 text-xs"
                    style={{ color: P.text }}
                  >
                    {app.firstName} {app.lastName}
                  </span>
                  <span
                    className="hidden text-[11px] sm:inline"
                    style={{ color: P.textMuted }}
                  >
                    {app.email}
                  </span>
                  <span
                    className="w-28 shrink-0 text-right text-[10px]"
                    style={{ color: P.textFaint }}
                  >
                    {formatDate(app.submittedAt)}
                  </span>
                  <span
                    className="w-24 shrink-0 text-right text-[10px] font-medium"
                    style={{
                      color: STATUS_COLORS[app.status],
                    }}
                  >
                    {STATUS_LABELS[app.status]}
                  </span>
                  {app.breachFlag && (
                    <span
                      className="text-[10px]"
                      style={{ color: P.error }}
                      title="Breach flag"
                    >
                      ⚑
                    </span>
                  )}
                </button>

                {/* ── Expanded detail ── */}
                {isOpen && (
                  <div className="px-5 py-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-4">
                      <Field
                        label="Full Name"
                        value={`${app.firstName} ${app.lastName}`}
                      />
                      <Field label="Email" value={app.email} />
                      <Field label="Phone" value={app.phone} />
                      <Field label="Role" value={`${app.roleId} — ${app.roleTitle}`} />
                      <Field
                        label="Experience"
                        value={app.experienceLevel}
                      />
                      <Field
                        label="Availability"
                        value={app.availability}
                      />
                      {app.ipAddress && (
                        <Field
                          label="IP Address"
                          value={app.ipAddress}
                        />
                      )}
                      <Field
                        label="Submitted"
                        value={formatDate(app.submittedAt)}
                      />
                    </div>

                    {/* Why RISE */}
                    <div className="mb-4">
                      <p
                        className="mb-1 text-[10px] font-medium"
                        style={{ color: P.textMuted }}
                      >
                        Why Join RISE
                      </p>
                      <div
                        className="rounded-sm px-3 py-2.5 text-xs leading-relaxed"
                        style={{
                          background: P.elevation200,
                          color: P.text,
                        }}
                      >
                        {app.whyJoinRise}
                      </div>
                    </div>

                    {/* Role-specific answers */}
                    {Object.keys(app.roleSpecificAnswers).length > 0 && (
                      <div className="mb-4">
                        <p
                          className="mb-1 text-[10px] font-medium"
                          style={{ color: P.textMuted }}
                        >
                          Role-Specific Answers
                        </p>
                        <div
                          className="rounded-sm px-3 py-2.5"
                          style={{ background: P.elevation200 }}
                        >
                          {Object.entries(
                            app.roleSpecificAnswers,
                          ).map(([key, val]) => (
                            <div key={key} className="mb-2 last:mb-0">
                              <span
                                className="text-[10px]"
                                style={{ color: P.textFaint }}
                              >
                                {key}:
                              </span>
                              <span
                                className="ml-2 text-xs"
                                style={{ color: P.text }}
                              >
                                {typeof val === 'boolean'
                                  ? val
                                    ? 'Yes'
                                    : 'No'
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
                        <p
                          className="mb-1 text-[10px] font-medium"
                          style={{ color: P.textMuted }}
                        >
                          Resume
                        </p>
                        <div
                          className="flex items-center gap-3 rounded-sm px-3 py-2"
                          style={{ background: P.elevation200 }}
                        >
                          <span
                            className="text-xs"
                            style={{ color: P.text }}
                          >
                            {app.resumeFileName}
                          </span>
                          {app.resumeFileSize && (
                            <span
                              className="text-[10px]"
                              style={{ color: P.textFaint }}
                            >
                              ({formatFileSize(app.resumeFileSize)})
                            </span>
                          )}
                          <span
                            className="text-[10px]"
                            style={{ color: P.textFaint, fontStyle: 'italic' }}
                          >
                            Stored in Convex
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Review notes */}
                    {app.reviewNotes && (
                      <div className="mb-4">
                        <p
                          className="mb-1 text-[10px] font-medium"
                          style={{ color: P.textMuted }}
                        >
                          Review Notes
                          {app.reviewedBy && (
                            <span
                              className="ml-2 font-normal"
                              style={{ color: P.textFaint }}
                            >
                              by {app.reviewedBy}
                            </span>
                          )}
                        </p>
                        <div
                          className="rounded-sm px-3 py-2.5 text-xs leading-relaxed"
                          style={{
                            background: P.elevation200,
                            color: P.text,
                          }}
                        >
                          {app.reviewNotes}
                        </div>
                      </div>
                    )}

                    {/* ── Actions ── */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      {(
                        [
                          'needs_review',
                          'reviewed',
                          'archived',
                          'flagged',
                        ] as ApplicationStatus[]
                      )
                        .filter((s) => s !== app.status)
                        .map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              handleStatusChange(app._id, s)
                            }
                            className="rounded-sm px-3 py-1.5 text-[10px]"
                            style={{
                              background: 'transparent',
                              border: `1px solid ${STATUS_COLORS[s]}40`,
                              color: STATUS_COLORS[s],
                              cursor: 'pointer',
                            }}
                          >
                            Mark {STATUS_LABELS[s]}
                          </button>
                        ))}
                      <button
                        onClick={() => handleFlagToggle(app)}
                        className="rounded-sm px-3 py-1.5 text-[10px]"
                        style={{
                          background: app.breachFlag
                            ? 'rgba(239,68,68,0.1)'
                            : 'transparent',
                          border: `1px solid ${P.error}40`,
                          color: P.error,
                          cursor: 'pointer',
                        }}
                      >
                        {app.breachFlag ? '⚑ Remove Flag' : '⚐ Flag'}
                      </button>
                      <button
                        onClick={() => handleFictionalToggle(app)}
                        className="rounded-sm px-3 py-1.5 text-[10px]"
                        style={{
                          background: app.fictional
                            ? 'rgba(26,79,214,0.1)'
                            : 'transparent',
                          border: `1px solid ${P.blue}40`,
                          color: P.blue,
                          cursor: 'pointer',
                        }}
                      >
                        {app.fictional ? '◉ Public' : '◎ Hidden'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Note ── */}
      <div
        className="mt-8 rounded-sm px-4 py-3"
        style={{
          background: P.elevation50,
          border: `1px solid ${P.border}`,
        }}
      >
        <p className="text-[10px]" style={{ color: P.textFaint }}>
          This dashboard shows fictional in-universe applications only.
          Real submissions are delivered via email and stored in Convex
          but hidden from this view by default. Applications can be
          promoted to public visibility or hidden using the ◉/◎ toggle.
          Status changes and breach flags are recorded. The review
          process involves Dr.&nbsp;Voss. Her feedback mode is not documented
          here.
        </p>
      </div>
    </PayloadShell>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="text-[10px]"
        style={{ color: P.textFaint }}
      >
        {label}
      </p>
      <p className="text-xs" style={{ color: P.text }}>
        {value}
      </p>
    </div>
  )
}
