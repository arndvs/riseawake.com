import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Annual General Meeting Minutes',
  description:
    'Minutes of the RISE Technologies Annual General Meeting — March 14, 2025. Resolutions, shareholder Q&A, and action items.',
}

export default function MeetingMinutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
