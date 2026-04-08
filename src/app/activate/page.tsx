'use client'

import { Footer } from '@/components/footer'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { useEffect, useRef, useState } from 'react'

const STAGES = [
  {
    number: '01',
    title: 'The Person',
    desc: 'Height, weight, dominant side of bed, sleep position, self-assessed resistance to mornings.',
    duration: '3 min',
    note: null,
    flagged: false,
  },
  {
    number: '02',
    title: 'The Household',
    desc: 'Number of occupants, additional persons, pets, any household members who have not consented to Push Mode.',
    duration: '4 min',
    note: null,
    flagged: false,
  },
  {
    number: '03',
    title: 'The Bedroom',
    desc: 'Room dimensions, furniture placement, ceiling height, floor surface, door width. Photo upload optional but recommended.',
    duration: '8 min',
    note: 'Ceiling height under 84" will affect Push Mode operation.',
    flagged: false,
  },
  {
    number: '04',
    title: 'The Morning Sequence',
    desc: 'Drag-and-drop ordering of your morning stops. Duration estimates for each. The bed will compare these to your actual times.',
    duration: '10 min',
    note: 'Duration estimates are monitored. Persistent underestimation results in automatic adjustment.',
    flagged: false,
  },
  {
    number: '05',
    title: 'Environment Mapping',
    desc: 'Dimensions and layouts of all spaces your morning sequence passes through. Hallway width is critical.',
    duration: '15 min',
    note: 'Staircase navigation is not supported. RISE™ is working on this. See RISE™ Move.',
    flagged: true,
  },
  {
    number: '06',
    title: 'Departure Configuration',
    desc: 'How you leave. Driveway or building. Vehicle type and position. GPS coordinates of home and primary destination.',
    duration: '6 min',
    note: null,
    flagged: false,
  },
  {
    number: '07',
    title: 'The Closet',
    desc: 'Dress code standards by day type. Outfit verification calibration. The item you always forget.',
    duration: '5 min',
    note: 'The bed cannot see your outfit. It infers correctness from time and behavior.',
    flagged: false,
  },
  {
    number: '08',
    title: 'The Kitchen',
    desc: 'Coffee maker type and location. Vessel. Additions requiring the refrigerator. Other kitchen tasks.',
    duration: '4 min',
    note: 'The bed does not carry coffee. This is a known limitation.',
    flagged: false,
  },
  {
    number: '09',
    title: 'Habits & Tendencies',
    desc: 'Sleep schedule, lifestyle factors, night-before habits, self-assessed morning difficulty.',
    duration: '5 min',
    note: 'Disclosed habits affect Push Mode intensity on relevant mornings.',
    flagged: false,
  },
  {
    number: '10',
    title: 'Scheduling',
    desc: 'Weekly Push Mode schedule. Vacation mode. Work from home configuration. Secondary destinations with GPS coordinates.',
    duration: '5 min',
    note: null,
    flagged: false,
  },
  {
    number: '11',
    title: 'Emergency Protocols',
    desc: 'Emergency contact. Medical information. Anomaly response preferences.',
    duration: '4 min',
    note: 'RISE™ recommends completion. This stage is labeled Advanced Configuration.',
    flagged: false,
  },
  {
    number: '12',
    title: 'Review & Activate',
    desc: 'Summary of all configured settings. Eight acknowledgments. The final button.',
    duration: '3 min',
    note: 'Activation cannot be undone.',
    flagged: false,
  },
]

type FormState =
  | 'idle'
  | 'validating'
  | 'invalid'
  | 'refund-warning'
  | 'configurator'
  | 'activated'

const SLEEP_POSITIONS = [
  { id: 'side', label: 'Side', desc: 'Left or right lateral' },
  { id: 'back', label: 'Back', desc: 'Supine position' },
  { id: 'stomach', label: 'Stomach', desc: 'Prone position' },
  { id: 'unknown', label: 'I don\'t know', desc: 'The bed will determine this' },
] as const

const BED_SIDES = [
  { id: 'left', label: 'Left' },
  { id: 'right', label: 'Right' },
  { id: 'center', label: 'Center (solo occupant)' },
] as const

