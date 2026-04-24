import { StudioHeader } from './studio-header'

export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <StudioHeader />
      <main className="pt-14">
        <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
      </main>
    </div>
  )
}
