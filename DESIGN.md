# Design System — Relay / The Amber Hall

Recorded from the built landing page (`index.html`, `src/`). World: monofrequency "indoor weather sun" — one vast sodium-amber installation hall; scrolling is walking the long axis toward the sun.

## Atmosphere

An Eliasson-scale light installation rendered as a webpage. Everything is flattened to a single frequency of amber; black exists only as silhouette. The mood is monumental, hushed, inevitable — a queue dissolving into light rather than a software pitch.

## Color

| Token | Value | Role |
|---|---|---|
| `--sun` | `#FFC24A` | Signature amber; sun text on ink, primary field tone |
| `--mirror-sun` | `#FFD55A` | The disc itself and its glow |
| `--haze` | `#E5A32B` | Body/page base |
| `--deep` | `#C88A1E` | Mid-field, scrollbar track |
| `--dusk` | `#A97615` | Lower hall |
| `--ground` | `#9A6A12` | Deepest field tone (contrast floor ≥4.4:1 for ink) |
| `--ink` | `#0B0B0B` | Only ink: all text, figures, buttons, footer band |

Hall backdrop is a fixed `linear-gradient(180deg, #FFD56B → #F5B53A → haze → deep → dusk → ground)`. One accent only (mirror sun); never introduce a second hue. Secondary text stays solid `--ink` (translucent variants fail contrast on amber).

## Typography

- **Display:** `Anton` (self-hosted via Fontsource) — uppercase, `line-height: .92`, sizes `clamp(2.2rem–10rem, ~vw)`. The monumental voice; set low, left or centered, never tracked.
- **Body:** `Archivo Variable` — weight ~420, `line-height: 1.65`, measure ≤34rem.
- **Data/measurement:** `IBM Plex Mono` — `.72rem` floor (11.5px), `letter-spacing: .18–.4em`, uppercase. Only for telemetry, station markers, IDs — earned as instrumentation, never for prose.
- No kicker/eyebrow labels above headings. No section numbers except the station distance markers, which are wayfinding.

## Components

- **Hall (fixed backdrop):** gradient field + `.sun` disc (full circle centered on the 30vh mirror line, `::before` radial-gradient halo, `::after` deeper lower half), three `.mist` blurred haze layers drifting on a shared slow clock, `.grain` SVG-turbulence overlay (multiply, steps(4) jitter). Sun scales 1→2.7 on a master ScrollTrigger scrub = approach.
- **Buttons:** rectangular, 1px ink border, mono caps `.75rem/.2em`, arrow `→` that translates +5px on hover. Variants: `btn-solid` (ink/sun), `btn-ghost`, `btn-sun`. No pills, no radii beyond 0.
- **Telemetry rail:** vertical mono label/value pairs separated by hairlines (`ink-40`).
- **Station markers:** dot + mono distance text (`STATION · NN M FROM THE SUN`) — distances count down as the visitor walks.
- **Ticket tag:** the one literal object — ink card, punched hole (`::before`), sun mono text, luggage-tag physics (tilt −5°→−1°).
- **Station strip:** hairline-topped grid of dot + name + distance; the page's map.
- **Footer:** ink plinth band, sun text, hairline `rgba(255,194,74,.25)`.

## Motion

- GSAP ScrollSmoother (`smooth: 1.4`, `effects: true`) on `#smooth-wrapper > #smooth-content`; ScrollTrigger for the sun scrub and reveals; ScrollToPlugin for anchor nav.
- Reveals: `expo.out`, once, `y:46→0` (+`x:±36` for stations) at `top 82%` — quiet, never identical.
- The pinned ticket journey: 240% scroll, tag translates left→right shrinking (depth), text crossfades raw→parsed→resolved, distance counts 42→0 m.
- `prefers-reduced-motion`: no smoother, no mist drift, reveals shown static.

## Rules this world enforces

- No boxes, cards, glass, or gradients-as-decoration: sections are open air over one continuous hall.
- Dark ink only; amber does all chromatic work. The footer may invert to an ink band.
- Silhouette cursor (`mix-blend-mode: multiply` blob + lagged twin) on fine pointers only.
- Mobile (<860px): mirror collapses first — sun becomes a wall semicircle; rail and most strip items hide; stations left-align.
- Copy voice: imperative, physical, hall-aware ("walk", "floor", "the light"). Figures are labeled illustrative — fictional product.
