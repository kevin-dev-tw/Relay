import React, { useEffect, useState } from 'react'
import { scrollToSection, pauseSmoother } from '../scroll.js'

const LINKS = [
  { label: 'The Walk', to: '#walk' },
  { label: 'One Ticket', to: '#ticket' },
  { label: 'The Mirror', to: '#mirror' },
]

const STOPS = [
  { label: 'The Queue', dist: '96 M OUT', to: '#queue' },
  { label: 'The Walk', dist: '58 M OUT', to: '#walk' },
  { label: 'One Ticket', dist: '31 M OUT', to: '#ticket' },
  { label: 'The Mirror', dist: '12 M OUT', to: '#mirror' },
  { label: 'The Sun', dist: '0 M — ARRIVE', to: '#enter' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    pauseSmoother(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      pauseSmoother(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (to) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToSection(to)
  }

  return (
    <>
      <header className="site-nav">
        <a className="brand" href="#queue" onClick={go('#queue')}>
          <span className="brand-name">Relay</span>
          <span className="brand-sub">Indoor resolution</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.to} href={l.to} onClick={go(l.to)}>
              {l.label}
            </a>
          ))}
          <button
            className="menu-toggle"
            aria-label={open ? 'Close hall map' : 'Open hall map'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </header>

      <div className={`menu-overlay${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Hall map">
        <span className="micro-inverse menu-head">Hall 01 — Station index</span>
        <nav className="menu-stops">
          {STOPS.map((s, i) => (
            <a
              key={s.to}
              className="menu-item"
              href={s.to}
              onClick={go(s.to)}
              style={{ '--d': `${80 + i * 60}ms` }}
            >
              <span className="mi-name">{s.label}</span>
              <span className="mi-dist">{s.dist}</span>
            </a>
          ))}
        </nav>
        <button className="menu-close" onClick={() => setOpen(false)}>
          Close ✕
        </button>
      </div>
    </>
  )
}
