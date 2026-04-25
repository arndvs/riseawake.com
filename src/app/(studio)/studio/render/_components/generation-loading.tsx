'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function GenerationLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 px-1">
        <Skeleton className="h-3 w-48 rounded-full" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

      <p className="mt-4 text-center text-xs text-foreground-muted animate-pulse">
        Generating 4 variations&hellip;
      </p>
    </div>
  )
}
