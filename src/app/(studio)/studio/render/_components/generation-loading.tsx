'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function GenerationLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Section heading (matches GenerationResults) */}
      <div className="mb-3 flex items-center gap-2">
        <h4 className="text-sm font-semibold text-foreground">
          Generating Images
        </h4>
        {/* Loading dots (ripemetrics style) */}
        <svg
          width="40"
          height="16"
          viewBox="0 0 132 58"
          className="text-foreground-muted"
        >
          <circle
            cx="25"
            cy="30"
            r="10"
            fill="currentColor"
            opacity="0.4"
            style={{ animation: 'load 1s infinite' }}
          />
          <circle
            cx="65"
            cy="30"
            r="10"
            fill="currentColor"
            opacity="0.6"
            style={{ animation: 'load 1s infinite', animationDelay: '0.2s' }}
          />
          <circle
            cx="105"
            cy="30"
            r="10"
            fill="currentColor"
            opacity="0.8"
            style={{ animation: 'load 1s infinite', animationDelay: '0.4s' }}
          />
        </svg>
        <style>{`@keyframes load { 0% { opacity: 0; } 50% { opacity: 1; } 100% { opacity: 0; } }`}</style>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-1.5">
              <Skeleton className="h-7 flex-1 rounded-full" />
              <Skeleton className="h-7 w-9 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
