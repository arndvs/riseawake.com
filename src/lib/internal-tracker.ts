// lib/internal-tracker.ts
// Persistent visitor breach tracker for the RISE™ Internal Document System
// Stores accessed docs + visitor IP in localStorage.
// The login is sessionStorage (ephemeral). The tracking is localStorage (permanent).
// The asymmetry IS the joke.

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'rise-breach'

export interface BreachDocEntry {
  id: string
  slug: string
  title: string
  firstSeen: number
  lastSeen: number
}

export interface BreachRecord {
  ip: string | null
  docs: BreachDocEntry[]
  itNotifications: number
  firstSeen: number
}

function emptyRecord(): BreachRecord {
  return { ip: null, docs: [], itNotifications: 0, firstSeen: Date.now() }
}

export function getBreachRecord(): BreachRecord {
  if (typeof window === 'undefined') return emptyRecord()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyRecord()
    return JSON.parse(raw) as BreachRecord
  } catch {
    return emptyRecord()
  }
}

function saveBreachRecord(record: BreachRecord): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

export function recordDocVisit(
  docId: string,
  slug: string,
  title: string,
  ip: string | null,
): void {
  const record = getBreachRecord()

  if (ip) record.ip = ip

  if (!record.firstSeen) record.firstSeen = Date.now()

  const existing = record.docs.find((d) => d.id === docId)
  if (existing) {
    existing.lastSeen = Date.now()
  } else {
    record.docs.push({
      id: docId,
      slug,
      title,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
    })
    // Each new doc triggers one IT notification. The number only goes up.
    record.itNotifications = record.docs.length
  }

  saveBreachRecord(record)
}

/**
 * Hook: reads breach record on mount, re-reads after any recordDocVisit call.
 * Returns [record, refresh] — call refresh() after recording a visit to update the UI.
 */
export function useBreachRecord(): [BreachRecord, () => void] {
  const [record, setRecord] = useState<BreachRecord>(emptyRecord)

  const refresh = useCallback(() => {
    setRecord(getBreachRecord())
  }, [])

  useEffect(() => {
    setRecord(getBreachRecord())
  }, [])

  return [record, refresh]
}

/**
 * Build the escalation text for in-content breach notes.
 * Tone adapts: 1-2 docs factual, 3-5 resigned, 6+ deeply resigned.
 */
export function breachNarrative(record: BreachRecord, currentDocId: string): string {
  const ip = record.ip ?? 'Unknown IP'
  const count = record.docs.length
  const ids = record.docs.map((d) => d.id)
  const notifications = record.itNotifications

  if (count <= 1) {
    return `This document has been accessed by IP ${ip} within the last hour. IT security has been notified. IT security is aware. The document remains accessible.`
  }

  const otherIds = ids.filter((id) => id !== currentDocId)
  const idList =
    otherIds.length <= 4
      ? otherIds.join(', ') + ', and this document'
      : otherIds.slice(0, 4).join(', ') + `, and ${otherIds.length - 4} other document${otherIds.length - 4 === 1 ? '' : 's'}`

  const notifText =
    notifications === 1
      ? 'once'
      : notifications === 2
        ? 'twice'
        : `${notifications} times`

  if (count <= 3) {
    return `This document has been accessed by IP ${ip} within the last hour. ${ip} has now accessed ${count} documents from this system today: ${idList}. IT security has been notified ${notifText} today. IT security is aware. The documents remain accessible.`
  }

  if (count <= 5) {
    return `This document has been accessed by IP ${ip} within the last hour. ${ip} has now accessed ${count} documents from this system today: ${idList}. IT security has been notified ${notifText} today. IT security is aware. IT security has been aware for some time. The documents remain accessible.`
  }

  return `This document has been accessed by IP ${ip} within the last hour. ${ip} has now accessed ${count} documents from this system today: ${idList}. IT security has been notified ${notifText} today. IT security is aware. IT security has been aware since the first notification. IT security will continue to be aware. The documents remain accessible. They have always been accessible.`
}
