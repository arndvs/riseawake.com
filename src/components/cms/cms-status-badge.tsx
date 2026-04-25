'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type CmsStatusVariant = 'success' | 'error' | 'warning' | 'info' | 'muted'

const variantClasses: Record<CmsStatusVariant, string> = {
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  error: 'bg-red-500/15 text-red-400 border-red-500/30',
  warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  muted: 'bg-muted text-muted-foreground border-border',
}

export function CmsStatusBadge({ children, variant, className }: { children: ReactNode; variant: CmsStatusVariant; className?: string }) {
  return (
    <Badge variant="outline" className={cn('rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase', variantClasses[variant], className)}>
      {children}
    </Badge>
  )
}
