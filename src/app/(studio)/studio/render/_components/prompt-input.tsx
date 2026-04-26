'use client'

import { useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../../../convex/_generated/api'
import { RISE_RENDER } from '@/lib/studio-config'
import { findBannedWords } from '@/lib/banned-words'
import { AdvancedOptions } from './advanced-options'
import {
  Sparkles,
  SlidersHorizontal,
  AlertCircle,
  ShieldAlert,
  RotateCcw,
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
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>(
    '1024x1024',
  )
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
        return prev
          .replace(
            new RegExp(
              `,?\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
              'gi',
            ),
            '',
          )
          .replace(/^,\s*/, '')
          .trim()
      })
    }
  }

  const handleClearAll = () => {
    setPrompt('')
    setShowAdvanced(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-4xl">
      {/* Instructional header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Your Text Prompt
            </h4>
            <p className="mt-1 text-xs text-foreground-muted">
              Describe in detail what you want the AI to create.
            </p>
          </div>
          {prompt && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-xs text-foreground-muted transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Input row: text input + advanced + generate */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 sm:col-span-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="An expressionist oil painting of a futuristic adjustable bed"
            maxLength={4000}
            disabled={isLoading}
            className="block w-full rounded-lg border border-edge bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50"
          />
          {/* Banned word warning */}
          {hasBannedWords && (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2">
              <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-red-400" />
              <p className="text-xs text-red-400">
                Prohibited content detected:{' '}
                <span className="font-medium">
                  {bannedMatches.join(', ')}
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="col-span-12 flex justify-end gap-3 sm:col-span-4">
          {/* Advanced toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              showAdvanced
                ? 'bg-brand/10 text-brand'
                : 'bg-surface-alt text-foreground-muted hover:text-foreground border border-edge-subtle'
            }`}
          >
            <SlidersHorizontal className="size-4" />
            Advanced
          </button>

          {/* Generate button */}
          <button
            type="submit"
            disabled={
              !prompt.trim() ||
              isLoading ||
              allocRemaining <= 0 ||
              hasBannedWords
            }
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cta px-6 py-2.5 text-sm font-medium text-cta-on transition-colors hover:bg-cta-hover disabled:pointer-events-none disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <svg
                  className="size-4 animate-spin text-cta-on"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"
                  />
                </svg>
                Generating
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Generate Images
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings row: model, size, quality — labeled groups */}
      <div className="mt-4 flex flex-wrap items-center gap-6">
        {/* Model */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground-secondary">
            Model
          </span>
          <div className="flex rounded-full border border-edge-subtle bg-surface-alt">
            {MODELS.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setModel(m.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  model === m.value
                    ? 'bg-brand text-brand-on'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size (DALL-E 3 only) */}
        {model === 'dall-e-3' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground-secondary">
              Size
            </span>
            <div className="flex rounded-full border border-edge-subtle bg-surface-alt">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setSize(s.value)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    size === s.value
                      ? 'bg-brand text-brand-on'
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quality (DALL-E 3 only) */}
        {model === 'dall-e-3' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground-secondary">
              Quality
            </span>
            <div className="flex rounded-full border border-edge-subtle bg-surface-alt">
              {QUALITIES.map((q) => (
                <button
                  key={q.value}
                  type="button"
                  onClick={() => setQuality(q.value)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    quality === q.value
                      ? 'bg-brand text-brand-on'
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Allocation counter */}
        <div className="ml-auto">
          <p className="text-xs text-foreground-muted">
            {RISE_RENDER.allocationMessage(allocRemaining)}
          </p>
        </div>
      </div>

      {/* Advanced options panel */}
      {showAdvanced && categories && (
        <AdvancedOptions
          categories={categories}
          onToggleOption={handleToggleOption}
        />
      )}

      {/* Error display */}
      {error && (
        <div className="mt-3 px-1">
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="size-3" />
            {error}
          </p>
        </div>
      )}
    </form>
  )
}
