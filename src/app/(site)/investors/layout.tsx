import { createMetadata } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

export const metadata = createMetadata({
  title: 'Investor Relations',
  description:
    'RISE investor relations — financial results, annual reports, shareholder communications, and corporate governance.',
  path: '/investors',
})

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
