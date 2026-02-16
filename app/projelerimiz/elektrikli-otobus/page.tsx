"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function ElektrikliOtobusPage() {
  const { language } = useLanguage()

  const projectInfo = {
    title: language === "tr" ? "Elektrikli Otobus Donusum Projesi" : "Electric Bus Conversion Project",
    client: "Ankara EGO",
    location: "Ankara",
    year: "2024",
  }

  const scope = language === "tr" ? [
    "Dizel motorlu otobuslerin elektrikli sisteme donusumu",
    "Batarya yonetim sistemi (BMS) tasarimi",
    "Elektrik motoru entegrasyonu",
    "Sarj altyapisi planlama",
    "Performans izleme yazilimi",
    "Test ve sertifikasyon islemleri",
  ] : [
    "Conversion of diesel buses to electric system",
    "Battery management system (BMS) design",
    "Electric motor integration",
    "Charging infrastructure planning",
    "Performance monitoring software",
    "Testing and certification processes",
  ]

  const technicalDetails = language === "tr" ? [
    "Batarya Kapasitesi: Proje bazli belirlenir",
    "Motor Tipi: AC asenkron / PMSM",
    "Menzil: 200-300 km (kosullara bagli)",
    "Sarj Suresi: 2-4 saat (tip-2 sarj)",
    "Omur: 10+ yil / 500.000+ km",
  ] : [
    "Battery Capacity: Determined per project",
    "Motor Type: AC asynchronous / PMSM",
    "Range: 200-300 km (depending on conditions)",
    "Charging Time: 2-4 hours (type-2 charging)",
    "Lifespan: 10+ years / 500,000+ km",
  ]

  return (
    <main className="bg-background min-h-screen">
      <Header />

      <section className="pt-28 pb-16 bg-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/projelerimiz"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "tr" ? "Tum Projeler" : "All Projects"}
          </Link>
          <h1 className="text-3xl font-semibold text-primary-foreground sm:text-4xl">
            {projectInfo.title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-4 text-primary-foreground/80 text-sm">
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {projectInfo.client}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {projectInfo.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {projectInfo.year}
            </span>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
            <p className="text-muted-foreground text-sm">
              {language === "tr" ? "Proje gorseli buraya eklenecek" : "Project image will be added here"}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {language === "tr" ? "Proje Kapsami" : "Project Scope"}
              </h2>
              <ul className="space-y-3">
                {scope.map((item, index) => (
                  <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {language === "tr" ? "Teknik Detaylar" : "Technical Details"}
              </h2>
              <ul className="space-y-3">
                {technicalDetails.map((item, index) => (
                  <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === "tr" ? "Proje Hakkinda" : "About the Project"}
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              {language === "tr"
                ? "Mevcut dizel motorlu otobuslerin elektrikli sisteme donusturulmesine yonelik pilot proje. Bu proje ile belediyelerin mevcut filolarini ekonomik sekilde elektrikli ulasima gecirmesi hedeflenmektedir. Donusum sureci, batarya sistemi entegrasyonu, motor degisimi ve gerekli elektronik kontrol sistemlerinin kurulumunu icermektedir."
                : "A pilot project for converting existing diesel buses to electric systems. This project aims to enable municipalities to economically transition their existing fleets to electric transportation. The conversion process includes battery system integration, motor replacement and installation of necessary electronic control systems."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
