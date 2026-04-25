'use client'

import { useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { RISE_RENDER } from '@/lib/studio-config'
import { findBannedWords } from '@/lib/banned-words'
import { AdvancedOptions } from './advanced-options'
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react'

type PromptInputProps = {
  onGenerate: (
    prompt: string,
    model: 'dall-e-3' | 'gpt-image-1',
    size: '1024x1024' | '1792x1024' | '1024x1792',
    quality: 'standard' | 'hd',
  ) => void
  isLoading: boolean
  allocRemaining: number
  error: string | null
}

const MODELS = [
  { value: 'dall-e-3' as const, label: 'DALL-E 3' },
  { value: 'gpt-image-1' as const, label: 'GPT Image' },
]

const SIZES = [
  { value: '1024x1024' as const, label: 'Square' },
  { value: '1792x1024' as const, label: 'Landscape' },
  { value: '1024x1792' as const, label: 'Portrait' },
]

const QUALITIES = [
  { value: 'standard' as const, label: 'Standard' },
  { value: 'hd' as const, label: 'HD' },
]

export function PromptInput({
  onGenerate,
  isLoading,
  allocRemaining,
  error,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<'dall-e-3' | 'gpt-image-1'>('dall-e-3')
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>('1024x1024')
  const [quality, setQuality] = useState<'standard' | 'hd'>('hd')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const categories = useQuery(api.promptCategories.listCategories, {})

  const bannedMatches = useMemo(() => findBannedWords(prompt), [prompt])
  const hasBannedWords = bannedMatches.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading || allocRemaining <= 0 || hasBannedWords)
      return
    onGenerate(prompt.trim(), model, size, quality)
  }

  const handleAdvancedSelect = (additions: string[]) => {
    if (additions.length === 0) return
    const suffix = additions.join(', ')
    setPrompt((prev) => {
      const trimmed = prev.trim()
      return trimmed ? `${trimmed}, ${suffix}` : suffix
    })
  }

  const handleToggleOption = (option: string, added: boolean) => {
    if (added) {
      setPrompt((prev) => {
        const trimmed = prev.trim()
        return trimmed ? `${trimmed}, ${option}` : option
      })
    } else {
      setPrompt((prev) => {
        // Remove the option from the prompt text
        return prev
          .replace(new RegExp(`,?\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi'), '')
          .replace(/^,\s*/, '')
          .trim()
      })
    }
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

            {/* Size selector (DALL-E 3 only) */}
            {model === 'dall-e-3' && (
              <div className="flex rounded-full border border-edge-subtle bg-surface-alt">
                {SIZES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSize(s.value)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors ${
                      size === s.value
                        ? 'bg-brand text-brand-on'
                        : 'text-foreground-muted hover:text-foreground'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Quality selector (DALL-E 3 only) */}
            {model === 'dall-e-3' && (
              <div className="flex rounded-full border border-edge-subtle bg-surface-alt">
                {QUALITIES.map((q) => (
                  <button
                    key={q.value}
                    type="button"
                    onClick={() => setQuality(q.value)}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors ${
                      quality === q.value
                        ? 'bg-brand text-brand-on'
                        : 'text-foreground-muted hover:text-foreground'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

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
            disabled={
              !prompt.trim() ||
              isLoading ||
              allocRemaining <= 0 ||
              hasBannedWords
            }
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
          onToggleOption={handleToggleOption}
        />
      )}

      {/* Banned word warning */}
      {hasBannedWords && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2">
          <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-red-400" />
          <p className="text-xs text-red-400">
            Prohibited content detected:{' '}
            <span className="font-medium">
              {bannedMatches.join(', ')}
            </span>
          </p>
        </div>
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
