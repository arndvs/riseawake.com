'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id, Doc } from '../../../../../../convex/_generated/dataModel'
import { Grid3X3, List, Search } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { AssetCard, type Status } from './asset-card'
import { AssetDetailPanel } from './asset-detail-panel'

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'ready_for_review', label: 'In Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'needs_changes', label: 'Changes Needed' },
  { value: 'rejected', label: 'Rejected' },
]

export function Gallery() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [projectFilter, setProjectFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<Doc<'media'> | null>(null)

  // Track "last seen" status per asset for change indicators
  const statusSnapshotRef = useRef<Map<string, string>>(new Map())
  const [changedIds, setChangedIds] = useState<Set<string>>(new Set())

  const projects = useQuery(api.projects.listProjects, {})
  const media = useQuery(api.media.listMedia, {
    ...(statusFilter
      ? { status: statusFilter as Status }
      : {}),
    ...(projectFilter
      ? { projectId: projectFilter as Id<'projects'> }
      : {}),
  })

  // Detect status changes across reactive updates
  useEffect(() => {
    if (!media) return
    const prev = statusSnapshotRef.current
    const newChanged = new Set<string>()

    for (const item of media) {
      const prevStatus = prev.get(item._id)
      if (prevStatus && prevStatus !== item.status) {
        newChanged.add(item._id)
      }
      prev.set(item._id, item.status)
    }

    if (newChanged.size > 0) {
      setChangedIds((old) => new Set([...old, ...newChanged]))
    }
  }, [media])

  const handleSelectAsset = useCallback((asset: Doc<'media'>) => {
    setSelectedAsset(asset)
    // Clear change indicator when viewed
    setChangedIds((old) => {
      if (!old.has(asset._id)) return old
      const next = new Set(old)
      next.delete(asset._id)
      return next
    })
  }, [])

  // Client-side search filter
  const filtered = media?.filter((m) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      m.prompt.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  // Build project name lookup
  const projectMap = new Map<string, string>()
  projects?.forEach((p) => projectMap.set(p._id, p.name))

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts or tags…"
            className="w-full rounded-xl border border-edge bg-surface-alt py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-edge bg-surface-alt px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Project filter */}
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="rounded-xl border border-edge bg-surface-alt px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none"
        >
          <option value="">All projects</option>
          {projects?.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* View toggle */}
        <div className="flex rounded-full border border-edge bg-surface-alt p-0.5">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`rounded-full p-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-brand text-brand-on'
                : 'text-foreground-muted hover:text-foreground'
            }`}
            title="Grid view"
          >
            <Grid3X3 className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`rounded-full p-1.5 transition-colors ${
              viewMode === 'table'
                ? 'bg-brand text-brand-on'
                : 'text-foreground-muted hover:text-foreground'
            }`}
            title="Table view"
          >
            <List className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Loading */}
      {media === undefined && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-3 w-3/4 rounded-full" />
              <Skeleton className="h-3 w-1/2 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered && filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-edge-strong py-16 text-center">
          <p className="text-sm text-foreground-muted">
            {searchQuery || statusFilter || projectFilter
              ? 'No assets match your filters'
              : 'No saved assets yet — generate and save some images!'}
          </p>
        </div>
      )}

      {/* Grid view */}
      {filtered && filtered.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <AssetCard
              key={asset._id}
              imagekitUrl={asset.imagekitUrl}
              prompt={asset.prompt}
              status={asset.status as Status}
              projectName={
                asset.projectId
                  ? projectMap.get(asset.projectId)
                  : undefined
              }
              tags={asset.tags}
              createdAt={asset._creationTime}
              hasChanged={changedIds.has(asset._id)}
              onClick={() => handleSelectAsset(asset)}
            />
          ))}
        </div>
      )}

      {/* Table view */}
      {filtered && filtered.length > 0 && viewMode === 'table' && (
        <div className="overflow-x-auto rounded-xl border border-edge">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-edge bg-surface-alt text-foreground-muted">
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-widest">
                  Image
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-widest">
                  Prompt
                </th>
                <th className="hidden px-3 py-2 text-left text-xs font-medium uppercase tracking-widest sm:table-cell">
                  Project
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-widest">
                  Status
                </th>
                <th className="hidden px-3 py-2 text-left text-xs font-medium uppercase tracking-widest md:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => {
                const cfg =
                  STATUS_OPTIONS.find((s) => s.value === asset.status) ??
                  STATUS_OPTIONS[0]

                return (
                  <tr
                    key={asset._id}
                    onClick={() => handleSelectAsset(asset)}
                    className="cursor-pointer border-b border-edge transition-colors hover:bg-surface-alt"
                  >
                    <td className="px-3 py-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset.imagekitUrl}
                        alt=""
                        className="size-10 rounded-lg object-cover"
                        loading="lazy"
                      />
                    </td>
                    <td className="max-w-xs truncate px-3 py-2 text-foreground-secondary">
                      {asset.prompt}
                    </td>
                    <td className="hidden px-3 py-2 text-foreground-muted sm:table-cell">
                      {asset.projectId
                        ? projectMap.get(asset.projectId) ?? '—'
                        : '—'}
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-xs">{cfg.label}</span>
                    </td>
                    <td className="hidden px-3 py-2 text-foreground-muted md:table-cell">
                      {new Date(asset._creationTime).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail panel */}
      {selectedAsset && (
        <AssetDetailPanel
          mediaId={selectedAsset._id}
          imagekitUrl={selectedAsset.imagekitUrl}
          prompt={selectedAsset.prompt}
          model={selectedAsset.model}
          status={selectedAsset.status as Status}
          tags={selectedAsset.tags}
          projectId={selectedAsset.projectId ?? undefined}
          projectName={
            selectedAsset.projectId
              ? projectMap.get(selectedAsset.projectId)
              : undefined
          }
          shotNumber={selectedAsset.shotNumber}
          createdByName={selectedAsset.createdByName}
          createdAt={selectedAsset._creationTime}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  )
}
