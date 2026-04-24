// lib/careers-data.ts
// RISE Career Data — hardcoded per the fictional brand
// Job listings + role-specific form field definitions + resume constants

// ─── Resume constants ───────────────────────────────────────────────────────

export const MAX_RESUME_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const
export const RESUME_ACCEPT = '.pdf,.doc,.docx'

// ─── Types ──────────────────────────────────────────────────────────────────

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'staff'
export type Availability =
  | 'immediate'
  | '2_weeks'
  | '1_month'
  | 'negotiable'

export type RoleSpecificFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'boolean'
  | 'scale'

export interface RoleSpecificField {
  id: string
  label: string
  type: RoleSpecificFieldType
  required: boolean
  placeholder?: string
  options?: string[]
  min?: number
  max?: number
  scaleLabels?: { min: string; max: string }
}

export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: string
  level: string
  posted: string
  urgent: boolean
  salary: string
  equity: string
  description: string
  requirements: string[]
  note: string | null
  roleSpecificFields: RoleSpecificField[]
}

// ─── Role-specific form field definitions ───────────────────────────────────

const ENG_001_FIELDS: RoleSpecificField[] = [
  {
    id: 'languagesProficiency',
    label: 'Languages proficiency (C++, Rust, Python)',
    type: 'multiselect',
    required: true,
    options: ['C++', 'Rust', 'Python', 'C', 'Go', 'Assembly'],
  },
  {
    id: 'autonomousSystemsExperience',
    label: 'Autonomous systems experience',
    type: 'textarea',
    required: true,
    placeholder:
      'Describe your experience with autonomous navigation or robotics platforms',
  },
  {
    id: 'noPriorCodebase',
    label: 'Have you worked on projects where no prior codebase existed?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'loadCapacityExperience',
    label: 'Load capacity experience (lbs)',
    type: 'number',
    required: false,
    placeholder: 'Maximum load you have engineered for',
    min: 0,
    max: 10000,
  },
]

const ENG_002_FIELDS: RoleSpecificField[] = [
  {
    id: 'dataPipelineTools',
    label: 'Data pipeline tools',
    type: 'multiselect',
    required: true,
    options: ['Spark', 'Airflow', 'dbt', 'Kafka', 'Flink', 'Dagster', 'Other'],
  },
  {
    id: 'sensorDataExperience',
    label: 'Sensor time-series data experience',
    type: 'textarea',
    required: true,
    placeholder: 'Describe your experience with sensor or IoT time-series data at scale',
  },
  {
    id: 'privacyGovernanceExperience',
    label: 'Data privacy and governance experience',
    type: 'textarea',
    required: true,
    placeholder: 'Describe your experience working with Legal on data governance',
  },
  {
    id: 'sensitiveAudioComfort',
    label: 'Comfort level working with sensitive audio data',
    type: 'scale',
    required: true,
    min: 1,
    max: 5,
    scaleLabels: {
      min: 'Uncomfortable — would require significant context',
      max: 'Comfortable — have worked with similar data',
    },
  },
]

const ENG_003_FIELDS: RoleSpecificField[] = [
  {
    id: 'cmsExperience',
    label: 'CMS experience',
    type: 'select',
    required: true,
    options: ['Payload', 'Sanity', 'Contentful', 'Strapi', 'Other'],
  },
  {
    id: 'authSecurityExperience',
    label: 'Auth and security experience',
    type: 'textarea',
    required: true,
    placeholder:
      'Describe your experience with auth middleware, session management, or access control',
  },
  {
    id: 'completedOthersCode',
    label: "Have you completed code written by someone who left?",
    type: 'boolean',
    required: true,
  },
  {
    id: 'nextjsProficiency',
    label: 'Next.js proficiency (years)',
    type: 'number',
    required: true,
    placeholder: 'Years of production Next.js experience',
    min: 0,
    max: 15,
  },
]

