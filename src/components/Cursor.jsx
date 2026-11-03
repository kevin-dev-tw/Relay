import React, { useEffect, useRef } from 'react'
import { gsap } from '../gsapSetup.js'

export default function Cursor() {
  const dot = useRef(null)
  const twin = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const moveDot = gsap.quickTo(dot.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const moveDotY = gsap.quickTo(dot.current, 'y', { duration: 0.35, ease: 'power3.out' })
    const moveTwin = gsap.quickTo(twin.current, 'x', { duration: 0.55, ease: 'power3.out' })
    const moveTwinY = gsap.quickTo(twin.current, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (e) => {
      document.documentElement.classList.add('cursor-on')
      moveDot(e.clientX - 8)
      moveDotY(e.clientY - 8)
      moveTwin(e.clientX - 8)
      moveTwinY(e.clientY - 30)
    }
    const onOver = (e) => {
      const hot = e.target.closest('a, button, input, [data-cursor]')
      document.documentElement.classList.toggle('cursor-hot', !!hot)
      const dark = e.target.closest('.footer, .ticket-tag, .btn-solid, .menu-overlay')
      document.documentElement.classList.toggle('cursor-inv', !!dark)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.classList.remove('cursor-on', 'cursor-hot', 'cursor-inv')
    }
  }, [])

  return (
    <>
      <div ref={twin} className="cursor-twin" aria-hidden="true" />
      <div ref={dot} className="cursor" aria-hidden="true" />
    </>
  )
}
