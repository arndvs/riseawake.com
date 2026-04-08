'use client'

import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SWAP INSTRUCTIONS FOR DEV TEAM
//
// PLACEHOLDER MODE (current):
//   Place your video file at /public/video/the-remote.mp4
//   The component will play it locally.
//
// VIMEO MODE (when ready):
//   1. Set USE_VIMEO = true
//   2. Set VIMEO_ID to your Vimeo video ID (the number in the URL)
//   3. Done. The local video element is replaced with the Vimeo embed.
// ─────────────────────────────────────────────────────────────────────────────
const USE_VIMEO = false
const VIMEO_ID = '' // e.g. "123456789"
const LOCAL_VIDEO_PATH = '/video/the-remote.mp4'

function PlayButton({ onPlay }: { onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      className="group relative flex cursor-pointer items-center justify-center bg-transparent"
      aria-label="Play film"
    >
      <div className="absolute size-24 animate-glow-pulse rounded-full border border-accent/30" />
      <div className="relative flex size-[72px] items-center justify-center rounded-full border border-accent/40 bg-accent/15 backdrop-blur-lg transition-transform duration-300 group-hover:scale-105">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          <path d="M3 2L18 11L3 20V2Z" className="fill-foreground/90" />
        </svg>
      </div>
    </button>
  )
}

function VimeoThumbnail({
  vimeoId,
  onPlay,
}: {
  vimeoId: string
  onPlay: () => void
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://vumbnail.com/${encodeURIComponent(vimeoId)}.jpg`}
        alt="Film thumbnail"
        className="absolute inset-0 size-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-rise-dark/40" />
      <PlayButton onPlay={onPlay} />
    </div>
  )
}

export function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handlePlay = () => {
    if (USE_VIMEO) {
      setPlaying(true)
      return
    }
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
        setPlaying(false)
      } else {
        videoRef.current.play()
        setPlaying(true)
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      className="border-t border-edge-subtle px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className="mb-14 flex flex-col gap-6 transition-all duration-700 ease-out md:flex-row md:items-end md:justify-between"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-muted">
              Product Film
            </p>
            <h2 className="font-display text-display leading-tight tracking-tight text-foreground">
              See it in action.
              <br />
              <span className="text-foreground-muted">
                Whether you want to or not.
              </span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-foreground-muted/40 md:block">
            A short film about one morning.
            <br />
            <span className="text-foreground-muted/25">
              Dave did not commission this film.
            </span>
          </p>
        </div>

        {/* Video container */}
        <div
          className="transition-all duration-[800ms] ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '150ms',
          }}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-edge bg-surface-alt shadow-hero">
            {USE_VIMEO && VIMEO_ID && playing ? (
              <iframe
                src={`https://player.vimeo.com/video/${encodeURIComponent(VIMEO_ID)}?autoplay=1&title=0&byline=0&portrait=0&color=1A4FD6`}
                className="absolute inset-0 size-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : USE_VIMEO && VIMEO_ID ? (
              <VimeoThumbnail vimeoId={VIMEO_ID} onPlay={handlePlay} />
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 size-full object-cover"
                  src={LOCAL_VIDEO_PATH}
                  playsInline
                  loop
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                />

                {/* Overlay — hides when playing */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                  style={{
                    background: playing
                      ? 'transparent'
                      : 'rgba(10,10,11,0.55)',
                    backdropFilter: playing ? 'blur(0px)' : 'blur(2px)',
                    pointerEvents: playing ? 'none' : 'auto',
                    opacity: playing ? 0 : 1,
                  }}
                >
                  <div className="flex flex-col items-center gap-8 px-6 text-center">
                    <PlayButton onPlay={handlePlay} />
                    <div>
                      <p className="mb-2 text-sm font-medium text-foreground-secondary">
                        Place video file at{' '}
                        <code className="rounded-sm border border-accent/15 bg-accent/12 px-2 py-0.5 text-xs text-accent/80">
                          /public/video/the-remote.mp4
                        </code>
                      </p>
                      <p className="text-xs leading-relaxed text-foreground-muted/30">
                        Or set{' '}
                        <code className="text-accent/60">
                          USE_VIMEO = true
                        </code>{' '}
                        and{' '}
                        <code className="text-accent/60">VIMEO_ID</code> in{' '}
                        <code className="text-accent/60">
                          video-section.tsx
                        </code>{' '}
                        to use your Vimeo embed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Play/pause toggle when playing */}
                {playing && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 size-full cursor-pointer bg-transparent opacity-0"
                    aria-label="Pause"
                  />
                )}
              </>
            )}

            {/* Corner branding */}
            <div
              className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 transition-opacity duration-500"
              style={{ opacity: playing ? 0.4 : 0.7 }}
            >
              <div className="size-1.5 animate-glow-pulse rounded-full bg-accent" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-secondary">
                RISE™
              </span>
            </div>

            {/* Runtime badge */}
            <div
              className="pointer-events-none absolute top-4 right-4 transition-opacity duration-500"
              style={{ opacity: playing ? 0.3 : 0.6 }}
            >
              <span className="rounded-sm border border-edge bg-page/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-foreground-secondary">
                Push Mode
              </span>
            </div>
          </div>
        </div>

        {/* Caption row */}
        <div
          className="mt-6 flex flex-col items-start justify-between gap-4 transition-opacity duration-700 md:flex-row md:items-center"
          style={{
            opacity: revealed ? 1 : 0,
            transitionDelay: '300ms',
          }}
        >
          <p className="text-xs leading-relaxed text-foreground-muted/40">
            <span className="text-foreground-secondary">
              &ldquo;The Remote&rdquo;
            </span>{' '}
            — an independent film about one morning with The Push.
          </p>
          <p className="max-w-[340px] text-right text-[10px] leading-relaxed text-foreground-muted/25">
            Dave did not endorse this film. Dave did not consent to this film.
            Dave arrived at work on time. Results typical.
          </p>
        </div>
      </div>
    </section>
  )
}