const INTENSITY_LABELS = [
  { value: 0, label: 'Gentle', desc: 'Gradual elevation. Extended transition window.' },
  { value: 33, label: 'Standard', desc: 'Manufacturer-recommended settings.' },
  { value: 66, label: 'Committed', desc: 'Reduced transition window. Direct delivery.' },
  { value: 100, label: 'Non-Negotiable', desc: 'Full Push Mode. No transition period. Immediate vertical delivery.' },
] as const

const DEFAULT_SEQUENCE = [
  { id: 'bedroom', label: 'Bedroom', icon: '◻', duration: '0 min', note: 'Origin point' },
  { id: 'bathroom', label: 'Bathroom', icon: '◻', duration: '8 min', note: 'The bed waits at the door' },
  { id: 'closet', label: 'Closet', icon: '◻', duration: '5 min', note: 'Outfit verification by inference' },
  { id: 'kitchen', label: 'Kitchen', icon: '◻', duration: '4 min', note: 'Coffee not carried' },
  { id: 'front-door', label: 'Front Door', icon: '◻', duration: '1 min', note: 'Departure point' },
]

const ACKNOWLEDGMENTS = [
  'Push Mode cannot be manually interrupted once initiated.',
  'The refund window has closed upon serial number entry.',
  'Environmental incompatibilities discovered during activation are not grounds for refund.',
  'Staircase navigation is not supported. See RISE™ Move.',
  'Duration estimates are monitored and automatically adjusted.',
  'GPS coordinates are shared with the autonomous navigation system.',
  'The bed infers outfit correctness from time and behavior. It cannot see.',
  'Push Mode intensity is calibrated automatically. Manual adjustment is not available.',
]

function BedSilhouette({ angle }: { angle: number }) {
  const mattressY = 60 - angle * 0.4
  const headAngle = -angle * 0.9

  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" aria-hidden="true" className="text-accent/40">
      <rect x="10" y="50" width="100" height="4" rx="1" className="fill-foreground/8" />
      <g style={{ transform: `rotate(${headAngle}deg)`, transformOrigin: '60px 50px' }}>
        <rect x="15" y={mattressY} width="90" height="12" rx="2" className="fill-accent/12 stroke-accent/20" strokeWidth="0.5" />
      </g>
      <circle cx="55" cy={mattressY + 2} r="4" className="fill-foreground/15" />
      <rect x="8" y="54" width="4" height="12" rx="1" className="fill-foreground/10" />
      <rect x="108" y="54" width="4" height="12" rx="1" className="fill-foreground/10" />
    </svg>
  )
}

