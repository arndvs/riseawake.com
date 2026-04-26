'use client'

import { Check, Download, RefreshCw, Save } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type GenerationResultsProps = {
  images: (string | null)[]
  kept: boolean[]
  prompt: string
  onKeep: (index: number) => void
  onRegenerate: (index: number) => void
  onSave: (index: number) => void
}

async function downloadImage(url: string, index: number) {
  const res = await fetch(url)
  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = objectUrl
  a.download = `rise-render-${Date.now()}-${index + 1}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(objectUrl)
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
      {/* Section heading (ripemetrics style) */}
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Generated Images
      </h4>

      {/* 4-column grid (ripemetrics: xl:grid-cols-4) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {images.map((url, i) => (
          <div key={i} className="group relative">
            {url ? (
              <>
                {/* Image with hover overlay (ripemetrics hover-img pattern) */}
                <figure
                  className={`relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 transition-colors ${
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

                  {/* Hover overlay: prompt + action (ripemetrics figcaption style) */}
                  <figcaption className="absolute inset-0 flex flex-col items-start justify-end bg-black/60 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <p className="mb-1 text-[10px] uppercase tracking-widest text-white/70">
                      The Prompt
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-white line-clamp-4">
                      {prompt}
                    </p>
                    <button
                      type="button"
                      onClick={() => downloadImage(url, i)}
                      className="rounded-md bg-cta px-3.5 py-2 text-xs font-semibold text-cta-on shadow-sm transition-colors hover:bg-cta-hover"
                    >
                      Use Image
                    </button>
                  </figcaption>

                  {/* Kept badge */}
                  {kept[i] && (
                    <div className="absolute top-2 right-2 z-10 rounded-full bg-brand p-1">
                      <Check className="size-3 text-brand-on" />
                    </div>
                  )}
                </figure>

                {/* Action buttons below image */}
                <div className="mt-2 flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onKeep(i)}
                    className={`flex-1 rounded-full py-1.5 text-xs font-medium transition-colors ${
                      kept[i]
                        ? 'bg-brand/10 text-brand'
                        : 'border border-edge-subtle bg-surface-alt text-foreground-muted hover:text-foreground'
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
