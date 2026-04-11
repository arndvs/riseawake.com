'use client'

import PayloadShell, {
  fireToast,
  useVisitorIp,
} from '@/components/payload/PayloadShell'
import type { InternalDoc } from '@/lib/internal-docs'
import { CLASSIFICATION_COLORS, DOCS, STATUS_COLORS } from '@/lib/internal-docs'
import {
  recordVisitorIp,
  useBreachRecord,
  useSessionName,
  visitorDisplayName,
} from '@/lib/internal-tracker'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const P = {
  bg: '#0b0b0b',
  elevation50: '#111111',
  elevation200: '#1f1f1f',
  text: '#e8e8e8',
  textMuted: '#8a8a8a',
  textFaint: '#555555',
  border: 'rgba(255,255,255,0.08)',
  blue: '#4c7cff',
}

type SortKey = keyof Pick<
  InternalDoc,
  'id' | 'title' | 'classification' | 'status' | 'date'
>

export default function InternalIndexPage() {
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

  // Capture visitor IP on index page arrival — before they open any doc
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
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    fireToast('Sort applied.', 'info')
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
      fireToast('No documents selected.', 'error')
      return
    }
    // bulk actions do nothing. arvin.
    fireToast(
      `${action} applied to ${selected.size} document${selected.size > 1 ? 's' : ''}.`,
    )
    setSelected(new Set())
  }

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span
      style={{
        color: sortKey === k ? P.blue : P.textFaint,
        fontSize: '10px',
        marginLeft: '4px',
      }}
    >
      {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <PayloadShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Documents' },
      ]}
      title="Documents"
      showCreate
    >
      {/* ── Toolbar ── */}
      <div
        className="flex flex-wrap items-center gap-3 px-6 py-3"
        style={{
          borderBottom: `1px solid ${P.border}`,
          background: P.elevation50,
        }}
      >
        <div
          className="flex max-w-sm min-w-[200px] flex-1 items-center gap-2 rounded-sm px-3 py-2"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.border}`,
          }}
        >
          <span style={{ color: P.textFaint, fontSize: '12px' }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="flex-1 border-none bg-transparent text-xs outline-none"
            style={{ color: P.text, fontFamily: 'inherit' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: P.textFaint,
                fontFamily: 'inherit',
              }}
            >
              ×
            </button>
          )}
        </div>

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="rounded-sm px-3 py-2 text-xs"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.border}`,
            color: P.textMuted,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <option value="All">All Classifications</option>
          <option value="INTERNAL">Internal</option>
          <option value="CONFIDENTIAL">Confidential</option>
          <option value="RESTRICTED">Restricted</option>
          <option value="DR. VOSS EYES ONLY">Dr. Voss Eyes Only</option>
        </select>

        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: P.textMuted }}>
              {selected.size} selected
            </span>
            <button
              onClick={() => handleBulkAction('Archive')}
              className="rounded-sm px-3 py-1.5 text-[11px]"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.border}`,
                color: P.textMuted,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('Delete')}
              className="rounded-sm px-3 py-1.5 text-[11px]"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
                color: '#ef4444',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Delete
            </button>
          </div>
        )}

        <div className="ml-auto text-[11px]" style={{ color: P.textFaint }}>
          1–{filtered.length} of {DOCS.length}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-xs"
          style={{ minWidth: '800px' }}
        >
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${P.border}`,
                background: P.elevation50,
              }}
            >
              <th className="w-10 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selected.size === filtered.length && filtered.length > 0
                  }
                  onChange={toggleAll}
                  style={{ accentColor: P.blue, cursor: 'pointer' }}
                />
              </th>
              {(
                [
                  { key: 'id' as SortKey, label: 'ID', w: '80px' },
                  { key: 'title' as SortKey, label: 'Title', w: 'auto' },
                  {
                    key: 'classification' as SortKey,
                    label: 'Classification',
                    w: '160px',
                  },
                  { key: 'status' as SortKey, label: 'Status', w: '140px' },
                  { key: 'date' as SortKey, label: 'Date', w: '130px' },
                ] as const
              ).map((col) => (
                <th
                  key={col.key}
                  className="cursor-pointer px-4 py-3 text-left select-none"
                  style={{
                    color: P.textMuted,
                    fontWeight: 500,
                    width: col.w,
                  }}
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label}
                  <SortIcon k={col.key} />
                </th>
              ))}
              <th
                className="px-4 py-3 text-left"
                style={{ color: P.textMuted, width: '120px' }}
              >
                Last Accessed
              </th>
              <th
                className="px-4 py-3 text-center"
                style={{ color: P.textMuted, width: '60px' }}
              >
                Public?
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-16 text-center"
                  style={{ color: P.textFaint }}
                >
                  No documents found.
                </td>
              </tr>
            ) : (
              filtered.map((doc) => {
                const cls = CLASSIFICATION_COLORS[doc.classification]
                const sts = STATUS_COLORS[doc.status]
                const isSelected = selected.has(doc.id)
                const externalAccess = doc.lastAccessed.find(
                  (a) => a.isExternal,
                )
                const lastHuman = doc.lastAccessed.find((a) => !a.isExternal)

                return (
                  <tr
                    key={doc.id}
                    className="payload-row transition-colors duration-100"
                    style={{
                      borderBottom: `1px solid ${P.border}`,
                      background: isSelected
                        ? 'rgba(76,124,255,0.06)'
                        : 'transparent',
                    }}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const next = new Set(selected)
                          isSelected ? next.delete(doc.id) : next.add(doc.id)
                          setSelected(next)
                        }}
                        style={{ accentColor: P.blue, cursor: 'pointer' }}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: P.textFaint }}
                      >
                        {doc.id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/internal/docs/${doc.slug}`}
                        className="transition-colors duration-150 hover:underline"
                        style={{
                          color: P.text,
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        {doc.title}
                      </Link>
                      <p
                        className="mt-0.5 line-clamp-1 text-[10px]"
                        style={{ color: P.textFaint, maxWidth: '380px' }}
                      >
                        {doc.author} · {doc.department}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-sm px-2 py-1 text-[10px] font-medium whitespace-nowrap"
                        style={{
                          background: cls.bg,
                          color: cls.text,
                          border: `1px solid ${cls.border}`,
                        }}
                      >
                        {doc.classification}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: sts.dot }}
                        />
                        <span style={{ color: sts.text }}>{doc.status}</span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        color: P.textMuted,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {doc.date}
                    </td>
                    <td className="px-4 py-3">
                      {externalAccess ? (
                        <div>
                          {lastHuman && (
                            <p
                              className="text-[10px]"
                              style={{ color: P.textMuted }}
                            >
                              {lastHuman.name}, {lastHuman.time}
                            </p>
                          )}
                          <p
                            className="font-mono text-[10px]"
                            style={{ color: 'rgba(239,68,68,0.8)' }}
                          >
                            ⚠ {externalAccess.name}, {externalAccess.time}
                          </p>
                          {visitedDocIds.has(doc.id) && breach.ip && (
                            <p
                              className="font-mono text-[10px]"
                              style={{ color: 'rgba(239,68,68,0.6)' }}
                            >
                              ⚠ {visitorLabel}, just now
                            </p>
                          )}
                        </div>
                      ) : visitedDocIds.has(doc.id) && breach.ip ? (
                        <div>
                          {lastHuman && (
                            <p
                              className="text-[10px]"
                              style={{ color: P.textMuted }}
                            >
                              {lastHuman.name}, {lastHuman.time}
                            </p>
                          )}
                          <p
                            className="font-mono text-[10px]"
                            style={{ color: 'rgba(239,68,68,0.8)' }}
                          >
                            ⚠ {visitorLabel}, just now
                          </p>
                        </div>
                      ) : lastHuman ? (
                        <p
                          className="text-[10px]"
                          style={{ color: P.textMuted }}
                        >
                          {lastHuman.name}, {lastHuman.time}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span style={{ color: '#22c55e', fontSize: '14px' }}>
                        ✓
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination footer ── */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{
          borderTop: `1px solid ${P.border}`,
          background: P.elevation50,
        }}
      >
        <p className="text-[11px]" style={{ color: P.textFaint }}>
          Showing {filtered.length} of {DOCS.length} documents
          {search && ` · Filtered by "${search}"`}
        </p>
        <div className="flex items-center gap-1">
          {['‹', '1', '›'].map((v) => (
            <button
              key={v}
              onClick={() => fireToast('No additional pages.', 'info')}
              className="flex h-7 w-7 items-center justify-center rounded-sm text-[11px]"
              style={{
                background: v === '1' ? P.blue : P.elevation200,
                color: v === '1' ? 'white' : P.textMuted,
                border: `1px solid ${P.border}`,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* TODO: add real pagination when DB is connected — areyes */}
    </PayloadShell>
  )
}
