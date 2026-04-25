import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUploadAuthParams } from '@imagekit/next/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 },
    )
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY
  if (!privateKey || !publicKey) {
    console.error('[api/upload-auth] Missing ImageKit keys')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    )
  }

  const authParams = getUploadAuthParams({
    privateKey,
    publicKey,
  })

  return NextResponse.json(authParams)
}
