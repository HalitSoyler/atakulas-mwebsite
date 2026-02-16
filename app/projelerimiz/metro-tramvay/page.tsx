"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function MetroTramvayPage() {
  const { language } = useLanguage()

  const projectInfo = {
    title: language === "tr" ? "Metro/Tramvay PIS Sistemleri" : "Metro/Tram PIS Systems",
    client: language === "tr" ? "Cesitli Belediyeler" : "Various Municipalities",
    location: language === "tr" ? "Turkiye Geneli" : "Turkey-wide",
    year: "2019-2024",
  }

  const scope = language === "tr" ? [
    "Kapi ustu LCD ekranlar",
    "Otomatik anons sistemleri",
    "Surucu kontrol uniteleri",
    "LED guzergah panelleri",
    "Interkom sistemleri",
    "Merkezi kontrol yazilimi",
    "Kurulum ve devreye alma",
    "Bakim ve teknik destek",
  ] : [
    "Above-door LCD screens",
    "Automatic announcement systems",
    "Driver control units",
    "LED route panels",
    "Intercom systems",
    "Central control software",
    "Installation and commissioning",
    "Maintenance and technical support",
  ]

  const technicalDetails = language === "tr" ? [
    "Ekran Boyutu: 15\" - 29\" LCD",
    "Cozunurluk: Full HD (1920x1080)",
    "Parlaklik: 500-1000 nits",
    "Calisma Sicakligi: -25C ile +70C",
    "Standartlar: EN 50155, EN 45545",
    "Koruma Sinifi: IP54 / IP65",
  ] : [
    "Screen Size: 15\" - 29\" LCD",
    "Resolution: Full HD (1920x1080)",
    "Brightness: 500-1000 nits",
    "Operating Temperature: -25C to +70C",
    "Standards: EN 50155, EN 45545",
    "Protection Class: IP54 / IP65",
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
                ? "Turkiye genelindeki cesitli metro ve tramvay hatlarinda kullanilmak uzere yolcu bilgilendirme sistemleri (PIS) tasarimi, uretimi ve kurulumu yapilmaktadir. Sistemler, EN 50155 ve EN 45545 standartlarina uygun olarak uretilmekte olup, rayli sistem araclarinin zorlu calisma kosullarina dayanikli sekilde tasarlanmistir."
                : "Passenger information systems (PIS) are designed, manufactured and installed for use on various metro and tram lines across Turkey. The systems are manufactured in accordance with EN 50155 and EN 45545 standards and are designed to withstand the harsh operating conditions of rail vehicles."}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
