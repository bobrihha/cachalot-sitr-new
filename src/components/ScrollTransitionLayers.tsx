import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

type TransitionId =
  | 'painpoints-services'
  | 'before-cases'
  | 'before-modules'
  | 'before-ai-architect'

type TransitionTheme = {
  gradient: string
  accent: string
}

const themes: Record<TransitionId, TransitionTheme> = {
  'painpoints-services': {
    gradient:
      'radial-gradient(80% 60% at 50% 30%, rgba(34, 211, 238, 0.25) 0%, rgba(2, 6, 23, 0) 60%), linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.7) 45%, rgba(2, 132, 199, 0.25) 100%)',
    accent: 'rgba(34, 211, 238, 0.35)',
  },
  'before-cases': {
    gradient:
      'radial-gradient(70% 55% at 55% 30%, rgba(56, 189, 248, 0.22) 0%, rgba(2, 6, 23, 0) 60%), linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(3, 7, 18, 0.75) 45%, rgba(59, 130, 246, 0.22) 100%)',
    accent: 'rgba(56, 189, 248, 0.32)',
  },
  'before-modules': {
    gradient:
      'radial-gradient(75% 55% at 45% 30%, rgba(45, 212, 191, 0.20) 0%, rgba(2, 6, 23, 0) 60%), linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.75) 45%, rgba(20, 184, 166, 0.20) 100%)',
    accent: 'rgba(45, 212, 191, 0.30)',
  },
  'before-ai-architect': {
    gradient:
      'radial-gradient(85% 65% at 50% 30%, rgba(34, 211, 238, 0.18) 0%, rgba(2, 6, 23, 0) 65%), linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, rgba(2, 6, 23, 0.78) 45%, rgba(6, 182, 212, 0.18) 100%)',
    accent: 'rgba(34, 211, 238, 0.26)',
  },
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))

function useScrollVelocity() {
  const [velocityNorm, setVelocityNorm] = useState(0)
  const lastYRef = useRef<number | null>(null)
  const lastTRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const velocityRef = useRef(0)

  useEffect(() => {
    const sample = (time: number) => {
      const currentY = window.scrollY ?? 0
      const lastY = lastYRef.current
      const lastT = lastTRef.current

      if (lastY != null && lastT != null) {
        const dy = currentY - lastY
        const dt = Math.max(16, time - lastT)
        const v = Math.abs(dy) / dt
        const smoothed = velocityRef.current * 0.85 + v * 0.15
        velocityRef.current = smoothed
        setVelocityNorm(clamp01(smoothed / 1.4))
      }

      lastYRef.current = currentY
      lastTRef.current = time
      rafRef.current = window.requestAnimationFrame(sample)
    }

    rafRef.current = window.requestAnimationFrame(sample)
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return velocityNorm
}

function supportsFinePointer() {
  return window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches ?? false
}

function supportsCoarsePointer() {
  return window.matchMedia?.('(pointer: coarse)')?.matches ?? false
}

export function ScrollTransitionLayers() {
  const prefersReducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<TransitionId | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const velocity = useScrollVelocity()

  const isMobileSimplified = useMemo(() => {
    if (prefersReducedMotion) return true
    if (typeof window === 'undefined') return true
    return supportsCoarsePointer()
  }, [prefersReducedMotion])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-transition]'))
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.find((e) => e.isIntersecting)
        if (!intersecting) {
          setActiveId(null)
          return
        }
        const id = (intersecting.target as HTMLElement).dataset.transition as TransitionId | undefined
        if (!id) return
        setActiveId(id)
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: '-45% 0px -45% 0px',
      },
    )

    for (const node of nodes) observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (isMobileSimplified) return
    if (!activeId) return
    if (!supportsFinePointer()) return

    const el = overlayRef.current
    if (!el) return

    let rafId: number | null = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const maxShift = 3

    const onMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      targetX = nx
      targetY = ny
    }

    const tick = () => {
      currentX = currentX * 0.85 + targetX * 0.15
      currentY = currentY * 0.85 + targetY * 0.15
      const k = maxShift * (0.35 + velocity * 0.65)
      el.style.setProperty('--tx', `${currentX * k}px`)
      el.style.setProperty('--ty', `${currentY * k}px`)
      rafId = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    rafId = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (rafId != null) window.cancelAnimationFrame(rafId)
      el.style.removeProperty('--tx')
      el.style.removeProperty('--ty')
    }
  }, [activeId, isMobileSimplified, prefersReducedMotion, velocity])

  const theme = activeId ? themes[activeId] : null

  const opacity = useMemo(() => {
    if (!activeId) return 0
    if (prefersReducedMotion) return 0.18
    const base = 0.10
    const gain = 0.24
    return base + gain * velocity
  }, [activeId, prefersReducedMotion, velocity])

  const blurPx = useMemo(() => {
    if (!activeId) return 0
    if (prefersReducedMotion) return 0
    if (isMobileSimplified) return 0
    return Math.round(2 + 7 * velocity)
  }, [activeId, isMobileSimplified, prefersReducedMotion, velocity])

  return (
    <motion.div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      initial={false}
      animate={{ opacity }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.3 + 0.3 * velocity, ease: [0.2, 0.9, 0.2, 1] }
      }
      style={
        theme
          ? ({
              backgroundImage: theme.gradient,
              filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
              transform: 'translate3d(var(--tx, 0px), var(--ty, 0px), 0)',
            } as const)
          : undefined
      }
    >
      {theme ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0) 6px, rgba(255,255,255,0) 10px)',
            opacity: prefersReducedMotion ? 0.08 : 0.12 + velocity * 0.08,
            mixBlendMode: 'screen',
          }}
        />
      ) : null}

      {theme ? (
        <div
          className="absolute inset-0"
          style={{
            boxShadow: `inset 0 -120px 160px -120px ${theme.accent}`,
            opacity: prefersReducedMotion ? 0.25 : 0.15 + velocity * 0.2,
          }}
        />
      ) : null}
    </motion.div>
  )
}
