'use client'

import { Check, RefreshCw, Save } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type GenerationResultsProps = {
  images: (string | null)[]
  kept: boolean[]
  prompt: string
  onKeep: (index: number) => void
  onRegenerate: (index: number) => void
  onSave: (index: number) => void
}

export function GenerationResults({
  images,
  kept,
  prompt,
  onKeep,
  onRegenerate,
  onSave,
}: GenerationResultsProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Prompt echo */}
      <p className="mb-4 px-1 text-xs text-foreground-muted italic truncate">
        &ldquo;{prompt}&rdquo;
      </p>

      {/* 4-slot grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((url, i) => (
          <div key={i} className="group relative">
            {url ? (
              <>
                {/* Image */}
                <div
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-colors ${
                    kept[i]
                      ? 'border-brand shadow-[0_0_12px_rgba(10,107,90,0.3)]'
                      : 'border-edge hover:border-edge-strong'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Generated image ${i + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {/* Kept badge */}
                  {kept[i] && (
                    <div className="absolute top-2 right-2 rounded-full bg-brand p-1">
                      <Check className="size-3 text-brand-on" />
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onKeep(i)}
                    className={`flex-1 rounded-full py-1.5 text-xs font-medium transition-colors ${
                      kept[i]
                        ? 'bg-brand/10 text-brand'
                        : 'bg-surface-alt text-foreground-muted hover:text-foreground border border-edge-subtle'
                    }`}
                  >
                    {kept[i] ? 'Kept' : 'Keep'}
                  </button>
                  {kept[i] && (
                    <button
                      type="button"
                      onClick={() => onSave(i)}
                      className="flex items-center justify-center rounded-full bg-brand px-2.5 py-1.5 text-brand-on transition-colors hover:bg-brand-hover"
                      title="Save to library"
                    >
                      <Save className="size-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onRegenerate(i)}
                    className="flex items-center justify-center rounded-full border border-edge-subtle bg-surface-alt px-2.5 py-1.5 text-foreground-muted transition-colors hover:text-foreground"
                    title="Regenerate this slot"
                  >
                    <RefreshCw className="size-3" />
                  </button>
                </div>
              </>
            ) : (
              /* Loading slot */
              <div>
                <Skeleton className="aspect-square w-full rounded-xl" />
                <div className="mt-2 flex gap-1.5">
                  <Skeleton className="h-7 flex-1 rounded-full" />
                  <Skeleton className="h-7 w-9 rounded-full" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
