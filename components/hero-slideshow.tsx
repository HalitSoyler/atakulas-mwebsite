import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useScrollMorph } from "@/lib/scroll-morph-context"
import { cn } from "@/lib/utils"

const FALLBACK_SLIDE = { src: "/images/tramway-showcase.jpg", alt: "Atak Ulaşım" }

const SLIDES = [
  { src: "/images/tramway-showcase.jpg", alt: "Atak Ulaşım — Raylı sistem" },
  { src: "/images/Gemini_Generated_Image_4olg7s4olg7s4olg.png", alt: "Atak Ulaşım — Gece yolu ve ulaşım" },
  { src: "/images/tramway-showcase.jpg", alt: "Atak Ulaşım — Elektronik çözümler" },
]

const SLIDE_DURATION_MS = 5000

export function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [highwayError, setHighwayError] = useState(false)
  const { isMorphed } = useScrollMorph()

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(t)
  }, [])

  const getSlide = (i: number) => {
    const slide = SLIDES[i]
    if (i === 1 && highwayError) return FALLBACK_SLIDE
    return slide
  }

  return (
    <section
      data-section="hero"
      data-header-theme="dark"
      className={cn(
        "relative w-full overflow-hidden bg-[#0a0a0a]",
        isMorphed && "pointer-events-none"
      )}
    >
      {/* Slideshow — full-bleed, text is independent (not aligned to slide content) */}
      <div className="relative aspect-[21/9] w-full min-h-[60vh] sm:min-h-[70vh] overflow-hidden">
        {SLIDES.map((_, i) => {
          const slide = getSlide(i)
          return (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                i === index ? "opacity-100 z-0" : "opacity-0 z-0"
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                unoptimized={slide.src.endsWith(".png")}
                onError={() => i === 1 && setHighwayError(true)}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )
        })}

        {/* Dots — fixed position, not tied to slide layout */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={i === index ? "Current slide" : `Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>

      {/* Text overlay — fixed center, does not align with slides; revised typography */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none",
          isMorphed && "invisible"
        )}
      >
        <div className="text-center max-w-2xl">
          <Link
            href="/"
            className="focus:outline-none pointer-events-auto inline-block group"
          >
            <span className="block font-semibold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              Atak
            </span>
            <span className="block font-semibold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white/95 drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] mt-0.5 group-hover:text-[#38bdf8] transition-colors">
              Ulaşım
            </span>
          </Link>
          <p className="mt-6 text-sm sm:text-base font-medium tracking-[0.25em] uppercase text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Raylı sistem ekipmanları ve elektronik çözümler
          </p>
        </div>
      </div>
    </section>
  )
}
