import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { StudioShell } from '@/components/studio/studio-shell'

export default async function RenderLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) redirect('/studio')

  return <StudioShell>{children}</StudioShell>
}
