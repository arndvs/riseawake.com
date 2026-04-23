import { StudioShell } from '@/components/studio/studio-shell'

export default function RenderLayout({ children }: { children: React.ReactNode }) {
  // TODO: When Clerk is configured, add auth() check here
  // and redirect unauthenticated users to /studio
  return <StudioShell>{children}</StudioShell>
}
