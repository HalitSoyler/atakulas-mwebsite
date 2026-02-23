"use client"

/**
 * PROJECT DETAIL TEMPLATE
 * ────────────────────────
 * Drop-in replacement for all individual project pages.
 * Each page just imports ProjectDetailPage and passes its data.
 *
 * Usage:
 *   import { ProjectDetailPage } from "@/components/project-detail-page"
 *   export default function MyProjectPage(props) {
 *     return <ProjectDetailPage {...myProjectData} />
 *   }
 */

import { use } from "react"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Calendar, Building2, ImageIcon, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
export interface ProjectDetailData {
  title:     { tr: string; en: string }
  client:    string | { tr: string; en: string }
  location:  string | { tr: string; en: string }
  year:      string
  summary:   { tr: string; en: string }
  scope:     { tr: string[]; en: string[] }
  technical: { tr: string[]; en: string[] }
  about:     { tr: string; en: string }
  /** Optional second about paragraph */
  about2?:   { tr: string; en: string }
  images?:   string[]
  progress:  number
  progressLabel: { tr: string; en: string }
  metric:    { value: string; label: { tr: string; en: string } }
  tags?:     string[]
  certifications?: string[]
}

// ─────────────────────────────────────────────────────────────
// SPRING
// ─────────────────────────────────────────────────────────────
const spring = { type: "spring" as const, damping: 20, stiffness: 100 }

// ─────────────────────────────────────────────────────────────
// BLUEPRINT TEXTURE
// ─────────────────────────────────────────────────────────────
const blueprintStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px)
  `,
  backgroundSize: "28px 28px",
}

// ─────────────────────────────────────────────────────────────
// CORNER BORDERS
// ─────────────────────────────────────────────────────────────
function CornerBorders() {
  const base = "absolute w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 border-[#38bdf8]"
  return (
    <>
      <span className={cn(base, "top-2 left-2 border-t border-l group-hover:top-2.5 group-hover:left-2.5")} />
      <span className={cn(base, "top-2 right-2 border-t border-r group-hover:top-2.5 group-hover:right-2.5")} />
      <span className={cn(base, "bottom-2 left-2 border-b border-l group-hover:bottom-2.5 group-hover:left-2.5")} />
      <span className={cn(base, "bottom-2 right-2 border-b border-r group-hover:bottom-2.5 group-hover:right-2.5")} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export function ProjectDetailPage(data: ProjectDetailData) {
  const { language } = useLanguage()
  const lang = language as "tr" | "en"

  const clientStr   = typeof data.client   === "string" ? data.client   : data.client[lang]
  const locationStr = typeof data.location === "string" ? data.location : data.location[lang]
  const hasImages   = data.images && data.images.length > 0
  const firstImage  = data.images?.[0]

  return (
    <main className="min-h-screen bg-background">

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-stone-100 dark:bg-[#0f172a] border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              href="/projelerimiz"
              className="inline-flex items-center gap-2 text-muted-foreground/60 hover:text-[#38bdf8] text-xs font-mono tracking-widest uppercase mb-6 transition-colors duration-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {lang === "tr" ? "Tüm Projeler" : "All Projects"}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 }}
                className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#38bdf8]/60 mb-2"
              >
                {lang === "tr" ? "Proje Detayı" : "Project Detail"}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground"
              >
                {data.title[lang]}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-muted-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 opacity-50" /> {clientStr}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 opacity-50" /> {locationStr}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 opacity-50" /> {data.year}
                </span>
              </motion.div>
            </div>

            {/* Metric */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.2 }}
              className="border border-border/50 bg-background/50 backdrop-blur-sm rounded-sm px-5 py-4 text-right"
            >
              <span className="text-3xl font-semibold text-foreground tabular-nums block leading-none">
                {data.metric.value}
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground/50 mt-1.5 block">
                {data.metric.label[lang]}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MAIN IMAGE + PROGRESS ───────────────────────────── */}
      <section className="py-8 border-b border-border/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-5">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.15 }}
            className="group relative aspect-video rounded-sm overflow-hidden bg-muted"
          >
            {hasImages && firstImage ? (
              <Image
                src={firstImage}
                alt={data.title[lang]}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground/20" />
                <p className="absolute text-xs text-muted-foreground/40 mt-16 font-mono">
                  {lang === "tr" ? "Proje görseli yakında" : "Project image coming soon"}
                </p>
              </div>
            )}
            {/* Blueprint overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />
            <CornerBorders />
          </motion.div>
        </div>
      </section>

      {/* ── SCOPE + TECHNICAL ───────────────────────────────── */}
      <section className="py-14" style={blueprintStyle}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Scope */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...spring }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-[#38bdf8]/60 mb-4">
                {lang === "tr" ? "Proje Kapsamı" : "Project Scope"}
              </h2>
              <ul className="space-y-3">
                {data.scope[lang].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: i * 0.06 }}
                    viewport={{ once: true, margin: "-60px" }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#38bdf8]/50 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Technical */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-[#38bdf8]/60 mb-4">
                {lang === "tr" ? "Teknik Detaylar" : "Technical Details"}
              </h2>
              <ul className="space-y-0 border border-border/40 rounded-sm overflow-hidden">
                {data.technical[lang].map((item, i) => {
                  const [label, ...rest] = item.split(":")
                  const value = rest.join(":").trim()
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.07 }}
                      viewport={{ once: true }}
                      className="flex text-sm border-b border-border/40 last:border-0"
                    >
                      <span className="w-2/5 flex-shrink-0 px-4 py-2.5 font-mono text-[11px] tracking-wide text-muted-foreground/60 bg-muted/30 border-r border-border/40">
                        {label}
                      </span>
                      <span className="flex-1 px-4 py-2.5 text-sm text-foreground/80">
                        {value || item}
                      </span>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="py-12 border-t border-border/40 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={spring}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-[#38bdf8]/60 mb-5">
              {lang === "tr" ? "Proje Hakkında" : "About the Project"}
            </h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {data.about[lang]}
              </p>
              {data.about2 && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.about2[lang]}
                </p>
              )}
            </div>
          </motion.div>

          {/* Tags + Certifications */}
          {(data.tags || data.certifications) && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3 items-center"
            >
              {data.tags?.map(tag => (
                <span key={tag} className="text-[10px] font-mono tracking-wide text-muted-foreground/60 border border-border/50 px-2.5 py-1 rounded-sm">
                  {tag}
                </span>
              ))}
              {data.certifications?.map(cert => (
                <span key={cert} className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#38bdf8]/60 border border-[#38bdf8]/20 bg-[#38bdf8]/5 px-2.5 py-1 rounded-sm">
                  <ShieldCheck className="h-3 w-3" />{cert}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────
// PAGE WRAPPER — used by each individual project page file
// ─────────────────────────────────────────────────────────────
type PageProps = {
  params?: Promise<Record<string, string | string[]>>
  searchParams?: Promise<Record<string, string | string[]>>
}

/**
 * Each project page (e.g. /projelerimiz/istanbul-mobil/page.tsx) does:
 *
 *   import { makeProjectPage } from "@/components/project-detail-page"
 *   export default makeProjectPage(istanbulData)
 */
export function makeProjectPage(data: ProjectDetailData) {
  return function ProjectPage(props: PageProps) {
    use(props.params ?? Promise.resolve({}))
    use(props.searchParams ?? Promise.resolve({}))
    return <ProjectDetailPage {...data} />
  }
}
