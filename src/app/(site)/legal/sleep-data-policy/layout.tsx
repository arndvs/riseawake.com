import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sleep & Environmental Data Policy',
  description:
    'RISE Sleep & Environmental Data Policy. Version 4.2. Covers occupancy detection, relationship status inference, audio classification, and the 2,048-sensor pressure array.',
}

export default function SleepDataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
