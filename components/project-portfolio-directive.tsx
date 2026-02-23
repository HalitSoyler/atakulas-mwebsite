"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const PORTFOLIO_ITEMS = [
  {
    badge: "Metro Projesi · İstanbul",
    metric: "48",
    metricSuffix: "km",
    title: "Tam Hat PIS/PAS Entegrasyonu",
    meta: "IP Anons + CCTV + Yolcu Bilgilendirme",
    description:
      "İstanbul metrosu için uçtan uca yolcu bilgilendirme, anons ve güvenlik kamera sistemleri. Merkezi yazılım omurgası ile tek operatör panelinden yönetim.",
    gradient: "linear-gradient(135deg, rgba(1,31,66,0.92) 0%, rgba(1,13,28,0.98) 50%, rgba(10,42,80,0.9) 100%)",
    large: true,
  },
  {
    badge: "İnterkom",
    metric: "200+",
    metricSuffix: "",
    title: "İnterkom Sistemi Kurulumu",
    meta: "IP İnterkom · Acil Haberleşme",
    description: "",
    gradient: "linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(10,42,80,0.9) 100%)",
    large: false,
  },
  {
    badge: "CCTV",
    metric: "30K+",
    metricSuffix: "",
    title: "IP Kamera Ağı Entegrasyonu",
    meta: "CCTV · Merkezi Kayıt",
    description: "",
    gradient: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(26,26,26,0.92) 100%)",
    large: false,
  },
]

export function ProjectPortfolioDirective() {
  return (
    <section
      data-section="portfolio"
      data-header-theme="light"
      className="bg-white py-[clamp(5rem,9vw,9rem)]"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Header: space-between */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--tech-blue)]"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              Saha Kanıtı
            </p>
            <h2
              className="font-display text-[var(--navy-dark)] uppercase"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Proje Portföyü
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="mb-4 text-sm leading-[1.8] text-[var(--gray-500)]" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
              Teslim ettiğimiz her proje, teknik belgelerin ötesinde bir referanstır. Rakamlar, saha gerçeğinden geliyor.
            </p>
            <Link
              href="/projelerimiz"
              className="inline-flex items-center gap-2 rounded border border-[var(--gray-200)] px-4 py-2.5 text-sm font-medium text-[var(--navy)] transition-colors hover:border-[var(--tech-blue)] hover:text-[var(--tech-blue)]"
            >
              Tüm Projeler
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid: 1.5fr 1fr, 2 rows; large card span 2 rows */}
        <div className="grid gap-px overflow-hidden rounded bg-[var(--gray-100)] grid-cols-1 md:grid-cols-[1.5fr_1fr]">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PortfolioCard({
  badge,
  metric,
  metricSuffix,
  title,
  meta,
  description,
  gradient,
  large,
}: {
  badge: string
  metric: string
  metricSuffix: string
  title: string
  meta: string
  description: string
  gradient: string
  large: boolean
}) {
  const [hover, setHover] = useState(false)
  const descRef = useRef<HTMLDivElement>(null)

  return (
    <Link
      href="/projelerimiz"
      className={cn(
        "group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-none",
        large && "md:row-span-2 md:min-h-[520px]"
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* BG with scale on hover */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        style={{ background: gradient }}
      />
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,128,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,128,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 p-6 md:p-8">
        <p
          className="mb-2 text-[0.62rem] font-medium uppercase tracking-wider text-[var(--tech-blue)] border border-[var(--tech-blue)]/50 inline-block px-2 py-1 rounded"
          style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
        >
          {badge}
        </p>
        <p className="mb-1 flex items-baseline gap-1">
          <span
            className="font-display font-bold text-white"
            style={{ fontFamily: "var(--font-barlow-condensed), sans-serif", fontSize: "clamp(1.75rem, 3vw, 3rem)" }}
          >
            {metric}
          </span>
          {metricSuffix && <span className="text-[var(--tech-blue)] text-lg">{metricSuffix}</span>}
        </p>
        <h3
          className="font-display text-lg font-semibold uppercase leading-tight text-white/90 md:text-xl"
          style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="mt-1 text-[0.62rem] uppercase tracking-wider text-white/35"
          style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
        >
          {meta}
        </p>
        {/* Description: max-height 0 → 120px on hover */}
        <div
          ref={descRef}
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ maxHeight: hover && description ? 120 : 0, opacity: hover && description ? 1 : 0 }}
        >
          <p className="mt-3 text-sm leading-relaxed text-white/70" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
