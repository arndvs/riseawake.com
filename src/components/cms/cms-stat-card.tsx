import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export function CmsStatCard({ label, value, sub, icon, className }: {
  label: string
  value: ReactNode
  sub?: string
  icon?: ReactNode
  className?: string
}) {
  return (
    <Card className={cn('rounded-sm', className)}>
      <CardContent className="flex items-start gap-3 px-4 py-3">
        {icon && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
