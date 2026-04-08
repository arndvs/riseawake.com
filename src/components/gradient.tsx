import { clsx } from 'clsx'

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-xl transform-gpu md:right-0',
          'bg-linear-to-br from-accent/10 via-accent/5 to-transparent',
          'rotate-[-10deg] rounded-full blur-3xl',
        )}
      />
    </div>
  )
}
