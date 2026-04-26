'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'

type Category = {
  _id: string
  name: string
  scope: string
  options: string[]
  sortOrder: number
}

type AdvancedOptionsProps = {
  categories: Category[]
  onToggleOption?: (option: string, added: boolean) => void
}

function CategoryCombobox({
  category,
  selected,
  onToggle,
}: {
  category: Category
  selected: Set<string>
  onToggle: (option: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return category.options
    const q = search.toLowerCase()
    return category.options.filter((opt) => opt.toLowerCase().includes(q))
  }, [category.options, search])

  const selectedItems = category.options.filter((opt) => selected.has(opt))

  return (
    <div ref={ref} className="relative">
      <label className="mb-1.5 block text-xs font-medium text-foreground-secondary">
        {category.name}
        {category.scope === 'rise' && (
          <span className="ml-1.5 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] text-brand">
            RISE
          </span>
        )}
      </label>

      {/* Trigger / input */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-edge bg-surface px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-brand focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
      >
        <span className={selected.size > 0 ? 'text-foreground' : 'text-foreground-muted'}>
          {selected.size > 0
            ? `${selected.size} selected`
            : `Select ${category.name.toLowerCase()}…`}
        </span>
        <ChevronDown
          className={`size-3.5 text-foreground-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Selected chips */}
      {selectedItems.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {selectedItems.map((opt) => (
            <span
              key={opt}
              className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[11px] text-brand"
            >
              {opt}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle(opt)
                }}
                className="transition-colors hover:text-brand-hover"
              >
                <X className="size-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-edge bg-surface shadow-lg">
          {/* Search input inside dropdown */}
          <div className="border-b border-edge p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${category.name.toLowerCase()}…`}
              className="w-full rounded border-none bg-transparent px-2 py-1 text-xs text-foreground placeholder:text-foreground-muted focus:outline-none"
              autoFocus
            />
          </div>

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto p-1">
            {filtered.length > 0 ? (
              filtered.map((opt) => {
                const isSelected = selected.has(opt)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onToggle(opt)}
                    className={`flex w-full items-center rounded px-2 py-1.5 text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-brand/10 text-brand'
                        : 'text-foreground-muted hover:bg-surface-alt hover:text-foreground'
                    }`}
                  >
                    <span
                      className={`mr-2 flex size-3.5 shrink-0 items-center justify-center rounded border text-[10px] ${
                        isSelected
                          ? 'border-brand bg-brand text-brand-on'
                          : 'border-edge'
                      }`}
                    >
                      {isSelected && '✓'}
                    </span>
                    {opt}
                  </button>
                )
              })
            ) : (
              <p className="px-2 py-3 text-center text-xs text-foreground-muted">
                No matches
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function AdvancedOptions({
  categories,
  onToggleOption,
}: AdvancedOptionsProps) {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({})

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

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((cat) => (
        <CategoryCombobox
          key={cat._id}
          category={cat}
          selected={selected[cat.name] ?? new Set()}
          onToggle={(opt) => toggle(cat.name, opt)}
        />
      ))}
    </div>
  )
}
