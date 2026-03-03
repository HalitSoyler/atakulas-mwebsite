"use client"

import { use } from "react"
import { Footer } from "@/components/footer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, MapPin, Calendar, Building2, ImageIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────────────────────
// PROJECT DATA — add new projects here. That's it.
// ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: "istanbul-mobil",
    href: "/projelerimiz/istanbul-mobil",
    category:  { tr: "Mobil Ulaşım",    en: "Mobile Transport" },
    title:     { tr: "İstanbul Mobil Otobüs Sistemleri", en: "Istanbul Mobile Bus Systems" },
    client:    "IETT Genel Müdürlüğü",
    location:  "İstanbul",
    year:      "2020–2024",
    summary: {
      tr: "İstanbul'un 5.000'den fazla toplu taşıma aracı için CCTV, PIS/PAS ve LED güzergah panellerini kapsayan Türkiye'nin en büyük filo dönüşüm projelerinden biri.",
      en: "One of Turkey's largest fleet transformation projects, covering CCTV, PIS/PAS and LED route panels for over 5,000 Istanbul public transport vehicles.",
    },
    progress:      100,
    progressLabel: { tr: "Tamamlandı", en: "Completed" },
    image:         "/images/projects/istanbul.png",
    tags: ["CCTV", "PIS/PAS", "LED Güzergah"],
  },
  {
    id: "metro-tramvay",
    href: "/projelerimiz/metro-tramvay",
    category:  { tr: "Raylı Sistemler", en: "Rail Systems" },
    title:     { tr: "Metro / Tramvay PIS Sistemleri", en: "Metro / Tram PIS Systems" },
    client:    { tr: "Çeşitli Belediyeler", en: "Various Municipalities" },
    location:  { tr: "Türkiye Geneli",   en: "Turkey-wide" },
    year:      "2019–2024",
    summary: {
      tr: "Türkiye genelindeki metro ve tramvay hatları için EN 50155 uyumlu yolcu bilgilendirme sistemleri, sürücü kontrol üniteleri ve interkom altyapısı.",
      en: "EN 50155 compliant passenger information systems, driver control units and intercom infrastructure for metro and tram lines across Turkey.",
    },
    progress:      85,
    progressLabel: { tr: "Devam Ediyor", en: "Ongoing" },
    image:         "/images/projects/metro.png",
    tags: ["PIS/PAS", "İnterkom", "EN 50155"],
  },
  {
    id: "van-mobil",
    href: "/projelerimiz/van-mobil",
    category:  { tr: "Mobil Ulaşım",    en: "Mobile Transport" },
    title:     { tr: "Van Mobil Ulaşım Projesi", en: "Van Mobile Transport Project" },
    client:    "Van Büyükşehir Belediyesi",
    location:  "Van",
    year:      "2022–2023",
    summary: {
      tr: "100'den fazla belediye otobüsü için entegre CCTV, GPS filo yönetimi ve yolcu bilgilendirme sistemlerinin tasarım, üretim ve kurulumu.",
      en: "Design, production and installation of integrated CCTV, GPS fleet management and passenger information systems for 100+ municipal buses.",
    },
    progress:      100,
    progressLabel: { tr: "Tamamlandı", en: "Completed" },
    image:         "/images/projects/van.png",
    tags: ["CCTV", "GPS", "PIS"],
  },
  // ── ADD NEW PROJECTS BELOW ──────────────────────────────────
  // {
  //   id: "yeni-proje",
  //   href: "/projelerimiz/yeni-proje",
  //   category:  { tr: "Kategori", en: "Category" },
  //   title:     { tr: "Proje Adı", en: "Project Name" },
  //   client:    "Müşteri Adı",
  //   location:  "Şehir",
  //   year:      "2025",
  //   summary:   { tr: "Kısa açıklama.", en: "Short description." },
  //   metric:    { value: "X+", label: { tr: "Birim", en: "Unit" } },
  //   progress:  70,
  //   progressLabel: { tr: "Devam Ediyor", en: "Ongoing" },
  //   image:     "/images/projects/yeni.jpg",
  //   tags: ["Tag1", "Tag2"],
  // },
]

// ─────────────────────────────────────────────────────────────
// SPRING CONFIG
// ─────────────────────────────────────────────────────────────
const spring = { type: "spring" as const, damping: 20, stiffness: 100 }
const springFast = { type: "spring" as const, damping: 22, stiffness: 120 }

