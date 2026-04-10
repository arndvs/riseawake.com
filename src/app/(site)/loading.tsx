import { Logo } from '@/components/logo'

export default function Loading() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center">
            <Logo className="h-7 animate-pulse" />
        </main>
    )
}
