import React from 'react'

const STATIONS = [
  {
    dist: 'STATION · 58 M FROM THE SUN',
    title: 'They arrive.',
    copy: 'Chat, email, and social all drop into a single queue on the floor. No triage, no routing tables, no morning backlog sort.',
    side: 'left',
  },
  {
    dist: 'STATION · 34 M FROM THE SUN',
    title: 'The engine reads.',
    copy: 'Intent, tone, account state, history. Each conversation is understood before a human would have finished opening it.',
    side: 'right',
  },
  {
    dist: 'STATION · 12 M FROM THE SUN',
    title: 'It resolves.',
    copy: 'Routine volume is answered end-to-end in your voice. The rest walks to your team with full context already attached.',
    side: 'left',
  },
]

export default function Walk() {
  return (
    <section className="walk" id="walk">
      <div className="walk-head reveal">
        <h2 className="display">The walk to resolution.</h2>
        <p className="body-copy">
          Between the door and the sun, three things happen. They happen to every
          ticket, every time, in under a minute.
        </p>
      </div>

      {STATIONS.map((s) => (
        <article key={s.title} className={`station ${s.side === 'right' ? 'station-right' : ''} reveal`}>
          <div className="station-marker">
            <span className="dot" />
            <span className="micro">{s.dist}</span>
          </div>
          <h3 className="display">{s.title}</h3>
          <p className="body-copy">{s.copy}</p>
        </article>
      ))}
    </section>
  )
}
