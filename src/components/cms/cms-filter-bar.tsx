'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface CmsFilterDef {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[]
}

export function CmsFilterBar({ filters, search, onSearchChange, searchPlaceholder, actions, count }: {
  filters?: CmsFilterDef[]
  search?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  actions?: ReactNode
  count?: number
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b bg-card px-6 py-3">
      {onSearchChange !== undefined && (
        <Input
          type="text"
          placeholder={searchPlaceholder ?? 'Search...'}
          value={search ?? ''}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-56 text-xs"
        />
      )}

      {filters?.map((filter) => (
        <Select key={filter.label} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="h-8 w-auto min-w-28 text-xs">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-xs">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {actions}

      {count !== undefined && (
        <span className={cn('ml-auto text-xs text-muted-foreground')}>
          {count} result{count !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  )
}
