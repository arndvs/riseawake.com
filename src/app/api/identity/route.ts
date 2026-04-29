import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const hdrs = await headers()
  const forwarded = hdrs.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() ?? '0.0.0.0'

  // Hash the IP so we never expose raw IPs
  const identitySalt = process.env.IDENTITY_SALT
  if (!identitySalt && process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'IDENTITY_SALT is not configured' },
      { status: 500 },
    )
  }
  const encoder = new TextEncoder()
  const data = encoder.encode(ip + (identitySalt ?? 'rise-anon-dev'))
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return NextResponse.json({
    identifier: `anon_${hashHex.slice(0, 16)}`,
    displayName: 'Reviewer',
  })
}
