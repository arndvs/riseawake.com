'use client'

import { useState, useCallback, useMemo } from 'react'
import { Authenticated, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { RISE_RENDER } from '@/lib/studio-config'
import { findBannedWords } from '@/lib/banned-words'
import { AdvancedOptions } from './_components/advanced-options'
import { GenerationResults } from './_components/generation-results'
import { GenerationLoading } from './_components/generation-loading'
import { PlaceholderGallery } from './_components/placeholder-gallery'
import { SaveDialog } from './_components/save-dialog'
import { Gallery } from './_components/gallery'
import {
  Sparkles,
  SlidersHorizontal,
  ShieldAlert,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'

const isGenerationEnabled =
  process.env.NEXT_PUBLIC_GENERATION_ENABLED !== 'false'

type GenerationState = 'idle' | 'loading' | 'results'
type ActiveTab = 'generate' | 'library'

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

export default function RenderPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generate')

  // ─── Prompt state (all owned here, like ripemetrics orchestrator) ──
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<'dall-e-3' | 'gpt-image-1'>('dall-e-3')
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>(
    '1024x1024',
  )
  const [quality, setQuality] = useState<'standard' | 'hd'>('hd')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [clearKey, setClearKey] = useState(0)

  // ─── Generation state ──
  const [generationState, setGenerationState] =
    useState<GenerationState>('idle')
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ])
  const [lastPrompt, setLastPrompt] = useState('')
  const [kept, setKept] = useState<boolean[]>([false, false, false, false])
  const [error, setError] = useState<string | null>(null)
  const [savingSlot, setSavingSlot] = useState<number | null>(null)

  // ─── Convex data ──
  const categories = useQuery(api.promptCategories.listCategories, {})

  // ─── Derived ──
  const bannedMatches = useMemo(() => findBannedWords(prompt), [prompt])
  const hasBannedWords = bannedMatches.length > 0
  const isLoading = generationState === 'loading'
  const isSubmitDisabled =
    !prompt.trim() || isLoading || hasBannedWords

  // ─── Allocation tracking (localStorage) ──
  const getAllocRemaining = useCallback(() => {
    if (typeof window === 'undefined') return RISE_RENDER.allocationLimit
    const today = new Date().toISOString().split('T')[0]
    const stored = localStorage.getItem('rise-render-alloc')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { date: string; used: number }
        if (parsed.date === today) {
          return Math.max(0, RISE_RENDER.allocationLimit - parsed.used)
        }
      } catch {
        // corrupted — reset
      }
    }
    return RISE_RENDER.allocationLimit
  }, [])

  const decrementAllocation = useCallback(() => {
    if (typeof window === 'undefined') return
    const today = new Date().toISOString().split('T')[0]
    const stored = localStorage.getItem('rise-render-alloc')
    let used = 0
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { date: string; used: number }
        if (parsed.date === today) {
          used = parsed.used
        }
      } catch {
        // corrupted — reset
      }
    }
    localStorage.setItem(
      'rise-render-alloc',
      JSON.stringify({ date: today, used: used + 1 }),
    )
  }, [])

  // ─── Generate images ──
  const generateImages = useCallback(
    async (promptText: string) => {
      if (getAllocRemaining() <= 0) {
        setError('Daily allocation exhausted.')
        return
      }

      setLastPrompt(promptText)
      setError(null)
      setGenerationState('loading')
      setKept([false, false, false, false])

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptText,
            model,
            size,
            quality,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error ?? 'Generation failed')
          setGenerationState('idle')
          return
        }

        const urls: (string | null)[] = [null, null, null, null]
        for (let i = 0; i < Math.min(data.images.length, 4); i++) {
          urls[i] = data.images[i]
        }
        setImages(urls)
        decrementAllocation()
        setGenerationState('results')
      } catch {
        setError('Network error — check connection and try again.')
        setGenerationState('idle')
      }
    },
    [model, size, quality, getAllocRemaining, decrementAllocation],
  )

  // ─── Regenerate single slot ──
  const handleRegenerate = useCallback(
    async (slotIndex: number) => {
      if (getAllocRemaining() <= 0) {
        setError('Daily allocation exhausted.')
        return
      }

      setImages((prev) => {
        const next = [...prev]
        next[slotIndex] = null
        return next
      })

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: lastPrompt,
            model,
            size,
            quality,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error ?? 'Regeneration failed')
          return
        }

        if (data.images?.[0]) {
          setImages((prev) => {
            const next = [...prev]
            next[slotIndex] = data.images[0]
            return next
          })
          decrementAllocation()
        }
      } catch {
        setError('Network error — check connection and try again.')
      }
    },
    [lastPrompt, model, size, quality, getAllocRemaining, decrementAllocation],
  )

  // ─── Keep / Save ──
  const handleKeep = useCallback((slotIndex: number) => {
    setKept((prev) => {
      const next = [...prev]
      next[slotIndex] = !next[slotIndex]
      return next
    })
  }, [])

  const handleSave = useCallback((slotIndex: number) => {
    setSavingSlot(slotIndex)
  }, [])

  const handleSaved = useCallback(() => {
    setSavingSlot(null)
  }, [])

  // ─── Form submit ──
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitDisabled || getAllocRemaining() <= 0) return
    generateImages(prompt)
  }

  // ─── Advanced option toggle (appends/removes from prompt) ──
  const handleToggleOption = (option: string, added: boolean) => {
    if (added) {
      setPrompt((prev) => {
        const trimmed = prev.trim()
        return trimmed ? `${trimmed}, ${option}` : option
      })
    } else {
      setPrompt((prev) =>
        prev
          .replace(
            new RegExp(
              `,?\\s*${option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
              'gi',
            ),
            '',
          )
          .replace(/^,\s*/, '')
          .trim(),
      )
    }
  }

  // ─── Clear all (like ripemetrics handleClearAll) ──
  const handleClearAll = () => {
    setPrompt('')
    setShowAdvanced(false)
    setImages([null, null, null, null])
    setError(null)
    setGenerationState('idle')
    setLastPrompt('')
    setClearKey((k) => k + 1)
  }

  // ─── Use example prompt (like ripemetrics handleUsePrompt) ──
  const handleUsePrompt = useCallback(
    (samplePrompt: string) => {
      setPrompt(samplePrompt)
      generateImages(samplePrompt)
    },
    [generateImages],
  )

  return (
    <Authenticated>
      <div className="flex flex-col gap-8 py-12">
        {/* ─── Header (ripemetrics style) ─── */}
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="font-display text-3xl tracking-tight text-foreground-strong">
            {RISE_RENDER.name}
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Get the perfect unique and custom images for your project with AI.
          </p>
        </div>

        {!isGenerationEnabled ? (
          <div className="mx-auto mt-4 rounded-xl border border-edge bg-surface-alt px-8 py-6">
            <p className="text-sm text-foreground-secondary">
              {RISE_RENDER.killSwitchMessage}
            </p>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="mx-auto flex rounded-full border border-edge bg-surface-alt p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('generate')}
                className={`rounded-full px-6 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                  activeTab === 'generate'
                    ? 'bg-brand text-brand-on'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('library')}
                className={`rounded-full px-6 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                  activeTab === 'library'
                    ? 'bg-brand text-brand-on'
                    : 'text-foreground-muted hover:text-foreground'
                }`}
              >
                Library
              </button>
            </div>

            {/* ─── Generate tab ─── */}
            {activeTab === 'generate' && (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto w-full max-w-4xl"
                >
                  {/* ─── "Your Text Prompt" label + Clear all ─── */}
                  <div className="mb-4 flex items-center justify-between">
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

                  {/* ─── Input row (col-span-8 input, col-span-4 buttons) ─── */}
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
                      <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          showAdvanced
                            ? 'bg-brand/10 text-brand'
                            : 'border border-edge-subtle bg-surface-alt text-foreground-muted hover:text-foreground'
                        }`}
                      >
                        <SlidersHorizontal className="size-4" />
                        Advanced
                      </button>

                      <button
                        type="submit"
                        disabled={
                          isSubmitDisabled || getAllocRemaining() <= 0
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

                  {/* ─── Settings row: model, size, quality ─── */}
                  <div className="mt-4 flex flex-wrap items-center gap-6">
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

                    <div className="ml-auto">
                      <p className="text-xs text-foreground-muted">
                        {RISE_RENDER.allocationMessage(getAllocRemaining())}
                      </p>
                    </div>
                  </div>

                  {/* ─── Advanced options (4-column combobox grid) ─── */}
                  {showAdvanced && categories && (
                    <AdvancedOptions
                      key={clearKey}
                      categories={categories}
                      onToggleOption={handleToggleOption}
                    />
                  )}

                  {/* Error */}
                  {error && (
                    <div className="mt-3 px-1">
                      <p className="flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="size-3" />
                        {error}
                      </p>
                    </div>
                  )}
                </form>

                {/* ─── Results / Loading / Placeholder ─── */}
                {generationState === 'loading' && <GenerationLoading />}

                {generationState === 'results' && (
                  <GenerationResults
                    images={images}
                    kept={kept}
                    prompt={lastPrompt}
                    onKeep={handleKeep}
                    onRegenerate={handleRegenerate}
                    onSave={handleSave}
                  />
                )}

                {generationState === 'idle' && !error && (
                  <PlaceholderGallery onUsePrompt={handleUsePrompt} />
                )}

                {/* Save dialog */}
                {savingSlot !== null && images[savingSlot] && (
                  <SaveDialog
                    imageUrl={images[savingSlot]!}
                    prompt={lastPrompt}
                    model={model}
                    onClose={() => setSavingSlot(null)}
                    onSaved={handleSaved}
                  />
                )}
              </>
            )}

            {/* Library tab */}
            {activeTab === 'library' && <Gallery />}
          </>
        )}
      </div>
    </Authenticated>
  )
}
