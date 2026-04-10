'use client'

import PayloadShell, { fireToast } from '@/components/payload/PayloadShell'
import { useState } from 'react'

const P = {
  text: '#e8e8e8',
  textMuted: '#8a8a8a',
  textFaint: '#555555',
  border: 'rgba(255,255,255,0.08)',
  elevation50: '#111111',
  elevation200: '#1f1f1f',
  blue: '#4c7cff',
  success: '#22c55e',
  warning: '#eab308',
}

const PERMISSION_ROWS = [
  {
    collection: 'Documents',
    read: true,
    create: true,
    update: true,
    delete: true,
  },
  {
    collection: 'Media',
    read: true,
    create: true,
    update: true,
    delete: true,
  },
  {
    collection: 'Users',
    read: true,
    create: true,
    update: true,
    delete: true,
  },
  {
    collection: 'Settings',
    read: true,
    create: true,
    update: true,
    delete: true,
  },
  {
    collection: 'Audit Log',
    read: true,
    create: true,
    update: true,
    delete: true,
  },
  {
    collection: 'Audio Data',
    read: true,
    create: false,
    update: false,
    delete: false,
  },
  {
    collection: 'Index Scores',
    read: true,
    create: false,
    update: false,
    delete: false,
  },
]

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200"
      style={{
        background: value ? P.success : P.elevation200,
        border: `1px solid ${value ? P.success : P.border}`,
        cursor: 'pointer',
      }}
    >
      <div
        className="absolute top-0.5 h-4 w-4 rounded-full transition-transform duration-200"
        style={{
          background: 'white',
          transform: `translateX(${value ? '18px' : '2px'})`,
        }}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [perms, setPerms] = useState(PERMISSION_ROWS.map((r) => ({ ...r })))
  const [accessLevel, setAccessLevel] = useState<
    'public' | 'private' | 'authenticated'
  >('public')
  const [saving, setSaving] = useState(false)

  const togglePerm = (
    rowIdx: number,
    field: 'read' | 'create' | 'update' | 'delete',
  ) => {
    setPerms((prev) =>
      prev.map((r, i) => (i === rowIdx ? { ...r, [field]: !r[field] } : r)),
    )
    setTimeout(() => fireToast('Settings saved.'), 0)
    // Toggle bounces back after 1s
    setTimeout(() => {
      setPerms((prev) =>
        prev.map((r, i) =>
          i === rowIdx ? { ...r, [field]: PERMISSION_ROWS[i]![field] } : r,
        ),
      )
    }, 1000)
  }

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      fireToast('Settings saved.')
      // nothing saved. arvin.
    }, 700)
  }

  return (
    <PayloadShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Settings' },
      ]}
      title="Settings"
    >
      <div className="max-w-3xl space-y-10 px-6 py-8">
        {/* Access Control */}
        <section>
          <h2
            className="mb-1 text-xs font-semibold tracking-widest uppercase"
            style={{ color: P.textMuted, letterSpacing: '0.14em' }}
          >
            Access Control
          </h2>
          <p
            className="mb-5 text-[10px]"
            style={{ color: P.textFaint, fontStyle: 'italic' }}
          >
            {/* TODO: wire this to middleware — areyes */}
            Controls who can access this system. Currently not enforced.
          </p>
          <div className="flex gap-3">
            {(['public', 'authenticated', 'private'] as const).map((level) => (
              <button
                key={level}
                onClick={() => {
                  setAccessLevel(level)
                  fireToast('Settings saved.')
                  setTimeout(() => setAccessLevel('public'), 1000)
                }}
                className="rounded-sm px-4 py-2 text-xs capitalize transition-colors duration-150"
                style={{
                  background: accessLevel === level ? P.blue : P.elevation200,
                  color: accessLevel === level ? 'white' : P.textMuted,
                  border: `1px solid ${accessLevel === level ? P.blue : P.border}`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {level}
              </button>
            ))}
          </div>
          {accessLevel !== 'public' && (
            <p className="mt-3 text-[10px]" style={{ color: P.warning }}>
              ⚠ Access level change will not take effect until the auth
              middleware is implemented.
            </p>
          )}
          <p className="mt-3 text-[10px]" style={{ color: P.textFaint }}>
            Current effective access level:{' '}
            <span style={{ color: P.success }}>Public</span> (default — not
            overridable until middleware is complete)
          </p>
        </section>

        {/* Permissions Matrix */}
        <section>
          <h2
            className="mb-1 text-xs font-semibold tracking-widest uppercase"
            style={{ color: P.textMuted, letterSpacing: '0.14em' }}
          >
            Permissions Matrix
          </h2>
          <p
            className="mb-5 text-[10px]"
            style={{ color: P.textFaint, fontStyle: 'italic' }}
          >
            Per-collection access settings. Default: all enabled for all users.
            This is the default Arvin left in place.
          </p>
          <div
            className="overflow-hidden rounded-sm"
            style={{ border: `1px solid ${P.border}` }}
          >
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr style={{ background: P.elevation200 }}>
                  <th
                    className="px-4 py-2.5 text-left font-medium"
                    style={{ color: P.textMuted }}
                  >
                    Collection
                  </th>
                  {['Read', 'Create', 'Update', 'Delete'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-center font-medium"
                      style={{ color: P.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {perms.map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${P.border}` }}>
                    <td className="px-4 py-3" style={{ color: P.text }}>
                      {row.collection}
                    </td>
                    {(['read', 'create', 'update', 'delete'] as const).map(
                      (field) => (
                        <td key={field} className="px-4 py-3 text-center">
                          <div className="flex justify-center">
                            <Toggle
                              value={row[field]}
                              onChange={() => togglePerm(i, field)}
                            />
                          </div>
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            className="mt-3 text-[10px]"
            style={{ color: P.textFaint, fontStyle: 'italic' }}
          >
            Changes to this matrix are not persisted between sessions. All
            permissions reset to default (all enabled) on page reload. This is
            because the settings API endpoint was not implemented.
            {/* TODO: POST /api/settings — areyes */}
          </p>
        </section>

        {/* System Info */}
        <section>
          <h2
            className="mb-4 text-xs font-semibold tracking-widest uppercase"
            style={{ color: P.textMuted, letterSpacing: '0.14em' }}
          >
            System Information
          </h2>
          <div className="space-y-2 text-xs">
            {(
              [
                ['CMS Version', 'Payload v3.0.0-beta.67'],
                ['Next.js Version', '14.1.0'],
                ['Database', 'Not connected (hardcoded data)'],
                ['Storage', 'Not connected'],
                ['Auth Middleware', 'Not implemented'],
                ['Last Deployed', 'August 12, 2024'],
                ['Deployed By', 'areyes@riseco.online'],
                ['Next Planned Deployment', 'Next sprint (date TBD)'],
                [
                  'Known Issues',
                  "See Arvin's TODO comments throughout codebase",
                ],
              ] as const
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center gap-4 py-2"
                style={{
                  borderBottom: `1px solid ${P.border}`,
                }}
              >
                <span className="w-40 shrink-0" style={{ color: P.textMuted }}>
                  {k}
                </span>
                <span
                  style={{
                    color:
                      v.includes('Not') || v.includes('TBD')
                        ? P.warning
                        : P.textFaint,
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Save button */}
        <div
          className="flex items-center gap-3 pt-4"
          style={{ borderTop: `1px solid ${P.border}` }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-sm px-6 py-2.5 text-xs font-medium"
            style={{
              background: P.blue,
              color: 'white',
              border: 'none',
              cursor: saving ? 'wait' : 'pointer',
              opacity: saving ? 0.7 : 1,
              fontFamily: 'inherit',
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          <p
            className="text-[10px]"
            style={{ color: P.textFaint, fontStyle: 'italic' }}
          >
            {/* settings are not saved — arvin */}
            Changes are applied immediately and reset on next page load.
          </p>
        </div>
      </div>
    </PayloadShell>
  )
}
