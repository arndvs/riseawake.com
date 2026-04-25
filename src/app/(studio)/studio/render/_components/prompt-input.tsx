'use client'

import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { RISE_RENDER } from '@/lib/studio-config'
import { AdvancedOptions } from './advanced-options'
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react'

type PromptInputProps = {
  onGenerate: (prompt: string, model: 'dall-e-3' | 'gpt-image-1') => void
  isLoading: boolean
  allocRemaining: number
  error: string | null
}

const MODELS = [
  { value: 'dall-e-3' as const, label: 'DALL-E 3' },
  { value: 'gpt-image-1' as const, label: 'GPT Image' },
]

export function PromptInput({
  onGenerate,
  isLoading,
  allocRemaining,
  error,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<'dall-e-3' | 'gpt-image-1'>('dall-e-3')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const categories = useQuery(api.promptCategories.listCategories, {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading || allocRemaining <= 0) return
    onGenerate(prompt.trim(), model)
  }

  const handleAdvancedSelect = (additions: string[]) => {
    if (additions.length === 0) return
    const suffix = additions.join(', ')
    setPrompt((prev) => {
      const trimmed = prev.trim()
      return trimmed ? `${trimmed}, ${suffix}` : suffix
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
      {/* Prompt textarea */}
      <div className="relative rounded-2xl border border-edge bg-surface p-1">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          rows={3}
          maxLength={4000}
          disabled={isLoading}
          className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none disabled:opacity-50"
        />

        {/* Bottom bar: model selector + generate button */}
        <div className="flex items-center justify-between gap-3 px-3 pb-2">
          <div className="flex items-center gap-3">
            {/* Model selector */}
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

            {/* Advanced toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              Options
              {showAdvanced ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </button>
          </div>

          {/* Generate button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isLoading || allocRemaining <= 0}
            className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-cta-on transition-colors hover:bg-cta-hover disabled:opacity-40 disabled:pointer-events-none"
          >
            <Sparkles className="size-3.5" />
            {isLoading ? 'Generating…' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Advanced options panel */}
      {showAdvanced && categories && (
        <AdvancedOptions
          categories={categories}
          onSelect={handleAdvancedSelect}
        />
      )}

      {/* Allocation + error row */}
      <div className="mt-3 flex items-center justify-between px-1">
        <p className="text-xs text-foreground-muted">
          {RISE_RENDER.allocationMessage(allocRemaining)}
        </p>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="size-3" />
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
