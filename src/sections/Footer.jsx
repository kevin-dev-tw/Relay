import React from 'react'
import { scrollToSection } from '../scroll.js'

export default function Footer() {
  const go = (to) => (e) => {
    e.preventDefault()
    scrollToSection(to)
  }
  return (
    <footer className="footer">
      <span className="brand-name">Relay</span>
      <nav className="footer-links" aria-label="Footer">
        <a href="#walk" onClick={go('#walk')}>The Walk</a>
        <a href="#ticket" onClick={go('#ticket')}>One Ticket</a>
        <a href="#mirror" onClick={go('#mirror')}>The Mirror</a>
        <a href="#queue" onClick={go('#queue')}>Back to the door</a>
      </nav>
      <p className="footer-fine">
        A fictional product study; every figure illustrative. Built in one hall, under one sun.
      </p>
    </footer>
  )
}
