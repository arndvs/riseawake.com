'use client'

import { Button } from '@/components/button'
import { Logo } from '@/components/logo'

export default function Error({ reset }: { reset: () => void }) {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
            <Logo className="mb-10 h-7" />
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Error
            </p>
            <h1 className="mt-3 text-display font-display tracking-tight text-foreground-strong">
                Something went wrong
            </h1>
            <p className="mt-4 max-w-md text-base text-foreground-secondary">
                An unexpected error occurred. Please try again.
            </p>
            <Button variant="primary" className="mt-8" onClick={reset}>
                Try Again
            </Button>
        </main>
    )
}
