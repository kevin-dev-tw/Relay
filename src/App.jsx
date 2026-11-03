import React, { useLayoutEffect } from 'react'
import { gsap, ScrollSmoother } from './gsapSetup.js'
import { setSmoother } from './scroll.js'
import Hall from './components/Hall.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Walk from './sections/Walk.jsx'
import Ticket from './sections/Ticket.jsx'
import Mirror from './sections/Mirror.jsx'
import Humans from './sections/Humans.jsx'
import Enter from './sections/Enter.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const flat = new URLSearchParams(window.location.search).has('flat')
    const ctx = gsap.context(() => {
      let smoother = null
      if (!reduced && !flat) {
        smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.4,
          effects: true,
          smoothTouch: 0.1,
        })
        setSmoother(smoother)
      } else {
        document.documentElement.classList.add('no-motion')
      }

      // Dev/verification: ?y=<px> jumps the scroll for headless captures.
      const jump = new URLSearchParams(window.location.search).get('y')
      if (jump) {
        const y = Number(jump)
        requestAnimationFrame(() => {
          if (smoother) smoother.scrollTop(y)
          else window.scrollTo(0, y)
        })
      }

      // The walk toward the sun: it grows as you descend the hall.
      gsap.fromTo(
        '.sun',
        { scale: 1 },
        {
          scale: 2.7,
          ease: 'none',
          scrollTrigger: {
            trigger: '#smooth-content',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        }
      )

      // Mist drifts on its own clock.
      if (!reduced) {
        gsap.to('.mist-1', { xPercent: 14, duration: 46, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to('.mist-2', { xPercent: -10, duration: 38, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        gsap.to('.mist-3', { xPercent: 8, duration: 55, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }

      // Section reveals — quiet, once; stations lean in from their own side.
      gsap.utils.toArray('.reveal').forEach((el) => {
        const x = el.classList.contains('station-right') ? 36 : el.classList.contains('station') ? -36 : 0
        gsap.fromTo(
          el,
          { opacity: 0, y: 46, x },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Hall />
      <Nav />
      <Cursor />
      <div id="smooth-wrapper">
        <main id="smooth-content">
          <Hero />
          <Walk />
          <Ticket />
          <Mirror />
          <Humans />
          <Enter />
          <Footer />
        </main>
      </div>
    </>
  )
}
