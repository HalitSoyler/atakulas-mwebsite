"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const HERO_SLIDES = [
  "/images/Main-page/Anasayfaslide1.png",
  "/images/Main-page/Anasayfaslide2.png",
]

const SLIDE_DURATION_MS = 3500

export function HeroIndustrialDirective() {
  const [dotIndex, setDotIndex] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setInterval(() => setDotIndex((i) => (i + 1) % HERO_SLIDES.length), SLIDE_DURATION_MS)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          el.querySelectorAll(".sr").forEach((node, i) => {
            const delay = i * 80
            const el = node as HTMLElement
            if (entry.isIntersecting) {
              setTimeout(() => el.setAttribute("data-revealed", "true"), delay)
            } else {
              el.removeAttribute("data-revealed")
            }
          })
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={containerRef}
      data-section="hero"
      data-header-theme="dark"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#010D1C]"
    >
      {/* Arka plan slaytları — Anasayfaslide1.png / Anasayfaslide2.png */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((src, i) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === dotIndex ? "opacity-100 z-0" : "opacity-0 z-0"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-[#010D1C]/70" aria-hidden />
          </div>
        ))}
      </div>
      {/* Engineering grid overlay — 64px grid rgba(0,128,255,0.04) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,128,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,128,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Right diagonal panel */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-[45%] min-w-[280px] z-[1]"
        style={{
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
          background: "linear-gradient(135deg, rgba(1,31,66,0.6) 0%, rgba(1,13,28,0.95) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-6 pt-24 pb-8 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-[680px]">
          {/* Eyebrow */}
          <div className="sr d1 mb-6 flex items-center gap-3" style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>
            <span className="h-px w-8 bg-[var(--tech-blue)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--tech-blue)] animate-pulse" style={{ animationDuration: "2s" }} />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--tech-blue)]">
              Yerli Mühendislik · Raylı Sistemler · 1998&apos;den Bu Yana
            </span>
          </div>

          {/* H1 — ATAK ULAŞIM / RAYLI SİSTEMLERİ */}
          <h1
            className="sr d2 mb-6 font-display text-white uppercase leading-[1.05]"
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="block">ATAK ULAŞIM</span>
            <span className="block text-[var(--tech-blue)]">RAYLI SİSTEMLERİ</span>
          </h1>

          {/* Descriptor */}
          <p
            className="sr d3 mb-8 max-w-[480px] border-l-2 border-[var(--tech-blue)]/40 pl-5 text-base leading-[1.8] text-white/55"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}
          >
            Uçtan uca yazılım ve donanım ekosistemiyle Türkiye&apos;nin raylı altyapısını yönetiyoruz. Her sistem, yerli
            mühendisliğin ve uluslararası standartların kesişiminde doğar.
          </p>

          {/* CTAs */}
          <div className="sr d4 mb-10 flex flex-wrap gap-4">
            <Link
              href="/urunlerimiz"
              className="inline-flex items-center gap-2 rounded bg-[var(--tech-blue)] px-5 py-3 text-sm font-medium text-white transition-all duration-250 hover:bg-[var(--tech-blue-dark)] hover:-translate-y-0.5"
            >
              Çözümleri Keşfet
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-250 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/projelerimiz"
              className="inline-flex items-center gap-2 rounded border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition-all duration-250 hover:border-white/60 hover:text-white"
            >
              Proje Portföyü
            </Link>
          </div>
        </div>

        {/* Slider dots — 2 slayt */}
        <div className="flex justify-center gap-2 pt-6">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={i === dotIndex ? "Aktif slayt" : `Slayt ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === dotIndex ? "h-2 w-10 bg-[var(--tech-blue)]" : "h-2 w-5 bg-white/20 hover:bg-white/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
