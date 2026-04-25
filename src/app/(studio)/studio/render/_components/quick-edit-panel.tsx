'use client'

import { useState, useMemo } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import type { Id } from '../../../../../../convex/_generated/dataModel'
import {
  Eraser,
  ArrowUpFromLine,
  Crop,
  Save,
  Loader2,
  RotateCcw,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  buildTransformUrl,
  getCropDimensions,
  type TransformConfig,
  type CropPreset,
} from '@/lib/imagekit-transforms'
import { uploadToImageKit } from '@/lib/imagekit-upload'

const CROP_PRESETS: { value: CropPreset; label: string }[] = [
  { value: '1:1', label: '1:1' },
  { value: '16:9', label: '16:9' },
  { value: '4:3', label: '4:3' },
  { value: '9:16', label: '9:16' },
]

type QuickEditPanelProps = {
  mediaId: Id<'media'>
  imagekitUrl: string
  prompt: string
  model: string
  tags: string[]
  projectId?: Id<'projects'>
}

export function QuickEditPanel({
  mediaId,
  imagekitUrl,
  prompt,
  model,
  tags,
  projectId,
}: QuickEditPanelProps) {
  const [bgRemove, setBgRemove] = useState(false)
  const [upscale, setUpscale] = useState(false)
  const [cropPreset, setCropPreset] = useState<CropPreset | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const saveMedia = useMutation(api.media.saveMedia)

  const transforms: TransformConfig = useMemo(
    () => ({
      bgRemove,
      upscale,
      ...(cropPreset
        ? { crop: { preset: cropPreset, ...getCropDimensions(cropPreset) } }
        : {}),
    }),
    [bgRemove, upscale, cropPreset],
  )

  const hasTransforms = bgRemove || upscale || cropPreset !== null
  const previewUrl = hasTransforms
    ? buildTransformUrl(imagekitUrl, transforms)
    : imagekitUrl

  const handleReset = () => {
    setBgRemove(false)
    setUpscale(false)
    setCropPreset(null)
  }

  const handleSaveAsNew = async () => {
    if (!hasTransforms) return
    setIsSaving(true)

    try {
      const transformString = buildTransformUrl(imagekitUrl, transforms)
      const slug = prompt
        .slice(0, 30)
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
      const fileName = `${slug}-edited-${Date.now()}.png`

      const { fileId, url } = await uploadToImageKit(transformString, fileName)

      await saveMedia({
        imagekitFileId: fileId,
        imagekitUrl: url,
        prompt: `${prompt} [edited]`,
        model,
        tags: [...tags, 'edited'],
        transformations: JSON.stringify(transforms),
        parentId: mediaId,
        ...(projectId ? { projectId } : {}),
      })

      toast.success('Saved as new version')
      handleReset()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to save edited version',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
        Quick Edit
      </p>

      {/* Preview */}
      <div className="overflow-hidden rounded-xl border border-edge">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt="Edited preview"
          className="h-auto w-full"
        />
      </div>

      {/* Transform toggles */}
      <div className="flex flex-wrap gap-2">
        <ToggleButton
          icon={Eraser}
          label="Remove BG"
          active={bgRemove}
          onClick={() => setBgRemove(!bgRemove)}
        />
        <ToggleButton
          icon={ArrowUpFromLine}
          label="Upscale 2×"
          active={upscale}
          onClick={() => setUpscale(!upscale)}
        />
      </div>

      {/* Crop presets */}
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-foreground-muted">
          <Crop className="size-3" />
          <span className="text-xs font-medium uppercase tracking-widest">
            Crop
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CROP_PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() =>
                setCropPreset(cropPreset === p.value ? null : p.value)
              }
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                cropPreset === p.value
                  ? 'bg-brand text-brand-on'
                  : 'border border-edge bg-surface-alt text-foreground-muted hover:text-foreground'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      {hasTransforms && (
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-edge px-4 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
          <button
            type="button"
            onClick={handleSaveAsNew}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-1.5 text-xs font-medium text-brand-on transition-colors hover:bg-brand-hover disabled:opacity-40"
          >
            {isSaving ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Save className="size-3" />
            )}
            Save as New Version
          </button>
        </div>
      )}
    </div>
  )
}

function ToggleButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-brand text-brand-on'
          : 'border border-edge bg-surface-alt text-foreground-muted hover:text-foreground'
      }`}
    >
      <Icon className="size-3" />
      {label}
    </button>
  )
}
