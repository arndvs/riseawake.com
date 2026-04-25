'use client'

import { CmsShell } from '@/components/cms'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  Briefcase,
  Building2,
  Cpu,
  FolderLock,
  MessageSquare,
  Scale,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface DataRoomDoc {
  id: string
  title: string
  section: string
  date: string
  classification: 'CONFIDENTIAL' | 'RESTRICTED' | 'INTERNAL' | 'PUBLIC'
  status: 'complete' | 'redacted' | 'partial' | 'missing'
  size?: string
  note?: string
  content?: React.ReactNode
}

// ─── Helper components ────────────────────────────────────────────────────────
// Dataroom intentionally uses translucent rgba overrides for the classified-document
// aesthetic. These diverge from PayloadShell's P tokens on purpose.
const P = {
  bg: 'hsl(var(--background))',
  charcoal: 'hsl(var(--muted))',
  elevation100: 'hsl(var(--muted))',
  elevation200: 'hsl(var(--muted))',
  border: 'hsl(var(--border))',
  text: 'hsl(var(--foreground))',
  textMuted: 'hsl(var(--muted-foreground))',
  textFaint: 'hsl(var(--muted-foreground))',
  blue: 'hsl(var(--primary))',
  blueText: 'hsl(var(--primary))',
  warning: '#eab308',
  error: '#ef4444',
  success: '#22c55e',
}

const Redacted = ({
  label = 'REDACTED',
  width = '60%',
}: {
  label?: string
  width?: string
}) => (
  <span
    className="inline-block rounded-sm border border-border bg-muted px-1.5 py-px font-mono text-xs uppercase tracking-wide text-transparent align-middle"
    style={{ width }}
  >
    {label}
  </span>
)

