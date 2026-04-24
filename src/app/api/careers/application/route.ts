import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../../convex/_generated/api'
import {
  getJobById,
  MAX_RESUME_SIZE,
  ALLOWED_RESUME_TYPES,
} from '@/lib/careers-data'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // ─── Honeypot ─────────────────────────────────────────────────────
    const honeypot = formData.get('company')
    if (honeypot && typeof honeypot === 'string' && honeypot.length > 0) {
      // Bot detected — return success silently to avoid tipping off
      return NextResponse.json({ success: true })
    }

    // ─── Extract fields ───────────────────────────────────────────────
    const roleId = formData.get('roleId') as string | null
    const roleTitle = formData.get('roleTitle') as string | null
    const firstName = formData.get('firstName') as string | null
    const lastName = formData.get('lastName') as string | null
    const email = formData.get('email') as string | null
    const phone = formData.get('phone') as string | null
    const experienceLevel = formData.get('experienceLevel') as string | null
    const availability = formData.get('availability') as string | null
    const whyJoinRise = formData.get('whyJoinRise') as string | null
    const roleSpecificAnswersRaw = formData.get(
      'roleSpecificAnswers',
    ) as string | null
    const resumeFile = formData.get('resume') as File | null

    // ─── Validate required fields ─────────────────────────────────────
    if (
      !roleId ||
      !roleTitle ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !experienceLevel ||
      !availability ||
      !whyJoinRise
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Validate role exists
    const job = getJobById(roleId)
    if (!job) {
      return NextResponse.json(
        { error: 'Unknown role ID' },
        { status: 400 },
      )
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 },
      )
    }

    // Parse role-specific answers
    let roleSpecificAnswers: Record<string, unknown> = {}
    if (roleSpecificAnswersRaw) {
      try {
        roleSpecificAnswers = JSON.parse(roleSpecificAnswersRaw)
      } catch {
        return NextResponse.json(
          { error: 'Invalid role-specific answers' },
          { status: 400 },
        )
      }
    }

    // ─── Resume upload ────────────────────────────────────────────────
    let resumeStorageId: string | undefined
    let resumeFileName: string | undefined
    let resumeFileSize: number | undefined

    if (resumeFile && resumeFile.size > 0) {
      // Validate file size
      if (resumeFile.size > MAX_RESUME_SIZE) {
        return NextResponse.json(
          { error: 'Resume must be under 5MB' },
          { status: 400 },
        )
      }

      // Validate file type
      if (
        !(ALLOWED_RESUME_TYPES as readonly string[]).includes(resumeFile.type)
      ) {
        return NextResponse.json(
          { error: 'Only PDF, DOC, and DOCX files are accepted' },
          { status: 400 },
        )
      }

      // Upload to Convex storage
      const uploadUrl = await convex.mutation(api.applications.generateUploadUrl)
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': resumeFile.type },
        body: resumeFile,
      })

      if (!uploadRes.ok) {
        return NextResponse.json(
          { error: 'Resume upload failed' },
          { status: 500 },
        )
      }

      const { storageId } = (await uploadRes.json()) as {
        storageId: string
      }
      resumeStorageId = storageId
      resumeFileName = resumeFile.name
      resumeFileSize = resumeFile.size
    }

    // ─── Get IP address ───────────────────────────────────────────────
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded?.split(',')[0]?.trim() || 'unknown'

    // ─── Submit to Convex ─────────────────────────────────────────────
    await convex.mutation(api.applications.submitApplication, {
      roleId,
      roleTitle,
      firstName,
      lastName,
      email,
      phone,
      experienceLevel,
      availability,
      whyJoinRise,
      roleSpecificAnswers,
      ...(resumeStorageId
        ? { resumeStorageId: resumeStorageId as any, resumeFileName, resumeFileSize }
        : {}),
      ipAddress,
    })

    // TODO: Send confirmation email to applicant (B.9)
    // TODO: Send notification email to staff (B.10)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[careers/application] Error:', err)
    return NextResponse.json(
      { error: 'Application submission failed' },
      { status: 500 },
    )
  }
}
