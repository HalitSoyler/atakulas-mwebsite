 "use client"

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Calendar, Bus } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"

export default function ProjelerimizPage() {
  const { language } = useLanguage()

  const projects = [
    {
      id: "istanbul-mobil",
      title: language === "tr" ? "Istanbul Mobil Otobus Sistemleri" : "Istanbul Mobile Bus Systems",
      client: "IETT Genel Mudurlugu",
      location: "Istanbul",
      year: "2020-2024",
      summary: language === "tr"
        ? "Istanbul toplu tasima filosu icin CCTV, yolcu bilgilendirme ve anons sistemleri."
        : "CCTV, passenger information and announcement systems for Istanbul public transport fleet.",
      scope: "30.000+ arac",
    },
    {
      id: "van-mobil",
      title: language === "tr" ? "Van Mobil Ulasim Projesi" : "Van Mobile Transport Project",
      client: "Van Buyuksehir Belediyesi",
      location: "Van",
      year: "2022-2023",
      summary: language === "tr"
        ? "Van sehir ici toplu tasima araclari icin entegre yolcu bilgilendirme ve guvenlik sistemleri."
        : "Integrated passenger information and security systems for Van urban public transport vehicles.",
      scope: "100+ arac",
    },
    {
      id: "elektrikli-otobus",
      title: language === "tr" ? "Elektrikli Otobus Donusum Projesi" : "Electric Bus Conversion Project",
      client: "Ankara EGO",
      location: "Ankara",
      year: "2024",
      summary: language === "tr"
        ? "Dizel otobuslerin elektrikli donusumu icin pilot proje."
        : "Pilot project for diesel to electric bus conversion.",
      scope: language === "tr" ? "Pilot Proje" : "Pilot Project",
    },
    {
      id: "metro-tramvay",
      title: language === "tr" ? "Metro/Tramvay PIS Sistemleri" : "Metro/Tram PIS Systems",
      client: language === "tr" ? "Cesitli Belediyeler" : "Various Municipalities",
      location: language === "tr" ? "Turkiye Geneli" : "Turkey-wide",
      year: "2019-2024",
      summary: language === "tr"
        ? "Metro ve tramvay araclari icin yolcu bilgilendirme sistemleri uretimi ve kurulumu."
        : "Manufacturing and installation of passenger information systems for metro and tram vehicles.",
      scope: language === "tr" ? "Rayli Sistemler" : "Rail Systems",
    },
  ]

  const stats = [
    { value: "50+", label: language === "tr" ? "Tamamlanan Proje" : "Completed Projects" },
    { value: "30,000+", label: language === "tr" ? "CCTV Kamera" : "CCTV Cameras" },
    { value: "10+", label: language === "tr" ? "Sehir" : "Cities" },
  ]

  return (
    <main className="bg-background min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-sm font-medium text-primary mb-2">
            {language === "tr" ? "PROJELERIMIZ" : "OUR PROJECTS"}
          </p>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {language === "tr" ? "Tamamlanan Projelerimiz" : "Our Completed Projects"}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-semibold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects — CanvasRevealEffect ile modern grid */}
      <section className="py-16 bg-slate-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-10 text-center">
            {language === "tr" ? "Tamamlanan Projelerimiz" : "Completed Projects"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const category =
                project.id === "elektrikli-otobus"
                  ? language === "tr"
                    ? "Sürdürülebilir Ulaşım"
                    : "Sustainable Transport"
                  : project.id === "metro-tramvay"
                    ? language === "tr"
                      ? "Raylı Sistemler"
                      : "Rail Systems"
                    : language === "tr"
                      ? "Toplu Taşıma Sistemleri"
                      : "Public Transport Systems"

              const colors =
                project.id === "elektrikli-otobus"
                  ? [
                      [100, 116, 139] as [number, number, number],
                      [186, 230, 253] as [number, number, number],
                    ]
                  : project.id === "metro-tramvay"
                    ? [
                        [71, 85, 105] as [number, number, number],
                        [148, 163, 184] as [number, number, number],
                      ]
                    : [
                        [51, 65, 85] as [number, number, number],
                        [148, 163, 184] as [number, number, number],
                      ]

              return (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  category={category}
                  location={project.location}
                  year={project.year}
                  scope={project.scope}
                  client={project.client}
                  summary={project.summary}
                >
                  <CanvasRevealEffect
                    animationSpeed={project.id === "elektrikli-otobus" ? 5 : 7}
                    containerClassName="bg-slate-900"
                    colors={colors}
                    dotSize={2}
                  />
                </ProjectCard>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

type ProjectCardProps = {
  title: string
  category: string
  location: string
  year: string
  scope: string
  client: string
  summary: string
  children?: React.ReactNode
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  location,
  year,
  scope,
  client,
  summary,
  children,
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 h-[25rem] bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 overflow-hidden rounded-xl transition duration-500"
    >
      {/* Köşe ikonları */}
      <CornerIcon className="absolute h-4 w-4 -top-2 -left-2 dark:text-slate-500 text-slate-300" />
      <CornerIcon className="absolute h-4 w-4 -bottom-2 -left-2 dark:text-slate-500 text-slate-300" />
      <CornerIcon className="absolute h-4 w-4 -top-2 -right-2 dark:text-slate-500 text-slate-300" />
      <CornerIcon className="absolute h-4 w-4 -bottom-2 -right-2 dark:text-slate-500 text-slate-300" />

      {/* Hover arka plan efekti */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Başlık ve temel bilgiler */}
        <div
          className={`text-center transition-all duration-300 w-full mx-auto flex flex-col items-center justify-center ${
            hovered ? "-translate-y-4 opacity-0" : "opacity-100 translate-y-0"
          }`}
        >
          <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2">
            {category}
          </span>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{title}</h3>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {year}
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-500/40 px-2 py-0.5 text-[10px] font-medium">
              {scope}
            </span>
          </div>
        </div>

        {/* Hover sonrası detay metin */}
        <div
          className={`relative z-10 mt-4 text-center px-4 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xs text-slate-100/80 font-medium tracking-wide italic">
            {client} — {summary}
          </p>
          <p className="mt-3 text-[11px] text-slate-200/80">
            Atak Ulaşım güvencesiyle ileri teknoloji projeler.
          </p>
        </div>
      </div>
    </div>
  )
}

const CornerIcon = ({ className, ...rest }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.2}
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  )
}
