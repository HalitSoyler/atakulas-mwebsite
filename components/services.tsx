"use client"

import Link from "next/link"
import { Train, Monitor, Camera, Zap, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

export function Services() {
  const { t, language } = useLanguage()

  const services = [
    {
      icon: Monitor,
      title: t.services.pis.title,
      description: t.services.pis.description,
      href: "/urunlerimiz",
      features: language === "tr" 
        ? ["LED Guzergah Paneli", "LCD Ekranlar", "Anons Unitesi", "Veri Yonetimi"]
        : ["LED Route Panel", "LCD Screens", "Announcement Unit", "Data Management"],
    },
    {
      icon: Train,
      title: t.services.intercom.title,
      description: t.services.intercom.description,
      href: "/urunlerimiz",
      features: language === "tr"
        ? ["Surucu Interkomu", "Acil Durum Sistemi", "Yolcu Iletisimi", "Kontrol Paneli"]
        : ["Driver Intercom", "Emergency System", "Passenger Communication", "Control Panel"],
    },
    {
      icon: Camera,
      title: t.services.cctv.title,
      description: t.services.cctv.description,
      href: "/urunlerimiz",
      features: language === "tr"
        ? ["CCTV Panel PC", "NVR Sistemleri", "Panik Butonu", "Merkezi Yazilim"]
        : ["CCTV Panel PC", "NVR Systems", "Panic Button", "Central Software"],
    },
    {
      icon: Zap,
      title: t.services.electricBus.title,
      description: t.services.electricBus.description,
      href: "/hizmetler/elektrikli-otobus",
      badge: t.services.electricBus.badge,
      features: language === "tr"
        ? ["Batarya Sistemi", "Motor Donusumu", "BMS Yazilimi", "Sarj Altyapisi"]
        : ["Battery System", "Motor Conversion", "BMS Software", "Charging Infrastructure"],
    },
  ]

  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-subtle">
      <div className="absolute inset-0 bg-dots opacity-30" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            {t.services.subtitle}
          </p>
          <h2 className="heading-lg text-foreground text-balance">
            {t.services.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <Link key={service.title} href={service.href}>
              <Card
                className="group relative overflow-hidden card-modern h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold bg-secondary text-white px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <service.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
