"use client"

import React, { use } from "react"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { IndustrialEditorialFlow } from "@/components/industrial-editorial-flow"
import { IndustrialCapabilitiesPanel } from "@/components/industrial-capabilities-panel"

// Service data - 10 items
const services = [
  {
    id: 1,
    title: "Otomatik Anons Sistemleri",
    titleEn: "Automatic Announcement Systems",
    description: "Metro, tramvay ve otobusler icin otomatik anons ve bilgilendirme sistemleri",
    descriptionEn: "Automatic announcement and information systems for metro, tram and buses",
  },
  {
    id: 2,
    title: "Yolcu ve Surucu Bilgilendirme Sistemleri",
    titleEn: "Passenger & Driver Information Systems",
    description: "PIS/PAS sistemleri ile entegre gorsel ve isitsel bilgilendirme cozumleri",
    descriptionEn: "Visual and audio information solutions integrated with PIS/PAS systems",
  },
  {
    id: 3,
    title: "Telsiz ve Fiber Haberlesme Ekipmanlari",
    titleEn: "Radio & Fiber Communication Equipment",
    description: "Arac-merkez haberlesme sistemleri ve fiber optik altyapi cozumleri",
    descriptionEn: "Vehicle-center communication systems and fiber optic infrastructure solutions",
  },
  {
    id: 4,
    title: "Arac Ustu ve Saha Sinyalizasyon Sistemleri",
    titleEn: "Onboard & Field Signalization Systems",
    description: "Rayli sistem sinyalizasyon ekipmanlari ve kontrol sistemleri",
    descriptionEn: "Rail system signalization equipment and control systems",
  },
  {
    id: 5,
    title: "Arac Ici Data Toplama ve Yonetim Sistemi",
    titleEn: "In-Vehicle Data Collection & Management",
    description: "Arac verilerinin toplanmasi, analizi ve merkezi yonetim sistemleri",
    descriptionEn: "Collection, analysis and centralized management of vehicle data",
  },
  {
    id: 6,
    title: "Guvenlik Sistemleri Cozumleri (CCTV)",
    titleEn: "Security Systems Solutions (CCTV)",
    description: "IP kamera sistemleri, NVR kayit cihazlari ve merkezi izleme yazilimlari",
    descriptionEn: "IP camera systems, NVR recording devices and central monitoring software",
  },
  {
    id: 7,
    title: "Ar-Ge Calismalari",
    titleEn: "R&D Activities",
    description: "TUBITAK destekli Ar-Ge projeleri ve yenilikci teknoloji gelistirme",
    descriptionEn: "TUBITAK supported R&D projects and innovative technology development",
  },
  {
    id: 8,
    title: "Elektronik Kart Tasarim ve Embedded Yazilim",
    titleEn: "Electronic Board Design & Embedded Software",
    description: "PCB tasarimi, elektronik kart uretimi ve gomulu yazilim gelistirme",
    descriptionEn: "PCB design, electronic board production and embedded software development",
  },
  {
    id: 9,
    title: "Proje Bazli Calismalar",
    titleEn: "Project-Based Work",
    description: "Ozel ihtiyaclar icin tasarim, uretim ve uygulama projeleri",
    descriptionEn: "Design, production and implementation projects for special needs",
  },
  {
    id: 10,
    title: "LED Aydinlatma",
    titleEn: "LED Lighting",
    description: "Toplu tasima araclari icin enerji verimli LED aydinlatma sistemleri",
    descriptionEn: "Energy efficient LED lighting systems for public transport vehicles",
  }
]

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function FaaliyetAlanlariPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <main className="min-h-screen">
      <PageHeroIndustrial
        label={isEn ? "ACTIVITY AREAS" : "FAALIYET ALANLARI"}
        title={isEn ? "Our Activity Areas" : "Faaliyet Alanlarimiz"}
        description={
          isEn 
            ? "Electronic product design, production, testing, maintenance, installation for Suburban, High Speed Train, EMU, DMU, Tram, Metro, Light Rail vehicles, Bus, Metrobus and other transportation vehicles"
            : "Elektronik urunlerin tasarimi, Uretimi, testi, bakimi, montaji Banliyo, Hizli Tren, EMU, DMU, Tramvay, Metro, Hafif Rayli sistem araclari, Otobus, Metrobus vb. ulasim araclari"
        }
      />
      
      {/* Şirketimiz bünyesinde — compact grid */}
      <section className="py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {isEn ? "Within Our Company" : "Şirketimiz Bünyesinde"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="border border-border/60 hover:border-primary/25 dark:hover:border-primary/30 transition-colors bg-card/50 dark:bg-card/30"
              >
                <CardContent className="p-3 sm:p-3.5">
                  <h3 className="text-xs font-semibold text-foreground leading-tight mb-0.5">
                    {isEn ? service.titleEn : service.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-2">
                    {isEn ? service.descriptionEn : service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Atak Ulaşım Dönüşüm Standartları — Industrial Editorial Flow */}
      <IndustrialEditorialFlow language={language} />

      {/* Teknik Yetkinlikler — Industrial UI panel */}
      <IndustrialCapabilitiesPanel language={language} />

      <Footer />
    </main>
  )
}
