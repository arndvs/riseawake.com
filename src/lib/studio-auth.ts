import { RISE_RENDER } from './studio-config'

const STORAGE_KEY = 'rise-render-allocation'

type AllocationRecord = {
  date: string
  used: number
}

function getRecord(): AllocationRecord {
  if (typeof window === 'undefined') return { date: '', used: 0 }

  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) return { date: new Date().toISOString().slice(0, 10), used: 0 }

  try {
    const record = JSON.parse(raw) as AllocationRecord
    const today = new Date().toISOString().slice(0, 10)

    if (record.date !== today) return { date: today, used: 0 }

    return record
  } catch {
    return { date: new Date().toISOString().slice(0, 10), used: 0 }
  }
}

function saveRecord(record: AllocationRecord): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

export function getRemainingAllocations(): number {
  const record = getRecord()

  return Math.max(0, RISE_RENDER.allocationLimit - record.used)
}

export function decrementAllocation(): { allowed: boolean; remaining: number } {
  const record = getRecord()
  const remaining = RISE_RENDER.allocationLimit - record.used

  if (remaining <= 0) return { allowed: false, remaining: 0 }

  const updated = { date: record.date, used: record.used + 1 }

  saveRecord(updated)

  return { allowed: true, remaining: remaining - 1 }
}

export function isGenerationEnabled(): boolean {
  return process.env.NEXT_PUBLIC_GENERATION_ENABLED !== 'false'
}
