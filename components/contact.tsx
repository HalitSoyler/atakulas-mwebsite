"use client"

import React from "react"

import { useState } from "react"
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

const contactInfo = [
  {
    icon: MapPin,
    label: "Merkez Ofis",
    value: "Ankara - Yenimahalle",
    href: "#"
  },
  {
    icon: MapPin,
    label: "Şube",
    value: "Kayseri Teknopark",
    href: "#"
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 (312) 000 00 00",
    href: "tel:+903120000000"
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "info@atakulas­im.com.tr",
    href: "mailto:info@atakulasim.com.tr"
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Pazartesi - Cuma: 09:00 - 18:00",
    href: null
  },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert("Mesajınız alındı. En kısa sürede size dönüş yapacağız!")
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            İletişim
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            İletişim Formu
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Teknik bilgi, proje detayları ve kurumsal talepler bu form üzerinden iletilmektedir.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-foreground hover:text-primary transition-colors whitespace-pre-line">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-foreground whitespace-pre-line">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Map Placeholder */}
            <div className="mt-8 aspect-video bg-muted rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Ankara - Yenimahalle</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-muted rounded-2xl p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Ad</Label>
                  <Input id="firstName" placeholder="Adınız" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyad</Label>
                  <Input id="lastName" placeholder="Soyadınız" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" placeholder="ornek@sirket.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" type="tel" placeholder="+90 (5XX) XXX XX XX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Şirket</Label>
                  <Input id="company" placeholder="Şirket Adı" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">İlgilendiğiniz Hizmet</Label>
                  <Select>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Hizmet seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rail">Raylı Sistem Ekipmanları</SelectItem>
                      <SelectItem value="pis">PIS/PAS Sistemleri</SelectItem>
                      <SelectItem value="cctv">CCTV Sistemleri</SelectItem>
                      <SelectItem value="maintenance">Bakım Hizmetleri</SelectItem>
                      <SelectItem value="other">Diğer / Çoklu Hizmet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Projeniz veya ihtiyaçlarınız hakkında bilgi verin..."
                    className="min-h-32"
                    required
                  />
                </div>
              </div>
              <InteractiveHoverButton type="submit" className="w-full mt-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Gönderiliyor..."
                ) : (
                  <>
                    Gönder
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </InteractiveHoverButton>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Türkçe ve İngilizce destek mevcuttur.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
