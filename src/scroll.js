let smoother = null

export function setSmoother(instance) {
  smoother = instance
}

export function pauseSmoother(paused) {
  if (smoother) smoother.paused(paused)
}

export function scrollToSection(target) {
  if (smoother) {
    smoother.scrollTo(target, true)
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
