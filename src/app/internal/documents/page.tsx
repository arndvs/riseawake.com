'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { CmsStatusBadge, type CmsStatusVariant } from '@/components/cms/cms-status-badge'
import { useVisitorIp } from '@/components/cms/use-visitor-ip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { InternalDoc } from '@/lib/internal-docs'
import { DOCS } from '@/lib/internal-docs'
import {
  recordVisitorIp,
  useBreachRecord,
  useSessionName,
  visitorDisplayName,
} from '@/lib/internal-tracker'
import { ArrowDown, ArrowUp, ArrowUpDown, Check, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type SortKey = keyof Pick<
  InternalDoc,
  'id' | 'title' | 'classification' | 'status' | 'date'
>

const CLASSIFICATION_VARIANT: Record<string, CmsStatusVariant> = {
  INTERNAL: 'muted',
  CONFIDENTIAL: 'warning',
  RESTRICTED: 'error',
  'DR. VOSS EYES ONLY': 'info',
}

const STATUS_VARIANT: Record<string, CmsStatusVariant> = {
  Active: 'success',
  'Under Review': 'warning',
  Archived: 'muted',
  'Awaiting Legal Review': 'warning',
}

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('id')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [filterClass, setFilterClass] = useState<string>('All')
  const visitorIp = useVisitorIp()
  const [breach, refreshBreach] = useBreachRecord()
  const sessionName = useSessionName()
  const visitorLabel = visitorDisplayName(breach.ip, sessionName)
  const visitedDocIds = new Set(breach.docs.map((d) => d.id))

  useEffect(() => {
    recordVisitorIp(visitorIp)
    refreshBreach()
  }, [visitorIp, refreshBreach])

  const filtered = DOCS.filter(
    (d) =>
      (filterClass === 'All' || d.classification === filterClass) &&
      (d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.author.toLowerCase().includes(search.toLowerCase())),
  ).sort((a, b) => {
    const av = a[sortKey] as string
    const bv = b[sortKey] as string
    if (sortKey === 'date') {
      const diff = new Date(av).getTime() - new Date(bv).getTime()
      return sortDir === 'asc' ? diff : -diff
    }
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    cmsfireToast('Sort applied.', 'info')
  }

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((d) => d.id)))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selected.size === 0) {
      cmsfireToast('No documents selected.', 'error')
      return
    }
    // bulk actions do nothing. arvin.
    cmsfireToast(
      `${action} applied to ${selected.size} document${selected.size > 1 ? 's' : ''}.`,
    )
    setSelected(new Set())
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return <ArrowUpDown className="ml-1 inline size-3 text-muted-foreground/50" />
    return sortDir === 'asc'
      ? <ArrowUp className="ml-1 inline size-3 text-primary" />
      : <ArrowDown className="ml-1 inline size-3 text-primary" />
  }

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Documents' },
      ]}
      title="Documents"
      showCreate
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3 border-b bg-card px-6 py-3">
        <div className="relative max-w-sm min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="h-8 pl-9 text-xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="h-8 w-auto min-w-36 text-xs">
            <SelectValue placeholder="All Classifications" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All" className="text-xs">All Classifications</SelectItem>
            <SelectItem value="INTERNAL" className="text-xs">Internal</SelectItem>
            <SelectItem value="CONFIDENTIAL" className="text-xs">Confidential</SelectItem>
            <SelectItem value="RESTRICTED" className="text-xs">Restricted</SelectItem>
            <SelectItem value="DR. VOSS EYES ONLY" className="text-xs">Dr. Voss Eyes Only</SelectItem>
          </SelectContent>
        </Select>

        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {selected.size} selected
            </span>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleBulkAction('Archive')}>
              Archive
            </Button>
            <Button variant="destructive" size="sm" className="h-7 text-xs" onClick={() => handleBulkAction('Delete')}>
              Delete
            </Button>
          </div>
        )}

        <span className="ml-auto text-xs text-muted-foreground">
          1–{filtered.length} of {DOCS.length}
        </span>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow className="border-border bg-card hover:bg-card">
              <TableHead className="w-10 px-4">
                <Checkbox
                  checked={selected.size === filtered.length && filtered.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              {([
                { key: 'id' as SortKey, label: 'ID', w: 'w-20' },
                { key: 'title' as SortKey, label: 'Title', w: '' },
                { key: 'classification' as SortKey, label: 'Classification', w: 'w-40' },
                { key: 'status' as SortKey, label: 'Status', w: 'w-36' },
                { key: 'date' as SortKey, label: 'Date', w: 'w-32' },
              ] as const).map((col) => (
                <TableHead
                  key={col.key}
                  className={`cursor-pointer select-none px-4 text-xs font-medium ${col.w}`}
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label}
                  <SortIcon k={col.key} />
                </TableHead>
              ))}
              <TableHead className="w-30 px-4 text-xs font-medium">Last Accessed</TableHead>
              <TableHead className="w-15 px-4 text-center text-xs font-medium">Public?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="px-4 py-16 text-center text-muted-foreground">
                  No documents found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((doc) => {
                const isSelected = selected.has(doc.id)
                const externalAccess = doc.lastAccessed.find((a) => a.isExternal)
                const lastHuman = doc.lastAccessed.find((a) => !a.isExternal)

                return (
                  <TableRow
                    key={doc.id}
                    className={isSelected ? 'bg-primary/5' : ''}
                  >
                    <TableCell className="px-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => {
                          const next = new Set(selected)
                          isSelected ? next.delete(doc.id) : next.add(doc.id)
                          setSelected(next)
                        }}
                      />
                    </TableCell>
                    <TableCell className="px-4">
                      <span className="font-mono text-xs text-muted-foreground/60">
                        {doc.id}
                      </span>
                    </TableCell>
                    <TableCell className="px-4">
                      <Link
                        href={`/internal/docs/${doc.slug}`}
                        className="font-medium transition-colors hover:underline"
                      >
                        {doc.title}
                      </Link>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground" style={{ maxWidth: '380px' }}>
                        {doc.author} · {doc.department}
                      </p>
                    </TableCell>
                    <TableCell className="px-4">
                      <CmsStatusBadge variant={CLASSIFICATION_VARIANT[doc.classification] ?? 'muted'}>
                        {doc.classification}
                      </CmsStatusBadge>
                    </TableCell>
                    <TableCell className="px-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`size-1.5 shrink-0 rounded-full ${
                          STATUS_VARIANT[doc.status] === 'success' ? 'bg-emerald-500' :
                          STATUS_VARIANT[doc.status] === 'warning' ? 'bg-yellow-500' :
                          'bg-neutral-500'
                        }`} />
                        <span className="text-xs text-muted-foreground">{doc.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-4 text-xs text-muted-foreground">
                      {doc.date}
                    </TableCell>
                    <TableCell className="px-4">
                      {externalAccess ? (
                        <div>
                          {lastHuman && (
                            <p className="text-xs text-muted-foreground">
                              {lastHuman.name}, {lastHuman.time}
                            </p>
                          )}
                          <p className="font-mono text-xs text-destructive/80">
                            ⚠ {externalAccess.name}, {externalAccess.time}
                          </p>
                          {visitedDocIds.has(doc.id) && breach.ip && (
                            <p className="font-mono text-xs text-destructive/60">
                              ⚠ {visitorLabel}, just now
                            </p>
                          )}
                        </div>
                      ) : visitedDocIds.has(doc.id) && breach.ip ? (
                        <div>
                          {lastHuman && (
                            <p className="text-xs text-muted-foreground">
                              {lastHuman.name}, {lastHuman.time}
                            </p>
                          )}
                          <p className="font-mono text-xs text-destructive/80">
                            ⚠ {visitorLabel}, just now
                          </p>
                        </div>
                      ) : lastHuman ? (
                        <p className="text-xs text-muted-foreground">
                          {lastHuman.name}, {lastHuman.time}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell className="px-4 text-center">
                      <Check className="mx-auto size-4 text-emerald-500" />
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination footer ── */}
      <div className="flex items-center justify-between border-t bg-card px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {DOCS.length} documents
          {search && ` · Filtered by "${search}"`}
        </p>
        <div className="flex items-center gap-1">
          {['‹', '1', '›'].map((v) => (
            <Button
              key={v}
              variant={v === '1' ? 'default' : 'outline'}
              size="sm"
              className="size-7 text-xs"
              onClick={() => cmsfireToast('No additional pages.', 'info')}
            >
              {v}
            </Button>
          ))}
        </div>
      </div>
    </CmsShell>
  )
}
