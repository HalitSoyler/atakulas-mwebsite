"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function IstanbulMobilPage() {
  const { language } = useLanguage()

  const projectInfo = {
    title: language === "tr" ? "Istanbul Mobil Otobus Sistemleri" : "Istanbul Mobile Bus Systems",
    client: "IETT Genel Mudurlugu",
    location: "Istanbul",
    year: "2020-2024",
  }

  const scope = language === "tr" ? [
    "30.000 adet arac icin CCTV kamera sistemi tasarimi ve uretimi",
    "PIS/PAS yolcu bilgilendirme sistemi donanimlari",
    "LED guzergah panelleri",
    "Surucu kontrol unitelerinin tasarimi ve uretimi",
    "Merkezi yonetim yazilimi gelistirme",
    "Sistem entegrasyonu ve kurulum",
    "Teknik destek ve bakim hizmetleri",
  ] : [
    "CCTV camera system design and production for 30,000 vehicles",
    "PIS/PAS passenger information system hardware",
    "LED route panels",
    "Driver control unit design and production",
    "Central management software development",
    "System integration and installation",
    "Technical support and maintenance services",
  ]

  const technicalDetails = language === "tr" ? [
    "Kamera Sayisi: 30.000+ adet",
    "Arac Sayisi: 5.000+ otobus",
    "Veri Depolama: Merkezi sunucu sistemi",
    "Baglanti: 4G/LTE kablosuz iletisim",
    "Yazilim: Ozel gelistirilmis filo yonetim yazilimi",
    "Standartlar: EN 50155, EN 45545 uyumlu",
  ] : [
    "Camera Count: 30,000+ units",
    "Vehicle Count: 5,000+ buses",
    "Data Storage: Central server system",
    "Connectivity: 4G/LTE wireless communication",
    "Software: Custom developed fleet management software",
    "Standards: EN 50155, EN 45545 compliant",
  ]

  return (
    <main className="bg-background min-h-screen">
      <Header />

      {/* Hero Banner */}
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

      {/* Image Placeholder */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
            <p className="text-muted-foreground text-sm">
              {language === "tr" ? "Proje gorseli buraya eklenecek" : "Project image will be added here"}
            </p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Scope */}
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

            {/* Technical Details */}
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

      {/* Description */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === "tr" ? "Proje Hakkinda" : "About the Project"}
          </h2>
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              {language === "tr"
                ? "Bu proje kapsaminda Istanbul Elektrik Tramvay ve Tunel (IETT) Isletmeleri Genel Mudurlugu'ne bagli toplu tasima araclarinin tamamina CCTV guvenlik kamera sistemleri, yolcu bilgilendirme sistemleri (PIS/PAS) ve LED guzergah panelleri saglanmistir. Proje, Turkiye'nin en buyuk toplu tasima filo donusumu projelerinden biri olup, 30.000'den fazla kameranin entegrasyonunu icermektedir."
                : "Within the scope of this project, CCTV security camera systems, passenger information systems (PIS/PAS) and LED route panels were provided to all public transport vehicles affiliated to Istanbul Electric Tramway and Tunnel (IETT) Enterprises General Directorate. The project is one of Turkey's largest public transport fleet transformation projects and includes the integration of more than 30,000 cameras."}
            </p>
            <p className="mt-4">
              {language === "tr"
                ? "Sistem, merkezi yonetim yazilimi ile entegre calisarak gercek zamanli izleme, kayit ve raporlama imkani sunmaktadir. Tum donanimlar EN 50155 ve EN 45545 standartlarina uygun olarak uretilmis olup, arac ici zorlu kosullara dayaniklidir."
                : "The system works integrated with central management software, offering real-time monitoring, recording and reporting capabilities. All hardware is manufactured in accordance with EN 50155 and EN 45545 standards and is resistant to harsh in-vehicle conditions."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
