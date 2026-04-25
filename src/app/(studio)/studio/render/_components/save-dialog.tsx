'use client'

import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import { uploadToImageKit } from '@/lib/imagekit-upload'
import { X, Upload, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type SaveDialogProps = {
  imageUrl: string
  prompt: string
  model: string
  onClose: () => void
  onSaved: () => void
}

export function SaveDialog({
  imageUrl,
  prompt,
  model,
  onClose,
  onSaved,
}: SaveDialogProps) {
  const [tags, setTags] = useState('')
  const [projectId, setProjectId] = useState<string>('')
  const [shotNumber, setShotNumber] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)

  const projects = useQuery(api.projects.listProjects, {})
  const saveMedia = useMutation(api.media.saveMedia)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Generate a file name from the prompt
      const slug = prompt
        .slice(0, 40)
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
      const fileName = `${slug}-${Date.now()}.png`

      // Upload to ImageKit
      const { fileId, url } = await uploadToImageKit(imageUrl, fileName)

      // Save to Convex
      await saveMedia({
        imagekitFileId: fileId,
        imagekitUrl: url,
        prompt,
        model,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        ...(projectId
          ? { projectId: projectId as Id<'projects'> }
          : {}),
        ...(shotNumber ? { shotNumber: parseInt(shotNumber, 10) } : {}),
      })

      toast.success('Image saved to library')
      onSaved()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to save image',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-edge bg-surface p-6 shadow-elevated">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>

        <h2 className="text-lg font-display text-foreground-strong">
          Save to Library
        </h2>
        <p className="mt-1 text-xs text-foreground-muted truncate">
          &ldquo;{prompt}&rdquo;
        </p>

        {/* Preview */}
        <div className="mt-4 aspect-square w-full max-w-50 mx-auto overflow-hidden rounded-xl border border-edge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Image to save"
            className="h-full w-full object-cover"
          />
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Tags */}
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground-secondary">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="hero, lifestyle, bedroom"
              className="w-full rounded-xl border border-edge bg-surface-alt px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
            />
          </div>

          {/* Project */}
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground-secondary">
              Project (optional)
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-xl border border-edge bg-surface-alt px-3 py-2 text-sm text-foreground focus:border-brand focus:outline-none"
            >
              <option value="">No project</option>
              {projects?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shot number — only show if project selected */}
          {projectId && (
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground-secondary">
                Shot Number (optional)
              </label>
              <input
                type="number"
                value={shotNumber}
                onChange={(e) => setShotNumber(e.target.value)}
                min={1}
                placeholder="e.g. 12"
                className="w-full rounded-xl border border-edge bg-surface-alt px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-brand-on transition-colors hover:bg-brand-hover disabled:opacity-40"
            >
              {isSaving ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Upload className="size-3.5" />
              )}
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
