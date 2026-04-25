'use client'

import { useState, useMemo } from 'react'
import { Check, X, Search } from 'lucide-react'

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
  onToggleOption?: (option: string, added: boolean) => void
}

export function AdvancedOptions({ categories, onSelect, onToggleOption }: AdvancedOptionsProps) {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({})
  const [search, setSearch] = useState('')

  const toggle = (categoryName: string, option: string) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(next[categoryName] ?? [])
      const wasSelected = set.has(option)
      if (wasSelected) {
        set.delete(option)
      } else {
        set.add(option)
      }
      next[categoryName] = set
      onToggleOption?.(option, !wasSelected)
      return next
    })
  }

  const removeChip = (categoryName: string, option: string) => {
    setSelected((prev) => {
      const next = { ...prev }
      const set = new Set(next[categoryName] ?? [])
      set.delete(option)
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
    setSearch('')
  }

  const handleClear = () => {
    setSelected({})
  }

  const totalSelected = Object.values(selected).reduce(
    (sum, set) => sum + set.size,
    0,
  )

  const allChips = useMemo(() => {
    const chips: { category: string; option: string }[] = []
    for (const [category, set] of Object.entries(selected)) {
      for (const option of set) {
        chips.push({ category, option })
      }
    }
    return chips
  }, [selected])

  const query = search.toLowerCase().trim()

  const filteredCategories = useMemo(() => {
    if (!query) return categories
    return categories
      .map((cat) => ({
        ...cat,
        options: cat.options.filter((opt) =>
          opt.toLowerCase().includes(query),
        ),
      }))
      .filter((cat) => cat.options.length > 0)
  }, [categories, query])

  return (
    <div className="mt-3 rounded-2xl border border-edge bg-surface-alt p-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter options…"
            className="w-full rounded-lg border border-edge-subtle bg-surface py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-foreground-muted focus:border-brand focus:outline-none"
          />
        </div>

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

      {/* Selected chips */}
      {allChips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allChips.map((chip) => (
            <span
              key={`${chip.category}-${chip.option}`}
              className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2.5 py-1 text-xs text-brand"
            >
              {chip.option}
              <button
                type="button"
                onClick={() => removeChip(chip.category, chip.option)}
                className="hover:text-brand-hover transition-colors"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Category pills */}
      <div className="mt-4 space-y-4 max-h-80 overflow-y-auto">
        {filteredCategories.map((cat) => (
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
        {query && filteredCategories.length === 0 && (
          <p className="py-4 text-center text-xs text-foreground-muted">
            No options match &ldquo;{search}&rdquo;
          </p>
        )}
      </div>
    </div>
  )
}
