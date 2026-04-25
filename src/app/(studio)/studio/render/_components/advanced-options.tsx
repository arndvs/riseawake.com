'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

type Category = {
  _id: string
  name: string
  scope: string
  options: string[]
  sortOrder: number
}

type AdvancedOptionsProps = {
  categories: Category[]
  onSelect: (additions: string[]) => void
}

export function AdvancedOptions({ categories, onSelect }: AdvancedOptionsProps) {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({})

  const toggle = (categoryName: string, option: string) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(next[categoryName] ?? [])
      if (set.has(option)) {
        set.delete(option)
      } else {
        set.add(option)
      }
      next[categoryName] = set
      return next
    })
  }

  const handleApply = () => {
    const all: string[] = []
    for (const set of Object.values(selected)) {
      for (const val of set) {
        all.push(val)
      }
    }
    onSelect(all)
    setSelected({})
  }

  const handleClear = () => {
    setSelected({})
  }

  const totalSelected = Object.values(selected).reduce(
    (sum, set) => sum + set.size,
    0,
  )

  return (
    <div className="mt-3 rounded-2xl border border-edge bg-surface-alt p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-foreground-muted">
          Prompt Options
        </p>
        <div className="flex items-center gap-2">
          {totalSelected > 0 && (
            <>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground transition-colors"
              >
                <X className="size-3" />
                Clear
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-medium text-brand-on transition-colors hover:bg-brand-hover"
              >
                <Check className="size-3" />
                Add {totalSelected} to prompt
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {categories.map((cat) => (
          <div key={cat._id}>
            <p className="mb-2 text-xs font-medium text-foreground-secondary">
              {cat.name}
              {cat.scope === 'rise' && (
                <span className="ml-1.5 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] text-brand">
                  RISE
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cat.options.map((opt) => {
                const isSelected = selected[cat.name]?.has(opt) ?? false
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle(cat.name, opt)}
                    className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                      isSelected
                        ? 'bg-brand text-brand-on'
                        : 'bg-surface text-foreground-muted hover:text-foreground border border-edge-subtle'
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
