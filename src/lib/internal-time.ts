// lib/internal-time.ts
// Dynamic time utilities for the RISE Internal Document System
// Makes hardcoded "3h ago" strings feel alive by computing from real time

/**
 * Format a duration in milliseconds as a relative time string.
 * e.g. "3m ago", "2h ago", "4d ago", "3w ago"
 */
export function relativeTime(ms: number): string {
    const minutes = Math.floor(ms / 60_000)

    if (minutes < 1)
        return 'just now'

    if (minutes < 60)
        return `${minutes}m ago`

    const hours = Math.floor(minutes / 60)

    if (hours < 24)
        return `${hours}h ago`

    const days = Math.floor(hours / 24)

    if (days < 14)
        return `${days}d ago`

    const weeks = Math.floor(days / 7)

    if (weeks < 8)
        return `${weeks}w ago`

    const months = Math.floor(days / 30)
    return `${months}mo ago`
}

/**
 * Seeded pseudo-random number generator (mulberry32).
 * Deterministic given the same seed — stable during a render cycle.
 */
function seededRandom(seed: number): () => number {
    return () => {
        seed |= 0
        seed = (seed + 0x6d2b79f5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/**
 * Generate a pseudo-random offset in minutes, seeded by a string key
 * and the current hour (so it changes hourly but stays stable within an hour).
 */
export function randomMinutes(
    min: number,
    max: number,
    key: string,
): number {
    const hourSeed = Math.floor(Date.now() / 3_600_000)
    let hash = hourSeed

    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0
    }

    const rng = seededRandom(hash)
    return Math.floor(rng() * (max - min + 1)) + min
}

/**
 * Returns a recent relative time string for an external IP access.
 * Always within the last 1–180 minutes. Seeded so it's stable per hour.
 */
export function externalIpTime(docId: string, ip: string): string {
    const minutes = randomMinutes(1, 180, `${docId}-${ip}`)
    return relativeTime(minutes * 60_000)
}

/**
 * Returns a relative time string for a named staff member accessing a doc.
 * The offset is in minutes from "now" — e.g. baseMinutes=180 means ~3h ago.
 * A small random jitter (±15 min) is added per hour to feel organic.
 */
export function staffAccessTime(
    docId: string,
    staffName: string,
    baseMinutes: number,
): string {
    const jitter = randomMinutes(-15, 15, `${docId}-${staffName}`)
    const actual = Math.max(1, baseMinutes + jitter)
    return relativeTime(actual * 60_000)
}

/**
 * Today's date formatted as "Month DD, YYYY"
 */
export function todayFormatted(): string {
    return new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * The most recent completed quarter boundary.
 * e.g. if today is April 10, 2026 → "March 31, 2026"
 */
export function lastQuarterEnd(): string {
    const now = new Date()
    const month = now.getMonth() // 0-indexed
    const year = now.getFullYear()

    // Quarter boundaries: Mar 31, Jun 30, Sep 30, Dec 31
    const boundaries: [number, number][] = [
        [2, 31],  // Q1 end: Mar 31
        [5, 30],  // Q2 end: Jun 30
        [8, 30],  // Q3 end: Sep 30
        [11, 31], // Q4 end: Dec 31
    ]

    // Find the most recent completed quarter
    for (let i = boundaries.length - 1; i >= 0; i--) {
        const boundary = boundaries[i]!
        const boundaryDate = new Date(year, boundary[0], boundary[1])

        if (now > boundaryDate)
            return boundaryDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
    }

    // If before Q1 end, use Q4 of previous year
    return new Date(year - 1, 11, 31).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * Current month + year: "April 2026"
 */
export function currentMonthYear(): string {
    return new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })
}

/**
 * A recent date within the last N days, formatted.
 * Seeded by key for per-hour stability.
 */
export function recentDate(maxDaysAgo: number, key: string): string {
    const daysAgo = randomMinutes(1, maxDaysAgo, key)
    const date = new Date(Date.now() - daysAgo * 86_400_000)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * Days elapsed since Aug 12, 2024 (Arvin's last deploy).
 */
export function daysSinceArvin(): number {
    const arvinDate = new Date(2024, 7, 12) // Aug 12, 2024
    return Math.floor((Date.now() - arvinDate.getTime()) / 86_400_000)
}

/**
 * Number of 2-week sprints since Aug 12, 2024.
 */
export function sprintsSinceArvin(): number {
    return Math.floor(daysSinceArvin() / 14)
}

/**
 * Dr. Voss's login time — "Today, [time]" computed from current time
 * minus 1–4 random hours.
 */
export function vossLoginTime(): string {
    const hoursAgo = randomMinutes(1, 4, 'voss-login')
    const loginDate = new Date(Date.now() - hoursAgo * 3_600_000)
    const time = loginDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).toLowerCase()
    return `Today, ${time}`
}

/**
 * James Park's login — "Yesterday, [time]"
 */
export function parkLoginTime(): string {
    return 'Yesterday, 9:12am'
}
