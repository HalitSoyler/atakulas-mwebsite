"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"
import { ArrowRight, ChevronDown, Train, Wifi, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const HERO_SLIDES = [
  { src: "/images/Main page/slide-1.png", alt: "Ana sayfa slayt 1" },
  { src: "/images/Main page/slide-2.png", alt: "Ana sayfa slayt 2" },
  { src: "/images/projects/metro.png", alt: "Metro ve raylı sistem projeleri" },
]

const SLIDE_DURATION_MS = 6000

const HERO_STATS = [
  { value: "25+", label: "Yıllık Tecrübe" },
  { value: "48 km", label: "Metro Entegrasyonu" },
  { value: "200+", label: "Sistem Kurulumu" },
]

const CAPABILITY_PILLS = [
  { icon: Train, label: "Metro & Tramvay" },
  { icon: Wifi, label: "IP Anons Altyapısı" },
  { icon: ShieldCheck, label: "EN 50155 Sertifikalı" },
]

/* ── Word-by-word masked reveal ── */
function WordReveal({
  text,
  delay = 0,
  className,
  style,
}: {
  text: string
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const words = text.split(" ")
  return (
    <span className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.07,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </span>
  )
}

/* ── Magnetic link wrapper ── */
function MagneticLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 22 })
  const springY = useSpring(y, { stiffness: 280, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export function HeroIndustrialDirective() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [pausedUntil, setPausedUntil] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  /* Scroll-linked parallax */
  const { scrollY } = useScroll()
  const rawY = useTransform(scrollY, [0, 700], [0, -90])
  const rawOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() < pausedUntil) return
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(t)
  }, [pausedUntil])

  const goTo = (i: number) => {
    setSlideIndex(i)
    setPausedUntil(Date.now() + 8000)
  }

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      data-header-theme="dark"
      className="relative min-h-screen overflow-hidden bg-[var(--navy-deeper)]"
    >
      {/* ── Background slideshow ── */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              i === slideIndex ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        {/* Gradient composites */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.82) 42%, rgba(15,23,42,0.38) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 8% 55%, rgba(0,86,179,0.22) 0%, transparent 62%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{
            background: "linear-gradient(to top, rgba(15,23,42,1) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Floating ambient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Orb 1 — large slow drift, top right */}
        <motion.div
          animate={{ x: [0, 50, -30, 40, 0], y: [0, -60, 35, -25, 0], scale: [1, 1.12, 0.94, 1.06, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 top-1/4 h-[650px] w-[650px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(0,86,179,0.18) 0%, transparent 70%)" }}
        />
        {/* Orb 2 — medium, center drift */}
        <motion.div
          animate={{ x: [0, -40, 25, -50, 0], y: [0, 50, -40, 30, 0], scale: [1, 0.95, 1.08, 0.98, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute left-1/3 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.15) 0%, transparent 70%)" }}
        />
        {/* Orb 3 — small accent, bottom left */}
        <motion.div
          animate={{ x: [0, 30, -20, 15, 0], y: [0, -30, 45, -15, 0], scale: [1, 1.05, 0.92, 1.03, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 9 }}
          className="absolute -left-16 bottom-1/4 h-[350px] w-[350px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(0,86,179,0.12) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Dot-grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* ── Main content with scroll parallax ── */}
      <motion.div
        style={{ y: parallaxY, opacity: rawOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
      >
        <div className="flex min-h-screen items-center py-28">
          <div className="w-full max-w-2xl lg:max-w-3xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/6 px-4 py-1.5 backdrop-blur-md"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-rail-red)]"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                Atak Ulaşım Ltd. Şti. · Ankara
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1
              className="mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
              }}
            >
              <WordReveal text="Raylı Sistemlerde" delay={0.1} className="text-white" />
              {" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #5ba8f5 0%, #0056b3 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <WordReveal text="25 Yıllık" delay={0.38} />
              </span>
              {" "}
              <WordReveal text="Teknoloji Uzmanlığı" delay={0.56} className="text-white" />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.9 }}
              className="mb-10 max-w-[490px] text-[1.0625rem] leading-[1.8] text-white/65"
            >
              Metro, tramvay ve hafif raylı sistemler için yerli anons, yolcu bilgilendirme ve güvenlik çözümleri. TSE ve ISO sertifikalı yerli üretim.
            </motion.p>

            {/* CTA buttons — magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="mb-12 flex flex-wrap gap-3"
            >
              <MagneticLink
                href="/projelerimiz"
                className="group inline-flex items-center gap-2.5 rounded-md bg-[#0056b3] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#00408a] active:scale-[0.98]"
              >
                Projelerimizi İnceleyin
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 1 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </MagneticLink>
              <MagneticLink
                href="/hakkimizda"
                className="inline-flex items-center rounded-md border border-white/25 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/12"
              >
                Hakkımızda
              </MagneticLink>
            </motion.div>

            {/* Capability pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mb-12 flex flex-wrap gap-2"
            >
              {CAPABILITY_PILLS.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.25 + i * 0.08 }}
                  className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-[#5ba8f5]" strokeWidth={1.75} />
                  <span className="text-[11px] font-medium text-white/70">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-8"
            >
              {HERO_STATS.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.45 + i * 0.1 }}
                >
                  <p
                    className="text-[1.875rem] font-black text-white"
                    style={{ fontFamily: "var(--font-barlow)", letterSpacing: "-0.03em" }}
                  >
                    {value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide dots */}
      <div className="absolute bottom-10 left-6 z-20 flex gap-2 sm:left-8 lg:left-12">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slayt ${i + 1}`}
            className={cn(
              "h-[3px] rounded-full transition-all duration-400",
              i === slideIndex ? "w-10 bg-white" : "w-5 bg-white/28 hover:bg-white/55"
            )}
          />
        ))}
      </div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 right-8 z-20 hidden flex-col items-center gap-1.5 lg:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
          Kaydır
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
