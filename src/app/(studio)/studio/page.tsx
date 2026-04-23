import { StudioLoginGate } from '@/components/studio/studio-login-gate'

export default function StudioPage() {
  // TODO: When Clerk is configured, check auth() here and redirect
  // authenticated users to /studio/render
  return <StudioLoginGate />
}
