'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Stage = 'idle' | 'activating' | 'active' | 'routing' | 'complete'

const ROUTING_STEPS = [
  { time: 800, text: 'Push Mode initializing...' },
  { time: 1600, text: 'Mapping morning sequence...' },
  { time: 2600, text: 'Calibrating nudge force...' },
  { time: 3400, text: 'STATE THREE: engaging...' },
  { time: 4200, text: 'Routing to bathroom...' },
  { time: 5200, text: 'Routing to closet...' },
  { time: 6000, text: 'Self-making sequence: initiated...' },
  { time: 7000, text: 'Routing to kitchen...' },
  { time: 7800, text: 'Coffee detected. Vessel: unknown.' },
  { time: 8800, text: 'Routing to departure point...' },
  { time: 9600, text: 'Push Mode complete. Have a productive day.' },
]

export default function RemotePage() {
  const [stage, setStage] = useState<Stage>('idle')
  const [glowIntensity, setGlowIntensity] = useState(0.4)
  const [currentStep, setCurrentStep] = useState(0)
  const [stepText, setStepText] = useState('')
  const [pressCount, setPressCount] = useState(0)

  // Gentle idle pulse
  useEffect(() => {
    if (stage !== 'idle' && stage !== 'activating') return
    const interval = setInterval(() => {
      setGlowIntensity((v) => {
        const next = v + (Math.random() - 0.48) * 0.08
        return Math.max(0.25, Math.min(0.65, next))
      })
    }, 120)
    return () => clearInterval(interval)
  }, [stage])

  // Warn on unload during active
  useEffect(() => {
    if (stage === 'idle' || stage === 'complete') return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue =
        'Push Mode cannot be interrupted once initiated. This is a feature, not a limitation.'
      return e.returnValue
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [stage])

  // Routing sequence
  useEffect(() => {
    if (stage !== 'routing') return
    const timeouts: ReturnType<typeof setTimeout>[] = []
    ROUTING_STEPS.forEach(({ time, text }) => {
      timeouts.push(
        setTimeout(() => {
          setStepText(text)
          setCurrentStep((i) => i + 1)
          if (text.includes('productive day')) {
            timeouts.push(setTimeout(() => setStage('complete'), 1200))
          }
        }, time),
      )
    })
    return () => timeouts.forEach(clearTimeout)
  }, [stage])

  const handlePress = () => {
    if (stage === 'active' || stage === 'routing') {
      setPressCount((n) => n + 1)
      return
    }
    if (stage === 'complete') return

    setPressCount((n) => n + 1)
    setStage('activating')
    setGlowIntensity(1)

    setTimeout(() => {
      setStage('routing')
      setCurrentStep(0)
      setStepText('Push Mode initializing...')
    }, 600)
  }

  return (
    <main
      style={{
        background: '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily:
          "var(--font-dm-sans), -apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grain */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          opacity: 0.02,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      <style>{`
        @keyframes remoteGlow {
          0%, 100% { box-shadow: 0 0 24px 6px rgba(245,240,220,0.15), 0 0 60px 20px rgba(245,240,220,0.06); }
          50%       { box-shadow: 0 0 32px 10px rgba(245,240,220,0.25), 0 0 80px 30px rgba(245,240,220,0.10); }
        }
        @keyframes activeGlow {
          0%, 100% { box-shadow: 0 0 40px 16px rgba(42,92,219,0.4), 0 0 100px 40px rgba(42,92,219,0.15); }
          50%       { box-shadow: 0 0 60px 24px rgba(42,92,219,0.6), 0 0 120px 60px rgba(42,92,219,0.2); }
        }
        @keyframes stepFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '340px',
          textAlign: 'center',
        }}
      >
        {/* RISE wordmark */}
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.15)',
            marginBottom: '60px',
          }}
        >
          RISE
        </p>

        {/* THE REMOTE */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          {/* Remote body */}
          <div
            style={{
              width: '88px',
              background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
              borderRadius: '44px',
              padding: '24px 0 32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.8)',
              marginBottom: '32px',
            }}
          >
            {/* RISE etched on remote */}
            <p
              style={{
                fontSize: '8px',
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.18)',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              RISE
            </p>

            {/* THE BUTTON */}
            <button
              onClick={handlePress}
              disabled={stage === 'complete'}
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background:
                  stage === 'routing' || stage === 'active'
                    ? 'radial-gradient(circle at 40% 35%, rgba(42,92,219,0.9), rgba(26,70,200,1))'
                    : 'radial-gradient(circle at 40% 35%, #2a2a2a, #1a1a1a)',
                border: 'none',
                cursor: stage === 'complete' ? 'default' : 'pointer',
                position: 'relative',
                animation:
                  stage === 'idle' || stage === 'activating'
                    ? 'remoteGlow 3s ease-in-out infinite'
                    : stage === 'routing'
                      ? 'activeGlow 1.5s ease-in-out infinite'
                      : 'none',
                transition: 'background 0.4s ease',
                outline: 'none',
              }}
            >
              {/* Inner button highlight */}
              <div
                style={{
                  position: 'absolute',
                  inset: '3px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.08), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Glow dot center */}
              <div
                style={{
                  position: 'absolute',
                  inset: '35%',
                  borderRadius: '50%',
                  background:
                    stage === 'routing'
                      ? 'rgba(42,92,219,0.8)'
                      : `rgba(245,240,220,${glowIntensity})`,
                  transition: 'background 0.4s ease',
                  boxShadow:
                    stage === 'routing'
                      ? '0 0 8px 2px rgba(42,92,219,0.6)'
                      : `0 0 6px 1px rgba(245,240,220,${glowIntensity * 0.8})`,
                }}
              />
            </button>

            {/* Fine print */}
            <p
              style={{
                fontSize: '5px',
                color: 'rgba(255,255,255,0.12)',
                letterSpacing: '0.04em',
                lineHeight: 1.6,
                textAlign: 'center',
                padding: '0 10px',
                userSelect: 'none',
              }}
            >
              Push Mode cannot be manually
              <br />
              interrupted once initiated.
              <br />
              This is a feature, not a limitation.
              <br />
              Have a productive day!
            </p>
          </div>
        </div>

        {/* Status area */}
        {stage === 'idle' && (
          <div style={{ animation: 'pulse 3s ease-in-out infinite' }}>
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
              }}
            >
              PM-1 · Ready
            </p>
          </div>
        )}

        {stage === 'activating' && (
          <p
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em',
              animation: 'stepFade 0.3s ease',
            }}
          >
            Activating...
          </p>
        )}

        {(stage === 'routing' || stage === 'active') && stepText && (
          <div key={stepText} style={{ animation: 'stepFade 0.3s ease' }}>
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.05em',
                lineHeight: 1.6,
                marginBottom: '12px',
              }}
            >
              {stepText}
            </p>
            {/* Progress bar */}
            <div
              style={{
                width: '160px',
                height: '1px',
                background: 'rgba(255,255,255,0.06)',
                margin: '0 auto',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${(currentStep / ROUTING_STEPS.length) * 100}%`,
                  background: 'rgba(42,92,219,0.7)',
                  transition: 'width 0.8s ease',
                }}
              />
            </div>
          </div>
        )}

        {stage === 'complete' && (
          <div style={{ animation: 'stepFade 0.5s ease' }}>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}
            >
              Push Mode complete.
            </p>
            <p
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: '32px',
                fontStyle: 'italic',
              }}
            >
              Have a productive day.
            </p>
            <p
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.15)',
                marginBottom: '24px',
                lineHeight: 1.7,
              }}
            >
              The bed is returning home.
              <br />
              It will be there when you get back.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
                textDecoration: 'none',
                padding: '10px 24px',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '980px',
                transition: 'color 0.2s ease',
              }}
            >
              Return Home
            </Link>
          </div>
        )}

        {/* Press again counter */}
        {pressCount > 2 && stage === 'routing' && (
          <p
            style={{
              fontSize: '9px',
              color: 'rgba(255,255,255,0.1)',
              marginTop: '24px',
              fontStyle: 'italic',
              animation: 'stepFade 0.3s ease',
            }}
          >
            Push Mode noted your input ({pressCount - 1}x). Push Mode is
            continuing.
          </p>
        )}

        {/* Nav out — barely visible */}
        {stage === 'idle' && (
          <Link
            href="/"
            style={{
              display: 'block',
              marginTop: '60px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.1)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
            }}
          >
            ← riseawake.com
          </Link>
        )}
      </div>
    </main>
  )
}
