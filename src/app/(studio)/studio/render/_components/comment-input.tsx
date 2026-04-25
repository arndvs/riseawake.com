'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type CommentInputProps = {
  mediaId: Id<'media'>
}

export function CommentInput({ mediaId }: CommentInputProps) {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)

  const addComment = useMutation(api.mediaComments.addComment)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setIsSending(true)
    try {
      await addComment({ mediaId, text: trimmed })
      setText('')
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to post comment',
      )
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment…"
        className="min-w-0 flex-1 rounded-lg border border-edge bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
      />
      <button
        type="submit"
        disabled={isSending || !text.trim()}
        className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-medium text-brand-on transition-colors hover:bg-brand-hover disabled:opacity-40"
      >
        {isSending ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <Send className="size-3" />
        )}
      </button>
    </form>
  )
}
