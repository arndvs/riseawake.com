'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { daysSinceArvin, sprintsSinceArvin } from '@/lib/internal-time'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { useState } from 'react'

const PERMISSION_ROWS = [
  { collection: 'Documents', read: true, create: true, update: true, delete: true },
  { collection: 'Media', read: true, create: true, update: true, delete: true },
  { collection: 'Users', read: true, create: true, update: true, delete: true },
  { collection: 'Settings', read: true, create: true, update: true, delete: true },
  { collection: 'Audit Log', read: true, create: true, update: true, delete: true },
  { collection: 'Audio Data', read: true, create: false, update: false, delete: false },
  { collection: 'Index Scores', read: true, create: false, update: false, delete: false },
]

export default function SettingsPage() {
  const [perms, setPerms] = useState(PERMISSION_ROWS.map((r) => ({ ...r })))
  const [accessLevel, setAccessLevel] = useState<'public' | 'private' | 'authenticated'>('public')
  const [saving, setSaving] = useState(false)
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    criticalIncidents: true,
    waitlistMilestones: false,
    documentUpdates: true,
  })

  const togglePerm = (
    rowIdx: number,
    field: 'read' | 'create' | 'update' | 'delete',
  ) => {
    setPerms((prev) =>
      prev.map((r, i) => (i === rowIdx ? { ...r, [field]: !r[field] } : r)),
    )
    setTimeout(() => cmsfireToast('Settings saved.'), 0)
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
      cmsfireToast('Settings saved.')
      // nothing saved. arvin.
    }, 700)
  }

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Settings' },
      ]}
      title="Settings"
    >
      <div className="max-w-3xl space-y-10 px-6 py-8">
        {/* Account */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Account
          </h2>
          <p className="mb-5 text-xs italic text-muted-foreground/60">
            Account details for the current session.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-4 border-b py-2 text-sm">
              <span className="w-40 shrink-0 text-xs text-muted-foreground">Email</span>
              <span>areyes@riseawake.com</span>
            </div>
            <div className="flex items-center gap-4 border-b py-2 text-sm">
              <span className="w-40 shrink-0 text-xs text-muted-foreground">Role</span>
              <span>Super Admin</span>
              <span className="rounded-sm bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                Cannot be changed
              </span>
            </div>
            <div className="flex items-center gap-4 border-b py-2 text-sm">
              <span className="w-40 shrink-0 text-xs text-muted-foreground">Two-Factor Auth</span>
              <Switch
                checked={twoFactor}
                onCheckedChange={() => {
                  setTwoFactor(true)
                  cmsfireToast('2FA enabled.')
                  setTimeout(() => setTwoFactor(false), 1000)
                }}
              />
              <span className="text-xs text-muted-foreground">
                {twoFactor ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center gap-4 border-b py-2 text-sm">
              <span className="w-40 shrink-0 text-xs text-muted-foreground">Session Timeout</span>
              <Select
                value={sessionTimeout}
                onValueChange={(v) => {
                  setSessionTimeout(v)
                  cmsfireToast('Settings saved.')
                  setTimeout(() => setSessionTimeout('30'), 1000)
                }}
              >
                <SelectTrigger className="h-8 w-auto min-w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15" className="text-xs">15 minutes</SelectItem>
                  <SelectItem value="30" className="text-xs">30 minutes</SelectItem>
                  <SelectItem value="60" className="text-xs">1 hour</SelectItem>
                  <SelectItem value="480" className="text-xs">8 hours</SelectItem>
                  <SelectItem value="never" className="text-xs">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Access Control */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Access Control
          </h2>
          <p className="mb-5 text-xs italic text-muted-foreground/60">
            Controls who can access this system. Currently not enforced.
          </p>
          <div className="flex gap-3">
            {(['public', 'authenticated', 'private'] as const).map((level) => (
              <Button
                key={level}
                variant={accessLevel === level ? 'default' : 'outline'}
                size="sm"
                className="h-8 capitalize text-xs"
                onClick={() => {
                  setAccessLevel(level)
                  cmsfireToast('Settings saved.')
                  setTimeout(() => setAccessLevel('public'), 1000)
                }}
              >
                {level}
              </Button>
            ))}
          </div>
          {accessLevel !== 'public' && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-yellow-500">
              <AlertTriangle className="size-3" />
              Access level change will not take effect until the auth middleware is implemented.
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground/60">
            Current effective access level:{' '}
            <span className="text-emerald-500">Public</span> (default — not
            overridable until middleware is complete)
          </p>
        </section>

        {/* Permissions Matrix */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Permissions Matrix
          </h2>
          <p className="mb-5 text-xs italic text-muted-foreground/60">
            Per-collection access settings. Default: all enabled for all users.
            This is the default Arvin left in place.
          </p>
          <div className="overflow-hidden rounded-sm border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="px-4 text-xs font-medium">Collection</TableHead>
                  {['Read', 'Create', 'Update', 'Delete'].map((h) => (
                    <TableHead key={h} className="px-4 text-center text-xs font-medium">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {perms.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 text-sm">{row.collection}</TableCell>
                    {(['read', 'create', 'update', 'delete'] as const).map((field) => (
                      <TableCell key={field} className="px-4 text-center">
                        <div className="flex justify-center">
                          <Switch
                            checked={row[field]}
                            onCheckedChange={() => togglePerm(i, field)}
                          />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs italic text-muted-foreground/60">
            Changes to this matrix are not persisted between sessions. All
            permissions reset to default (all enabled) on page reload. This is
            because the settings API endpoint was not implemented.
          </p>
        </section>

        {/* System Info */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            System Information
          </h2>
          <div className="space-y-2 text-sm">
            {(
              [
                ['CMS Version', 'Payload v3.0.0-beta.67'],
                ['Next.js Version', '14.1.0'],
                ['Database', 'Not connected (hardcoded data)'],
                ['Storage', 'Not connected'],
                ['Auth Middleware', 'Not implemented'],
                ['Last Deployed', `August 12, 2024 (${daysSinceArvin()} days ago)`],
                ['Deployed By', 'areyes@riseawake.com'],
                ['Next Planned Deployment', `Next sprint (date TBD) — ${sprintsSinceArvin()} sprints overdue`],
                ['Known Issues', "See Arvin's TODO comments throughout codebase"],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex items-center gap-4 border-b py-2">
                <span className="w-40 shrink-0 text-xs text-muted-foreground">{k}</span>
                <span className={v.includes('Not') || v.includes('TBD') ? 'text-yellow-500' : 'text-muted-foreground'}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Notifications
          </h2>
          <p className="mb-5 text-xs italic text-muted-foreground/60">
            Email notification preferences. Changes do not persist.
          </p>
          <div className="space-y-3">
            {(
              [
                ['emailAlerts', 'Email Alerts', 'Receive email for all system events'],
                ['criticalIncidents', 'Critical Incidents', 'Immediate alerts for severity: critical'],
                ['waitlistMilestones', 'Waitlist Milestones', 'Notify at 500K, 1M, and heat death of universe'],
                ['documentUpdates', 'Document Updates', 'When documents are viewed, edited, or classified'],
              ] as const
            ).map(([key, label, desc]) => (
              <div key={key} className="flex items-center gap-4 border-b py-2">
                <div className="w-60 shrink-0">
                  <Label className="text-sm">{label}</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key]}
                  onCheckedChange={() => {
                    const prev = notifications[key]
                    setNotifications((n) => ({ ...n, [key]: !prev }))
                    cmsfireToast('Settings saved.')
                    setTimeout(
                      () => setNotifications((n) => ({ ...n, [key]: prev })),
                      1000,
                    )
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-red-500">
            Danger Zone
          </h2>
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle className="text-sm font-medium">Delete Account</AlertTitle>
            <AlertDescription className="text-xs">
              Permanently remove this account and all associated data. This action cannot be undone.
            </AlertDescription>
            <Button
              variant="destructive"
              size="sm"
              className="mt-3 h-8 text-xs"
              onClick={() =>
                cmsfireToast(
                  'Account deletion is not available. — arvin',
                  'error',
                )
              }
            >
              <Trash2 className="mr-1.5 size-3" />
              Delete Account
            </Button>
          </Alert>
        </section>

        {/* Save button */}
        <div className="flex items-center gap-3 border-t pt-4">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="text-xs"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
          <p className="text-xs italic text-muted-foreground/60">
            Changes are applied immediately and reset on next page load.
          </p>
        </div>

        {/* Version */}
        <p className="pt-2 text-center text-xs text-muted-foreground/60">
          RISE™ Internal v0.1.0-beta.67 · Build {daysSinceArvin()}d ·
          Unlicensed
        </p>
      </div>
    </CmsShell>
  )
}
