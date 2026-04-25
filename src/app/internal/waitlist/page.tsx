'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { CmsStatCard } from '@/components/cms/cms-stat-card'
import { CmsStatusBadge, type CmsStatusVariant } from '@/components/cms/cms-status-badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertTriangle, Download, MoreHorizontal, Plus, Search } from 'lucide-react'
import { useState } from 'react'

const WAITLIST = [
  { id: 1, name: 'Marcus Chen', email: 'marcus.chen@email.com', position: 1, date: '2023-03-15', source: 'Launch Day' as const, status: 'converted' as const },
  { id: 2, name: 'Sarah Miller', email: 'sarah.miller@email.com', position: 2, date: '2023-03-15', source: 'Launch Day' as const, status: 'converted' as const },
  { id: 3, name: 'James Wilson', email: 'james.wilson@email.com', position: 47, date: '2023-03-16', source: 'Press' as const, status: 'contacted' as const },
  { id: 4, name: 'Priya Ramaswamy', email: 'priya.r@proton.me', position: 312, date: '2023-03-22', source: 'Referral' as const, status: 'contacted' as const },
  { id: 5, name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', position: 1_203, date: '2023-04-01', source: 'Referral' as const, status: 'waiting' as const },
  { id: 6, name: 'David Kim', email: 'david.kim@email.com', position: 5_847, date: '2023-05-12', source: 'Social' as const, status: 'waiting' as const },
  { id: 7, name: 'Lisa Thompson', email: 'lisa.thompson@email.com', position: 12_093, date: '2023-07-23', source: 'Organic' as const, status: 'waiting' as const },
  { id: 8, name: 'Michael Brown', email: 'michael.brown@email.com', position: 89_472, date: '2023-11-05', source: 'Social' as const, status: 'waiting' as const },
  { id: 9, name: 'Jennifer Lee', email: 'jennifer.lee@email.com', position: 234_891, date: '2024-01-02', source: 'Organic' as const, status: 'new' as const },
  { id: 10, name: 'Robert Garcia', email: 'robert.garcia@email.com', position: 340_001, date: '2024-01-15', source: 'Social' as const, status: 'new' as const },
  { id: 11, name: 'Amanda White', email: 'amanda.white@email.com', position: 340_847, date: '2024-01-15', source: 'Organic' as const, status: 'new' as const },
]

const SOURCES = ['All', 'Launch Day', 'Press', 'Referral', 'Social', 'Organic'] as const
const STATUSES = ['All', 'new', 'waiting', 'contacted', 'converted'] as const

const STATUS_VARIANT: Record<string, CmsStatusVariant> = {
  contacted: 'info',
  converted: 'success',
  new: 'warning',
  waiting: 'muted',
}

export default function WaitlistPage() {
  const [search, setSearch] = useState('')
  const [source, setSource] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')

  const filtered = WAITLIST.filter((e) => {
    const matchesSource = source === 'All' || e.source === source
    const matchesStatus = status === 'All' || e.status === status
    const matchesSearch =
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.name.toLowerCase().includes(search.toLowerCase())
    return matchesSource && matchesStatus && matchesSearch
  })

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Waitlist' },
      ]}
      title="Waitlist"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <p className="text-xs text-muted-foreground">
          340,847 total signups · 12 converted · Est. 47 year wait time
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => {
              cmsfireToast('Export started...', 'info')
              setTimeout(() => {
                cmsfireToast(
                  'Export complete. File: waitlist_340847_entries.csv (0 bytes). — arvin',
                  'success',
                )
              }, 1500)
            }}
          >
            <Download className="mr-1.5 size-3" />
            Export CSV
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs"
            onClick={() =>
              cmsfireToast(
                'Waitlist registration is handled automatically. — arvin',
                'info',
              )
            }
          >
            <Plus className="mr-1.5 size-3" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-4 border-b px-6 py-4">
        {[
          { label: 'Total Signups', value: '340,847' },
          { label: 'Today', value: '+2,341' },
          { label: 'This Week', value: '+14,892' },
          { label: 'Avg. Daily', value: '934' },
        ].map((s) => (
          <CmsStatCard key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-4 border-b bg-card px-6 py-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-9 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Source:</span>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="h-8 w-auto min-w-28 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOURCES.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Status:</span>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-8 w-auto min-w-28 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Table ── */}
      <Table>
        <TableHeader>
          <TableRow className="border-border bg-card hover:bg-card">
            {['Position', 'Contact', 'Source', 'Status', 'Signup Date', ''].map((h) => (
              <TableHead
                key={h || 'actions'}
                className="px-6 text-xs font-medium uppercase tracking-wider"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="px-6">
                <span className={`font-mono text-xs font-medium ${entry.position <= 100 ? 'text-emerald-500' : ''}`}>
                  #{entry.position.toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="px-6">
                <p className="text-xs font-medium">{entry.name}</p>
                <p className="text-xs text-muted-foreground">{entry.email}</p>
              </TableCell>
              <TableCell className="px-6 text-xs text-muted-foreground">
                {entry.source}
              </TableCell>
              <TableCell className="px-6">
                <CmsStatusBadge variant={STATUS_VARIANT[entry.status] ?? 'muted'}>
                  {entry.status}
                </CmsStatusBadge>
              </TableCell>
              <TableCell className="px-6 text-xs text-muted-foreground">
                {entry.date}
              </TableCell>
              <TableCell className="px-6 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-7 p-0"
                  onClick={() =>
                    cmsfireToast(
                      `Actions for ${entry.name} are not available. — arvin`,
                      'info',
                    )
                  }
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ── Warning footer ── */}
      <div className="px-6 py-4">
        <Alert variant="destructive" className="border-yellow-500/20 bg-yellow-500/5 text-yellow-400 [&>svg]:text-yellow-500">
          <AlertTriangle className="size-4" />
          <AlertTitle className="text-xs font-medium">Current Production Capacity Notice</AlertTitle>
          <AlertDescription className="text-xs text-yellow-500/80">
            At current production rates (12 units/year), estimated wait time
            for position #340,847 is approximately 28,404 years. Consider
            contacting Marketing about managing customer expectations.
          </AlertDescription>
        </Alert>
      </div>
    </CmsShell>
  )
}
