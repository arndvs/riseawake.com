import { Button } from '@/components/button'
import { Link } from '@/components/link'
import { Logo } from '@/components/logo'

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
            <Logo className="mb-10 h-7" />
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                404
            </p>
            <h1 className="mt-3 text-display font-display tracking-tight text-foreground-strong">
                Page not found
            </h1>
            <p className="mt-4 max-w-md text-base text-foreground-secondary">
                The page you&rsquo;re looking for doesn&rsquo;t exist, or has been moved.
            </p>
            <Button variant="primary" className="mt-8" href="/">
                Back to Home
            </Button>
        </main>
    )
}
