'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// ─── Payload-accurate CSS tokens ─────────────────────────────────────────────
// Arvin copied these from the Payload source. They are correct.
export const P = {
  bg: '#0b0b0b',
  elevation50: '#111111',
  elevation100: '#161616',
  elevation150: '#1a1a1a',
  elevation200: '#1f1f1f',
  elevation800: '#e8e8e8',
  elevation900: '#f0f0f0',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#eab308',
  blue: '#4c7cff',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  text: '#e8e8e8',
  textMuted: '#8a8a8a',
  textFaint: '#555555',
  sidebarW: '220px',
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info'
interface Toast {
  id: number
  message: string
  type: ToastType
}

let _addToast: ((msg: string, type?: ToastType) => void) | null = null
export function fireToast(msg: string, type: ToastType = 'success') {
  _addToast?.(msg, type)
}

function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])
  _addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }
  const colors: Record<ToastType, string> = {
    success: P.success,
    error: P.error,
    info: P.blue,
  }
  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 rounded-sm px-4 py-3"
          style={{
            background: P.elevation150,
            border: `1px solid ${P.border}`,
            minWidth: '280px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            animation: 'payloadToastIn 0.2s ease',
          }}
        >
          <div
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: colors[t.type] }}
          />
          <span className="text-xs" style={{ color: P.text }}>
            {t.message}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onClose }: { onClose: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Arvin's auth check — setTimeout resolves to true after 0ms
    setTimeout(() => {
      setLoading(false)
      onClose()
      fireToast('Session started. Welcome back.')
      // user is still looking at all the documents
    }, 800)
  }

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-sm rounded-sm p-8"
        style={{
          background: P.elevation100,
          border: `1px solid ${P.border}`,
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
        }}
      >
        <div className="mb-8 flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-sm"
            style={{ background: P.blue }}
          >
            <span className="text-[10px] font-bold text-white">P</span>
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: P.text }}>
              RISE™ Internal Docs
            </p>
            <p className="text-[10px]" style={{ color: P.textFaint }}>
              Powered by Payload CMS
            </p>
          </div>
        </div>

        <p className="mb-6 text-sm font-medium" style={{ color: P.text }}>
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="mb-1.5 block text-[11px]"
              style={{ color: P.textMuted }}
            >
              Email
            </label>
            <input
              type="email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="name@riseco.online"
              required
              className="w-full rounded-sm px-3 py-2.5 text-xs"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.borderStrong}`,
                color: P.text,
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-[11px]"
              style={{ color: P.textMuted }}
            >
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-sm px-3 py-2.5 text-xs"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.borderStrong}`,
                color: P.text,
                outline: 'none',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-sm py-2.5 text-xs font-medium"
            style={{
              background: P.blue,
              color: 'white',
              cursor: loading ? 'wait' : 'pointer',
              border: 'none',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-[11px]"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: P.textFaint,
          }}
        >
          Cancel
        </button>

        {/* Arvin left this in the DOM. It is not connected to anything. */}
        <p
          className="mt-6 text-center text-[10px]"
          style={{ color: P.textFaint, opacity: 0.5 }}
        >
          {/* TODO: connect to /api/auth — areyes */}
        </p>
      </div>
    </div>
  )
}

