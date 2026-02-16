"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { ArrowRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const hero = heroRef.current
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove)
      return () => hero.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1a]"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(30, 90, 158, 0.4) 0%, transparent 50%)`,
            transition: "background 0.3s ease-out",
          }}
        />
      </div>

      {/* Video/Image Background with SVG Mask */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <mask id="hero-mask">
              <rect width="100%" height="100%" fill="white" />
              {/* Geometric mask shapes */}
              <circle 
                cx={50 + (mousePosition.x - 50) * 0.05} 
                cy={50 + (mousePosition.y - 50) * 0.05} 
                r="35" 
                fill="black"
                style={{ transition: "all 0.5s ease-out" }}
              />
              <rect 
                x="10" 
                y="60" 
                width="25" 
                height="35" 
                fill="black"
                style={{ transform: `rotate(${(mousePosition.x - 50) * 0.1}deg)`, transformOrigin: "center" }}
              />
              <rect 
                x="70" 
                y="10" 
                width="20" 
                height="30" 
                fill="black"
                style={{ transform: `rotate(${(mousePosition.y - 50) * -0.1}deg)`, transformOrigin: "center" }}
              />
            </mask>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="rgba(30, 90, 158, 0.15)" 
            mask="url(#hero-mask)"
          />
        </svg>
        
        {/* Background image visible through mask */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-metro.jpg"
            alt="Metro systems"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(30, 90, 158, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 90, 158, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={cn(
            "absolute w-32 h-32 border border-primary/20 rounded-full",
            "transition-all duration-1000 ease-out",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ 
            top: "15%", 
            right: "10%",
            transform: `translate(${(mousePosition.x - 50) * 0.3}px, ${(mousePosition.y - 50) * 0.3}px)`,
          }}
        />
        <div 
          className={cn(
            "absolute w-20 h-20 border border-secondary/30",
            "transition-all duration-1000 ease-out delay-200",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ 
            bottom: "20%", 
            left: "8%",
            transform: `translate(${(mousePosition.x - 50) * -0.2}px, ${(mousePosition.y - 50) * -0.2}px) rotate(45deg)`,
          }}
        />
        <div 
          className={cn(
            "absolute w-16 h-16 bg-primary/5 rounded-lg",
            "transition-all duration-1000 ease-out delay-300",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ 
            top: "60%", 
            right: "20%",
            transform: `translate(${(mousePosition.x - 50) * 0.15}px, ${(mousePosition.y - 50) * 0.15}px) rotate(-12deg)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            {/* Animated subtitle */}
            <p 
              className={cn(
                "text-sm font-medium uppercase tracking-[0.3em] text-primary mb-8",
                "transition-all duration-700 ease-out",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {t.hero.slide1.subtitle}
            </p>

            {/* Main title with split animation */}
            <h1 className="relative">
              {t.hero.slide1.title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mr-4 mb-2",
                    index < 2 ? "text-white" : "text-white/60",
                    "transition-all duration-700 ease-out",
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p 
              className={cn(
                "mt-10 text-lg lg:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed",
                "transition-all duration-700 ease-out delay-500",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {t.hero.slide1.description}
            </p>

            {/* CTA Buttons */}
            <div 
              className={cn(
                "mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start",
                "transition-all duration-700 ease-out delay-700",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <InteractiveHoverButton
                asChild
                className="bg-white text-[#0a0f1a] hover:bg-white/90 rounded-full px-8 font-medium group shadow-none hover:shadow-lg hover:shadow-white/20 size-11"
              >
                <Link href="/urunlerimiz">
                  {t.hero.slide1.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </InteractiveHoverButton>
              <InteractiveHoverButton
                asChild
                className="border border-white/20 text-white hover:bg-white/10 rounded-full px-8 bg-transparent shadow-none hover:shadow-none size-11"
              >
                <Link href="/iletisim">
                  {t.hero.slide1.secondaryCta}
                </Link>
              </InteractiveHoverButton>
            </div>
          </div>

          {/* Right side - Stats card with video */}
          <div 
            className={cn(
              "hidden lg:block",
              "transition-all duration-1000 ease-out delay-300",
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
          >
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              {/* Video placeholder */}
              <div className="relative aspect-video bg-white/5 rounded-2xl mb-8 overflow-hidden group cursor-pointer">
                <Image
                  src="/images/tramway-showcase.jpg"
                  alt="Video thumbnail"
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                    <Play className="h-6 w-6 text-white ml-1" fill="white" />
                  </div>
                </div>
                <p className="absolute bottom-4 left-4 text-sm text-white font-medium">
                  {t.hero.stats.videoLabel}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "25+", label: t.hero.stats.experience },
                  { value: "TUBiTAK", label: t.hero.stats.certified },
                  { value: "ISO", label: "9001:2015" },
                  { value: "%100", label: t.hero.stats.domestic },
                ].map((stat, index) => (
                  <div 
                    key={stat.label}
                    className={cn(
                      "text-center p-5 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300",
                      "transform hover:scale-105"
                    )}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2",
          "transition-all duration-700 ease-out delay-1000",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
