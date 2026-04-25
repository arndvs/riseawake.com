'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { ArrowRight, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import { STATUS_CONFIG, type Status } from './asset-card'

type StatusChangeDialogProps = {
  mediaId: Id<'media'>
  currentStatus: Status
  newStatus: Status
  onClose: () => void
  onChanged: () => void
}

export function StatusChangeDialog({
  mediaId,
  currentStatus,
  newStatus,
  onClose,
  onChanged,
}: StatusChangeDialogProps) {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateStatus = useMutation(api.media.updateMediaStatus)

  const currentCfg = STATUS_CONFIG[currentStatus]
  const newCfg = STATUS_CONFIG[newStatus]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setIsSubmitting(true)
    try {
      await updateStatus({
        id: mediaId,
        newStatus,
        commentText: comment.trim(),
      })
      toast.success(`Status changed to ${newCfg.label}`)
      onChanged()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to change status',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl border border-edge bg-surface p-6 shadow-elevated">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>

        <h2 className="font-display text-lg text-foreground-strong">
          Change Status
        </h2>

        {/* Transition visualization */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${currentCfg.className}`}
          >
            {currentCfg.label}
          </span>
          <ArrowRight className="size-4 text-foreground-muted" />
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${newCfg.className}`}
          >
            {newCfg.label}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground-secondary">
              Comment (required)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              required
              placeholder="Explain this status change…"
              className="w-full resize-none rounded-xl border border-edge bg-surface-alt px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-brand-on transition-colors hover:bg-brand-hover disabled:opacity-40"
            >
              {isSubmitting && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
