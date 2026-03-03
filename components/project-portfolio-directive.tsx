"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react"

const PROJECTS = [
  {
    title: "İstanbul Metro",
    meta: "PIS/PAS · IP Anons · CCTV",
    location: "İstanbul",
    image: "/images/projects/istanbul.png",
    href: "/projelerimiz/istanbul-mobil",
    featured: true,
    tag: "Referans Proje",
  },
  {
    title: "Metro ve Tramvay Projeleri",
    meta: "Yolcu bilgilendirme · Anons",
    location: "Türkiye Geneli",
    image: "/images/projects/metro.png",
    href: "/projelerimiz/metro-tramvay",
    featured: false,
    tag: "Devam Eden",
  },
  {
    title: "Van Mobil",
    meta: "Raylı sistem ekipmanları",
    location: "Van",
    image: "/images/projects/van.png",
    href: "/projelerimiz/van-mobil",
    featured: false,
    tag: "Tamamlandı",
  },
]

const STATS = [
  { value: "25+", label: "Yıllık Tecrübe" },
  { value: "48 km", label: "Metro Hat" },
  { value: "200+", label: "Kurulum" },
]

/* ── Clip-path wipe reveal card ── */
function ProjectCard({
  title,
  meta,
  location,
  image,
  href,
  featured,
  tag,
  delay,
  inView,
}: (typeof PROJECTS)[0] & { delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link
        href={href}
        className="group relative flex overflow-hidden rounded-2xl bg-[var(--color-bg-tertiary)]"
        style={{ aspectRatio: featured ? "16/9" : "4/3" }}
      >
        {/* Image wipe: clips from right to left on entry, then reveals */}
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{
            duration: 1.05,
            delay: delay + 0.05,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.42) 50%, rgba(15,23,42,0.88) 100%)",
            }}
          />
        </motion.div>

        {/* Tag badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.55 }}
          className="absolute left-4 top-4 z-10"
        >
          <span className="inline-flex items-center rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
            {tag}
          </span>
        </motion.div>

        {/* Hover arrow */}
        <div className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>

        {/* Content bottom overlay */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.65 }}
          className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6"
        >
          <div className="mb-1.5 flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-white/55" strokeWidth={2} />
            <span className="text-xs text-white/55">{location}</span>
          </div>
          <h3
            className="font-bold text-white"
            style={{
              fontSize: featured ? "clamp(1.125rem, 2vw, 1.5rem)" : "1.0625rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>
          <p className="mt-1 text-[0.8125rem] text-white/65">{meta}</p>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export function ProjectPortfolioDirective() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      data-section="portfolio"
      data-header-theme="light"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">

        {/* Header row */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--tech-blue)]"
            >
              Portföy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-[var(--color-text-primary)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(1.625rem, 2.8vw, 2.25rem)",
                letterSpacing: "-0.022em",
                lineHeight: 1.2,
              }}
            >
              Proje Portföyü
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-[var(--color-text-body)]"
            >
              Teslim ettiğimiz projeler, teknik belgelerin ötesinde referans niteliğindedir.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.24 }}
          >
            <Link
              href="/projelerimiz"
              className="group inline-flex items-center gap-2 rounded-md border-2 border-[var(--color-rail-red)] px-5 py-2.5 text-sm font-semibold text-[var(--color-rail-red)] transition-all duration-200 hover:bg-[var(--color-rail-red)] hover:text-white"
            >
              Tüm Projeler
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 grid grid-cols-3 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`px-6 py-6 text-center ${i < STATS.length - 1 ? "border-r border-[var(--color-border)]" : ""}`}
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="text-2xl font-black text-[var(--navy)] md:text-3xl"
                style={{ fontFamily: "var(--font-barlow)", letterSpacing: "-0.03em" }}
              >
                {value}
              </motion.p>
              <p className="mt-1 text-xs font-medium text-[var(--color-text-secondary)]">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Project grid: featured (2 cols) + 2 smaller */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={0.28 + i * 0.14}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
