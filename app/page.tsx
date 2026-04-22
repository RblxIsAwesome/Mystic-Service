"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Users, LineChart, Clock, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnimatedParticles } from "@/components/animated-particles"

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
    href: "https://www.logged.tg/auth/mysticv2",
    icon: Users,
    cta: "Create Your Site",
    featured: true,
  },
  {
    key: "immortal",
    title: "Immortal",
    href: "https://beaming.cool/?code=NTg4MjcwNzEzNDU2NTk5NzAzNQ==",
    icon: LineChart,
    cta: "Create Your Site",
  },
  {
    key: "ultima",
    title: "Ultima",
    href: "https://app.beamse.pro/gen/Lxrpz",
    icon: Sparkles,
    cta: "Create Your Site",
  },
  {
    key: "Shockify",
    title: "Shockify",
    href: "https://shockify.st/?code=NTg4MjcwNzEzNDU2NTk5NzAzNQ==",
    icon: Clock,
    cta: "Create Your Site",
  },
  {
    key: "bypass-tool",
    title: "Bypass Tool",
    href: "https://error.org",
    icon: Clock,
    cta: "Bypass Tool",
  },
  {
    key: "Cookie Refresher",
    title: "Gambling Site for rbx",
    href: "https://bloxgame.us/a/cheez",
    icon: Clock,
    cta: "Gamble Your Life Away",
  },
  {
    key: "hyperlink",
    title: "Hyperlink",
    href: "https://hyperlink-beta.vercel.app",
    icon: Clock,
    cta: "Hyperlink tool",
  },
]

export default function Home() {
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)

  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)

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

  return (
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradientShift {
          animation: gradientShift 30s ease infinite;
          background-size: 200% 200%;
        }
        @keyframes smokeRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>

      <div className="min-h-screen relative bg-black text-white overflow-x-hidden">
        {/* Background with red glow */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black animate-gradientShift"
            aria-hidden="true"
          />
          {/* Red glow in center */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/20 rounded-full blur-[150px]"
            aria-hidden="true"
          />
          {/* Secondary red glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-t from-red-900/30 via-red-950/20 to-transparent"
            aria-hidden="true"
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#300_1px,transparent_1px),linear-gradient(to_bottom,#300_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.03]"
            aria-hidden="true"
          />
        </div>

        <AnimatedParticles />

        {/* HERO */}
        <section className="relative z-10 w-full">
          <div className="mx-auto flex min-h-[65vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center space-y-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-200 backdrop-blur-md shadow-lg shadow-red-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              #1 Gen Sites
            </div>

            <h1 className="text-balance text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                Lxrpz Gen
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-neutral-400 md:text-xl font-normal leading-relaxed">
              LxrpzGen | #1 Sites — We are the best beaming site out there!
            </p>

            <Button
              onClick={() => window.open("https://discord.gg/MvEpDQ8uNN", "_blank")}
              size="lg"
              className="relative overflow-hidden border-2 border-red-500/40 bg-red-500/10 text-red-100 hover:bg-red-500/20 hover:border-red-500/60 backdrop-blur-md font-semibold px-8 py-6 text-base shadow-xl shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="mr-2 h-5 w-5 relative z-10" />
              <span className="relative z-10">Join Discord</span>
            </Button>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative z-10 pb-24 pt-8">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2
              ref={servicesTitleRef}
              className={cn(
                "mb-16 text-center text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent transition-all duration-700 ease-out",
                isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              Services
            </h2>

            <div
              ref={servicesContentRef}
              className={cn(
                "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ease-out",
                isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.key}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-red-500/20 bg-neutral-950/50 backdrop-blur-md p-6 shadow-xl shadow-red-950/30 transition-all duration-300 ease-out",
                      "hover:bg-neutral-900/60 hover:border-red-500/40 hover:shadow-red-500/20 hover:-translate-y-1",
                      s.featured && "ring-1 ring-red-500/30 shadow-red-500/20",
                    )}
                  >
                    {s.featured && (
                      <div className="absolute right-4 top-4 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-red-200 select-none">
                        Featured
                      </div>
                    )}

                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-red-500/20 group-hover:border-red-500/40 group-hover:shadow-lg group-hover:shadow-red-500/30">
                          <Icon className="h-6 w-6 text-red-400" aria-hidden="true" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{s.title}</h3>
                      </div>

                      <Button
                        onClick={() => window.open(s.href, "_blank")}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full mt-4 border-2 border-red-500/30 bg-red-500/5 text-red-200 hover:bg-red-500/15 hover:text-white hover:border-red-500/50 backdrop-blur-sm transition-all duration-300 font-medium text-sm",
                          "outline-none focus:ring-2 focus:ring-red-500/50 group/btn",
                        )}
                      >
                        <span className="relative z-10">{s.cta}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
