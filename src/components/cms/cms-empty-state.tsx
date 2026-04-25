import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function CmsEmptyState({ icon, title, description, action, className }: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-24', className)}>
      {icon && (
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <p className="mb-2 text-sm font-medium">{title}</p>
      {description && (
        <p className="mb-8 max-w-sm text-center text-xs leading-relaxed text-muted-foreground">{description}</p>
      )}
      {action}
    </div>
  )
}
