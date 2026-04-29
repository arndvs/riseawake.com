'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { MultiSelect } from '@/components/ui/multi-select'
import { findBannedWords } from '@/lib/banned-words'
import { RISE_RENDER } from '@/lib/studio-config'
import { Authenticated, useQuery } from 'convex/react'
import {
  AlertCircle,
  Download,
  Loader2,
  Save,
  Settings2,
  ShieldAlert,
  Sparkles,
  Trash2,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { api } from '@convex/_generated/api'
import { Gallery } from './_components/gallery'
import { SaveDialog } from './_components/save-dialog'

/* ─── Constants ─── */

const isGenerationEnabled =
  process.env.NEXT_PUBLIC_GENERATION_ENABLED !== 'false'

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

const EXAMPLE_PROMPTS = [
  {
    id: 1,
    prompt:
      'A sleek adjustable bed in a minimalist loft, warm golden hour light streaming through floor-to-ceiling windows, cinematic 3D render',
    label: 'Product — Golden Hour',
  },
  {
    id: 2,
    prompt:
      'Close-up of a smart remote control with a glowing OLED screen, dramatic neon lighting, cyberpunk style, ultra detailed',
    label: 'The Remote — Neon',
  },
  {
    id: 3,
    prompt:
      'Wide shot of a cozy bedroom at night, adjustable bed in zero-gravity position, soft candlelight, photorealistic, film grain',
    label: 'Lifestyle — Night',
  },
  {
    id: 4,
    prompt:
      'Character reference sheet of a confused middle-aged man in pajamas holding a futuristic remote, cartoon style, front and side view',
    label: 'Character — Reference',
  },
]

type ActiveTab = 'generate' | 'library'

interface GeneratedImage {
  url: string
  prompt: string
}

/* ─── Page ─── */

export default function RenderPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generate')

  /* Prompt state */
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<'dall-e-3' | 'gpt-image-1'>('dall-e-3')
  const [size, setSize] = useState<'1024x1024' | '1792x1024' | '1024x1792'>(
    '1024x1024',
  )
  const [quality, setQuality] = useState<'standard' | 'hd'>('hd')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({})

  /* Generation state */
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [savingSlot, setSavingSlot] = useState<number | null>(null)

  /* Convex data */
  const categories = useQuery(api.promptCategories.listCategories, {})

  /* Derived */
  const bannedMatches = useMemo(() => findBannedWords(prompt), [prompt])
  const hasBannedWords = bannedMatches.length > 0

  const allSelectedOptions = useMemo(
    () => Object.values(selectedOptions).flat(),
    [selectedOptions],
  )

  const buildFullPrompt = useCallback(() => {
    const parts = [prompt, ...allSelectedOptions].filter(Boolean)
    return parts.join(', ')
  }, [prompt, allSelectedOptions])

  const isSubmitDisabled =
    isLoading || hasBannedWords || buildFullPrompt().trim().length === 0

  /* Allocation tracking (localStorage) */
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
        /* corrupted — reset */
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
        if (parsed.date === today) used = parsed.used
      } catch {
        /* corrupted — reset */
      }
    }
    localStorage.setItem(
      'rise-render-alloc',
      JSON.stringify({ date: today, used: used + 1 }),
    )
  }, [])

  /* Generate images */
  const generateImages = useCallback(
    async (fullPrompt: string) => {
      if (getAllocRemaining() <= 0) {
        setError('Daily allocation exhausted.')
        return
      }
      if (fullPrompt.trim().split(/\s+/).length < 3) {
        setError('Please enter at least 3 words.')
        return
      }

      setError('')
      setIsLoading(true)

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: fullPrompt, model, size, quality, count: 4 }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error ?? 'Generation failed')
          setIsLoading(false)
          return
        }

        const images: GeneratedImage[] = (data.images as string[]).map(
          (url) => ({ url, prompt: fullPrompt }),
        )
        setGeneratedImages(images)
        decrementAllocation()
      } catch {
        setError('Network error — check connection and try again.')
      }
      setIsLoading(false)
    },
    [model, size, quality, getAllocRemaining, decrementAllocation],
  )

  const handleGenerate = () => {
    generateImages(buildFullPrompt())
  }

  const handleUseExample = (examplePrompt: string) => {
    setPrompt(examplePrompt)
    generateImages(examplePrompt)
  }

  const handleOptionChange = (optionId: string, selected: string[]) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: selected }))
  }

  const handleClearAll = () => {
    setPrompt('')
    setError('')
    setGeneratedImages([])
    setSelectedOptions({})
    setShowAdvanced(false)
  }

  const handleDownload = async (url: string, index: number) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitDisabled || getAllocRemaining() <= 0) return
    handleGenerate()
  }

  return (
    <Authenticated>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl tracking-tight text-foreground-strong">
            {RISE_RENDER.name}
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Get the perfect unique and custom images for your project with AI.
          </p>
        </div>

        {!isGenerationEnabled ? (
          <div className="rounded-xl border border-edge bg-surface-alt px-8 py-6">
            <p className="text-sm text-foreground-secondary">
              {RISE_RENDER.killSwitchMessage}
            </p>
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            <div className="mb-8 flex w-fit gap-1 rounded-full border border-edge bg-surface-alt p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab('generate')}
                className={`rounded-full px-6 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
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
                className={`rounded-full px-6 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
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
                {/* Prompt section */}
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">
                        Your Text Prompt
                      </h2>
                      <p className="text-sm text-foreground-muted">
                        Describe in detail what you want the AI to create.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                      className="text-foreground-muted hover:text-foreground"
                    >
                      <Trash2 className="mr-2 size-4" />
                      Clear All
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="An expressionist oil painting of a futuristic adjustable bed"
                        maxLength={4000}
                        disabled={isLoading}
                        className="h-12"
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
                      {error && (
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
                          <AlertCircle className="size-3.5" />
                          {error}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Collapsible
                        open={showAdvanced}
                        onOpenChange={setShowAdvanced}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-12"
                          >
                            <Settings2 className="mr-2 size-4" />
                            Advanced
                          </Button>
                        </CollapsibleTrigger>
                      </Collapsible>
                      <Button
                        type="submit"
                        disabled={isSubmitDisabled || getAllocRemaining() <= 0}
                        className="h-12 min-w-[160px]"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Generating
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 size-4" />
                            Generate Images
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Settings row: model, size, quality */}
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
                </form>

                {/* Advanced options */}
                <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                  <CollapsibleContent>
                    <div className="mb-8 rounded-lg border border-edge bg-surface-alt p-4">
                      <h3 className="mb-4 text-sm font-semibold text-foreground">
                        Advanced Options
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories?.map((cat) => (
                          <MultiSelect
                            key={cat._id}
                            label={cat.name}
                            options={cat.options}
                            selected={selectedOptions[cat._id] ?? []}
                            onChange={(selected) =>
                              handleOptionChange(cat._id, selected)
                            }
                            placeholder={`Select ${cat.name.toLowerCase()}...`}
                          />
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Loading state */}
                {isLoading && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        Generating Images
                      </h3>
                      <div className="flex items-center gap-1">
                        <div
                          className="size-2 animate-bounce rounded-full bg-brand"
                          style={{ animationDelay: '0ms' }}
                        />
                        <div
                          className="size-2 animate-bounce rounded-full bg-brand"
                          style={{ animationDelay: '150ms' }}
                        />
                        <div
                          className="size-2 animate-bounce rounded-full bg-brand"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square animate-pulse rounded-lg bg-surface-alt"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Generated images */}
                {!isLoading && generatedImages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-semibold text-foreground">
                      Generated Images
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {generatedImages.map((image, index) => (
                        <Card key={index} className="group overflow-hidden">
                          <CardContent className="relative p-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image.url}
                              alt={`Generated image ${index + 1}`}
                              className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex flex-col items-end justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                              <div className="flex w-full gap-2 p-4">
                                <Button
                                  size="sm"
                                  className="flex-1"
                                  onClick={() =>
                                    handleDownload(image.url, index)
                                  }
                                >
                                  <Download className="mr-2 size-4" />
                                  Use Image
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => setSavingSlot(index)}
                                >
                                  <Save className="size-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example prompts (placeholder state) */}
                {!isLoading && generatedImages.length === 0 && !error && (
                  <div>
                    <h3 className="mb-4 text-sm font-semibold text-foreground">
                      Some Examples
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {EXAMPLE_PROMPTS.map((example) => (
                        <Card
                          key={example.id}
                          className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                          onClick={() => handleUseExample(example.prompt)}
                        >
                          <CardContent className="relative p-0">
                            <div className="flex aspect-square w-full items-center justify-center bg-surface-alt p-6">
                              <p className="line-clamp-6 text-center text-xs leading-relaxed text-foreground-muted">
                                {example.prompt}
                              </p>
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                              <p className="mb-1 text-xs font-medium tracking-wider text-white/70 uppercase">
                                {example.label}
                              </p>
                              <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-white">
                                {example.prompt}
                              </p>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="w-full"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUseExample(example.prompt)
                                }}
                              >
                                Use Prompt
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save dialog */}
                {savingSlot !== null && generatedImages[savingSlot] && (
                  <SaveDialog
                    imageUrl={generatedImages[savingSlot].url}
                    prompt={generatedImages[savingSlot].prompt}
                    model={model}
                    onClose={() => setSavingSlot(null)}
                    onSaved={() => setSavingSlot(null)}
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
