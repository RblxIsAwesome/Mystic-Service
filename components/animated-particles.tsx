"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  opacity: number
  fadeDirection: number
}

export function AnimatedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Particle[] = []
    const particleCount = 50

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Draw particle with glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Glow effect - Red theme
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `rgba(255, 100, 100, ${particle.opacity})`)
        gradient.addColorStop(0.5, `rgba(220, 38, 38, ${particle.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(185, 28, 28, 0)")

        ctx.fillStyle = gradient
        ctx.fill()

        // Move particle upward
        particle.y -= particle.speedY

        // Fade in/out effect
        particle.opacity += particle.fadeDirection * 0.005
        if (particle.opacity <= 0.1 || particle.opacity >= 0.8) {
          particle.fadeDirection *= -1
        }

        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10
          particle.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true" />
}
