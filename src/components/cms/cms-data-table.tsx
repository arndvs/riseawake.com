'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface CmsColumn<T> {
  key: string
  header: string
  className?: string
  render: (row: T) => ReactNode
}

export function CmsDataTable<T extends { id: string | number }>({ columns, data, onRowClick, className }: {
  columns: CmsColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  className?: string
}) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          {columns.map((col) => (
            <TableHead key={col.key} className={cn('text-xs font-medium text-muted-foreground', col.className)}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            className={cn('border-border', onRowClick && 'cursor-pointer')}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((col) => (
              <TableCell key={col.key} className={cn('py-3 text-xs', col.className)}>
                {col.render(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
