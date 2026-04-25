'use client'

import { X, Calendar, Cpu, Tag, FolderOpen, Hash } from 'lucide-react'
import { STATUS_CONFIG, type Status } from './asset-card'

type AssetDetailPanelProps = {
  imagekitUrl: string
  prompt: string
  model: string
  status: Status
  tags: string[]
  projectName?: string
  shotNumber?: number
  createdByName: string
  createdAt: number
  onClose: () => void
}

export function AssetDetailPanel({
  imagekitUrl,
  prompt,
  model,
  status,
  tags,
  projectName,
  shotNumber,
  createdByName,
  createdAt,
  onClose,
}: AssetDetailPanelProps) {
  const cfg = STATUS_CONFIG[status]
  const StatusIcon = cfg.icon

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/60 backdrop-blur-sm">
      {/* Backdrop click */}
      <button
        type="button"
        onClick={onClose}
        className="flex-1"
        aria-label="Close detail panel"
      />

      {/* Panel */}
      <div className="flex w-full max-w-lg flex-col border-l border-edge bg-surface animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-edge px-6 py-4">
          <h2 className="font-display text-lg text-foreground-strong">
            Asset Detail
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Full-size image */}
          <div className="overflow-hidden rounded-xl border border-edge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagekitUrl}
              alt={prompt}
              className="h-auto w-full"
            />
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${cfg.className}`}
            >
              {StatusIcon && <StatusIcon className="size-3" />}
              {cfg.label}
            </span>
          </div>

          {/* Prompt */}
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-foreground-muted">
              Prompt
            </p>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {prompt}
            </p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetaItem icon={Cpu} label="Model" value={model} />
            <MetaItem icon={Calendar} label="Created" value={formattedDate} />
            <MetaItem
              icon={FolderOpen}
              label="Project"
              value={projectName ?? '—'}
            />
            {shotNumber != null && (
              <MetaItem
                icon={Hash}
                label="Shot"
                value={`#${shotNumber}`}
              />
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-foreground-muted">
                <Tag className="size-3" />
                <span className="text-xs font-medium uppercase tracking-widest">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-alt px-2.5 py-1 text-xs text-foreground-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Creator */}
          <p className="text-xs text-foreground-muted">
            Created by {createdByName}
          </p>

          {/* Stubs for future slices */}
          <div className="space-y-3 border-t border-edge pt-6">
            <div className="rounded-xl border border-dashed border-edge p-4 text-center">
              <p className="text-xs text-foreground-muted">
                Quick-edit tools coming soon
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-edge p-4 text-center">
              <p className="text-xs text-foreground-muted">
                Comments coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg bg-surface-alt p-3">
      <div className="mb-1 flex items-center gap-1.5 text-foreground-muted">
        <Icon className="size-3" />
        <span className="text-[10px] font-medium uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="text-sm text-foreground-secondary">{value}</p>
    </div>
  )
}
