/**
 * Honeypot anti-bot system — ported from AlignSD
 *
 * Multiple layers:
 * 1. Hidden text fields (bots auto-fill visible inputs)
 * 2. Hidden checkbox (bots toggle checkboxes)
 * 3. Timing validation (bots submit instantly)
 * 4. CSS-based hiding (resistant to naive bot parsers)
 */
'use client'

import { useRef, useCallback, type ChangeEvent } from 'react'

// ── Field names that look like real fields to bots ───────────────────────────

const HONEYPOT_TEXT_FIELDS = ['website', 'confirmEmail', 'phoneNumber', 'companyName'] as const
const HONEYPOT_CHECKBOX = 'newsletterOptIn' as const

type HoneypotTextField = (typeof HONEYPOT_TEXT_FIELDS)[number]

export interface HoneypotState {
  fields: Record<HoneypotTextField, string>
  checkbox: boolean
  formStartTime: number
}

// ── Client hook ──────────────────────────────────────────────────────────────

const MIN_SUBMIT_TIME_MS = 3_000 // 3 seconds minimum for a human

export function useHoneypot() {
  const stateRef = useRef<HoneypotState>({
    fields: { website: '', confirmEmail: '', phoneNumber: '', companyName: '' },
    checkbox: false,
    formStartTime: Date.now(),
  })

  const handleFieldChange = useCallback((field: HoneypotTextField, value: string) => {
    stateRef.current.fields[field] = value
  }, [])

  const handleCheckboxChange = useCallback((checked: boolean) => {
    stateRef.current.checkbox = checked
  }, [])

  const getHoneypotData = useCallback(() => ({
    ...stateRef.current.fields,
    [HONEYPOT_CHECKBOX]: stateRef.current.checkbox,
    submitTime: stateRef.current.formStartTime,
  }), [])

  const isHoneypotTriggered = useCallback((): boolean => {
    const { fields, checkbox, formStartTime } = stateRef.current
    if (Object.values(fields).some((v) => v.length > 0)) return true
    if (checkbox) return true
    if (Date.now() - formStartTime < MIN_SUBMIT_TIME_MS) return true
    return false
  }, [])

  return { handleFieldChange, handleCheckboxChange, getHoneypotData, isHoneypotTriggered }
}

// ── Hidden form fields component ─────────────────────────────────────────────

export function SpamProtectionFields({ onFieldChange, onCheckboxChange }: {
  onFieldChange: (field: HoneypotTextField, value: string) => void
  onCheckboxChange: (checked: boolean) => void
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
        tabIndex: -1,
        clipPath: 'inset(50%)',
      } as React.CSSProperties}
    >
      {HONEYPOT_TEXT_FIELDS.map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          tabIndex={-1}
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onFieldChange(field, e.target.value)}
        />
      ))}
      <input
        type="checkbox"
        name={HONEYPOT_CHECKBOX}
        tabIndex={-1}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onCheckboxChange(e.target.checked)}
      />
    </div>
  )
}

// ── Server-side validation ───────────────────────────────────────────────────

const MIN_SUBMIT_TIME_SERVER_MS = 2_000 // 2 seconds server-side (more lenient)

export interface HoneypotServerData {
  website?: string
  confirmEmail?: string
  phoneNumber?: string
  companyName?: string
  newsletterOptIn?: boolean
  submitTime?: number
}

export function validateHoneypotServer(data: HoneypotServerData): { triggered: boolean; reason?: string } {
  for (const field of HONEYPOT_TEXT_FIELDS) {
    if (data[field] && data[field].length > 0) {
      return { triggered: true, reason: `honeypot_field:${field}` }
    }
  }

  if (data.newsletterOptIn) {
    return { triggered: true, reason: 'honeypot_checkbox' }
  }

  if (data.submitTime) {
    const elapsed = Date.now() - data.submitTime
    if (elapsed < MIN_SUBMIT_TIME_SERVER_MS) {
      return { triggered: true, reason: `timing:${elapsed}ms` }
    }
  }

  return { triggered: false }
}
