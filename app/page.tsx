"use client"
import { StarField } from "@/components/star-field"
import { ChevronDown, Users, LineChart, Clock, ArrowRight } from "lucide-react"
import { ChatbotModal } from "@/components/chatbot-modal"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [initialHeight, setInitialHeight] = useState(0)
  const [isHeadingVisible, setIsHeadingVisible] = useState(false) // Declare setIsHeadingVisible
  const headingRef = useRef<HTMLHeadingElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false)

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  // Handle scroll events to calculate blur amount
  useEffect(() => {
    const handleScroll = () => {
      // Store the current scroll position
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Calculate blur based on scroll position
          // Reduced max blur from 20px to 8px for a more subtle effect
          const maxBlur = 8
          // Increased trigger height to make the effect develop more slowly
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          // Update last scroll position for next comparison
          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  // Intersection observer for visibility
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          // Once visible, no need to observe anymore
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          // Once visible, no need to observe anymore
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          // Once visible, no need to observe anymore
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
    }
  }, [])

  // Typewriter effect for the main heading
  useEffect(() => {
    const text = "Mystic Services"
    let index = 0

    const typeWriter = () => {
      if (index < text.length) {
        setTypewriterText(text.slice(0, index + 1))
        index++
        setTimeout(typeWriter, 150) // Adjust speed here (150ms per character)
      } else {
        setIsTypewriterComplete(true)
      }
    }

    // Start typewriter after a short delay
    const timer = setTimeout(typeWriter, 500)

    return () => clearTimeout(timer)
  }, [])

  // Calculate scale factor based on blur amount
  // Maintain the same scaling effect even with reduced blur
  const scaleFactor = 1 + blurAmount / 16 // Adjusted to maintain similar scaling with reduced blur

  // Add a warp speed effect to stars based on blur amount
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out", // Slightly longer transition for smoother effect
  }

  // Scroll to services section
  const scrollToServices = () => {
    if (servicesSectionRef.current) {
      servicesSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Open chatbot modal
  const openChatbot = () => {
    setIsChatbotOpen(true)
  }

  // Close chatbot modal
  const closeChatbot = () => {
    setIsChatbotOpen(false)
  }

  // Use fixed height for hero section based on initial viewport height
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="px-6 py-4 inline-block relative">
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">
                {typewriterText}
                {!isTypewriterComplete && <span className="animate-pulse text-red-500">|</span>}
              </h1>
              <div className="mt-4 flex flex-col items-center gap-4">
                <p className="text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">#1 Gen Sites</p>
                <div className="flex gap-3">
                  <Button
                    onClick={scrollToServices}
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Services
                  </Button>
                  <Button
                    onClick={() => window.open("https://discord.gg/xuKueRnjQM", "_blank")}
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Contact
                  </Button>
                </div>
                <div className="text-sm text-red-400 font-mono">
                  MysticGen | #1 Sites We are the best beaming site out there!
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToServices}
            role="button"
            aria-label="Scroll to about section"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToServices()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </section>

      <section
        ref={servicesSectionRef}
        id="services"
        className="py-20 bg-gradient-to-b from-black via-red-950 to-red-800 text-white"
      >
        <div className="container mx-auto px-4">
          <h2
            ref={servicesTitleRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out text-red-300",
              isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Services
          </h2>
          <div
            ref={servicesContentRef}
            className={cn(
              "max-w-5xl mx-auto transition-all duration-1000 ease-out",
              isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Injuries */}
              <div className="bg-red-900/50 border border-red-400 rounded-lg p-6 transition-all duration-300 hover:bg-red-800/50 hover:border-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] relative backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                {/* Best Site Badge */}
                <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg shadow-red-500/50">
                  ⭐ Best Site
                </div>
                <div className="flex items-center mb-4">
                  <Users
                    className="h-7 w-7 text-red-300 mr-4 drop-shadow-[0_0_8px_rgba(252,165,165,0.6)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading text-red-200">Injuries</h3>
                </div>
                <div className="text-gray-200 space-y-2 mb-4">
                  <p className="font-semibold text-red-200">Features</p>
                  <p>Auto 13+ to &lt;13</p>
                  <p>Fast Domains</p>
                  <p>Auto authenticator</p>
                  <p>Fast login</p>
                  <p>No captcha</p>
                </div>
                <Button
                  onClick={() => window.open("https://www.logged.tg/auth/mysticgenv2", "_blank")}
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 flex items-center justify-center px-4 py-1.5 text-sm"
                >
                  Create Your Site
                  <ArrowRight className="h-3 w-3 ml-1.5" />
                </Button>
              </div>

              {/* Immortal */}
              <div className="bg-red-900/50 border border-red-400 rounded-lg p-6 transition-all duration-300 hover:bg-red-800/50 hover:border-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <div className="flex items-center mb-4">
                  <LineChart
                    className="h-7 w-7 text-red-300 mr-4 drop-shadow-[0_0_8px_rgba(252,165,165,0.6)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading text-red-200">Immortal</h3>
                </div>
                <div className="text-gray-200 space-y-2 mb-4">
                  <p className="font-semibold text-red-200">Features</p>
                  <p>Auto 13+ to &lt;13</p>
                  <p>Fast Domains</p>
                  <p>Auto authenticator</p>
                  <p>Fast login</p>
                  <p>No captcha</p>
                </div>
                <Button
                  onClick={() => window.open("https://immortal.st/?code=OTYxMzE2NDE4NDQ2NDI2Nzc2Nw==", "_blank")}
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 flex items-center justify-center px-4 py-1.5 text-sm"
                >
                  Create Your Site
                  <ArrowRight className="h-3 w-3 ml-1.5" />
                </Button>
              </div>

              {/* SPLUNK */}
              <div className="bg-red-900/50 border border-red-400 rounded-lg p-6 transition-all duration-300 hover:bg-red-800/50 hover:border-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] relative backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <div className="flex items-center mb-4">
                  <ArrowRight
                    className="h-7 w-7 text-red-300 mr-4 drop-shadow-[0_0_8px_rgba(252,165,165,0.6)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading text-red-200">SPLUNK</h3>
                </div>
                <div className="text-gray-200 space-y-2 mb-4">
                  <p className="font-semibold text-red-200">Features</p>
                  <p>Auto 13+ to &lt;13</p>
                  <p>Fast Domains</p>
                  <p>Auto authenticator</p>
                  <p>Fast login</p>
                  <p>No captcha</p>
                </div>
                <Button
                  onClick={() => window.open("https://app.beamers.si/u/MysticGenV2", "_blank")}
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 flex items-center justify-center px-4 py-1.5 text-sm"
                >
                  Create Your Site
                  <ArrowRight className="h-3 w-3 ml-1.5" />
                </Button>
              </div>

              {/* Hyperlink */}
              <div className="bg-red-900/50 border border-red-400 rounded-lg p-6 transition-all duration-300 hover:bg-red-800/50 hover:border-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] relative backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <div className="flex items-center mb-4">
                  <Clock
                    className="h-7 w-7 text-red-300 mr-4 drop-shadow-[0_0_8px_rgba(252,165,165,0.6)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-semibold font-heading text-red-200">Hyperlink</h3>
                </div>
                <div className="text-gray-200 space-y-2 mb-6">
                  <p className="font-semibold text-red-200">Features</p>
                  <p>Easy To Use</p>
                  <p>Helps Make link Look Real</p>
                  <p>Fast and Reliable</p>
                  <p>Instant Generation</p>
                </div>
                <Button
                  onClick={() => window.open("https://rbx-hyperlink.vercel.app", "_blank")}
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 flex items-center justify-center px-4 py-1.5 text-sm"
                >
                  Create Your Link
                  <ArrowRight className="h-3 w-3 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  )
}
