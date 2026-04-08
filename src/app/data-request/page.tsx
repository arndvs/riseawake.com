import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'

const STEPS = [
  {
    number: '01',
    title: 'Determine Your Request Type',
    summary:
      'Identify which of five request types applies to you before initiating anything.',
    detail: `Before initiating a data request, determine which type applies:

Type A — Active Account Holder: Registered RISE™ account, device in active use
Type B — Inactive Account Holder: Registered account, device no longer in use or transferred
Type C — Former Account Holder: Account closed, device returned or resold
Type D — Unregistered User: Used a device registered to another account
Type E — Incidental Data Subject: Present in a RISE™-enabled environment without being a registered user

Type D and E requests require supplementary Form DSR-SUP-01, which requires a signed statement from the primary account holder. If the primary account holder is unwilling to provide this, a notarized statutory declaration with corroborating evidence of presence (visitor logs, key card records) is accepted.

Type E applicants: RISE™ cannot confirm whether you appear in occupancy data without first receiving and processing a complete request. There is no way to determine whether a Type E request is necessary before submitting one. RISE™ recommends erring on the side of submission.`,
    fee: null,
  },
  {
    number: '02',
    title: 'Obtain Form DSR-01',
    summary:
      'The Data Subject Request Form. Not available for download. Must be mailed to you.',
    detail: `Form DSR-01 is available by:
— Written request to the RISE™ Data Processing Unit (allow 15–20 business days for postal delivery)
— Calling the RISE™ Data Request Hotline and requesting a mailed form (Monday–Friday, 11:00am–11:30am Pacific Time — expected hold time 40–70 minutes — no callback option)
— In person at RISE™ headquarters during Data Request Office Hours (third Tuesday of each quarter, 2:00–2:45pm Pacific Time, by appointment via hotline)

DSR-01 is not available for download. It is not available by email. It is not available digitally. Photocopies are not accepted.

DSR-01 must be completed in black or dark blue ballpoint pen. Felt-tip, rollerball, gel ink, and pencil are not accepted. Corrections: single strikethrough, initialed, correct information written adjacent. Correction fluid invalidates the form.`,
    fee: null,
  },
  {
    number: '03',
    title: 'Complete Form DSR-01',
    summary:
      '34 pages. All fields mandatory. Between 100–200 words written by hand.',
    detail: `DSR-01 requires the following. All fields are mandatory. Partial submissions are rejected in full.

ACCOUNT INFORMATION
— Full legal name as it appears on the RISE™ account
— RISE™ account email address
— RISE™ account number (format RS-XXXXXXXX — located in your original account confirmation email)

DEVICE INFORMATION
— Full model name (located on the label affixed to the underside of the base frame, readable by lying on the floor beneath the bed with a light source and reading upward — the label is approximately 2 inches by 1 inch)
— Device serial number (adjacent to the model label — 16-character alphanumeric string beginning "RSB-" — transcription errors invalidate the form)
— Firmware version at time of most recent Push Mode activation

PURCHASE VERIFICATION
— Exact date of original purchase (day, month, and year — month and year alone are insufficient)
— Full name of the purchasing party as it appeared on the payment method
— Last four digits of the payment card used for the original purchase
— Card network of the payment card (Visa, Mastercard, American Express, Discover — as it was at time of purchase, not current)
— Billing postal code at time of purchase (your postal code at time of purchase, not your current postal code)
— Order confirmation number (format ORD-XXXXXXXXXX, from your original purchase confirmation email)
— If purchased through a third-party retailer: retailer name, retailer order number, and retailer invoice number (these are three different numbers)

WRITTEN STATEMENT
A handwritten statement of between 100–200 words explaining the reason for the request, referencing one of the 47 approved reasons in Schedule 3 of DSR-01. In the same black or dark blue ballpoint pen. Typed inserts not accepted.

Note: Reason 23 is "Personal Curiosity." It is accepted. It is subject to extended processing (+45 business days) and the Curiosity Surcharge (+$25).`,
    fee: null,
  },
  {
    number: '04',
    title: 'Pay the Processing Fee',
    summary:
      'Non-refundable. By certified check or money order only. No credit cards.',
    detail: `Processing fees by request type:

Type A (Active Account):      $35
Type B (Inactive Account):    $50
Type C (Former Account):      $75
Type D (Unregistered User):   $100
Type E (Incidental Subject):  $150
Reason 23 Curiosity Surcharge: +$25
Audio Data (if requested):    +$200
Expedited Processing:         +$150

Payment accepted by certified check or money order only, payable to "RISE™ Technologies, Inc. — Data Processing Unit." Personal checks are not accepted. Credit card payment is not accepted for data requests.

RISE™ acknowledges the irony of requiring credit card details for identity verification (Step 03) while not accepting credit card payment. These are separate matters.

The processing fee is non-refundable under all circumstances, including rejection of the request, RISE™ determining the data does not exist, or the user deciding they no longer want the data after submission.`,
    fee: 'From $35',
  },
  {
    number: '05',
    title: 'Assemble and Submit',
    summary:
      'Certified mail, with return receipt. Numbered dividers. Self-addressed stamped envelope.',
    detail: `The complete package must contain, in order, separated by numbered dividers:

1. Completed DSR-01 (original only — no photocopies)
2. Certified copy of government-issued photo ID
3. Proof of address dated within 30 days (utility bill, bank statement, or official government correspondence — printed, not digital; if you have paperless billing, contact your provider to request a printed statement)
4. Proof of purchase (original receipt or original confirmation email printed — screenshots not accepted; if email deleted, request duplicate receipt separately — 45 business days, separate process)
5. Certified check or money order for applicable fee
6. Self-addressed stamped envelope for return correspondence (if insufficient postage, acknowledgment will not be sent)
7. DSR-SUP-01 and supporting documentation (Type D and E only)

Submit by certified mail with return receipt requested. Retain the tracking number.

Submit to:
RISE™ Technologies, Inc.
Data Subject Request Processing Unit
Attn: DSR Intake — Legal & Compliance
[Current mailing address: call the Data Request Hotline]
[Address subject to change without notice — confirm before mailing]

If the package is lost in transit, the process restarts from Step 1. The processing fee is not refunded. RISE™ recommends photographing each page before mailing.`,
    fee: null,
  },
  {
    number: '06',
    title: 'Receive Acknowledgment',
    summary:
      'Within 20–30 business days. By standard post. Includes your DSR Reference Number.',
    detail: `Within 20–30 business days of receiving the package, RISE™ will send an acknowledgment letter by standard post. The acknowledgment confirms receipt and provides a DSR Reference Number. Retain this number — it is required for all future correspondence.

If no acknowledgment is received within 45 business days of mailing, call the Data Request Hotline (Monday–Friday, 11:00am–11:30am Pacific Time) to inquire. To inquire, provide your full legal name, RISE™ account number, certified mail tracking number, exact date mailed, and exact total weight of the package as declared to the postal service.

If the package is found incomplete upon review, RISE™ will mail a rejection letter specifying the deficiency. A new complete package must be submitted from Step 1. The processing fee from the rejected submission is not credited.`,
    fee: null,
  },
  {
    number: '07',
    title: 'Complete Identity Verification Call',
    summary:
      'Scheduled by letter. Three time slots. One unregistered number. Cannot be rescheduled by phone.',
    detail: `Following completeness review, RISE™ will send a scheduling letter offering three available time slots for your identity verification call. Select one slot by returning the letter within 10 business days. If no response: three slots forfeited, new letter sent (+15–20 business days).

The verification call will come from an unregistered number. You will be asked to verbally confirm:
— Your DSR Reference Number
— Last four digits of the payment card used for original purchase
— Billing postal code at time of purchase
— Exact date of first Push Mode activation (day, month, year)
— Two of: retailer name, firmware version at submission, total amount paid including tax and shipping

The call is recorded and retained indefinitely.

One failed verification attempt is permitted. Second failure voids the request. Process restarts from Step 1. Processing fee not refunded.`,
    fee: null,
  },
  {
    number: '08',
    title: 'Wait for Processing',
    summary:
      '90 business days. May be paused for additional information, active disputes, or RISE™ company holidays.',
    detail: `Standard processing: 90 business days from verification call date.
Expedited processing: 45 business days (+$150, by certified check, must arrive before processing begins).

Processing may pause if:
— Additional information is required (15 business days to respond — no response voids request, fee not refunded)
— Any dispute with RISE™ is initiated during processing (resumes 30 days after resolution)
— RISE™ company holidays (full schedule available in Appendix G — forthcoming)

During processing, RISE™ compiles the RISE™ Standard Data Package (RSDP) in .rsm format. The RSDP includes data RISE™ is required by applicable law to provide. It does not include: audio recordings (separate Audio Data Request Process — 18–24 months, $200 additional fee), relationship status inference history (under regulatory review), derived and inferred data (belongs to RISE™), or data shared with third parties (available from those parties directly — list of parties available within 180 days of written request for the list).`,
    fee: null,
  },
  {
    number: '09',
    title: 'Receive Your Data',
    summary:
      'USB drive by standard post. Data in .rsm format. Opening requires DataKit SDK.',
    detail: `Upon processing completion, RISE™ mails the RSDP on a USB-A flash drive by standard post.

The USB drive contains your data in .rsm format (RISE™ Standard Metric — proprietary).

Opening .rsm files requires RISE™ DataKit SDK:
— Compatible with select operating systems (not all operating systems are supported; not all versions of supported operating systems are supported)
— Available at riseawake.com/sdk
— Waitlist currently: 4,891 developers
— Purchase price: $299–$2,400 depending on tier
— License key delivered 5–7 business days after purchase

The RSDP does not include audio recordings. Audio requires the Audio Data Request Process: a separate process, estimated 18–24 months, $200 additional fee, requires notarized attorney letter, and audio is provided in .rsma format requiring DataKit Pro (minimum $899).`,
    fee: null,
  },
  {
    number: '10',
    title: 'Return Delivery Confirmation Card',
    summary:
      'Within 21 days. By post. Failure voids the data package — remote wipe initiated.',
    detail: `The USB drive package includes a prepaid Delivery Confirmation Card. Sign, date, and return within 21 days of the postal tracking system's recorded delivery date.

Failure to return the Confirmation Card within 21 days voids the data package. The data on the USB drive is remotely wiped.

A new request may be submitted from Step 1. The processing fee for the new submission is 50% of the standard fee — RISE™'s acknowledgment that you have already completed the process once.

RISE™ respectfully notes that if you have reached Step 10 and are considering not returning the Confirmation Card, this would be an unusual conclusion to a 6–18 month process. RISE™ recommends returning the card.`,
    fee: null,
  },
]

