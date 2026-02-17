"use client"

import React, { use, useState } from "react"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
import Image from "next/image"
import { 
  MapPin,
  Building,
  ArrowRight,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MagicCard } from "@/components/ui/magic-card"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { Badge } from "@/components/ui/badge"
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

// Project data - 6 projects
const projects = [
  {
    id: 1,
    title: "Metro ve Tramvay Yolcu Bilgilendirme Sistemleri",
    titleEn: "Metro & Tram Passenger Information Systems",
    description: "Rayli sistem araclari icin entegre PIS/PAS sistemleri tasarim ve uretimi. TUBITAK sertifikali Ar-Ge projesi.",
    descriptionEn: "Integrated PIS/PAS systems design and production for rail vehicles. TUBITAK certified R&D project.",
    category: "Rayli Sistemler",
    categoryEn: "Rail Systems",
    location: "Turkiye Geneli",
    locationEn: "Across Turkey",
    client: "Rayli Sistem Operatorleri",
    clientEn: "Rail System Operators",
    fullContent: {
      overview: "Metro ve tramvay yolcu bilgilendirme sistemleri tasarim ve uretimi projesi kapsaminda, rayli sistem araclarinin disa bagimliligini azaltarak katma degeri yuksek yerli urunler gelistirdik.",
      overviewEn: "Within the metro and tram passenger information systems design and production project, we developed high value-added domestic products to reduce foreign dependency of rail vehicles.",
      scope: [
        "Surucu Kontrol Unitesi (EN50155, EN50121 sertifikali)",
        "Amfi Unitesi (RS-485 haberlesme)",
        "Interkom Sistemi (TUBITAK 3180491)",
        "LED Guzergah Panelleri",
        "Kapi Ustu LCD Ekranlar",
        "Arac Ici Reklam Ekranlari"
      ],
      scopeEn: [
        "Driver Control Unit (EN50155, EN50121 certified)",
        "Amplifier Unit (RS-485 communication)",
        "Intercom System (TUBITAK 3180491)",
        "LED Route Panels",
        "Above-door LCD Screens",
        "In-vehicle Advertising Screens"
      ],
      certifications: ["TUBITAK 3191697-5190057", "TUBITAK 3180491", "EN50155", "EN50121"]
    }
  },
  {
    id: 2,
    title: "Istanbul Mobil Projesi",
    titleEn: "Istanbul Mobile Project",
    description: "Istanbul Toplu Ulasim Dairesi dolmus filosu icin 30,000 kamera kurulumu. Dahua teknolojisi ile guvenlik altyapisi.",
    descriptionEn: "30,000 camera installation for Istanbul Public Transport minibus fleet. Security infrastructure with Dahua technology.",
    category: "CCTV Sistemleri",
    categoryEn: "CCTV Systems",
    location: "Istanbul",
    locationEn: "Istanbul",
    client: "IBB Toplu Ulasim Dairesi",
    clientEn: "IMM Public Transport Department",
    fullContent: {
      overview: "Istanbul Toplu Ulasim Dairesine bagli tum dolmuslarin guvenlik kamera sistemleri Dahua urunleri ile yenilendi. Turkiye'nin en buyuk toplu tasima guvenlik altyapisi projelerinden biri.",
      overviewEn: "Security camera systems of all minibuses under Istanbul Public Transport Department were renewed with Dahua products. One of Turkey's largest public transport security infrastructure projects.",
      scope: [
        "30,000 adet IP kamera kurulumu",
        "Her aracta 4 kamera + panik buton + NVR",
        "Merkezi yonetim yazilimi entegrasyonu",
        "7/24 canli izleme altyapisi",
        "Bulut tabanli kayit yedekleme"
      ],
      scopeEn: [
        "30,000 IP camera installation",
        "4 cameras + panic button + NVR per vehicle",
        "Central management software integration",
        "24/7 live monitoring infrastructure",
        "Cloud-based recording backup"
      ],
      technicalSpecs: {
        "Kamera Modeli": "HDBW4121FP-M",
        "NVR Modeli": "MNVR1104X 7400",
        "Yazilim": "Dahua DSS7016D",
        "Toplam Kamera": "30,000 adet",
        "Arac Sayisi": "7,500+"
      }
    }
  },
  {
    id: 3,
    title: "Van Mobil Projesi",
    titleEn: "Van Mobile Project",
    description: "Van Buyuksehir Belediyesi toplu tasima araclari icin CCTV guvenlik sistemleri kurulumu ve entegrasyonu.",
    descriptionEn: "CCTV security systems installation and integration for Van Metropolitan Municipality public transport vehicles.",
    category: "CCTV Sistemleri",
    categoryEn: "CCTV Systems",
    location: "Van",
    locationEn: "Van",
    client: "Van Buyuksehir Belediyesi",
    clientEn: "Van Metropolitan Municipality",
    fullContent: {
      overview: "Van Toplu Ulasim Dairesine bagli dolmus ve otobus filosunun tamamina guvenlik kamera sistemleri kurulumu gerceklestirildi.",
      overviewEn: "Security camera systems installation was completed for all minibuses and buses under Van Public Transport Department.",
      scope: [
        "Tum toplu tasima araclari CCTV donanimi",
        "4 kamera + panik buton + NVR (her arac)",
        "Merkezi yonetim sistemi",
        "Teknik destek ve bakim"
      ],
      scopeEn: [
        "CCTV equipment for all public transport vehicles",
        "4 cameras + panic button + NVR (per vehicle)",
        "Central management system",
        "Technical support and maintenance"
      ]
    }
  },
  {
    id: 4,
    title: "ISBAK Arac Ici Sistemler",
    titleEn: "ISBAK In-Vehicle Systems",
    description: "Istanbul ISBAK ve IETT arac ici sistemlerinin isletme, ariza, bakim hizmetleri. PDKS, CCTV ve yolcu bilgilendirme.",
    descriptionEn: "Operation, fault, maintenance services for Istanbul ISBAK and IETT in-vehicle systems. PDKS, CCTV and passenger information.",
    category: "Bakim & Onarim",
    categoryEn: "Maintenance & Repair",
    location: "Istanbul",
    locationEn: "Istanbul",
    client: "ISBAK / IETT",
    clientEn: "ISBAK / IETT",
    fullContent: {
      overview: "Istanbul ISBAK ve IETT arac filosunun elektronik sistemlerinin bakim, onarim ve isletme hizmetlerini kapsamli olarak yurutuyoruz.",
      overviewEn: "We comprehensively carry out maintenance, repair and operation services for electronic systems of Istanbul ISBAK and IETT vehicle fleet.",
      scope: [
        "Yolcu Bilgilendirme Sistemleri bakimi",
        "PDKS cihazlari montaj/demontaj",
        "Metrobus araclari CCTV bakimi",
        "7/24 ariza mudahale"
      ],
      scopeEn: [
        "Passenger Information Systems maintenance",
        "PDKS device installation/removal",
        "Metrobus vehicles CCTV maintenance",
        "24/7 fault intervention"
      ]
    }
  },
  {
    id: 5,
    title: "Otomatik Yaglama Sistemi",
    titleEn: "Automatic Lubrication System",
    description: "Rayli sistem araclari icin PLC kontrollu otomatik ray yaglama sistemi. Akilli algilama ve dozajlama.",
    descriptionEn: "PLC controlled automatic rail lubrication system for rail vehicles. Smart detection and dosing.",
    category: "Ozel Sistemler",
    categoryEn: "Special Systems",
    location: "Turkiye Geneli",
    locationEn: "Across Turkey",
    client: "Metro & Tramvay Operatorleri",
    clientEn: "Metro & Tram Operators",
    fullContent: {
      overview: "Rayli sistem araclari icin gelistirilen otomatik yaglama sistemi, ray mantari ve bodenine programlanabilir araliklarla otomatik yag puskurtme saglar.",
      overviewEn: "The automatic lubrication system developed for rail vehicles provides automatic oil spraying at programmable intervals to rail head and body.",
      scope: [
        "PLC kontrollu otomasyon",
        "Arac algilama sensorleri",
        "Elektrikli yag pompasi",
        "Programlanabilir dozaj ve zaman",
        "Cift tarafli yaglama"
      ],
      scopeEn: [
        "PLC controlled automation",
        "Vehicle detection sensors",
        "Electric oil pump",
        "Programmable dosage and timing",
        "Double-sided lubrication"
      ]
    }
  },
  {
    id: 6,
    title: "Elektrikli Otobus Donusum Projesi",
    titleEn: "Electric Bus Conversion Project",
    description: "Dizel otobuslerin elektrikli sisteme donusturulmesi. Cevre dostu, ekonomik ve surdurulebilir ulasim cozumu.",
    descriptionEn: "Conversion of diesel buses to electric system. Eco-friendly, economical and sustainable transportation solution.",
    category: "Yenilikci Cozumler",
    categoryEn: "Innovative Solutions",
    location: "Ankara",
    locationEn: "Ankara",
    client: "Belediyeler & Ozel Sektor",
    clientEn: "Municipalities & Private Sector",
    fullContent: {
      overview: "Mevcut dizel yakitli otobuslerin elektrikli motor sistemine donusturulmesi projesi. Turkiye'de surdurulebilir ulasim icin oncu adim.",
      overviewEn: "Project to convert existing diesel-powered buses to electric motor system. A pioneering step for sustainable transportation in Turkey.",
      scope: [
        "Motor Gucu: 150-250 kW",
        "Batarya: 200-400 kWh Li-ion",
        "Menzil: 200-350 km",
        "Sarj: 4-6 saat (standart)",
        "Hizlanma: 0-50 km/s: 8-12 saniye"
      ],
      scopeEn: [
        "Motor Power: 150-250 kW",
        "Battery: 200-400 kWh Li-ion",
        "Range: 200-350 km",
        "Charging: 4-6 hours (standard)",
        "Acceleration: 0-50 km/h: 8-12 seconds"
      ]
    }
  }
]

