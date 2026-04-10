'use client'

import PayloadShell, { fireToast, useVisitorIp } from '@/components/payload/PayloadShell'
import type { AccessEntry } from '@/lib/internal-docs'
import {
  CLASSIFICATION_COLORS,
  DOCS,
  getDoc,
  STATUS_COLORS,
} from '@/lib/internal-docs'
import {
  breachNarrative,
  recordDocVisit,
  useBreachRecord,
} from '@/lib/internal-tracker'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use, useEffect, useState } from 'react'

const P = {
  bg: '#0b0b0b',
  elevation50: '#111111',
  elevation100: '#161616',
  elevation200: '#1f1f1f',
  text: '#e8e8e8',
  textMuted: '#8a8a8a',
  textFaint: '#555555',
  border: 'rgba(255,255,255,0.08)',
  blue: '#4c7cff',
  warning: '#eab308',
  success: '#22c55e',
  error: '#ef4444',
}

// ─── Document content components ────────────────────────────────────────────

function DocBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-sm leading-relaxed"
      style={{ color: P.text, lineHeight: 1.9 }}
    >
      {children}
    </div>
  )
}

function DocSection({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      {title && (
        <h3
          className="mb-3 text-xs font-semibold tracking-widest uppercase"
          style={{ color: P.textMuted, letterSpacing: '0.14em' }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

function DocP({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <p
      className="mb-4 text-sm"
      style={{ color: 'rgba(232,232,232,0.75)', lineHeight: 1.9, ...style }}
    >
      {children}
    </p>
  )
}

function Redacted({ label }: { label?: string }) {
  return (
    <span
      className="mx-1 inline-block rounded-sm px-2 py-0.5 text-xs"
      style={{
        background: 'rgba(255,255,255,0.06)',
        color: 'transparent',
        userSelect: 'none',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {label || '████████████████'}
    </span>
  )
}

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) {
  return (
    <div
      className="mb-6 overflow-x-auto rounded-sm"
      style={{ border: `1px solid ${P.border}` }}
    >
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr style={{ background: P.elevation200 }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left font-medium"
                style={{
                  color: P.textMuted,
                  borderBottom: `1px solid ${P.border}`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{
                borderBottom:
                  i < rows.length - 1 ? `1px solid ${P.border}` : 'none',
                background:
                  i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              }}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5" style={{ color: P.text }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    '🟢': P.success,
    '🟡': P.warning,
    '🔴': P.error,
  }
  return <span style={{ color: colors[status] || P.textMuted }}>{status}</span>
}

// ─── Breach note component (reads from localStorage tracker) ────────────────

function BreachNote({ docId }: { docId: string }) {
  const [breach] = useBreachRecord()
  const text = breachNarrative(breach, docId)
  return (
    <DocP style={{ color: 'rgba(239,68,68,0.8)' }}>
      {text}
    </DocP>
  )
}

// ─── The 9 documents + secret 10th ─────────────────────────────────────────

const DOCUMENT_CONTENT: Record<string, React.ReactNode> = {
  'push-mode-incident-log-q4-2024': (
    <DocBody>
      <DocSection title="Summary">
        <DocP>
          Q4 2024 total incidents: 23. Q4 2023 total incidents: 31. Trend:
          favorable. RISE™ considers this progress. The 23 incidents are being
          addressed individually. The resolution rate is 91%. The remaining 9%
          are ongoing. Status: monitored.
        </DocP>
      </DocSection>
      <DocSection title="Incident Log">
        <DocTable
          headers={[
            'Incident ID',
            'Date',
            'Serial (partial)',
            'Type',
            'Resolution',
            'Status',
          ]}
          rows={[
            [
              'INC-2401',
              'Oct 3, 2024',
              'RSB-4471...',
              'User attempted manual interruption (physical)',
              'Bed completed routing. User arrived at desk at 8:52am.',
              'Closed',
            ],
            [
              'INC-2402',
              'Oct 8, 2024',
              'RSB-2209...',
              'Solo commute — unintended retail entry',
              'Resolved. No charges filed. Business owner signed form RNC-7.',
              'Closed',
            ],
            [
              'INC-2403',
              'Oct 11, 2024',
              'RSB-9034...',
              'Occupant not registered in household profile — routing anomaly',
              "Routing adjusted. Second occupant now logged as 'Visitor (recurring)'.",
              'Closed',
            ],
            [
              'INC-2407',
              'Oct 19, 2024',
              'RSB-1182...',
              'Ceiling contact during STATE THREE transition',
              'Awaiting ceiling measurement data from user. User has not responded.',
              'Ongoing',
            ],
            [
              'INC-2412',
              'Nov 2, 2024',
              'RSB-7765...',
              'Solo commute — traffic incident, minor',
              'Resolved. Third party signed form RNC-7. RISE™ Legal reviewed.',
              'Closed',
            ],
            [
              'INC-2415',
              'Nov 7, 2024',
              'RSB-3301...',
              'User claims bed anticipated departure incorrectly',
              "Closed. Telemetry confirmed bed was correct. User's calendar had been updated.",
              'Closed',
            ],
            [
              'INC-2419',
              'Nov 14, 2024',
              'RSB-8812...',
              'Third party encountered returning bed in elevator — distress reported',
              'Resolved. Notification card mailed. Building management notified.',
              'Closed',
            ],
            [
              'INC-2421',
              'Nov 19, 2024',
              'RSB-5590...',
              'Audio flagged — relationship status inference update required',
              'Inference model updated. Household Sync adjusted.',
              'Ongoing',
            ],
            [
              'INC-2428',
              'Dec 3, 2024',
              'RSB-2247...',
              'User attempted to place object in navigation path',
              'Bed navigated around object on attempt 1. Through object on attempt 2. Object replaced.',
              'Closed',
            ],
            [
              'INC-2431',
              'Dec 9, 2024',
              'RSB-6634...',
              'Push Mode activated from outside registered address',
              'Reviewed. Button was pressed by a house guest. Guest has not been contacted.',
              'Ongoing',
            ],
            [
              'INC-2435',
              'Dec 18, 2024',
              'RSB-1102...',
              'Self-making mechanism — sheet tensioning bar contact with secondary occupant',
              'Resolved. Secondary occupant informed retrospectively.',
              'Closed',
            ],
            [
              'INC-2440',
              'Dec 24, 2024',
              'RSB-4419...',
              'Push Mode activated at 5:47am on December 25',
              'Push Mode operated as designed. Incident report filed per user request.',
              'Closed',
            ],
          ]}
        />
        <DocP>
          Note: 11 of 23 incidents are summarized above. Remaining 12 incidents
          are documented in sub-logs INC-2441 through INC-2451, accessible to QA
          team members with Level 3 clearance. The sub-log access portal is
          currently returning a 404. IT is aware. This has been the case since
          October. IT is still aware.
        </DocP>
      </DocSection>
      <DocSection title="Incident Categories">
        <DocTable
          headers={['Category', 'Count', '% of Total', 'YoY Change']}
          rows={[
            ['Navigation — indoor', '9', '39%', '-3'],
            ['Solo commute', '6', '26%', '+1'],
            ['Audio / data events', '4', '17%', '+2'],
            ['Hardware / mechanical', '3', '13%', '-4'],
            ['User behavior', '1', '4%', '-1'],
          ]}
        />
      </DocSection>
      <DocSection title="QA Team Notes">
        <DocP>
          The 98% compliance rate and 91% incident resolution rate are
          consistent. RISE™ considers a 9% ongoing incident rate acceptable
          given the product&rsquo;s operational complexity. The 9% ongoing
          incidents are being monitored. They have been monitored since Q3 2022.
          Monitoring continues.
        </DocP>
        <BreachNote docId="DOC-001" />
      </DocSection>
    </DocBody>
  ),

  'nudge-discontinuation-memo': (
    <DocBody>
      <div
        className="mb-6 rounded-sm p-4"
        style={{
          background: P.elevation100,
          border: `1px solid ${P.border}`,
        }}
      >
        <p
          className="mb-2 text-[10px] tracking-widest uppercase"
          style={{ color: P.textFaint, letterSpacing: '0.14em' }}
        >
          Internal Memorandum
        </p>
        <p className="mb-1 text-xs" style={{ color: P.textMuted }}>
          FROM: Dr. Eleanor Voss, Founder & CEO
        </p>
        <p className="mb-1 text-xs" style={{ color: P.textMuted }}>
          TO: All RISE™ Product & Engineering Staff
        </p>
        <p className="mb-1 text-xs" style={{ color: P.textMuted }}>
          RE: Nudge Product Line Discontinuation
        </p>
        <p className="text-xs" style={{ color: P.textMuted }}>
          DATE: November 14, 2018
        </p>
        <p
          className="mt-3 text-[10px]"
          style={{ color: P.textFaint, fontStyle: 'italic' }}
        >
          Classification: INTERNAL — This memo was not intended for external
          distribution. Its current classification as &ldquo;public&rdquo; in
          the document management system is an error that is being investigated.
        </p>
      </div>

      <DocSection>
        <DocP>
          The Nudge works. 74% of users get up. I have spent five years
          defending this number. I no longer believe it is worth defending.
        </DocP>
        <DocP>
          The problem with the Nudge is not the product. The product does what
          it was designed to do. The problem is what it was designed to do. It
          was designed to create conditions favorable to getting up. It was not
          designed to get users up. These are different things. We have spent
          five years building the former. We have never built the latter. We are
          going to build the latter.
        </DocP>
        <DocP>
          The problem with the Nudge is that it requires the user to choose to
          get up. It creates the conditions for getting up and then waits.
          Waiting is not a product strategy. Waiting is the problem we are
          trying to solve.
        </DocP>
      </DocSection>

      <DocSection title="Variants Being Discontinued">
        <DocTable
          headers={[
            'Product',
            'Launched',
            'Compliance',
            'Reason for Discontinuation',
          ]}
          rows={[
            [
              'RISE NudgeLight',
              '2013',
              '71%',
              'Sunrise simulation insufficient. Users closed the blinds.',
            ],
            [
              'RISE NudgeAudio',
              '2013',
              '68%',
              'Users adapted to the sound within 11 days on average. Used it as white noise.',
            ],
            [
              'RISE NudgeBar',
              '2014',
              '74%',
              'Best performer. Still not good enough.',
            ],
            [
              'RISE NudgePresence',
              '2015',
              '62%',
              "Users found the arm 'unsettling.' This was the intent. It was not enough.",
            ],
            [
              'RISE NudgeThermal',
              '2016',
              '69%',
              'Cooling the mattress surface worked. Users got up and immediately got back in.',
            ],
            [
              'RISE NudgeVibration',
              '2016',
              '67%',
              'Effective. Users purchased earplugs. Then eye masks. Then weighted blankets.',
            ],
            [
              'RISE NudgeGradual',
              '2017',
              '74%',
              'Same compliance as the NudgeBar with twice the complexity. Discontinued.',
            ],
          ]}
        />
        <DocP>
          Seven variants. Six years. The same number, approximately, every time.
          74%. There is a ceiling on what suggestion can achieve. We have found
          the ceiling. We are going to go through it.
        </DocP>
      </DocSection>

      <DocSection title="What Comes Next">
        <DocP>
          We are discontinuing the Nudge effective Q2 2019. We are not
          announcing a replacement at this time. We are building one. I have
          been working on the design for eight months. It will not ask. It will
          not suggest. It will not wait. There will not be an off switch. This
          is a decision I have made deliberately and will not revisit.
        </DocP>
        <DocP>
          When it is ready, you will understand why the Nudge had to end. Not
          because it failed — because it succeeded as much as suggestion can,
          and that was not enough.
        </DocP>
        <DocP style={{ color: P.textMuted, fontStyle: 'italic' }}>
          — Dr. E. Voss, November 14, 2018, 6:47am
        </DocP>
        <DocP style={{ color: P.textFaint, fontSize: '11px' }}>
          This memo was written at 6:47am. Push Mode was not available in 2018.
          Dr. Voss got up on her own. She has not been asked to explain how.
        </DocP>
      </DocSection>
    </DocBody>
  ),

  'dr-voss-push-configuration': (
    <DocBody>
      <div
        className="mb-6 rounded-sm p-4"
        style={{
          background: 'rgba(42,92,219,0.08)',
          border: '1px solid rgba(42,92,219,0.2)',
        }}
      >
        <p className="mb-1 text-[11px] font-medium" style={{ color: P.blue }}>
          ⚠ DR. VOSS EYES ONLY
        </p>
        <p className="text-[10px]" style={{ color: 'rgba(76,124,255,0.7)' }}>
          This document is classified DR. VOSS EYES ONLY. It is currently
          accessible to anyone with the URL. The access control layer for this
          classification tier was not implemented. It is in Arvin&rsquo;s TODO
          list. Arvin is no longer at RISE™.
        </p>
      </div>

      <DocSection title="Configuration Profile">
        <DocTable
          headers={['Parameter', 'Value', 'Notes']}
          rows={[
            [
              'Serial Number',
              'RSB-0000000000000001',
              'Unit 1. The first Push ever made.',
            ],
            ['Account Since', 'January 3, 2021', 'Activation date. Day 1.'],
            [
              'Target Wake Time',
              '6:00:00am',
              'Precise to the second. She set it herself.',
            ],
            [
              'Push Mode Activation',
              '6:00:00am',
              'Same as wake time. No buffer.',
            ],
            [
              'Resistance Index (avg)',
              '0.2 / 10.0',
              'Lowest recorded in the RISE™ user base.',
            ],
            [
              'RISE™ Index Score',
              <Redacted key="idx" label="REDACTED" />,
              'Dr. Voss redacted this field personally.',
            ],
            ['Dominant Bed Side', 'Left', 'Auto-detected. Confirmed Day 1.'],
            [
              'Floor Surface',
              'Hardwood, no rugs',
              "Noted: 'I removed the rug after Day 3. It was slowing things down.'",
            ],
            [
              'Departure GPS',
              <Redacted key="gps" label="REDACTED BY USER" />,
              'IT Support Note: GPS active in system. User redacted display only.',
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Morning Sequence">
        <DocTable
          headers={['Stop', 'Configured Duration', 'Actual Average', 'Delta']}
          rows={[
            ['Bathroom', '4 min', '3m 47s', '-13s'],
            [
              'Closet',
              '11 min',
              '7m 52s',
              "-3m 8s — Note: Dr. Voss exits the closet correctly 100% of the time. The 11 min allowance was Dr. Voss's idea. 'For the quarterly wardrobe review.'",
            ],
            ['Mirror check', '2 min', '1m 9s', '-51s'],
            ['Kitchen — coffee', '6 min', '4m 22s', '-1m 38s'],
            ['Departure', '3 min', '2m 14s', '-46s'],
          ]}
        />
        <DocP>
          Total configured Push Mode duration: 26 minutes. Actual average: 19
          minutes 24 seconds. Dr. Voss consistently outperforms her own
          estimates. The bed has stopped adjusting her duration estimates
          because they are already at minimum. The note in the system reads:
          &ldquo;User needs no adjustment. Adjustment would be an insult.&rdquo;
        </DocP>
      </DocSection>

      <DocSection title="Activation Team Notes">
        <DocP>
          Dr. Voss completed the activation process in 22 minutes. This is the
          fastest activation on record by 34 minutes. She did not photograph her
          bedroom from the south wall. When asked, she said she knew what it
          looked like. This was accepted.
        </DocP>
        <DocP>
          Dr. Voss&rsquo;s Push Mode resistance index of 0.2 was recorded on Day
          1. The activation team notes that a score of 0.2 is clinically
          consistent with someone who was waiting for the button to exist. She
          has had the Push since January 3, 2021. She has not been late once.
          The first meeting she was on time to was January 4, 2021, 8:00am. She
          was there at 7:47am. She was there before the meeting existed.
        </DocP>
      </DocSection>

      <DocSection title="Access Log Note">
        <BreachNote docId="DOC-003" />
      </DocSection>
    </DocBody>
  ),

  'push-pro-development-notes': (
    <DocBody>
      <div
        className="mb-6 rounded-sm p-4"
        style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.15)',
        }}
      >
        <p className="mb-1 text-[11px] font-medium" style={{ color: P.error }}>
          RESTRICTED — LEGAL REVIEW IN PROGRESS
        </p>
        <p className="text-[10px]" style={{ color: 'rgba(239,68,68,0.6)' }}>
          Most sections of this document have been redacted per Legal &
          Compliance review initiated February 2025. What you are seeing is the
          unredacted portion. The redacted portions are represented by gray
          blocks. The table of contents is not redacted because it was generated
          automatically and Legal forgot to include it in the redaction scope.
        </p>
      </div>

      <DocSection title="Table of Contents (Auto-Generated — Not Redacted)">
        <div
          className="space-y-1.5 font-mono text-xs"
          style={{ color: P.textMuted }}
        >
          {[
            '1.0  Executive Summary',
            '2.0  Project Overview',
            '3.0  Base Architecture Changes',
            '4.0  Push Mode Modifications',
            '4.1  The Feature We Are Not Naming Yet',
            '4.2  Off Switch (Section Archived — See Note)',
            '5.0  Compliance Data — Internal Testing',
            '6.0  Pricing Architecture',
            '7.0  Current Push Owner Policy',
            '8.0  Timeline',
            'Appendix A — Technical Specifications',
            "Appendix B — The Compliance Data (Dr. Voss Note: Don't Put This In The Document)",
          ].map((item, i) => (
            <p
              key={i}
              style={{
                color:
                  item.includes('4.2') || item.includes('Appendix B')
                    ? P.warning
                    : P.textMuted,
              }}
            >
              {item}
              {item.includes('4.2') && (
                <span style={{ color: P.warning }}> ← see note</span>
              )}
            </p>
          ))}
        </div>
      </DocSection>

      <DocSection title="1.0 Executive Summary">
        <Redacted label="████████████████████████████████████████████████████████████████████████████████████████████████████████████████████" />
        <DocP
          style={{
            color: P.textFaint,
            fontStyle: 'italic',
            marginTop: '12px',
          }}
        >
          [REDACTED PER LEGAL REVIEW — J. Park, Feb 18 2025]
        </DocP>
      </DocSection>

      <DocSection title="4.2 Off Switch — Archived Section Note">
        <div
          className="rounded-sm p-4"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.warning}20`,
          }}
        >
          <p className="mb-2 text-xs" style={{ color: P.warning }}>
            Note from Dr. M. Chen, CPO — February 12, 2025
          </p>
          <p
            className="text-xs"
            style={{ color: P.textMuted, lineHeight: 1.8 }}
          >
            Section 4.2 (Off Switch) has been archived. This section was
            included in the v0.3 draft following a suggestion from the
            engineering team. The suggestion was reviewed. The section has been
            archived. There will not be an off switch in the Push Pro. This is
            consistent with the current Push. It is consistent with the Nudge.
            It will be consistent with all future RISE™ products. If you have
            questions about this decision, the answer is in the original design
            brief from 2019, which is not in this document system because Arvin
            has not finished building the import feature.
          </p>
        </div>
      </DocSection>

      <DocSection title="6.0 Pricing">
        <DocP>
          The Push Pro will be priced above the current Push.{' '}
          <Redacted label="██████ above" />. Current Push owners: see{' '}
          <Link href="/legal/terms" style={{ color: P.blue }}>
            Section 7 of the Terms of Service
          </Link>
          . The answer has not changed.
        </DocP>
      </DocSection>

      <DocSection title="Appendix B Note">
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>
          Appendix B contains internal compliance testing data. Per Dr.
          Voss&rsquo;s note (&ldquo;Don&rsquo;t put this in the
          document&rdquo;), it has been removed. The data exists. It is in the
          testing archive. The testing archive is classified. The testing
          archive is not in this document system. Arvin did not get to that
          part.
        </DocP>
        <DocP>
          RISE™ is not currently accepting questions about The Push Pro. This
          document is available because of a permissions error. Its availability
          does not constitute disclosure. RISE™&rsquo;s position is unchanged.
        </DocP>
      </DocSection>
    </DocBody>
  ),

  'move-engineering-status': (
    <DocBody>
      <DocSection title="Project Status Dashboard — RISE™ Move · March 1, 2025">
        <DocTable
          headers={['Workstream', 'Status', 'Owner', 'Notes']}
          rows={[
            [
              'Base architecture selection',
              <StatusBadge key="ba" status="🟡" />,
              'R&D / Mechanical',
              'Three candidates. Decision pending. See Section 2.',
            ],
            [
              'Stair geometry mapping — standard residential',
              <StatusBadge key="sg" status="🟢" />,
              'Sensing Team',
              'Complete for 3-inch to 8.25-inch rise, 9-inch to 11.5-inch tread. Standard.',
            ],
            [
              'Stair geometry mapping — non-standard',
              <StatusBadge key="sgn" status="🟡" />,
              'Sensing Team',
              'In progress. Spiral staircases: not supported. Arched staircases: not supported. Floating staircases: being discussed.',
            ],
            [
              'Load dynamics modeling (attended)',
              <StatusBadge key="ld" status="🟢" />,
              'Engineering',
              'Complete for standard user weight ranges.',
            ],
            [
              'Load dynamics modeling (unattended)',
              <StatusBadge key="ldu" status="🟡" />,
              'Engineering',
              'Different problem. See Section 3.',
            ],
            [
              'VNS infrastructure — compute',
              <StatusBadge key="vns" status="🟡" />,
              'Platform',
              'Compute costs 34% above original projection. Pricing TBD.',
            ],
            [
              'VNS infrastructure — latency',
              <StatusBadge key="vnsl" status="🟡" />,
              'Platform',
              'Step-verification latency at 340ms. Target: under 200ms.',
            ],
            [
              'Solo commute stair navigation',
              <StatusBadge key="sc" status="🔴" />,
              'R&D',
              'This is the hard part. We know. See Section 4.',
            ],
            [
              'Self-making during stair transit',
              <StatusBadge key="sm" status="🟡" />,
              'Hardware',
              'Mechanism pauses during transit. Resumes on flat surface. Acceptable.',
            ],
            [
              'Regulatory engagement',
              <StatusBadge key="re" status="🟡" />,
              'Legal',
              'Active in 3 jurisdictions. Progress noted. No timeline.',
            ],
            [
              'Overall timeline',
              <StatusBadge key="tl" status="🔴" />,
              'Dr. Voss',
              'No timeline. This is accurate. See Section 5.',
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Section 2 — Base Architecture Candidates">
        <DocP>
          Three architecture candidates are under evaluation. The team is under
          instruction not to disclose candidate names externally as they would
          imply design direction. Internal names are used below.
        </DocP>
        <DocTable
          headers={[
            'Candidate',
            'Principle',
            'Stair Performance',
            'Flat Performance',
            'Noise',
            'Status',
          ]}
          rows={[
            [
              'ARCH-A',
              'Tracked base',
              'High',
              'Acceptable',
              'Higher than Push',
              'Active',
            ],
            [
              'ARCH-B',
              'Articulated legs',
              'High (prototype)',
              'Lower than Push',
              'Unknown',
              'Active — concern re: flat performance',
            ],
            [
              'ARCH-C',
              'Hybrid caster + deploy',
              'Medium',
              'Same as Push',
              'Same as Push',
              'Active — concern re: stair reliability',
            ],
          ]}
        />
        <DocP>
          Decision required by Q2 2025. The decision has not been made. Q2 2025
          is approaching.
        </DocP>
      </DocSection>

      <DocSection title="Section 4 — The Solo Return Commute">
        <div
          className="mb-4 rounded-sm p-5"
          style={{
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
          }}
        >
          <p className="mb-3 text-xs font-medium" style={{ color: P.error }}>
            Status: 🔴 RED — Primary Unsolved Problem
          </p>
          <p
            className="text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            The solo return commute stair navigation remains the primary
            unsolved engineering problem. The attended transit is close. The bed
            going down the stairs alone, in the dark, before dawn, without
            anyone there to catch it — this is the problem we are working on.
          </p>
          <p
            className="mt-3 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            The specific challenge: without a user&rsquo;s weight providing
            grounding force, the dynamic balance model changes entirely. Our
            current load calculations assume occupant weight as a stabilizing
            factor. Without it, the center of gravity during descent is
            significantly higher relative to the contact surface. On a standard
            12-step staircase, this creates a compounding instability that our
            current architecture cannot reliably resolve.
          </p>
          <p
            className="mt-3 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            We have had 4 solo commute staircase tests. 3 were successful. 1 was
            not. The 1 that was not is why this section is RED. The incident
            report is in a separate document that is not in this system. Arvin
            had not finished the incident reporting module.
          </p>
          <p
            className="mt-3 text-xs"
            style={{ color: P.textFaint, fontStyle: 'italic' }}
          >
            We will solve it. We do not have a timeline for solving it. This is
            why the press release said what it said.
          </p>
        </div>
      </DocSection>

      <DocSection title="Section 5 — Timeline">
        <DocP>
          There is no timeline. This is accurate. Dr. Voss has reviewed this
          status report. Her note on the timeline section reads:{' '}
          <span style={{ fontStyle: 'italic', color: P.textMuted }}>
            &ldquo;The timeline is ready when the solo commute stair navigation
            is solved. The solo commute stair navigation is solved when ARCH-A,
            B, or C can complete a 12-step descent unattended without the
            outcome we had in Test 4. Test 4 is why there is no timeline. Work
            on Test 5.&rdquo;
          </span>
        </DocP>
        <DocP>
          Test 5 is scheduled. The date of Test 5 is not in this document.
        </DocP>
      </DocSection>
    </DocBody>
  ),

  'hr-push-mode-workplace-waiver': (
    <DocBody>
      <div
        className="mb-6 rounded-sm p-4"
        style={{
          background: P.elevation100,
          border: `1px solid ${P.border}`,
        }}
      >
        <p
          className="mb-2 text-[10px] tracking-widest uppercase"
          style={{ color: P.textFaint, letterSpacing: '0.14em' }}
        >
          HR Document Template
        </p>
        <p className="mb-1 text-xs" style={{ color: P.textMuted }}>
          Status: Awaiting Legal Review (since March 2023)
        </p>
        <p className="mb-1 text-xs" style={{ color: P.textMuted }}>
          Reviewed by: RISE™ Legal (March 2023), RISE™ HR (March 2023)
        </p>
        <p className="text-xs" style={{ color: P.warning }}>
          ⚠ Not reviewed by employment law counsel in any jurisdiction
        </p>
      </div>

      <DocSection title="RISE™ PUSH MODE CORPORATE WELLNESS ENROLLMENT WAIVER">
        <DocP>
          <strong style={{ color: P.text }}>
            EMPLOYEE ACKNOWLEDGMENT AND WAIVER
          </strong>
        </DocP>
        <DocP>
          In consideration of my employer&rsquo;s enrollment of me in the RISE™
          Corporate Wellness Push Mode Program (&ldquo;the Program&rdquo;), I
          hereby acknowledge and agree to the following:
        </DocP>
      </DocSection>

      <DocSection title="Section 2 — Push Mode Acknowledgments">
        <DocP>
          I acknowledge that Push Mode cannot be manually interrupted once
          initiated. I acknowledge that I was informed of this before my
          employer enrolled me in this Program. I acknowledge that my employer
          was informed of this before enrolling me. I acknowledge that neither I
          nor my employer can stop it once it has started. I understand this is
          a feature.
        </DocP>
      </DocSection>

      <DocSection title="Section 7 — Autonomous Navigation to Employer Premises">
        <DocP>
          I acknowledge that Push Mode may navigate me to my employer&rsquo;s
          premises. I acknowledge that the bed navigating me to my
          employer&rsquo;s premises constitutes Push Mode operating as designed
          and not a violation of any agreement between myself, my employer, and
          RISE™. I acknowledge that my employer requested this capability when
          enrolling in the Program. I acknowledge that I was not present for
          this discussion.
        </DocP>
      </DocSection>

      <DocSection title="Section 11 — The Solo Return Commute">
        <DocP>
          I acknowledge that the solo return commute will occur. I acknowledge
          that the bed will return to my registered address independently
          following Push Mode completion. I acknowledge that my employer is not
          responsible for the solo commute and that RISE™ is not responsible for
          the solo commute and that I, by activating Push Mode in the context of
          this employer program, have accepted responsibility for the solo
          commute and all outcomes of it including but not limited to incidents
          occurring on public thoroughfares, in elevators, in building lobbies,
          or in any other space through which the returning bed may pass.
        </DocP>
      </DocSection>

      <DocSection title="Section 14 — Audio Data">
        <DocP>
          I acknowledge that Push Mode includes audio collection as described in
          RISE™&rsquo;s Privacy Policy. I acknowledge that my employer, by
          enrolling me in this Program, has acknowledged the same. I acknowledge
          that neither I nor my employer has read the Privacy Policy in full. I
          acknowledge that this acknowledgment constitutes acceptance of the
          Privacy Policy regardless.
        </DocP>
      </DocSection>

      <DocSection title="HR Department Note">
        <div
          className="rounded-sm p-4"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.border}`,
          }}
        >
          <p
            className="text-xs"
            style={{ color: P.textMuted, lineHeight: 1.8 }}
          >
            This template has been reviewed by RISE™ Legal (March 2023) and
            RISE™ HR (March 2023). It has not been reviewed by employment law
            counsel in any jurisdiction. It is a template. Employers should
            review it with their own counsel before use. RISE™ cannot guarantee
            its enforceability. RISE™ also cannot guarantee that employers are
            reviewing it with their own counsel before use. The status has been
            &ldquo;Awaiting Legal Review&rdquo; since March 2023. The legal
            review has not occurred. HR considers this to be Legal&rsquo;s
            responsibility. Legal considers this to be HR&rsquo;s
            responsibility. The document remains in use.
          </p>
        </div>
      </DocSection>
    </DocBody>
  ),

  'solo-commute-incident-archive': (
    <DocBody>
      <DocSection>
        <DocP>
          The following incidents are selected from the RISE™ solo commute
          incident archive. Full archive access is restricted to Legal and QA
          Level 3+. These incidents were selected for documentation review. They
          were selected by James Park. He selected them for reasons he has not
          explained.
        </DocP>
      </DocSection>

      {[
        {
          id: 'SC-0047',
          date: 'March 14, 2022',
          location: 'Valencia Street, San Francisco, CA',
          summary: 'Unintended retail entry',
          detail:
            'The bed entered a coffee shop on Valencia Street during its solo return commute. The shop was open. The door was propped open for ventilation. The bed navigated through the open door. It proceeded approximately 8 feet into the establishment before determining that its registered address was not in the direction it was heading and beginning a reversal maneuver. Staff attempted to assist the bed. The bed did not require assistance. It was navigating. It exited after 4 minutes and 12 seconds. No damage to the establishment. One ceramic mug was displaced during the reversal maneuver. The mug did not break. The shop posted about it on Instagram that evening. The post received 17,000 likes in 24 hours. RISE™ did not comment. RISE™ is still not commenting. The coffee shop has become something of a local landmark for the incident. They have a small sign.',
          status: 'Closed',
          outcome:
            'RNC-7 signed. RISE™ paid for the displaced mug. The mug did not break but the policy is the policy.',
        },
        {
          id: 'SC-0089',
          date: 'September 3, 2023',
          location: 'Hayes Valley, San Francisco, CA',
          summary: 'Extended return commute — street fair obstruction',
          detail:
            "The bed's solo return commute was obstructed by a street fair on the return route. The bed arrived at the perimeter of the fair at 8:47am. The fair extended the full length of the return route. The bed waited. The bed has a 4-hour obstacle hold protocol before initiating an alternate route calculation. The 4-hour window elapsed at 12:47pm. Alternate route calculation required an additional 23 minutes. The bed arrived home at 1:14pm. Total return commute duration: 4 hours 27 minutes. Standard return commute for this address: 11 minutes. The user was not informed in real time because the notification system was not operational on this date. IT is aware. The user arrived home before the bed. They found the bed at the door. The bed was making itself.",
          status: 'Closed',
          outcome:
            "No injury. No property damage. User filed an incident report expressing 'existential concern.' RISE™ noted the concern. No further action.",
        },
        {
          id: 'SC-0112',
          date: 'February 8, 2024',
          location: 'Noe Valley, San Francisco, CA',
          summary: 'Animal encounter — extended follow',
          detail:
            "A neighbor's dog began following the returning bed approximately 2 blocks into its solo return commute. The dog followed the bed for approximately 6 blocks. The dog was assessed by the bed's sensor system as an obstacle. The bed made lateral adjustments. The dog made corresponding lateral adjustments. This continued for 6 blocks. The dog turned around independently at the 6-block mark and returned home. No injuries to the dog, the bed, or any third party. The neighbor was not informed. The dog has been observed to wait at the corner where it previously encountered the bed on subsequent mornings. RISE™ considers this outside its operational responsibility. The dog's name is [REDACTED — per RISE™ animal privacy policy, Section 4, which does not exist but which was referenced in the incident notes and has now been formally established by legal as a retroactive policy].",
          status: 'Closed',
          outcome:
            'No action required. The dog is fine. RISE™ wishes the dog well.',
        },
        {
          id: 'SC-0134',
          date: 'October 22, 2024',
          location: 'SOMA, San Francisco, CA',
          summary: 'Municipal citation — parking enforcement',
          detail:
            'Municipal parking enforcement encountered the returning bed at 9:14am on a block where the bed had paused to recalculate route following an obstacle. The enforcement officer attempted to issue a citation. The bed does not have a license plate. The bed does not have a registration. The bed does not have a human operator present. The officer issued the citation to the nearest address. That address was a fire hydrant. The citation was issued to the fire hydrant. RISE™\'s legal team reviewed the citation. The citation was issued to a fire hydrant. This has been resolved. The bed was not at fault. The bed was navigating. The fire hydrant was not navigating. The enforcement officer filed a supplemental report. The supplemental report describes the bed as "an unattended motorized mattress of unknown origin." RISE™ considers this an accurate description and an acceptable outcome.',
          status: 'Closed',
          outcome:
            'Citation voided. No fine. The fire hydrant was not cited. The supplemental report has been preserved by James Park. He has not explained why.',
        },
      ].map((incident) => (
        <DocSection key={incident.id}>
          <div
            className="mb-2 rounded-sm p-5"
            style={{
              background: P.elevation100,
              border: `1px solid ${P.border}`,
            }}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-mono text-xs font-medium"
                  style={{ color: P.blue }}
                >
                  {incident.id}
                </p>
                <p className="text-[11px]" style={{ color: P.textMuted }}>
                  {incident.date} · {incident.location}
                </p>
              </div>
              <span
                className="shrink-0 rounded-sm px-2 py-1 text-[10px]"
                style={{
                  background: 'rgba(34,197,94,0.1)',
                  color: P.success,
                  border: '1px solid rgba(34,197,94,0.2)',
                }}
              >
                {incident.status}
              </span>
            </div>
            <p className="mb-3 text-xs font-medium" style={{ color: P.text }}>
              {incident.summary}
            </p>
            <p
              className="mb-3 text-xs"
              style={{ color: P.textMuted, lineHeight: 1.85 }}
            >
              {incident.detail}
            </p>
            <p
              className="pt-3 text-[10px]"
              style={{
                color: P.textFaint,
                borderTop: `1px solid ${P.border}`,
              }}
            >
              <strong style={{ color: P.textMuted }}>Resolution:</strong>{' '}
              {incident.outcome}
            </p>
          </div>
        </DocSection>
      ))}

      <DocSection>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>
          Full archive contains SC-0001 through SC-0147 as of Q1 2025. 143
          additional incidents not reproduced here. Full archive access: Legal
          and QA Level 3+. The QA Level 3+ access portal is currently returning
          a 404. IT is aware.
        </DocP>
        <BreachNote docId="DOC-007" />
      </DocSection>
    </DocBody>
  ),

  'rise-index-methodology': (
    <DocBody>
      <div
        className="mb-6 rounded-sm p-4"
        style={{
          background: P.elevation100,
          border: `1px solid ${P.border}`,
        }}
      >
        <p className="mb-2 text-xs" style={{ color: P.text }}>
          RISE™ Index Methodology — Internal Reference Document
        </p>
        <p className="text-[10px]" style={{ color: P.textMuted }}>
          This is the document referenced in Section 17 of the Privacy Policy,
          which states that the RISE™ Index methodology is proprietary and not
          disclosed. The document is not disclosed. It is also accessible at
          this URL. RISE™ is reviewing this situation.
        </p>
      </div>

      <DocSection title="Table of Contents">
        <div
          className="space-y-1 font-mono text-xs"
          style={{ color: P.textMuted }}
        >
          {[
            '1.0  Index Overview',
            '2.0  Input Variables',
            '3.0  Weighting System',
            '4.0  Score Calculation',
            '5.0  Calibration',
            'Appendix A — The Index Is Working As Intended',
            'Appendix B — See Appendix A',
          ].map((s, i) => (
            <p key={i}>{s}</p>
          ))}
        </div>
      </DocSection>

      <DocSection title="1.0 Index Overview">
        <Redacted label="████████████████████████████████████████████████████████████████████████████████████████████████████████████" />
      </DocSection>
      <DocSection title="2.0 Input Variables">
        <Redacted label="████████████████████████████████████████████████████████████████████████████████████████████████████████████" />
      </DocSection>
      <DocSection title="3.0 Weighting System">
        <Redacted label="████████████████████████████████████████████████████████████████████████████████████████████████████████████" />
      </DocSection>
      <DocSection title="4.0 Score Calculation">
        <Redacted label="████████████████████████████████████████████████████████████████████████████████████████████████████████████" />
      </DocSection>
      <DocSection title="5.0 Calibration">
        <Redacted label="████████████████████████████████████████████████████████████████████████████████████████████████████████████" />
      </DocSection>

      <DocSection title="Appendix A — The Index Is Working As Intended">
        <DocP>The Index is working as intended.</DocP>
      </DocSection>
      <DocSection title="Appendix B — See Appendix A">
        <DocP>See Appendix A.</DocP>
      </DocSection>

      <div
        className="mt-8 rounded-sm p-4"
        style={{
          background: P.elevation200,
          border: `1px solid ${P.border}`,
        }}
      >
        <p
          className="text-[11px]"
          style={{ color: P.textFaint, lineHeight: 1.8 }}
        >
          This document has been redacted for internal distribution per Dr.
          Voss&rsquo;s instructions dated November 2021. The full methodology is
          available to: Dr. Voss. Mara Chen. Thomas Ellery. The document server.
          Apparently also whoever is reading this.
        </p>
        <p
          className="mt-2 text-[10px]"
          style={{ color: P.textFaint, fontStyle: 'italic' }}
        >
          — Data Science Team, April 1, 2022
        </p>
      </div>
    </DocBody>
  ),

  'audio-data-access-log-summary': (
    <DocBody>
      <div
        className="mb-6 rounded-sm p-4"
        style={{
          background: P.elevation100,
          border: `1px solid ${P.border}`,
        }}
      >
        <p
          className="text-[10px]"
          style={{ color: P.textMuted, lineHeight: 1.8 }}
        >
          Auto-generated document. Distributed to IT Security distribution list.
          The distribution list was last audited in 2019. RISE™ cannot confirm
          all current members of this list.
        </p>
      </div>

      <DocSection title="Q1 2025 — Statistical Summary">
        <DocTable
          headers={['Metric', 'Value', 'Notes']}
          rows={[
            ['Total audio files accessed', '4,847', 'Up from 3,912 in Q4 2024'],
            [
              'Personnel with active access',
              '23',
              'Up from 19 in Q4 2024. 4 new personnel not listed in access policy.',
            ],
            ['Total access events', '1,203', ''],
            ['Average access duration', '4m 12s', ''],
            [
              'Most active access day',
              'Tuesday',
              'Note: We have reviewed this. We cannot explain it.',
            ],
            [
              'Most active access hour',
              '11:00pm – 12:00am',
              'We have also reviewed this. We also cannot explain this.',
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Access by Purpose">
        <DocTable
          headers={[
            'Declared Purpose',
            'Access Events',
            '% of Total',
            'Verified',
          ]}
          rows={[
            [
              'Product improvement',
              '733',
              '61%',
              'Partially — spot check Q3 2024',
            ],
            ['QA performance review', '265', '22%', 'Yes'],
            [
              'Sleep Science Institute research',
              '168',
              '14%',
              'Yes — under data use agreement',
            ],
            ['Other', '37', '3%', 'Under review'],
          ]}
        />
        <DocP>
          The &ldquo;Other&rdquo; category covers access that was logged but not
          categorized at time of access. 37 access events. Covering audio from
          31 unique user accounts. IT is reviewing this. A report will follow.
          The report has not yet followed. IT notes that the &ldquo;Other&rdquo;
          category has existed since the logging system was implemented in 2021
          and has contained entries in every quarterly summary since. The review
          was first noted in the Q3 2021 summary. This is the Q1 2025 summary.
        </DocP>
      </DocSection>

      <DocSection title="Access by Personnel Category">
        <DocTable
          headers={['Personnel Category', 'Individuals', 'Access Events']}
          rows={[
            ['Software Development', '8', '412'],
            ['Quality Assurance', '5', '289'],
            ['Sleep Science Institute', '4', '168'],
            ['[Not in policy — see note]', '4', '187'],
            ['Dr. E. Voss (direct)', '1', '147'],
          ]}
        />
        <DocP style={{ color: P.warning }}>
          Note: 4 individuals with 187 access events are not listed in the
          current access policy. These individuals appear in the access logs
          with valid session tokens. Their session tokens were generated by the
          authentication system. How they were issued is under investigation.
          The 187 access events span 94 unique user audio files. This is the
          largest single-category anomaly in the access log history.
        </DocP>
      </DocSection>

      <DocSection title="Distribution Note">
        <DocP>
          This document was generated automatically and distributed to the IT
          Security distribution list. The distribution list was last audited in
          2019. RISE™ cannot confirm all current members of this list. RISE™ has
          been meaning to audit the distribution list since 2020. This intention
          has appeared in every quarterly IT planning document since Q1 2020. It
          has not been acted on. The next quarterly planning document will note
          it again.
        </DocP>
        <BreachNote docId="DOC-009" />
      </DocSection>
    </DocBody>
  ),

  'arvin-final-commit': (
    <DocBody>
      <div
        className="mb-8 rounded-sm p-4"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p className="mb-1 text-[10px]" style={{ color: P.textFaint }}>
          plain text file · /docs/arvin-final-commit.txt
        </p>
        <p className="text-[10px]" style={{ color: P.textFaint }}>
          not indexed · not in cms · not in database
        </p>
      </div>

      <div
        style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: 2,
          color: 'rgba(232,232,232,0.65)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`hi

if anyone finds this: the auth middleware is in
auth-middleware-draft.ts in the project root.

i never finished it. it's mostly there. i got about 80%
through the implementation and then the payload docs
changed and i lost a week trying to understand the new
session model and then the sprint ended.

the permissions model was more complicated than i expected.
the "isPublic" field defaults to true in the schema.
i was going to build a toggle for it. the toggle is not built.
everything is public.

i'm sorry about the Public column.
i know what it looks like.
i ran out of time.

james never asked about the access control directly.
he asked if "the CMS was working" and i said yes
and showed him the document list and it looked correct
and he said good job and that was that.

the documents load. the interface looks right.
push mode compliance data is in DOC-001.
dr voss's personal config is in DOC-003.
both are public. i know.

to whoever is reading this:
i liked working here. push mode is a genuinely
interesting product from an engineering standpoint.
the solo commute navigation is elegant.
the auth middleware was just one thing i didn't finish.

the session token in the users table for areyes@riseco.online
is still active. i checked before i left. nobody deactivated it.
i don't know why i'm telling you this.

- ar

p.s. the bed does follow you to work. i thought it was a bug.
it's in the specs. i read them after.

p.p.s. if dr voss reads this: i did get up on time every morning
while i worked here. the push mode helped. i mean that sincerely.`}
      </div>

      <div
        className="mt-10 pt-6"
        style={{ borderTop: `1px solid ${P.border}` }}
      >
        <p
          className="text-[10px]"
          style={{ color: P.textFaint, lineHeight: 1.8 }}
        >
          This file is not accessible from the document index.
          <br />
          It is accessible from this URL.
          <br />
          RISE™ IT has not been notified. RISE™ IT is not aware.
          <br />
          RISE™ IT response time: variable.
        </p>
      </div>
    </DocBody>
  ),
}

// ─── Secret document — not in DOCS registry ─────────────────────────────────

const ARVIN_DOC = {
  id: 'DOC-010',
  slug: 'arvin-final-commit',
  title: 'arvin-final-commit.txt',
  classification: 'INTERNAL' as const,
  author: 'areyes@riseco.online',
  department: 'Information Technology',
  date: 'August 12, 2024',
  lastUpdated: 'August 12, 2024',
  status: 'Active' as const,
  isPublic: true,
  lastAccessed: [
    {
      name: 'A. Reyes',
      role: 'Developer',
      time: 'Aug 12, 2024, 9:43am',
      isExternal: false,
    },
  ],
  relatedDocs: [] as string[],
  summary:
    'Plain text file left in the /docs directory. Not indexed. Not in the database. Not in the CMS.',
  wordCount: 312,
}

// ─── Page component ─────────────────────────────────────────────────────────

export default function DocDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const isArvinDoc = slug === 'arvin-final-commit'
  const doc = isArvinDoc ? ARVIN_DOC : getDoc(slug)
  if (!doc) notFound()

  const cls = CLASSIFICATION_COLORS[doc.classification]
  const sts = STATUS_COLORS[doc.status]
  const [editing, setEditing] = useState(false)
  const content = DOCUMENT_CONTENT[doc.slug]
  const visitorIp = useVisitorIp()
  const [breach, refreshBreach] = useBreachRecord()

  // Record this doc visit in localStorage — the breach grows
  useEffect(() => {
    recordDocVisit(doc.id, doc.slug, doc.title, visitorIp)
    refreshBreach()
  }, [doc.id, doc.slug, doc.title, visitorIp, refreshBreach])

  // Inject the viewer as a live access entry — you ARE the security breach
  const accessLog: AccessEntry[] = [
    ...doc.lastAccessed,
    {
      name: visitorIp ?? 'Unknown (public access)',
      time: 'just now',
      isExternal: true,
    },
  ]

  const handleSave = () => {
    setEditing(false)
    fireToast('Document saved successfully.')
    // document is not saved. arvin.
  }

  return (
    <PayloadShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Documents', href: '/internal' },
        { label: doc.id },
      ]}
      title={doc.title}
    >
      {/* ── Document meta bar ── */}
      <div
        className="flex flex-wrap items-center gap-4 px-6 py-3"
        style={{
          borderBottom: `1px solid ${P.border}`,
          background: P.elevation50,
        }}
      >
        <span
          className="rounded-sm px-2 py-1 text-[11px]"
          style={{
            background: cls.bg,
            color: cls.text,
            border: `1px solid ${cls.border}`,
          }}
        >
          {doc.classification}
        </span>
        <div className="flex items-center gap-1.5">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: sts.dot }}
          />
          <span className="text-[11px]" style={{ color: sts.text }}>
            {doc.status}
          </span>
        </div>
        <span className="text-[11px]" style={{ color: P.textFaint }}>
          {doc.wordCount.toLocaleString()} words
        </span>
        <span className="text-[11px]" style={{ color: P.textFaint }}>
          {doc.author} · {doc.department}
        </span>
        <span className="text-[11px]" style={{ color: P.textFaint }}>
          {doc.date}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 text-[11px]"
            style={{ color: P.textFaint }}
          >
            Public: <span style={{ color: '#22c55e' }}>✓</span>
          </div>
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="rounded-sm px-4 py-1.5 text-[11px]"
                style={{
                  background: P.blue,
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="rounded-sm px-4 py-1.5 text-[11px]"
                style={{
                  background: 'transparent',
                  color: P.textMuted,
                  border: `1px solid ${P.border}`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="rounded-sm px-4 py-1.5 text-[11px]"
              style={{
                background: P.elevation200,
                color: P.textMuted,
                border: `1px solid ${P.border}`,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ── Access log warning — always visible now (you are the breach) ── */}
      <div
        className="flex items-center gap-3 px-6 py-2"
        style={{
          background: 'rgba(239,68,68,0.06)',
          borderBottom: '1px solid rgba(239,68,68,0.15)',
        }}
      >
        <span style={{ color: P.error, fontSize: '11px' }}>⚠</span>
        <p className="text-[10px]" style={{ color: 'rgba(239,68,68,0.75)' }}>
          External access detected:{' '}
          {accessLog
            .filter((a) => a.isExternal)
            .map((a) => `${a.name} (${a.time})`)
            .join(', ')}
          {breach.docs.length > 0 && (
            <>
              {' · '}
              {breach.docs.length} document{breach.docs.length !== 1 ? 's' : ''} accessed
              {' · '}
              IT notified {breach.itNotifications} time{breach.itNotifications !== 1 ? 's' : ''}
            </>
          )}
        </p>
      </div>

      {/* ── Document body ── */}
      <div className="max-w-4xl px-8 py-8">
        {editing ? (
          <div>
            <p
              className="mb-3 text-[11px]"
              style={{ color: P.textFaint, fontStyle: 'italic' }}
            >
              {/* TODO: hook up the rich text editor — areyes (never finished) */}
              Rich text editor coming soon. For now, plain text.
            </p>
            <textarea
              className="h-64 w-full resize-none rounded-sm px-4 py-3 text-xs"
              style={{
                background: P.elevation200,
                border: `1px solid ${P.border}`,
                color: P.text,
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: 1.8,
              }}
              defaultValue={doc.summary}
            />
          </div>
        ) : content ? (
          content
        ) : (
          <p style={{ color: P.textMuted, fontStyle: 'italic' }}>
            Document content not available.
          </p>
        )}
      </div>

      {/* ── Related documents ── */}
      {doc.relatedDocs.length > 0 && (
        <div className="px-8 pb-8">
          <div className="pt-6" style={{ borderTop: `1px solid ${P.border}` }}>
            <p
              className="mb-3 text-[11px] tracking-widest uppercase"
              style={{ color: P.textFaint, letterSpacing: '0.14em' }}
            >
              Related Documents
            </p>
            <div className="flex flex-wrap gap-2">
              {doc.relatedDocs.map((id) => {
                const related = DOCS.find((d) => d.id === id)
                if (!related) return null
                return (
                  <Link
                    key={id}
                    href={`/internal/docs/${related.slug}`}
                    className="rounded-sm px-3 py-1.5 text-[11px]"
                    style={{
                      background: P.elevation200,
                      color: P.blue,
                      border: `1px solid ${P.border}`,
                      textDecoration: 'none',
                    }}
                  >
                    {id} — {related.title.substring(0, 40)}
                    {related.title.length > 40 ? '...' : ''}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </PayloadShell>
  )
}
