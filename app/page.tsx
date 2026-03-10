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
    href: "https://immortal.rs/?code=NTg4MjcwNzEzNDU2NTk5NzAzNQ==",
    icon: LineChart,
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
      `}</style>

      <div className="min-h-screen relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-slate-900 to-indigo-950/60 animate-gradientShift"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.07]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-blue-950/30"
            aria-hidden="true"
          />
        </div>

        <AnimatedParticles />

        {/* HERO */}
        <section className="relative z-10 w-full">
          <div className="mx-auto flex min-h-[65vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center space-y-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-200 backdrop-blur-md shadow-lg shadow-blue-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
              </span>
              #1 Gen Sites
            </div>

            <h1 className="text-balance text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Mystic Services
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-slate-300 md:text-xl font-normal leading-relaxed">
              MysticGen | #1 Sites — We are the best beaming site out there!
            </p>

            <Button
              onClick={() => window.open("https://discord.gg/MvEpDQ8uNN", "_blank")}
              size="lg"
              className="relative overflow-hidden border-2 border-blue-400/40 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20 hover:border-blue-400/60 backdrop-blur-md font-semibold px-8 py-6 text-base shadow-xl shadow-blue-500/20 hover:shadow-blue-400/30 transition-all duration-300 hover:scale-105 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                "mb-16 text-center text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-300 bg-clip-text text-transparent transition-all duration-700 ease-out",
                isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              Services
            </h2>

            <div
              ref={servicesContentRef}
              className={cn(
                "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ease-out",
                isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.key}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-blue-400/20 bg-slate-900/30 backdrop-blur-md p-6 shadow-xl shadow-blue-950/30 transition-all duration-300 ease-out",
                      "hover:bg-slate-900/50 hover:border-blue-400/50 hover:shadow-blue-500/30 hover:-translate-y-1",
                      s.featured && "ring-1 ring-blue-400/30 shadow-blue-500/20",
                    )}
                  >
                    {s.featured && (
                      <div className="absolute right-4 top-4 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-blue-200 select-none">
                        Featured
                      </div>
                    )}

                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 border border-blue-400/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-400/20 group-hover:border-blue-400/40 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                          <Icon className="h-6 w-6 text-blue-300" aria-hidden="true" />
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
                          "w-full mt-4 border-2 border-blue-400/30 bg-blue-500/5 text-blue-200 hover:bg-blue-400/15 hover:text-white hover:border-blue-400/50 backdrop-blur-sm transition-all duration-300 font-medium text-sm",
                          "outline-none focus:ring-2 focus:ring-blue-400/50 group/btn",
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