const LEGAL_001_FIELDS: RoleSpecificField[] = [
  {
    id: 'barAdmissions',
    label: 'Bar admissions',
    type: 'multiselect',
    required: true,
    options: [
      'California',
      'New York',
      'Delaware',
      'Texas',
      'Oregon',
      'Washington',
      'Other',
    ],
  },
  {
    id: 'practiceAreas',
    label: 'Practice areas',
    type: 'multiselect',
    required: true,
    options: [
      'Corporate/M&A',
      'IP Litigation',
      'Data Privacy',
      'Regulatory/Compliance',
      'Employment',
      'Securities',
      'Other',
    ],
  },
  {
    id: 'yearsInHouseVsFirm',
    label: 'Years in-house vs. firm',
    type: 'text',
    required: true,
    placeholder: 'e.g. "3 years firm, 2 years in-house"',
  },
  {
    id: 's1AmbiguityComfort',
    label: 'Comfort with S-1-disclosed ambiguity',
    type: 'boolean',
    required: true,
  },
  {
    id: 'iotLegalExperience',
    label: 'IoT or autonomous systems legal experience',
    type: 'textarea',
    required: false,
    placeholder: 'Describe relevant experience, if any',
  },
]

const MKTG_001_FIELDS: RoleSpecificField[] = [
  {
    id: 'writingSampleUrl',
    label: 'Writing sample URL',
    type: 'text',
    required: true,
    placeholder: 'https://',
  },
  {
    id: 'cmsExperience',
    label: 'CMS platform experience',
    type: 'select',
    required: true,
    options: ['Payload', 'Sanity', 'Contentful', 'WordPress', 'Other'],
  },
  {
    id: 'waitlistMarketingExperience',
    label: 'Waitlist or pre-launch marketing experience',
    type: 'textarea',
    required: true,
    placeholder: 'Describe your experience with scarcity-driven or pre-launch marketing',
  },
  {
    id: 'brandVoiceComfort',
    label: "Can you write in a brand voice that isn't yours?",
    type: 'boolean',
    required: true,
  },
  {
    id: 'portfolioUrl',
    label: 'Portfolio URL',
    type: 'text',
    required: false,
    placeholder: 'https://',
  },
]

const OPS_001_FIELDS: RoleSpecificField[] = [
  {
    id: 'cSuiteEaYears',
    label: 'C-suite EA years',
    type: 'number',
    required: true,
    placeholder: 'Years supporting C-level executives',
    min: 0,
    max: 40,
  },
  {
    id: 'calendarToolsProficiency',
    label: 'Calendar tools proficiency',
    type: 'multiselect',
    required: true,
    options: [
      'Google Calendar',
      'Outlook/Exchange',
      'Calendly',
      'Doodle',
      'Other',
    ],
  },
  {
    id: 'pushModePrincipalComfort',
    label:
      'Are you comfortable with a principal who uses Push Mode daily?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'availabilityWindowsFamiliarity',
    label: 'Familiarity with structured availability windows',
    type: 'textarea',
    required: true,
    placeholder:
      'Describe your experience managing stakeholder expectations around fixed communication windows',
  },
  {
    id: 'ndaComfortLevel',
    label: 'NDA comfort level',
    type: 'scale',
    required: true,
    min: 1,
    max: 5,
    scaleLabels: {
      min: 'Prefer minimal confidentiality constraints',
      max: 'Comfortable with extensive non-disclosure requirements',
    },
  },
]

