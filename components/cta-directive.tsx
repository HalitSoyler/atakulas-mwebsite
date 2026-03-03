"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Phone, Mail, ArrowRight, BadgeCheck } from "lucide-react"

const CERTIFICATIONS = [
  { label: "TSE Belgeli", desc: "Türk Standartları Enstitüsü" },
  { label: "ISO 9001", desc: "Kalite Yönetim Sistemi" },
  { label: "EN 50155", desc: "Demiryolu Ortamı Standardı" },
]

/* ── Magnetic link ── */
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
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
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

export function CtaDirective() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const SHOW_CTA = false
  if (!SHOW_CTA) return null

  return (
    <section
      ref={ref}
      data-section="cta"
      data-header-theme="dark"
      className="relative overflow-hidden bg-[var(--navy-deeper)] py-20 md:py-28"
    >
      {/* ── Animated breathing orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* Orb 1 */}
        <motion.div
          animate={{ x: [0, 60, -40, 50, 0], y: [0, -40, 60, -30, 0], scale: [1, 1.15, 0.92, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-16 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(0,86,179,0.35) 0%, transparent 65%)" }}
        />
        {/* Orb 2 */}
        <motion.div
          animate={{ x: [0, -50, 30, -40, 0], y: [0, 50, -30, 40, 0], scale: [1, 0.9, 1.12, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute -right-24 bottom-0 h-[500px] w-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.3) 0%, transparent 65%)" }}
        />
        {/* Orb 3 — center pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(0,86,179,0.25) 0%, transparent 70%)" }}
        />
      </div>

      {/* Static diagonal accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, rgba(0,86,179,0.25) 50%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />

      {/* ── Certifications strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto mb-16 max-w-6xl px-6 sm:px-8 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CERTIFICATIONS.map(({ label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-[var(--tech-blue)]" strokeWidth={2} />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/50">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Main CTA ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--tech-blue)]"
        >
          İletişim
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mb-5 text-white"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
          }}
        >
          Projenizi Birlikte
          <br />
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(135deg, #5ba8f5, #0056b3, #5ba8f5)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Hayata Geçirelim
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mx-auto mb-10 max-w-md text-[0.9375rem] leading-[1.75] text-white/60"
        >
          Teklif ve teknik görüşme için mühendislik ekibimizle iletişime geçin. Projenize özel çözümler sunalım.
        </motion.p>

        {/* CTA buttons — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          <MagneticLink
            href="/iletisim"
            className="group inline-flex items-center gap-2.5 rounded-md bg-[var(--color-rail-red)] px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-rail-red-hover)] active:scale-[0.98]"
          >
            İletişime Geçin
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </MagneticLink>
          <MagneticLink
            href="/projelerimiz"
            className="inline-flex items-center rounded-md border border-white/25 bg-white/6 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/12"
          >
            Projelerimiz
          </MagneticLink>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="flex flex-wrap justify-center gap-6 border-t border-white/12 pt-8"
        >
          <a
            href="tel:+903123874437"
            className="group flex items-center gap-2.5 text-sm text-white/55 transition-colors duration-200 hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 group-hover:border-white/30 group-hover:bg-white/10">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
            </div>
            0312 387 44 37
          </a>
          <a
            href="mailto:info@atakulasim.com"
            className="group flex items-center gap-2.5 text-sm text-white/55 transition-colors duration-200 hover:text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 group-hover:border-white/30 group-hover:bg-white/10">
              <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            </div>
            info@atakulasim.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
