"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface SplitFlapCharProps {
  char: string
  delay: number
}

function SplitFlapChar({ char, delay }: SplitFlapCharProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [displayChar, setDisplayChar] = useState(" ")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipping(true)
      const flipTimer = setTimeout(() => {
        setDisplayChar(char)
        setIsFlipping(false)
      }, 150)
      return () => clearTimeout(flipTimer)
    }, delay)
    return () => clearTimeout(timer)
  }, [char, delay])

  return (
    <span 
      className={cn(
        "inline-block w-[0.6em] h-[1.2em] bg-[#1a1f2e] rounded-sm mx-[1px]",
        "text-center leading-[1.2em] font-mono font-bold text-white",
        "relative overflow-hidden",
        "transition-transform duration-150",
        isFlipping ? "scale-y-0" : "scale-y-100"
      )}
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)"
      }}
    >
      {displayChar}
    </span>
  )
}

interface SplitFlapTextProps {
  text: string
  baseDelay?: number
}

function SplitFlapText({ text, baseDelay = 0 }: SplitFlapTextProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {text.split("").map((char, index) => (
        <SplitFlapChar 
          key={index} 
          char={char} 
          delay={baseDelay + index * 50} 
        />
      ))}
    </div>
  )
}

export function InterfaceSection() {
  const { t, language } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const features = language === "tr" ? [
    { title: "TASARIM", description: "Elektronik ve mekanik tasarım" },
    { title: "ÜRETİM", description: "EN50155 standartlarında üretim" },
    { title: "YAZILIM", description: "Gömülü ve PC yazılım geliştirme" },
    { title: "SERVİS", description: "Kurulum ve teknik destek" },
  ] : [
    { title: "DESIGN", description: "Electronic and mechanical design" },
    { title: "PRODUCTION", description: "Manufacturing at EN50155 standards" },
    { title: "SOFTWARE", description: "Embedded and PC software development" },
    { title: "SERVICE", description: "Installation and technical support" },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      return () => section.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const headline = language === "tr" 
    ? "TEKNOLOJİ ORTAĞINIZ" 
    : "YOUR TECHNOLOGY PARTNER"

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-[#0a0f1a] overflow-hidden cursor-none"
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "absolute w-32 h-32 pointer-events-none z-50",
          "transition-transform duration-100 ease-out",
          "-translate-x-1/2 -translate-y-1/2"
        )}
        style={{
          background: "radial-gradient(circle, rgba(30, 90, 158, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(30, 90, 158, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 90, 158, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              animation: `slide-line ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Split-flap headline */}
        <div className={cn(
          "text-center mb-20",
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-block bg-[#0d1220] rounded-lg p-6 border border-white/5">
            <div className="text-4xl md:text-5xl lg:text-6xl tracking-wider">
              {isVisible && <SplitFlapText text={headline} baseDelay={200} />}
            </div>
          </div>
          <p className={cn(
            "mt-8 text-lg text-white/60 max-w-2xl mx-auto",
            "transition-all duration-700 delay-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            {language === "tr" 
              ? "1998'den beri rayli sistem ekipmanlarinda yerli cozumler"
              : "Domestic solutions in rail system equipment since 1998"
            }
          </p>
        </div>

        {/* Features grid with hover effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group relative p-8 rounded-xl",
                "bg-white/[0.02] border border-white/5",
                "hover:bg-white/[0.05] hover:border-white/10",
                "transition-all duration-500 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: `${800 + index * 150}ms`,
              }}
            >
              {/* Hover glow */}
              <div className={cn(
                "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
                "transition-opacity duration-500 pointer-events-none"
              )} style={{
                background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 90, 158, 0.1), transparent 40%)`,
              }} />

              {/* Index number */}
              <span className="text-6xl font-bold text-white/5 absolute top-4 right-4 font-mono">
                0{index + 1}
              </span>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-xs font-mono text-primary/60 mb-4 tracking-widest">
                  [{String(index + 1).padStart(2, "0")}]
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom line accent */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 h-px",
                "bg-gradient-to-r from-transparent via-primary/50 to-transparent",
                "transform scale-x-0 group-hover:scale-x-100",
                "transition-transform duration-500 ease-out"
              )} />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className={cn(
          "mt-20 flex flex-wrap justify-center gap-12 lg:gap-20",
          "transition-all duration-1000 delay-1200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {[
            { value: "25+", label: language === "tr" ? "YIL" : "YEARS" },
            { value: "5000+", label: language === "tr" ? "ARAC" : "VEHICLES" },
            { value: "50+", label: language === "tr" ? "PROJE" : "PROJECTS" },
            { value: "10+", label: language === "tr" ? "SEHIR" : "CITIES" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="text-4xl lg:text-5xl font-bold text-white font-mono tracking-tight group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </div>
              <div className="mt-2 text-xs text-white/50 tracking-[0.3em] font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slide-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}
