import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Changelog — Platform Updates',
  description:
    'Every Push Mode firmware update, platform release, and incident response. In order. With notes.',
  path: '/changelog',
})

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
