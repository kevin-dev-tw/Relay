import React from 'react'

const LINES = [
  '81% of routine volume closed end-to-end',
  '4:12 median walk to resolution',
  '12,402 conversations resolved today',
]

export default function Mirror() {
  return (
    <section className="mirror" id="mirror">
      <div className="etched">
        {LINES.map((l) => (
          <p key={l} className="etched-line reveal">{l}</p>
        ))}
      </div>
      <p className="micro etched-note">Carved into the floor · figures illustrative</p>
    </section>
  )
}
