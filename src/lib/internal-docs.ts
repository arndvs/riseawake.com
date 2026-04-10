// lib/internal-docs.ts
// RISE™ Internal Document System
// Data layer — hardcoded per Arvin's implementation
// "TODO: connect to actual DB (currently using hardcoded data)" — areyes, Aug 12 2024

import {
  currentMonthYear,
  externalIpTime,
  lastQuarterEnd,
  recentDate,
  staffAccessTime,
  todayFormatted,
} from './internal-time'

export type Classification =
  | 'INTERNAL'
  | 'CONFIDENTIAL'
  | 'RESTRICTED'
  | 'DR. VOSS EYES ONLY'

export type DocStatus =
  | 'Active'
  | 'Under Review'
  | 'Archived'
  | 'Awaiting Legal Review'

export interface AccessEntry {
  name: string
  role?: string
  time: string
  isExternal?: boolean
}

export interface InternalDoc {
  id: string
  slug: string
  title: string
  classification: Classification
  author: string
  department: string
  date: string
  lastUpdated: string
  status: DocStatus
  isPublic: boolean // default: true — arvin never built the toggle
  lastAccessed: AccessEntry[]
  relatedDocs: string[]
  summary: string
  wordCount: number
}

// ─── Static doc metadata (lore dates never change) ──────────────────────────

interface DocSeed {
  id: string
  slug: string
  title: string
  classification: Classification
  author: string
  department: string
  date: string // fixed lore date — never changes
  lastUpdated: string | 'DYNAMIC'
  status: DocStatus
  relatedDocs: string[]
  summary: string
  wordCount: number
}

const DOC_SEEDS: DocSeed[] = [
  {
    id: 'DOC-001',
    slug: 'push-mode-incident-log-q4-2024',
    title: 'Push Mode Incident Log — Q4 2024',
    classification: 'CONFIDENTIAL',
    author: 'Quality Assurance Team',
    department: 'QA / Product',
    date: 'January 15, 2025',
    lastUpdated: 'January 15, 2025',
    status: 'Active',
    relatedDocs: ['DOC-003', 'DOC-007'],
    summary:
      'Quarterly incident report covering all Push Mode anomalies, solo commute incidents, and third-party encounters. 23 incidents total. Resolution rate 91%.',
    wordCount: 1847,
  },
  {
    id: 'DOC-002',
    slug: 'nudge-discontinuation-memo',
    title: 'Nudge Product Line Discontinuation — Internal Memo',
    classification: 'INTERNAL',
    author: 'Dr. Eleanor Voss',
    department: 'Executive',
    date: 'November 14, 2018',
    lastUpdated: 'November 14, 2018',
    status: 'Archived',
    relatedDocs: [],
    summary:
      "Dr. Voss's internal memo announcing Nudge discontinuation. Contains unfiltered assessment of the 74% compliance rate. Archived but accessible.",
    wordCount: 623,
  },
  {
    id: 'DOC-003',
    slug: 'dr-voss-push-configuration',
    title: 'Dr. Voss — Personal Push Configuration Profile',
    classification: 'DR. VOSS EYES ONLY',
    author: 'IT / Activation Team',
    department: 'Information Technology',
    date: 'January 3, 2021',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: ['DOC-001'],
    summary:
      "Activation profile for Dr. Voss's personal Push unit. Marked DR. VOSS EYES ONLY. Currently accessible to anyone with the URL.",
    wordCount: 412,
  },
  {
    id: 'DOC-004',
    slug: 'push-pro-development-notes',
    title: 'The Push Pro — Internal Development Notes',
    classification: 'RESTRICTED',
    author: 'Dr. Mara Chen, CPO',
    department: 'Product / R&D',
    date: 'Various',
    lastUpdated: 'February 2025',
    status: 'Under Review',
    relatedDocs: ['DOC-005'],
    summary:
      'Internal development notes for the Push Pro. Most sections redacted per legal review. Cover page and table of contents visible.',
    wordCount: 289,
  },
  {
    id: 'DOC-005',
    slug: 'move-engineering-status',
    title: 'RISE™ Move — Engineering Status Report',
    classification: 'CONFIDENTIAL',
    author: 'R&D Team',
    department: 'Research & Development',
    date: 'March 1, 2025',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: ['DOC-004'],
    summary:
      "Project status dashboard for the RISE™ Move. Solo commute stair navigation: RED. No timeline. Engineering team's note on the hard part.",
    wordCount: 1847,
  },
  {
    id: 'DOC-006',
    slug: 'hr-push-mode-workplace-waiver',
    title: 'Push Mode Workplace Enrollment Waiver — HR Template',
    classification: 'INTERNAL',
    author: 'Human Resources',
    department: 'Human Resources',
    date: 'March 15, 2023',
    lastUpdated: 'March 15, 2023',
    status: 'Awaiting Legal Review',
    relatedDocs: [],
    summary:
      'Template waiver for corporate wellness partners. Not reviewed by employment counsel in any jurisdiction. Status: Awaiting Legal Review since March 2023.',
    wordCount: 1203,
  },
  {
    id: 'DOC-007',
    slug: 'solo-commute-incident-archive',
    title: 'Solo Commute Incident Archive — Selected Cases',
    classification: 'CONFIDENTIAL',
    author: 'Customer Experience / Legal',
    department: 'Legal / CX',
    date: 'Ongoing',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: ['DOC-001'],
    summary:
      'Curated selection from the solo commute incident archive. SC-0047 through SC-0134. The coffee shop. The parking ticket. The dog.',
    wordCount: 2104,
  },
  {
    id: 'DOC-008',
    slug: 'rise-index-methodology',
    title: 'RISE™ Index Methodology — Internal Reference',
    classification: 'RESTRICTED',
    author: 'Data Science Team',
    department: 'Data Science',
    date: 'April 1, 2022',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: [],
    summary:
      'The proprietary RISE™ Index methodology document the Terms of Service says is not disclosed. The methodology section is entirely redacted. The document is not.',
    wordCount: 156,
  },
  {
    id: 'DOC-009',
    slug: 'audio-data-access-log-summary',
    title: 'Audio Data Access Log — Q1 2025 Summary',
    classification: 'CONFIDENTIAL',
    author: 'IT Security',
    department: 'Information Technology',
    date: 'February 1, 2025',
    lastUpdated: 'February 1, 2025',
    status: 'Active',
    relatedDocs: ['DOC-003'],
    summary:
      "Statistical summary of who accessed retained audio data last quarter. The 'Other' category is under review. The distribution list was last audited in 2019.",
    wordCount: 778,
  },
]

