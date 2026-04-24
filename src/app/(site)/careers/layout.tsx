import { createMetadata } from '@/lib/metadata'

export const metadata = createMetadata({
  title: 'Careers — Open Roles at RISE',
  description:
    'RISE is 312 people building the product that removes the decision from the morning. Open roles listed with honest descriptions.',
  path: '/careers',
})

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