interface Project {
  id: number
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  category: string
  categoryEn: string
  location: string
  locationEn: string
  client: string
  clientEn: string
  fullContent: {
    overview: string
    overviewEn: string
    scope: string[]
    scopeEn: string[]
    certifications?: string[]
    technicalSpecs?: Record<string, string>
  }
}

function ProjectModal({ 
  project, 
  isOpen, 
  onClose,
  language 
}: { 
  project: Project | null
  isOpen: boolean
  onClose: () => void
  language: string
}) {
  if (!isOpen || !project) return null
  
  const isEn = language === "en"
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-primary p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <Badge className="bg-white/20 text-white mb-2">
            {isEn ? project.categoryEn : project.category}
          </Badge>
          <h2 className="text-2xl font-semibold text-white">
            {isEn ? project.titleEn : project.title}
          </h2>
          <div className="flex gap-4 mt-2 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {isEn ? project.locationEn : project.location}
            </span>
            <span className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              {isEn ? project.clientEn : project.client}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isEn ? "About the Project" : "Proje Hakkinda"}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isEn ? project.fullContent.overviewEn : project.fullContent.overview}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isEn ? "Project Scope" : "Proje Kapsami"}
            </h3>
            <ul className="space-y-2">
              {(isEn ? project.fullContent.scopeEn : project.fullContent.scope).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="text-primary mt-1">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.fullContent.certifications && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isEn ? "Certifications" : "Sertifikalar"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.fullContent.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="outline" className="border-border text-muted-foreground">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function FaaliyetAlanlariPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const { language } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const isEn = language === "en"
  
  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

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
      
      {/* Service Cards Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isEn ? "Within Our Company" : "Sirketimiz Bunyesinde"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="border border-border dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/40 transition-all bg-white dark:bg-[#1e293b]"
              >
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {isEn ? service.titleEn : service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {isEn ? service.descriptionEn : service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {isEn ? "Our Projects" : "Projelerimiz"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <MagicCard
                key={project.id}
                className="cursor-pointer overflow-hidden p-0"
                onClick={() => openModal(project)}
              >
                {/* Image Placeholder */}
                <div className="h-40 bg-muted flex items-center justify-center border-b border-border rounded-t-2xl">
                  <p className="text-xs text-muted-foreground">
                    {isEn ? "Project image" : "Proje gorseli"}
                  </p>
                </div>

                <CardContent className="p-4 rounded-b-2xl">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {isEn ? project.categoryEn : project.category}
                  </Badge>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {isEn ? project.titleEn : project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {isEn ? project.descriptionEn : project.description}
                  </p>
                  
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{isEn ? project.locationEn : project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>{isEn ? project.clientEn : project.client}</span>
                    </div>
                  </div>

                  <InteractiveHoverButton 
                    className="text-primary hover:text-primary/80 p-0 h-auto text-xs font-medium bg-transparent shadow-none hover:shadow-none"
                  >
                    {isEn ? "View Details" : "Detaylari Gor"}
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </InteractiveHoverButton>
                </CardContent>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Atak Ulaşım Dönüşüm Standartları — Industrial Editorial Flow */}
      <IndustrialEditorialFlow language={language} />

      {/* Teknik Yetkinlikler — Industrial UI panel */}
      <IndustrialCapabilitiesPanel language={language} />
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal}
        language={language}
      />
      
      <Footer />
    </main>
  )
}