// ─── Dynamic access log definitions ─────────────────────────────────────────
// Each doc defines its access pattern: who accessed it, how long ago (in minutes
// as a base offset), and which external IPs are watching.

interface AccessPattern {
  staff: { name: string; role: string; baseMinutes: number }[]
  externals: { ip: string }[]
  fixed?: { name: string; role?: string; time: string; isExternal?: boolean }[]
}

const ACCESS_PATTERNS: Record<string, AccessPattern> = {
  'DOC-001': {
    staff: [
      { name: 'J. Park', role: 'General Counsel', baseMinutes: 180 },
      { name: 'M. Chen', role: 'CPO', baseMinutes: 1440 },
    ],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-002': {
    // Archived doc — access times should feel old, not recent
    staff: [
      { name: 'T. Ellery', role: 'CFO', baseMinutes: 20160 }, // ~2 weeks
      { name: 'M. Chen', role: 'CPO', baseMinutes: 30240 }, // ~3 weeks
    ],
    externals: [],
  },
  'DOC-003': {
    staff: [],
    externals: [{ ip: '203.0.113.47' }],
    // Arvin's access is a lore date — fixed forever
    fixed: [{ name: 'A. Reyes', role: 'Developer', time: 'Aug 12, 2024' }],
  },
  'DOC-004': {
    staff: [
      { name: 'Dr. E. Voss', role: 'CEO', baseMinutes: 720 },
      { name: 'J. Park', role: 'General Counsel', baseMinutes: 1440 },
    ],
    externals: [],
  },
  'DOC-005': {
    staff: [
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 360 },
      { name: 'Dr. E. Voss', role: 'CEO', baseMinutes: 1440 },
    ],
    externals: [{ ip: '198.51.100.22' }],
  },
  'DOC-006': {
    staff: [{ name: 'S. Williams', role: 'HR Director', baseMinutes: 2880 }],
    externals: [],
  },
  'DOC-007': {
    staff: [{ name: 'J. Park', role: 'General Counsel', baseMinutes: 720 }],
    externals: [{ ip: '203.0.113.47' }, { ip: '192.0.2.91' }],
  },
  'DOC-008': {
    staff: [
      { name: 'Dr. E. Voss', role: 'CEO', baseMinutes: 43200 }, // ~30 days
    ],
    externals: [],
  },
  'DOC-009': {
    staff: [],
    externals: [{ ip: '203.0.113.47' }],
    fixed: [{ name: 'IT Security (auto)', time: 'Feb 1, 2025' }],
  },
}

