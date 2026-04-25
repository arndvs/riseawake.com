'use client'

import { useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { Sparkles, Eye } from 'lucide-react'
import { RISE_RENDER } from '@/lib/studio-config'

const ANGLES = [
  { value: 'front', label: 'Front' },
  { value: '3/4', label: '3/4' },
  { value: 'side', label: 'Side' },
  { value: 'back', label: 'Back' },
  { value: 'top-down', label: 'Top-Down' },
] as const

type CharacterSheetModeProps = {
  onGenerate: (prompt: string, model: 'dall-e-3' | 'gpt-image-1') => void
  isLoading: boolean
  allocRemaining: number
  error: string | null
}

const MODELS = [
  { value: 'dall-e-3' as const, label: 'DALL-E 3' },
  { value: 'gpt-image-1' as const, label: 'GPT Image' },
]

export function CharacterSheetMode({
  onGenerate,
  isLoading,
  allocRemaining,
  error,
}: CharacterSheetModeProps) {
  const [characterName, setCharacterName] = useState('')
  const [description, setDescription] = useState('')
  const [angle, setAngle] = useState('front')
  const [style, setStyle] = useState('')
  const [scene, setScene] = useState('')
  const [model, setModel] = useState<'dall-e-3' | 'gpt-image-1'>('dall-e-3')

  const categories = useQuery(api.promptCategories.listCategories, {})

  // Build style options from prompt categories
  const styleOptions = useMemo(() => {
    if (!categories) return []
    const styleCat = categories.find(
      (c) => c.name.toLowerCase() === 'style' || c.name.toLowerCase() === 'art style',
    )
    return styleCat?.options ?? []
  }, [categories])

  // Construct the prompt
  const constructedPrompt = useMemo(() => {
    const parts: string[] = []
    parts.push('Create a consistent character reference image')
    if (characterName.trim()) parts.push(`of ${characterName.trim()}`)
    if (description.trim()) parts.push(description.trim())
    parts.push(`${angle} view`)
    if (style) parts.push(`in ${style} style`)
    if (scene.trim()) parts.push(`set in ${scene.trim()}`)
    return parts.join(', ')
  }, [characterName, description, angle, style, scene])

  const canGenerate =
    characterName.trim() && !isLoading && allocRemaining > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canGenerate) return
    onGenerate(constructedPrompt, model)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl space-y-4"
    >
      <div className="rounded-2xl border border-edge bg-surface p-5 space-y-4">
        {/* Character name */}
        <div>
          <label
            htmlFor="cs-name"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground-muted"
          >
            Character Name
          </label>
          <input
            id="cs-name"
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="e.g. Luna, The Warden, Subject 12"
            disabled={isLoading}
            className="w-full rounded-xl border border-edge bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="cs-desc"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground-muted"
          >
            Description
          </label>
          <textarea
            id="cs-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Physical traits, outfit, accessories, mood…"
            rows={2}
            disabled={isLoading}
            className="w-full resize-none rounded-xl border border-edge bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Angle selector */}
        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground-muted">
            Angle
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ANGLES.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setAngle(a.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  angle === a.value
                    ? 'bg-brand text-brand-on'
                    : 'bg-surface-alt text-foreground-muted hover:text-foreground'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style selector */}
        <div>
          <label
            htmlFor="cs-style"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground-muted"
          >
            Style
          </label>
          {styleOptions.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {styleOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(style === s ? '' : s)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    style === s
                      ? 'bg-brand text-brand-on'
                      : 'bg-surface-alt text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <input
              id="cs-style"
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              placeholder="e.g. anime, photorealistic, oil painting"
              disabled={isLoading}
              className="w-full rounded-xl border border-edge bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none disabled:opacity-50"
            />
          )}
        </div>

        {/* Scene / Background */}
        <div>
          <label
            htmlFor="cs-scene"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-foreground-muted"
          >
            Scene / Background
          </label>
          <input
            id="cs-scene"
            type="text"
            value={scene}
            onChange={(e) => setScene(e.target.value)}
            placeholder="e.g. dark alley at night, enchanted forest"
            disabled={isLoading}
            className="w-full rounded-xl border border-edge bg-surface-alt px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none disabled:opacity-50"
          />
        </div>

        {/* Constructed prompt preview */}
        <div className="rounded-xl bg-surface-alt p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-foreground-muted">
            <Eye className="size-3" />
            Preview
          </div>
          <p className="text-xs leading-relaxed text-foreground-secondary">
            {constructedPrompt}
          </p>
        </div>

        {/* Bottom bar: model selector + generate button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex rounded-full border border-edge-subtle bg-surface-alt">
            {MODELS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setModel(m.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors ${
                  model === m.value
                    ? 'bg-brand text-brand-on'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!canGenerate}
            className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-cta-on transition-colors hover:bg-cta-hover disabled:opacity-40 disabled:pointer-events-none"
          >
            <Sparkles className="size-3.5" />
            {isLoading ? 'Generating…' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Allocation + error row */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-foreground-muted">
          {RISE_RENDER.allocationMessage(allocRemaining)}
        </p>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
