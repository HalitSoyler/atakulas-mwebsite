"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface CardItem {
  id: number
  title: string
  description: string
  image: string
  link: string
  highlight?: string
}

interface LinearCardsProps {
  items: CardItem[]
  title: string
  subtitle?: string
}

export function LinearCards({ items, title, subtitle }: LinearCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
    setActiveIndex(index)
  }

  return (
    <section className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(30, 90, 158, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 90, 158, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, index) => (
            <Link
              key={item.id}
              href={item.link}
              className="group block"
            >
              <div
                className={cn(
                  "relative h-[400px] rounded-2xl overflow-hidden cursor-pointer",
                  "bg-white/5 border border-white/10",
                  "transition-all duration-500 ease-out",
                  "hover:border-white/20 hover:bg-white/[0.07]",
                  activeIndex === index ? "scale-[1.02]" : "scale-100"
                )}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Spotlight effect */}
                {activeIndex === index && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 90, 158, 0.15), transparent 40%)`,
                    }}
                  />
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={cn(
                      "object-cover transition-all duration-700 ease-out",
                      activeIndex === index ? "scale-110 opacity-80" : "scale-100 opacity-60"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/50 to-transparent" />
                  
                  {/* Highlight badge */}
                  {item.highlight && (
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/80 text-white backdrop-blur-sm">
                        {item.highlight}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative p-6">
                  <h3 className={cn(
                    "text-xl font-semibold text-white mb-3",
                    "transition-all duration-300",
                    activeIndex === index ? "translate-x-2" : "translate-x-0"
                  )}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className={cn(
                    "absolute bottom-6 right-6",
                    "w-10 h-10 rounded-full bg-white/5 border border-white/10",
                    "flex items-center justify-center",
                    "transition-all duration-300 ease-out",
                    activeIndex === index 
                      ? "bg-primary border-primary scale-110" 
                      : "group-hover:bg-white/10"
                  )}>
                    <ArrowRight className={cn(
                      "h-4 w-4 transition-all duration-300",
                      activeIndex === index 
                        ? "text-white translate-x-0.5" 
                        : "text-white/50"
                    )} />
                  </div>
                </div>

                {/* Border glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl pointer-events-none",
                  "opacity-0 transition-opacity duration-300",
                  activeIndex === index ? "opacity-100" : ""
                )} style={{
                  boxShadow: "inset 0 0 0 1px rgba(30, 90, 158, 0.5), 0 0 20px rgba(30, 90, 158, 0.2)"
                }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
