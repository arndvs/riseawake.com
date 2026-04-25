'use client'

import { useState, useCallback } from 'react'
import { Authenticated } from 'convex/react'
import { RISE_RENDER } from '@/lib/studio-config'
import { PromptInput } from './_components/prompt-input'
import { GenerationResults } from './_components/generation-results'
import { GenerationLoading } from './_components/generation-loading'
import { PlaceholderGallery } from './_components/placeholder-gallery'
import { SaveDialog } from './_components/save-dialog'

const isGenerationEnabled =
  process.env.NEXT_PUBLIC_GENERATION_ENABLED !== 'false'

type GenerationState = 'idle' | 'loading' | 'results'

export default function RenderPage() {
  const [generationState, setGenerationState] =
    useState<GenerationState>('idle')
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ])
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState<'dall-e-3' | 'gpt-image-1'>('dall-e-3')
  const [kept, setKept] = useState<boolean[]>([false, false, false, false])
  const [error, setError] = useState<string | null>(null)
  const [savingSlot, setSavingSlot] = useState<number | null>(null)

  // Allocation tracking (localStorage)
  const getAllocRemaining = useCallback(() => {
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

  const handleGenerate = useCallback(
    async (promptText: string, selectedModel: 'dall-e-3' | 'gpt-image-1') => {
      if (getAllocRemaining() <= 0) {
        setError('Daily allocation exhausted.')
        return
      }

      setPrompt(promptText)
      setModel(selectedModel)
      setError(null)
      setGenerationState('loading')
      setKept([false, false, false, false])

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: promptText, model: selectedModel }),
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
    [getAllocRemaining, decrementAllocation],
  )

  const handleRegenerate = useCallback(
    async (slotIndex: number) => {
      if (getAllocRemaining() <= 0) {
        setError('Daily allocation exhausted.')
        return
      }

      // Replace single slot
      setImages((prev) => {
        const next = [...prev]
        next[slotIndex] = null // show loading
        return next
      })

      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, model }),
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
    [prompt, model, getAllocRemaining, decrementAllocation],
  )

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

  const handleUsePrompt = useCallback(
    (samplePrompt: string) => {
      handleGenerate(samplePrompt, model)
    },
    [handleGenerate, model],
  )

  return (
    <Authenticated>
      <div className="flex flex-col gap-8 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground-strong">
            {RISE_RENDER.name}
          </h1>
          <p className="mt-2 text-xs tracking-[0.16em] text-foreground-muted uppercase">
            {RISE_RENDER.project}
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
            {/* Prompt Input */}
            <PromptInput
              onGenerate={handleGenerate}
              isLoading={generationState === 'loading'}
              allocRemaining={getAllocRemaining()}
              error={error}
            />

            {/* Results / Loading / Placeholder */}
            {generationState === 'loading' && <GenerationLoading />}

            {generationState === 'results' && (
              <GenerationResults
                images={images}
                kept={kept}
                prompt={prompt}
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
                prompt={prompt}
                model={model}
                onClose={() => setSavingSlot(null)}
                onSaved={handleSaved}
              />
            )}
          </>
        )}
      </div>
    </Authenticated>
  )
}
