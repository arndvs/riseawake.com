export type ProductStatus =
  | 'available'
  | 'sold_out'
  | 'discontinued'
  | 'coming_soon'

export type ProductTier = 'push' | 'push-select' | 'push-plus'

export interface ProductSpec {
  label: string
  value: string
  /** Per-tier values for comparison display. Keyed by ProductTier. */
  byTier?: Partial<Record<ProductTier, string>>
}

export interface ProductFeature {
  icon: string
  title: string
  body: string
  /** Which tiers include this feature */
  tiers: ProductTier[]
}

export interface ProductColorway {
  name: string
  hex: string
  premium?: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  tier: ProductTier
  tagline: string
  description: string
  price: number | null
  status: ProductStatus
  badge: string
  waitlistCount?: number
  complianceRate?: number
  model: string
  /** Self-making scope description */
  selfMaking: string
  soundProfile: string
  features: ProductFeature[]
  specs: ProductSpec[]
  colorways: ProductColorway[]
  includes: string[]
  sortOrder: number
}

// ---------------------------------------------------------------------------
// Shared features — defined once, tier membership varies
// ---------------------------------------------------------------------------

const FEATURES: ProductFeature[] = [
  {
    icon: '↑',
    title: 'Push Mode',
    body: "One press. The base activates, transitions to vertical, and begins routing you through your morning with the precision of a system that has studied the problem carefully and arrived at a conclusion. There is no option to pause Push Mode. This was considered during development and found to be contrary to the product's purpose.",
    tiers: ['push', 'push-select', 'push-plus'],
  },
  {
    icon: '⊡',
    title: 'Autonomous Sheet Tensioning',
    body: 'A tensioning bar travels the inner frame rails drawing your fitted sheet progressively taut from the center outward — slowly, one wrinkle at a time, across the full span of your morning. It does not rush.',
    tiers: ['push', 'push-select', 'push-plus'],
  },
  {
    icon: '⊡+',
    title: 'Enhanced Sheet Tensioning',
    body: 'Enhanced tensioning system handles fitted sheet, flat sheet, and duvet — all three layers drawn taut in sequence. Quieter motor, smoother engagement.',
    tiers: ['push-plus'],
  },
  {
    icon: '○',
    title: 'Pillow Restoration',
    body: 'Pneumatic reshaping nodes run a long, calibrated cycle: gradual inflation, sustained hold, controlled deflation. Each pillow is restored to form and centered. The process takes longer than feels necessary. This is deliberate.',
    tiers: ['push', 'push-select', 'push-plus'],
  },
  {
    icon: '◈',
    title: 'Continuous Track Navigation',
    body: "Low-profile continuous tracks beneath the base allow smooth, uninterrupted motion across all floor surfaces. Drive sprockets engage, and the bed simply moves — with the inevitability of heavy furniture pushed by someone who knows where they're going.",
    tiers: ['push', 'push-select', 'push-plus'],
  },
  {
    icon: '◈+',
    title: 'Dampened Track System',
    body: 'Whisper-quiet dampened tracks. The difference between a work truck and a luxury SUV. You feel the motion more than hear it.',
    tiers: ['push-plus'],
  },
  {
    icon: '▣',
    title: 'Mattress Retention System',
    body: 'A low-profile retention lip and integrated strapping system secures the mattress at all angles of operation. The mattress remains on the base in all three states: flat, raised, and vertical.',
    tiers: ['push', 'push-select', 'push-plus'],
  },
  {
    icon: '⬡',
    title: 'The PM-1 Remote',
    body: "One button. The button initiates Push Mode. That is its complete list of functions. Fine print on the reverse reads: 'Push Mode cannot be manually interrupted once initiated. This is a feature, not a limitation. Have a productive day!'",
    tiers: ['push', 'push-select', 'push-plus'],
  },
  {
    icon: '◐',
    title: 'Atmosphere Suite',
    body: 'Frame-integrated mood lighting (warm, dimmable), spatial audio module, and ambient wake/sleep programs. Shifts from warm amber (sleep) to cool daylight (wake) as part of the morning sequence.',
    tiers: ['push-plus'],
  },
]

// ---------------------------------------------------------------------------
// Specs — shared labels, per-tier values for comparison
// ---------------------------------------------------------------------------

