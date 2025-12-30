"use client"
import { StarField } from "@/components/star-field"
import { Users, LineChart, Clock, ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Service = {
  key: string
  title: string
  href: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  cta: string
  featured?: boolean
}

const services: Service[] = [
  {
    key: "injuries",
    title: "Injuries",
    href: "https://www.logged.tg/auth/mysticgenv2",
    icon: Users,
    cta: "Create Your Site",
    featured: true,
  },
  {
    key: "immortal",
    title: "Immortal",
    href: "https://immortal.rs/?code=NTg4MjcwNzEzNDU2NTk5NzAzNQ==",
    icon: LineChart,
    cta: "Create Your Site",
  },
  {
    key: "splunk",
    title: "SPLUNK",
    href: "https://app.beamers.si/u/MysticGenV2",
    icon: ArrowRight,
    cta: "Create Your Site",
  },
  {
    key: "hyperlink",
    title: "Hyperlink",
    href: "https://hyperlink-beta.vercel.app",
    icon: Clock,
    cta: "Hyperlink tool",
  },
  {
    key: "bypass-tool",
    title: "Bypass Tool",
    href: "https://rbx-tool.com/BypassAge/Mystic Gen V2",
    icon: Clock,
    cta: "Bypass Tool",
  },
  {
    key: "dualhook-bypass",
    title: "Create Dualhook Bypass",
    href: "https://rbx-tool.com/CreateBypass/Mystic Gen V2",
    icon: Clock,
    cta: "Create Your Site",
  },
]

export default function Home() {
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [initialHeight, setInitialHeight] = useState(0)

  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)

  const scrollRef = useRef(0)
  const ticking = useRef(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false)

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) setInitialHeight(window.innerHeight)
  }, [initialHeight])

  // Smooth scroll -> subtle blur/warp driver
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY

      if (ticking.current) return
      ticking.current = true

      window.requestAnimationFrame(() => {
        const maxBlur = 8
        const triggerHeight = Math.max(1, initialHeight * 1.25)
        const t = Math.min(1, scrollRef.current / triggerHeight)

        const eased = t * (2 - t) // easeOutQuad
        setBlurAmount(eased * maxBlur)

        ticking.current = false
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialHeight])

  // Intersection observer for services visibility
  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          if (servicesContentRef.current) servicesObserver.unobserve(servicesContentRef.current)
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    )

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          if (servicesTitleRef.current) servicesTitleObserver.unobserve(servicesTitleRef.current)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )

    if (servicesContentRef.current) servicesObserver.observe(servicesContentRef.current)
    if (servicesTitleRef.current) servicesTitleObserver.observe(servicesTitleRef.current)

    return () => {
      if (servicesContentRef.current) servicesObserver.unobserve(servicesContentRef.current)
      if (servicesTitleRef.current) servicesTitleObserver.unobserve(servicesTitleRef.current)
    }
  }, [])

  // Typewriter effect
  useEffect(() => {
    const text = "Mystic Services"
    let index = 0
    let raf = 0
    let last = 0
    const speedMs = 75

    const tick = (ts: number) => {
      if (!last) last = ts
      const elapsed = ts - last

      if (elapsed >= speedMs) {
        last = ts
        index++
        setTypewriterText(text.slice(0, index))
        if (index >= text.length) {
          setIsTypewriterComplete(true)
          return
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, 350)

    return () => {
      window.clearTimeout(timer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Warp speed effect
  const scaleFactor = 1 + blurAmount / 20
  const warpSpeedStyle: React.CSSProperties = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)",
    willChange: "transform",
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 z-0" style={warpSpeedStyle}>
        <StarField blurAmount={blurAmount} />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_10%,rgba(251,191,36,0.10),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1100px_900px_at_50%_60%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/50" />
        </div>
      </div>

      {/* HERO */}
      <section className="relative z-10 w-full overflow-hidden">
        <div className="mx-auto flex min-h-[44vh] max-w-6xl flex-col items-center justify-center px-4 py-14 sm:py-16">
          <div className="relative text-center">
            <div className="mx-auto inline-flex flex-col items-center gap-4 rounded-2xl border border-yellow-400/20 bg-black/25 px-6 py-6 shadow-[0_0_0_1px_rgba(251,191,36,0.06),0_25px_120px_rgba(0,0,0,0.55)] backdrop-blur-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-200">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-300/90 shadow-[0_0_18px_rgba(251,191,36,0.65)]" />
                #1 Gen
              </div>

              <h1 className="text-balance text-4xl font-bold text-white md:text-6xl font-heading tracking-tight">
                <span className="relative">
                  {typewriterText}
                  {!isTypewriterComplete && (
                    <span className="ml-1 align-baseline text-yellow-400/90 animate-pulse">|</span>
                  )}
                </span>
              </h1>

              <p className="max-w-xl text-pretty text-sm text-yellow-200/90 sm:text-base font-mono">
                MysticGen | #1 Sites — We are the best beaming site out there!
              </p>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => window.open("https://discord.gg/MvEpDQ8uNN", "_blank")}
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-yellow-400/60 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Discord Server
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 pb-12 pt-2 sm:pb-16">
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-5 text-center text-3xl font-bold font-heading text-yellow-300 transition-all duration-700 ease-out will-change-transform",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
          >
            Services
          </h2>

          <div
            ref={servicesContentRef}
            className={cn(
              "mx-auto max-w-6xl transition-all duration-700 ease-out will-change-transform",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
            )}
          >
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.key}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border bg-black/30 p-4 backdrop-blur-md",
                      "border-yellow-400/25 shadow-[0_0_0_1px_rgba(251,191,36,0.06),0_10px_40px_rgba(0,0,0,0.55)]",
                      "transition-all duration-500 ease-out will-change-transform",
                      "hover:-translate-y-1 hover:border-yellow-300/50 hover:bg-black/40",
                      "hover:shadow-[0_0_0_1px_rgba(251,191,36,0.10),0_16px_60px_rgba(0,0,0,0.62)]",
                      s.featured && "ring-1 ring-yellow-400/25",
                    )}
                  >
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-yellow-400/12 blur-3xl" />
                      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-transparent" />
                    </div>

                    {s.featured && (
                      <div className="absolute right-3 top-3 rounded-full border border-yellow-300/40 bg-yellow-500/15 px-2 py-1 text-xs font-semibold text-yellow-200">
                        ⭐ Featured
                      </div>
                    )}

                    <div className="relative flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-400/25 bg-yellow-500/10">
                        <Icon
                          className="h-5 w-5 text-yellow-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.35)]"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-semibold font-heading text-yellow-100">{s.title}</h3>
                      </div>
                    </div>

                    <div className="relative mt-4">
                      <Button
                        onClick={() => window.open(s.href, "_blank")}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full bg-transparent text-white",
                          "border-yellow-400/60",
                          "transition-all duration-300",
                          "hover:bg-yellow-500 hover:text-black hover:border-yellow-300",
                        )}
                      >
                        {s.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
