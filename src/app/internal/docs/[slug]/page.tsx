'use client'

import PayloadShell, {
  fireToast,
  useVisitorIp,
} from '@/components/payload/PayloadShell'
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
  useSessionName,
  visitorDisplayName,
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
  const sessionName = useSessionName()
  const text = breachNarrative(breach, docId, sessionName)
  return <DocP style={{ color: 'rgba(239,68,68,0.8)' }}>{text}</DocP>
}

// ─── The 9 documents + secret 10th ─────────────────────────────────────────

const DOCUMENT_CONTENT: Record<string, React.ReactNode> = {
  'push-mode-incident-log-q4-2024': (
    <DocBody>
      <DocSection title="Summary">
        <DocP>
          Q4 2024 total incidents: 23. Q4 2023 total incidents: 31. Trend:
          favorable. RISE considers this progress. The 23 incidents are being
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
              'Resolved. Third party signed form RNC-7. RISE Legal reviewed.',
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
          consistent. RISE considers a 9% ongoing incident rate acceptable
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
          TO: All RISE Product & Engineering Staff
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
          list. Arvin is no longer at RISE.
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
              'Lowest recorded in the RISE user base.',
            ],
            [
              'RISE Index Score',
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
            It will be consistent with all future RISE products. If you have
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
          RISE is not currently accepting questions about The Push Pro. This
          document is available because of a permissions error. Its availability
          does not constitute disclosure. RISE&rsquo;s position is unchanged.
        </DocP>
      </DocSection>
    </DocBody>
  ),

  'move-engineering-status': (
    <DocBody>
      <DocSection title="Project Status Dashboard — RISE Move · March 1, 2025">
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

      <DocSection title="Section 4.1 — Controlled Descent Failure Analysis">
        <div
          className="mb-4 rounded-sm p-5"
          style={{
            background: 'rgba(239,68,68,0.04)',
            border: '1px solid rgba(239,68,68,0.10)',
          }}
        >
          <p className="mb-3 text-xs font-medium" style={{ color: P.error }}>
            Classification: Safety-Critical
          </p>
          <p
            className="text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            The distinction between &ldquo;can descend stairs&rdquo; and
            &ldquo;can descend stairs safely&rdquo; is the entire problem. Three
            of four solo commute tests completed descent. The fourth is the
            reason this section exists.
          </p>
        </div>

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.textFaint, letterSpacing: '0.14em' }}
        >
          The Physics of Uncontrolled Descent
        </p>
        <DocP>
          A RISE Move bed descending a standard residential staircase (7.5-inch
          rise, 10-inch tread, 12 steps) must manage approximately 90 inches of
          vertical drop across roughly 120 inches of horizontal travel. During
          attended transit, the occupant&rsquo;s body weight — typically 120–250
          lbs distributed across the sleep surface — acts as ballast, lowering
          the system&rsquo;s center of gravity and creating a stabilizing
          inertia that resists rotational forces at each step transition.
        </DocP>
        <DocP>
          Remove the occupant for the solo return commute and you remove that
          ballast. The bed&rsquo;s unloaded center of gravity sits significantly
          higher relative to the stair nose contact point. At each step
          transition, the system must pitch forward to reach the next tread.
          Without occupant mass dampening that pitch, two failure modes emerge.
        </DocP>

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.error, letterSpacing: '0.14em' }}
        >
          Failure Mode 1 — Forward Topple (The Test 4 Problem)
        </p>
        <DocP>
          The bed&rsquo;s momentum during step-to-step transition exceeds the
          restoring torque available from the base architecture. The unit
          pitches past its recovery angle and cascades down the remaining steps
          as an uncontrolled falling object. This is what happened in Test 4.
          This is the outcome Dr. Voss referenced. An uncontrolled 80–120 lb
          object falling down a staircase is not a product. It is a liability.
        </DocP>

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.error, letterSpacing: '0.14em' }}
        >
          Failure Mode 2 — User-Present Descent Override
        </p>
        <DocP>
          During attended descent (user walking alongside or ahead), the
          bed&rsquo;s braking system must modulate speed to never exceed the
          user&rsquo;s walking pace on stairs. If the system&rsquo;s descent
          rate outpaces the user — even momentarily — the bed becomes a pushing
          force from behind. On stairs, a push from behind is a fall risk. This
          has occurred in testing. The user was not injured. The test was
          stopped. The near-miss was documented.
        </DocP>

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.textFaint, letterSpacing: '0.14em' }}
        >
          Why Braking Is Not Sufficient
        </p>
        <DocP>
          The intuitive solution — &ldquo;just brake harder&rdquo; — creates its
          own failure cascade. Aggressive braking on a pitched surface (stair
          descent angle ranges from 30° to 37° on standard residential stairs)
          generates lateral forces at the contact points. On carpet, this
          produces acceptable friction. On hardwood, tile, or
          runner-over-hardwood (common in residential settings), aggressive
          braking can initiate a slide. A sliding bed on a staircase is Failure
          Mode 1 with extra steps.
        </DocP>
        <DocP>
          The system needs modulated, continuous descent control — not
          stop-start braking. This is closer to an anti-lock braking problem
          than a simple brake problem. Each architecture candidate handles this
          differently:
        </DocP>
        <DocTable
          headers={[
            'Architecture',
            'Descent Control Approach',
            'Current Limitation',
          ]}
          rows={[
            [
              'ARCH-A (Tracked)',
              'Continuous track contact across multiple treads distributes load',
              'Track surface wear on hardwood is a durability and cosmetic concern',
            ],
            [
              'ARCH-B (Articulated legs)',
              'Per-leg force control allows active balance correction',
              'Control loop latency — current 340ms step-verification is too slow for real-time balance',
            ],
            [
              'ARCH-C (Hybrid caster + deploy)',
              'Deploys secondary contact points during descent',
              'Deployment mechanism adds 1.2 seconds per step — unacceptable for 12-step descent time',
            ],
          ]}
        />

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.textFaint, letterSpacing: '0.14em' }}
        >
          The Compounding Problem
        </p>
        <DocP>
          Stair descent instability is not linear. Each step transition that is
          slightly off-nominal feeds forward into the next transition. By step 6
          or 7 of a 12-step descent, small errors in pitch angle, contact
          timing, or speed have compounded into a state that the control system
          was not designed to recover from. The system does not fail on step 1.
          It fails on step 8, 9, or 10 — when the accumulated error exceeds the
          recovery envelope.
        </DocP>
        <DocP>
          This is why 3 of 4 tests succeeded. The margin between success and
          failure is narrow, and which side the system lands on depends on
          initial conditions that vary between runs: carpet compression,
          humidity affecting surface friction, the exact angle at which the unit
          entered the first step, micro-vibrations from the self-making
          mechanism&rsquo;s last motor position.
        </DocP>

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.warning, letterSpacing: '0.14em' }}
        >
          The Attended Descent Problem (User Safety)
        </p>
        <DocP>
          Even when the solo commute is set aside, the attended descent presents
          its own unresolved safety concern:
        </DocP>
        <div
          className="mb-4 rounded-sm p-4"
          style={{
            background: P.elevation100,
            border: `1px solid ${P.border}`,
          }}
        >
          <p
            className="mb-2 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            1. User exits bed on the upper floor.
          </p>
          <p
            className="mb-2 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            2. User begins walking down the stairs.
          </p>
          <p
            className="mb-2 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            3. Bed follows, descending behind the user.
          </p>
          <p
            className="text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            4. Bed&rsquo;s descent rate must be precisely matched to or slower
            than the user&rsquo;s pace — at all times, on every step.
          </p>
        </div>
        <DocP>
          If the user stumbles, pauses, or slows unexpectedly, the bed must
          detect this and arrest its own descent within one step transition
          (approximately 0.4 seconds at normal stair-walking pace). Current
          sensor-to-brake response time is 340ms. That leaves a 60ms margin.
          This is not enough margin for a safety-critical system where the
          consequence of failure is a 100+ lb object striking a person from
          behind on a staircase.
        </DocP>
        <DocP>
          The VNS step-verification latency target of sub-200ms exists
          specifically because of this scenario. At 200ms sensor-to-brake, the
          margin becomes 200ms — still tight, but within range of what
          automotive safety systems consider acceptable for active collision
          avoidance.
        </DocP>

        <p
          className="mt-6 mb-2 text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: P.textFaint, letterSpacing: '0.14em' }}
        >
          What Solving This Looks Like
        </p>
        <div
          className="mb-4 rounded-sm p-4"
          style={{
            background: P.elevation100,
            border: `1px solid ${P.border}`,
          }}
        >
          <p
            className="mb-3 text-xs"
            style={{ color: P.text, lineHeight: 1.85 }}
          >
            The solo commute descent is solved when:
          </p>
          <p
            className="mb-2 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            <strong style={{ color: P.text }}>1.</strong> The selected
            architecture (ARCH-A, B, or C) can complete a 12-step unattended
            descent 100 times consecutively without a single topple event — not
            75 of 100, not 99 of 100. One hundred of one hundred. The acceptable
            failure rate for an autonomous heavy object descending a staircase
            inside someone&rsquo;s home is zero.
          </p>
          <p
            className="mb-2 text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            <strong style={{ color: P.text }}>2.</strong> The attended descent
            braking response achieves sub-200ms latency with verified real-world
            testing across all supported stair surface types (carpet, hardwood,
            tile, vinyl, runner-over-hardwood).
          </p>
          <p
            className="text-xs"
            style={{ color: P.textMuted, lineHeight: 1.85 }}
          >
            <strong style={{ color: P.text }}>3.</strong> The system includes a
            mechanical failsafe — independent of software — that physically
            prevents forward pitch past the recovery angle. Software fails. The
            failsafe cannot be software.
          </p>
        </div>
        <DocP style={{ color: 'rgba(239,68,68,0.7)', fontStyle: 'italic' }}>
          None of these three conditions are met today. This is why the timeline
          section says what it says.
        </DocP>
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
          Reviewed by: RISE Legal (March 2023), RISE HR (March 2023)
        </p>
        <p className="text-xs" style={{ color: P.warning }}>
          ⚠ Not reviewed by employment law counsel in any jurisdiction
        </p>
      </div>

      <DocSection title="RISE PUSH MODE CORPORATE WELLNESS ENROLLMENT WAIVER">
        <DocP>
          <strong style={{ color: P.text }}>
            EMPLOYEE ACKNOWLEDGMENT AND WAIVER
          </strong>
        </DocP>
        <DocP>
          In consideration of my employer&rsquo;s enrollment of me in the RISE
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
          RISE. I acknowledge that my employer requested this capability when
          enrolling in the Program. I acknowledge that I was not present for
          this discussion.
        </DocP>
      </DocSection>

      <DocSection title="Section 11 — The Solo Return Commute">
        <DocP>
          I acknowledge that the solo return commute will occur. I acknowledge
          that the bed will return to my registered address independently
          following Push Mode completion. I acknowledge that my employer is not
          responsible for the solo commute and that RISE is not responsible for
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
          RISE&rsquo;s Privacy Policy. I acknowledge that my employer, by
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
            This template has been reviewed by RISE Legal (March 2023) and
            RISE HR (March 2023). It has not been reviewed by employment law
            counsel in any jurisdiction. It is a template. Employers should
            review it with their own counsel before use. RISE cannot guarantee
            its enforceability. RISE also cannot guarantee that employers are
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
          The following incidents are selected from the RISE solo commute
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
            'The bed entered a coffee shop on Valencia Street during its solo return commute. The shop was open. The door was propped open for ventilation. The bed navigated through the open door. It proceeded approximately 8 feet into the establishment before determining that its registered address was not in the direction it was heading and beginning a reversal maneuver. Staff attempted to assist the bed. The bed did not require assistance. It was navigating. It exited after 4 minutes and 12 seconds. No damage to the establishment. One ceramic mug was displaced during the reversal maneuver. The mug did not break. The shop posted about it on Instagram that evening. The post received 17,000 likes in 24 hours. RISE did not comment. RISE is still not commenting. The coffee shop has become something of a local landmark for the incident. They have a small sign.',
          status: 'Closed',
          outcome:
            'RNC-7 signed. RISE paid for the displaced mug. The mug did not break but the policy is the policy.',
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
            "No injury. No property damage. User filed an incident report expressing 'existential concern.' RISE noted the concern. No further action.",
        },
        {
          id: 'SC-0112',
          date: 'February 8, 2024',
          location: 'Noe Valley, San Francisco, CA',
          summary: 'Animal encounter — extended follow',
          detail:
            "A neighbor's dog began following the returning bed approximately 2 blocks into its solo return commute. The dog followed the bed for approximately 6 blocks. The dog was assessed by the bed's sensor system as an obstacle. The bed made lateral adjustments. The dog made corresponding lateral adjustments. This continued for 6 blocks. The dog turned around independently at the 6-block mark and returned home. No injuries to the dog, the bed, or any third party. The neighbor was not informed. The dog has been observed to wait at the corner where it previously encountered the bed on subsequent mornings. RISE considers this outside its operational responsibility. The dog's name is [REDACTED — per RISE animal privacy policy, Section 4, which does not exist but which was referenced in the incident notes and has now been formally established by legal as a retroactive policy].",
          status: 'Closed',
          outcome:
            'No action required. The dog is fine. RISE wishes the dog well.',
        },
        {
          id: 'SC-0134',
          date: 'October 22, 2024',
          location: 'SOMA, San Francisco, CA',
          summary: 'Municipal citation — parking enforcement',
          detail:
            'Municipal parking enforcement encountered the returning bed at 9:14am on a block where the bed had paused to recalculate route following an obstacle. The enforcement officer attempted to issue a citation. The bed does not have a license plate. The bed does not have a registration. The bed does not have a human operator present. The officer issued the citation to the nearest address. That address was a fire hydrant. The citation was issued to the fire hydrant. RISE\'s legal team reviewed the citation. The citation was issued to a fire hydrant. This has been resolved. The bed was not at fault. The bed was navigating. The fire hydrant was not navigating. The enforcement officer filed a supplemental report. The supplemental report describes the bed as "an unattended motorized mattress of unknown origin." RISE considers this an accurate description and an acceptable outcome.',
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
          RISE Index Methodology — Internal Reference Document
        </p>
        <p className="text-[10px]" style={{ color: P.textMuted }}>
          This is the document referenced in Section 17 of the Privacy Policy,
          which states that the RISE Index methodology is proprietary and not
          disclosed. The document is not disclosed. It is also accessible at
          this URL. RISE is reviewing this situation.
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
          The distribution list was last audited in 2019. RISE cannot confirm
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
          2019. RISE cannot confirm all current members of this list. RISE has
          been meaning to audit the distribution list since 2020. This intention
          has appeared in every quarterly IT planning document since Q1 2020. It
          has not been acted on. The next quarterly planning document will note
          it again.
        </DocP>
        <BreachNote docId="DOC-009" />
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-010: Headline Swipe File ────────────────────────────────────────
  'push-mode-headline-swipe-file': (
    <DocBody>
      <DocSection title="Engagement">
        <DocP>This document was produced by an external consultant engaged by the Growth Marketing team in Q3 2023. The consultant was briefed on Push Mode, the PM-1 remote, the RISE brand positioning, and the target customer profile. The consultant produced this document within 72 hours. The invoice for this document has not been paid. Accounts payable is aware.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Note from Dr. M. Chen, CPO: I want to be clear that several of these headlines do not reflect RISE&apos;s brand voice and will never be used. I am keeping this document because the underlying analysis is useful and because I want Legal to have reviewed everything. — MC, Sep 21 2023</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Note from J. Park, General Counsel: I have reviewed. Please see flagged items. Do not publish headlines marked [LEGAL HOLD]. Do not share this document externally. — JP</DocP>
      </DocSection>

      <DocSection title="Methodology">
        <DocP>Headlines generated using the Halbert direct response framework. Core equation: Interest = Curiosity + Big Promise. Target market: men 35–55, urban professionals, high compliance anxiety, productivity-oriented. Unique mechanism positioned as autonomous morning routing technology. All headlines tested against specificity, credibility, juxtaposition, and curiosity criteria.</DocP>
      </DocSection>

      <DocSection title="Category 1 — Pure Benefit Headlines">
        <DocTable
          headers={['#', 'Headline', 'Status']}
          rows={[
            ['1', 'The Bed That Gets You To Your Desk By 8:47am — Without Setting A Single Alarm', '✓ Approved'],
            ['2', 'Wake Up Broken. Arrive Early. Every Time. The 98% Compliance Rate No One Talks About.', '✓ Approved'],
            ['3', 'Your Morning Routine Is Broken. This Fixes It. Permanently. Without Your Permission.', '✓ Approved'],
            ['4', 'How To Add 47 Productive Minutes To Every Workday Without Touching Your Phone', '✓ Approved'],
            ['5', 'The Smart Bed That\'s Made Itself, Straightened Your Pillow, And Put You In The Car — Before You\'re Fully Awake', '✓ Approved'],
          ]}
        />
      </DocSection>

      <DocSection title="Category 2 — Curiosity + Authority Headlines">
        <DocTable
          headers={['#', 'Headline', 'Status']}
          rows={[
            ['6', 'Stanford Sleep Researchers REVEAL: The Reason Your Morning Willpower Always Fails (And The Autonomous System That Bypasses It Entirely)', '✓ Approved'],
            ['7', 'CEO Of A $200M Company ADMITS: The Real Reason He Hasn\'t Been Late To A Meeting In 3 Years Has Nothing To Do With Discipline', '✓ Approved'],
            ['8', 'Behavioral Scientists CONFIRM: The Human Brain Is Physiologically Incapable Of Consistent Morning Compliance — Except Under One Specific Condition', '✓ Approved'],
            ['9', 'NASA Engineers Once Studied This Problem. A Smart Bed Company Solved It. Duke University Has The Data.', '✓ Approved'],
            ['10', 'The Productivity Consultant Who Charged $15,000/Day REVEALS: The Only Morning System That Actually Works (And Why He Uses It Himself)', '✓ Approved'],
          ]}
        />
      </DocSection>

      <DocSection title="Category 3 — Newsworthy / Juxtaposition Headlines">
        <DocTable
          headers={['#', 'Headline', 'Status']}
          rows={[
            ['11', 'The Same Bed That Rolled A Hungover Man To His 9am Presentation — And He Delivered The Best Pitch Of His Career', '✓ Approved'],
            ['12', 'She Thought She Bought Him A Fancy Mattress. Two Months Later, She Promoted Him.', <span key="12n" style={{ color: P.warning }}>⚠ LEGAL HOLD — implied causation</span>],
            ['13', '340,000 People Are On The Waitlist For A Bed With No Off Switch. Here\'s Why They\'re Not Trying To Get Off It.', '✓ Approved'],
            ['14', 'The Productivity Tool That Works While You\'re Still Asleep — And Keeps Working When You Stop Trying', '✓ Approved'],
            ['15', 'A Man With A Hangover Got To The Office Before His Boss. The Bed Did Not Care About The Hangover.', '✓ Approved'],
          ]}
        />
      </DocSection>

      <DocSection title="Category 4 — First-Person Success Stories">
        <DocTable
          headers={['#', 'Headline', 'Status']}
          rows={[
            ['16', 'I Pressed One Button On A Tuesday. I Haven\'t Been Late Since. That Was 14 Months Ago.', '✓ Approved'],
            ['17', 'I Didn\'t Need More Willpower. I Needed Something That Didn\'t Ask For It.', '✓ Approved'],
            ['18', 'I Used To Snooze 4 Times. Now My Bed Doesn\'t Have A Snooze. I Made VP In June.', '✓ Approved'],
            ['19', 'My Wife Bought This Bed To Help Me. She Didn\'t Tell Me There Was No Off Switch. I Would Have Said No. I\'m Glad She Didn\'t.', <span key="19n" style={{ color: P.warning }}>⚠ LEGAL HOLD — consent framing</span>],
            ['20', 'The Morning I Realized I Wasn\'t Choosing To Get Up Anymore — And Why I Stopped Caring', '✓ Approved'],
          ]}
        />
      </DocSection>

      <DocSection title="Category 5 — Third-Person Stories">
        <DocTable
          headers={['#', 'Headline', 'Status']}
          rows={[
            ['21', 'A Software Engineer Who Hadn\'t Been On Time In 11 Years Got Promoted Twice After Pressing One Button', '✓ Approved'],
            ['22', 'She Bought It For Her Husband. Six Weeks Later, He Was Running Meetings She Used To Run.', <span key="22n" style={{ color: P.warning }}>⚠ LEGAL HOLD — gender framing review</span>],
            ['23', 'The Hollywood Actor Who Swore He\'d Never Use Productivity Tech — Until His Publicist Called His Bed And Asked What She Was Missing', '✓ Approved'],
            ['24', 'A Man Who Had Failed Every Morning Routine For A Decade Finally Found One That Didn\'t Require Him To Try', '✓ Approved'],
            ['25', 'The 58-Year-Old Who Outperformed The 26-Year-Old At The Same Company. His Bed Left At 7:52am. That Was The Difference.', '✓ Approved'],
          ]}
        />
      </DocSection>

      <DocSection title="Category 6 — Social Status / Comparison Headlines">
        <DocTable
          headers={['#', 'Headline', 'Status']}
          rows={[
            ['26', 'What Will Your Colleagues Think When You\'re Already At Your Desk While They\'re Still Fighting Their Snooze Button?', '✓ Approved'],
            ['27', 'The Bed Your Boss Probably Already Has (And The Reason He Never Mentions It)', '✓ Approved'],
            ['28', 'While You\'re Negotiating With Your Alarm Clock, 340,000 People On The Waitlist Are Getting Ready To Stop Negotiating Entirely', '✓ Approved'],
            ['29', 'No Willpower Required. No App Subscription. No Negotiating With Yourself At 6am. Just A Button And What Happens Next.', '✓ Approved'],
            ['30', 'The Last Morning Routine You\'ll Ever Have To Choose To Start', '✓ Approved'],
          ]}
        />
      </DocSection>

      <DocSection title="Legal Notes">
        <DocP>Headlines #12, #19, and #22 are on LEGAL HOLD pending review of implied causation, consent framing, and gender representation respectively. Do not use in any external-facing materials until cleared. — J. Park</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Additional note: Headline #19 (&ldquo;My Wife Bought This Bed... I Would Have Said No. I&apos;m Glad She Didn&apos;t.&rdquo;) was flagged as potentially the most effective in the set by the consultant and simultaneously as the most legally problematic by this office. We are aware of the tension. The headline will not be used. — JP</DocP>
      </DocSection>

      <DocSection title="Consultant's Final Note">
        <DocP style={{ fontStyle: 'italic', color: P.textMuted }}>&ldquo;I have written headlines for supplements, financial services, survival gear, and one very memorable campaign for a political figure I was asked not to name. I have never written for a product like this. Most products need headlines because the product alone can&apos;t close the sale. Push Mode doesn&apos;t need a headline. It needs someone to tell the customer what they&apos;re buying before they realize they already want it. These headlines do that. The product does the rest. You have something genuinely unusual here. I would use #17, #20, and #30 in that order. I would also recommend paying my invoice.&rdquo;</DocP>
        <DocP style={{ color: P.textFaint, fontSize: '11px' }}>— External Consultant, September 14, 2023. Invoice #INV-2023-0847. Amount: $18,500. Status: Unpaid.</DocP>
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-011: Buyer Agenda Matrix ─────────────────────────────────────────
  'push-mode-buying-agenda-matrix': (
    <DocBody>
      <DocSection title="Overview">
        <DocP>This analysis applies the seven-agenda buying psychology framework to the Push Mode customer. Each agenda is scored across four criteria: Relevance to product, Emotional Intensity, Likelihood of Driving Action, and Product Fit. Potential conflicts between agendas are identified and conflict resolution strategies are proposed for marketing and communications.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Commissioned by Growth Marketing, Q3 2023. Reviewed by CPO and CEO. Status: Under Review pending CEO follow-up meeting.</DocP>
      </DocSection>

      <DocSection title="Target Buyer Profile — Summary">
        <DocTable
          headers={['Dimension', 'Profile']}
          rows={[
            ['Primary Demographic', 'Men and women, 32–58, urban/suburban, professional or managerial'],
            ['Core Problem', 'Chronic morning compliance failure despite high motivation to change'],
            ['Emotional State', 'Frustrated with self, skeptical of willpower-based solutions, secretly relieved to outsource'],
            ['Relationship to Product', 'Wants to be the kind of person who gets up. Has stopped believing they are that person.'],
            ['Key Tension', 'Desires autonomy, resents needing help, will quietly accept help if the help doesn\'t ask permission'],
          ]}
        />
      </DocSection>

      <DocSection title="Agenda Scoring Matrix">
        <DocTable
          headers={['Agenda', 'Relevance (1–5)', 'Intensity (1–5)', 'Action Likelihood (1–5)', 'Product Fit (1–5)', 'Total', 'Conflict Risk']}
          rows={[
            ['#1 The Protector', '3', '3', '3', '3', '12', 'Low'],
            ['#2 The Warrior', '5', '5', '5', '5', '20', 'Medium'],
            ['#3 The Lover', '4', '4', '4', '4', '16', 'High'],
            ['#4 The Nurturer', '2', '2', '2', '2', '8', 'Low'],
            ['#5 The Mourner', '4', '4', '3', '3', '14', 'High'],
            ['#6 The Jester', '1', '1', '1', '1', '4', 'N/A'],
            ['#7 The Doctor', '3', '3', '3', '3', '12', 'Low'],
          ]}
        />
      </DocSection>

      <DocSection title="Agenda Analysis">
        <DocP><strong style={{ color: P.text }}>#2 THE WARRIOR — Score: 20/20 (Primary Agenda)</strong></DocP>
        <DocP>Push Mode is a Warrior product. The customer who buys Push Mode is not buying comfort. They are buying a system that will force them to perform. The Warrior agenda is driven by a desire to assert dominance — specifically, dominance over the self. The Push Mode customer has identified their own morning behavior as an obstacle to their goals and is willing to purchase a mechanism that removes their own agency to overcome it.</DocP>
        <DocP>Messaging should speak directly to this: the product is not a mattress. It is a performance system. The customer is not buying sleep comfort. They are buying compliance with their own ambitions. The button is not a convenience. It is a commitment.</DocP>

        <DocP><strong style={{ color: P.text }}>#3 THE LOVER — Score: 16/20 (Secondary Agenda, High Conflict Risk)</strong></DocP>
        <DocP>The Lover agenda is present and significant, but creates the most dangerous conflict in the matrix. Push Mode buyers frequently cite spousal influence in purchase decisions. The desire to be perceived as capable, productive, and reliable by a partner is a strong motivating force. However, the Lover agenda conflicts sharply with the Warrior agenda when the product&apos;s mechanism is foregrounded.</DocP>
        <DocP>Recommended resolution: Lead with Warrior, allow Lover to operate in the background. Testimonials framed as &ldquo;my partner noticed&rdquo; rather than &ldquo;my partner made me&rdquo; preserve both agendas without triggering conflict.</DocP>

        <DocP><strong style={{ color: P.text }}>#5 THE MOURNER — Score: 14/20 (Unexpected Significance)</strong></DocP>
        <DocP style={{ color: P.warning }}>Note: The Mourner score was the most surprising finding in this analysis and prompted the CEO follow-up meeting request.</DocP>
        <DocP>The Mourner agenda is driven by loss and a desire to return to a former self. A significant segment of Push Mode&apos;s actual customer base is experiencing what the consultant described as &ldquo;productivity grief&rdquo; — a specific form of loss characterized by the gap between who the customer used to be and who they have become. For these customers, Push Mode is not aspirational. It is restorative.</DocP>
        <DocP>This agenda is high-conflict with the Warrior because Mourner motivation is retrospective while Warrior motivation is prospective. Recommended strategy: segment Mourner-coded messaging to retargeting campaigns and email sequences for lapsed leads. Do not lead with it in acquisition.</DocP>

        <DocP><strong style={{ color: P.text }}>#1 THE PROTECTOR — Score: 12/20</strong></DocP>
        <DocP>Lower than expected but present. Some customers are motivated by the fear that continued non-compliance will have professional or relational consequences. Useful as a secondary pressure in messaging but should not be primary.</DocP>

        <DocP><strong style={{ color: P.text }}>#7 THE DOCTOR — Score: 12/20</strong></DocP>
        <DocP>Present in customers who frame their morning failures as symptoms of a systemic problem. Push Mode satisfies the Doctor agenda by offering a definitive, engineered solution. The 98% compliance rate functions as clinical evidence for this segment.</DocP>

        <DocP><strong style={{ color: P.text }}>#4 THE NURTURER — Score: 8/20 (Low Priority)</strong></DocP>
        <DocP>Weak signal. Some customers frame their purchase as being for their family. Useful for specific audience segments but does not reflect the primary motivation for most Push Mode buyers.</DocP>

        <DocP><strong style={{ color: P.text }}>#6 THE JESTER — Score: 4/20 (Actively Counterproductive)</strong></DocP>
        <DocP>Do not activate. Push Mode is not a funny product in its own marketing. The humor is a byproduct of the customer&apos;s relationship with it after purchase. Jester activation in acquisition is a conversion killer for this audience.</DocP>
      </DocSection>

      <DocSection title="Summary Recommendations">
        <DocTable
          headers={['Priority', 'Agenda', 'Use In']}
          rows={[
            ['Primary', 'Warrior', 'All acquisition messaging, hero copy, homepage'],
            ['Secondary', 'Lover', 'Testimonials, social proof, retargeting'],
            ['Tertiary', 'Mourner', 'Email nurture, lapsed lead retargeting only'],
            ['Supporting', 'Protector + Doctor', 'Comparison messaging, FAQ, objection handling'],
            ['Suppress', 'Jester', 'Nowhere in acquisition — organic only post-purchase'],
            ['Low priority', 'Nurturer', 'Specific audience segments only'],
          ]}
        />
      </DocSection>

      <DocSection title="Note on the CEO Follow-Up Meeting">
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Dr. Voss requested a follow-up meeting after reviewing the Mourner analysis. Specifically, she asked the consultant to elaborate on the concept of &ldquo;productivity grief&rdquo; and its relationship to the product&apos;s value proposition. The meeting has not yet been scheduled. Growth Marketing is coordinating. — Dr. M. Chen, CPO, October 2, 2023</DocP>
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-012: Attention Cluster & Reptilian Trigger Mapping ───────────────
  'push-mode-attention-cluster-analysis': (
    <DocBody>
      <DocSection title="Legal Hold Notice">
        <DocP style={{ color: P.error }}>This document is AWAITING LEGAL REVIEW. Sections 3 (Dominance Trigger Mapping) and 5 (Recommended Activation Language) have been flagged by General Counsel. Do not distribute. Do not use language from Section 5 in any external materials until cleared. — J. Park, General Counsel</DocP>
      </DocSection>

      <DocSection title="Executive Summary">
        <DocP>This analysis maps the attention clusters and reptilian brain triggers activated by Push Mode and its marketing. Push Mode activates six core reptilian triggers in a configuration that the consultant has not encountered in any other consumer product. The marketing&apos;s job is not to manufacture triggers. It is to not suppress them.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>The consultant&apos;s exact words: &ldquo;This is a marketer&apos;s dream. The product does everything I would normally have to lie about.&rdquo; This statement has been included for accuracy and is not an endorsement. — Dr. M. Chen</DocP>
      </DocSection>

      <DocSection title="The Six Reptilian Triggers — Push Mode Mapping">
        <DocP><strong style={{ color: P.text }}>Trigger 1: Survival</strong></DocP>
        <DocP>Push Mode activates survival instinct not through physical danger but through professional and social consequence. The customer&apos;s latent fear — that continued non-compliance will cost them their job, their status, or their self-concept — is the survival signal. The product&apos;s 98% compliance rate is the resolution.</DocP>

        <DocP><strong style={{ color: P.text }}>Trigger 2: Dominance</strong></DocP>
        <DocP style={{ color: P.warning }}>⚠ SECTION UNDER LEGAL REVIEW — see flagged note below.</DocP>
        <DocP>Dominance is the most powerful reptilian trigger for the Push Mode demographic. The product allows the customer to assert dominance over their own behavior. The customer does not have to exercise willpower. They purchase dominance over themselves.</DocP>
        <DocP style={{ color: P.error, fontSize: '11px' }}>Legal flag: &ldquo;Competitive framing of this type may activate aggressive emotional states that create purchase regret and elevated return rates. Recommend softening before use.&rdquo; — J. Park</DocP>

        <DocP><strong style={{ color: P.text }}>Trigger 3: Reproduction</strong></DocP>
        <DocP>Desirability and sexual status operate as reptilian triggers in a large portion of the Push Mode demographic. Testimonials referencing partner response activate this cluster without explicit framing. The trigger is present and should be used sparingly and indirectly.</DocP>

        <DocP><strong style={{ color: P.text }}>Trigger 4: Pain Avoidance</strong></DocP>
        <DocP>The reptilian brain prioritizes avoiding pain over acquiring gain. Push Mode&apos;s pain avoidance trigger is the elimination of the morning negotiation. Pain avoidance messaging: &ldquo;The negotiation ends the moment you press the button.&rdquo;</DocP>

        <DocP><strong style={{ color: P.text }}>Trigger 5: Novelty</strong></DocP>
        <DocP style={{ color: P.warning }}>⚠ SECTION UNDER LEGAL REVIEW — see flagged note below.</DocP>
        <DocP>Push Mode is a novel stimulus in the truest sense: no existing mental category accommodates &ldquo;a bed that rolls you to work.&rdquo; The novelty trigger sustains attention long enough for the rational brain to construct a justification for the purchase the reptilian brain has already made.</DocP>
        <DocP style={{ color: P.error, fontSize: '11px' }}>Legal flag: &ldquo;Claims of categorical uniqueness may be subject to challenge if competitors can demonstrate similar products. Recommend adding qualifying language.&rdquo; — J. Park</DocP>

        <DocP><strong style={{ color: P.text }}>Trigger 6: Control / Loss of Control</strong></DocP>
        <DocP>This is the most unusual trigger. Most products that activate control triggers do so by offering the customer more control. Push Mode activates the control trigger by offering the customer less. The reptilian brain, paradoxically, experiences relief when a threat to control is resolved by surrendering control to a trusted external system. Never frame the absence of an off switch as a loss. Frame it as a transfer to a more competent authority.</DocP>
      </DocSection>

      <DocSection title="Attention Cluster Summary">
        <DocTable
          headers={['Cluster', 'Primary Trigger', 'Activation Method', 'Legal Status']}
          rows={[
            ['Morning Failure Cost', 'Survival', 'Consequence framing in problem identification', '✓ Clear'],
            ['Self-Dominance', 'Dominance', 'Competitive self-comparison language', '⚠ Under Review'],
            ['Desirability Uplift', 'Reproduction', 'Indirect partner/social response framing', '✓ Clear'],
            ['Pain Elimination', 'Pain Avoidance', 'Negotiation-ending language', '✓ Clear'],
            ['Categorical Impossibility', 'Novelty', 'Anti-category positioning', '⚠ Under Review'],
            ['Authority Transfer', 'Control', 'Off switch as feature framing', '✓ Clear'],
          ]}
        />
      </DocSection>

      <DocSection title="Legal Review Status">
        <DocP>Sections 2 and 5 are under review. Resolution pending scheduled meeting between CPO and General Counsel. Meeting has not been scheduled.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>The meeting between CPO and General Counsel has not occurred as of the date of this document&apos;s last update. The document remains on hold. — Growth Marketing, February 2025</DocP>
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-013: StoryBrand SB7 Playbook ────────────────────────────────────
  'push-mode-storybrand-playbook': (
    <DocBody>
      <DocSection title="Engagement Context">
        <DocP>This document represents the completed StoryBrand BrandScript for Push Mode, developed using the SB7 framework. Each section includes the finalized messaging direction and the rationale for each decision.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Legal reviewed and approved Sections 1–6. Section 7 (Avoiding Failure) remains under separate legal review. — J. Park, General Counsel, November 10, 2023</DocP>
      </DocSection>

      <DocSection title="SB7 Element 1 — The Hero (Customer)">
        <DocTable
          headers={['Dimension', 'Push Mode Application']}
          rows={[
            ['Who is the hero?', 'A capable, motivated professional who knows they should be getting up earlier and cannot make themselves do it reliably.'],
            ['What does the hero want?', 'To be the version of themselves that gets up, shows up, and follows through — without the daily negotiation.'],
            ['Story gap', 'Current: loses 20–40 minutes every morning to the snooze-negotiation cycle. Desired: arrives early, prepared, with the morning already handled.'],
            ['One-sentence desire statement', '"I want to be someone who gets up when I say I will."'],
          ]}
        />
      </DocSection>

      <DocSection title="SB7 Element 2 — The Problem">
        <DocTable
          headers={['Problem Type', 'Push Mode Application']}
          rows={[
            ['The Villain', 'The snooze button. Not metaphorically — literally the snooze button.'],
            ['External Problem', 'The alarm goes off. The customer does not get up. They are late, rushed, or start the day feeling like they already failed.'],
            ['Internal Problem', 'They feel like a person who can\'t be trusted to follow through on their own intentions.'],
            ['Philosophical Problem', 'A person should be able to decide to get up and get up. The fact that they cannot is a fundamental unfairness.'],
          ]}
        />
      </DocSection>

      <DocSection title="SB7 Element 3 — The Guide (RISE)">
        <DocTable
          headers={['Guide Dimension', 'Push Mode Application']}
          rows={[
            ['Empathy statement', 'We know you\'ve tried. The alarm apps. The accountability partners. You\'re not the problem. The system is.'],
            ['Authority demonstration', '98% compliance rate. 340,000-person waitlist. The product doesn\'t lecture — it delivers.'],
            ['Guide positioning', 'RISE does not compete with the customer\'s willpower. RISE replaces the moment where willpower is required.'],
          ]}
        />
      </DocSection>

      <DocSection title="SB7 Element 4 — The Plan">
        <DocTable
          headers={['Step', 'Name', 'Description']}
          rows={[
            ['1', 'Press RISE.', 'One button. Push Mode initializes. The system takes responsibility for what happens next.'],
            ['2', 'Trust the process.', 'Push Mode routes you through your morning. You don\'t manage it. You participate in it.'],
            ['3', 'Arrive.', 'Every time. On your own terms — which are now enforced by something more reliable than intention.'],
          ]}
        />
      </DocSection>

      <DocSection title="SB7 Element 5 — The Call to Action">
        <DocTable
          headers={['CTA Type', 'Language', 'Placement']}
          rows={[
            ['Primary (Direct)', 'Join the Waitlist', 'Homepage hero, product page, nav bar'],
            ['Primary variant', 'Activate Push Mode', 'Post-purchase activation flow'],
            ['Transitional', 'See How It Works', 'Homepage below-fold, comparison section'],
          ]}
        />
      </DocSection>

      <DocSection title="SB7 Element 6 — Success">
        <DocTable
          headers={['Success Dimension', 'Description']}
          rows={[
            ['Immediate success', 'You are at your desk at the time you said you would be. Without negotiating.'],
            ['30-day success', 'The negotiation is gone. You stopped having the argument with yourself. You don\'t know exactly when it stopped.'],
            ['Identity success', 'You become the person who gets up. The bed changed the behavior. The behavior changed the self-concept.'],
            ['Relationship success', 'People around you notice before you say anything. Your partner notices. Your colleagues notice.'],
          ]}
        />
      </DocSection>

      <DocSection title="SB7 Element 7 — Avoiding Failure">
        <DocP style={{ color: P.error }}>⚠ THIS SECTION IS UNDER LEGAL REVIEW. Do not use this language in any external-facing materials until J. Park has cleared it.</DocP>
        <DocTable
          headers={['Failure Dimension', 'Description']}
          rows={[
            ['The ongoing cost', 'Every morning that starts with the snooze negotiation costs approximately 20 minutes of actual time and an unknown amount of self-regard.'],
            ['The compounding cost', 'Morning compliance failure compounds. The person who cannot get up on time builds a self-concept around that failure.'],
            ['What they lose', 'They lose the version of themselves they decided to be when they set the alarm. Every morning.'],
          ]}
        />
        <DocP style={{ color: P.warning }}>Legal hold note (J. Park): The &ldquo;compounding self-concept failure&rdquo; language may be read as exploiting psychological vulnerability. Recommend revision before use.</DocP>
        <DocP style={{ color: P.textFaint, fontSize: '11px' }}>The call between CPO and Legal regarding Section 7 has not occurred. Section 7 remains on hold. — Growth Marketing, February 2025</DocP>
      </DocSection>

      <DocSection title="BrandScript — One Page Summary">
        <DocTable
          headers={['SB7 Element', 'Push Mode BrandScript']}
          rows={[
            ['Hero', 'A capable professional who can\'t reliably make themselves get up when they intend to.'],
            ['Problem (Villain)', 'The snooze button. The daily override of human intention.'],
            ['Guide', 'RISE — we built something that doesn\'t ask for your willpower.'],
            ['Plan', '1. Press RISE. 2. Trust the process. 3. Arrive.'],
            ['CTA', 'Join the Waitlist. / Activate Push Mode.'],
            ['Success', 'You become someone who gets up. It became automatic.'],
            ['Failure', '⚠ Under legal review — see Section 7.'],
          ]}
        />
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-014: Brand Identity Suite ────────────────────────────────────────
  'push-mode-brand-identity-suite': (
    <DocBody>
      <DocSection title="Document Status">
        <DocP>This document contains the RISE Mission Statement, Vision Statement, and WHY (Golden Circle). Dr. Voss reviewed the document on November 22, 2023 and returned it with two annotations. Both annotations are reproduced verbatim below. The document remains in review status.</DocP>
      </DocSection>

      <DocSection title="Brand WHY Statement (Golden Circle)">
        <DocP><strong style={{ color: P.text }}>Formula: &ldquo;To _______ so that _______.&rdquo;</strong></DocP>
        <DocP>Draft 3 (returned with annotation): <span style={{ color: P.text, fontWeight: 500 }}>&ldquo;To replace the one moment every day where most people fail themselves so that they stop failing themselves in that moment and, over time, in others.&rdquo;</span></DocP>
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '16px', margin: '16px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ CEO Annotation — November 22, 2023</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>&ldquo;Close. &lsquo;Fail themselves&rsquo; is too soft. What we&apos;re replacing is not failure. It is the architecture of a certain kind of morning that produces a certain kind of person. The WHY isn&apos;t about fixing failure. It&apos;s about building something. Name that. — EV&rdquo;</DocP>
        </div>
        <DocP>Draft 4 (current, pending approval): <span style={{ color: P.text, fontWeight: 500 }}>&ldquo;To make the first act of every day an act of integrity so that the person who arrives at work is the person who decided to arrive.&rdquo;</span></DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Status: Submitted to Dr. Voss for approval November 28, 2023. Response not yet received.</DocP>
      </DocSection>

      <DocSection title="Mission Statement">
        <DocP style={{ fontSize: '15px', color: P.text, lineHeight: 2, paddingLeft: '16px', borderLeft: '2px solid rgba(255,255,255,0.1)', marginLeft: '8px' }}>
          &ldquo;RISE builds products that replace the one moment every day where most people fail themselves. We do this by designing systems that take the customer&apos;s original decision more seriously than their in-the-moment preference — and by being honest, in the fine print and everywhere else, about exactly what that means.&rdquo;
        </DocP>
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '16px', margin: '16px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ CEO Annotation — November 22, 2023</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>&ldquo;The &lsquo;fail themselves&rsquo; language again. We are not a product about failure. We are a product about the gap between intention and outcome. The mission statement should say what we build, not what we fix. — EV&rdquo;</DocP>
        </div>
      </DocSection>

      <DocSection title="Vision Statement">
        <DocP style={{ fontSize: '15px', color: P.text, lineHeight: 2, paddingLeft: '16px', borderLeft: '2px solid rgba(255,255,255,0.1)', marginLeft: '8px' }}>
          &ldquo;We imagine a world where the first act of the day is reliable — where the person who said they would get up gets up, and the gap between intention and outcome in the morning becomes something that used to exist.&rdquo;
        </DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>The vision statement was not annotated by Dr. Voss. The CPO has interpreted this as approval. No explicit approval has been given.</DocP>
      </DocSection>

      <DocSection title="Brand Writeprint — Voice & Style Guidelines">
        <DocTable
          headers={['Trait', 'Strength', 'Description']}
          rows={[
            ['Deadpan sincerity', '10/10', 'Every statement is meant. The humor emerges from the gap between what is said and what it implies.'],
            ['Declarative sentence structure', '9/10', 'Short sentences. Subject-verb-object. No hedging.'],
            ['Compressed irony', '8/10', 'The copy acknowledges what the product does not do without apologizing for it.'],
            ['Specificity as trust signal', '8/10', '98% compliance rate. 340,000 waitlist. 4.7 stars. The specificity is not marketing. It is evidence.'],
            ['Institutional calm under absurd conditions', '9/10', 'The bed follows you to work. RISE reports this in the same register it uses for quarterly earnings.'],
          ]}
        />
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Writeprint nickname (consultant&apos;s designation): &ldquo;The Coroner&apos;s Report.&rdquo; Accurate. Precise. Professionally indifferent to the implications of what it is describing.</DocP>
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-015: Blog Creation Process Playbook ────────────────────────────
  'content-marketing-blog-playbook': (
    <DocBody>
      <DocSection title="Document Context">
        <DocP>This playbook was adapted from the external consultant&apos;s standard blog content process and applied to RISE Content Marketing without modification. Team annotations are reproduced inline.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Note: The consultant confirmed that this playbook was originally developed for a regional pest control chain and a B2B accounting software company. It has been applied to RISE without modification.</DocP>
      </DocSection>

      <DocSection title="Process Timeline">
        <DocTable
          headers={['Phase', 'Duration', 'Responsible', 'RISE Note']}
          rows={[
            ['Topic Research & Ideation', '3–5 days', 'Content Strategist', ''],
            ['Content Brief Creation', '1–2 days', 'Content Strategist', ''],
            ['Client Approval (Brief)', '1–3 days', 'Account Manager', '⚠ See annotations'],
            ['Draft Writing', '3–7 days', 'Content Writer', ''],
            ['Internal Review', '1–2 days', 'Content Editor', ''],
            ['Client Review', '2–5 days', 'Account Manager', '⚠ See annotations'],
            ['Revisions', '1–3 days', 'Content Writer', ''],
            ['Final Approval', '1–2 days', 'Client', '⚠ See annotations'],
            ['Publication & Promotion', '1–2 days', 'Digital Marketing', ''],
          ]}
        />
      </DocSection>

      <DocSection title="Phase 6 — Client Review">
        <DocP><strong style={{ color: P.text }}>Process:</strong> Account Manager reviews draft before client submission. Submits to client. Collects and consolidates feedback.</DocP>
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ Team Annotation — Account Manager</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Dr. Voss provides feedback in one of four modes:</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Mode 1: Single word. &ldquo;No.&rdquo; or &ldquo;Yes.&rdquo; If &ldquo;Yes&rdquo; — publish.</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Mode 2: A single annotation on the introduction. Rewrite the opening paragraph until the first claim is a fact, not an argument.</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Mode 3: Silence. No response within 5 business days. Escalate to Dr. M. Chen.</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Mode 4: She rewrites a section herself and returns the doc. If this happens, use her version. Do not modify it.</DocP>
        </div>
        <div style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: P.warning, fontSize: '11px', marginBottom: '4px' }}>⚠ Separate Annotation — Content Writer</DocP>
          <DocP style={{ color: 'rgba(234,179,8,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Mode 4 has happened twice. Both times her version was shorter than ours. The second time she removed the entire paragraph and wrote one sentence: &ldquo;The alarm goes off. You have a choice. You pressed the button. The choice is gone.&rdquo; We have not attempted to rewrite introductions since.</DocP>
        </div>
      </DocSection>

      <DocSection title="Quality Standards">
        <DocTable
          headers={['Standard', 'Specification', 'RISE Implementation']}
          rows={[
            ['Headlines', 'Attention-grabbing, include primary keyword', 'Headlines are factual statements. They do not grab. They land.'],
            ['Length', '1,200–2,000 words', 'Current average: 847 words. The playbook\'s word count standard has not been formally revised.'],
            ['SEO', 'Primary keyword in title, meta, URL, first para, H2', '\'Autonomous morning routine\' has no search volume because we invented the category. We are ranked first for it.'],
            ['CTA', 'Clear call-to-action at conclusion', 'Join the Waitlist. Always. The product is still out of stock.'],
          ]}
        />
      </DocSection>

      <DocSection title="Success Metrics">
        <DocTable
          headers={['Metric', 'Target', 'RISE Note']}
          rows={[
            ['Average time on page', '> 3 minutes', 'Current average: 4:12. The posts are short. People read them slowly. We do not know why.'],
            ['Keyword rankings', 'Improvement over time', 'Ranking #1 for \'Push Mode compliance rate,\' \'autonomous morning bed,\' and \'bed with no off switch.\' We are the only result for most of these.'],
            ['Conversion to waitlist', 'Tracked', 'The blog contributes an estimated 4–7% of new waitlist signups. The product is still out of stock.'],
          ]}
        />
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-016: Customer Avatar Canvas ─────────────────────────────────────
  'push-mode-customer-avatar-canvas': (
    <DocBody>
      <DocSection title="Section 1 — Avatar / Persona">
        <DocTable
          headers={['Field', 'Entry']}
          rows={[
            ['Avatar name', 'David K.'],
            ['Age range', '34–52'],
            ['Occupation', 'Manager, Director, or Senior IC. White-collar. Outcome-accountable.'],
            ['Income level', '$95,000–$180,000'],
            ['Primary goals in life', 'To be reliable. To be the version of himself that shows up. To stop losing the mornings.'],
          ]}
        />
      </DocSection>

      <DocSection title="Section 3 — Before State">
        <DocP><strong style={{ color: P.text }}>Average Day (Before State):</strong></DocP>
        <DocTable
          headers={['Time of Day', 'Reality']}
          rows={[
            ['6:15am', 'Alarm. Snooze.'],
            ['6:24am', 'Second alarm. Consideration. Snooze.'],
            ['6:33–6:47am', 'Third through fifth alarm. Growing awareness that the morning is gone. Decision to get up framed as a decision. It is not a decision. It is a concession.'],
            ['7:40am', 'Actually up. The shower is rushed. The coffee is taken in a travel mug.'],
            ['8:52am', 'At desk. Technically on time, depending on how you define on time. He defines it generously.'],
          ]}
        />
        <DocP><strong style={{ color: P.text }}>Good vs. Evil (Before State):</strong></DocP>
        <DocTable
          headers={['Category', 'David K.\'s Perspective']}
          rows={[
            ['What he believes is right', 'Getting up when you say you will. Not requiring external systems.'],
            ['What he believes is wrong', 'Excuses. The snooze button. Being the kind of person who needs help with this.'],
            ['His moral compass re: this product', 'He finds the product interesting. He is ambivalent about needing it. He will not tell most people he has it.'],
          ]}
        />
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ CEO Annotation — Dr. E. Voss, November 1, 2023</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>&ldquo;The Good vs. Evil section is the most important section in this document. The customer believes it is wrong to need help with this. That belief is why he has not bought it yet. That belief is also why, once he has it and it works, he will not return it. The product does not tell him he is weak. The product tells him the snooze button is a hardware problem that has a hardware solution.&rdquo;</DocP>
        </div>
      </DocSection>

      <DocSection title="Section 9 — Marketing Message Development">
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>This section was completed by the consultant, reviewed by Dr. Voss, and returned with revisions. Both versions are preserved below.</DocP>
        <DocP><strong style={{ color: P.text }}>Consultant&apos;s Draft (struck through by CEO):</strong></DocP>
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '14px', margin: '8px 0', borderLeft: '2px solid rgba(255,255,255,0.08)' }}>
          <DocP style={{ color: P.textFaint, textDecoration: 'line-through', fontSize: '12px' }}>Primary Message: &ldquo;Stop fighting your mornings. Let RISE handle them.&rdquo;</DocP>
        </div>
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ CEO Revision — Dr. E. Voss, November 1, 2023</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>&ldquo;Do not tell David to stop fighting. He is not fighting. He is losing a small daily argument with a piece of consumer hardware. He needs to be told the argument is already over and he already won it by pressing a button the night before. Rewrite.&rdquo;</DocP>
        </div>
        <DocP><strong style={{ color: P.text }}>Dr. Voss&apos;s Revised Version (approved, in use):</strong></DocP>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '4px', padding: '14px', margin: '8px 0', borderLeft: '2px solid rgba(255,255,255,0.12)' }}>
          <DocP style={{ color: P.text, fontSize: '13px' }}>Primary Message: &ldquo;You already made the decision. We just make sure it holds.&rdquo;</DocP>
          <DocP style={{ color: P.textMuted, fontSize: '12px' }}>Supporting: The alarm is set. The intention is real. Push Mode is what happens between the intention and the morning.</DocP>
        </div>
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-017: Value Journey Worksheet ────────────────────────────────────
  'push-mode-value-journey-worksheet': (
    <DocBody>
      <DocSection title="Stage 1 — AWARE">
        <DocTable
          headers={['Channel', 'Status', 'Notes']}
          rows={[
            ['Organic search', 'Active', 'We rank first. We are the only result for most of these. We invented the category.'],
            ['Press coverage', 'Active', 'Bloomberg, Wired, TechCrunch, The Guardian. All inbound. No PR spend.'],
            ['Word of mouth', 'Active', 'Unusual pattern: customers do not tell people they have Push Mode. They arrive on time and colleagues eventually ask.'],
            ['Paid advertising', 'Inactive', 'The waitlist is 340,000. Paid acquisition would be adding to a list we cannot fulfill.'],
          ]}
        />
      </DocSection>

      <DocSection title="Stage 4 — CONVERT">
        <DocTable
          headers={['Reality', 'Notes']}
          rows={[
            ['Current conversion path', 'Waitlist → email notification when in stock → purchase window. The product is currently out of stock.'],
            ['Conversion rate (when in stock)', '67% of waitlist members completed purchase within 72 hours. The consultant called it the highest intent-to-purchase rate he had seen in 14 years.'],
            ['Entry-point offers', 'There are none. There is one product. It is sold out. The waitlist is the offer.'],
          ]}
        />
      </DocSection>

      <DocSection title="Stage 5 — EXCITE">
        <DocTable
          headers={['Element', 'Notes']}
          rows={[
            ['The activation process', '12 stages. 45–90 minutes. Not designed to be convenient. Designed to be thorough.'],
            ['Push Mode: first morning', '94% of customers who complete first morning complete the second. The first morning is the retention event.'],
            ['The self-made bed', 'Disproportionately meaningful per user interviews. The thing that makes them tell their partner.'],
            ['The solo commute', 'Some customers discover the bed has returned home before they do. Reactions documented in DOC-007.'],
          ]}
        />
      </DocSection>

      <DocSection title="Stage 6 — ASCEND">
        <DocTable
          headers={['Upsell Path', 'Status']}
          rows={[
            ['The Push Pro', 'Acknowledged internally. No public details. See DOC-004.'],
            ['The RISE Move', 'In development. No timeline. See DOC-005.'],
          ]}
        />
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ Consultant Note</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>The Ascend stage is the weakest stage in the RISE value journey. There is currently no clear path to increase customer value after the initial purchase. This is a revenue risk that RISE has not addressed.</DocP>
        </div>
      </DocSection>

      <DocSection title="Journey Gaps Analysis">
        <DocTable
          headers={['Gap', 'Priority', 'Constraint']}
          rows={[
            ['Ascend stage has no upsell path', 'High', 'No products available to upsell.'],
            ['Promote stage not activated', 'Medium', 'Product is out of stock.'],
            ['Convert stage ends at waitlist registration', 'Critical', 'Resolution: manufacture more units. Not within marketing\'s control.'],
          ]}
        />
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-018: Sub-Testimonial & Social Proof Strategy ───────────────────
  'push-mode-sub-testimonial-strategy': (
    <DocBody>
      <DocSection title="Document Context">
        <DocP>This document outlines the social proof and testimonial strategy for Push Mode. It addresses a fundamental challenge: the product has excellent traditional testimonials that perform poorly, and the reasons are structurally interesting. The sub-testimonial framework is proposed as the primary proof mechanism.</DocP>
      </DocSection>

      <DocSection title="The Problem with Push Mode Testimonials">
        <DocTable
          headers={['Issue', 'Explanation']}
          rows={[
            ['Market saturation', 'Every product has reviews. 4.7 stars is common enough to be ignored.'],
            ['Understated testimonials', 'Customers write accurate ones, not exciting ones. Example: \'It works. I don\'t know how to explain it beyond that.\''],
            ['Psychological/private benefit', 'The most significant outcome is the resolution of the internal morning argument. Customers don\'t review that.'],
            ['Mourner agenda (see DOC-011)', 'The most resonant testimonials are too personal to write in a review.'],
          ]}
        />
      </DocSection>

      <DocSection title="The Sub-Testimonial Framework">
        <DocP>Sub-testimonials are third-party authoritative citations formatted as proof elements. They carry the visual weight of a testimonial without the credibility vulnerability of a personal claim.</DocP>
        <DocTable
          headers={['Mechanism', 'Source Type', 'Status']}
          rows={[
            ['Morning compliance failure rate', 'Behavioral science — sleep inertia research', 'Sources identified, not yet formatted'],
            ['Snooze button as hardware problem', 'Cognitive science — decision fatigue literature', 'Sources identified, not yet formatted'],
            ['98% compliance rate', 'Internal RISE data', 'Active — used in all current copy'],
          ]}
        />
      </DocSection>

      <DocSection title="Compliance Framing">
        <DocP style={{ color: P.error }}>⚠ THIS SECTION IS UNDER LEGAL REVIEW. Do not implement without J. Park clearance.</DocP>
        <div style={{ background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: P.warning, fontSize: '11px', marginBottom: '4px' }}>⚠ Legal Note — J. Park, General Counsel</DocP>
          <DocP style={{ color: 'rgba(234,179,8,0.75)', fontStyle: 'italic', fontSize: '12px' }}>The sub-testimonial framework is legally sound in principle. The compliance risk is in execution: a sub-testimonial that implies the research results will be replicated by the customer&apos;s use of the product is a testimonial in disguise. I am reviewing the proposed examples. — JP, November 8, 2023</DocP>
          <DocP style={{ color: 'rgba(234,179,8,0.6)', fontSize: '11px', fontStyle: 'italic' }}>Legal review response not yet received as of this document&apos;s last update. — Growth Marketing, February 2025</DocP>
        </div>
      </DocSection>

      <DocSection title="Summary Recommendation">
        <DocP>Move the current testimonial section from the product page to the Help/FAQ page. Replace with three sub-testimonials formatted consistently with the current testimonial treatment.</DocP>
        <DocP style={{ color: P.textFaint, fontStyle: 'italic' }}>Dr. Voss response: &ldquo;Yes. Do the sleep inertia one first.&rdquo; Implementation pending legal clearance. — Growth Marketing, November 15, 2023</DocP>
      </DocSection>
    </DocBody>
  ),

  // ─── DOC-019: Proof of Concept Validation ────────────────────────────────
  'push-mode-proof-of-concept-validation': (
    <DocBody>
      <DocSection title="Document Context">
        <DocTable
          headers={['Field', 'Entry']}
          rows={[
            ['Prepared for', 'Investor Relations — Pre-IPO Due Diligence Package'],
            ['Date', 'January 9, 2024'],
            ['Market status', 'Product launched 2021. Currently out of stock. Waitlist: 340,000.'],
          ]}
        />
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ Consultant Note</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>This document was requested by investor relations as part of the pre-IPO due diligence package. Push Mode launched in 2021 and has three years of market data. This document has been completed as a retrospective validation summary rather than a prospective validation study.</DocP>
        </div>
      </DocSection>

      <DocSection title="Section 1 — Validation Criteria">
        <DocTable
          headers={['Criterion', 'Threshold', 'Push Mode Actual', 'Status']}
          rows={[
            ['Customer interest', '15% of engaged visitors', '34% of engaged visitors', '✓ Exceeded'],
            ['Waitlist volume', '500 signups validates concept', '340,000 signups', '✓ Exceeded'],
            ['Compliance rate', '60% functional; 80% strong', '98%', '✓ Exceeded'],
            ['Customer satisfaction', 'NPS > 50', '4.7 stars / 2,847 reviews', '✓ Indicator positive'],
            ['Press coverage', '1 major outlet', 'Bloomberg, Wired, TechCrunch, NYT, The Guardian, The Atlantic', '✓ Exceeded'],
          ]}
        />
      </DocSection>

      <DocSection title="Section 3 — Product Functionality Testing">
        <DocTable
          headers={['Function', 'Performance', 'Note']}
          rows={[
            ['Push Mode initiation', '100% — button press initiates correctly', 'No known failure cases'],
            ['Morning routing sequence', '98% completion rate', '2% incomplete due to environmental obstacles'],
            ['Autonomous return', 'Functional — documented in DOC-007', 'Several incidents documented. None constitute product failure.'],
            ['Self-making mechanism', 'Functional', 'Sheet tensioning and pillow restoration operate as designed'],
            ['Push Mode termination', 'N/A — not a supported function', 'There is no off switch. This is the product working correctly.'],
          ]}
        />
      </DocSection>

      <DocSection title="Section 6 — Feedback Analysis">
        <DocTable
          headers={['Rank', 'Issue', 'Frequency', 'Status']}
          rows={[
            ['1', 'Staircase navigation — not supported', '34% of users mention stairs', 'RISE Move in development. See DOC-005.'],
            ['2', 'Solo commute: some users find it startling', '11%', 'Working as intended.'],
            ['3', 'Activation process: 12 stages feels lengthy', '18%', 'Intentional.'],
            ['4', 'No off switch — some users want one', '9%', 'Not available. Not planned. This is the product.'],
            ['5', 'Pillow node sometimes runs during the night', '7%', 'Under investigation. IT is aware.'],
          ]}
        />
      </DocSection>

      <DocSection title="Section 9 — Validation Summary">
        <DocTable
          headers={['Framework Criterion', 'Push Mode Status']}
          rows={[
            ['Customer willingness to purchase', '✓ Confirmed — 340,000 waitlist; 67% purchase within 72h'],
            ['Product functionality', '✓ Confirmed — 3 years of market data; 98% compliance rate'],
            ['Customer expectations met', '✓ Confirmed — 4.7 stars, 2,847 reviews'],
            ['Positive emotional response', '✓ Confirmed — first morning retention rate: 94%'],
            ['Differentiation recognized', '✓ Confirmed — total category differentiation'],
            ['Economic model viable', '✓ Confirmed (details in investor package)'],
          ]}
        />
        <DocP style={{ fontSize: '14px', color: P.text, lineHeight: 2, paddingLeft: '16px', borderLeft: '2px solid rgba(255,255,255,0.1)', marginLeft: '8px' }}>
          Push Mode has validated proof of product concept. The validation is retrospective. The 340,000-person waitlist is the validation. The 98% compliance rate is the validation.
        </DocP>
        <div style={{ background: 'rgba(42,92,219,0.06)', border: '1px solid rgba(42,92,219,0.15)', borderRadius: '4px', padding: '14px', margin: '12px 0' }}>
          <DocP style={{ color: 'rgba(76,124,255,0.9)', fontSize: '11px', marginBottom: '4px' }}>⚑ Final Consultant Note</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>In 16 years of product validation work, this is the first retroactive proof of concept document I have been asked to prepare. It is also the clearest validation I have documented. If this does not constitute proof of concept, the concept of proof of concept requires revision.</DocP>
          <DocP style={{ color: 'rgba(76,124,255,0.75)', fontStyle: 'italic', fontSize: '12px' }}>Invoice #INV-2024-0012. Amount: $9,500. Status: Please advise.</DocP>
        </div>
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

the session token in the users table for areyes@riseawake.com
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
          RISE IT has not been notified. RISE IT is not aware.
          <br />
          RISE IT response time: variable.
        </p>
      </div>
    </DocBody>
  ),
}

// ─── Secret document — not in DOCS registry ─────────────────────────────────

const ARVIN_DOC = {
  id: 'DOC-099',
  slug: 'arvin-final-commit',
  title: 'arvin-final-commit.txt',
  classification: 'INTERNAL' as const,
  author: 'areyes@riseawake.com',
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
  const sessionName = useSessionName()
  const visitorLabel = visitorDisplayName(visitorIp, sessionName)

  // Record this doc visit in localStorage — the breach grows
  useEffect(() => {
    recordDocVisit(doc.id, doc.slug, doc.title, visitorIp)
    refreshBreach()
  }, [doc.id, doc.slug, doc.title, visitorIp, refreshBreach])

  // Inject the viewer as a live access entry — you ARE the security breach
  const accessLog: AccessEntry[] = [
    ...doc.lastAccessed,
    {
      name: visitorLabel,
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
        { label: 'RISE Internal', href: '/internal' },
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
              {breach.docs.length} document{breach.docs.length !== 1 ? 's' : ''}{' '}
              accessed
              {' · '}
              IT notified {breach.itNotifications} time
              {breach.itNotifications !== 1 ? 's' : ''}
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
