'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useCallback, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { clsx } from 'clsx'
import {
  getJobById,
  EXPERIENCE_LEVELS,
  AVAILABILITY_OPTIONS,
  MAX_RESUME_SIZE,
  ALLOWED_RESUME_TYPES,
  RESUME_ACCEPT,
  type JobOpening,
  type RoleSpecificField,
} from '@/lib/careers-data'

// ─── Schema ─────────────────────────────────────────────────────────────────

const applicationSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid email'),
  phone: z.string().min(1, 'Required'),
  experienceLevel: z.string().min(1, 'Required'),
  availability: z.string().min(1, 'Required'),
  whyJoinRise: z.string().min(1, 'Required'),
  roleSpecificAnswers: z.record(z.string(), z.unknown()),
  resume: z.any().optional(),
  company: z.string().max(0, 'Bot detected'), // honeypot — must be empty
})

// ─── Types ──────────────────────────────────────────────────────────────────

type ApplicationFormData = z.infer<typeof applicationSchema> & {
  resume?: FileList
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const inputClass = clsx(
  'w-full rounded border border-edge bg-surface-alt px-3.5 py-2.5',
  'text-sm text-foreground placeholder:text-foreground-muted/50',
  'outline-none transition-colors',
  'focus:border-brand/40 focus:ring-1 focus:ring-brand/20',
)

const labelClass = 'block mb-1.5 text-[11px] tracking-wide text-foreground-secondary uppercase'

const errorClass = 'mt-1 text-[10px] text-red-500/80'

const sectionHeadingClass =
  'mb-1 text-[10px] tracking-widest text-foreground-muted uppercase'

// ─── Role-specific field renderer ───────────────────────────────────────────

function RoleField({
  field,
  register,
  errors,
}: {
  field: RoleSpecificField
  register: ReturnType<typeof useForm<ApplicationFormData>>['register']
  errors: Record<string, { message?: string }>
}) {
  const name = `roleSpecificAnswers.${field.id}` as const
  const error = errors?.[field.id]

  switch (field.type) {
    case 'text':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <input
            type="text"
            className={inputClass}
            placeholder={field.placeholder}
            {...register(name as keyof ApplicationFormData, {
              required: field.required ? 'Required' : false,
            })}
          />
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    case 'textarea':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <textarea
            rows={3}
            className={clsx(inputClass, 'resize-y')}
            placeholder={field.placeholder}
            {...register(name as keyof ApplicationFormData, {
              required: field.required ? 'Required' : false,
            })}
          />
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    case 'number':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <input
            type="number"
            className={inputClass}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            {...register(name as keyof ApplicationFormData, {
              required: field.required ? 'Required' : false,
              valueAsNumber: true,
            })}
          />
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    case 'select':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <select
            className={inputClass}
            {...register(name as keyof ApplicationFormData, {
              required: field.required ? 'Required' : false,
            })}
          >
            <option value="">Select…</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    case 'multiselect':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <select
            multiple
            className={clsx(inputClass, 'min-h-20')}
            {...register(name as keyof ApplicationFormData, {
              required: field.required ? 'Select at least one' : false,
            })}
          >
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p className="mt-0.5 text-[9px] text-foreground-muted/60">
            Hold Ctrl/Cmd to select multiple
          </p>
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    case 'boolean':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <div className="flex gap-4 mt-1.5">
            {(['Yes', 'No'] as const).map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={option === 'Yes' ? 'true' : 'false'}
                  className="accent-brand"
                  {...register(name as keyof ApplicationFormData, {
                    required: field.required ? 'Required' : false,
                  })}
                />
                <span className="text-[11px] text-foreground-secondary">{option}</span>
              </label>
            ))}
          </div>
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    case 'scale':
      return (
        <div>
          <label className={labelClass}>
            {field.label}
            {field.required && <span className="text-red-500/60"> *</span>}
          </label>
          <div className="flex items-center gap-3">
            {field.scaleLabels && (
              <span className="text-[9px] text-foreground-muted/60 w-24 text-right shrink-0">
                {field.scaleLabels.min}
              </span>
            )}
            <div className="flex gap-2">
              {Array.from(
                { length: (field.max ?? 5) - (field.min ?? 1) + 1 },
                (_, i) => (field.min ?? 1) + i,
              ).map((val) => (
                <label key={val} className="flex flex-col items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    value={val}
                    className="accent-brand"
                    {...register(name as keyof ApplicationFormData, {
                      required: field.required ? 'Required' : false,
                    })}
                  />
                  <span className="text-[9px] text-foreground-muted">{val}</span>
                </label>
              ))}
            </div>
            {field.scaleLabels && (
              <span className="text-[9px] text-foreground-muted/60 w-24 shrink-0">
                {field.scaleLabels.max}
              </span>
            )}
          </div>
          {error && <p className={errorClass}>{error.message}</p>}
        </div>
      )

    default:
      return null
  }
}