const SPECS: ProductSpec[] = [
  {
    label: 'Push Mode',
    value: 'Included — Non-negotiable',
  },
  {
    label: 'Interruption',
    value: 'Not supported by design',
  },
  {
    label: 'Track System',
    value: 'Continuous track, low-profile, recessed when flat',
    byTier: {
      'push': 'Continuous track, low-profile, recessed when flat',
      'push-select': 'Continuous track, quieter motor',
      'push-plus': 'Dampened, whisper-quiet',
    },
  },
  {
    label: 'Self-Making',
    value: 'Fitted sheet only (1 tensioning bar)',
    byTier: {
      'push': 'Fitted sheet only (1 tensioning bar, 1 pneumatic node)',
      'push-select': 'Fitted sheet + flat sheet (enhanced tensioning, 2 pneumatic nodes)',
      'push-plus': 'Fitted sheet + flat sheet + duvet (enhanced tensioning, 3 pneumatic nodes)',
    },
  },
  {
    label: 'PUSH Pillows',
    value: '1 (standard cotton pillowcase)',
    byTier: {
      'push': '1 (standard cotton pillowcase)',
      'push-select': '2 (premium cotton pillowcases)',
      'push-plus': '3 (premium silk/sateen pillowcases)',
    },
  },
  {
    label: 'Sheet System',
    value: 'Autonomous tensioning bar (center-out)',
    byTier: {
      'push': '1 tensioning bar (fitted sheet)',
      'push-select': 'Enhanced tensioning (fitted + flat sheet)',
      'push-plus': 'Enhanced tensioning (fitted + flat sheet + duvet)',
    },
  },
  {
    label: 'Atmosphere Suite',
    value: 'Not included',
    byTier: {
      'push': 'Not included',
      'push-select': 'Available as add-on',
      'push-plus': 'Included — mood lighting, spatial audio, wake/sleep programs',
    },
  },
  {
    label: 'Sound Profile',
    value: 'Warm, low, 42Hz baseline',
    byTier: {
      'push': 'Warm low hum, 42Hz baseline. Faint track rhythm on hard floors.',
      'push-select': 'Quieter motor, reduced track noise',
      'push-plus': 'Lower, smoother — you feel it more than hear it. Dampened track roll.',
    },
  },
  {
    label: 'Raising Arc',
    value: '0° – 90°+ continuous, motor-assisted',
  },
  {
    label: 'Motor Hum',
    value: 'Warm, low, 42Hz baseline',
    byTier: {
      'push': '42Hz baseline, slightly industrial',
      'push-select': 'Quieter, refined',
      'push-plus': 'Lower, smoother, almost silent',
    },
  },
  {
    label: 'Remote',
    value: 'PM-1 — single function',
  },
  {
    label: 'Off Switch',
    value: 'Not applicable',
  },
  {
    label: 'Staircase Navigation',
    value: 'Not supported — see RISE Move',
  },
  {
    label: 'Warranty',
    value: '5 years (Push Mode: lifetime)',
  },
]

// ---------------------------------------------------------------------------
// Colorways
// ---------------------------------------------------------------------------

const BASE_COLORWAYS: ProductColorway[] = [
  { name: 'Dark Charcoal', hex: '#2d2d2d' },
]

