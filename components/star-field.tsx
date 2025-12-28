"use client"

import { useEffect, useRef } from "react"

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  angle: number
}

interface StarFieldProps {
  blurAmount?: number
}

export function StarField({ blurAmount = 0 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<ShootingStar[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const createShootingStar = () => {
      const isMobile = window.innerWidth < 768
      return {
        x: Math.random() * canvas.width + canvas.width * 0.2,
        y: Math.random() * canvas.height * 0.6,
        length: Math.random() * (isMobile ? 60 : 100) + (isMobile ? 40 : 60),
        speed: Math.random() * (isMobile ? 4 : 6) + (isMobile ? 3 : 4),
        opacity: Math.random() * 0.4 + 0.6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      }
    }

    // Initialize with some shooting stars
    for (let i = 0; i < 5; i++) {
      starsRef.current.push(createShootingStar())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Randomly add new shooting stars
      if (Math.random() < 0.015 && starsRef.current.length < 12) {
        starsRef.current.push(createShootingStar())
      }

      // Update and draw shooting stars
      starsRef.current = starsRef.current.filter((star) => {
        // Move star diagonally
        star.x -= Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Draw the shooting star with golden yellow gradient tail
        const endX = star.x + Math.cos(star.angle) * star.length
        const endY = star.y - Math.sin(star.angle) * star.length

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(0.3, `rgba(251, 191, 36, ${star.opacity * 0.8})`)
        gradient.addColorStop(0.6, `rgba(245, 158, 11, ${star.opacity * 0.5})`)
        gradient.addColorStop(1, `rgba(251, 191, 36, 0)`)

        ctx.beginPath()
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Add a bright head
        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Remove star if it's off screen
        return star.x > -star.length && star.y < canvas.height + star.length
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Apply blur filter
  const blurStyle = {
    filter: `blur(${blurAmount}px)`,
    transition: "filter 0.2s ease-out",
  }

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={blurStyle} aria-hidden="true" />
}
