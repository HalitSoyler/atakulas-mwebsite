"use client"

import React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/lib/language-context"

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t, language } = useLanguage()

  const contactInfo = [
    {
      icon: Phone,
      label: language === "tr" ? "Telefon" : "Phone",
      value: "+90 (212) 321 2230",
      href: "tel:+902123212230",
    },
    {
      icon: Mail,
      label: language === "tr" ? "E-posta" : "Email",
      value: "info@atakulasim.com",
      href: "mailto:info@atakulasim.com",
    },
    {
      icon: Clock,
      label: language === "tr" ? "Çalışma Saatleri" : "Working Hours",
      value:
        language === "tr"
          ? "Pazartesi - Cuma: 09:00 - 18:00"
          : "Monday - Friday: 09:00 - 18:00",
      href: null,
    },
  ]

  const offices = [
    {
      name: language === "tr" ? "Merkez Ofis" : "Head Office",
      address: "Ankara - Yenimahalle",
      description:
        language === "tr"
          ? "Genel Müdürlük ve Ar-Ge Merkezi"
          : "Headquarters and R&D Center",
    },
    {
      name: language === "tr" ? "Kayseri Şubesi" : "Kayseri Branch",
      address: "Kayseri Teknopark",
      description:
        language === "tr"
          ? "Üretim ve Test Tesisi"
          : "Production and Test Facility",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert(
      language === "tr"
        ? "Mesajınız alındı. En kısa sürede size dönüş yapacağız!"
        : "Your message has been received. We will get back to you shortly!"
    )
  }

  return (
    <main className="relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              {t.contact.pageTitle}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              <span className="text-gradient">
                {t.contact.pageSubtitle.split(" ").slice(0, 2).join(" ")}
              </span>{" "}
              {t.contact.pageSubtitle.split(" ").slice(2).join(" ")}
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {language === "tr" ? "İletişim Bilgileri" : "Contact Information"}
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex gap-4 glass rounded-xl p-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-foreground">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t.contact.officeTitle}
                </h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <div key={office.name} className="glass rounded-xl p-4 card-hover">
                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-foreground">
                            {office.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {office.address}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {office.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video glass rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Ankara - Yenimahalle
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t.contact.formTitle}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        {language === "tr" ? "Ad" : "First Name"}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={language === "tr" ? "Adınız" : "Your name"}
                        required
                        className="bg-muted/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        {language === "tr" ? "Soyad" : "Last Name"}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={language === "tr" ? "Soyadınız" : "Your surname"}
                        required
                        className="bg-muted/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contact.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@sirket.com"
                        required
                        className="bg-muted/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.contact.phone}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+90 (5XX) XXX XX XX"
                        className="bg-muted/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">
                        {language === "tr" ? "Şirket / Kurum" : "Company / Organization"}
                      </Label>
                      <Input
                        id="company"
                        placeholder={
                          language === "tr"
                            ? "Şirket veya Kurum Adı"
                            : "Company or Organization Name"
                        }
                        className="bg-muted/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">
                        {language === "tr" ? "İlgilendiğiniz Hizmet" : "Service of Interest"}
                      </Label>
                      <Select>
                        <SelectTrigger id="service" className="bg-muted/50 border-border/50">
                          <SelectValue
                            placeholder={
                              language === "tr" ? "Hizmet seçin" : "Select a service"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pis">
                            {language === "tr"
                              ? "PIS/PAS Yolcu Bilgilendirme"
                              : "PIS/PAS Passenger Information"}
                          </SelectItem>
                          <SelectItem value="intercom">
                            {language === "tr"
                              ? "İnterkom Sistemleri"
                              : "Intercom Systems"}
                          </SelectItem>
                          <SelectItem value="cctv">
                            {language === "tr"
                              ? "CCTV Güvenlik Sistemleri"
                              : "CCTV Security Systems"}
                          </SelectItem>
                          <SelectItem value="led">
                            {language === "tr"
                              ? "LED Paneller ve Ekranlar"
                              : "LED Panels and Screens"}
                          </SelectItem>
                          <SelectItem value="electric">
                            {t.nav.electricBus}
                          </SelectItem>
                          <SelectItem value="maintenance">
                            {language === "tr"
                              ? "Bakım ve Onarım"
                              : "Maintenance and Repair"}
                          </SelectItem>
                          <SelectItem value="other">
                            {language === "tr" ? "Diğer" : "Other"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="message">{t.contact.message}</Label>
                      <Textarea
                        id="message"
                        placeholder={
                          language === "tr"
                            ? "Projeniz veya ihtiyaçlarınız hakkında detaylı bilgi verin..."
                            : "Provide detailed information about your project or needs..."
                        }
                        className="min-h-32 bg-muted/50 border-border/50"
                        required
                      />
                    </div>
                  </div>
                  <InteractiveHoverButton type="submit" className="w-full mt-6" disabled={isSubmitting}>
                    {isSubmitting ? (
                      t.contact.sending
                    ) : (
                      <>
                        {t.contact.send}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </InteractiveHoverButton>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    {language === "tr"
                      ? "Türkçe ve İngilizce destek mevcuttur. 24 saat içinde dönüş yapılacaktır."
                      : "Turkish and English support available. Response within 24 hours."}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
