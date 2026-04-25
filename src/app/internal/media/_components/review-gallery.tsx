'use client'

import { useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'
import { ImageIcon, Search, Filter } from 'lucide-react'
import { ReviewDetailPanel } from './review-detail-panel'

type Status =
  | 'draft'
  | 'ready_for_review'
  | 'approved'
  | 'needs_changes'
  | 'rejected'

const STATUS_FILTERS: { value: Status | 'all'; label: string }[] = [
  { value: 'ready_for_review', label: 'Needs Review' },
  { value: 'all', label: 'All' },
  { value: 'approved', label: 'Approved' },
  { value: 'needs_changes', label: 'Changes Requested' },
  { value: 'rejected', label: 'Rejected' },
]

const STATUS_BADGE_COLORS: Record<Status, string> = {
  draft: 'bg-muted text-muted-foreground',
  ready_for_review: 'bg-amber-500/15 text-amber-400',
  approved: 'bg-emerald-500/15 text-emerald-400',
  needs_changes: 'bg-orange-500/15 text-orange-400',
  rejected: 'bg-red-500/15 text-red-400',
}

const STATUS_BADGE_LABELS: Record<Status, string> = {
  draft: 'Draft',
  ready_for_review: 'In Review',
  approved: 'Approved',
  needs_changes: 'Changes Requested',
  rejected: 'Rejected',
}

type MediaItem = {
  _id: Id<'media'>
  _creationTime: number
  imagekitUrl: string
  prompt: string
  model: string
  status: string
  tags: string[]
  projectId?: Id<'projects'>
  shotNumber?: number
  createdByName: string
}

export function ReviewGallery() {
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>(
    'ready_for_review',
  )
  const [search, setSearch] = useState('')
  const [selectedAsset, setSelectedAsset] = useState<MediaItem | null>(null)

  const media = useQuery(api.media.listMedia, {
    ...(statusFilter !== 'all' ? { status: statusFilter } : {}),
  })

  const projects = useQuery(api.projects.listProjects)
  const projectMap = useMemo(() => {
    const m = new Map<Id<'projects'>, string>()
    for (const p of projects ?? []) m.set(p._id, p.name)
    return m
  }, [projects])

  const filtered = useMemo(() => {
    if (!media) return []
    if (!search.trim()) return media
    const q = search.toLowerCase()
    return media.filter(
      (m) =>
        m.prompt.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [media, search])

  if (!media) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts and tags…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Filter className="size-4 text-muted-foreground" />
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatusFilter(f.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                statusFilter === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} asset{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <ImageIcon className="size-10 opacity-30" />
          <p className="text-sm">No assets match current filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((asset) => (
            <button
              key={asset._id}
              type="button"
              onClick={() => setSelectedAsset(asset)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset.imagekitUrl}
                alt={asset.prompt}
                className="aspect-square w-full object-cover"
              />

              {/* Status badge */}
              <span
                className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_BADGE_COLORS[asset.status as Status]}`}
              >
                {STATUS_BADGE_LABELS[asset.status as Status]}
              </span>

              {/* Prompt overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 pt-8">
                <p className="line-clamp-2 text-left text-xs text-white/80">
                  {asset.prompt}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selectedAsset && (
        <ReviewDetailPanel
          mediaId={selectedAsset._id}
          imagekitUrl={selectedAsset.imagekitUrl}
          prompt={selectedAsset.prompt}
          model={selectedAsset.model}
          status={selectedAsset.status as Status}
          tags={selectedAsset.tags}
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