const PREMIUM_COLORWAYS: ProductColorway[] = [
  { name: 'Dark Charcoal', hex: '#2d2d2d' },
  { name: 'Warm Gray', hex: '#8c8279', premium: true },
]

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: Product[] = [
  {
    id: 'push-rp01',
    slug: 'push',
    name: 'The PUSH',
    tier: 'push',
    tagline: "The bed that gets you up. Whether you're ready or not.",
    description:
      "The PUSH doesn't suggest. It delivers. The base transitions to vertical and autonomously routes you through your morning — bathroom, closet, kitchen, departure — then returns home alone.",
    price: 4999,
    status: 'sold_out',
    badge: 'RISE / The PUSH / Smart Adjustable Base',
    waitlistCount: 340000,
    complianceRate: 98,
    model: 'RP-01',
    selfMaking:
      'Fitted sheet (tensioning bar, center outward) and one PUSH pillow (pneumatic node). Flat sheets, duvets, and additional pillows are not touched.',
    soundProfile:
      'Warm low hum, 42Hz baseline. Faint track rhythm on hard floors — individual links passing, drive sprockets engaging. Sheet tensioning is a faint continuous whisper. Pillow node is a slow, patient exhale.',
    features: FEATURES.filter((f) => f.tiers.includes('push')),
    specs: SPECS.map((s) => ({
      label: s.label,
      value: s.byTier?.['push'] ?? s.value,
    })),
    colorways: BASE_COLORWAYS,
    includes: [
      'Adjustable base frame (matte dark charcoal, cool blue undertone)',
      'Standard medium-depth mattress',
      '1 PUSH pillow with pneumatic reshaping node',
      '1 fitted sheet (standard cotton, navy)',
      'PM-1 remote',
    ],
    sortOrder: 1,
  },
  {
    id: 'push-select-rps01',
    slug: 'push-select',
    name: 'The PUSH+ Select',
    tier: 'push-select',
    tagline: 'The rational choice. Most customers stop here.',
    description:
      "Everything the PUSH does, refined. Enhanced self-making covers your flat sheet. Two PUSH pillows. Quieter motor. Premium cotton sheet set. The tier that makes the PUSH+ feel like 'only a little more.'",
    price: 7499,
    status: 'sold_out',
    badge: 'RISE / The PUSH+ Select / Smart Adjustable Base',
    waitlistCount: 180000,
    complianceRate: 98,
    model: 'RPS-01',
    selfMaking:
      'Fitted sheet and flat sheet (enhanced tensioning). Two PUSH pillows (one pneumatic node each). Duvet not included — available as add-on.',
    soundProfile:
      'Same frequency architecture as PUSH, quieter motor, reduced track noise. A machine that gets out of the way.',
    features: FEATURES.filter((f) => f.tiers.includes('push-select')),
    specs: SPECS.map((s) => ({
      label: s.label,
      value: s.byTier?.['push-select'] ?? s.value,
    })),
    colorways: PREMIUM_COLORWAYS,
    includes: [
      'Adjustable base frame (standard or premium colorway)',
      'Standard medium-depth mattress',
      '2 PUSH pillows with pneumatic reshaping nodes',
      'Premium cotton sheet set (fitted + flat)',
      'Premium cotton pillowcases',
      'PM-1 remote',
    ],
    sortOrder: 2,
  },
  {
    id: 'push-plus-rpp01',
    slug: 'push-plus',
    name: 'The PUSH+',
    tier: 'push-plus',
    tagline: 'Same product. Everything upgraded.',
    description:
      "The PUSH+ is what happens when someone with taste and budget looks at the configurator and keeps clicking 'add.' Same core engineering, refined in every dimension. The doors close fuller. Everything is more considered. People notice. Nobody says anything.",
    price: 12999,
    status: 'sold_out',
    badge: 'RISE / The PUSH+ / Smart Adjustable Base',
    waitlistCount: 42000,
    complianceRate: 98,
    model: 'RPP-01',
    selfMaking:
      'Fitted sheet, flat sheet, and duvet (enhanced tensioning, all three layers). Three PUSH pillows (one pneumatic node each). Euro shams and accent pillows stay where the owner placed them.',
    soundProfile:
      "Same frequency architecture, refined. Lower, smoother motor hum — you feel it more than hear it. Dampened track roll. Pneumatic exhale is barely there — a breath, not a mechanism. Nothing rattles. Nothing clicks. It just moves.",
    features: FEATURES.filter((f) => f.tiers.includes('push-plus')),
    specs: SPECS.map((s) => ({
      label: s.label,
      value: s.byTier?.['push-plus'] ?? s.value,
    })),
    colorways: PREMIUM_COLORWAYS,
    includes: [
      'Adjustable base frame (premium colorway — warm gray standard)',
      'Standard medium-depth mattress',
      '3 PUSH pillows with pneumatic reshaping nodes',
      'Premium silk/sateen sheet set (fitted + flat)',
      'Premium silk/sateen pillowcases (coordinated)',
      '2 Euro shams (structural backing, coordinated)',
      '2 accent pillows (complementary tone)',
      'Duvet + cover (high-thread-count, properly weighted)',
      'Atmosphere Suite (mood lighting, spatial audio, wake/sleep programs)',
      'PM-1 remote',
    ],
    sortOrder: 3,
  },
]

// ---------------------------------------------------------------------------
// Discontinued / other products (not in the PUSH tier system)
// ---------------------------------------------------------------------------

