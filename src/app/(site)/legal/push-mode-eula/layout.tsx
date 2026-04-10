import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Push Mode EULA — RISE™',
  description:
    'RISE™ Push Mode End User License Agreement. Version 4.2. Covers license scope, modification rights, and the acknowledgment that Push Mode has no off switch.',
}

export default function EulaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
