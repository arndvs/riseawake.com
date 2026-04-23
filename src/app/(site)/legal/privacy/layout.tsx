import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'RISE™ Privacy Policy. Version 4.2. A comprehensive account of the data RISE™ collects, retains, shares, and acts upon.',
  path: '/legal/privacy',
})

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