// ─── Create Modal ─────────────────────────────────────────────────────────────
function CreateModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onClose()
      fireToast('Document created successfully.')
      // document is not created. list is unchanged. arvin.
    }, 600)
  }

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-sm p-0"
        style={{
          background: P.elevation100,
          border: `1px solid ${P.border}`,
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${P.border}` }}
        >
          <p className="text-sm font-medium" style={{ color: P.text }}>
            Create New Document
          </p>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: P.textMuted,
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div>
            <label
              className="mb-1.5 block text-[11px]"
              style={{ color: P.textMuted }}
            >
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              required
              className="w-full rounded-sm px-3 py-2.5 text-xs"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.borderStrong}`,
                color: P.text,
                outline: 'none',
              }}
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-[11px]"
              style={{ color: P.textMuted }}
            >
              Classification
            </label>
            <select
              className="w-full rounded-sm px-3 py-2.5 text-xs"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.borderStrong}`,
                color: P.text,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option>INTERNAL</option>
              <option>CONFIDENTIAL</option>
              <option>RESTRICTED</option>
              <option>DR. VOSS EYES ONLY</option>
            </select>
          </div>
          <div>
            <label
              className="mb-1.5 block text-[11px]"
              style={{ color: P.textMuted }}
            >
              Content
            </label>
            <textarea
              rows={5}
              placeholder="Begin typing..."
              className="w-full resize-none rounded-sm px-3 py-2.5 text-xs"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.borderStrong}`,
                color: P.text,
                outline: 'none',
              }}
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-sm px-5 py-2 text-xs font-medium"
              style={{
                background: P.blue,
                color: 'white',
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Saving...' : 'Save Document'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm px-5 py-2 text-xs"
              style={{
                background: 'transparent',
                color: P.textMuted,
                border: `1px solid ${P.border}`,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <span
              className="ml-auto text-[10px]"
              style={{ color: P.textFaint, fontStyle: 'italic' }}
            >
              {/* isPublic: true (default) */}
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────
function NavItem({
  href,
  label,
  icon,
  count,
  active,
}: {
  href: string
  label: string
  icon: string
  count?: number
  active: boolean
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        className="mx-2 flex items-center gap-2.5 rounded-sm px-3 py-2 transition-colors duration-150"
        style={{
          background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
          borderLeft: active ? `2px solid ${P.blue}` : '2px solid transparent',
        }}
      >
        <span
          style={{
            color: active ? P.text : P.textMuted,
            fontSize: '14px',
            width: '16px',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        <span
          className="flex-1 text-xs"
          style={{ color: active ? P.text : P.textMuted }}
        >
          {label}
        </span>
        {count !== undefined && (
          <span
            className="rounded-full px-1.5 py-0.5 text-[10px]"
            style={{ background: P.elevation200, color: P.textFaint }}
          >
            {count}
          </span>
        )}
      </div>
    </Link>
  )
}

// ─── Main Shell ───────────────────────────────────────────────────────────────
export default function PayloadShell({
  children,
  breadcrumb,
  title,
  showCreate = false,
}: {
  children: React.ReactNode
  breadcrumb?: { label: string; href?: string }[]
  title?: string
  showCreate?: boolean
}) {
  const pathname = usePathname()
  const [loginOpen, setLoginOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [, setSessionChecked] = useState(false)

  // Arvin's auth check — this is the entire access control system
  useEffect(() => {
    // TODO: finish auth middleware (blocked on Payload docs) — areyes
    setTimeout(() => setSessionChecked(true), 0)
  }, [])

  const NAV = [
    { href: '/internal', label: 'Dashboard', icon: '⊞' },
    { href: '/internal', label: 'Documents', icon: '☰', count: 9 },
    { href: '/internal/media', label: 'Media', icon: '⊡', count: 0 },
    { href: '/internal/users', label: 'Users', icon: '◎', count: 3 },
    { href: '/internal/settings', label: 'Settings', icon: '⚙' },
  ]

  return (
    <>
      {/* ── Inject Payload-style keyframes ── */}
      <style>{`
        .payload-shell * { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; box-sizing: border-box; }
        .payload-shell a { color: inherit; }
        @keyframes payloadToastIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .payload-row:hover { background: rgba(255,255,255,0.03) !important; }
      `}</style>

      <div
        className="payload-shell flex min-h-screen flex-col"
        style={{ background: P.bg, color: P.text }}
      >
        {/* ── Unauthorized access banner ── */}
        <div
          className="flex items-center gap-3 px-5 py-2.5"
          style={{
            background: 'rgba(234,179,8,0.06)',
            borderBottom: '1px solid rgba(234,179,8,0.15)',
            borderLeft: `3px solid ${P.warning}`,
          }}
        >
          <span style={{ color: P.warning, fontSize: '12px' }}>⚠</span>
          <p
            className="flex-1 text-[11px]"
            style={{ color: 'rgba(234,179,8,0.8)' }}
          >
            <strong style={{ color: P.warning }}>
              RISE™ INTERNAL DOCUMENT SYSTEM
            </strong>{' '}
            · Authorized personnel only · Your session is being recorded
          </p>
          <button
            onClick={() => setLoginOpen(true)}
            className="shrink-0 rounded-sm px-3 py-1 text-[10px] transition-colors duration-150"
            style={{
              background: 'rgba(234,179,8,0.12)',
              border: '1px solid rgba(234,179,8,0.25)',
              color: P.warning,
              cursor: 'pointer',
            }}
          >
            LOGIN REQUIRED ▸
          </button>
        </div>

        {/* ── Top bar ── */}
        <div
          className="flex h-12 shrink-0 items-center px-4"
          style={{
            background: P.elevation50,
            borderBottom: `1px solid ${P.border}`,
          }}
        >
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="mr-1 flex h-7 w-7 items-center justify-center rounded-sm transition-colors duration-150"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: P.textMuted,
              }}
            >
              ☰
            </button>
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm"
              style={{ background: P.blue }}
            >
              <span className="text-[9px] font-bold text-white">P</span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[11px] font-semibold"
                style={{ color: P.text }}
              >
                RISE™ Internal
              </span>
              <span className="text-[9px]" style={{ color: P.textFaint }}>
                Document Management
              </span>
            </div>
          </div>

          <div className="flex-1" />

          {breadcrumb && (
            <div
              className="hidden items-center gap-1.5 text-[11px] md:flex"
              style={{ color: P.textMuted }}
            >
              {breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span style={{ color: P.textFaint }}>/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors duration-150 hover:text-white"
                      style={{
                        color:
                          i === breadcrumb.length - 1 ? P.text : P.textMuted,
                      }}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      style={{
                        color:
                          i === breadcrumb.length - 1 ? P.text : P.textMuted,
                      }}
                    >
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}

          <div className="flex-1" />

          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setLoginOpen(true)}
          >
            <div className="hidden text-right sm:block">
              <p className="text-[11px]" style={{ color: P.text }}>
                Dr. E. Voss
              </p>
              <p className="text-[9px]" style={{ color: P.textFaint }}>
                Super Admin
              </p>
            </div>
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium"
              style={{ background: P.blue, color: 'white' }}
            >
              EV
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Sidebar ── */}
          {sidebarOpen && (
            <nav
              className="flex shrink-0 flex-col overflow-y-auto py-4"
              style={{
                width: P.sidebarW,
                background: P.elevation50,
                borderRight: `1px solid ${P.border}`,
                minHeight: 'calc(100vh - 88px)',
              }}
            >
              <p
                className="mb-2 px-5 text-[9px] tracking-widest uppercase"
                style={{ color: P.textFaint, letterSpacing: '0.15em' }}
              >
                Collections
              </p>
              {NAV.map((item) => (
                <NavItem
                  key={item.href + item.label}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  count={item.count}
                  active={
                    item.label === 'Documents'
                      ? pathname.startsWith('/internal/docs') ||
                        pathname === '/internal'
                      : pathname === item.href
                  }
                />
              ))}
              <div
                className="mt-auto px-2 pt-4"
                style={{
                  borderTop: `1px solid ${P.border}`,
                  marginTop: 'auto',
                }}
              >
                <div className="px-3 py-2">
                  <p className="text-[9px]" style={{ color: P.textFaint }}>
                    Payload v3.0.0-beta.67
                  </p>
                  <p className="text-[9px]" style={{ color: P.textFaint }}>
                    Built by Arvin Reyes
                  </p>
                  <p
                    className="text-[9px]"
                    style={{ color: P.textFaint, opacity: 0.6 }}
                  >
                    Last deployed Aug 12, 2024
                  </p>
                </div>
              </div>
            </nav>
          )}

          {/* ── Main content area ── */}
          <main className="flex-1 overflow-y-auto">
            {title && (
              <div
                className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
                style={{
                  background: P.bg,
                  borderBottom: `1px solid ${P.border}`,
                }}
              >
                <h1 className="text-sm font-semibold" style={{ color: P.text }}>
                  {title}
                </h1>
                {showCreate && (
                  <button
                    onClick={() => setCreateOpen(true)}
                    className="flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-medium"
                    style={{
                      background: P.blue,
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    + Create New
                  </button>
                )}
              </div>
            )}
            {children}
          </main>
        </div>

        {/*
          Last commit: feat: add document list view and auth middleware (WIP)
          Author: areyes@riseco.online
          Date: Mon Aug 12 09:43:22 2024 -0700

          TODO:
          - [ ] finish auth middleware (blocked on Payload docs)
          - [ ] connect to actual DB (currently using hardcoded data)
          - [ ] fix permissions (everything is public rn, will fix b4 launch)
          - [ ] ask James if we need the audit log
          - [ ] update Payload to stable when it releases

          shipping this now, will fix in next sprint
        */}
      </div>

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      {createOpen && <CreateModal onClose={() => setCreateOpen(false)} />}
      <ToastContainer />
    </>
  )
}
