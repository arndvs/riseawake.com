'use client'

import { useEffect } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

export function EasterEggs() {
  useEffect(() => {
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami tracker
      if (e.code === KONAMI[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0
          triggerKonami()
        }
      } else {
        konamiIndex = 0
      }
    }

    // "push" typed in text fields
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        if (target.value?.toLowerCase().endsWith('push')) {
          const original = document.title
          document.title = 'Push Mode: Active'
          setTimeout(() => {
            document.title = original
          }, 2000)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('input', handleInput)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('input', handleInput)
    }
  }, [])

  return null
}

function triggerKonami() {
  // Grayscale + grain
  document.documentElement.style.filter = 'grayscale(1)'

  const grain = document.createElement('div')
  grain.setAttribute('data-konami-grain', '')
  Object.assign(grain.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    pointerEvents: 'none',
    opacity: '0.15',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: '128px 128px',
  })
  document.body.appendChild(grain)

  // Banner
  const banner = document.createElement('div')
  banner.setAttribute('data-konami-banner', '')
  Object.assign(banner.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '100000',
    padding: '24px 40px',
    background: 'rgba(0,0,0,0.85)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    letterSpacing: '0.1em',
    lineHeight: '1.8',
    textAlign: 'center',
    fontFamily:
      "var(--font-dm-sans), -apple-system, BlinkMacSystemFont, sans-serif",
    pointerEvents: 'none',
  })
  banner.innerHTML =
    'Push Mode override requested.<br/>Override not available.<br/><span style="opacity:0.35;font-size:9px">This is a feature, not a limitation.</span>'
  document.body.appendChild(banner)

  // Reset after 2.8s
  setTimeout(() => {
    document.documentElement.style.filter = ''
    grain.remove()
    banner.remove()
  }, 2800)
}
