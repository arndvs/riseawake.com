'use client'

import { useState, useEffect } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import type { Id } from '../../../../../convex/_generated/dataModel'
import {
  X,
  Calendar,
  Cpu,
  Tag,
  FolderOpen,
  Hash,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

type Status =
  | 'draft'
  | 'ready_for_review'
  | 'approved'
  | 'needs_changes'
  | 'rejected'

const STATUS_COLORS: Record<Status, string> = {
  draft: 'bg-muted text-muted-foreground',
  ready_for_review: 'bg-amber-500/15 text-amber-400',
  approved: 'bg-emerald-500/15 text-emerald-400',
  needs_changes: 'bg-orange-500/15 text-orange-400',
  rejected: 'bg-red-500/15 text-red-400',
}

const STATUS_LABELS: Record<Status, string> = {
  draft: 'Draft',
  ready_for_review: 'In Review',
  approved: 'Approved',
  needs_changes: 'Needs Changes',
  rejected: 'Rejected',
}

type ReviewAction = 'approved' | 'needs_changes' | 'rejected'

const REVIEW_ACTIONS: { status: ReviewAction; label: string; icon: typeof CheckCircle2; className: string }[] = [
  {
    status: 'approved',
    label: 'Approve',
    icon: CheckCircle2,
    className: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
  {
    status: 'needs_changes',
    label: 'Request Changes',
    icon: AlertCircle,
    className: 'bg-orange-600 hover:bg-orange-700 text-white',
  },
  {
    status: 'rejected',
    label: 'Reject',
    icon: XCircle,
    className: 'bg-red-600 hover:bg-red-700 text-white',
  },
]

type ReviewDetailPanelProps = {
  mediaId: Id<'media'>
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

export function ReviewDetailPanel({
  mediaId,
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
}: ReviewDetailPanelProps) {
  const [selectedAction, setSelectedAction] = useState<ReviewAction | null>(null)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [anonIdentity, setAnonIdentity] = useState<{
    identifier: string
    displayName: string
  } | null>(null)

  const updateStatus = useMutation(api.media.updateMediaStatus)

  useEffect(() => {
    fetch('/api/identity')
      .then((r) => r.json())
      .then(setAnonIdentity)
      .catch(() => {
        setAnonIdentity({
          identifier: 'anon_unknown',
          displayName: 'Reviewer',
        })
      })
  }, [])

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  const handleSubmitReview = async () => {
    if (!selectedAction || !comment.trim() || !anonIdentity) return
    setIsSubmitting(true)

    try {
      await updateStatus({
        id: mediaId,
        newStatus: selectedAction,
        commentText: comment.trim(),
        authorIdentifier: anonIdentity.identifier,
      })
      toast.success(`Asset ${STATUS_LABELS[selectedAction].toLowerCase()}`)
      onClose()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to update status',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const canReview = status === 'ready_for_review'

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/60 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="flex-1"
        aria-label="Close"
      />

      <div className="flex w-full max-w-lg flex-col border-l border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Review Asset</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* Image */}
          <div className="overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagekitUrl} alt={prompt} className="h-auto w-full" />
          </div>

          {/* Status badge */}
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[status]}`}
          >
            {STATUS_LABELS[status]}
          </span>

          {/* Prompt */}
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Prompt
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {prompt}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3">
            <MetaItem icon={Cpu} label="Model" value={model} />
            <MetaItem icon={Calendar} label="Created" value={formattedDate} />
            <MetaItem
              icon={FolderOpen}
              label="Project"
              value={projectName ?? '—'}
            />
            {shotNumber != null && (
              <MetaItem icon={Hash} label="Shot" value={`#${shotNumber}`} />
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
                <Tag className="size-3" />
                <span className="text-xs font-medium uppercase tracking-widest">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Created by {createdByName}
          </p>

          {/* Review actions */}
          {canReview && (
            <div className="space-y-4 border-t border-border pt-6">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Review Decision
              </p>

              <div className="flex gap-2">
                {REVIEW_ACTIONS.map((action) => {
                  const Icon = action.icon
                  const isSelected = selectedAction === action.status
                  return (
                    <button
                      key={action.status}
                      type="button"
                      onClick={() => setSelectedAction(action.status)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        isSelected
                          ? action.className
                          : 'border border-border bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="size-3" />
                      {action.label}
                    </button>
                  )
                })}
              </div>

              {selectedAction && (
                <div className="space-y-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment (required)…"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSubmitReview}
                    disabled={isSubmitting || !comment.trim()}
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
                  >
                    {isSubmitting
                      ? 'Submitting…'
                      : `Submit: ${STATUS_LABELS[selectedAction]}`}
                  </button>
                </div>
              )}
            </div>
          )}
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
    <div className="rounded-lg bg-muted p-3">
      <div className="mb-1 flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3" />
        <span className="text-[10px] font-medium uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="text-sm">{value}</p>
    </div>
  )
}
