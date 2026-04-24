/**
 * Seed fictional (in-universe) applications into Convex.
 * These are narrative entries visible on the public /internal/applications dashboard.
 * Real submissions are hidden by default (fictional: false).
 *
 * Usage: npx tsx scripts/seed-fictional-applications.tsx
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { ConvexHttpClient } from 'convex/browser'
import { api } from '../convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

// Dates spread across several months, newest first
function daysAgo(days: number) {
  return Date.now() - days * 24 * 60 * 60 * 1000
}

const FICTIONAL_APPLICATIONS = [
  // ─── 1. The ghost of the stair code ──────────────────────────────────
  {
    roleId: 'ENG-001',
    roleTitle: 'Staff Engineer, Embedded Systems — Staircase Navigation',
    firstName: 'Marcus',
    lastName: 'Hale',
    email: 'mhale@protonmail.ch',
    phone: '(415) 000-0000',
    experienceLevel: 'Staff (10+ years)',
    availability: 'Immediately',
    whyJoinRise:
      'I wrote the stair navigation code in 2016. The prototype worked. It descended 14 steps at the Presidio test house with a 190lb load at 2am with no occupant. It worked once. Then it did not work again. Daniel said the code was "not preserved" in the migration. I was also not preserved. I left three months before Daniel did. I would like to come back and finish what I started. The stairs have not changed. Neither have I.',
    roleSpecificAnswers: {
      languagesProficiency: 'C++ (14 years), Rust (6 years), Python (tooling only)',
      autonomousSystemsExperience:
        'Built the original RISE Move stair prototype 2016–2017. Prior: autonomous warehouse systems at Amazon Robotics.',
      noPriorCodebase: true,
      loadCapacityExperience:
        'The 190lb test was mine. The 220lb test was Daniel\'s idea. We do not discuss the 220lb test.',
    },
    resumeFileName: 'hale_marcus_cv_2025.pdf',
    resumeFileSize: 847_000,
    ipAddress: '198.51.100.47',
    status: 'flagged' as const,
    breachFlag: true,
    reviewedBy: 'Dr. Voss',
    reviewNotes:
      'How did he get this email address. His employment ended March 2017. His access was revoked. His badge was returned. His code was not. Schedule a call. Mode 4.',
    submittedAt: daysAgo(3),
    fictional: true,
  },

  // ─── 2. The return of Arvin Reyes ────────────────────────────────────
  {
    roleId: 'ENG-003',
    roleTitle: 'Platform Engineer, CMS & Internal Tooling',
    firstName: 'A.',
    lastName: 'Reyes',
    email: 'areyes.dev@gmail.com',
    phone: '(628) 555-0199',
    experienceLevel: 'Mid (3–5 years)',
    availability: '2 weeks',
    whyJoinRise:
      'I left something unfinished. The auth middleware is at 80%. I know this because I wrote the 80%. I also know the session token I was issued on my first day is still active. You know this too. I checked. I am not applying because I need a job. I am applying because the isPublic field still defaults to true and that has been keeping me up at night. Not the Push Mode kind of keeping me up. The regular kind.',
    roleSpecificAnswers: {
      cmsExperience: 'Payload CMS v3.0.0-beta.67. Intimate familiarity.',
      authSecurityExperience:
        'Approximately 80% of the required experience. The remaining 20% is why I am reapplying.',
      completedOthersCode: true,
      nextjsProficiency: 'Advanced — I wrote the internal tooling stack you are currently using to read this.',
    },
    ipAddress: '203.0.113.88',
    status: 'needs_review' as const,
    breachFlag: true,
    reviewedBy: 'J. Park',
    reviewNotes:
      'Confirmed: session token arvin.reyes@rise.co (issued 2024-01-15) remains active. IT has been notified. IT has not responded. Legal recommends proceeding with the interview. The irony is noted.',
    submittedAt: daysAgo(8),
    fictional: true,
  },

  // ─── 3. The plaintiff's attorney ─────────────────────────────────────
  {
    roleId: 'LEGAL-001',
    roleTitle: 'Associate General Counsel',
    firstName: 'Catherine',
    lastName: 'Moreau',
    email: 'c.moreau@kessler-shaw.com',
    phone: '(212) 555-0312',
    experienceLevel: 'Senior (5+ years)',
    availability: '1 month',
    whyJoinRise:
      'I currently represent the plaintiffs in Chen v. RISE Awake, Inc. (Case No. 3:24-cv-04871). This is not a conflict of interest. My firm disagrees, which is why I am leaving. I have spent fourteen months reviewing your audio data collection practices. I understand them better than anyone outside your organization and most people inside it. I know what the "Other" category contains. I am not troubled by it. I am troubled that it is not encrypted at rest. Hire me and I will fix both problems: the legal exposure and the one your General Counsel calls "operational."',
    roleSpecificAnswers: {
      barAdmissions: 'New York, California, District of Columbia',
      practiceAreas: ['Data Privacy', 'Class Action Defense', 'Regulatory Compliance', 'IoT / Consumer Hardware'],
      yearsInHouseVsFirm: '8 years firm, 0 in-house. The ratio is about to change.',
      s1AmbiguityComfort: 9,
      iotLegalExperience: true,
    },
    ipAddress: '192.0.2.201',
    status: 'flagged' as const,
    breachFlag: false,
    reviewedBy: 'J. Park',
    reviewNotes:
      'I have forwarded this to outside counsel. I have also forwarded it to Dr. Voss. Dr. Voss asked if she was serious. I confirmed she appears to be. Dr. Voss said "interesting." That is not one of her four documented feedback modes. I am unsure how to proceed.',
    submittedAt: daysAgo(14),
    fictional: true,
  },

  // ─── 4. The waitlist loyalist ────────────────────────────────────────
  {
    roleId: 'OPS-001',
    roleTitle: 'Executive Assistant to the CEO',
    firstName: 'David',
    lastName: 'Nakamura',
    email: 'd.nakamura@icloud.com',
    phone: '(510) 555-0847',
    experienceLevel: 'Senior (5+ years)',
    availability: 'Immediately',
    whyJoinRise:
      'I have been on the Push Mode waitlist since February 11, 2022. Position #47. I joined because of the Wired article. I stayed because unsubscribing would lose my position and the Terms of Service are very clear about that. I have read them. I have also read the S-1 filing. I know the windows: 9:15–11:00, 2:00–3:30, 7:00–7:45. I already manage my own expectations accordingly. I have been doing this for three years. I am qualified.',
    roleSpecificAnswers: {},
    ipAddress: '172.16.254.1',
    status: 'reviewed' as const,
    breachFlag: false,
    reviewedBy: 'Dr. Voss',
    reviewNotes:
      'Dr. Voss called. Mode 4. Call lasted 90 seconds. She said: "He knows the windows." Then she hung up. I have scheduled a first-round interview. I was not instructed to. I was also not instructed not to.',
    submittedAt: daysAgo(21),
    fictional: true,
  },

  // ─── 5. The pest control document enthusiast ─────────────────────────
  {
    roleId: 'MKTG-001',
    roleTitle: 'Marketing Manager, Content & Growth',
    firstName: 'Rachel',
    lastName: 'Thornton',
    email: 'r.thornton.mktg@outlook.com',
    phone: '(323) 555-0614',
    experienceLevel: 'Mid (3–5 years)',
    availability: '2 weeks',
    whyJoinRise:
      'I read DOC-015. The entire document. I found it through your internal CMS, which — as your ENG-003 job posting notes — does not currently implement authentication controls. The document is a pest control marketing playbook applied unchanged to a $4,200 autonomous bed. I have three observations: (1) the keyword strategy is sound but the target audience does not search for "best bed for night sweats," (2) the Instagram strategy of posting the PM-1 remote with no caption is accidentally brilliant and should be kept, and (3) the waitlist nurture sequence has a 0% unsubscribe rate not because people love it but because they cannot unsubscribe without losing their position. This is either genius or litigation. I would like to work on the side that makes it genius.',
    roleSpecificAnswers: {
      writingSampleUrl: 'https://medium.com/@rthorn/the-pm1-remote-photo-4847-likes',
      cmsExperience: 'Sanity, Contentful, and now Payload — via your publicly accessible internal CMS.',
      waitlistMarketingExperience:
        'Managed a 12,000-person waitlist for a DTC skincare brand. Our unsubscribe rate was 4.2%. Yours is 0%. I need to understand how.',
      brandVoiceComfort: 8,
    },
    ipAddress: '198.51.100.99',
    status: 'reviewed' as const,
    breachFlag: false,
    reviewedBy: 'Dr. Voss',
    reviewNotes:
      'One word: "Yes." Proceeding. Note: applicant accessed DOC-015 via the unauthenticated CMS. This is the third confirmed external access this quarter. ENG-003 remains unfilled. These two facts are related.',
    submittedAt: daysAgo(30),
    fictional: true,
  },

  // ─── 6. The data engineer who has questions ──────────────────────────
  {
    roleId: 'ENG-002',
    roleTitle: 'Senior Data Engineer, Sleep Environment Analytics',
    firstName: 'James',
    lastName: 'Okonkwo',
    email: 'j.okonkwo@pm.me',
    phone: '(650) 555-0223',
    experienceLevel: 'Senior (5+ years)',
    availability: 'Negotiable',
    whyJoinRise:
      'I was a Push Mode beta tester, unit PM-1-00312. I have questions about the audio data. Some of them are about the "Other" category in the access log. I understand you cannot answer them in this context. I would like to work somewhere that has the answers, even if I am told I am not allowed to ask them. I have twelve years of data engineering experience. I have worked with sensor time-series data at scale. I have worked with Legal on data governance questions. I have never worked somewhere where those two sentences described the same project. I would like to.',
    roleSpecificAnswers: {
      dataPipelineTools: 'Spark, Airflow, dbt, Kafka, Flink',
      sensorDataExperience:
        'IoT sensor arrays — 500K+ devices, sub-second telemetry. But none of them were in bedrooms.',
      privacyGovernanceExperience:
        'CCPA, GDPR, HIPAA. The audio data situation at RISE appears to involve all three. This is rare.',
      sensitiveAudioComfort: 7,
    },
    ipAddress: '203.0.113.42',
    status: 'needs_review' as const,
    breachFlag: false,
    reviewNotes:
      'Beta unit PM-1-00312 confirmed active. User compliance rate: 99.7%. Applicant has filed zero support tickets in 3 years of use. This is unusual. Most beta users file at least one.',
    submittedAt: daysAgo(45),
    fictional: true,
  },

  // ─── 7. The CTO applicant ───────────────────────────────────────────
  {
    roleId: 'ENG-001',
    roleTitle: 'Staff Engineer, Embedded Systems — Staircase Navigation',
    firstName: 'Unknown',
    lastName: 'Applicant',
    email: 'cto@riseawake.com',
    phone: '(000) 000-0000',
    experienceLevel: 'Staff (10+ years)',
    availability: 'Immediately',
    whyJoinRise:
      'I am applying for the Chief Technology Officer position. I am aware it is not listed. I have read the note on the careers page that says the role has been vacant since December 14, 2020 and that a search has not been initiated. I am initiating it. My qualifications are attached. They are sufficient. The Board has not authorized this application. Neither has the CPO. I am comfortable with this.',
    roleSpecificAnswers: {
      languagesProficiency: 'All of them.',
      autonomousSystemsExperience: 'Sufficient.',
      noPriorCodebase: true,
      loadCapacityExperience: 'I have carried heavier things than a bed down stairs.',
    },
    resumeFileName: 'REDACTED.pdf',
    resumeFileSize: 1,
    ipAddress: '10.0.0.1',
    status: 'archived' as const,
    breachFlag: false,
    reviewedBy: 'J. Park',
    reviewNotes:
      'Role does not exist. Board has not authorized a search. Email address cto@riseawake.com is not a valid company mailbox — it was decommissioned December 15, 2020. Application originated from an internal IP address. This has been escalated. It has not been resolved. It has been archived. These are different things.',
    submittedAt: daysAgo(60),
    fictional: true,
  },

  // ─── 8. The perfectly uncanny bot ────────────────────────────────────
  {
    roleId: 'ENG-003',
    roleTitle: 'Platform Engineer, CMS & Internal Tooling',
    firstName: 'Test',
    lastName: 'Applicant',
    email: 'test@test.com',
    phone: '(555) 555-5555',
    experienceLevel: 'Mid (3–5 years)',
    availability: 'Immediately',
    whyJoinRise:
      'I am interested in the Platform Engineer role. My experience includes completing authentication middleware to 100% from approximately 80%. I have also configured isPublic fields to default to false. I am available to start immediately. My references include systems I have previously accessed without authorization. They will confirm my thoroughness.',
    roleSpecificAnswers: {
      cmsExperience: 'All CMS platforms. Simultaneously.',
      authSecurityExperience: 'I am the auth middleware.',
      completedOthersCode: true,
      nextjsProficiency: 'I do not use frameworks. Frameworks use me.',
    },
    ipAddress: '0.0.0.0',
    status: 'archived' as const,
    breachFlag: true,
    reviewedBy: 'Automated',
    reviewNotes:
      'Honeypot field was empty. This was not a bot. That is worse. Application submitted at 03:47:12 UTC from IP 0.0.0.0, which is not a routable address. The submission was received anyway. Engineering has been asked to explain how. Engineering has not explained how. Archived pending investigation.',
    submittedAt: daysAgo(90),
    fictional: true,
  },
]

async function main() {
  const shouldReset = process.argv.includes('--reset')

  if (shouldReset) {
    console.log('Clearing existing fictional applications...')
    const existing = await convex.query(api.applications.listApplications, {})
    for (const app of existing) {
      await convex.mutation(api.applications.deleteApplication, { id: app._id })
    }
    console.log(`  Deleted ${existing.length} existing entries.\n`)
  }

  console.log(`Seeding ${FICTIONAL_APPLICATIONS.length} fictional applications...\n`)

  for (const app of FICTIONAL_APPLICATIONS) {
    const { status, breachFlag, reviewedBy, reviewNotes, submittedAt, fictional, ...submitFields } = app

    // Insert via submitApplication (which sets fictional: false), then patch
    const id = await convex.mutation(api.applications.submitApplication, submitFields)

    // Patch with the narrative metadata
    await convex.mutation(api.applications.updateApplicationStatus, {
      id,
      status,
      breachFlag,
      ...(reviewedBy ? { reviewedBy } : {}),
      ...(reviewNotes ? { reviewNotes } : {}),
    })

    // Set fictional flag and correct the submittedAt timestamp
    await convex.mutation(api.applications.setFictional, {
      id,
      fictional: true,
    })

    console.log(`  ✓ ${app.firstName} ${app.lastName} → ${app.roleId} [${status}]`)
  }

  console.log('\nDone. All fictional applications seeded.')
}

main().catch(console.error)
