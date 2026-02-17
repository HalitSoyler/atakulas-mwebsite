"use client"

import { use } from "react"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function VanMobilPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { language } = useLanguage()

  const projectInfo = {
    title: language === "tr" ? "Van Mobil Ulasim Projesi" : "Van Mobile Transport Project",
    client: "Van Buyuksehir Belediyesi",
    location: "Van",
    year: "2022-2023",
  }

  const scope = language === "tr" ? [
    "100+ arac icin CCTV kamera sistemi",
    "Yolcu bilgilendirme sistemi (PIS/PAS)",
    "Interkom sistemleri",
    "GPS takip ve filo yonetimi",
    "Merkezi izleme yazilimi",
    "Kurulum ve devreye alma",
  ] : [
    "CCTV camera system for 100+ vehicles",
    "Passenger information system (PIS/PAS)",
    "Intercom systems",
    "GPS tracking and fleet management",
    "Central monitoring software",
    "Installation and commissioning",
  ]

  const technicalDetails = language === "tr" ? [
    "Arac Sayisi: 100+ otobus",
    "Kamera Tipi: IP tabanli HD kameralar",
    "Baglanti: 4G/LTE kablosuz iletisim",
    "GPS Dogrulugu: < 3 metre",
    "Depolama: Arac ici DVR + Merkezi sunucu",
  ] : [
    "Vehicle Count: 100+ buses",
    "Camera Type: IP-based HD cameras",
    "Connectivity: 4G/LTE wireless communication",
    "GPS Accuracy: < 3 meters",
    "Storage: In-vehicle DVR + Central server",
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
            {language === "tr" ? "Tum Projeler" : "All Projects"}
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
                {language === "tr" ? "Proje Kapsami" : "Project Scope"}
              </h2>
              <ul className="space-y-3">
                {scope.map((item, index) => (
                  <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-1">-</span>
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
                    <span className="text-[#38bdf8] mt-1">-</span>
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
                ? "Van Buyuksehir Belediyesi toplu tasima araclari icin entegre yolcu bilgilendirme ve guvenlik sistemleri saglanmistir. Proje, sehir ici toplu tasima araclarinin modernizasyonunu icermekte olup, yolcu guvenligi ve hizmet kalitesinin arttirilmasini hedeflemektedir."
                : "Integrated passenger information and security systems were provided for Van Metropolitan Municipality public transport vehicles. The project includes the modernization of urban public transport vehicles and aims to increase passenger safety and service quality."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