// ─── Form component ─────────────────────────────────────────────────────────

function ApplicationForm({ job }: { job: JobOpening }) {
  const router = useRouter()
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      company: '', // honeypot
      roleSpecificAnswers: {},
    },
  })

  const resumeFiles = watch('resume')

  const onSubmit = useCallback(
    async (data: ApplicationFormData) => {
      setSubmitState('submitting')
      setSubmitError(null)

      try {
        const formData = new FormData()
        formData.append('roleId', job.id)
        formData.append('roleTitle', job.title)
        formData.append('firstName', data.firstName)
        formData.append('lastName', data.lastName)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('experienceLevel', data.experienceLevel)
        formData.append('availability', data.availability)
        formData.append('whyJoinRise', data.whyJoinRise)
        formData.append(
          'roleSpecificAnswers',
          JSON.stringify(data.roleSpecificAnswers ?? {}),
        )
        // Honeypot
        formData.append('company', data.company)

        if (data.resume?.[0]) {
          formData.append('resume', data.resume[0])
        }

        const res = await fetch('/api/careers/application', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(
            body.error || `Application failed (${res.status})`,
          )
        }

        setSubmitState('success')
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : 'Something went wrong',
        )
        setSubmitState('error')
      }
    },
    [job],
  )

  // ─── Success state ──────────────────────────────────────────────────────

  if (submitState === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-40 pb-24">
        <div className="rounded border border-edge bg-surface-alt p-8">
          <p className="mb-2 text-[10px] tracking-widest text-brand/60 uppercase">
            Application Received
          </p>
          <h2 className="mb-4 font-display text-2xl tracking-tight text-foreground-strong">
            Your application for {job.title} has been received.
          </h2>
          <p className="mb-2 text-sm text-foreground-secondary">
            Role ID: {job.id}. Someone from the team will review your
            materials. Response times vary. Some vary more than others.
          </p>
          <p className="mb-6 text-xs text-foreground-muted">
            A confirmation email should arrive shortly at the address you
            provided. If you don&apos;t see it, check your spam folder.
          </p>
          <button
            onClick={() => router.push('/careers')}
            className="cursor-pointer rounded bg-brand px-6 py-2.5 text-[11px] font-medium tracking-wider text-brand-on uppercase"
          >
            Back to Careers
          </button>
        </div>
      </div>
    )
  }

  // ─── Form ─────────────────────────────────────────────────────────────

  const roleErrors = (errors.roleSpecificAnswers as Record<string, { message?: string }>) ?? {}

  return (
    <div className="mx-auto max-w-2xl px-6 pt-40 pb-24">
      {/* Header */}
      <div className="mb-10">
        <button
          onClick={() => router.push('/careers')}
          className="mb-6 cursor-pointer border-none bg-transparent text-[11px] tracking-wide text-foreground-muted uppercase hover:text-foreground-secondary"
        >
          ← Back to All Roles
        </button>
        <p className="mb-1 text-[10px] tracking-widest text-brand/60 uppercase">
          Applying for
        </p>
        <h1 className="mb-2 font-display text-3xl tracking-tight text-foreground-strong">
          {job.title}
        </h1>
        <div className="flex flex-wrap gap-3 text-[10px] text-foreground-muted">
          <span>{job.department}</span>
          <span>·</span>
          <span>{job.location}</span>
          <span>·</span>
          <span>{job.id}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        {/* Section 1: Personal */}
        <section>
          <p className={sectionHeadingClass}>Personal Information</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                First Name <span className="text-red-500/60">*</span>
              </label>
              <input
                type="text"
                className={inputClass}
                {...register('firstName', { required: 'Required' })}
              />
              {errors.firstName && (
                <p className={errorClass}>{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Last Name <span className="text-red-500/60">*</span>
              </label>
              <input
                type="text"
                className={inputClass}
                {...register('lastName', { required: 'Required' })}
              />
              {errors.lastName && (
                <p className={errorClass}>{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Email <span className="text-red-500/60">*</span>
              </label>
              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email',
                  },
                })}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Phone <span className="text-red-500/60">*</span>
              </label>
              <input
                type="tel"
                className={inputClass}
                placeholder="(555) 555-5555"
                {...register('phone', { required: 'Required' })}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Professional */}
        <section>
          <p className={sectionHeadingClass}>Professional</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Experience Level <span className="text-red-500/60">*</span>
              </label>
              <select
                className={inputClass}
                {...register('experienceLevel', { required: 'Required' })}
              >
                <option value="">Select…</option>
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl.value} value={lvl.value}>
                    {lvl.label}
                  </option>
                ))}
              </select>
              {errors.experienceLevel && (
                <p className={errorClass}>
                  {errors.experienceLevel.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Availability <span className="text-red-500/60">*</span>
              </label>
              <select
                className={inputClass}
                {...register('availability', { required: 'Required' })}
              >
                <option value="">Select…</option>
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.availability && (
                <p className={errorClass}>{errors.availability.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Role-specific */}
        {job.roleSpecificFields.length > 0 && (
          <section>
            <p className={sectionHeadingClass}>
              Role-Specific — {job.id}
            </p>
            <div className="mt-4 flex flex-col gap-4">
              {job.roleSpecificFields.map((field) => (
                <RoleField
                  key={field.id}
                  field={field}
                  register={register}
                  errors={roleErrors}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Why RISE */}
        <section>
          <p className={sectionHeadingClass}>Why RISE</p>
          <div className="mt-4">
            <label className={labelClass}>
              Why do you want to join RISE?{' '}
              <span className="text-red-500/60">*</span>
            </label>
            <textarea
              rows={4}
              className={clsx(inputClass, 'resize-y')}
              placeholder="One paragraph explaining why you read the job description carefully."
              {...register('whyJoinRise', {
                required: 'Required',
                minLength: {
                  value: 50,
                  message: 'At least 50 characters',
                },
              })}
            />
            {errors.whyJoinRise && (
              <p className={errorClass}>{errors.whyJoinRise.message}</p>
            )}
          </div>
        </section>

        {/* Section 5: Resume */}
        <section>
          <p className={sectionHeadingClass}>Resume</p>
          <div className="mt-4">
            <label className={labelClass}>
              Upload Resume (PDF, DOC, DOCX — 5MB max)
            </label>
            <input
              type="file"
              accept={RESUME_ACCEPT}
              className={clsx(
                inputClass,
                'file:mr-3 file:rounded file:border-0 file:bg-brand/10 file:px-3 file:py-1',
                'file:text-[10px] file:font-medium file:tracking-wider file:text-brand file:uppercase',
                'file:cursor-pointer',
              )}
              {...register('resume', {
                validate: {
                  fileSize: (files) => {
                    if (!files?.[0]) return true
                    return (
                      files[0].size <= MAX_RESUME_SIZE ||
                      'File must be under 5MB'
                    )
                  },
                  fileType: (files) => {
                    if (!files?.[0]) return true
                    return (
                      (ALLOWED_RESUME_TYPES as readonly string[]).includes(
                        files[0].type,
                      ) || 'Only PDF, DOC, and DOCX files are accepted'
                    )
                  },
                },
              })}
            />
            {resumeFiles?.[0] && (
              <p className="mt-1.5 text-[10px] text-foreground-muted">
                {resumeFiles[0].name} (
                {(resumeFiles[0].size / 1024).toFixed(0)} KB)
              </p>
            )}
            {errors.resume && (
              <p className={errorClass}>{String(errors.resume.message ?? '')}</p>
            )}
          </div>
        </section>

        {/* Honeypot — hidden from users, visible to bots */}
        <div className="absolute -left-full invisible" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('company')}
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3">
          {submitState === 'error' && submitError && (
            <div className="rounded border border-red-500/20 bg-red-500/5 px-3.5 py-3">
              <p className="text-[11px] text-red-500/80">{submitError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitState === 'submitting'}
            className={clsx(
              'cursor-pointer rounded bg-brand px-8 py-3 text-[11px] font-medium tracking-wider text-brand-on uppercase',
              'transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
            )}
          >
            {submitState === 'submitting'
              ? 'Submitting…'
              : 'Submit Application'}
          </button>

          <p className="text-[9px] text-foreground-muted/60">
            By submitting this application, you consent to RISE processing
            your personal data for recruitment purposes. Your data will be
            retained for 12 months. The retention policy was written by
            Legal. Legal has read it.
          </p>
        </div>
      </form>
    </div>
  )
}

// ─── Page wrapper ───────────────────────────────────────────────────────────

function ApplyPageContent() {
  const searchParams = useSearchParams()
  const position = searchParams.get('position')

  if (!position) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-40 pb-24">
        <p className="text-sm text-foreground-secondary">
          No role specified. Return to{' '}
          <a href="/careers" className="text-brand underline">
            Careers
          </a>{' '}
          and select a role.
        </p>
      </div>
    )
  }

  const job = getJobById(position)

  if (!job) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-40 pb-24">
        <p className="text-sm text-foreground-secondary">
          Unknown role ID: <code className="text-brand">{position}</code>.
          Return to{' '}
          <a href="/careers" className="text-brand underline">
            Careers
          </a>
          .
        </p>
      </div>
    )
  }

  return <ApplicationForm job={job} />
}

export default function ApplyPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="mx-auto max-w-2xl px-6 pt-40 pb-24">
            <p className="text-sm text-foreground-muted">Loading…</p>
          </div>
        }
      >
        <ApplyPageContent />
      </Suspense>
    </main>
  )
}