export const otherProducts: Product[] = [
  {
    id: 'nudge-rn01',
    slug: 'nudge',
    name: 'The Nudge',
    tier: 'push', // legacy — predates tier system
    tagline: '74% compliance. A cult following. Not good enough.',
    description:
      'The Nudge consolidated our entire passive tensioning line. Seven stages of progressive encouragement. Users loved it. 26% of them stayed in bed anyway. We learned our lesson.',
    price: 2499,
    status: 'discontinued',
    badge: 'RISE / The Nudge / Smart Adjustable Base',
    complianceRate: 74,
    model: 'RN-01',
    selfMaking: 'Not applicable — passive tensioning only.',
    soundProfile: 'Gentle ambient escalation. No motor hum.',
    features: [],
    specs: [
      { label: 'Pressure Sensors', value: '512 (32×16 grid)' },
      { label: 'Actuation', value: 'Pneumatic (limited)' },
      { label: 'Temperature Range', value: '18°C – 28°C' },
      { label: 'Light Output', value: '500 lux max' },
      { label: 'Compliance Rate', value: '74%' },
      { label: 'Status', value: 'Permanently Discontinued' },
    ],
    colorways: [{ name: 'Crisp White', hex: '#f5f5f0' }],
    includes: [
      '7-stage passive tensioning system',
      'Gradual temperature gradient',
      'Ambient light escalation',
      'Gentle audio cues',
      'App companion with sleep analytics',
      'Manual override available',
    ],
    sortOrder: 0,
  },
  {
    id: 'move-rm01',
    slug: 'move',
    name: 'The Move',
    tier: 'push', // not in tier system
    tagline: 'Autonomous vertical navigation. Both directions.',
    description:
      'We are aware of the stairs. All of them. Both directions. We are doing something about it. The Move navigates vertical spaces. Requires Vertical Navigation Services (VNS) subscription.',
    price: null,
    status: 'coming_soon',
    badge: 'RISE / The Move / Autonomous Vertical Navigation',
    model: 'RM-01',
    selfMaking: 'Full Push Mode capabilities plus vertical navigation.',
    soundProfile: 'Not disclosed.',
    features: [],
    specs: [
      { label: 'Vertical Range', value: '3 floors standard, 5 floors enterprise' },
      { label: 'Stair Detection', value: 'LiDAR + depth sensors' },
      { label: 'VNS Subscription', value: 'Required' },
      {
        label: 'VNS Lapse Behavior',
        value: 'Bed waits at bottom. User goes up alone.',
      },
      { label: 'Status', value: 'No timeline. No price. No loyalty discount.' },
    ],
    colorways: [],
    includes: [
      'Full Push Mode capabilities',
      'Autonomous stair navigation — ascending',
      'Autonomous stair navigation — descending',
      'Multi-floor morning routing',
      'VNS (Vertical Navigation Services) integration',
      'Enhanced Solo Return Commute',
    ],
    sortOrder: 99,
  },
]

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------

/** All PUSH-tier products (base, select, plus) in display order */
export function getPushTiers(): Product[] {
  return [...products].sort((a, b) => a.sortOrder - b.sortOrder)
}

/** Find any product by slug (includes discontinued and coming_soon) */
export function getProduct(slug: string): Product | undefined {
  return [...products, ...otherProducts].find((p) => p.slug === slug)
}

/** Find a product by ID */
export function getProductById(id: string): Product | undefined {
  return [...products, ...otherProducts].find((p) => p.id === id)
}

/** Get features that are exclusive to a tier (not in lower tiers) */
export function getExclusiveFeatures(tier: ProductTier): ProductFeature[] {
  const tierOrder: ProductTier[] = ['push', 'push-select', 'push-plus']
  const idx = tierOrder.indexOf(tier)
  if (idx <= 0) return FEATURES.filter((f) => f.tiers.includes(tier))

  const lowerTiers = tierOrder.slice(0, idx)
  return FEATURES.filter(
    (f) =>
      f.tiers.includes(tier) &&
      !lowerTiers.some((lt) => f.tiers.includes(lt)),
  )
}

/** All features (for comparison tables) */
export function getAllFeatures(): ProductFeature[] {
  return FEATURES
}

/** All specs (for comparison tables) */
export function getAllSpecs(): ProductSpec[] {
  return SPECS
}