// ─────────────────────────────────────────────────────────────
// CORNER BORDERS (L-shapes, appear on hover via group-hover)
// ─────────────────────────────────────────────────────────────
function CornerBorders() {
  const base = "absolute w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
  const line = "border-[#38bdf8]"
  return (
    <>
      {/* top-left */}
      <span className={cn(base, "top-2 left-2 border-t border-l", line,
        "group-hover:top-2.5 group-hover:left-2.5")} />
      {/* top-right */}
      <span className={cn(base, "top-2 right-2 border-t border-r", line,
        "group-hover:top-2.5 group-hover:right-2.5")} />
      {/* bottom-left */}
      <span className={cn(base, "bottom-2 left-2 border-b border-l", line,
        "group-hover:bottom-2.5 group-hover:left-2.5")} />
      {/* bottom-right */}
      <span className={cn(base, "bottom-2 right-2 border-b border-r", line,
        "group-hover:bottom-2.5 group-hover:right-2.5")} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// PROJECT IMAGE
// ─────────────────────────────────────────────────────────────
function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const isPlaceholder = !src || !src.startsWith("/images")
  return (
    <div className="group relative w-full overflow-hidden rounded-sm aspect-[16/10] min-h-[200px]">
      {isPlaceholder ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/40">
          <ImageIcon className="h-10 w-10 text-muted-foreground/25" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-all duration-700 ease-out",
            "scale-[1.02] group-hover:scale-100"
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      {/* dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      <CornerBorders />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BLUEPRINT TEXTURE (behind text columns)
// ─────────────────────────────────────────────────────────────
const blueprintStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px",
}

// ─────────────────────────────────────────────────────────────
// SINGLE PROJECT ROW
// ─────────────────────────────────────────────────────────────
type Project = typeof projects[number]

function ProjectRow({ project, index, lang }: { project: Project; index: number; lang: "tr" | "en" }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  const isEven = index % 2 === 0   // even → image right; odd → image left
  const clientStr = typeof project.client === "string" ? project.client : project.client[lang]
  const locationStr = typeof project.location === "string" ? project.location : project.location[lang]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ ...spring, delay: 0.05 }}
      className="relative"
    >
      {/* Thin top divider */}
      <div className="w-full h-px bg-border/40" />

      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2",
        "min-h-[380px] sm:min-h-[440px]"
      )}>

        {/* ── TEXT COLUMN ── */}
        <div
          className={cn(
            "relative flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12",
            isEven ? "lg:order-1" : "lg:order-2"
          )}
          style={blueprintStyle}
        >
          {/* Category tag */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springFast, delay: 0.12 }}
            className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#38bdf8]/70 mb-3"
          >
            {project.category[lang]}
          </motion.p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.18 }}
            className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground leading-snug mb-4"
          >
            {project.title[lang]}
          </motion.h2>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground mb-5"
          >
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
              {clientStr}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
              {locationStr}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
              {project.year}
            </span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.24 }}
            className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6"
          >
            {project.summary[lang]}
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="flex flex-wrap gap-1.5 mb-5"
          >
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] font-mono tracking-wide text-muted-foreground/70 border border-border/60 bg-muted/30 px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mt-7"
          >
            <Link
              href={project.href}
              className="group/link inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#38bdf8]/70 hover:text-[#38bdf8] transition-colors duration-200"
            >
              {lang === "tr" ? "Projeyi İncele" : "View Project"}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── IMAGE COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...spring, delay: 0.10 }}
          className={cn(
            "group relative w-full",
            isEven ? "lg:order-2" : "lg:order-1"
          )}
        >
          <ProjectImage src={project.image} alt={project.title[lang]} />

          {project.metric && (
            <div className="absolute bottom-4 left-4 flex flex-col bg-[#0f172a]/80 backdrop-blur-sm border border-white/10 rounded-sm px-3 py-2.5 pointer-events-none">
              <span className="text-xl font-semibold tabular-nums text-white leading-none">
                {project.metric.value}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 mt-1">
                {project.metric.label[lang]}
              </span>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
type PageProps = {
  params?: Promise<Record<string, string | string[]>>
  searchParams?: Promise<Record<string, string | string[]>>
}

export default function ProjelerimizPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { language } = useLanguage()
  const lang = language as "tr" | "en"

  return (
    <main className="min-h-screen bg-background">

      {/* ── Header ── */}
      <section className="pt-28 pb-14 bg-stone-100 dark:bg-[#0f172a] border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springFast}
            className="text-[10px] font-mono tracking-[0.22em] uppercase text-[#38bdf8]/60 mb-3"
          >
            {lang === "tr" ? "Referans Projeler" : "Reference Projects"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground"
          >
            {lang === "tr" ? "Projelerimiz" : "Our Projects"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm text-muted-foreground max-w-xl leading-relaxed"
          >
            {lang === "tr"
              ? "Raylı sistemler ve mobil ulaşımda hayata geçirdiğimiz mühendislik projeleri."
              : "Engineering projects we have realized in rail systems and mobile transport."}
          </motion.p>
        </div>
      </section>

      {/* ── Projects ── */}
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            lang={lang}
          />
        ))}
        {/* Final divider */}
        <div className="w-full h-px bg-border/40" />
      </div>

      <Footer />
    </main>
  )
}