const STATS = [
  { label: 'Estimated Total Time', value: '6–18 months' },
  { label: 'Steps', value: '10' },
  { label: 'Minimum Fee', value: '$35' },
  { label: 'Data Format', value: '.rsm (proprietary)' },
  { label: 'SDK Required to Open', value: 'Yes ($299–$2,400)' },
]

export default function DataRequestPage() {
  return (
    <main className="bg-page">
      <Navbar />
      <section className="px-6 pt-40 pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Your Rights
          </p>
          <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight tracking-tight text-foreground">
            Data Subject
            <br />
            Request Process
          </h1>
          <p className="mb-4 max-w-xl text-sm leading-8 text-foreground-muted">
            RISE™ respects your right to access your personal data. We have
            designed a thorough process to ensure your request is handled with
            the care it deserves.
          </p>
          <p className="mb-4 text-xs leading-relaxed text-foreground-muted/60">
            Thoroughness protects you. It also protects us. We recognize these
            interests are not always aligned.
          </p>

          {/* Timeline banner */}
          <div className="mb-16 rounded-sm border border-accent/12 bg-accent/6 p-5">
            <div className="flex flex-wrap gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="mb-1 text-xs text-foreground-muted">
                    {stat.label}
                  </p>
                  <p className="text-sm font-medium text-foreground-secondary">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual step tracker */}
          <div className="mb-12 flex items-center gap-1 overflow-x-auto pb-2">
            {STEPS.map((step, i) => (
              <div key={step.number} className="flex items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/8 text-[10px] font-medium text-accent/70">
                  {step.number}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="h-px w-4 bg-edge-subtle md:w-8" />
                )}
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-edge bg-surface p-7"
              >
                <div className="flex items-start gap-5">
                  <span className="shrink-0 font-display text-[2rem] leading-none text-accent/25">
                    {step.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-sm font-medium text-foreground-secondary">
                        {step.title}
                      </h3>
                      {step.fee && (
                        <span className="shrink-0 rounded-sm border border-accent/15 bg-accent/10 px-2 py-1 text-[10px] text-accent/80">
                          {step.fee}
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-xs text-foreground-secondary italic">
                      {step.summary}
                    </p>
                    <div className="text-xs leading-8 whitespace-pre-line text-foreground-muted">
                      {step.detail}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing note */}
          <div className="mt-12 rounded-xl border border-edge-subtle bg-foreground/2 p-6">
            <p className="mb-4 font-display text-sm text-foreground-secondary">
              A final note.
            </p>
            <p className="mb-3 text-xs leading-8 text-foreground-muted">
              RISE™ has designed this process to be thorough. Thoroughness
              protects you. It also protects us. We recognize these interests
              are not always aligned. We have resolved that tension in the way
              we resolve most tensions: by proceeding.
            </p>
            <p className="mb-3 text-xs leading-8 text-foreground-muted/60">
              If at any point during this process you feel that requesting your
              data is more effort than it is worth, we understand. Many users
              reach this conclusion. The data will be here when you are ready.
              It will be in .rsm format.
            </p>
            <p className="text-xs text-foreground-muted/50 italic">
              Have a productive day.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-xs text-foreground-muted/60">
              Questions about this process? See our{' '}
              <Link href="/help#faq" className="text-accent/50 underline">
                FAQ
              </Link>{' '}
              or review the{' '}
              <Link href="/legal/privacy" className="text-accent/50 underline">
                Privacy Policy Sections 24–27
              </Link>
              .
            </p>
            <p className="text-xs text-foreground-muted/40">
              Data Request Hotline: Monday–Friday, 11:00am–11:30am Pacific Time.
              Expected hold time: 40–70 minutes.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
