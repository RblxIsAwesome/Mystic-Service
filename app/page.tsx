"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Users,
  LineChart,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Shield,
  MessageCircle,
  Headphones,
  ChevronDown,
  Star,
  Check,
  ExternalLink,
} from "lucide-react"
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
  status?: "online" | "offline" | "maintenance"
}

const services: Service[] = [
  {
    key: "injuries",
    title: "Injuries",
    href: "https://www.logged.tg/auth/mysticv2",
    icon: Users,
    cta: "Open Site",
    featured: true,
    status: "online",
  },
  {
    key: "immortal",
    title: "Immortal",
    href: "https://immortal.st/?code=NTg4MjcwNzEzNDU2NTk5NzAzNQ==",
    icon: LineChart,
    cta: "Open Site",
    status: "online",
  },
  {
    key: "ultima",
    title: "Ultima",
    href: "https://app.beamse.pro/gen/Lxrpz",
    icon: Sparkles,
    cta: "Open Site",
    status: "online",
  },
  {
    key: "Shockify",
    title: "Shockify",
    href: "https://shockify.st/?code=NTg4MjcwNzEzNDU2NTk5NzAzNQ==",
    icon: Clock,
    cta: "Open Site",
    status: "online",
  },
  {
    key: "bypass-tool",
    title: "Bypass Tool",
    href: "https://error.org",
    icon: Zap,
    cta: "Open Tool",
    status: "online",
  },
  {
    key: "hyperlink",
    title: "Hyperlink",
    href: "https://hyperlink-beta.vercel.app",
    icon: Globe,
    cta: "Open Tool",
    status: "online",
  },
]

const features = [
  {
    icon: Sparkles,
    title: "Premium Sites",
    description: "Access to the best non-hooked beaming sites with guaranteed quality and reliability.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Lightning-fast performance with 99% uptime guarantee across all our services.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Connect from anywhere in the world with our distributed network infrastructure.",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Your security is our priority. All sites are thoroughly vetted and verified.",
  },
  {
    icon: MessageCircle,
    title: "Active Community",
    description: "Join thousands of members in our Discord for tips, updates, and support.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help anytime with our dedicated support team via Discord tickets.",
  },
]

const steps = [
  {
    number: "01",
    title: "Join Our Discord",
    description: "Click the Discord button and join our community server to get started.",
  },
  {
    number: "02",
    title: "Browse Our Sites",
    description: "Explore our collection of premium non-hooked beaming sites with real-time status updates.",
  },
  {
    number: "03",
    title: "Start Beaming",
    description: "Select your preferred site and begin your beaming experience with our reliable services.",
  },
]

const benefits = [
  "Non-hooked premium sites",
  "Real-time status monitoring",
  "Active Discord community",
  "24/7 ticket support",
  "Regular site updates",
  "Cookie bypasser included",
  "Multiple site options",
  "Free access for all",
]

const testimonials = [
  {
    quote: "Best beaming server I've ever used. The sites are always online and the community is super helpful.",
    name: "Alex R.",
    role: "Member since 2024",
  },
  {
    quote: "The support team is amazing. Got help within minutes through Discord tickets. Highly recommend!",
    name: "Jordan M.",
    role: "Premium Member",
  },
  {
    quote: "Non-hooked sites that actually work. This is the real deal. Been using it for months with no issues.",
    name: "Chris T.",
    role: "Active Member",
  },
  {
    quote: "The cookie bypasser is a game changer. Everything just works perfectly. 10/10 would recommend.",
    name: "Sam K.",
    role: "Community Member",
  },
]

const faqs = [
  {
    question: "What is LXRPZ GEN?",
    answer: "LXRPZ GEN is a premium beaming server that provides access to verified, non-hooked beaming sites with real-time monitoring and community support.",
  },
  {
    question: "Is it really free?",
    answer: "Yes! All our basic features and sites are completely free to access. Simply join our Discord to get started.",
  },
  {
    question: "How do I get started?",
    answer: "Join our Discord server, browse the available sites, and click on any site to start using it. It's that simple!",
  },
  {
    question: "Are the sites safe to use?",
    answer: "Absolutely. All sites are thoroughly vetted and verified before being added to our collection. We monitor them 24/7 for any issues.",
  },
  {
    question: "What if a site goes offline?",
    answer: "Our monitoring system detects outages immediately and we work to resolve issues as quickly as possible. You can always check the status in real-time.",
  },
  {
    question: "How can I get support?",
    answer: "Join our Discord and open a support ticket. Our team typically responds within minutes.",
  },
]

