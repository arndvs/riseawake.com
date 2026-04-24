import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { StudioLoginGate } from '@/components/studio/studio-login-gate'

export default async function StudioPage() {
  const { userId } = await auth()

  if (userId) redirect('/studio/render')

  return <StudioLoginGate />
}
