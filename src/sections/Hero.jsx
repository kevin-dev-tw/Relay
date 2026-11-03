import React from 'react'
import { scrollToSection } from '../scroll.js'

const STATIONS = [
  { name: 'The Queue', dist: '96 m out', to: '#queue' },
  { name: 'The Walk', dist: '58 m out', to: '#walk' },
  { name: 'One Ticket', dist: '31 m out', to: '#ticket' },
  { name: 'The Mirror', dist: '12 m out', to: '#mirror' },
  { name: 'The Sun', dist: '0 m · arrive', to: '#enter' },
]

export default function Hero() {
  const go = (to) => (e) => {
    e.preventDefault()
    scrollToSection(to)
  }

  return (
    <section className="hero" id="queue">
      <div className="hero-inner">
        <h1 className="display">Every ticket reaches the light.</h1>
        <p className="body-copy hero-sub">
          Relay is an AI resolution engine for support teams. Tickets walk in;
          resolved conversations walk out.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href="#enter" onClick={go('#enter')}>
            Request access <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#ticket" onClick={go('#ticket')}>
            Watch one resolve <span className="arrow">→</span>
          </a>
        </div>
      </div>

      <nav className="station-strip" aria-label="Hall map">
        {STATIONS.map((s) => (
          <a key={s.to} href={s.to} onClick={go(s.to)}>
            <span className="st-name">{s.name}</span>
            <span className="st-dist">{s.dist}</span>
          </a>
        ))}
      </nav>
    </section>
  )
}
