'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { clsx } from 'clsx'
import { useHoneypot, SpamProtectionFields } from '@/lib/honeypot'

// ─── Schema ─────────────────────────────────────────────────────────────────

const referralSchema = z.object({
  senderName: z.string().min(1, 'Required'),
  senderEmail: z.string().min(1, 'Required').email('Invalid email'),
  friendName: z.string().min(1, 'Required'),
  friendEmail: z.string().min(1, 'Required').email('Invalid email'),
}).refine((data) => data.senderEmail !== data.friendEmail, {
  message: 'You cannot refer yourself.',
  path: ['friendEmail'],
})

type ReferralFormData = z.infer<typeof referralSchema>

// ─── Styles ─────────────────────────────────────────────────────────────────

const inputClass = clsx(
  'w-full rounded border border-hairline bg-surface-2 px-3.5 py-2.5',
  'text-sm text-foreground placeholder:text-muted/70',
  'outline-none transition-colors',
  'focus:border-accent-deep focus:ring-1 focus:ring-accent-deep/20',
)

const labelClass = 'block mb-1.5 text-[11px] tracking-wide text-foreground-soft uppercase'

// ─── Component ──────────────────────────────────────────────────────────────

export function ReferAFriend() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const { handleFieldChange, handleCheckboxChange, getHoneypotData, isHoneypotTriggered } = useHoneypot()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
  })

  async function onSubmit(data: ReferralFormData) {
    setStatus('submitting')
    setErrorMessage('')

    // Client-side honeypot check — silent "success"
    if (isHoneypotTriggered()) {
      setStatus('success')
      return
    }

    try {
      const res = await fetch('/api/refer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          ...getHoneypotData(),
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setErrorMessage(json.error || 'Something went wrong.')
        setStatus('error')
        return
      }

      setStatus('success')
      reset()
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full border border-hairline bg-rise-rise/10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10.5L8 14.5L16 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-deep" />
          </svg>
        </div>
        <p className="mb-2 text-lg font-medium text-foreground">
          Referral sent.
        </p>
        <p className="text-sm text-foreground-soft">
          They&apos;ll receive a single email. We don&apos;t follow up.
          The rest is between them and their alarm clock.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-xs font-medium tracking-widest text-accent-deep uppercase transition-colors hover:text-rise-horizon"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* ── Your info ─────────────────────────────────────── */}
      <div>
        <p className="mb-4 text-[10px] font-medium tracking-[0.2em] text-muted uppercase">
          Your info
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="refer-senderName" className={labelClass}>
              Your name
            </label>
            <input
              id="refer-senderName"
              type="text"
              placeholder="Your name"
              className={inputClass}
              aria-invalid={!!errors.senderName}
              aria-describedby={errors.senderName ? 'refer-senderName-error' : undefined}
              {...register('senderName')}
            />
            {errors.senderName && (
              <p id="refer-senderName-error" role="alert" className="mt-1 text-xs text-rise-error">
                {errors.senderName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="refer-senderEmail" className={labelClass}>
              Your email
            </label>
            <input
              id="refer-senderEmail"
              type="email"
              placeholder="you@email.com"
              className={inputClass}
              aria-invalid={!!errors.senderEmail}
              aria-describedby={errors.senderEmail ? 'refer-senderEmail-error' : undefined}
              {...register('senderEmail')}
            />
            {errors.senderEmail && (
              <p id="refer-senderEmail-error" role="alert" className="mt-1 text-xs text-rise-error">
                {errors.senderEmail.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Friend's info ─────────────────────────────────── */}
      <div>
        <p className="mb-4 text-[10px] font-medium tracking-[0.2em] text-muted uppercase">
          Their info
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="refer-friendName" className={labelClass}>
              Their name
            </label>
            <input
              id="refer-friendName"
              type="text"
              placeholder="Friend's name"
              className={inputClass}
              aria-invalid={!!errors.friendName}
              aria-describedby={errors.friendName ? 'refer-friendName-error' : undefined}
              {...register('friendName')}
            />
            {errors.friendName && (
              <p id="refer-friendName-error" role="alert" className="mt-1 text-xs text-rise-error">
                {errors.friendName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="refer-friendEmail" className={labelClass}>
              Their email
            </label>
            <input
              id="refer-friendEmail"
              type="email"
              placeholder="friend@email.com"
              className={inputClass}
              aria-invalid={!!errors.friendEmail}
              aria-describedby={errors.friendEmail ? 'refer-friendEmail-error' : undefined}
              {...register('friendEmail')}
            />
            {errors.friendEmail && (
              <p id="refer-friendEmail-error" role="alert" className="mt-1 text-xs text-rise-error">
                {errors.friendEmail.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Honeypot fields (invisible to humans) ─────────── */}
      <SpamProtectionFields
        onFieldChange={handleFieldChange}
        onCheckboxChange={handleCheckboxChange}
      />

      {/* ── Error message ──────────────────────────────────── */}
      {status === 'error' && errorMessage && (
        <p role="alert" className="text-sm text-rise-error">
          {errorMessage}
        </p>
      )}

      {/* ── Submit ─────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={clsx(
          'inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5',
          'text-[14px] font-medium tracking-[0.01em]',
          'transition-all duration-200 ease-out',
          'bg-rise-rise text-rise-ink shadow-xs',
          'hover:bg-rise-horizon hover:text-rise-dawn hover:shadow-sm hover:-translate-y-px',
          'disabled:opacity-40 disabled:pointer-events-none',
        )}
      >
        {status === 'submitting' ? 'Sending…' : 'Send the Wake-Up Call'}
      </button>

      <p className="text-center text-[11px] text-muted">
        One email. No list. No follow-up. We promise.
      </p>
    </form>
  )
}
