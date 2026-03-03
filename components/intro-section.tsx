"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const STATS = [
  {
    value: 25,
    suffix: "+",
    label: "Yıllık Tecrübe",
    desc: "1998'den bu yana raylı sistem teknolojilerinde",
  },
  {
    value: 48,
    suffix: " km",
    label: "Metro Hat Entegrasyonu",
    desc: "Türkiye genelinde aktif proje entegrasyonu",
  },
  {
    value: 200,
    suffix: "+",
    label: "Sistem Kurulumu",
    desc: "İnterkom, anons ve CCTV sistemleri kurulumu",
  },
]

const CERTIFICATIONS = ["TSE Sertifikalı", "ISO 9001", "EN 50155"]

function StatCard({
  value,
  suffix,
  label,
  desc,
  delay,
  inView,
}: {
  value: number
  suffix: string
  label: string
  desc: string
  delay: number
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const totalFrames = 90
    const timer = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (frame >= totalFrames) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col bg-white px-8 py-9"
    >
      <p
        className="mb-1 font-black text-[var(--navy)]"
        style={{
          fontFamily: "var(--font-barlow)",
          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {count}
        <span
          className="text-[var(--tech-blue)]"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          {suffix}
        </span>
      </p>
      <p className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">{label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">{desc}</p>
    </motion.div>
  )
}

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      data-section="intro"
      data-header-theme="light"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--tech-blue)]"
            >
              Şirket Hakkında
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-[var(--color-text-primary)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.25,
              }}
            >
              Raylı Ulaşım Altyapısında Güvenilir Çözüm Ortağı
            </motion.h2>
          </div>

          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mb-5 text-[0.9375rem] leading-[1.8] text-[var(--color-text-body)]"
            >
              Atak Ulaşım, 1998&apos;den bu yana metro, tramvay ve hafif raylı sistemler için yerli
              anons, yolcu bilgilendirme ve güvenlik sistemleri tasarlıyor ve üretiyor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              {CERTIFICATIONS.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]"
                >
                  <CheckCircle2 className="h-3 w-3 text-[var(--tech-blue)]" strokeWidth={2.5} />
                  {cert}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[var(--color-border)] sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={i < STATS.length - 1 ? "border-b border-[var(--color-border)] sm:border-b-0 sm:border-r" : ""}
            >
              <StatCard {...s} delay={0.3 + i * 0.1} inView={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