// ─── Job openings ───────────────────────────────────────────────────────────

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'ENG-001',
    title: 'Staff Engineer, Embedded Systems — Staircase Navigation',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Staff',
    posted: 'February 3, 2025',
    urgent: true,
    salary: '$220,000 – $280,000',
    equity: '0.08% – 0.15%',
    description: `This role exists because we have a specific problem. The problem is the stairs.

RISE Push Mode navigates flat-surface residential environments with 98% compliance. Approximately 34% of US residential housing stock involves multi-story navigation. The Push does not navigate staircases. The RISE Move is the product that will. The Move is in development. You will be part of finishing it.

The core technical challenge: autonomous stair navigation for a platform weighing approximately 180lbs (base + mattress system) in attended and unattended configurations. The attended case is close. The unattended case — the solo return commute, descending stairs in the dark before dawn without a user's weight providing stabilizing force — is the unsolved problem. You will solve it.

What you will work on:
— Dynamic load calculation for variable center-of-gravity on non-uniform surfaces
— Stair detection and classification (material, rise, run, condition, lighting)
— Dual-mode navigation: attended user transit and unattended solo return
— Sensor fusion for real-time structural feedback during descent
— Failure state handling that does not result in the bed at the bottom of the stairs

Previous attempts at this problem: one prototype built 2016–2017 under CTO Daniel Yau. That code was not preserved in the 2021 platform migration. We are starting from approximately zero. We are aware of the irony.`,
    requirements: [
      '8+ years embedded systems engineering',
      'Experience with autonomous navigation on non-uniform surfaces',
      'Robotics background preferred — specifically mobile platforms in unstructured environments',
      'Familiarity with load distribution modeling and dynamic stability systems',
      'C++ required. Python for tooling. Rust a plus.',
      'Comfort working on a problem where prior work does not exist and prior people are not available',
    ],
    note: 'This posting will be removed when the Move ships. We do not know when that is. Neither do you. That is the job.',
    roleSpecificFields: ENG_001_FIELDS,
  },
  {
    id: 'ENG-002',
    title: 'Senior Data Engineer, Sleep Environment Analytics',
    department: 'Engineering / Data',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    level: 'Senior',
    posted: 'January 15, 2025',
    urgent: false,
    salary: '$175,000 – $220,000',
    equity: '0.04% – 0.08%',
    description: `RISE Push Mode generates sleep environment data across 47,000 active devices. This data includes: pressure sensor readings from 2,048 sensors at 2.5cm spacing, audio classification outputs from the onboard ML system, GPS telemetry, occupancy detection, motor performance logs, and compliance session records.

You will work with all of it.

The data pipeline has a known issue: date filtering for records pre-2019 returns incomplete results. This is a migration artifact from the 2020–2021 platform transition. The engineer who built the migration left the company. The fix requires a data migration that is pending Legal clearance. Part of your role will be navigating this with the General Counsel's office.

You will also work on the RISE Index — our proprietary compliance and lifestyle scoring system. The methodology is not public. Your job is to make it better, not to explain it. You will be comfortable with this distinction.

A note on the data: you will be working with data collected in people's bedrooms, during sleep, including audio data from environments the users may not have fully considered when pressing the PM-1 button. You will approach this data with appropriate care. You will also approach it with appropriate curiosity. Both are required.`,
    requirements: [
      '6+ years data engineering',
      'Python, SQL, Spark or equivalent',
      'Experience with sensor time-series data at scale',
      'ML pipeline experience — model serving, not necessarily training',
      'Experience working with Legal on data governance questions',
      'Comfort working with data that raises questions you are not responsible for answering',
    ],
    note: 'The "Other" category in the audio data access log is under review. You may be asked to assist with this review. The review has been ongoing since Q3 2024.',
    roleSpecificFields: ENG_002_FIELDS,
  },
  {
    id: 'ENG-003',
    title: 'Platform Engineer, CMS & Internal Tooling',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Mid-Senior',
    posted: 'October 1, 2024',
    urgent: true,
    salary: '$160,000 – $200,000',
    equity: '0.03% – 0.06%',
    description: `RISE operates an internal document management system built on Payload CMS v3.0.0-beta.67. The system contains 19 documents classified as CONFIDENTIAL, RESTRICTED, and INTERNAL. The system does not currently implement authentication controls. All 19 documents are publicly accessible via direct URL.

This was identified as a Critical finding in our January 2025 third-party cybersecurity assessment. The finding is unresolved. This role will resolve it.

Background: the authentication middleware was implemented approximately 80% by a junior developer (Arvin Reyes) who left the company August 12, 2024. His session token is still active. The middleware is in auth-middleware-draft.ts in the project root. It is mostly there. The isPublic field in the schema defaults to true. A configuration toggle was planned. The toggle was not built.

Additionally: the company is in the pre-IPO phase. The data room for investor due diligence has been migrated to this system. The data room is also publicly accessible. The S-1 contains a disclosure about this. The underwriters are aware. The SEC review is pending.

You will fix this. You will also improve the overall internal tooling stack, which has been maintained inconsistently since Arvin's departure.`,
    requirements: [
      '5+ years full-stack engineering',
      'Next.js and TypeScript required',
      'Experience with CMS platforms (Payload, Sanity, Contentful)',
      'Security mindset — specifically: auth middleware, session management, access control',
      "Ability to read someone else's 80%-complete code and finish it without asking them questions",
      'Discretion regarding the content you will encounter while doing this job',
    ],
    note: 'Payload CMS experience strongly preferred. Auth middleware experience required. The posting does not normally say "required" for middleware experience. This one does.',
    roleSpecificFields: ENG_003_FIELDS,
  },
  {
    id: 'LEGAL-001',
    title: 'Associate General Counsel',
    department: 'Legal',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Associate',
    posted: 'March 1, 2025',
    urgent: false,
    salary: '$185,000 – $230,000',
    equity: '0.02% – 0.05%',
    description: `Supporting the General Counsel on matters including regulatory compliance, autonomous navigation law, data privacy, intellectual property, and ongoing litigation.

Active matters include: autonomous vehicle classification inquiries in California, Oregon, and the UK; a putative class action regarding audio data collection in three states; patent ownership disputes with two former employees; an equity agreement dispute with the first CTO; and GDPR pre-inquiry correspondence from the EU.

The IPO is anticipated Q3 2026. Pre-IPO legal work is substantial. SEC correspondence resulting from the S-1 filing is ongoing. Underwriter coordination is ongoing. The cybersecurity disclosure requires monitoring.

You will also support the General Counsel on matters he describes as "operational" and declines to further characterize in a job posting. The description is accurate. You will learn what these are in your first week.

A note on the role: the General Counsel joined RISE in July 2022. He has described his first two weeks as "formative." If you join now, your first two weeks will be different. They will not be uneventful.`,
    requirements: [
      'JD required, bar admission in California preferred',
      '3–6 years at a firm or in-house, regulatory or tech preferred',
      'Experience with autonomous systems, IoT, or consumer hardware a strong plus',
      'Data privacy experience — CCPA, GDPR, state wiretapping statutes',
      'IP litigation support experience',
      'Comfort with ambiguity, specifically the kind that has already been disclosed in an S-1',
    ],
    note: 'RISE General Counsel James Park is available to discuss this role with qualified candidates. He will not discuss the contents of his August 22, 2022 memorandum.',
    roleSpecificFields: LEGAL_001_FIELDS,
  },
  {
    id: 'MKTG-001',
    title: 'Marketing Manager, Content & Growth',
    department: 'Marketing',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    level: 'Manager',
    posted: 'December 1, 2024',
    urgent: false,
    salary: '$130,000 – $165,000',
    equity: '0.02% – 0.04%',
    description: `RISE is preparing for an IPO in Q3 2026. Our content and growth marketing has been managed by an external consultant operating from a process document originally developed for a pest control client and applied, unchanged, to Push Mode. The results have been acceptable. We believe we can do better.

You will own the blog (8 posts currently, all keyword-stuffed, all accurate), the changelog communications, social media (Instagram top post: a photo of the PM-1 remote, no caption, 4,847 likes), and the waitlist nurture sequence (340,000 contacts, 0 unsubscribes — they cannot unsubscribe without losing their waitlist position, which is disclosed in the Terms of Service).

You will also manage updates to the internal CMS — adding new documents, maintaining the document index, and coordinating with Legal on classification decisions. Previous CMS experience required. Payload CMS experience a plus. Authentication middleware experience strongly preferred. The reason this last item is listed will become clear during onboarding.

Dr. Voss has four feedback modes: no response (proceed), one-word response (incorporate), a rewrite (use her version verbatim), and a phone call (stop what you are doing). You will learn to distinguish between them. Mode 4 has happened twice. Both times the document got shorter.`,
    requirements: [
      '5+ years content or growth marketing',
      'B2C experience in premium or scarcity-driven products',
      'Exceptional writing — you will be writing for an audience that reads footnotes',
      'Experience with waitlist or pre-launch marketing',
      'CMS platform experience — Payload, Sanity, or equivalent',
      'Ability to work within a brand voice that is not yours and not explain it',
    ],
    note: "The consultant's process document (DOC-015 in the internal system) is publicly accessible. You may read it before applying. It is exactly what the job description implies it is.",
    roleSpecificFields: MKTG_001_FIELDS,
  },
  {
    id: 'OPS-001',
    title: 'Executive Assistant to the CEO',
    department: 'Operations',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Senior EA',
    posted: 'January 8, 2025',
    urgent: false,
    salary: '$110,000 – $145,000',
    equity: '0.01% – 0.02%',
    description: `Supporting Dr. Eleanor Voss, Founder & CEO, across all operational, scheduling, and communication functions.

Dr. Voss begins each day at the same time. She has not been late since April 2021. Her calendar is structured around a fixed morning commitment that precedes all other calendar items. Meetings before 9:15am are not possible. This is not a preference. It is a product constraint.

She responds to messages in three windows: 9:15–11:00am, 2:00–3:30pm, and 7:00–7:45pm. Outside these windows, messages are received but not acted upon. You will manage stakeholder expectations accordingly. You will not explain why the windows exist. The explanation is public.

Dr. Voss does not take photographs. She has not since 2019. You will field approximately 3 photo requests per week — from press, from investors, from people who do not read the website. Your answer is always the same. The answer is on the website.

You will also manage the board calendar. There are three board members. Scheduling meetings that do not coincide with personal events requires advance coordination that has not always occurred. This is noted for context.`,
    requirements: [
      '7+ years executive assistance at C-suite level',
      'Experience supporting a founder — specifically: someone who is right about the important things and inflexible about them',
      'Exceptional calendar management and stakeholder communication',
      'Discretion — specifically the kind where you have read several documents you will not discuss',
      'Comfort with a principal who uses Push Mode every morning and considers this a feature of working with her, not a curiosity',
    ],
    note: 'The role was previously managed by two different people over six months. Both departures were amicable. Both were discussed at board level. The board noted this was related to "scheduling expectations." The expectations have not changed.',
    roleSpecificFields: OPS_001_FIELDS,
  },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getJobById(id: string): JobOpening | undefined {
  return JOB_OPENINGS.find((job) => job.id === id)
}

export function getJobByIdOrThrow(id: string): JobOpening {
  const job = getJobById(id)
  if (!job) {
    throw new Error(`Unknown role ID: ${id}`)
  }
  return job
}

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'entry', label: 'Entry Level (0–2 years)' },
  { value: 'mid', label: 'Mid Level (3–5 years)' },
  { value: 'senior', label: 'Senior (6–10 years)' },
  { value: 'staff', label: 'Staff / Principal (10+ years)' },
]

export const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
  { value: 'immediate', label: 'Immediately' },
  { value: '2_weeks', label: '2 weeks' },
  { value: '1_month', label: '1 month' },
  { value: 'negotiable', label: 'Negotiable' },
]
