import React, { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../gsapSetup.js'

const PHASES = [
  "i've been charged TWICE and nobody is reading this. fix it or i'm gone.",
  'intent: refund · tone: heated · plan: pro · tenure: 14 mo',
  'Refund issued, plus a real apology. Sorry for the runaround, Maya.',
]

export default function Ticket() {
  const stage = useRef(null)
  const tag = useRef(null)
  const dist = useRef(null)
  const section = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const state = { d: 42 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: '+=240%',
          scrub: 0.8,
          pin: stage.current,
          pinSpacing: true,
        },
      })
      tl.fromTo(
        tag.current,
        { x: () => -window.innerWidth * 0.28, scale: 1, rotate: -5 },
        { x: () => window.innerWidth * 0.16, scale: 0.55, rotate: -1, ease: 'none', duration: 1 },
        0
      )
      tl.to('.ticket-text p:nth-child(1)', { opacity: 0, duration: 0.1 }, 0.3)
      tl.to('.ticket-text p:nth-child(2)', { opacity: 1, duration: 0.1 }, 0.36)
      tl.to('.ticket-text p:nth-child(2)', { opacity: 0, duration: 0.1 }, 0.68)
      tl.to('.ticket-text p:nth-child(3)', { opacity: 1, duration: 0.1 }, 0.74)
      tl.to(
        state,
        {
          d: 0,
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            if (dist.current) dist.current.textContent = `${Math.max(0, state.d).toFixed(0)} M TO THE SUN`
          },
        },
        0
      )
      tl.to(tag.current, { opacity: 0.35, boxShadow: '0 0 120px rgba(255,213,90,.8)', duration: 0.14 }, 0.86)
    }, section)
    return () => mm.revert()
  }, [])

  return (
    <section className="ticket" id="ticket" ref={section}>
      <div className="ticket-stage" ref={stage}>
        <div className="ticket-caption reveal">
          <h2 className="display">One ticket makes the walk.</h2>
        </div>

        <div className="ticket-tag" ref={tag}>
          <span className="ticket-id">TICKET #4471 · SYNTHETIC · RECORDED FLOW</span>
          <div className="ticket-text">
            <p>{PHASES[0]}</p>
            <p>{PHASES[1]}</p>
            <p>{PHASES[2]}</p>
          </div>
        </div>

        <div className="ticket-dist" ref={dist}>42 M TO THE SUN</div>
        <span className="micro ticket-note">Scroll — walk it the rest of the way</span>
      </div>
    </section>
  )
}