export default function Home() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [stats, setStats] = useState({ members: 0, sites: 0, uptime: 0 })

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    // Animate stats
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      setStats({
        members: Math.floor(440 * progress),
        sites: Math.floor(6 * progress),
        uptime: Math.floor(99 * progress),
      })
      if (currentStep >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    Object.keys(sectionRefs.current).forEach((key) => {
      const ref = sectionRefs.current[key]
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }))
              observer.unobserve(ref)
            }
          },
          { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        )
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const setRef = (key: string) => (el: HTMLElement | null) => {
    sectionRefs.current[key] = el
  }

  return (
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          animation: gradientShift 30s ease infinite;
          background-size: 200% 200%;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen relative bg-black text-white overflow-x-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black animate-gradientShift" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-t from-red-900/30 via-red-950/20 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#300_1px,transparent_1px),linear-gradient(to_bottom,#300_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.03]" />
        </div>

        <AnimatedParticles />

        {/* HERO */}
        <section className="relative z-10 w-full">
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-24 text-center space-y-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-200 backdrop-blur-md shadow-lg shadow-red-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              #1 BEAMING SERVER
            </div>

            <h1 className="text-balance text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                LXRPZ GEN
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-neutral-400 md:text-xl font-normal leading-relaxed">
              The best beaming server with premium non-hooked sites. Join thousands of satisfied users and experience the difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open("https://discord.gg/MvEpDQ8uNN", "_blank")}
                size="lg"
                className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6 text-base shadow-xl shadow-red-500/30 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
              <Button
                onClick={() => document.getElementById("sites")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                size="lg"
                className="border-2 border-red-500/40 bg-transparent text-red-100 hover:bg-red-500/10 hover:border-red-500/60 backdrop-blur-md font-semibold px-8 py-6 text-base"
              >
                View Sites
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-red-500/20 mt-12 w-full max-w-lg">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{stats.members}+</div>
                <div className="text-sm text-neutral-400 mt-1">Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{stats.sites}</div>
                <div className="text-sm text-neutral-400 mt-1">Premium Sites</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">{stats.uptime}%</div>
                <div className="text-sm text-neutral-400 mt-1">Uptime</div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </div>
          </div>
        </section>

        {/* PREMIUM SITES */}
        <section id="sites" className="relative z-10 py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div
              ref={setRef("sites-header")}
              className={cn(
                "text-center mb-16 transition-all duration-700",
                isVisible["sites-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-red-400 text-sm font-medium uppercase tracking-widest">Premium Sites</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Our Beaming Sites
              </h2>
              <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
                All sites are verified and monitored for uptime.
              </p>
            </div>

            <div
              ref={setRef("sites-grid")}
              className={cn(
                "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700",
                isVisible["sites-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {services.map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.key}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-red-500/20 bg-neutral-950/50 backdrop-blur-md p-6 shadow-xl transition-all duration-300",
                      "hover:bg-neutral-900/60 hover:border-red-500/40 hover:shadow-red-500/20 hover:-translate-y-1",
                      s.featured && "ring-1 ring-red-500/30"
                    )}
                  >
                    {/* Status indicator */}
                    <div className="absolute right-4 top-4 flex items-center gap-2">
                      <span className={cn(
                        "relative flex h-2 w-2",
                        s.status === "online" && "text-green-500",
                        s.status === "offline" && "text-red-500",
                        s.status === "maintenance" && "text-yellow-500"
                      )}>
                        <span className={cn(
                          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                          s.status === "online" && "bg-green-500",
                          s.status === "offline" && "bg-red-500",
                          s.status === "maintenance" && "bg-yellow-500"
                        )} />
                        <span className={cn(
                          "relative inline-flex rounded-full h-2 w-2",
                          s.status === "online" && "bg-green-500",
                          s.status === "offline" && "bg-red-500",
                          s.status === "maintenance" && "bg-yellow-500"
                        )} />
                      </span>
                      <span className="text-xs text-neutral-400 capitalize">{s.status}</span>
                    </div>

                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 transition-all duration-300 group-hover:bg-red-500/20 group-hover:border-red-500/40">
                          <Icon className="h-6 w-6 text-red-400" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-4">{s.title}</h3>

                      <Button
                        onClick={() => window.open(s.href, "_blank")}
                        className="w-full mt-auto bg-red-600/20 border border-red-500/30 text-red-200 hover:bg-red-600/30 hover:border-red-500/50 transition-all duration-300"
                      >
                        {s.cta}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="relative z-10 py-24 border-t border-red-500/10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div
              ref={setRef("features-header")}
              className={cn(
                "text-center mb-16 transition-all duration-700",
                isVisible["features-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-red-400 text-sm font-medium uppercase tracking-widest">Services</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Why Choose Us?
              </h2>
              <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
                We provide the best beaming experience with premium features and dedicated support.
              </p>
            </div>

            <div
              ref={setRef("features-grid")}
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700",
                isVisible["features-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    className="group p-6 rounded-2xl border border-red-500/10 bg-neutral-950/30 hover:bg-neutral-900/40 hover:border-red-500/30 transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 mb-4 group-hover:bg-red-500/20 transition-all duration-300">
                      <Icon className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{f.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative z-10 py-24 border-t border-red-500/10">
          <div className="container mx-auto px-6 max-w-5xl">
            <div
              ref={setRef("steps-header")}
              className={cn(
                "text-center mb-16 transition-all duration-700",
                isVisible["steps-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-red-400 text-sm font-medium uppercase tracking-widest">How It Works</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Get Started in 3 Easy Steps
              </h2>
              <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
                Join thousands of users who trust LXRPZ GEN for their beaming needs.
              </p>
            </div>

            <div
              ref={setRef("steps-grid")}
              className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700",
                isVisible["steps-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {steps.map((step, i) => (
                <div key={step.number} className="relative text-center">
                  <div className="text-6xl font-bold text-red-500/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-sm">{step.description}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-full h-px bg-gradient-to-r from-red-500/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>





        {/* FAQ */}
        <section className="relative z-10 py-24 border-t border-red-500/10">
          <div className="container mx-auto px-6 max-w-3xl">
            <div
              ref={setRef("faq-header")}
              className={cn(
                "text-center mb-16 transition-all duration-700",
                isVisible["faq-header"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <span className="text-red-400 text-sm font-medium uppercase tracking-widest">FAQ</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-neutral-400">
                Got questions? We&apos;ve got answers.
              </p>
            </div>

            <div
              ref={setRef("faq-list")}
              className={cn(
                "space-y-4 transition-all duration-700",
                isVisible["faq-list"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-red-500/20 rounded-xl overflow-hidden bg-neutral-950/50"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-red-500/5 transition-colors"
                  >
                    <span className="font-medium text-white">{faq.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-red-400 transition-transform duration-300",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="px-4 pb-4 text-neutral-400 text-sm">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="relative z-10 py-24 border-t border-red-500/10">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white via-red-100 to-red-300 bg-clip-text text-transparent mb-4">
              Need Help?
            </h2>
            <p className="text-neutral-400 mb-8">
              Join our Discord for instant support and community access!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("https://discord.gg/MvEpDQ8uNN", "_blank")}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord
              </Button>
              <Button
                onClick={() => window.open("https://discord.gg/MvEpDQ8uNN", "_blank")}
                variant="outline"
                size="lg"
                className="border-2 border-red-500/40 bg-transparent text-red-100 hover:bg-red-500/10 hover:border-red-500/60 font-semibold px-8 py-6"
              >
                <Headphones className="mr-2 h-5 w-5" />
                Open Ticket
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-8 border-t border-red-500/10">
          <div className="container mx-auto px-6 text-center text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} LXRPZ GEN. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  )
}
