'use client'

import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

function subscribe(callback: () => void) {
  document.addEventListener('queuewise-theme-change', callback)
  return () => document.removeEventListener('queuewise-theme-change', callback)
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function getServerTheme(): Theme { return 'light' }

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)

  function toggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { window.localStorage.setItem('queuewise-theme', next) } catch { /* Theme still works if storage is unavailable. */ }
    document.dispatchEvent(new Event('queuewise-theme-change'))
  }

  const nextLabel = theme === 'dark' ? 'Light mode' : 'Dark mode'
  return (
    <button className={`theme-toggle${compact ? ' theme-toggle-compact' : ''}`} type="button" onClick={toggleTheme} aria-label={`Switch to ${nextLabel.toLowerCase()}`} title={`Switch to ${nextLabel.toLowerCase()}`} aria-pressed={theme === 'dark'}>
      {theme === 'dark' ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.6A8.5 8.5 0 0 1 8.4 3.8 8.5 8.5 0 1 0 20.2 15.6Z" /></svg>}
      <span>{nextLabel}</span>
    </button>
  )
}
