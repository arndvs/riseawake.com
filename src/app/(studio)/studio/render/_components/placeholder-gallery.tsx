'use client'

import { Sparkles } from 'lucide-react'

const EXAMPLES = [
  {
    prompt:
      'A sleek adjustable bed in a minimalist loft, warm golden hour light streaming through floor-to-ceiling windows, cinematic 3D render',
    label: 'Product — Golden Hour',
  },
  {
    prompt:
      'Close-up of a smart remote control with a glowing OLED screen, dramatic neon lighting, cyberpunk style, ultra detailed',
    label: 'The Remote — Neon',
  },
  {
    prompt:
      'Wide shot of a cozy bedroom at night, adjustable bed in zero-gravity position, soft candlelight, photorealistic, film grain',
    label: 'Lifestyle — Night',
  },
  {
    prompt:
      'Character reference sheet of a confused middle-aged man in pajamas holding a futuristic remote, cartoon style, front and side view',
    label: 'Character — Reference',
  },
]

type PlaceholderGalleryProps = {
  onUsePrompt: (prompt: string) => void
}

export function PlaceholderGallery({ onUsePrompt }: PlaceholderGalleryProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-dashed border-edge-strong p-8">
        <div className="mb-6 text-center">
          <Sparkles className="mx-auto mb-3 size-6 text-foreground-muted" />
          <p className="text-sm text-foreground-muted">
            Try one of these prompts to get started
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => onUsePrompt(ex.prompt)}
              className="group rounded-xl border border-edge bg-surface p-4 text-left transition-colors hover:border-brand/40 hover:bg-surface-alt"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-brand">
                {ex.label}
              </p>
              <p className="text-xs leading-relaxed text-foreground-muted line-clamp-3 group-hover:text-foreground-secondary">
                {ex.prompt}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
