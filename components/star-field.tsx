"use client"

import { useEffect, useRef } from "react"

type ShootingStar = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  drift: number
  size: number
  brightness: number
  hueShift: number
}

type StarFieldProps = {
  /**
   * Drives subtle warp intensity (passed from scroll).
   * Keep small numbers (0..8ish) like in your page.tsx.
   */
  blurAmount?: number
}

/**
 * Background concept stays the same: a shooting-star field.
 * Upgrades:
 * - Prop support (fixes your current <StarField blurAmount={...} /> usage)
 * - Slightly faster spawn cadence (but capped)
 * - Better glow discipline (small halo, less “washed” strokes)
 * - Slightly smoother trails (time-based, not frame-based)
 */
export function StarField({ blurAmount = 0 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<ShootingStar[]>([])
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1) // cap DPR for perf/consistency
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const createShootingStar = (): ShootingStar => {
      const edge = Math.floor(Math.random() * 4)
      let x = 0
      let y = 0

      if (edge === 0) {
        x = Math.random() * width
        y = -50
      } else if (edge === 1) {
        x = width + 50
        y = Math.random() * height
      } else if (edge === 2) {
        x = Math.random() * width
        y = height + 50
      } else {
        x = -50
        y = Math.random() * height
      }

      const depth = Math.random()
      let speed = 0
      let size = 0
      let brightness = 0

      if (depth < 0.55) {
        speed = Math.random() * 2 + 6.2
        size = 1
        brightness = 0.28
      } else if (depth < 0.9) {
        speed = Math.random() * 3 + 10
        size = 1.6
        brightness = 0.55
      } else {
        speed = Math.random() * 4 + 14.5
        size = 2.4
        brightness = 0.9
      }

      const baseAngle = edge === 0 ? Math.PI / 2 : edge === 1 ? Math.PI : edge === 2 ? -Math.PI / 2 : 0
      const angle = baseAngle + (Math.random() - 0.5) * 0.55

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 45 + 95,
        drift: (Math.random() - 0.5) * 0.012,
        size,
        brightness,
        // tiny warm shift to match yellow theme but keep mostly white
        hueShift: (Math.random() - 0.5) * 12, // degrees
      }
    }

    // Initial stars (slightly more populated)
    starsRef.current = []
    for (let i = 0; i < 18; i++) starsRef.current.push(createShootingStar())

    let lastTs = performance.now()

    const animate = (ts: number) => {
      const dt = Math.min(48, ts - lastTs) / 16.6667 // normalize to ~60fps units
      lastTs = ts

      // Trail: slightly smoother + less muddy
      // (Lower alpha = longer trails; higher alpha = shorter trails)
      ctx.fillStyle = "rgba(0, 0, 0, 0.14)"
      ctx.fillRect(0, 0, width, height)

      const warp = Math.min(1.4, 1 + blurAmount / 10) // subtle
      const maxStars = 34

      for (let i = starsRef.current.length - 1; i >= 0; i--) {
        const star = starsRef.current[i]
        star.vx += star.drift * dt
        star.vy += star.drift * dt

        star.x += star.vx * dt * warp
        star.y += star.vy * dt * warp
        star.life += dt

        const fadeIn = star.life / 18
        const fadeOut = (star.maxLife - star.life) / 26
        const alpha = Math.min(1, fadeIn, fadeOut) * star.brightness

        // “Glow discipline”: small halo + crisp core
        const trailLen = 3.2 * warp
        const x2 = star.x - star.vx * trailLen
        const y2 = star.y - star.vy * trailLen

        // halo
        ctx.save()
        ctx.globalCompositeOperation = "lighter"
        ctx.beginPath()
        ctx.strokeStyle = `rgba(251,191,36,${alpha * 0.18})`
        ctx.lineWidth = star.size * 2.2
        ctx.lineCap = "round"
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()

        // core
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.lineWidth = star.size
        ctx.lineCap = "round"
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        if (star.life > star.maxLife) {
          starsRef.current.splice(i, 1)
        }
      }

      // Spawn: a bit faster than before, with a gentle pulsation, capped
      const pulse = (Math.sin(ts * 0.00055) + 1) / 2 // 0..1
      const spawnChance = 0.055 + pulse * 0.02 // ~0.055..0.075 (faster than 0.045)
      if (Math.random() < spawnChance && starsRef.current.length < maxStars) {
        starsRef.current.push(createShootingStar())
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    ctx.clearRect(0, 0, width, height)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [blurAmount])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

export default StarField
