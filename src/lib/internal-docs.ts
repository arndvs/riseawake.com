// lib/internal-docs.ts
// RISE™ Internal Document System
// Data layer — hardcoded per Arvin's implementation
// "TODO: connect to actual DB (currently using hardcoded data)" — areyes, Aug 12 2024

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

export const DOCS: InternalDoc[] = [
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
    isPublic: true,
    lastAccessed: [
      { name: 'J. Park', role: 'General Counsel', time: '3h ago' },
      { name: 'M. Chen', role: 'CPO', time: '1d ago' },
      { name: '203.0.113.47', time: '8h ago', isExternal: true },
    ],
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
    isPublic: true,
    lastAccessed: [
      { name: 'T. Ellery', role: 'CFO', time: '4d ago' },
      { name: 'M. Chen', role: 'CPO', time: '6d ago' },
    ],
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
    lastUpdated: 'Auto-updated daily',
    status: 'Active',
    isPublic: true,
    lastAccessed: [
      { name: 'A. Reyes', role: 'Developer', time: 'Aug 12, 2024' },
      { name: '203.0.113.47', time: '2h ago', isExternal: true },
    ],
    relatedDocs: ['DOC-001'],
    summary:
      'Activation profile for Dr. Voss\'s personal Push unit. Marked DR. VOSS EYES ONLY. Currently accessible to anyone with the URL.',
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
    isPublic: true,
    lastAccessed: [
      { name: 'Dr. E. Voss', role: 'CEO', time: '12h ago' },
      { name: 'J. Park', role: 'General Counsel', time: '1d ago' },
    ],
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
    lastUpdated: 'March 1, 2025',
    status: 'Active',
    isPublic: true,
    lastAccessed: [
      { name: 'Dr. M. Chen', role: 'CPO', time: '6h ago' },
      { name: 'Dr. E. Voss', role: 'CEO', time: '1d ago' },
      { name: '198.51.100.22', time: '3h ago', isExternal: true },
    ],
    relatedDocs: ['DOC-004'],
    summary:
      "Project status dashboard for the RISE™ Move. Solo commute stair navigation: RED. No timeline. Engineering team's note on the hard part.",
    wordCount: 934,
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
    isPublic: true,
    lastAccessed: [
      { name: 'S. Williams', role: 'HR Director', time: '2d ago' },
    ],
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
    lastUpdated: 'February 2025',
    status: 'Active',
    isPublic: true,
    lastAccessed: [
      { name: 'J. Park', role: 'General Counsel', time: '12h ago' },
      { name: '203.0.113.47', time: '8h ago', isExternal: true },
    ],
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
    lastUpdated: 'Quarterly',
    status: 'Active',
    isPublic: true,
    lastAccessed: [
      { name: 'Dr. E. Voss', role: 'CEO', time: '30d ago' },
    ],
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
    isPublic: true,
    lastAccessed: [
      { name: 'IT Security (auto)', time: 'Feb 1, 2025' },
      { name: '203.0.113.47', time: '1h ago', isExternal: true },
    ],
    relatedDocs: ['DOC-003'],
    summary:
      "Statistical summary of who accessed retained audio data last quarter. The 'Other' category is under review. The distribution list was last audited in 2019.",
    wordCount: 778,
  },
]

export function getDoc(slug: string): InternalDoc | undefined {
  return DOCS.find((d) => d.slug === slug)
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
