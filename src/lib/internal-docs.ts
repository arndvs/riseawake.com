// lib/internal-docs.ts
// RISE Internal Document System
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
    title: 'RISE Move — Engineering Status Report',
    classification: 'CONFIDENTIAL',
    author: 'R&D Team',
    department: 'Research & Development',
    date: 'March 1, 2025',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: ['DOC-004'],
    summary:
      "Project status dashboard for the RISE Move. Solo commute stair navigation: RED. No timeline. Engineering team's note on the hard part.",
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
    title: 'RISE Index Methodology — Internal Reference',
    classification: 'RESTRICTED',
    author: 'Data Science Team',
    department: 'Data Science',
    date: 'April 1, 2022',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: [],
    summary:
      'The proprietary RISE Index methodology document the Terms of Service says is not disclosed. The methodology section is entirely redacted. The document is not.',
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
  {
    id: 'DOC-010',
    slug: 'push-mode-headline-swipe-file',
    title: 'Push Mode — Headline Swipe File & Performance Analysis',
    classification: 'CONFIDENTIAL',
    author: 'Growth Marketing / External Consultant (Halbert Method)',
    department: 'Marketing',
    date: 'September 14, 2023',
    lastUpdated: 'September 14, 2023',
    status: 'Active',
    relatedDocs: ['DOC-011', 'DOC-012'],
    summary:
      "30 direct response headlines for Push Mode generated via the Halbert method. Performance notes and legal flags attached. Three headlines still under review. The consultant's invoice has not been paid.",
    wordCount: 2847,
  },
  {
    id: 'DOC-011',
    slug: 'push-mode-buying-agenda-matrix',
    title: 'Push Mode — Buyer Agenda Matrix & Conflict Resolution',
    classification: 'CONFIDENTIAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'September 14, 2023',
    lastUpdated: 'October 2, 2023',
    status: 'Under Review',
    relatedDocs: ['DOC-010', 'DOC-012'],
    summary:
      "Psychographic buying agenda analysis for the Push Mode customer. Seven agendas scored. The Warrior agenda scores highest. The Mourner agenda scored higher than expected. Dr. Voss has requested a follow-up meeting.",
    wordCount: 1923,
  },
  {
    id: 'DOC-012',
    slug: 'push-mode-attention-cluster-analysis',
    title: 'Push Mode — Attention Cluster & Reptilian Trigger Mapping',
    classification: 'RESTRICTED',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'October 2, 2023',
    lastUpdated: 'October 2, 2023',
    status: 'Awaiting Legal Review',
    relatedDocs: ['DOC-010', 'DOC-011'],
    summary:
      "Reptilian brain trigger mapping for Push Mode marketing. Identifies the 6 core survival signals the product activates. Legal flagged sections 3 and 5. The consultant described the product as 'a marketer\\'s dream.' This document is under review.",
    wordCount: 2104,
  },
  {
    id: 'DOC-013',
    slug: 'push-mode-storybrand-playbook',
    title: 'Push Mode — StoryBrand SB7 Playbook (Internal)',
    classification: 'INTERNAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'November 3, 2023',
    lastUpdated: 'November 3, 2023',
    status: 'Active',
    relatedDocs: ['DOC-010', 'DOC-011', 'DOC-014'],
    summary:
      "Full StoryBrand SB7 BrandScript applied to Push Mode. All seven framework elements completed. The villain is Monday morning. The guide is RISE. The call to action is one button. Legal reviewed and approved all sections except the 'Avoiding Failure' messaging, which is under separate review.",
    wordCount: 3241,
  },
  {
    id: 'DOC-014',
    slug: 'push-mode-brand-identity-suite',
    title: 'Push Mode — Brand Identity Suite (Mission / Vision / WHY)',
    classification: 'INTERNAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'November 17, 2023',
    lastUpdated: 'November 17, 2023',
    status: 'Under Review',
    relatedDocs: ['DOC-013'],
    summary:
      "RISE brand mission, vision, and WHY statements developed via Golden Circle and Start With Why frameworks. Dr. Voss reviewed and returned with two annotations. Both annotations are included verbatim. The document remains under review pending Dr. Voss's approval of the WHY statement, which she described as 'close but not right yet.'",
    wordCount: 2876,
  },
  {
    id: 'DOC-015',
    slug: 'content-marketing-blog-playbook',
    title: 'Content Marketing — Blog Creation Process Playbook',
    classification: 'INTERNAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'December 4, 2023',
    lastUpdated: 'February 14, 2024',
    status: 'Active',
    relatedDocs: ['DOC-013'],
    summary:
      'Standard blog content creation playbook. Nine phases, 22 days average. Includes quality standards, SEO requirements, and brand voice guidelines. Applied to RISE without modification. The brand voice section references a template that does not exist. Several phases have been annotated by team members. Phase 6 (Client Review) has the most annotations.',
    wordCount: 1847,
  },
  {
    id: 'DOC-016',
    slug: 'push-mode-customer-avatar-canvas',
    title: 'Push Mode — Customer Avatar Canvas Worksheet',
    classification: 'CONFIDENTIAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'October 18, 2023',
    lastUpdated: 'November 1, 2023',
    status: 'Active',
    relatedDocs: ['DOC-011', 'DOC-017', 'DOC-018'],
    summary:
      "Completed Customer Avatar Canvas for the Push Mode primary buyer. Avatar name: David K. Before State morning routine described in detail. After State completed. Good vs. Evil section has a note from Dr. Voss. Section 9 (Marketing Message) was filled in by the consultant and then crossed out and rewritten by Dr. Voss. Both versions are preserved.",
    wordCount: 2103,
  },
  {
    id: 'DOC-017',
    slug: 'push-mode-value-journey-worksheet',
    title: 'Push Mode — Value Journey Worksheet & Action Plan',
    classification: 'INTERNAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'October 18, 2023',
    lastUpdated: 'October 18, 2023',
    status: 'Active',
    relatedDocs: ['DOC-016', 'DOC-018'],
    summary:
      'Value Journey mapping for Push Mode across 8 stages: Aware through Promote. The Excite stage has the longest entry. The Convert stage notes that the product is sold out and the conversion funnel ends at waitlist registration. The Ascend stage is two lines. RISE does not have an upsell. The Push Pro is not confirmed. The Move is not available.',
    wordCount: 1654,
  },
  {
    id: 'DOC-018',
    slug: 'push-mode-sub-testimonial-strategy',
    title: 'Push Mode — Sub-Testimonial & Social Proof Strategy',
    classification: 'INTERNAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'November 1, 2023',
    lastUpdated: 'November 1, 2023',
    status: 'Awaiting Legal Review',
    relatedDocs: ['DOC-016', 'DOC-017'],
    summary:
      'Social proof and testimonial strategy for Push Mode. Recommends sub-testimonials (third-party research citations in testimonial format) as primary proof mechanism. Legal has flagged the section on compliance framing. The document also addresses why RISE does not need testimonials in the traditional sense and why this is a problem anyway.',
    wordCount: 1432,
  },
  {
    id: 'DOC-019',
    slug: 'push-mode-proof-of-concept-validation',
    title: 'Push Mode — Proof of Product Concept Validation Report',
    classification: 'INTERNAL',
    author: 'Growth Marketing / External Consultant',
    department: 'Marketing',
    date: 'January 9, 2024',
    lastUpdated: 'January 9, 2024',
    status: 'Active',
    relatedDocs: ['DOC-016', 'DOC-017', 'DOC-018'],
    summary:
      'Retroactive proof of concept validation for Push Mode. Completed January 2024. The product has been on the market since 2021. The waitlist is 340,000 people. The document is required by the investor relations team for the pre-IPO due diligence package. Several sections were completed as summaries of existing data rather than original research.',
    wordCount: 2891,
  },
  {
    id: 'DOC-020',
    slug: 'platform-architecture-history',
    title: 'Platform Architecture History — 2009 to Present',
    classification: 'RESTRICTED',
    author: 'Dr. Mara Chen, CPO',
    department: 'Engineering',
    date: 'March 22, 2025',
    lastUpdated: 'DYNAMIC',
    status: 'Active',
    relatedDocs: ['DOC-004', 'DOC-005'],
    summary:
      'Complete architectural lineage from founding through four CTOs. Documents the 2017–2020 cloud-native platform ($11.4M written off), the January 2021 rewrite, and current local-first architecture. Written by Dr. Chen at General Counsel\'s request for the pre-IPO due diligence package. 214 pages of Nair-era documentation summarized in 3 paragraphs.',
    wordCount: 3847,
  },
  {
    id: 'DOC-021',
    slug: 'engineering-headcount-changes',
    title: 'Engineering Headcount Changes — Q1 2020 through Q1 2025',
    classification: 'CONFIDENTIAL',
    author: 'Human Resources / T. Ellery, CFO',
    department: 'Human Resources',
    date: 'April 1, 2025',
    lastUpdated: 'April 1, 2025',
    status: 'Active',
    relatedDocs: ['DOC-006'],
    summary:
      'Engineering team size by quarter. Headcount dropped from 42 to 3 between Q2 2020 and Q1 2021. Current headcount: 127. The three engineers who remained through the transition are identified by name. All three are still employed. Their retention packages are referenced but not disclosed.',
    wordCount: 1204,
  },
  {
    id: 'DOC-022',
    slug: 'asset-pipeline-migration-notice',
    title: 'Asset Pipeline Migration Notice — RISE Render',
    classification: 'INTERNAL',
    author: 'Arvin Reyes',
    department: 'Engineering',
    date: 'April 15, 2026',
    lastUpdated: 'April 15, 2026',
    status: 'Active',
    relatedDocs: ['DOC-020'],
    summary:
      'The RC-1 asset pipeline has been migrated to /studio. Default credentials remain active. IT ticket #4471 has not been resolved. RISE Render production environment is accessible at the new endpoint. Auth middleware deployment is pending.',
    wordCount: 342,
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
  'DOC-010': {
    staff: [
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 20160 },
      { name: 'J. Park', role: 'General Counsel', baseMinutes: 25920 },
    ],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-011': {
    staff: [
      { name: 'Dr. E. Voss', role: 'CEO', baseMinutes: 4320 },
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 4320 },
    ],
    externals: [],
  },
  'DOC-012': {
    staff: [{ name: 'J. Park', role: 'General Counsel', baseMinutes: 120 }],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-013': {
    staff: [
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 10080 },
      { name: 'T. Ellery', role: 'CFO', baseMinutes: 15840 },
    ],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-014': {
    staff: [
      { name: 'Dr. E. Voss', role: 'CEO', baseMinutes: 2880 },
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 2880 },
      { name: 'J. Park', role: 'General Counsel', baseMinutes: 5760 },
    ],
    externals: [],
  },
  'DOC-015': {
    staff: [{ name: 'S. Williams', role: 'HR Director', baseMinutes: 4320 }],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-016': {
    staff: [
      { name: 'Dr. E. Voss', role: 'CEO', baseMinutes: 1440 },
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 1440 },
    ],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-017': {
    staff: [{ name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 7200 }],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-018': {
    staff: [{ name: 'J. Park', role: 'General Counsel', baseMinutes: 11520 }],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-019': {
    staff: [
      { name: 'T. Ellery', role: 'CFO', baseMinutes: 8640 },
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 8640 },
    ],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-020': {
    staff: [
      { name: 'Dr. M. Chen', role: 'CPO', baseMinutes: 720 },
      { name: 'J. Park', role: 'General Counsel', baseMinutes: 2880 },
    ],
    externals: [{ ip: '203.0.113.47' }],
  },
  'DOC-021': {
    staff: [
      { name: 'T. Ellery', role: 'CFO', baseMinutes: 4320 },
      { name: 'S. Williams', role: 'HR Director', baseMinutes: 4320 },
    ],
    externals: [],
  },
  'DOC-022': {
    staff: [
      { name: 'A. Reyes', role: 'Junior Developer', baseMinutes: 45 },
    ],
    externals: [{ ip: '203.0.113.47' }],
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
