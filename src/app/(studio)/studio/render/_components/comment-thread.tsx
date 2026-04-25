'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { STATUS_CONFIG, type Status } from './asset-card'
import { ArrowRight } from 'lucide-react'

type CommentThreadProps = {
  mediaId: Id<'media'>
}

export function CommentThread({ mediaId }: CommentThreadProps) {
  const comments = useQuery(api.mediaComments.listComments, { mediaId })

  if (!comments) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-surface-alt"
          />
        ))}
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-foreground-muted">
        No comments yet
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => {
        const isStatusChange = !!comment.statusChange

        return (
          <div
            key={comment._id}
            className={`rounded-lg p-3 ${
              isStatusChange
                ? 'border border-edge bg-surface-alt/50'
                : 'bg-surface-alt'
            }`}
          >
            {/* Status change badge */}
            {isStatusChange && comment.statusChange && (
              <div className="mb-2 flex items-center gap-2">
                <StatusBadge status={comment.statusChange.from as Status} />
                <ArrowRight className="size-3 text-foreground-muted" />
                <StatusBadge status={comment.statusChange.to as Status} />
              </div>
            )}

            {/* Comment text */}
            <p className="text-sm text-foreground-secondary leading-relaxed">
              {comment.text}
            </p>

            {/* Author + time */}
            <div className="mt-1.5 flex items-center gap-2 text-[10px] text-foreground-muted">
              <span className="font-medium">
                {comment.authorDisplayName}
              </span>
              <span>·</span>
              <time>
                {new Date(comment._creationTime).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </time>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status]
  if (!cfg) return <span className="text-xs">{status}</span>
  const Icon = cfg.icon
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.className}`}
    >
      {Icon && <Icon className="size-2.5" />}
      {cfg.label}
    </span>
  )
}
