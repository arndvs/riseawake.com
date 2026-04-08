import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'For People Who Need A Little Push. The RISE™ Smart Adjustable Base.',
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
          <h1 className="font-display text-hero tracking-tight text-foreground">
            Rise. Inevitably.
          </h1>
          <p className="mx-auto mt-8 max-w-lg text-xl font-medium text-foreground-secondary">
            For People Who Need A Little Push.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
