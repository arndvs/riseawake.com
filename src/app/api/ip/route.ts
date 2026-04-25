import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  return NextResponse.json({ ip })
}
