"use client"

import React, { use, useState } from "react"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
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

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function IletisimPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
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
    <main className="relative overflow-hidden bg-white dark:bg-[#0f172a]">
      <PageHeroIndustrial
        label={t.contact.pageTitle}
        title={t.contact.pageSubtitle}
      />

      {/* Contact Section */}
      <section className="py-20 relative bg-white dark:bg-[#0f172a]">
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
                    <div key={item.label} className="flex gap-4 rounded-xl p-4 border border-[#0f172a]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm">
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
                    <div key={office.name} className="rounded-xl p-4 border border-[#0f172a]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
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
              <div className="aspect-video rounded-xl overflow-hidden relative border border-[#0f172a]/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
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
              <div className="rounded-2xl p-8 border border-[#0f172a]/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm">
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
