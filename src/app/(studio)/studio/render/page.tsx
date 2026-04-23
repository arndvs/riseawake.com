'use client'

import { RISE_RENDER } from '@/lib/studio-config'

const isGenerationEnabled = process.env.NEXT_PUBLIC_GENERATION_ENABLED !== 'false'

export default function RenderPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="font-display text-3xl text-foreground-strong">{RISE_RENDER.name}</h1>
      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-foreground-muted">{RISE_RENDER.project}</p>

      {isGenerationEnabled ? (
        <div className="mt-12 w-full max-w-2xl rounded-2xl border border-dashed border-edge-strong p-16">
          <p className="text-sm text-foreground-muted">Production environment ready. Generation tools will appear here.</p>
        </div>
      ) : (
        <div className="mt-12 rounded-xl border border-edge bg-surface-alt px-8 py-6">
          <p className="text-sm text-foreground-secondary">{RISE_RENDER.killSwitchMessage}</p>
        </div>
      )}
    </div>
  )
}