function IntensityDial({ value, onRelease }: { value: number; onRelease: () => void }) {
  const [dragging, setDragging] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dragging) setLocalValue(value)
  }, [value, dragging])

  const currentLabel = INTENSITY_LABELS.reduce((prev, curr) =>
    Math.abs(curr.value - localValue) < Math.abs(prev.value - localValue) ? curr : prev
  )

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    updateFromPointer(e)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    updateFromPointer(e)
  }

  const handlePointerUp = () => {
    setDragging(false)
    onRelease()
  }

  const updateFromPointer = (e: React.PointerEvent) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    setLocalValue(Math.round(pct))
  }

  return (
    <div className="select-none">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground-secondary">{currentLabel.label}</p>
          <p className="mt-1 text-xs text-foreground-muted">{currentLabel.desc}</p>
        </div>
        <span className="font-mono text-2xl tabular-nums text-accent/60">{localValue}%</span>
      </div>

      <div
        ref={trackRef}
        className="relative h-2 cursor-pointer rounded-full bg-foreground/8"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent/30 transition-[width] duration-75"
          style={{ width: `${localValue}%` }}
        />
        <div
          className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-surface shadow-elevated transition-[left] duration-75"
          style={{ left: `${localValue}%` }}
        />

        {INTENSITY_LABELS.map((mark) => (
          <div
            key={mark.value}
            className="absolute top-full mt-3 -translate-x-1/2"
            style={{ left: `${mark.value}%` }}
          >
            <div className="mx-auto mb-1 h-1.5 w-px bg-foreground/15" />
            <span className="block whitespace-nowrap text-[9px] text-foreground-muted/50">{mark.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SequenceItem({ item, index, total, onMoveUp, onMoveDown }: {
  item: typeof DEFAULT_SEQUENCE[number]
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
}) {
  return (
    <div className="flex items-center gap-4 rounded-sm border border-edge bg-surface-alt p-4">
      <span className="shrink-0 font-mono text-xs text-accent/40">{String(index + 1).padStart(2, '0')}</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground-secondary">{item.label}</p>
        <p className="text-[10px] text-foreground-muted">{item.note}</p>
      </div>
      <span className="shrink-0 font-mono text-[10px] text-foreground-muted/50">{item.duration}</span>
      <div className="flex shrink-0 flex-col gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="flex size-6 cursor-pointer items-center justify-center rounded border border-transparent text-foreground-muted transition-colors duration-150 disabled:cursor-default disabled:opacity-20"
          aria-label="Move up"
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="flex size-6 cursor-pointer items-center justify-center rounded border border-transparent text-foreground-muted transition-colors duration-150 disabled:cursor-default disabled:opacity-20"
          aria-label="Move down"
        >
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  )
}

function ConfiguratorStepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`flex size-8 items-center justify-center rounded-full text-xs font-medium transition-all duration-500 ${
            i < step ? 'bg-accent/15 text-accent' :
            i === step ? 'bg-accent text-white' :
            'bg-foreground/5 text-foreground-muted/40'
          }`}>
            {i < step ? (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true"><path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-8 transition-colors duration-500 ${i < step ? 'bg-accent/30' : 'bg-foreground/8'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ActivatePage() {
  const [serial, setSerial] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [refundAcknowledged, setRefundAcknowledged] = useState(false)

  const [configStep, setConfigStep] = useState(0)
  const [sleepPosition, setSleepPosition] = useState<string | null>(null)
  const [bedSide, setBedSide] = useState<string | null>(null)
  const [resistance, setResistance] = useState(5)
  const [intensityValue, setIntensityValue] = useState(100)
  const [intensitySnapped, setIntensitySnapped] = useState(false)
  const [sequence, setSequence] = useState(DEFAULT_SEQUENCE)
  const [acknowledgments, setAcknowledgments] = useState<boolean[]>(new Array(ACKNOWLEDGMENTS.length).fill(false))
  const configTopRef = useRef<HTMLDivElement>(null)

  const handleSerialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = serial.trim().toUpperCase()
    if (!cleaned.startsWith('RSB-') || cleaned.length < 8) {
      setFormState('invalid')
      return
    }
    setFormState('refund-warning')
  }

  const handleBeginActivation = () => {
    if (!refundAcknowledged) return
    setFormState('configurator')
    setConfigStep(0)
  }

  const scrollToConfig = () => {
    setTimeout(() => configTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleIntensityRelease = () => {
    setTimeout(() => {
      setIntensityValue(100)
      setIntensitySnapped(true)
    }, 600)
  }

  const moveSequenceItem = (fromIndex: number, direction: -1 | 1) => {
    const toIndex = fromIndex + direction
    if (toIndex < 0 || toIndex >= sequence.length) return
    const next = [...sequence]
    const item = next[fromIndex]
    next[fromIndex] = next[toIndex]
    next[toIndex] = item
    setSequence(next)
  }

  const allAcknowledged = acknowledgments.every(Boolean)

  const handleFinalActivation = () => {
    if (!allAcknowledged) return
    setFormState('activated')
    scrollToConfig()
  }

  const handleNextStep = () => {
    setConfigStep((s) => s + 1)
    scrollToConfig()
  }

  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-40 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-accent)_0%,transparent_70%)] opacity-[0.07]" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Device Activation
          </p>
          <h1 className="mb-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-tight tracking-tight text-foreground">
            Activate Your Push.
          </h1>
          <p className="mb-4 max-w-xl text-sm leading-loose text-foreground-muted">
            Before Push Mode can operate, the bed needs to know everything. Your
            spaces, your sequence, your habits, your schedule, your GPS
            coordinates, and your honest assessment of how resistant you are to
            mornings.
          </p>
          <p className="mb-16 max-w-xl text-sm leading-loose text-foreground-muted/60 italic">
            Activation takes 45–90 minutes. RISE™ recommends completing it
            before your first intended Push Mode morning. The bed will operate
            on default settings until then. Most users find the default settings
            inadequate.
          </p>

          {/* Serial number form */}
          <div ref={configTopRef} className="mb-6 rounded-sm border border-edge bg-surface-alt p-8">
            {formState === 'activated' ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-accent/10">
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">
                    <path d="M2 10L8.5 16.5L22 3" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mb-3 font-display text-3xl tracking-tight text-foreground">
                  Push Mode activated.
                </p>
                <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
                  Serial{' '}
                  <span className="font-mono text-accent/70">
                    {serial.trim().toUpperCase()}
                  </span>{' '}
                  — fully configured.
                </p>
                <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
                  Sleep position: {sleepPosition}. Bed side: {bedSide}. Morning resistance: {resistance}/10.
                </p>
                <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
                  Push Mode intensity: Non-Negotiable (100%).
                </p>
                <p className="mb-8 text-xs leading-relaxed text-foreground-muted/50 italic">
                  The bed is now calibrating. First Push Mode morning will use your configured sequence.
                  Persistent deviations from estimated durations will result in automatic adjustment.
                </p>
                <div className="mx-auto mb-6 h-px w-32 bg-edge" />
                <p className="text-xs text-foreground-muted">
                  Have a productive day.
                </p>
              </div>
            ) : formState === 'configurator' ? (
              <div>
                <ConfiguratorStepIndicator step={configStep} total={4} />

                {configStep === 0 && (
                  <div>
                    <p className="mb-1 text-xs tracking-[0.16em] text-foreground-muted uppercase">Stage 01</p>
                    <h3 className="mb-6 font-display text-2xl tracking-tight text-foreground">Your Profile</h3>

                    <div className="mb-8">
                      <p className="mb-4 text-xs font-medium text-foreground-secondary">Sleep Position</p>
                      <div className="grid grid-cols-2 gap-3">
                        {SLEEP_POSITIONS.map((pos) => (
                          <button
                            key={pos.id}
                            onClick={() => setSleepPosition(pos.id)}
                            className={`cursor-pointer rounded-sm border p-4 text-left transition-all duration-200 ${
                              sleepPosition === pos.id
                                ? 'border-accent/40 bg-accent/5'
                                : 'border-edge bg-surface'
                            }`}
                          >
                            <p className={`text-sm font-medium ${sleepPosition === pos.id ? 'text-foreground' : 'text-foreground-secondary'}`}>{pos.label}</p>
                            <p className="mt-0.5 text-[10px] text-foreground-muted">{pos.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <p className="mb-4 text-xs font-medium text-foreground-secondary">Dominant Side of Bed</p>
                      <div className="flex gap-3">
                        {BED_SIDES.map((side) => (
                          <button
                            key={side.id}
                            onClick={() => setBedSide(side.id)}
                            className={`flex-1 cursor-pointer rounded-sm border px-4 py-3 text-center text-sm transition-all duration-200 ${
                              bedSide === side.id
                                ? 'border-accent/40 bg-accent/5 font-medium text-foreground'
                                : 'border-edge bg-surface text-foreground-secondary'
                            }`}
                          >
                            {side.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs font-medium text-foreground-secondary">Morning Resistance</p>
                        <span className="font-mono text-lg tabular-nums text-accent/50">{resistance}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={resistance}
                        onChange={(e) => setResistance(Number(e.target.value))}
                        className="w-full accent-accent"
                      />
                      <div className="mt-2 flex justify-between text-[9px] text-foreground-muted/40">
                        <span>1 — Mild reluctance</span>
                        <span>10 — Hostile non-compliance</span>
                      </div>
                      {resistance >= 8 && (
                        <p className="mt-3 text-[10px] text-foreground-muted/60 italic">
                          Self-assessed resistance of {resistance}/10 has been noted. Push Mode intensity will be calibrated accordingly.
                        </p>
                      )}
                    </div>

                    <div className="mb-4 flex items-center justify-center">
                      <BedSilhouette angle={resistance * 9} />
                    </div>

                    <button
                      onClick={handleNextStep}
                      disabled={!sleepPosition || !bedSide}
                      className="w-full cursor-pointer rounded-sm bg-accent px-6 py-3 text-xs font-medium tracking-[0.14em] text-white uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Continue to Calibration →
                    </button>
                  </div>
                )}

                {configStep === 1 && (
                  <div>
                    <p className="mb-1 text-xs tracking-[0.16em] text-foreground-muted uppercase">Stage 02</p>
                    <h3 className="mb-2 font-display text-2xl tracking-tight text-foreground">Push Mode Calibration</h3>
                    <p className="mb-10 text-xs leading-relaxed text-foreground-muted">
                      Adjust the intensity to match your morning requirements. The system will finalize calibration based on your profile data.
                    </p>

                    <IntensityDial value={intensityValue} onRelease={handleIntensityRelease} />

                    {intensitySnapped && (
                      <div className="mt-12 rounded-sm border border-edge bg-foreground/3 p-4">
                        <p className="text-xs leading-relaxed text-foreground-muted">
                          Push Mode intensity is calibrated automatically based on your profile, sleep position, and self-assessed morning resistance ({resistance}/10).
                          Manual adjustment is not available at this time.
                        </p>
                        <p className="mt-2 text-[10px] text-foreground-muted/40 italic">
                          Your preference has been noted.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleNextStep}
                      className="mt-8 w-full cursor-pointer rounded-sm bg-accent px-6 py-3 text-xs font-medium tracking-[0.14em] text-white uppercase transition-all duration-300"
                    >
                      Continue to Morning Sequence →
                    </button>
                  </div>
                )}

                {configStep === 2 && (
                  <div>
                    <p className="mb-1 text-xs tracking-[0.16em] text-foreground-muted uppercase">Stage 03</p>
                    <h3 className="mb-2 font-display text-2xl tracking-tight text-foreground">Morning Sequence</h3>
                    <p className="mb-8 text-xs leading-relaxed text-foreground-muted">
                      Arrange your morning stops in preferred order. The bed will navigate these sequentially.
                    </p>

                    <div className="flex flex-col gap-2">
                      {sequence.map((item, i) => (
                        <SequenceItem
                          key={item.id}
                          item={item}
                          index={i}
                          total={sequence.length}
                          onMoveUp={() => moveSequenceItem(i, -1)}
                          onMoveDown={() => moveSequenceItem(i, 1)}
                        />
                      ))}
                    </div>

                    <p className="mt-4 text-[10px] leading-relaxed text-foreground-muted/40 italic">
                      The bed will optimize this sequence based on your floor plan and environment mapping data.
                      Your preferred order has been noted.
                    </p>

                    <button
                      onClick={handleNextStep}
                      className="mt-8 w-full cursor-pointer rounded-sm bg-accent px-6 py-3 text-xs font-medium tracking-[0.14em] text-white uppercase transition-all duration-300"
                    >
                      Continue to Review →
                    </button>
                  </div>
                )}

                {configStep === 3 && (
                  <div>
                    <p className="mb-1 text-xs tracking-[0.16em] text-foreground-muted uppercase">Stage 04</p>
                    <h3 className="mb-2 font-display text-2xl tracking-tight text-foreground">Review & Activate</h3>
                    <p className="mb-8 text-xs leading-relaxed text-foreground-muted">
                      Acknowledge each statement below. All eight are required. Activation cannot be undone.
                    </p>

                    <div className="mb-8 rounded-sm border border-edge bg-foreground/2 p-5">
                      <p className="mb-1 text-xs font-medium text-foreground-secondary">Configuration Summary</p>
                      <div className="mt-3 flex flex-col gap-1.5 text-xs text-foreground-muted">
                        <p>Serial: <span className="font-mono text-foreground-secondary">{serial.trim().toUpperCase()}</span></p>
                        <p>Sleep position: <span className="text-foreground-secondary">{sleepPosition}</span> · Bed side: <span className="text-foreground-secondary">{bedSide}</span></p>
                        <p>Morning resistance: <span className="text-foreground-secondary">{resistance}/10</span></p>
                        <p>Push Mode intensity: <span className="text-foreground-secondary">Non-Negotiable (100%)</span></p>
                        <p>Morning sequence: <span className="text-foreground-secondary">{sequence.map((s) => s.label).join(' → ')}</span></p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {ACKNOWLEDGMENTS.map((ack, i) => (
                        <label key={i} className="flex cursor-pointer items-start gap-3 rounded-sm border border-edge bg-surface p-4 transition-colors duration-150">
                          <input
                            type="checkbox"
                            checked={acknowledgments[i]}
                            onChange={(e) => {
                              const next = [...acknowledgments]
                              next[i] = e.target.checked
                              setAcknowledgments(next)
                            }}
                            className="mt-0.5 shrink-0 accent-accent"
                          />
                          <span className="text-xs leading-relaxed text-foreground-muted">{ack}</span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={handleFinalActivation}
                      disabled={!allAcknowledged}
                      className="mt-8 w-full cursor-pointer rounded-sm bg-accent px-6 py-4 text-xs font-medium tracking-[0.16em] text-white uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Activate Push Mode
                    </button>
                    <p className="mt-3 text-center text-[10px] text-foreground-muted/30">
                      This action cannot be undone.{' '}
                      <Link href="/legal/push-mode-eula" className="text-foreground-muted/50 underline">Push Mode EULA</Link>{' · '}
                      <Link href="/legal/terms#s7" className="text-foreground-muted/50 underline">Section 7</Link>
                    </p>
                  </div>
                )}
              </div>
            ) : formState === 'refund-warning' ? (
              <div>
                <p className="mb-1 text-xs font-medium text-foreground-secondary">
                  Before you begin.
                </p>
                <p className="mb-6 text-xs leading-relaxed text-foreground-muted">
                  Serial{' '}
                  <span className="font-mono text-foreground-secondary">
                    {serial.trim().toUpperCase()}
                  </span>{' '}
                  located. Your device is ready for activation.
                </p>

                <div className="mb-6 rounded-sm border border-edge bg-foreground/3 p-5">
                  <p className="mb-3 text-xs font-medium text-foreground-secondary">
                    Refund Policy — Please Read
                  </p>
                  <p className="mb-3 text-xs leading-relaxed text-foreground-muted">
                    Submitting your serial number initiates activation. Under{' '}
                    <Link
                      href="/legal/terms#s7"
                      className="text-accent/60 underline"
                    >
                      Section 7 of the Terms of Service
                    </Link>
                    , RISE™ does not offer refunds after activation has been
                    initiated.
                  </p>
                  <p className="mb-3 text-xs leading-relaxed text-foreground-muted">
                    If you discover during activation that your living
                    environment is incompatible with Push Mode — including
                    staircase navigation requirements, insufficient ceiling
                    height, or inadequate hallway width — this incompatibility
                    was present at time of purchase and does not constitute
                    grounds for refund.
                  </p>
                  <p className="text-xs leading-relaxed text-foreground-muted/50 italic">
                    Product specifications, including all known Push Mode
                    environmental limitations, have been available at
                    riseawake.com/products/push since launch.
                  </p>
                </div>

                <label className="mb-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={refundAcknowledged}
                    onChange={(e) => setRefundAcknowledged(e.target.checked)}
                    className="mt-0.5 shrink-0 accent-accent"
                  />
                  <span className="text-xs leading-relaxed text-foreground-muted">
                    I understand that initiating activation closes the refund
                    window, and that any environmental incompatibilities
                    discovered during the activation process are not grounds for
                    refund.
                  </span>
                </label>

                <div className="flex gap-3">
                  <button
                    onClick={handleBeginActivation}
                    disabled={!refundAcknowledged}
                    className="cursor-pointer rounded-sm bg-accent px-6 py-3 text-xs font-medium tracking-[0.14em] text-white uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:bg-accent/30 disabled:text-white/30"
                  >
                    Begin Activation
                  </button>
                  <button
                    onClick={() => {
                      setFormState('idle')
                      setRefundAcknowledged(false)
                    }}
                    className="cursor-pointer rounded-sm border border-edge bg-transparent px-6 py-3 text-xs font-medium tracking-[0.14em] text-foreground-muted uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSerialSubmit}>
                <p className="mb-2 text-xs font-medium text-foreground-secondary">
                  Enter your device serial number
                </p>
                <p className="mb-5 text-xs leading-relaxed text-foreground-muted">
                  Located on the label affixed to the underside of the base
                  frame. Readable by lying on the floor beneath the bed with a
                  light source and reading upward. Format: RSB-XXXXXXXXXXXXXXXX.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={serial}
                    onChange={(e) => {
                      setSerial(e.target.value)
                      setFormState('idle')
                    }}
                    placeholder="RSB-"
                    className={`flex-1 rounded-sm border px-4 py-3 font-mono text-sm tracking-wider text-foreground transition-all duration-200 outline-none ${
                      formState === 'invalid'
                        ? 'border-rise-error/40 bg-foreground/4'
                        : 'border-edge bg-foreground/4'
                    } focus:border-accent/40`}
                    spellCheck={false}
                    autoCapitalize="characters"
                  />
                  <button
                    type="submit"
                    className="rounded-sm border-none bg-accent px-6 py-3 text-xs font-medium tracking-[0.14em] whitespace-nowrap text-white uppercase transition-all duration-300"
                  >
                    Locate Device
                  </button>
                </div>
                {formState === 'invalid' && (
                  <p className="mt-3 text-xs text-rise-error/70">
                    Serial number not recognized. Verify the format
                    (RSB-XXXXXXXXXXXXXXXX) and try again. If the label is
                    unreadable, contact{' '}
                    <Link href="/help" className="underline">
                      support
                    </Link>
                    .
                  </p>
                )}
                <p className="mt-4 text-[10px] leading-relaxed text-foreground-muted/40">
                  Submitting your serial number initiates activation and closes
                  the refund window.{' '}
                  <Link
                    href="/legal/terms#s7"
                    className="text-foreground-muted/60 underline"
                  >
                    Section 7, Terms of Service.
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* THE 12 STAGES */}
      <section className="border-t border-edge-subtle px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <p className="mb-4 text-xs tracking-[0.2em] text-foreground-muted uppercase">
              What to expect
            </p>
            <h2 className="mb-4 font-display text-3xl tracking-tight text-foreground md:text-4xl">
              12 stages. 45–90 minutes.
              <br />
              <span className="text-foreground-muted">
                Everything the bed needs to know.
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-foreground-muted">
              Each stage configures a different aspect of your morning. Progress
              is saved between stages. You may pause and return. The bed will be
              here.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {STAGES.map((stage) => (
              <div
                key={stage.number}
                className={`rounded-sm border p-6 ${
                  stage.flagged
                    ? 'border-edge-subtle bg-foreground/1.5'
                    : 'border-edge bg-surface-alt'
                }`}
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`shrink-0 font-display text-[1.8rem] leading-none ${
                      stage.flagged
                        ? 'text-foreground-muted/30'
                        : 'text-accent/25'
                    }`}
                    style={{ minWidth: '48px' }}
                  >
                    {stage.number}
                  </span>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                      <h3
                        className={`text-sm font-medium ${
                          stage.flagged
                            ? 'text-foreground-muted'
                            : 'text-foreground-secondary'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <span className="shrink-0 text-[10px] text-foreground-muted/50">
                        ~{stage.duration}
                      </span>
                    </div>
                    <p className="mb-2 text-xs leading-relaxed text-foreground-muted">
                      {stage.desc}
                    </p>
                    {stage.note && (
                      <p className="mt-2 text-[10px] leading-relaxed text-foreground-muted/50 italic">
                        {stage.flagged ? (
                          <>
                            {stage.note.replace(' See RISE™ Move.', '')}{' '}
                            <Link
                              href="/move"
                              className="text-accent/50 underline"
                            >
                              See RISE™ Move.
                            </Link>{' '}
                            The refund window closes at Stage 01.{' '}
                            <Link
                              href="/legal/terms#s7"
                              className="text-foreground-muted/60 underline"
                            >
                              Section 7.
                            </Link>
                          </>
                        ) : (
                          stage.note
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THE BED COLLECTS */}
      <section className="border-t border-edge-subtle bg-surface-alt px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            What activation collects
          </p>
          <h2 className="mb-10 font-display text-3xl tracking-tight text-foreground-secondary">
            Everything it needs.
            <br />
            <span className="text-foreground-muted">
              Nothing it doesn&rsquo;t.
            </span>
          </h2>

          <div className="grid gap-px bg-edge-subtle md:grid-cols-2">
            {[
              {
                category: 'Physical Profile',
                items: [
                  'Height and weight',
                  'Sleep position and dominant side',
                  'Mobility considerations',
                  'Self-assessed morning resistance (1–10)',
                ],
              },
              {
                category: 'Household',
                items: [
                  'All occupants (height, weight, schedule)',
                  'Pets (species, size, morning location)',
                  'Consent status of secondary occupants',
                ],
              },
              {
                category: 'Environment',
                items: [
                  'Room dimensions for all stops',
                  'Furniture placement maps',
                  'Ceiling height and door widths',
                  'Floor surface types',
                  'Bedroom photos (4 directions)',
                  'Staircase disclosure',
                ],
              },
              {
                category: 'Morning Sequence',
                items: [
                  'All stops in order',
                  'Duration estimates per stop',
                  'Dress code standards by day type',
                  'The item you always forget',
                ],
              },
              {
                category: 'Location',
                items: [
                  'GPS coordinates of home',
                  'GPS coordinates of work',
                  'Up to 5 secondary destinations',
                  'Departure point configuration',
                ],
              },
              {
                category: 'Schedule & Habits',
                items: [
                  'Target wake time',
                  'Weekly Push Mode schedule',
                  'Night-before lifestyle factors',
                  'Vacation and WFH modes',
                ],
              },
              {
                category: 'Emergency',
                items: [
                  'Emergency contact name and number',
                  'Medical information (optional)',
                  'Anomaly response preferences',
                ],
              },
              {
                category: 'Acknowledgments',
                items: [
                  'Refund policy (Section 7)',
                  'Environmental compatibility',
                  'Staircase limitation',
                  'Push Mode non-interruptibility (×8)',
                ],
              },
            ].map((group) => (
              <div key={group.category} className="bg-surface-alt p-6">
                <p className="mb-3 text-xs font-medium text-foreground-secondary">
                  {group.category}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-foreground-muted"
                    >
                      <span className="mt-px shrink-0 text-accent/40">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-foreground-muted/40">
            All activation data is retained and used in accordance with the{' '}
            <Link
              href="/legal/privacy"
              className="text-foreground-muted/60 underline"
            >
              Privacy Policy
            </Link>
            ,{' '}
            <Link
              href="/legal/sleep-data-policy"
              className="text-foreground-muted/60 underline"
            >
              Sleep & Environmental Data Policy
            </Link>
            , and{' '}
            <Link
              href="/legal/push-mode-eula"
              className="text-foreground-muted/60 underline"
            >
              Push Mode EULA
            </Link>
            . Room photos are retained indefinitely. GPS coordinates are shared
            with the autonomous navigation system and retained for the solo
            return commute. Emergency contact information is stored securely and
            accessed at RISE™&rsquo;s discretion.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section className="border-t border-edge-subtle px-6 py-32 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-8 text-xs tracking-[0.2em] text-foreground-muted uppercase">
            Ready?
          </p>
          <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-foreground">
            The bed is ready
            <br />
            <span className="text-foreground-muted">when you are.</span>
          </h2>
          <p className="mb-12 text-sm leading-relaxed text-foreground-muted">
            Enter your serial number above to begin. Activation takes 45–90
            minutes. Your progress is saved. You may pause between stages. The
            bed will wait.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-block glow-btn cursor-pointer rounded-sm border-none bg-accent px-10 py-4 text-xs font-medium tracking-[0.16em] text-white uppercase"
          >
            Begin Activation →
          </button>
          <p className="mt-6 text-[10px] leading-relaxed text-foreground-muted/30">
            Entering your serial number closes the refund window.{' '}
            <Link
              href="/legal/terms#s7"
              className="text-foreground-muted/50 underline"
            >
              Section 7, Terms of Service.
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
