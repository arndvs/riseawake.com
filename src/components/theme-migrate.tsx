'use client'

import { useEffect } from 'react'

/**
 * One-shot migration from v5 (dark-default) to v6 (light-default).
 *
 * v5 shipped with `defaultTheme="system"` and a dark-leaning UI, so users with
 * a persisted `theme=dark` or `theme=system` in localStorage would continue to
 * see dark mode after the v6 deploy. This component flips them to light on the
 * first v6 visit and records that the migration has run.
 *
 * After migration, next-themes is the source of truth — users who toggle to
 * dark via the theme-toggle (Slice A5) will have their choice persisted as
 * normal.
 *
 * Plan: working/RISE_BRAND_v6_IMPLEMENTATION_PLAN.md §A6.
 */
export function ThemeMigrate() {
  useEffect(() => {
    const KEY = 'rise-v6-theme-migrated'
    if (localStorage.getItem(KEY)) return
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'system' || !stored) {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(KEY, '1')
  }, [])
  return null
}