// ─── Dynamic lastUpdated resolution ─────────────────────────────────────────

function resolveDynamicLastUpdated(seed: DocSeed): string {
  if (seed.lastUpdated !== 'DYNAMIC') return seed.lastUpdated

  switch (seed.id) {
    case 'DOC-003':
      return `Auto-updated daily · ${todayFormatted()}`
    case 'DOC-005':
      return recentDate(14, 'DOC-005-updated')
    case 'DOC-007':
      return currentMonthYear()
    case 'DOC-008':
      return `Quarterly · ${lastQuarterEnd()}`
    default:
      return todayFormatted()
  }
}

// ─── Build live docs array ──────────────────────────────────────────────────

function buildAccessLog(docId: string): AccessEntry[] {
  const pattern = ACCESS_PATTERNS[docId]

  if (!pattern) return []

  const entries: AccessEntry[] = []

  // Fixed entries first (lore dates like Arvin's)
  if (pattern.fixed) {
    for (const f of pattern.fixed) {
      entries.push({
        name: f.name,
        role: f.role,
        time: f.time,
        isExternal: f.isExternal,
      })
    }
  }

  // Dynamic staff access times
  for (const s of pattern.staff) {
    entries.push({
      name: s.name,
      role: s.role,
      time: staffAccessTime(docId, s.name, s.baseMinutes),
    })
  }

  // External IP access — always recent, always unsettling
  for (const ext of pattern.externals) {
    entries.push({
      name: ext.ip,
      time: externalIpTime(docId, ext.ip),
      isExternal: true,
    })
  }

  return entries
}

export function getDocs(): InternalDoc[] {
  return DOC_SEEDS.map((seed) => ({
    ...seed,
    isPublic: true,
    lastUpdated: resolveDynamicLastUpdated(seed),
    lastAccessed: buildAccessLog(seed.id),
  }))
}

// Keep a static export for backward compatibility (used by imports that
// destructure DOCS). This is evaluated once at module load on the client.
export const DOCS: InternalDoc[] = getDocs()

export function getDoc(slug: string): InternalDoc | undefined {
  return getDocs().find((d) => d.slug === slug)
}

export const CLASSIFICATION_COLORS: Record<
  Classification,
  { bg: string; text: string; border: string }
> = {
  INTERNAL: {
    bg: 'rgba(255,255,255,0.06)',
    text: '#9d9d9d',
    border: 'rgba(255,255,255,0.1)',
  },
  CONFIDENTIAL: {
    bg: 'rgba(234,179,8,0.12)',
    text: '#eab308',
    border: 'rgba(234,179,8,0.2)',
  },
  RESTRICTED: {
    bg: 'rgba(239,68,68,0.12)',
    text: '#ef4444',
    border: 'rgba(239,68,68,0.2)',
  },
  'DR. VOSS EYES ONLY': {
    bg: 'rgba(42,92,219,0.12)',
    text: '#4c7cff',
    border: 'rgba(42,92,219,0.25)',
  },
}

export const STATUS_COLORS: Record<DocStatus, { dot: string; text: string }> = {
  Active: { dot: '#22c55e', text: '#22c55e' },
  'Under Review': { dot: '#eab308', text: '#eab308' },
  Archived: { dot: '#6b7280', text: '#6b7280' },
  'Awaiting Legal Review': { dot: '#f97316', text: '#f97316' },
}
