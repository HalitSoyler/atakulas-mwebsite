"use client"

import { use } from "react"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function ElektrikliOtobusPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { language } = useLanguage()

  const projectInfo = {
    title:
      language === "tr"
        ? "Elektrikli Otobüs Dönüşüm Projesi"
        : "Electric Bus Conversion Project",
    client: "Ankara EGO",
    location: "Ankara",
    year: "2024",
  }

  const scope = language === "tr" ? [
    "Dizel motorlu otobüslerin elektrikli sisteme dönüşümü",
    "Batarya yönetim sistemi (BMS) tasarımı",
    "Elektrik motoru entegrasyonu",
    "Şarj altyapısı planlama",
    "Performans izleme yazılımı",
    "Test ve sertifikasyon işlemleri",
  ] : [
    "Conversion of diesel buses to electric system",
    "Battery management system (BMS) design",
    "Electric motor integration",
    "Charging infrastructure planning",
    "Performance monitoring software",
    "Testing and certification processes",
  ]

  const technicalDetails = language === "tr" ? [
    "Batarya Kapasitesi: Proje bazlı belirlenir",
    "Motor Tipi: AC asenkron / PMSM",
    "Menzil: 200-300 km (koşullara bağlı)",
    "Şarj Süresi: 2-4 saat (Tip-2 şarj)",
    "Ömür: 10+ yıl / 500.000+ km",
  ] : [
    "Battery Capacity: Determined per project",
    "Motor Type: AC asynchronous / PMSM",
    "Range: 200-300 km (depending on conditions)",
    "Charging Time: 2-4 hours (type-2 charging)",
    "Lifespan: 10+ years / 500,000+ km",
  ]

  return (
    <main className="bg-background min-h-screen">
      <section className="pt-28 pb-16 bg-stone-100 dark:bg-[#0f172a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/projelerimiz"
            className="inline-flex items-center gap-2 text-stone-600 dark:text-white/70 hover:text-[#38bdf8] text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "tr" ? "Tüm Projeler" : "All Projects"}
          </Link>
          <h1 className="text-3xl font-semibold text-[#0f172a] dark:text-white sm:text-4xl">
            {projectInfo.title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-4 text-stone-600 dark:text-white/70 text-sm">
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
                {language === "tr" ? "Proje Kapsamı" : "Project Scope"}
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
            {language === "tr" ? "Proje Hakkında" : "About the Project"}
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              {language === "tr"
                ? "Mevcut dizel motorlu otobüslerin elektrikli sisteme dönüştürülmesine yönelik pilot proje. Bu proje ile belediyelerin mevcut filolarını ekonomik şekilde elektrikli ulaşıma geçirmesi hedeflenmektedir. Dönüşüm süreci, batarya sistemi entegrasyonu, motor değişimi ve gerekli elektronik kontrol sistemlerinin kurulumunu içermektedir."
                : "A pilot project for converting existing diesel buses to electric systems. This project aims to enable municipalities to economically transition their existing fleets to electric transportation. The conversion process includes battery system integration, motor replacement and installation of necessary electronic control systems."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
