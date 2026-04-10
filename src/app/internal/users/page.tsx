'use client'

import PayloadShell, { fireToast } from '@/components/payload/PayloadShell'

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

const USERS = [
  {
    initials: 'EV',
    name: 'Dr. Eleanor Voss',
    email: 'evoss@riseco.online',
    role: 'Super Admin',
    lastLogin: 'Today, 6:47am',
    status: 'active',
    note: null,
  },
  {
    initials: 'JP',
    name: 'James Park',
    email: 'jpark@riseco.online',
    role: 'Admin',
    lastLogin: 'Yesterday, 9:12am',
    status: 'active',
    note: null,
  },
  {
    initials: 'AR',
    name: 'Arvin Reyes',
    email: 'areyes@riseco.online',
    role: 'Developer',
    lastLogin: 'Aug 12, 2024, 9:43am',
    status: 'active',
    note: 'Account not deactivated. Session token active. No expiry. The function that would check it was never written.',
  },
]

export default function UsersPage() {
  return (
    <PayloadShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Users' },
      ]}
      title="Users"
    >
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-xs"
          style={{ minWidth: '600px' }}
        >
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${P.border}`,
                background: P.elevation50,
              }}
            >
              {['', 'Name', 'Role', 'Last Login', 'Status', ''].map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-medium"
                  style={{ color: P.textMuted }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {USERS.map((u, i) => (
              <tr
                key={i}
                className="payload-row"
                style={{ borderBottom: `1px solid ${P.border}` }}
              >
                <td className="px-4 py-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium"
                    style={{
                      background:
                        u.status === 'active' ? P.blue : P.elevation200,
                      color: 'white',
                    }}
                  >
                    {u.initials}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium" style={{ color: P.text }}>
                    {u.name}
                  </p>
                  <p className="text-[10px]" style={{ color: P.textFaint }}>
                    {u.email}
                  </p>
                  {u.note && (
                    <p
                      className="mt-1 text-[10px]"
                      style={{
                        color: P.warning,
                        fontStyle: 'italic',
                        maxWidth: '300px',
                        lineHeight: 1.6,
                      }}
                    >
                      ⚠ {u.note}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-sm px-2 py-1 text-[10px]"
                    style={{
                      background:
                        u.role === 'Super Admin'
                          ? 'rgba(76,124,255,0.12)'
                          : 'rgba(255,255,255,0.06)',
                      color: u.role === 'Super Admin' ? P.blue : P.textMuted,
                      border: `1px solid ${u.role === 'Super Admin' ? 'rgba(76,124,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: P.textMuted }}>
                  {u.lastLogin}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          u.status === 'active' ? P.success : P.textFaint,
                      }}
                    />
                    <span
                      style={{
                        color: u.status === 'active' ? P.success : P.textFaint,
                      }}
                    >
                      {u.name === 'Arvin Reyes'
                        ? 'Active (should be Inactive)'
                        : 'Active'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      fireToast(
                        'User management not implemented. — areyes',
                        'error',
                      )
                    }
                    className="rounded-sm px-3 py-1.5 text-[10px]"
                    style={{
                      background: P.elevation200,
                      color: P.textMuted,
                      border: `1px solid ${P.border}`,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="px-6 py-4"
        style={{
          borderTop: `1px solid ${P.border}`,
          background: P.elevation50,
        }}
      >
        <p className="text-[10px]" style={{ color: P.textFaint }}>
          3 users ·{' '}
          <span style={{ color: P.warning }}>
            1 user account should have been deactivated (Aug 12, 2024)
          </span>
          {' · '}
          <span style={{ color: P.textFaint, fontStyle: 'italic' }}>
            {/* TODO: add deactivation flow — areyes (never finished) */}
          </span>
        </p>
      </div>
    </PayloadShell>
  )
}
