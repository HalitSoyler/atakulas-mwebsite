"use client"

import { Monitor, Speaker, Radio, LayoutGrid, Tv, Volume2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import Link from "next/link"

const products = [
  {
    icon: Monitor,
    title: "Sürücü Kontrol Ünitesi",
    description: "EN50155, EN50121 sertifikalı raylı sistem aracı için entegre dokunmatik ekranlı endüstriyel bilgisayar.",
    specs: ["Dokunmatik Ekran", "Panel Montaj", "PIS Yazılımı", "RS-485 Haberleşme"]
  },
  {
    icon: Speaker,
    title: "IP Amfi Cihazı (IP Anons Sistemi)",
    description: "Raylı sistem araçları için yüksek performanslı IP tabanlı ses yönetim birimi. 4×30W kanal, −40°C / +70°C, IPv4.",
    specs: ["4×30W Çıkış", "−40°C / +70°C", "IPv4", "M12 / RJ45"]
  },
  {
    icon: Radio,
    title: "IP Intercom ve Anons Sistemi (Anfi Cihazı)",
    description: "Raylı sistemler için çok kanallı, yüksek verimlilikte IP tabanlı intercom ve seslendirme çözüm birimi. 6×15W, 8 Ω, 18–36V.",
    specs: ["6×15W Kanal", "2 Kanallı Giriş", "8 Ω", "−40°C / +70°C", "112×51×200 mm"]
  },
  {
    icon: Radio,
    title: "İnterkom Ünitesi",
    description: "RJ45 port üzerinden PoE besleme ve IP haberleşme özellikli acil durum interkom sistemi.",
    specs: ["PoE Besleme", "IP Haberleşme", "RJ45 Port", "Acil Durum"]
  },
  {
    icon: LayoutGrid,
    title: "LED Güzergah Panelleri",
    description: "RGB ve tek renkli LED modülleri, dahili kontrol kartı ve RS-485 haberleşme özellikli güzergah paneli.",
    specs: ["RGB LED", "Dahili Kontrol", "Kayan Yazı", "Sabit Metin"]
  },
  {
    icon: Tv,
    title: "Kapı Üstü LCD Ekranlar",
    description: "HDMI üzerinden görsel yönetim PC'den içerik alan stretch LCD yolcu bilgilendirme ekranları.",
    specs: ["Stretch LCD", "HDMI Transmitter", "Otomatik Oynatma", "Yüksek Parlaklık"]
  },
  {
    icon: Volume2,
    title: "Araç İçi Reklam Ekranları",
    description: "Video oynatma özellikli, güzergah bilgisi entegrasyonlu içerik yönetim sistemli ekranlar.",
    specs: ["Video Oynatma", "İçerik Yönetimi", "Güzergah Entegre", "Uzaktan Güncelleme"]
  },
]

export function Products() {
  return (
    <section id="products" className="py-24 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Ürün Kataloğu
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Yolcu Bilgilendirme Sistemi Bileşenleri
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Metro ve tramvay araçları için EN50155, EN50121 standartlarına uygun yerli tasarım ve üretim ürünlerimiz.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card 
              key={product.title} 
              className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 mb-4">
                  <product.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-lg">{product.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.specs.map((spec) => (
                    <span 
                      key={spec}
                      className="text-xs font-medium bg-background text-muted-foreground px-2 py-1 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <InteractiveHoverButton asChild className="w-full rounded-lg bg-transparent border border-border text-foreground hover:bg-muted/50 shadow-none hover:shadow-none size-8">
                  <Link href="/iletisim">Teknik Bilgi İsteyin</Link>
                </InteractiveHoverButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
