'use client'

import { Check, Clock, AlertTriangle, XCircle, Send } from 'lucide-react'

const STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground',
    icon: null,
  },
  ready_for_review: {
    label: 'In Review',
    className: 'bg-amber-500/15 text-amber-600',
    icon: Clock,
  },
  approved: {
    label: 'Approved',
    className: 'bg-emerald-500/15 text-emerald-600',
    icon: Check,
  },
  needs_changes: {
    label: 'Changes Needed',
    className: 'bg-orange-500/15 text-orange-600',
    icon: AlertTriangle,
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-500/15 text-red-600',
    icon: XCircle,
  },
} as const

type Status = keyof typeof STATUS_CONFIG

type AssetCardProps = {
  imagekitUrl: string
  prompt: string
  status: Status
  projectName?: string
  tags: string[]
  createdAt: number
  hasChanged?: boolean
  onClick: () => void
}

export function AssetCard({
  imagekitUrl,
  prompt,
  status,
  projectName,
  tags,
  hasChanged,
  onClick,
}: AssetCardProps) {
  const cfg = STATUS_CONFIG[status]
  const StatusIcon = cfg.icon

  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border border-edge bg-surface text-left transition-colors hover:border-edge-strong hover:bg-surface-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagekitUrl}
          alt={prompt}
          className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Status badge */}
        <div
          className={`absolute top-2 left-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${cfg.className}`}
        >
          {StatusIcon && <StatusIcon className="size-2.5" />}
          {cfg.label}
        </div>

        {/* Status changed indicator */}
        {hasChanged && (
          <span className="absolute top-2 right-2 size-2.5 rounded-full bg-brand ring-2 ring-surface animate-pulse" />
        )}
      </div>

      {/* Meta */}
      <div className="p-3">
        <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed">
          {prompt}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {projectName && (
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">
              {projectName}
            </span>
          )}
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-alt px-2 py-0.5 text-[10px] text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

export { STATUS_CONFIG }
export type { Status }