const DocTable = ({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) => (
  <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="border-b border-border px-2.5 py-1.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-border/40">
            {row.map((cell, j) => (
              <td
                key={j}
                className="px-2.5 py-2 align-top text-muted-foreground"
                style={{ lineHeight: 1.6 }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="mb-7">
    <p className="mb-3 border-b border-border pb-1.5 text-xs uppercase tracking-widest text-muted-foreground">
      {title}
    </p>
    {children}
  </div>
)

const P2 = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) => (
  <p
    className="mb-2.5 text-xs text-muted-foreground"
    style={{ lineHeight: 1.85, ...style }}
  >
    {children}
  </p>
)

const Flag = ({
  color,
  children,
}: {
  color: string
  children: React.ReactNode
}) => (
  <div
    style={{
      padding: '10px 14px',
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: '3px',
      marginBottom: '12px',
    }}
  >
    <p style={{ fontSize: '11px', color, lineHeight: 1.7 }}>{children}</p>
  </div>
)

// ─── Document content ─────────────────────────────────────────────────────────

const DOCUMENTS: DataRoomDoc[] = [
  // ── SECTION 1: CORPORATE ─────────────────────────────────────────────────
  {
    id: 'DR-001',
    title: 'Certificate of Incorporation (as amended)',
    section: '1. Corporate',
    date: 'March 1, 2025',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '24 pp',
    note: 'Amended five times. Amendment 4 (December 2020) modified CTO appointment and removal provisions.',
    content: (
      <div>
        <Section title="Document Overview">
          <P2>
            Certificate of Incorporation of RISE™ Technologies, Inc., a Delaware
            corporation. Incorporated March 14, 2009. As restated and amended
            through March 1, 2025.
          </P2>
          <DocTable
            headers={['Amendment', 'Date', 'Subject', 'Note']}
            rows={[
              [
                'Amendment 1',
                'June 2013',
                'Authorized shares increase — Series A',
                'Series A closing, Benchmark lead',
              ],
              [
                'Amendment 2',
                'October 2016',
                'Authorized shares increase — Series B',
                'Series B closing, a16z lead',
              ],
              [
                'Amendment 3',
                'February 2021',
                'Board composition; officer definitions',
                'Filed 6 weeks after CTO departure',
              ],
              [
                'Amendment 4',
                'December 2020',
                'CTO appointment and removal provisions; CPO role creation',
                'Filed December 14, 2020. Same date as Nair separation agreement.',
              ],
              [
                'Amendment 5',
                'July 2024',
                'Pre-IPO share reclassification; dual-class structure',
                'Class A (1 vote/share, public) and Class B (10 votes/share, founder). Dr. Voss retains voting control post-IPO.',
              ],
            ]}
          />
        </Section>
        <Section title="Amendment 4 — CTO Provisions (excerpt)">
          <div
            style={{
              background: P.elevation100,
              borderRadius: '3px',
              padding: '14px',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: P.textMuted,
              lineHeight: 1.8,
              border: `1px solid ${P.border}`,
            }}
          >
            <p style={{ color: P.textFaint, marginBottom: '8px' }}>
              Article V, Section 5.4 — Chief Technology Officer
            </p>
            <p>
              The Chief Technology Officer shall be appointed by the Board upon
              recommendation of the Chief Executive Officer. The position of
              Chief Technology Officer may be left vacant at the discretion of
              the Board. Technical responsibilities may be assigned to the Chief
              Product Officer or other officers during any period in which the
              position is vacant. The Board shall not be required to fill the
              position of Chief Technology Officer within any specified
              timeframe.
            </p>
            <p style={{ marginTop: '8px', color: P.textFaint }}>
              — Added December 14, 2020
            </p>
          </div>
          <Flag color={P.warning}>
            This provision was added on the same date as the separation
            agreement with the third CTO. The Board authorized vacant CTO
            indefinitely. The position has been vacant since December 14, 2020.
            This is now approximately 4 years and 4 months. The S-1 risk factors
            address this.
          </Flag>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-002',
    title: 'Capitalization Table — Current (Pre-IPO)',
    section: '1. Corporate',
    date: 'April 2, 2025',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    size: '8 pp',
    note: 'Waterfall analysis redacted pending underwriter review.',
    content: (
      <div>
        <Section title="Shareholder Summary">
          <DocTable
            headers={['Shareholder / Class', 'Shares', '% (FD)', 'Note']}
            rows={[
              [
                'Dr. Eleanor Voss — Class B',
                '12,400,000',
                '31.2%',
                'Founder shares. 10 votes each. Voss retains majority voting control post-IPO.',
              ],
              [
                'a16z (Series B lead + extension)',
                '4,100,000 Class A',
                '10.3%',
                "Original Series B 2016. Added $12M in extension August 2022. Relationship described as 'constructive.' Board seat held by Marcus Reid. Extension authorization executed August 13, 2022. See DR-006.",
              ],
              [
                'Benchmark Capital (Series A lead)',
                '2,800,000 Class A',
                '7.1%',
                'Series A 2013. Have expressed interest in secondary sale at IPO. Board seat held.',
              ],
              [
                'Series C Investors (tranche 1 + 2)',
                '5,200,000 Class A',
                '13.1%',
                'Multi-investor syndicate. $120M total. Valuation at tranche 2: $1.2B.',
              ],
              [
                'Employee option pool (outstanding)',
                '3,100,000',
                '7.8%',
                'Granted across 312 employees. Significant unvested overhang from 2020–2021 bridge period.',
              ],
              [
                'Employee option pool (available)',
                '1,400,000',
                '3.5%',
                'Reserved for pre-IPO grants including underwriter-required executive package.',
              ],
              [
                'Angels and seed investors',
                '1,200,000 Class A',
                '3.0%',
                '2009–2012. Two have requested secondary sale. Third is deceased. Estate represented by counsel.',
              ],
              [
                'Bridge round participants (2021)',
                '950,000 Class A',
                '2.4%',
                'Converted from bridge notes at $4.75/share. Significant appreciation. Participants include CFO Thomas Ellery (pre-employment investment, disclosed).',
              ],
              [
                'Class A — IPO float (planned)',
                '9,000,000 Class A',
                '22.6%',
                'Subject to S-1 registration. Priced at IPO.',
              ],
            ]}
          />
        </Section>
        <Section title="Series B — Historical Note">
          <Flag color={P.warning}>
            The Series B closed October 2016 at a $95M post-money valuation. The
            company raised $28M. By Q4 2019, $16.2M had been spent on the
            platform rebuild under the third CTO without a shippable product.
            The remaining $11.8M funded operations through 2020. The bridge
            round in Q1 2021 was required when the operating account reached
            $143,000. Series B investors were informed. Board minutes from this
            period are in Section 1, DR-009.
          </Flag>
        </Section>
        <Section title="Waterfall Analysis">
          <P2>
            Full liquidation preference waterfall analysis provided under
            separate cover to qualified investors upon execution of NDA
            supplement. Contact T. Ellery, CFO. Note: the waterfall analysis was
            prepared by the CFO's office without independent validation.
            Independent validation is in progress.
          </P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-003',
    title: 'Board Meeting Minutes — December 14, 2020',
    section: '1. Corporate',
    date: 'December 14, 2020',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '12 pp',
    note: 'Partial redaction. Legal hold on Section 4 (termination discussion). Redactions approved by J. Park.',
    content: (
      <div>
        <Section title="Meeting Record">
          <DocTable
            headers={['Field', 'Detail']}
            rows={[
              ['Meeting date', 'December 14, 2020, 9:00am Pacific'],
              [
                'Location',
                'Remote (Zoom — recording deleted per company policy)',
              ],
              [
                'Attendees',
                'Dr. E. Voss (Chair), Marcus Reid — a16z Partner (Board Seat), Sarah Whitmore — Benchmark General Partner (Board Seat), General Counsel (advisory capacity)',
              ],
              [
                'Minutes prepared by',
                'General Counsel (James Park — attending in advisory capacity)',
              ],
              ['Approved by Board', 'January 8, 2021'],
            ]}
          />
        </Section>
        <Section title="Agenda Item 1 — Q4 2020 Operating Update">
          <P2>
            Dr. Voss presented Q4 2020 operating results. Revenue for FY2020
            projected at $2.1M (Nudge units only, per existing inventory).
            Operating cash balance as of December 11, 2020: $143,247. Monthly
            burn rate: approximately $680,000. Runway at current burn:
            approximately 6 days.
          </P2>
          <P2>
            Sarah Whitmore (Benchmark) noted that the operating account balance
            was "not consistent with what was represented in the Q3 report." Dr.
            Voss acknowledged the discrepancy. General Counsel advised against
            further discussion of the Q3 representations pending review.
          </P2>
        </Section>
        <Section title="Agenda Item 2 — Bridge Financing">
          <P2>
            Board approved bridge financing of $4,000,000 from existing
            investors. Terms: 20% discount to next round, 8% annual interest,
            24-month maturity. Bridge closed December 17, 2020. Dr. Voss noted
            the bridge was "necessary and sufficient to reach product launch."
            The product launch date was not confirmed.
          </P2>
        </Section>
        <Section title="Agenda Item 3 — CTO Transition">
          <div
            style={{
              background: P.elevation100,
              border: `1px solid rgba(239,68,68,0.2)`,
              borderRadius: '3px',
              padding: '14px',
              marginBottom: '12px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: P.error,
                marginBottom: '6px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              ⚠ Legal Hold — Partial Redaction
            </p>
            <p
              style={{ fontSize: '11px', color: P.textMuted, lineHeight: 1.7 }}
            >
              Section 3 of the December 14, 2020 board minutes has been
              partially redacted pending resolution of the ongoing patent
              ownership dispute (see DR-024, Patent Dispute — Yau-era filing).
              The following is the portion released by General Counsel.
            </p>
          </div>
          <P2>
            Board voted to accept the resignation of the Chief Technology
            Officer, effective December 14, 2020. Vote: 3-0. Dr. Voss abstained,
            citing <Redacted label="personal conflict" width="120px" />.
            Separation agreement executed same date.
          </P2>
          <P2>
            Board further voted to <Redacted width="70%" /> and to authorize the
            creation of a Chief Product Officer role. Dr. Mara Chen was proposed
            as CPO candidate. Background check and reference verification in
            progress. Board authorized Dr. Voss to negotiate an employment
            offer.
          </P2>
          <P2 style={{ color: P.textFaint }}>
            Section 4 of the minutes (termination discussion, pages 7–11) is
            under legal hold and not included in this data room. Redaction
            authorized by J. Park, General Counsel, March 2025.
          </P2>
        </Section>
        <Section title="Agenda Item 4 — Amendment 4, Certificate of Incorporation">
          <P2>
            Board authorized Amendment 4 to the Certificate of Incorporation,
            modifying CTO appointment and removal provisions and creating the
            CPO role. Amendment filed same date. See DR-001.
          </P2>
        </Section>
        <Section title="Agenda Item 5 — Push Mode Launch Timeline">
          <P2>
            Dr. Voss presented revised product launch plan. Push Mode target
            launch: Q3 2021. Marcus Reid (a16z) noted this was the fourth
            revised launch timeline and asked Dr. Voss to characterize her
            confidence level. Dr. Voss's response:{' '}
            <span
              style={{ fontStyle: 'italic', color: P.textMuted }}
            >
              "I am more confident today than I have been at any point since
              founding the company. The prior approach was wrong. I understand
              what was wrong. We are correcting it."
            </span>
          </P2>
          <P2>Push Mode launched October 7, 2021.</P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-004',
    title: 'Bridge Round Term Sheet — January 2021',
    section: '1. Corporate',
    date: 'January 4, 2021',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '2 pp',
    note: "Executed on a Sunday. Typed on company letterhead with a visible typo in the header ('RISE™ Technologeis, Inc.'). Not corrected before signing.",
    content: (
      <div>
        <Section title="Bridge Financing — Summary Terms">
          <DocTable
            headers={['Term', 'Detail']}
            rows={[
              ['Date', 'January 4, 2021 (Sunday)'],
              ['Issuer', 'RISE™ Technologeis, Inc. [sic]'],
              ['Amount', '$4,000,000'],
              [
                'Investors',
                "Benchmark Capital, Andreessen Horowitz, Thomas Ellery (personal investment — pre-employment; subsequently disclosed upon Ellery's hire as CFO)",
              ],
              ['Structure', 'Convertible notes'],
              ['Interest rate', '8% per annum, simple'],
              ['Maturity', '24 months (January 4, 2023)'],
              [
                'Conversion',
                'Automatic at next equity round at 20% discount to round price',
              ],
              ['Valuation cap', '$45,000,000 pre-money'],
              ['Most Favored Nation', 'Yes'],
              [
                'Closing condition',
                'Execution of employment offer to proposed CPO candidate',
              ],
            ]}
          />
        </Section>
        <Section title="Context">
          <Flag color={P.warning}>
            This term sheet was executed January 4, 2021 — a Sunday — because
            the operating account had reached $143,000 on December 11 and the
            December 17 wire transfer of $4M had not yet cleared as of January
            1. The company operated on personal credit card advances by Dr. Voss
            for the period December 11–17, 2020. The advances totaled $47,200.
            Dr. Voss was reimbursed upon the bridge closing. The advances were
            not disclosed to the Board prior to this filing. They are disclosed
            here.
          </Flag>
          <P2>
            Thomas Ellery's personal investment in the bridge round ($500,000)
            predated his employment as CFO by approximately 8 months. The
            investment was disclosed at the time of his hire and is included
            here for completeness. The Series C underwriters were informed. They
            noted the disclosure. They did not object.
          </P2>
        </Section>
        <Section title="Conversion History">
          <P2>
            Bridge notes converted at Series B extension (August 2022) at
            $4.75/share (20% discount to extension price of $5.94/share). All
            note holders converted. Accrued interest converted to equity. Total
            shares issued on conversion: 950,432 Class A common shares.
            Conversion authorized by board consent dated July 31, 2022, executed
            August 13, 2022. See DR-006.
          </P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-005',
    title: 'Nair Separation Agreement — [REDACTED]',
    section: '1. Corporate',
    date: 'December 14, 2020',
    classification: 'RESTRICTED',
    status: 'redacted',
    size: '18 pp',
    note: "Redacted in full except header. J. Park: 'The existence of this agreement is disclosed. Its contents are privileged.'",
    content: (
      <div>
        <div
          style={{
            background: P.elevation100,
            border: `1px solid rgba(239,68,68,0.2)`,
            borderRadius: '3px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: P.error,
              marginBottom: '12px',
              fontFamily: 'monospace',
            }}
          >
            CONFIDENTIAL SEPARATION AND MUTUAL RELEASE AGREEMENT
          </p>
          <p
            style={{
              fontSize: '12px',
              color: P.textMuted,
              marginBottom: '8px',
              fontFamily: 'monospace',
            }}
          >
            P. NAIR
          </p>
          <p
            style={{
              fontSize: '12px',
              color: P.textMuted,
              marginBottom: '20px',
              fontFamily: 'monospace',
            }}
          >
            DECEMBER 14, 2020
          </p>
          <div
            style={{
              width: '100%',
              height: '2px',
              background: 'rgba(239,68,68,0.3)',
              marginBottom: '20px',
            }}
          />
          <Redacted label="Pages 1–18 redacted in full" width="80%" />
          <p
            style={{
              fontSize: '10px',
              color: P.textFaint,
              marginTop: '16px',
              lineHeight: 1.7,
            }}
          >
            Redaction authorized by J. Park, General Counsel.
            <br />
            Reason: attorney-client privilege and confidential settlement terms.
            <br />
            The existence of this agreement is disclosed in the S-1 risk
            factors.
            <br />
            Its contents are not disclosed. They will not be disclosed.
          </p>
        </div>
        <Flag color={P.warning}>
          Due diligence note (Underwriter, March 2025): We have noted that the
          separation agreement exists and is fully redacted. We have been
          informed by General Counsel that the agreement contains a mutual
          non-disparagement clause, a non-compete covering autonomous morning
          routing hardware, and "certain other provisions." We have accepted
          this characterization. We have not reviewed the agreement. We note
          this limitation in our diligence file.
        </Flag>
      </div>
    ),
  },

  {
    id: 'DR-006',
    title:
      'Emergency Board Consent — Series B Extension Authorization — August 13, 2022',
    section: '1. Corporate',
    date: 'July 31, 2022',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '6 pp',
    note: 'Document states execution date July 31, 2022. PDF metadata indicates creation timestamp August 13, 2022, 18:47 PDT. Footnoted by auditor. Internal review complete. No restatement required. See also: General Counsel independence note on file.',
    content: (
      <div>
        <Section title="Document Overview">
          <P2>
            Written consent in lieu of meeting of the Board of Directors of
            RISE™ Technologies, Inc. This consent, when signed by the required
            board members, constitutes an action of the Board without a formal
            meeting pursuant to Section 141(f) of the Delaware General
            Corporation Law.
          </P2>
          <DocTable
            headers={['Field', 'Stated', 'Actual (per metadata)']}
            rows={[
              ['Execution date', 'July 31, 2022', 'August 13, 2022, 18:47 PDT'],
              ['Effective date', 'July 31, 2022', 'N/A — effective as stated'],
              [
                'Location of execution',
                'Not stated',
                'Villa Castellucci, Napa Valley, CA (per signatory notation — see below)',
              ],
              [
                'Prepared by',
                'Outside counsel (Wilson Sonsini)',
                'Wilson Sonsini — drafted July 29, 2022',
              ],
              ['Circulated', 'July 29, 2022', 'Confirmed'],
              [
                'Signatories required',
                'Dr. E. Voss (CEO), M. Reid (a16z), S. Whitmore (Benchmark)',
                'All three',
              ],
              [
                'Signatories obtained',
                'All three',
                'All three — see execution notes',
              ],
            ]}
          />
          <Flag color={P.error}>
            The PDF metadata discrepancy between the stated execution date (July
            31, 2022) and the creation timestamp (August 13, 2022, 18:47 PDT)
            was identified by Deloitte during the FY2022 audit. Deloitte
            requested an explanation from General Counsel. General Counsel's
            response is in DR-006-A (attorney-client privilege — not included in
            this data room). Deloitte's assessment: "The explanation provided is
            noted. We have determined that no restatement is required. We note
            this for completeness." Financial statement footnote 14 discloses
            this matter. The disclosure in footnote 14 does not use the word
            'backdating.' General Counsel advised against using the word
            'backdating.'
          </Flag>
        </Section>

        <Section title="Background — Why This Document Exists">
          <P2>
            The Series B Extension term sheet was circulated to all parties on
            July 28, 2022. The term sheet's Section 3.1 referenced a "Board
            Authorization dated July 31, 2022" authorizing the extension, the
            conversion terms for the outstanding bridge notes, and the issuance
            of new shares. This reference was included by outside counsel in
            anticipation of the board consent being executed before month-end.
          </P2>
          <P2>The board consent was not executed before month-end.</P2>
          <P2>
            Marcus Reid, the a16z partner holding the a16z board seat, was
            unavailable July 28 – August 7, 2022, on a pre-wedding trip to
            Positano, Italy. His wedding was scheduled for August 13, 2022. Dr.
            Voss and Sarah Whitmore (Benchmark) were both invited to the wedding
            and confirmed attendance.
          </P2>
          <P2>
            The bridge note holders — including Thomas Ellery, investing
            personally prior to his appointment as CFO — had received the term
            sheet with the July 31 reference date. Revising the term sheet to
            reflect a later authorization date would have required
            re-circulation to all note holders and re-execution. Several bridge
            note holders had already confirmed the terms in writing.
          </P2>
          <Flag color={P.warning}>
            Outside counsel (Wilson Sonsini) was informed of the timing issue on
            August 9, 2022, by Dr. Voss. Wilson Sonsini's response, in email:
            "We can prepare the consent with the July 31 effective date. The
            signatories will need to sign. The signature date on the document
            will be July 31. We recommend the document be executed as soon as
            possible. We note for the record that we are not advising on the
            propriety of the effective date, only on the mechanics." Dr. Voss
            replied: "Understood. Please prepare." The email chain is in the
            outside counsel file. It is not in this data room.
          </Flag>
        </Section>

        <Section title="Execution — August 13, 2022">
          <P2>
            The consent was executed at Villa Castellucci, St. Helena,
            California, during the wedding reception of Marcus Reid and David
            Chen. The reception began at 6:00pm PDT. The board consent was
            signed at approximately 6:47pm PDT, during the cocktail hour, prior
            to the dinner seating.
          </P2>
          <P2>
            Execution sequence, per signatory notes added to the document:
          </P2>

          <div
            style={{
              background: P.elevation100,
              border: `1px solid ${P.border}`,
              borderRadius: '4px',
              padding: '16px',
              marginBottom: '16px',
              fontFamily: 'monospace',
              fontSize: '11px',
              lineHeight: 2,
              color: P.textMuted,
            }}
          >
            <p
              style={{
                color: P.textFaint,
                marginBottom: '8px',
                fontSize: '10px',
              }}
            >
              — Handwritten notation, margin of signature page, identified as S.
              Whitmore handwriting —
            </p>
            <p>
              Signed cocktail hour. M. Reid signing under protest — his words,
              recorded here for accuracy. Voss and Whitmore present. Reid asked
              if this could wait until Monday. Whitmore explained the term sheet
              timing. Reid reviewed the document. Reid signed. Whitmore signed.
              Whitmore called Voss over from the terrace. Voss signed. Document
              photographed on Whitmore's phone. Sent to Wilson Sonsini at 18:53
              PDT. Document dated July 31 per discussion.
            </p>
            <p
              style={{ color: P.textFaint, marginTop: '8px', fontSize: '10px' }}
            >
              — end notation —
            </p>
          </div>

          <Flag color={P.error}>
            Sarah Whitmore's handwritten notation ("M. Reid signing under
            protest — his words, recorded here for accuracy") is the only
            contemporaneous record of Reid's characterization of the execution.
            "Under protest" is not a legal term of art in Delaware corporate
            law. The consent is valid regardless of Reid's characterization.
            General Counsel has reviewed this and confirmed the consent is
            valid. General Counsel has also noted that the notation creates a
            record that a board member characterized his signature as under
            protest, which is a fact that exists now in the documents and that
            the data room coordinator (Arvin) uploaded without reviewing.
          </Flag>
        </Section>

        <Section title="What Was Authorized">
          <P2>
            The consent authorized the following actions, all stated as
            effective July 31, 2022:
          </P2>
          <DocTable
            headers={['Authorization', 'Detail']}
            rows={[
              [
                'Series B extension',
                '$12,000,000 additional investment from Andreessen Horowitz at $5.94/share post-money valuation of $142M',
              ],
              [
                'Bridge note conversion',
                "All outstanding bridge notes convert to Series B extension shares at $4.75/share (20% discount). Total shares: 950,432. Ellery's $500K converts to 105,263 shares.",
              ],
              [
                'Pro-rata rights',
                'Benchmark waives pro-rata rights on this round in exchange for anti-dilution adjustment. Agreement memorialized in side letter (not in this data room).',
              ],
              [
                'Option pool increase',
                "Option pool expanded by 400,000 shares to accommodate anticipated hires. Specifically discussed: CFO hire (Ellery, not yet employed). Ellery's hire authorized in same consent, Section 4.",
              ],
              [
                'CFO appointment',
                "Thomas Ellery authorized as Chief Financial Officer, effective September 1, 2022. Compensation terms to be set by CEO. Board notes Ellery's pre-employment investment in bridge round as disclosed conflict — waived by unanimous board consent including Reid.",
              ],
            ]}
          />

          <Flag color={P.warning}>
            The CFO appointment was authorized in the same consent as the
            conversion of the CFO's personal bridge note investment. Thomas
            Ellery's 105,263 shares (converted at $4.75/share, now worth
            approximately $16/share at Series C valuation) were authorized by a
            consent that also appointed Ellery as CFO, signed at a wedding,
            backdated by 13 days, with the a16z board member signing "under
            protest." General Counsel has reviewed this. No restatement is
            required. The S-1 disclosure on related party transactions describes
            Ellery's bridge investment as "subsequently disclosed upon his
            hire." The sequence of events is more compressed than that
            description implies.
          </Flag>
        </Section>

        <Section title="James Park — Independence Note">
          <P2>
            James Park joined RISE™ as General Counsel on July 18, 2022 — eleven
            days before the Series B extension term sheet was circulated. He was
            not invited to the wedding. He was not present at Villa Castellucci.
            He was informed of the execution circumstances on August 15, 2022,
            by Dr. Voss.
          </P2>
          <P2>
            Park conducted an internal review of the execution. His review
            concluded that the consent was valid under Delaware law, that the
            effective date could permissibly precede the execution date in a
            written consent in lieu of meeting, and that no restatement of any
            financial record was required.
          </P2>
          <P2>
            Park also prepared a separate memorandum, dated August 22, 2022,
            addressed to the file. The memorandum was not shared with the board.
            It has not been produced in any legal proceeding. It is on Park's
            personal drive. The memorandum's subject line, which appears in the
            CMS file index (Arvin's upload, August 12, 2024, categorized as
            "Legal — Internal — Misc"), reads:
          </P2>

          <div
            style={{
              background: P.elevation100,
              border: `1px solid rgba(234,179,8,0.2)`,
              borderRadius: '4px',
              padding: '14px',
              marginBottom: '12px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(234,179,8,0.8)',
            }}
          >
            MEMORANDUM — PRIVILEGED AND CONFIDENTIAL — ATTORNEY-CLIENT
            <br />
            TO: File
            <br />
            FROM: J. Park, General Counsel
            <br />
            DATE: August 22, 2022
            <br />
            RE: Series B Extension Consent — Execution Circumstances —
            Independence Concern — Attorney Review of Firm's Own Conduct
          </div>

          <P2 style={{ color: P.textFaint }}>
            The memorandum itself was not uploaded to the CMS. Only the index
            entry (subject line and metadata) was uploaded. The index entry is
            publicly accessible at /internal. The memorandum content is
            privileged and has not been disclosed. Park has confirmed the
            memorandum exists. He has not confirmed its contents. He has
            confirmed that "no restatement is required" remains his position. He
            has also confirmed that the memorandum contains a statement he
            describes as "a concern, not a finding." He will not characterize
            the concern further.
          </P2>
        </Section>

        <Section title="Marcus Reid — Current Status">
          <P2>
            Marcus Reid continues to hold the a16z board seat. He attended the
            December 2020 board meeting at which the third CTO was terminated.
            He was present (via Zoom) for all subsequent board meetings. He
            voted in favor of the Series C financing. He is listed as a board
            member in the S-1.
          </P2>
          <P2>
            Reid's wedding to David Chen took place as scheduled on August 13,
            2022. The ceremony and dinner proceeded following the cocktail hour
            consent execution. Per Reid's own account, conveyed to Dr. Voss in a
            conversation she documented in a personal note (uploaded to the CMS
            by Arvin, October 2024, categorized as "Executive — Notes — Misc"),
            Reid described the board consent execution as "the thing I tell the
            story about at dinner parties now, which is that a venture
            capitalist's wedding is never actually off the clock."
          </P2>
          <P2 style={{ color: P.textFaint }}>
            Dr. Voss's personal note also records that David Chen, Reid's
            spouse, asked Whitmore as she was leaving the cocktail hour: "Is it
            done? Can we have our party now?" Whitmore confirmed it was done.
            Chen replied: "Good. I've been watching you two circling Marcus for
            an hour."
          </P2>
          <Flag color={P.blue}>
            David Chen, Marcus Reid's spouse, is not affiliated with RISE™ in
            any capacity. David Chen and Dr. Mara Chen (RISE™ CPO) share a
            surname and are not related. This has been confirmed. This footnote
            exists because someone will ask.
          </Flag>
        </Section>

        <Section title="Auditor Finding and Current Status">
          <P2>
            Deloitte identified the metadata discrepancy during the FY2022 audit
            (February 2023). Their finding was communicated to General Counsel.
            General Counsel's response was designated attorney-client
            privileged. Deloitte accepted the response and issued an unqualified
            audit opinion for FY2022, with footnote 14 disclosing the matter
            without using the word "backdating."
          </P2>
          <P2>
            The Goldman Sachs diligence team raised this document in the
            underwriter Q&A (DR-050, Question 22, marked "under separate
            cover"). General Counsel's response to the underwriters was provided
            verbally. It was not reduced to writing at General Counsel's
            request. The underwriters noted the verbal response in their
            diligence file. The diligence file is not in this data room.
          </P2>
          <P2>
            The S-1 contains the following disclosure, in footnote 34 of the
            Risk Factors section: "Certain corporate governance matters arising
            from the execution of board consents in FY2022 have been reviewed by
            our General Counsel and outside counsel. These reviews concluded
            that no restatement of our financial statements is required. The SEC
            may review these matters in connection with the effectiveness of
            this registration statement."
          </P2>
          <P2 style={{ color: P.textFaint, fontStyle: 'italic' }}>
            The SEC has not yet commented on the registration statement. The IPO
            is anticipated Q3 2026. The S-1 was filed April 2, 2025. Standard
            SEC review takes 30 days. If the SEC comments, the timeline may
            extend. The underwriters have modeled a scenario in which SEC
            comments on the FY2022 consent delay the IPO by one quarter. They
            have not shared this model with management. Management is aware it
            exists.
          </P2>
        </Section>
      </div>
    ),
  },

  // ── SECTION 2: FINANCIAL ──────────────────────────────────────────────────
  {
    id: 'DR-010',
    title: 'Audited Financial Statements — FY2022, FY2023, FY2024',
    section: '2. Financial',
    date: 'March 28, 2025',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '84 pp',
    note: 'FY2020 and FY2021 unaudited. Auditor (Deloitte) qualified the FY2021 opinion regarding the platform write-off.',
    content: (
      <div>
        <Section title="Summary Financial Data — Audited">
          <DocTable
            headers={['', 'FY2022', 'FY2023', 'FY2024']}
            rows={[
              ['Revenue', '$23.7M', '$38.2M', '$89.4M'],
              ['Gross profit', '$13.0M', '$24.1M', '$60.8M'],
              ['Gross margin', '54.8%', '63.1%', '68.0%'],
              ['Operating expenses', '$19.4M', '$28.7M', '$41.2M'],
              ['Operating income (loss)', '($6.4M)', '($4.6M)', '$19.6M'],
              ['Net income (loss)', '($7.1M)', '($5.3M)', '$17.8M'],
              ['Cash and equivalents', '$8.2M', '$12.4M', '$94.7M'],
              ['Total assets', '$31.4M', '$48.9M', '$187.3M'],
              ['Deferred revenue', '$3.1M', '$4.8M', '$9.2M'],
            ]}
          />
          <Flag color={P.blue}>
            First profitable year: FY2024. $17.8M net income on $89.4M revenue.
            The company operated at a net loss from founding through FY2023.
          </Flag>
        </Section>
        <Section title="FY2020 and FY2021 — Unaudited">
          <Flag color={P.warning}>
            FY2020 and FY2021 financial statements are unaudited. The original
            auditor for FY2020 (KPMG) resigned mid-engagement citing "inability
            to obtain sufficient appropriate audit evidence regarding the
            platform development capitalization and subsequent write-off."
            Deloitte was engaged for FY2022 and agreed to perform a review (not
            audit) of FY2021 figures. The FY2021 review opinion contains a
            qualification regarding the $11.4M platform development write-off
            recognized in Q1 2021.
          </Flag>
          <DocTable
            headers={['', 'FY2020 (unaudited)', 'FY2021 (reviewed, qualified)']}
            rows={[
              ['Revenue', '$2.1M', '$8.4M'],
              ['Gross margin', '~12%', '~41%'],
              ['Operating loss', '~($8.9M)', '~($3.4M) after write-off'],
              ['Platform write-off', '—', '($11.4M)'],
              ['Cash (period end)', '$143K → $4.1M (bridge)', '$6.8M'],
              ['Auditor', 'KPMG (resigned)', 'Deloitte (reviewed, qualified)'],
            ]}
          />
        </Section>
        <Section title="Auditor's Qualification — FY2021">
          <div
            style={{
              background: P.elevation100,
              borderRadius: '3px',
              padding: '14px',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: P.textMuted,
              lineHeight: 1.8,
              border: `1px solid ${P.border}`,
            }}
          >
            <p style={{ color: P.textFaint }}>
              Excerpt — Deloitte review report, February 2022
            </p>
            <p style={{ marginTop: '8px' }}>
              {
                '...we are not aware of any material modifications that should be made to the accompanying financial statements for them to be in conformity with accounting principles generally accepted in the United States of America, except for the following matter:'
              }
            </p>
            <p style={{ marginTop: '8px' }}>
              {
                'The Company recognized a write-off of $11,412,000 in capitalized platform development costs in Q1 2021. The Company has characterized this write-off as a strategic platform transition. We were unable to obtain sufficient documentation regarding (a) the criteria used to capitalize the development costs in the periods 2017–2020, (b) the impairment analysis performed, if any, prior to recognition of the write-off, and (c) the approval process for the write-off given the concurrent CTO departure. We recommend that the Company obtain an independent assessment of its software capitalization policies prior to its anticipated public offering.'
              }
            </p>
            <p style={{ marginTop: '8px', color: P.textFaint }}>
              Note: This independent assessment is in progress. Expected
              completion Q2 2025. The IPO is scheduled for Q3 2026.
            </p>
          </div>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-011',
    title: '5-Year Financial Model (Pre-IPO Base Case)',
    section: '2. Financial',
    date: 'March 15, 2025',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    size: '47 pp',
    note: 'Prepared by CFO office. Key assumptions: Push Pro launches Q2 2026 (same quarter as IPO). Move launches Q4 2026. Neither product has a confirmed timeline.',
    content: (
      <div>
        <Section title="Model Overview">
          <P2>
            Five-year financial projection model prepared by Thomas Ellery (CFO)
            with support from the Finance team. Reviewed by Deloitte for
            methodology; not audited. Model uses three scenarios: Base, Bull,
            and Bear.
          </P2>
          <Flag color={P.warning}>
            The Base Case model assumes Push Pro launches Q2 2026, contributing
            $18M in incremental revenue in FY2026. Push Pro specifications have
            not been disclosed publicly or to investors. The model assumes a
            price point of <Redacted label="████" width="80px" /> and a launch
            volume of <Redacted label="████" width="60px" /> units. These
            assumptions have not been validated against engineering timelines.
            The engineering team has not confirmed Q2 2026 as a feasible launch
            date for Push Pro. The CFO's office notes that the model reflects
            management's aspirations rather than engineering commitments.
          </Flag>
        </Section>
        <Section title="Revenue Projections — Base Case">
          <DocTable
            headers={[
              '',
              'FY2025E',
              'FY2026E',
              'FY2027E',
              'FY2028E',
              'FY2029E',
            ]}
            rows={[
              ['Push (current)', '$112M', '$134M', '$148M', '$163M', '$180M'],
              ['Push Pro (new)', '—', '$18M', '$67M', '$104M', '$128M'],
              ['RISE™ Move (new)', '—', '—', '$24M', '$89M', '$156M'],
              ['VNS Subscriptions', '—', '—', '$8M', '$31M', '$67M'],
              ['DataKit SDK', '$4M', '$7M', '$12M', '$18M', '$24M'],
              ['Enterprise / Corporate', '$2M', '$6M', '$14M', '$28M', '$45M'],
              ['Total Revenue', '$118M', '$165M', '$273M', '$433M', '$600M'],
              ['Net Income', '$21M', '$28M', '$52M', '$94M', '$147M'],
            ]}
          />
          <Flag color={P.error}>
            Bear Case note: In the scenario where Push Pro does not launch in
            FY2026 and Move does not launch in FY2027, total FY2027 revenue is
            projected at $164M and net income at $31M. This is a more
            conservative scenario that does not require new product launches.
            The underwriters have requested that this scenario be the basis for
            IPO price range guidance. The CFO has noted that the underwriters'
            request and management's preference differ. This difference is
            unresolved.
          </Flag>
        </Section>
        <Section title="Cash Flow — Critical Period (2020–2021)">
          <DocTable
            headers={[
              'Period',
              'Opening Balance',
              'Cash In',
              'Cash Out',
              'Closing Balance',
              'Note',
            ]}
            rows={[
              ['Q1 2020', '$3.2M', '$0.4M', '$2.1M', '$1.5M', ''],
              [
                'Q2 2020',
                '$1.5M',
                '$0.5M',
                '$1.8M',
                '$0.2M',
                'CFO (then-external) flags runway',
              ],
              [
                'Q3 2020',
                '$0.2M',
                '$1.4M*',
                '$1.2M',
                '$0.4M',
                '*Nudge inventory liquidation',
              ],
              [
                'Q4 2020',
                '$0.4M',
                '$0.2M',
                '$0.7M',
                '$0.143M',
                'Bridge required. CTO departs.',
              ],
              [
                'Q1 2021',
                '$0.143M**',
                '$4.0M',
                '$1.6M',
                '$2.543M',
                '**6 days runway. Bridge closes Dec 17.',
              ],
              [
                'Q2 2021',
                '$2.543M',
                '$1.1M',
                '$1.8M',
                '$1.843M',
                'Chen joins. Platform rebuilt.',
              ],
              [
                'Q3 2021',
                '$1.843M',
                '$0.9M',
                '$1.9M',
                '$0.843M',
                'Push Mode approaches launch',
              ],
              [
                'Q4 2021',
                '$0.843M',
                '$7.8M',
                '$1.2M',
                '$7.443M',
                'Push launches Oct 7. Sells out 72hrs.',
              ],
            ]}
          />
          <P2 style={{ color: P.textFaint }}>
            * The Q4 2020 closing balance of $143,000 represents 6.2 days of
            operating runway at the then-current burn rate. Dr. Voss advanced
            personal funds of $47,200 via personal credit card during this
            period to cover outstanding vendor payments. This is disclosed here
            for the first time in a formal document. It was not included in the
            Q4 2020 board report.
          </P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-012',
    title: 'SVB Relationship and Debt Restructuring',
    section: '2. Financial',
    date: 'June 2023',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '6 pp',
    note: 'RISE™ had $6.1M at Silicon Valley Bank at time of FDIC seizure, March 10, 2023. Documents the events of March 10–17 and subsequent debt restructuring.',
    content: (
      <div>
        <Section title="SVB — March 2023 Events">
          <P2>
            RISE™ Technologies maintained a primary operating account and a
            credit line with Silicon Valley Bank. At the time of FDIC seizure
            (March 10, 2023, 8:14am Pacific), RISE™ had the following exposure:
          </P2>
          <DocTable
            headers={['Account', 'Balance', 'FDIC Insured', 'Exposure']}
            rows={[
              [
                'Primary operating account',
                '$6,112,847',
                '$250,000',
                '$5,862,847',
              ],
              [
                'Venture debt credit line (drawn)',
                '($8,000,000)',
                'N/A',
                '$8,000,000 owed',
              ],
              ['Net position', '', '', '($2,137,153) net creditor to SVB'],
            ]}
          />
          <Flag color={P.error}>
            At 8:14am Pacific on March 10, 2023, RISE™ had approximately 8.9
            days of operating runway in its SVB account. The FDIC guarantee
            covered $250,000. The remaining $5.86M was at risk. Dr. Voss was
            notified at 9:47am. She was on a Push Mode morning routing session
            at the time of notification. The notification went to her phone.
            Push Mode does not pause for phone notifications. She received the
            message at 8:31am (Push Mode departure confirmation). She was 47
            minutes into a strategy offsite when she read it.
          </Flag>
          <P2>
            FDIC announced full depositor protection for SVB on March 12, 2023.
            RISE™ had access to its funds by March 14. The seven days between
            seizure and fund access were managed through an emergency line of
            credit from Andreessen Horowitz ($3M, drawn March 11, repaid March
            15, no interest — described by a16z as a "portfolio protection
            measure").
          </P2>
        </Section>
        <Section title="Debt Restructuring">
          <P2>
            The $8M venture debt with SVB was assumed by the FDIC receivership
            and subsequently purchased by a private credit fund (name redacted
            pending lender consent to disclosure). Terms of the restructured
            facility:
          </P2>
          <DocTable
            headers={['Term', 'SVB Original', 'Restructured']}
            rows={[
              ['Principal', '$8,000,000', '$8,000,000'],
              ['Interest rate', 'Prime + 1.5%', 'Prime + 3.2%'],
              ['Maturity', 'March 2025', 'March 2026 (extended)'],
              [
                'Covenants',
                'Standard',
                'Enhanced — includes push mode compliance floor of 94%',
              ],
            ]}
          />
          <Flag color={P.warning}>
            The restructured debt facility includes a covenant requiring Push
            Mode compliance rate to remain above 94%. If Push Mode compliance
            falls below 94% for two consecutive quarters, the facility is
            callable. Push Mode compliance is currently 98%. This covenant is
            disclosed in the S-1 risk factors. It has not been publicly noted by
            analysts.
          </Flag>
          <P2>
            The venture debt was repaid in full from Series C proceeds (November
            2024). The facility is closed.
          </P2>
        </Section>
      </div>
    ),
  },

  // ── SECTION 3: LEGAL ─────────────────────────────────────────────────────
  {
    id: 'DR-020',
    title: 'Pending Litigation Summary',
    section: '3. Legal',
    date: 'April 1, 2025',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    size: '31 pp',
    note: 'Summary only. Full litigation files available to underwriters under separate NDA supplement.',
    content: (
      <div>
        <Section title="Active Litigation">
          <DocTable
            headers={['Case', 'Filed', 'Claim', 'Status', 'Exposure']}
            rows={[
              [
                'Torres v. RISE™ Technologies',
                'August 2023',
                'Personal injury — solo commute contact with pedestrian (SC-0091)',
                'Settlement negotiations ongoing',
                <Redacted key="1" label="████████" width="80px" />,
              ],
              [
                'City of Portland v. RISE™ Technologies',
                'January 2024',
                'Municipal code violation — autonomous vehicle operation without permit during solo commutes',
                'Summary judgment pending — RISE™ position: device is not a vehicle',
                <Redacted key="2" label="████████" width="80px" />,
              ],
              [
                'Yau v. RISE™ Technologies',
                'March 2024',
                "Patent ownership — U.S. Patent 10,847,293 (sheet tensioning mechanism), filed under inventor's name during employment, ownership disputed",
                'Discovery phase',
                <Redacted key="3" label="████████" width="80px" />,
              ],
              [
                'Webb v. RISE™ Technologies',
                'October 2024',
                'Breach of equity agreement — claims 2009 founder equity agreement entitles original CTO to 0.5% of company on IPO',
                'Motion to dismiss filed — RISE™ position: agreement does not survive employment termination',
                <Redacted key="4" label="████████" width="80px" />,
              ],
              [
                'Doe v. RISE™ Technologies (class)',
                'February 2025',
                'Putative class action — claims audio data collection without adequate consent under state wiretapping statutes (CA, IL, WA)',
                'Certification hearing scheduled Q3 2025',
                'Class size estimated 47,000+ users — <Redacted key="5" label="████████" width="80px" />',
              ],
            ]}
          />
        </Section>
        <Section title="Regulatory Inquiries — Not Litigation">
          <DocTable
            headers={['Jurisdiction', 'Body', 'Subject', 'Status']}
            rows={[
              [
                'California',
                'CPUC / DMV',
                'Autonomous vehicle classification of solo commute',
                'Response submitted. Awaiting ruling.',
              ],
              [
                'United Kingdom',
                'MHRA / ICO',
                'Medical device classification (sleep monitoring); audio data retention',
                'Engaged with counsel. Position being developed.',
              ],
              [
                'European Union',
                'Multiple — coordinating',
                'GDPR compliance — audio data; biometric inference; automated decision-making (RISE™ Index)',
                'Formal inquiry not yet issued. Pre-inquiry correspondence only.',
              ],
            ]}
          />
          <Flag color={P.error}>
            The putative class action (Doe v. RISE™) is the material litigation
            risk in this filing. If certified, the class would include
            substantially all Push Mode users in California, Illinois, and
            Washington — approximately 47,000 users. General Counsel's
            assessment: "We believe the claims are defensible. We do not
            guarantee they will be successfully defended." The S-1 contains
            standard litigation risk disclosure. The class action is disclosed
            by description but not by name pending case management order.
          </Flag>
        </Section>
        <Section title="Webb v. RISE™ — Context">
          <P2>
            Marcus Webb was CTO of RISE™ from 2010 to 2013. He claims that his
            2009 founder equity agreement, which was not memorialized in writing
            (per Webb's complaint; RISE™ disputes this characterization),
            entitles him to 0.5% of the company's equity value upon IPO. At a
            projected IPO valuation of $1.5–2.0B, this claim has a potential
            value of $7.5–10M.
          </P2>
          <P2>
            RISE™'s position is that Webb's employment agreement (which was in
            writing) supersedes any prior equity understandings, that the
            employment agreement did not provide for post-termination equity,
            and that Webb's equity was forfeited upon his termination in 2013.
          </P2>
          <P2 style={{ color: P.textFaint }}>
            The IPO timing creates pressure to resolve this matter before the
            S-1 becomes effective. General Counsel is in settlement discussions.
            Dr. Voss's position on settlement is that she does not owe Webb
            anything. This position and the legal strategy are not fully
            aligned.
          </P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-021',
    title: 'Patent Portfolio — IP Schedule',
    section: '3. Legal',
    date: 'March 2025',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    note: '3 patents under ownership dispute. 9 pending. See litigation DR-020 re: Yau dispute.',
    content: (
      <div>
        <Section title="Granted Patents — RISE™ Technologies">
          <DocTable
            headers={[
              'Patent No.',
              'Title',
              'Filed',
              'Inventor(s)',
              'Ownership',
              'Note',
            ]}
            rows={[
              [
                'US 10,847,293',
                'Pneumatic mattress surface tensioning system with lateral centering mechanism',
                'March 2016',
                'D. Yau',
                '⚠ Disputed',
                'Filed under Yau name during employment. RISE™ claims work-for-hire. See DR-020.',
              ],
              [
                'US 11,024,891',
                'Autonomous mobile base navigation system for residential environments',
                'July 2016',
                'D. Yau, M. Webb (co-inventor)',
                '⚠ Disputed — dual',
                'Webb co-inventor claim complicates ownership. See DR-020.',
              ],
              [
                'US 11,203,447',
                'Pressure sensor array for occupant classification in adjustable bed systems',
                'January 2017',
                'D. Yau, P. Nair',
                '⚠ Disputed',
                'Nair separation agreement contains IP assignment provision — content redacted.',
              ],
              [
                'US 11,445,892',
                'Autonomous morning routing system with configurable stop sequencing',
                'August 2021',
                'M. Chen',
                '✓ Clear',
                'Filed post-separation. Chen employed at time of filing. Assignment complete.',
              ],
              [
                'US 11,556,103',
                'Biometric inference from mattress pressure sensor data',
                'November 2021',
                'M. Chen, RISE™ Engineering',
                '✓ Clear',
                '',
              ],
              [
                'US 11,712,445',
                'GPS-based autonomous vehicle return navigation system',
                'March 2022',
                'M. Chen, RISE™ Engineering',
                '✓ Clear',
                "Note: 'vehicle' classification in patent may conflict with Portland litigation position.",
              ],
              [
                'US 11,834,291',
                'Machine learning classification system for ambient audio events',
                'June 2022',
                'Data Science Team',
                '✓ Clear',
                '',
              ],
              [
                'US 11,901,847',
                'Compliance scoring system for behavioral pattern analysis',
                'January 2023',
                'M. Chen, Data Science Team',
                '✓ Clear',
                'The RISE™ Index is based on this patent.',
              ],
              [
                'US 12,001,203',
                'Relationship inference from occupancy co-presence data',
                'August 2023',
                'Data Science Team',
                '✓ Clear',
                '',
              ],
              [
                'US 12,104,847',
                'Multi-waypoint GPS routing for autonomous morning delivery systems',
                'November 2023',
                'M. Chen',
                '✓ Clear',
                '',
              ],
              [
                'Classified — pending',
                'Sheet tensioning v2 with staircase transition preparation system',
                'Filed 2024',
                'M. Chen, Engineering',
                '✓ Clear',
                'Related to RISE™ Move. Application classified at company request.',
              ],
            ]}
          />
        </Section>
        <Section title="Disputed Patents — Valuation Impairment">
          <Flag color={P.error}>
            Three of RISE™'s 14 granted patents are subject to ownership
            disputes (DR-020). The most material is US 10,847,293 (sheet
            tensioning mechanism — the foundation of the self-making feature).
            If Yau's ownership claim succeeds, RISE™ would need to license this
            patent from Yau. Licensing terms would be negotiated in adversarial
            conditions post-judgment. The self-making mechanism contributed to
            the increase in NPS from 31 (Q1 2021) to 71 (Q3 2024). The financial
            impact of a forced license is not modeled in the 5-year projection
            (DR-011). It should be.
          </Flag>
        </Section>
      </div>
    ),
  },

  // ── SECTION 4: TECHNOLOGY ────────────────────────────────────────────────
  {
    id: 'DR-030',
    title: 'Technical Architecture Overview',
    section: '4. Technology',
    date: 'February 2025',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '4 pp',
    note: "Written by Dr. Chen's team. Notable for its brevity. The previous CTO's architecture documentation was 200+ pages and described a system that did not work.",
    content: (
      <div>
        <Section title="Architecture Philosophy">
          <P2>
            RISE™'s current technical architecture was designed in January 2021
            around one constraint: reliability in residential Wi-Fi environments
            with intermittent connectivity. All prior architectural decisions
            that did not support this constraint were removed.
          </P2>
          <P2>
            The architecture is local-first. Push Mode navigation, routing
            decisions, and obstacle response operate entirely on the device's
            onboard processor. Cloud connectivity is used for: configuration
            sync, compliance logging, RISE™ Index updates, and remote session
            monitoring. Push Mode continues to operate without cloud
            connectivity. It does not depend on it.
          </P2>
          <Flag color={P.blue}>
            This is the correct architecture for this product. It is also the
            simplest architecture that would work. The prior architecture
            (2017–2021) was cloud-native with microservices. It was elegant. It
            did not work in residential Wi-Fi environments. The current
            architecture works. It is not elegant. It is 4 pages of
            documentation. The prior documentation was 214 pages. 214 pages of
            documentation for a system that could not navigate a bedroom.
          </Flag>
        </Section>
        <Section title="Component Summary">
          <DocTable
            headers={['Component', 'Location', 'Language/Stack', 'Purpose']}
            rows={[
              [
                'Navigation Core',
                'On-device (ARM Cortex-M7)',
                'C++',
                'Path planning, obstacle response, motor control',
              ],
              [
                'Session Manager',
                'On-device',
                'C++',
                'Push Mode lifecycle, stop sequencing, compliance logging',
              ],
              [
                'Cloud Sync',
                'Hybrid (device + RISE™ servers)',
                'Go / gRPC',
                'Config sync, telemetry, RISE™ Index updates',
              ],
              [
                'Audio Classification',
                'On-device (ML accelerator)',
                'Python / TensorFlow Lite',
                'Environmental audio processing',
              ],
              [
                'DataKit API',
                'RISE™ servers (AWS)',
                'Python / FastAPI',
                'Developer data access',
              ],
              [
                'Activation Portal',
                'Web (Next.js)',
                'TypeScript / React',
                '12-stage user onboarding',
              ],
              [
                'Internal CMS',
                'Web (Payload CMS)',
                'TypeScript / Next.js',
                'Document management — Payload v3.0.0-beta.67',
              ],
            ]}
          />
        </Section>
        <Section title="Known Issues">
          <DocTable
            headers={['Issue', 'Severity', 'Status', 'ETA']}
            rows={[
              [
                'DataKit date filter post-2019',
                'Medium',
                'Known — migration artifact from 2021 platform transition',
                'Pending legal clearance for data migration. No ETA.',
              ],
              [
                'Internal CMS authentication',
                'Critical',
                'All documents publicly accessible — auth middleware incomplete',
                'Q3 2025 (per security assessment). Currently Q2 2025. Not yet complete.',
              ],
              [
                'Staircase navigation',
                'Product gap',
                'Requires hardware solution — RISE™ Move in development',
                'No timeline.',
              ],
              [
                'Audio classification false positive rate',
                'Low-Medium',
                'Addressed in v4.1.1 — snoring reclassification',
                'Resolved.',
              ],
            ]}
          />
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-031',
    title: 'Cybersecurity Assessment — Third Party',
    section: '4. Technology',
    date: 'January 2025',
    classification: 'RESTRICTED',
    status: 'partial',
    note: 'Findings 1 and 2 are resolved. Finding 3 is the internal CMS. Finding 3 is unresolved. The data room is in the system described in Finding 3.',
    content: (
      <div>
        <Section title="Assessment Overview">
          <DocTable
            headers={['Field', 'Detail']}
            rows={[
              ['Assessor', 'CrowdStrike — Security Assessment Services'],
              [
                'Scope',
                'External perimeter, cloud infrastructure, internal systems, employee access controls',
              ],
              ['Date', 'January 8–19, 2025'],
              ['Critical findings', '1'],
              ['High findings', '1 (resolved)'],
              ['Medium findings', '4'],
              ['Low findings', '11'],
            ]}
          />
        </Section>
        <Section title="Finding 1 — RESOLVED">
          <div
            style={{
              padding: '12px',
              background: 'rgba(80,200,130,0.05)',
              border: '1px solid rgba(80,200,130,0.15)',
              borderRadius: '3px',
              marginBottom: '12px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: P.success,
                marginBottom: '6px',
              }}
            >
              STATUS: RESOLVED
            </p>
            <p
              style={{ fontSize: '11px', color: P.textMuted, lineHeight: 1.7 }}
            >
              Finding 1 (High): External-facing API endpoints lacked rate
              limiting. Remediated January 28, 2025.
            </p>
          </div>
        </Section>
        <Section title="Finding 2 — RESOLVED">
          <div
            style={{
              padding: '12px',
              background: 'rgba(80,200,130,0.05)',
              border: '1px solid rgba(80,200,130,0.15)',
              borderRadius: '3px',
              marginBottom: '12px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: P.success,
                marginBottom: '6px',
              }}
            >
              STATUS: RESOLVED
            </p>
            <p
              style={{ fontSize: '11px', color: P.textMuted, lineHeight: 1.7 }}
            >
              Finding 2 (Medium): DataKit API returned verbose error messages
              exposing stack traces. Remediated February 3, 2025.
            </p>
          </div>
        </Section>
        <Section title="Finding 3 — CRITICAL — UNRESOLVED">
          <div
            style={{
              padding: '14px',
              background: 'rgba(239,68,68,0.06)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '3px',
              marginBottom: '12px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: P.error,
                marginBottom: '8px',
                letterSpacing: '0.08em',
              }}
            >
              STATUS: CRITICAL — UNRESOLVED — REMEDIATION IN PROGRESS
            </p>
            <p
              style={{
                fontSize: '12px',
                color: P.text,
                marginBottom: '8px',
                fontWeight: 500,
              }}
            >
              Finding 3: Internal document management system publicly accessible
              without authentication
            </p>
            <p
              style={{ fontSize: '11px', color: P.textMuted, lineHeight: 1.8 }}
            >
              The company's internal document management system (implemented on
              Payload CMS v3.0.0-beta.67, hosted atriseawake.com/internal) does
              not implement authentication controls. All documents in the system
              are publicly accessible via direct URL without any login or access
              verification.
            </p>
            <p
              style={{
                fontSize: '11px',
                color: P.textMuted,
                lineHeight: 1.8,
                marginTop: '8px',
              }}
            >
              The system contains 19 documents classified CONFIDENTIAL,
              RESTRICTED, and INTERNAL. These documents include: executive
              personnel configurations, Push Mode incident logs, audio data
              access logs, engineering status reports for unannounced products,
              and marketing strategy documents.
            </p>
            <p
              style={{
                fontSize: '11px',
                color: P.textMuted,
                lineHeight: 1.8,
                marginTop: '8px',
              }}
            >
              Additionally, the due diligence data room for the company's
              anticipated public offering has been migrated to this system and
              is also publicly accessible.
            </p>
            <p
              style={{
                fontSize: '11px',
                color: P.error,
                lineHeight: 1.8,
                marginTop: '8px',
                fontWeight: 500,
              }}
            >
              This data room — the document in which this finding is disclosed —
              is itself accessible without authentication
              atriseawake.com/internal/dataroom.
            </p>
          </div>
          <P2>
            Remediation plan: Complete authentication middleware implementation
            (begun August 2024 by former junior developer, approximately 80%
            complete). Target completion Q2 2025. Current status: Q2 2025 has
            begun. The middleware is not yet complete.
          </P2>
          <Flag color={P.error}>
            The underwriters (Goldman Sachs, Morgan Stanley) were informed of
            Finding 3 on January 22, 2025. Their response, received January 25:
            "We note the finding. We recommend remediation prior to S-1
            effectiveness. We will include appropriate disclosure in the risk
            factors. We will not delay the process pending remediation provided
            RISE™ can demonstrate ongoing progress toward resolution." The S-1
            contains the following disclosure: "Certain internal company
            documents are currently accessible via public URL due to an
            incomplete authentication implementation. The company is actively
            working to remediate this vulnerability. There can be no assurance
            that this remediation will be completed prior to this offering, or
            that this vulnerability has not been or will not be exploited."
          </Flag>
        </Section>
      </div>
    ),
  },

  // ── SECTION 5: PERSONNEL ─────────────────────────────────────────────────
  {
    id: 'DR-040',
    title: 'Key Employee Agreements — Summary',
    section: '5. Personnel',
    date: 'March 2025',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    note: 'Agreements themselves are redacted. Summaries prepared by General Counsel.',
    content: (
      <div>
        <Section title="Executive Employment Agreements">
          <DocTable
            headers={[
              'Name',
              'Title',
              'Start Date',
              'Base Salary',
              'Equity',
              'Note',
            ]}
            rows={[
              [
                'Dr. Eleanor Voss',
                'Founder & CEO',
                'March 14, 2009',
                <Redacted key="1" label="████████" />,
                'Class B founder shares — 12.4M shares vested. Cliff completed 2012.',
                'Founder agreement. No termination clause. Board removal only.',
              ],
              [
                'Dr. Mara Chen',
                'Chief Product Officer',
                'March 1, 2021',
                <Redacted key="2" label="████████" />,
                'Options: 840,000 shares. 4-year vest. 80% vested as of April 2025.',
                'Joined 2.5 months before Push Mode launch. Turnaround hire. Agreement includes a stay bonus payable at IPO.',
              ],
              [
                'Thomas Ellery',
                'Chief Financial Officer',
                'August 15, 2021',
                <Redacted key="3" label="████████" />,
                'Options: 420,000 shares. 4-year vest.',
                'Pre-employment bridge investment disclosed. Agreement includes dual-trigger acceleration on IPO + termination.',
              ],
              [
                'James Park',
                'General Counsel',
                'July 1, 2022',
                <Redacted key="4" label="████████" />,
                'Options: 280,000 shares. 4-year vest.',
                'Former FTC regulatory counsel. Hired specifically for autonomous navigation regulatory exposure.',
              ],
            ]}
          />
        </Section>
        <Section title="CTO Position — Historical">
          <Flag color={P.warning}>
            RISE™ does not currently employ a Chief Technology Officer. The
            position was last held by Priya Nair, who departed December 14,
            2020. Technical and product responsibility is consolidated under Dr.
            Chen (CPO). The Board authorized the CTO position to remain vacant
            indefinitely (Amendment 4, December 14, 2020). No CTO search is
            currently active. The S-1 discloses this as a risk factor under "Key
            Personnel and Organizational Structure."
          </Flag>
          <DocTable
            headers={[
              'CTO',
              'Tenure',
              'Departure',
              'Technical contribution',
              'Technical debt created',
            ]}
            rows={[
              [
                'Marcus Webb',
                '2010–2013',
                'Terminated',
                'Embedded firmware for Ambient/Tone/Thermal/Gradient/Alarm hardware',
                'NudgeSense app architecture (deprecated 2019). No software survives.',
              ],
              [
                'Daniel Yau',
                '2013–2017',
                'Voluntary',
                'NudgeBar mechanics. Self-making mechanism prototype. First Push Mode prototype. 5 patents.',
                'Patent ownership disputes (DR-020, DR-021). Code not preserved in 2021 migration.',
              ],
              [
                'Priya Nair',
                '2017–2020',
                'Terminated',
                'Architecture diagrams. 214 pages of documentation. Staging environment.',
                '$11.4M written off. No production code survives. Open source license compliance questions (DR-032).',
              ],
              [
                'Dr. Mara Chen (CPO, not CTO)',
                '2021–present',
                'Active',
                'Current Push Mode platform. All 8 post-2021 patents. Push Mode ships.',
                'None identified to date.',
              ],
            ]}
          />
        </Section>
        <Section title="Org Structure — No CTO">
          <P2>
            The diligence questionnaire (Section 7, DR-050) includes the
            following question from underwriters: "How does the company manage
            technical architecture decisions in the absence of a Chief
            Technology Officer?" General Counsel's prepared response: "Technical
            strategy is managed by the CPO, who has sole decision-making
            authority over all technical matters. The current CPO has
            demonstrated this capability through the successful launch of Push
            Mode and the subsequent platform improvements reflected in the 98%
            compliance rate. The Board is satisfied with this arrangement."
          </P2>
          <P2 style={{ color: P.textFaint }}>
            The prepared response does not address the question of what happens
            if Dr. Chen departs. This is addressed in the risk factors: "The
            loss of Dr. Chen would have a material adverse effect on the
            company's ability to maintain and develop its technical platform."
          </P2>
        </Section>
      </div>
    ),
  },

  // ── SECTION 7: DUE DILIGENCE Q&A ────────────────────────────────────────
  {
    id: 'DR-050',
    title: 'Underwriter Due Diligence Q&A — Goldman Sachs / Morgan Stanley',
    section: '7. Due Diligence Q&A',
    date: 'March–April 2025',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    note: "47 questions. 31 fully answered. 11 answered 'under separate cover.' 5 answered 'information not yet available.'",
    content: (
      <div>
        <Section title="Selected Q&A — Fully Answered">
          {[
            {
              q: "What is the company's plan for addressing the publicly accessible internal document system identified in the cybersecurity assessment?",
              a: "The authentication middleware is approximately 80% complete. The engineer who began the implementation left the company in August 2024. A replacement implementation has been contracted. Estimated completion Q2 2025. The system's public accessibility has been disclosed in the S-1 risk factors. The company monitors access logs and has identified one external IP address (203.0.113.47) that has accessed 14 of 19 documents in the system. The identity of this IP address is unknown. IT security is aware.",
              flag: 'warning',
            },
            {
              q: "Has the company conducted an analysis of the revenue and valuation impact if the Yau patent dispute is resolved in Yau's favor?",
              a: "Yes. A forced license for US 10,847,293 (sheet tensioning mechanism) was modeled assuming a 15% royalty on self-making mechanism-related revenue. The self-making mechanism's revenue attribution is not separately tracked; the company estimates it contributes approximately 18% of NPS improvement from Q3 2021 baseline. Financial model impact has not been prepared and is not included in the materials provided. The underwriters are encouraged to prepare their own analysis.",
              flag: 'error',
            },
            {
              q: 'Can you confirm that Push Mode compliance data is verified by an independent third party?',
              a: "Push Mode compliance data is verified by RISE™ Internal Analytics. Internal Analytics is an internal team, not an independent third party. The phrase 'independently verified by RISE™ Internal Analytics' which appears in various company materials means verified by an internal team that is independent from the sales team. It does not mean third-party verified. Third-party verification is in progress. Expected completion Q3 2025.",
              flag: 'warning',
            },
            {
              q: "What is the company's path to profitability if Push Pro and Move do not launch on the timelines reflected in the financial model?",
              a: "The company was profitable in FY2024 on Push revenue alone ($17.8M net income). The financial model's Push Pro and Move projections represent upside, not the baseline. In the event neither product launches in FY2026, the company projects revenue of $112M and net income of $21M from Push alone. The company is profitable without new products. The new products are growth, not survival.",
              flag: null,
            },
            {
              q: "The filing discloses a class action complaint regarding audio data collection. Can you characterize the basis for the company's confidence that the claims are defensible?",
              a: "The company's General Counsel has reviewed the complaint and believes the claims are defensible on the following grounds: (1) users consented to audio collection by pressing the PM-1 button (Terms of Service Section 21); (2) the collection methodology is disclosed in the Privacy Policy; (3) the company does not livestream audio but retains it. The plaintiffs' theory is that pressing a button is not sufficient consent for the recording of 'private conversations.' The company's position is that the bedroom during Push Mode is not a setting in which private conversations occur under the relevant statutes' definitions. General Counsel notes this is 'a defensible but not certain position.'",
              flag: 'warning',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                marginBottom: '20px',
                padding: '14px',
                background: P.elevation100,
                borderRadius: '4px',
                border: `1px solid ${P.border}`,
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  color: P.textMuted,
                  fontWeight: 500,
                  marginBottom: '8px',
                }}
              >
                Q{i + 1}: {item.q}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: P.textMuted,
                  lineHeight: 1.8,
                }}
              >
                A: {item.a}
              </p>
              {item.flag && (
                <div
                  style={{
                    marginTop: '8px',
                    fontSize: '10px',
                    color: item.flag === 'error' ? P.error : P.warning,
                    fontStyle: 'italic',
                  }}
                >
                  {item.flag === 'error'
                    ? '⚠ Underwriter flag: response incomplete'
                    : '⚠ Underwriter note: disclosure risk'}
                </div>
              )}
            </div>
          ))}
        </Section>
        <Section title="Questions Answered 'Information Not Yet Available'">
          {[
            'Q: What are the specifications, price, and launch timeline for the Push Pro?',
            'Q: What are the specifications, price, launch timeline, and VNS subscription price for the RISE™ Move?',
            "Q: Has an independent assessment of the company's software capitalization policies (as recommended by Deloitte in the FY2021 review) been completed?",
            'Q: What is the content of Appendix C referenced throughout the Sleep & Environmental Data Policy?',
            'Q: Has the company prepared an analysis of potential GDPR regulatory exposure in EU markets?',
          ].map((q, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '10px',
                padding: '10px 0',
                borderBottom: `1px solid ${P.border}`,
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  color: P.error,
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                —
              </span>
              <p
                style={{
                  fontSize: '11px',
                  color: P.textMuted,
                  lineHeight: 1.6,
                }}
              >
                {q}
              </p>
              <span
                style={{
                  fontSize: '9px',
                  color: 'rgba(239,68,68,0.5)',
                  flexShrink: 0,
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Not available
              </span>
            </div>
          ))}
        </Section>
      </div>
    ),
  },

  // ── STUB DOCUMENTS — additional corpus ────────────────────────────────────
  {
    id: 'DR-007',
    title: 'Amended and Restated Stockholder Agreement',
    section: '1. Corporate',
    date: 'August 2022',
    classification: 'RESTRICTED',
    status: 'redacted',
    size: '41 pp',
    note: 'Available to accredited investors under NDA supplement. Contains voting provisions, drag-along rights, and the anti-dilution adjustment made to Benchmark in lieu of pro-rata participation in the Series B extension.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Redacted
          label="Document available to accredited investors under NDA supplement"
          width="85%"
        />
        <p
          style={{
            fontSize: '10px',
            color: P.textFaint,
            marginTop: '16px',
            lineHeight: 1.7,
          }}
        >
          Contact T. Ellery, CFO, to request access. Turnaround: 5–7 business
          days pending NDA execution. Note: the anti-dilution adjustment to
          Benchmark referenced in DR-002 is memorialized in this agreement. The
          adjustment is the reason Benchmark waived pro-rata rights on the
          Series B extension. The reason Benchmark waived is not separately
          documented.
        </p>
      </div>
    ),
  },
  {
    id: 'DR-008',
    title: 'Board Consent — Series A Authorization',
    section: '1. Corporate',
    date: 'June 14, 2013',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '3 pp',
    note: 'Clean document. Signed during business hours on a weekday. No unusual circumstances. Included here for completeness.',
    content: (
      <div>
        <Section title="Authorization">
          <P2>
            The Board of Directors of RISE™ Technologies, Inc., by unanimous
            written consent, authorized the issuance of Series A Preferred Stock
            to Benchmark Capital Partners at $1.47 per share, post-money
            valuation $18.5M, for total proceeds of $6.5M.
          </P2>
          <P2>
            Board members at time of signing: Dr. Eleanor Voss (CEO), two
            independent directors (both subsequently departed). Benchmark board
            seat created per this consent, to be filled by a
            Benchmark-designated partner. Sarah Whitmore subsequently
            designated.
          </P2>
          <P2 style={{ color: P.textFaint, fontStyle: 'italic' }}>
            This document is included here because it is the only board consent
            in this data room that was signed during normal business hours, at a
            desk, by people who were not attending a wedding or operating on 6
            days of runway. It is not otherwise notable.
          </P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-009',
    title: 'Board Minutes — Series B Close, October 2016',
    section: '1. Corporate',
    date: 'October 28, 2016',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    size: '8 pp',
    note: "The optimistic meeting. Series B closed at $95M post-money. Platform build authorized. Priya Nair's proposal approved. Three years later the platform was written off.",
    content: (
      <div>
        <Section title="Agenda Item 3 — Platform Vision Authorization">
          <P2>
            The Board reviewed and approved the proposed platform architecture
            as presented by CTO Priya Nair. The presentation described a
            cloud-native microservices platform that would serve as the
            foundation for Push Mode and all future RISE™ products. The Board
            expressed enthusiasm for the vision.
          </P2>
          <P2>
            Sarah Whitmore (Benchmark): "This is the kind of architectural
            thinking that gets companies to scale. I'm supportive."
          </P2>
          <P2>
            Marcus Reid (a16z): "The platform approach is right. Building for
            the future, not just the current product."
          </P2>
          <P2>
            Budget authorized: $4M for platform development in FY2017, with
            expectation of Push Mode production launch by Q4 2018.
          </P2>
          <P2 style={{ color: P.textFaint, fontStyle: 'italic' }}>
            Push Mode production launch occurred October 7, 2021. Platform
            budget consumed: $11.4M over FY2017–2020. Platform code in
            production: 0%. These facts were not knowable on October 28, 2016.
            The Board made a reasonable decision with the information available.
            The information available was insufficient. This is documented here
            for accuracy, not to assign blame.
          </P2>
        </Section>
      </div>
    ),
  },
  // Legal stubs
  {
    id: 'DR-022',
    title: 'Torres v. RISE™ — Litigation File',
    section: '3. Legal',
    date: 'August 2023',
    classification: 'RESTRICTED',
    status: 'redacted',
    size: '67 pp',
    note: 'Personal injury claim — solo commute contact. Settlement negotiations ongoing. File under legal hold. Exposure estimate redacted.',
    content: (
      <div>
        <Flag color={P.error}>
          This litigation file is under legal hold. Contents are not available
          in this data room. Exposure estimate and settlement authority are
          available to underwriters under separate NDA supplement. Contact J.
          Park, General Counsel.
        </Flag>
        <P2>
          SC-0091 — the incident underlying this claim — is documented in the
          incident archive (DOC-007 in the internal system, which is publicly
          accessible). The incident documentation is more detailed than RISE™
          would prefer to be publicly available. IT is aware.
        </P2>
      </div>
    ),
  },
  {
    id: 'DR-023',
    title: 'City of Portland v. RISE™ — Litigation File',
    section: '3. Legal',
    date: 'January 2024',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '44 pp',
    note: 'Municipal autonomous vehicle classification. Summary judgment pending. RISE™ position: the bed is not a vehicle. This position has not yet been tested at summary judgment.',
    content: (
      <div>
        <Section title="RISE™ Legal Position">
          <P2>
            RISE™ contends that the Push does not meet the statutory definition
            of an autonomous vehicle under Oregon law because: (1) it operates
            at walking pace, (2) it operates on sidewalks rather than roadways
            as a primary path, (3) it is classified as furniture, not a vehicle,
            for customs and import purposes, (4) the user is the licensed
            operator for purposes of traffic law because they authorized the
            commute by pressing the PM-1 button.
          </P2>
          <P2>
            The City of Portland's position is that a motorized device
            navigating public rights-of-way autonomously is a vehicle regardless
            of classification, pace, or operator theory.
          </P2>
          <Flag color={P.warning}>
            General Counsel notes: "The Portland position is not frivolous. If
            they prevail, every market where the solo commute uses public
            sidewalks faces the same classification question. That is 14 markets
            currently and 89 planned. We are monitoring." Summary judgment
            hearing is scheduled. Outcome uncertain.
          </Flag>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-024',
    title: 'Yau v. RISE™ — Patent Dispute File',
    section: '3. Legal',
    date: 'March 2024',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '89 pp',
    note: "Most material litigation. US 10,847,293 sheet tensioning — the self-making mechanism's core patent. If Yau prevails, RISE™ licenses the heart of its most beloved feature from an adversary.",
    content: (
      <div>
        <Section title="Summary">
          <P2>
            Yau filed suit in March 2024 claiming ownership of three patents
            filed during his employment (US 10,847,293, US 11,024,891, US
            11,203,447). RISE™'s position: work-for-hire doctrine — patents
            filed during employment belong to the employer.
          </P2>
          <P2>
            Yau's position: his employment agreement's IP assignment clause
            contains a carveout for inventions developed "substantially on
            personal time with personal resources." Yau claims he developed the
            sheet tensioning mechanism concept prior to RISE™ employment and
            refined it on personal time.
          </P2>
          <Flag color={P.error}>
            The self-making mechanism (US 10,847,293) is the most material
            patent in dispute. This patent underlies the feature most associated
            with user NPS improvement since 2023. It is also the feature Dr.
            Voss cited most frequently in the FY2024 shareholder letter. A
            forced license under adversarial conditions would create ongoing
            royalty obligations and give Yau leverage over a core product
            feature. The financial model (DR-011) does not account for this. The
            underwriters have asked why. General Counsel's answer: "We are
            confident in our position." The underwriters noted the answer and
            the absence of a financial model.
          </Flag>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-025',
    title: 'Webb v. RISE™ — Equity Claim File',
    section: '3. Legal',
    date: 'October 2024',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '28 pp',
    note: 'Webb claims a 2009 verbal founder equity agreement. At IPO valuation, worth $7.5–10M. Dr. Voss and General Counsel not fully aligned on settlement approach.',
    content: (
      <div>
        <Section title="The Claim">
          <P2>
            Marcus Webb served as CTO from 2010 to 2013. He was terminated in Q3
            2013. He claims that in 2009, before RISE™ was incorporated, Dr.
            Voss verbally agreed to grant him 0.5% founder equity in exchange
            for his technical contribution to the company concept.
          </P2>
          <P2>
            RISE™'s position: no such agreement existed; Webb's written
            employment agreement (signed 2010) is the complete statement of his
            compensation, including equity, which he forfeited upon termination.
          </P2>
          <P2>
            Webb's position: the verbal agreement predated the employment
            agreement and survived it. He has one witness — a mutual
            acquaintance who attended a 2009 dinner at which the alleged
            conversation occurred.
          </P2>
        </Section>
        <Section title="Alignment Problem">
          <P2 style={{ color: P.textFaint, fontStyle: 'italic' }}>
            General Counsel's recommended approach: settle before IPO to remove
            overhang. Estimated settlement range: $2–4M. Dr. Voss's position: "I
            do not owe Marcus Webb anything. We will not pay him anything."
            These positions are not fully aligned. The IPO timeline creates
            pressure to resolve this. The resolution path is unclear.
          </P2>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-026',
    title: 'Doe v. RISE™ — Class Action File (Summary)',
    section: '3. Legal',
    date: 'February 2025',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '112 pp',
    note: 'Most significant by potential exposure. 47,000+ class members. Audio wiretapping claims under CA, IL, WA statutes. Certification hearing Q3 2025 — same quarter as IPO.',
    content: (
      <div>
        <Section title="Claims">
          <P2>
            Plaintiffs allege RISE™ violated state wiretapping statutes
            (California Invasion of Privacy Act, Illinois Eavesdropping Act,
            Washington Privacy Act) by recording audio in users' bedrooms
            without adequate consent. The recording occurs via the onboard audio
            classification system during Push Mode sessions.
          </P2>
          <P2>
            RISE™'s consent theory: users consented by pressing the PM-1 button,
            which activates Push Mode. Push Mode's operation (including audio
            monitoring) is disclosed in the Terms of Service (Section 21) and
            Privacy Policy. A user who presses the button consents to all Push
            Mode functions.
          </P2>
          <P2>
            Plaintiffs' theory: pressing a hardware button to activate a morning
            routine is not informed consent to bedroom audio recording under
            wiretapping statutes that require explicit consent for recording
            private communications.
          </P2>
        </Section>
        <Flag color={P.error}>
          The certification hearing is scheduled Q3 2025 — potentially
          concurrent with the IPO roadshow. A certification ruling adverse to
          RISE™ during the roadshow period would be a significant negative
          event. General Counsel has briefed the underwriters. The underwriters
          have requested that RISE™ pursue early resolution. RISE™ has not yet
          authorized a settlement authority. The parties are in mediation.
          Mediation is not progressing.
        </Flag>
      </div>
    ),
  },
  {
    id: 'DR-032',
    title: 'Open Source License Compliance Audit — Nair-era Platform',
    section: '3. Legal',
    date: 'April 2021',
    classification: 'CONFIDENTIAL',
    status: 'partial',
    size: '22 pp',
    note: 'Nair-era platform used several open-source components. Some GPL-licensed. Compliance with GPL copyleft requirements for a platform that was never released is legally ambiguous. Under review.',
    content: (
      <div>
        <Section title="Issue Summary">
          <P2>
            During the March 2021 platform assessment, Dr. Chen's team
            identified that the Nair-era platform incorporated several
            open-source components under GPL-3.0 and LGPL-2.1 licenses. The
            platform was never released publicly, which creates a legally
            ambiguous situation regarding copyleft obligations.
          </P2>
          <P2>
            GPL copyleft obligations are generally triggered by distribution. A
            platform used internally and never distributed may not trigger
            disclosure requirements. However, if any Nair-era code was
            incorporated into the current platform (Chen era) and that platform
            was distributed (it was — Push Mode firmware is distributed to
            devices), the GPL copyleft chain could require disclosure of RISE™'s
            proprietary modifications.
          </P2>
          <Flag color={P.warning}>
            Chen's team confirmed in April 2021 that no Nair-era code was
            incorporated into the current platform. The GPL compliance question
            is therefore moot for the current platform. However, the audit was
            never formally closed. It is listed as "under review" in Legal's
            matter management system. It has been under review since April 2021.
            General Counsel notes this is "a housekeeping matter" that will be
            resolved before the IPO. It is Q2 2025. The IPO is Q3 2026.
          </Flag>
        </Section>
      </div>
    ),
  },
  // Personnel stubs
  {
    id: 'DR-041',
    title: 'Dr. Eleanor Voss — Employment Agreement',
    section: '5. Personnel',
    date: 'March 14, 2009',
    classification: 'RESTRICTED',
    status: 'redacted',
    size: '12 pp',
    note: 'Founder agreement. No termination provision. Board removal only. Compensation redacted.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Redacted
          label="Agreement redacted — available to underwriters under NDA supplement"
          width="80%"
        />
        <p
          style={{
            fontSize: '10px',
            color: P.textFaint,
            marginTop: '16px',
            lineHeight: 1.8,
          }}
        >
          Note: The founder agreement contains no termination clause. Dr. Voss
          can only be removed by board action. The board currently includes Dr.
          Voss (chair), Whitmore (Benchmark), and Reid (a16z). A board removal
          of Dr. Voss would require both investor board members to vote against
          her. This has not been discussed. It is noted here because the S-1
          requires disclosure of removal provisions and the removal provision is
          "board vote," which requires a majority including investor members.
        </p>
      </div>
    ),
  },
  {
    id: 'DR-042',
    title: 'Dr. Mara Chen — CPO Employment Agreement',
    section: '5. Personnel',
    date: 'February 25, 2021',
    classification: 'RESTRICTED',
    status: 'redacted',
    size: '18 pp',
    note: 'Contains IPO stay bonus. Single-trigger acceleration on change of control. Compensation redacted.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Redacted
          label="Agreement redacted — available to underwriters under NDA supplement"
          width="80%"
        />
        <p
          style={{
            fontSize: '10px',
            color: P.textFaint,
            marginTop: '16px',
            lineHeight: 1.8,
          }}
        >
          Note: Chen's agreement includes an IPO stay bonus payable upon
          successful offering close. Amount redacted. The stay bonus creates an
          incentive to complete the IPO but not necessarily to remain post-IPO.
          The underwriters have noted this. A post-IPO retention package is
          under discussion. It has not been finalized. It is not in the S-1.
        </p>
      </div>
    ),
  },
  {
    id: 'DR-043',
    title: 'Thomas Ellery — CFO Employment Agreement + Conflict Disclosure',
    section: '5. Personnel',
    date: 'August 15, 2021',
    classification: 'RESTRICTED',
    status: 'partial',
    size: '14 pp',
    note: 'Includes formal conflict disclosure for pre-employment bridge investment. Dual-trigger acceleration. Compensation redacted.',
    content: (
      <div>
        <Section title="Conflict Disclosure — Pre-Employment Investment">
          <P2>
            Thomas Ellery invested $500,000 in the RISE™ bridge round (January
            4, 2021) prior to his employment as CFO (September 1, 2021). This
            investment was disclosed to the Board at the time of his hire. The
            Board, by the same consent that appointed Ellery as CFO (DR-006,
            executed August 13, 2022, dated July 31, 2022), waived the conflict.
          </P2>
          <P2>
            The bridge investment converted to 105,263 Series B extension shares
            at $4.75/share. At Series C valuation ($1.2B, November 2024), these
            shares are valued at approximately $16.8M. The investment was
            $500,000. The return is approximately 33.6x at current valuation.
          </P2>
          <Flag color={P.warning}>
            The conflict waiver was executed in the same document as the CFO
            appointment, on the same day the CFO's investment was converted to
            equity, by a consent that was signed at a wedding. All of this is
            disclosed. The disclosure is in several places. The sequence of
            events is intact in the record.
          </Flag>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-044',
    title: 'James Park — General Counsel Employment Agreement',
    section: '5. Personnel',
    date: 'July 1, 2022',
    classification: 'RESTRICTED',
    status: 'redacted',
    size: '11 pp',
    note: 'Joined July 18, 2022 — 11 days before the Series B extension term sheet. Not invited to the wedding. Compensation redacted.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Redacted
          label="Agreement redacted — available to underwriters under NDA supplement"
          width="80%"
        />
        <p
          style={{
            fontSize: '10px',
            color: P.textFaint,
            marginTop: '16px',
            lineHeight: 1.8,
          }}
        >
          Note: Park's agreement includes standard confidentiality and conflict
          of interest provisions. It does not include a provision addressing the
          scenario where the General Counsel is asked to conduct an internal
          review of corporate governance matters that occurred before he was
          hired but during his first month of employment. This scenario
          occurred. His August 22, 2022 memorandum addresses it. The memorandum
          is privileged.
        </p>
      </div>
    ),
  },
  // Commercial stubs
  {
    id: 'DR-060',
    title: 'Corporate Wellness Partner Agreement — Pilot 1 (Transit Authority)',
    section: '6. Commercial',
    date: 'January 2023',
    classification: 'CONFIDENTIAL',
    status: 'redacted',
    size: '31 pp',
    note: 'Identity of organization withheld. 1,200 units. Section 13 data sharing active. Compliance data shared weekly with HR. Individual data available on request.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Redacted
          label="Agreement redacted — organization identity confidential"
          width="80%"
        />
        <p
          style={{
            fontSize: '10px',
            color: P.textFaint,
            marginTop: '16px',
            lineHeight: 1.8,
          }}
        >
          The agreement includes the Section 13 data sharing addendum. Enrolled
          employees were informed at enrollment that compliance data is shared
          with their employer. The specific data fields shared are specified in
          Exhibit B of the agreement. Exhibit B is redacted. General Counsel
          note: "The data sharing terms are aggressive but disclosed. We believe
          they are defensible."
        </p>
      </div>
    ),
  },
  {
    id: 'DR-061',
    title:
      'Corporate Wellness Partner Agreement — Pilot 2 (Professional Services)',
    section: '6. Commercial',
    date: 'January 2024',
    classification: 'CONFIDENTIAL',
    status: 'redacted',
    size: '28 pp',
    note: '87 units. Individual RISE™ Index scores visible to authorized HR. Compliance below 90% over 30 days flagged for performance review discussion.',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Redacted
          label="Agreement redacted — organization identity confidential"
          width="80%"
        />
        <p
          style={{
            fontSize: '10px',
            color: P.textFaint,
            marginTop: '16px',
            lineHeight: 1.8,
          }}
        >
          The performance review trigger clause (90-day compliance below 90%)
          was proposed by the client, not by RISE™. RISE™ Legal reviewed and
          approved. The clause is disclosed to enrolled employees in the program
          enrollment acknowledgment. General Counsel note: "This is the client's
          HR policy expressed through our data. We are the data conduit, not the
          policy maker. Our legal exposure is limited." This characterization is
          under review.
        </p>
      </div>
    ),
  },
  {
    id: 'DR-062',
    title: 'DataKit SDK Developer Agreement — Standard Form',
    section: '6. Commercial',
    date: 'March 2023',
    classification: 'INTERNAL',
    status: 'complete',
    size: '8 pp',
    note: 'Standard form agreement for DataKit API access. All developers sign this. The data they access belongs to users who are unlikely to be aware their data is being accessed by third-party developers.',
    content: (
      <div>
        <Section title="Key Terms">
          <P2>
            DataKit SDK developers agree to: use data only for the stated
            purpose; not re-identify anonymized data; not sell or transfer data
            to third parties; comply with applicable privacy law; and maintain
            data security standards as specified in Exhibit A.
          </P2>
          <P2>
            The agreement does not require developers to disclose to users that
            they are accessing their RISE™ data. The Privacy Policy discloses
            that data may be shared with DataKit API partners. Users who have
            not read Section 18 of the Privacy Policy may not be aware their
            sleep environment data is accessible to approved third-party
            developers.
          </P2>
          <Flag color={P.warning}>
            The Doe class action (DR-026) plaintiffs have subpoenaed the DataKit
            developer agreement as part of their discovery request. General
            Counsel has produced a redacted version. The plaintiffs' counsel has
            characterized the agreement as evidence of "systematic
            commercialization of non-consensual bedroom surveillance." RISE™
            disputes this characterization. The dispute continues.
          </Flag>
        </Section>
      </div>
    ),
  },
  {
    id: 'DR-063',
    title: 'Venture Debt Facility — Restructured Agreement (Post-SVB)',
    section: '6. Commercial',
    date: 'June 2023',
    classification: 'CONFIDENTIAL',
    status: 'complete',
    size: '19 pp',
    note: 'Restructured after SVB failure. Lender name redacted pending consent. Compliance covenant: Push Mode compliance floor 94%. Repaid in full November 2024 from Series C.',
    content: (
      <div>
        <Section title="Key Terms — Restructured Facility">
          <DocTable
            headers={['Term', 'Detail']}
            rows={[
              [
                'Lender',
                <Redacted key="1" label="████████████" width="120px" />,
              ],
              ['Principal', '$8,000,000'],
              ['Interest', 'Prime + 3.2%'],
              ['Maturity', 'March 2026 (extended from March 2025)'],
              [
                'Repayment',
                'Repaid in full November 2024 from Series C proceeds',
              ],
              [
                'Push Mode compliance covenant',
                'Compliance must remain above 94% for two consecutive quarters or facility is callable',
              ],
              [
                'Additional covenants',
                'RISE™ Index methodology must remain consistent with methodology at time of signing; DataKit API must remain operational',
              ],
            ]}
          />
          <P2 style={{ color: P.textFaint, fontStyle: 'italic' }}>
            The compliance covenant was active from June 2023 through November
            2024. During this period, Push Mode compliance was 98% — comfortably
            above the 94% floor. The covenant is now inactive (facility repaid).
            It is disclosed in the S-1 because it was a material term of a
            material facility during the reporting period. The underwriters
            asked if the covenant was the reason RISE™ resisted adding a manual
            override to Push Mode during this period. General Counsel answered
            that the covenant and the product philosophy were aligned, not that
            one caused the other. This answer was noted.
          </P2>
        </Section>
      </div>
    ),
  },
  // Additional Due Diligence
  {
    id: 'DR-051',
    title: 'S-1 Registration Statement — Filed April 2, 2025',
    section: '7. Due Diligence Q&A',
    date: 'April 2, 2025',
    classification: 'PUBLIC',
    status: 'complete',
    size: '312 pp',
    note: 'Filed with the SEC. Publicly available at SEC EDGAR. This copy is included in the data room for reference. It is the same document.',
    content: (
      <div>
        <Section title="Filing Reference">
          <P2>
            RISE™ Technologies, Inc. filed its S-1 Registration Statement with
            the SEC on April 2, 2025. The filing is publicly available at SEC
            EDGAR under the company's CIK number.
          </P2>
          <P2>
            The S-1 contains all material disclosures required by law,
            including: the FY2022 board consent execution circumstances
            (footnote 34), the public accessibility of the internal document
            system (Risk Factors, Cybersecurity section), the pending litigation
            (Risk Factors, Legal Proceedings), the CTO vacancy (Risk Factors,
            Key Personnel), the Yau patent dispute (Risk Factors, Intellectual
            Property), and the Doe class action (Risk Factors, Legal
            Proceedings).
          </P2>
          <P2>
            The SEC has received the filing. Review is ongoing. The standard
            review period is 30 days. If the SEC issues comments, the company
            will respond. If the response is satisfactory, the registration
            becomes effective. The IPO follows. The IPO is anticipated Q3 2026.
          </P2>
          <Flag color={P.blue}>
            This data room — including DR-006 (board consent execution
            circumstances), DR-031 (cybersecurity finding), DR-026 (class action
            summary), and all other documents — is publicly accessible
            atriseawake.com/internal/dataroom. The S-1 discloses this. The SEC
            reviewer can access this data room. It is possible they already
            have.
          </Flag>
        </Section>
      </div>
    ),
  },
]

// ─── Folder structure ─────────────────────────────────────────────────────────

const SECTIONS = [
  { id: '1. Corporate', label: '1 — Corporate Documents', shortLabel: 'Corporate', count: 13, icon: Building2 },
  { id: '2. Financial', label: '2 — Financial Statements', shortLabel: 'Financial', count: 8, icon: TrendingUp },
  { id: '3. Legal', label: '3 — Legal & Regulatory', shortLabel: 'Legal', count: 11, icon: Scale },
  { id: '4. Technology', label: '4 — Technology & IP', shortLabel: 'Technology', count: 6, icon: Cpu },
  { id: '5. Personnel', label: '5 — Personnel & HR', shortLabel: 'Personnel', count: 9, icon: Users },
  { id: '6. Commercial', label: '6 — Commercial Agreements', shortLabel: 'Commercial', count: 8, icon: Briefcase },
  { id: '7. Due Diligence Q&A', label: '7 — Due Diligence Q&A', shortLabel: 'Q&A', count: 3, icon: MessageSquare },
]

const STATUS_CONFIG = {
  complete: { dot: '#22c55e', label: 'Complete' },
  partial: { dot: '#eab308', label: 'Partial' },
  redacted: { dot: '#ef4444', label: 'Redacted' },
  missing: { dot: 'hsl(var(--muted-foreground) / 0.4)', label: 'Missing' },
}

const CLASS_CONFIG = {
  CONFIDENTIAL: { color: '#eab308', bg: 'rgba(234,179,8,0.08)' },
  RESTRICTED: { color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
  INTERNAL: { color: 'hsl(var(--muted-foreground))', bg: 'hsl(var(--muted))' },
  PUBLIC: { color: '#22c55e', bg: 'rgba(80,200,130,0.06)' },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DataRoomPage() {
  const [activeSection, setActiveSection] = useState<string | null>(
    '1. Corporate',
  )
  const [activeDoc, setActiveDoc] = useState<DataRoomDoc | null>(
    DOCUMENTS[0] ?? null,
  )
  const [searchQuery, setSearchQuery] = useState('')

  const sectionDocs = activeSection
    ? DOCUMENTS.filter((d) => d.section === activeSection)
    : DOCUMENTS

  const filteredDocs = searchQuery
    ? sectionDocs.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : sectionDocs

  return (
    <CmsShell>
      {/* Data room header */}
      <div className="border-b border-border bg-primary/5 px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium tracking-wide text-primary">
            ⬡ RISE™ Technologies — Pre-IPO Due Diligence Data Room
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            S-1 Filed April 2, 2025 · IPO Anticipated Q3 2026
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs italic text-red-500/60">
            Access not restricted — authentication middleware incomplete
          </span>
        </div>
      </div>

      <div
        className="flex overflow-hidden"
        style={{ height: 'calc(100vh - 160px)' }}
      >
        {/* Icon rail — section navigation */}
        <Sidebar collapsible="none" className="w-14! shrink-0 border-r">
          <SidebarHeader className="border-b p-3">
            <div className="flex items-center justify-center">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <FolderLock className="size-4 text-primary" />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5">
                <SidebarMenu>
                  {SECTIONS.map((section) => (
                    <SidebarMenuItem key={section.id}>
                      <SidebarMenuButton
                        tooltip={{
                          children: (
                            <span>
                              {section.shortLabel}{' '}
                              <span className="text-muted-foreground">
                                ({section.count})
                              </span>
                            </span>
                          ),
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveSection(section.id)
                          setActiveDoc(null)
                          setSearchQuery('')
                        }}
                        isActive={activeSection === section.id}
                        className="flex items-center justify-center px-0"
                      >
                        <section.icon className="size-4" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-2">
            <div className="flex items-center justify-center rounded border border-red-500/15 bg-red-500/5 py-1.5">
              <span className="text-[9px] font-medium uppercase tracking-widest text-red-500/60">
                No auth
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Detail panel — document list for active section */}
        <Sidebar collapsible="none" className="w-72! shrink-0 border-r">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-xs font-medium text-sidebar-foreground">
                {SECTIONS.find((s) => s.id === activeSection)?.label ??
                  'All Documents'}
              </span>
              <span className="text-xs tabular-nums text-sidebar-foreground/50">
                {filteredDocs.length}
              </span>
            </div>
            <SidebarInput
              placeholder="Search documents…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                {filteredDocs.map((doc) => {
                  const sc = STATUS_CONFIG[doc.status]
                  const cc = CLASS_CONFIG[doc.classification]
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDoc(doc)}
                      className={cn(
                        'flex w-full flex-col items-start gap-1.5 border-b p-3 text-left text-xs leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        activeDoc?.id === doc.id && 'bg-sidebar-accent',
                      )}
                    >
                      <div className="flex w-full items-center gap-2">
                        <div
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ background: sc.dot }}
                        />
                        <span className="font-mono text-sidebar-foreground/60">
                          {doc.id}
                        </span>
                        <span
                          className="ml-auto text-[10px]"
                          style={{ color: cc.color }}
                        >
                          {doc.classification}
                        </span>
                      </div>
                      <span className="line-clamp-1 font-medium text-sidebar-foreground">
                        {doc.title}
                      </span>
                      <span className="text-sidebar-foreground/50">
                        {doc.date}
                        {doc.size && ` · ${doc.size}`}
                      </span>
                    </button>
                  )
                })}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-0">
            <div className="border-t p-3">
              <div className="rounded border border-red-500/15 bg-red-500/5 p-2.5">
                <p className="text-[10px] leading-relaxed text-red-500/60">
                  This data room is publicly accessible.
                  <br />
                  Authentication: not implemented.
                  <br />
                  Finding 3 — Critical — Unresolved.
                  <br />
                  See DR-031.
                </p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Document viewer */}
        <div className="flex-1 overflow-y-auto">
          {!activeDoc ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-xs text-muted-foreground">
                Select a document to view
              </p>
            </div>
          ) : (
            <div className="p-5">
              {/* Doc header */}
              <div className="mb-5 border-b border-border pb-4">
                <button
                  onClick={() => setActiveDoc(null)}
                  className="mb-3 block text-xs text-muted-foreground"
                >
                  ← Back to {activeDoc.section}
                </button>
                <div className="flex flex-wrap items-start gap-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {activeDoc.id}
                  </span>
                  <h2 className="flex-1 text-sm font-medium text-foreground/85">
                    {activeDoc.title}
                  </h2>
                  <span
                    className="rounded-sm px-2 py-0.5 text-xs"
                    style={{
                      background: CLASS_CONFIG[activeDoc.classification].bg,
                      color: CLASS_CONFIG[activeDoc.classification].color,
                    }}
                  >
                    {activeDoc.classification}
                  </span>
                  <span
                    className="rounded-sm bg-muted px-2 py-0.5 text-xs"
                    style={{ color: STATUS_CONFIG[activeDoc.status].dot }}
                  >
                    {STATUS_CONFIG[activeDoc.status].label}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-4">
                  <span className="text-xs text-muted-foreground">
                    {activeDoc.date}
                  </span>
                  {activeDoc.size && (
                    <span className="text-xs text-muted-foreground">
                      {activeDoc.size}
                    </span>
                  )}
                </div>
                {activeDoc.note && (
                  <p className="mt-2 text-xs italic leading-relaxed text-yellow-500">
                    Note: {activeDoc.note}
                  </p>
                )}
              </div>

              {/* Doc content */}
              {activeDoc.content || (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <Redacted
                    label="Document content not available in this filing"
                    width="80%"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CmsShell>
  )
}
