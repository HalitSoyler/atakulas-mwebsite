"use client"

import React, { use, useState } from "react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
import { X, ChevronLeft, ChevronRight, ImageIcon, Volume2, ThermometerSun, Network, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

/** Technical spec row for product detail (label + value) */
export interface TechnicalSpec {
  label: string
  value: string
}

/** Key highlight for hero-style product display (e.g. with icon) */
export interface KeyHighlight {
  label: string
  value: string
}

interface Product {
  title: string
  description: string
  specs: string[]
  fullDescription: string
  features: string[]
  images: string[]
  /** Optional tagline under title (e.g. IP Anons slogan) */
  slogan?: string
  /** Optional structured highlights with labels (e.g. 4 kanal, sıcaklık aralığı) */
  keyHighlights?: KeyHighlight[]
  /** Optional technical specs table (Güç Girişi, Portlar, Ölçüler) */
  technicalSpecs?: TechnicalSpec[]
  /** Certification labels (EN 50155, EN 50121-4, CE & RoHS) */
  certifications?: string[]
  /** SEO/accessibility: override alt text for product images */
  imageAlt?: string
}

/** Placeholder for products without images yet */
function ProductImagePlaceholder({ size = "card", className }: { title?: string; size?: "card" | "modal"; className?: string }) {
  const isModal = size === "modal"
  return (
    <div
      className={cn(
        "flex items-center justify-center text-center",
        "bg-gradient-to-br from-slate-100 via-primary/5 to-slate-100",
        "border-b border-border/50",
        isModal ? "min-h-[280px] w-full" : "aspect-[4/3] w-full min-h-[140px]",
        className
      )}
    >
      <div className="p-4 sm:p-6">
        <div className={cn(
          "rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center mx-auto border border-white/90 shadow-sm",
          isModal ? "w-20 h-20 sm:w-24 sm:h-24" : "w-14 h-14 sm:w-16 sm:h-16"
        )}>
          <ImageIcon className={cn("text-primary/40", isModal ? "h-10 w-10 sm:h-12 sm:w-12" : "h-7 w-7 sm:h-8 sm:w-8")} />
        </div>
        <p className="text-muted-foreground text-[11px] sm:text-xs mt-2 sm:mt-3 font-medium">Görsel yakında</p>
        <p className="text-muted-foreground/60 text-[9px] sm:text-[10px] mt-0.5">Image coming soon</p>
      </div>
    </div>
  )
}

/** Renders product image or placeholder */
function ProductThumbnail({ product, className }: { product: Product; className?: string }) {
  const [imgError, setImgError] = useState(false)
  const firstImage = product.images[0]
  const hasValidImage = firstImage && firstImage.startsWith("/") && !imgError

  if (hasValidImage) {
    return (
      <div className={cn("relative overflow-hidden aspect-[4/3] bg-muted/30 flex items-center justify-center", className)}>
        <Image
          src={firstImage}
          alt={product.imageAlt ?? product.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.02] p-1"
          sizes="(max-width: 768px) 100vw, 33vw"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }
  return (
    <ProductImagePlaceholder title={product.title} size="card" className={cn("rounded-t-2xl sm:rounded-t-3xl", className)} />
  )
}

const productCategories: { title: string; description: string; products: Product[] }[] = [
  {
    title: "PIS/PAS Yolcu Bilgilendirme Sistemleri",
    description: "Metro ve tramvay araçları için tam entegre yolcu bilgilendirme sistemleri.",
    products: [
      {
        title: "Sürücü Kontrol Ünitesi",
        description: "EN50155, EN50121 sertifikalı raylı sistem aracı için entegre dokunmatik ekranlı endüstriyel bilgisayar.",
        specs: ["Dokunmatik Ekran", "Panel Montaj", "PIS Yazılımı", "RS-485 Haberleşme"],
        fullDescription: "Sürücü Kontrol Ünitesi, raylı sistem araçları için özel olarak tasarlanmış, EN50155 ve EN50121 standartlarına uygun endüstriyel bir bilgisayardır. Yüksek titreşim ve sıcaklık değişimlerine dayanıklı yapısıyla, zorlu çalışma koşullarında güvenilir performans sağlar.",
        features: [
          "10.4\" kapasitif dokunmatik ekran",
          "Intel Atom işlemci",
          "IP65 koruma sınıfı",
          "GPS ve GLONASS desteği",
          "CAN, RS-485, Ethernet arayüzleri"
        ],
        images: []
      },
      {
        title: "IP Amfi Cihazı (Atak Ulaşım IP Anons Sistemi)",
        description: "Raylı sistem araçları için yüksek performanslı IP tabanlı ses yönetim birimi. 4 bağımsız kanal, ekstrem sıcaklık aralığı ve IPv4 ile kesintisiz dijital iletişim.",
        specs: ["4×30W Çıkış", "−40°C / +70°C", "IPv4", "M12 / RJ45"],
        fullDescription: "IP Amfi Cihazı, Atak Ulaşım IP Anons Sistemi’nin merkezinde yer alan endüstriyel ses yönetim birimidir. Raylı sistem araçları için tasarlanmış olup, her biri 30 Watt gücünde 4 bağımsız ses çıkışı sunar. −40°C ile +70°C arası çalışma sıcaklığı ile ekstrem ortamlarda güvenilir performans sağlar. IPv4 desteği ve M12 / RJ45 (10/100) Ethernet konnektörleri ile kesintisiz dijital iletişim sunar. 112×51×100 mm kompakt tasarımı ile araç içi montaj için idealdir.",
        features: [
          "4 bağımsız kanal, her biri 30 W çıkış gücü",
          "−40°C ile +70°C arası endüstriyel çalışma sıcaklığı",
          "IPv4 desteği ile kesintisiz dijital iletişim",
          "M12 / RJ45 (10/100) Ethernet konnektörleri",
          "24 VDC güç girişi, kompakt 112×51×100 mm tasarım"
        ],
        slogan: "Raylı Sistem Araçları İçin Yüksek Performanslı IP Tabanlı Ses Yönetim Birimi.",
        keyHighlights: [
          { label: "4 Bağımsız Kanal", value: "Her biri 30 Watt gücünde 4 adet ses çıkışı" },
          { label: "Endüstriyel Dayanıklılık", value: "−40°C ile +70°C arası ekstrem çalışma sıcaklığı" },
          { label: "Ağ Protokolü", value: "IPv4 desteği ile kesintisiz dijital iletişim" }
        ],
        technicalSpecs: [
          { label: "Güç Girişi", value: "24 VDC" },
          { label: "Bağlantı Portları", value: "M12 / RJ45 (10/100) Ethernet konnektörleri" },
          { label: "Fiziksel Ölçüler", value: "112 × 51 × 100 mm (kompakt tasarım)" }
        ],
        certifications: ["EN 50155 (Demiryolu – Elektronik Ekipman)", "EN 50121-4 (EMC Uyumluluğu)", "CE & RoHS Uyumluluğu"],
        images: ["/images/products/anons.jpg", "/images/products/anons2.jpg"],
        imageAlt: "Atak Ulaşım IP Amfi Cihazı - Raylı Sistemler Anons Sistemi"
      },
      {
        title: "IP Intercom ve Anons Sistemi (Anfi Cihazı)",
        description: "Raylı sistemler için çok kanallı, yüksek verimlilikte IP tabanlı intercom ve seslendirme çözüm birimi.",
        specs: ["6×15W Kanal", "2 Kanallı Giriş", "8 Ω", "18–36V", "−40°C / +70°C", "112×51×200 mm"],
        fullDescription: "IP Intercom ve Anons Sistemi (Anfi Cihazı), raylı sistem araçları için tasarlanmış çok kanallı, yüksek verimlilikte IP tabanlı intercom ve seslendirme çözüm birimidir. Her biri 15 Watt gücünde 6 bağımsız ses kanalı ve 2 kanallı yüksek sadakatli ses girişi sunar. 18–36V geniş besleme aralığı, 8 ohm tipik yük empedansı desteği ve −40°C ile +70°C arası endüstriyel çalışma koşulları ile zorlu ortamlarda güvenilir performans sağlar. 112×51×200 mm kompakt alüminyum gövde ile araç içi montaj için uygundur.",
        features: [
          "15 Watt gücünde 6 adet bağımsız ses kanalı",
          "2 kanallı yüksek sadakatli ses girişi",
          "8 ohm tipik yük empedansı desteği",
          "18–36V geniş besleme gerilimi aralığı",
          "−40°C ile +70°C arası endüstriyel sıcaklık dayanımı",
          "112×51×200 mm kompakt alüminyum gövde"
        ],
        slogan: "Raylı Sistemler İçin Çok Kanallı, Yüksek Verimlilikte IP Tabanlı Intercom ve Seslendirme Çözüm Birimi.",
        keyHighlights: [
          { label: "6 Bağımsız Ses Kanalı", value: "15 Watt gücünde 6 adet bağımsız ses kanalı" },
          { label: "Ses Girişi", value: "2 kanallı yüksek sadakatli ses girişi" },
          { label: "Çalışma Koşulları", value: "−40°C ile +70°C arası endüstriyel sıcaklık dayanımı" }
        ],
        technicalSpecs: [
          { label: "Ses Kanalları", value: "15 Watt gücünde 6 adet bağımsız ses kanalı" },
          { label: "Ses Girişi", value: "2 kanallı yüksek sadakatli ses girişi" },
          { label: "Empedans", value: "8 ohm tipik yük empedansı desteği" },
          { label: "Güç Gereksinimi", value: "18–36V geniş besleme gerilimi aralığı" },
          { label: "Çalışma Koşulları", value: "−40°C ile +70°C arası endüstriyel sıcaklık dayanımı" },
          { label: "Fiziksel Boyutlar", value: "112×51×200 mm kompakt alüminyum gövde" }
        ],
        certifications: ["EN 50155 (Demiryolu – Elektronik Ekipman)", "EN 50121-4 (EMC Uyumluluğu)", "CE & RoHS Uyumluluğu"],
        images: ["/images/products/IPanons.jpg", "/images/products/IPanons2.jpg"],
        imageAlt: "Atak Ulaşım IP Intercom ve Anons Sistemi - Raylı Sistem Çözümleri"
      },
      {
        title: "Anfi Kontrol Cihazı",
        description: "Raylı sistemlerde ses yönetim ve kontrol süreçleri için tasarlanmış, yüksek güvenilirlikli kontrol birimi.",
        specs: ["18–36V", "Diferansiyel Ses", "RS485", "8×GPIO", "−40°C / +70°C", "112×51×100 mm"],
        fullDescription: "Anfi Kontrol Cihazı, raylı sistemlerde ses yönetim ve kontrol süreçleri için tasarlanmış, yüksek güvenilirlikli bir kontrol birimidir. Diferansiyel ses çıkışı ile yüksek sinyal kalitesi sunar. Topraktan izoleli analog girişler ile elektriksel koruma sağlar. Endüstriyel RS485 haberleşme protokolü ve 8 adet bağımsız GPIO portu ile genişletilebilir yapıdadır. −40°C ile +70°C arası zorlu ortam çalışma sıcaklığı ve 112×51×100 mm kompakt endüstriyel form faktörü ile araç içi montaj için uygundur.",
        features: [
          "18–36V geniş besleme gerilimi aralığı",
          "Diferansiyel ses çıkışı ile yüksek sinyal kalitesi",
          "Topraktan izoleli analog girişler ile elektriksel koruma",
          "Endüstriyel RS485 haberleşme protokolü desteği",
          "8 adet bağımsız GPIO (Genel Amaçlı Giriş/Çıkış) portu",
          "−40°C ile +70°C arası zorlu ortam çalışma sıcaklığı",
          "112×51×100 mm kompakt endüstriyel form faktörü"
        ],
        slogan: "Raylı Sistemlerde Ses Yönetim ve Kontrol Süreçleri İçin Yüksek Güvenilirlikli Kontrol Birimi.",
        keyHighlights: [
          { label: "Ses Çıkışı", value: "Diferansiyel ses çıkışı ile yüksek sinyal kalitesi" },
          { label: "Giriş Güvenliği", value: "Topraktan izoleli analog girişler ile elektriksel koruma" },
          { label: "Haberleşme", value: "Endüstriyel RS485 haberleşme protokolü desteği" }
        ],
        technicalSpecs: [
          { label: "Besleme Gerilimi", value: "18–36 V geniş çalışma aralığı" },
          { label: "Ses Çıkışı", value: "Diferansiyel ses çıkışı (yüksek sinyal kalitesi)" },
          { label: "Giriş Güvenliği", value: "Topraktan izoleli analog girişler ile elektriksel koruma" },
          { label: "Haberleşme", value: "Endüstriyel RS485 haberleşme protokolü desteği" },
          { label: "Genişletilebilirlik", value: "8 adet bağımsız GPIO (Genel Amaçlı Giriş/Çıkış) portu" },
          { label: "Çalışma Sıcaklığı", value: "−40°C ile +70°C arası zorlu ortam dayanıklılığı" },
          { label: "Fiziksel Boyut", value: "112×51×100 mm kompakt endüstriyel form faktörü" }
        ],
        certifications: ["EN 50155 (Demiryolu – Elektronik Ekipman)", "EN 50121-4 (EMC Uyumluluğu)", "CE & RoHS Uyumluluğu"],
        images: ["/images/products/amfi.jpeg"],
        imageAlt: "Atak Ulaşım Anfi Kontrol Cihazı - Raylı Sistem Kontrol Birimi"
      },
      {
        title: "Kabin Anfisi",
        description: "Bilgisayar tabanlı ses sinyallerini kabin içi hoparlör sistemlerine aktaran, yüksek sadakatli kompakt çözüm.",
        specs: ["12–36V", "PC→Kabin Ses", "−40°C / +70°C", "112×51×50 mm"],
        fullDescription: "Kabin Anfisi, bilgisayar tabanlı ses sinyallerini kabin içi hoparlör sistemlerine kayıpsız ileten yüksek sadakatli bir birimdir. 12–36 V geniş voltaj aralığı ile farklı araç besleme sistemlerine uyum sağlar. −40°C ile +70°C arası ekstrem çalışma sıcaklığı ve 112×51×50 mm ultra kompakt boyutlarıyla dar alanlarda kolay kurulum sunar; raylı sistem sürücü kabinleri için idealdir.",
        features: [
          "12–36 V geniş voltaj aralığı desteği",
          "PC ses sinyallerinin kabin hoparlörüne kayıpsız iletimi",
          "−40°C ile +70°C arası ekstrem çalışma sıcaklığı",
          "112×51×50 mm ultra kompakt tasarım, dar alanlarda kolay kurulum"
        ],
        slogan: "Bilgisayar Tabanlı Ses Sinyallerini Kabin İçi Hoparlör Sistemlerine Aktaran Yüksek Sadakatli Çözüm.",
        keyHighlights: [
          { label: "Besleme", value: "12–36 V geniş voltaj aralığı desteği" },
          { label: "Temel Fonksiyon", value: "PC ses sinyallerinin kabin hoparlörüne kayıpsız iletimi" },
          { label: "Kompakt Tasarım", value: "112×51×50 mm ile dar alanlarda kolay kurulum" }
        ],
        technicalSpecs: [
          { label: "Besleme Gerilimi", value: "12–36 V geniş voltaj aralığı desteği" },
          { label: "Temel Fonksiyon", value: "PC ses sinyallerinin kabin hoparlörüne kayıpsız iletimi" },
          { label: "Operasyonel Dayanıklılık", value: "−40°C ile +70°C arası ekstrem çalışma sıcaklığı" },
          { label: "Fiziksel Boyut", value: "112×51×50 mm kompakt tasarım, dar alanlarda kolay kurulum" }
        ],
        certifications: ["EN 50155 (Demiryolu – Elektronik Ekipman)", "EN 50121-4 (EMC Uyumluluğu)", "CE & RoHS Uyumluluğu"],
        images: ["/images/products/kabinanfi.jpeg", "/images/products/kabinanfi2.jpeg"],
        imageAlt: "Atak Ulaşım Kabin Anfisi - Raylı Sistem Ses Çözümleri"
      },
      {
        title: "LED Güzergah Panelleri",
        description: "RGB ve tek renkli LED modülleri, dahili kontrol kartı ve RS-485 haberleşme özellikli güzergah paneli.",
        specs: ["RGB LED", "Dahili Kontrol", "Kayan Yazı", "Sabit Metin"],
        fullDescription: "LED Güzergah Panelleri, yolculara hat ve durak bilgilerini net bir şekilde gösteren yüksek görünürlüklü ekranlardır. Gün ışığında bile okunabilir parlaklık seviyesi ve enerji verimli tasarımıyla öne çıkar.",
        features: [
          "P6 veya P8 piksel aralığı",
          "10.000+ nit parlaklık",
          "Otomatik parlaklık ayarı",
          "Çoklu dil desteği",
          "Uzaktan içerik güncelleme"
        ],
        images: []
      },
      {
        title: "Kapı Üstü LCD Ekranlar",
        description: "HDMI üzerinden görsel yönetim PC'den içerik alan stretch LCD yolcu bilgilendirme ekranları.",
        specs: ["Stretch LCD", "HDMI Transmitter", "Otomatik Oynatma", "Yüksek Parlaklık"],
        fullDescription: "Kapı Üstü LCD Ekranlar, dar alanlara uygun stretch tasarımıyla kapı üstü montaj için idealdir. Yüksek parlaklık ve geniş görüş açısıyla tüm yolculara net görüntü sağlar.",
        features: [
          "28.6\" stretch LCD panel",
          "1920x540 çözünürlük",
          "1000 nit parlaklık",
          "Geniş çalışma sıcaklığı (-20°C ~ +70°C)",
          "Titreşime dayanıklı montaj"
        ],
        images: []
      },
      {
        title: "Araç İçi Reklam Ekranları",
        description: "Video oynatma özellikli, güzergah bilgisi entegrasyonlu içerik yönetim sistemli ekranlar.",
        specs: ["Video Oynatma", "İçerik Yönetimi", "Güzergah Entegre", "Uzaktan Güncelleme"],
        fullDescription: "Araç İçi Reklam Ekranları, yolcu bilgilendirme ve reklam içeriklerini dinamik olarak gösteren çok amaçlı ekranlardır. Merkezi içerik yönetim sistemi ile uzaktan güncellenebilir.",
        features: [
          "21.5\" veya 32\" seçenekleri",
          "Full HD çözünürlük",
          "Android tabanlı medya oynatıcı",
          "4G/WiFi bağlantı",
          "Planlı içerik yayını"
        ],
        images: []
      },
    ]
  },
  {
    title: "İnterkom Sistemleri",
    description: "Acil durum haberleşmesi için gelişmiş interkom çözümleri.",
    products: [
      {
        title: "IP Intercom (Yolcu-Sürücü İletişim Ünitesi)",
        description: "Raylı sistem araçlarında vatman ile görüşme ve acil durum çağrısı için IP tabanlı, güvenli yolcu-sürücü haberleşme çözümü.",
        specs: ["IP Haberleşme", "PoE", "Dahili Mikrofon/Hoparlör", "Konuş/Bekle LED", "Ölçeklenebilir"],
        fullDescription: "Atak Ulaşım IP Intercom, raylı sistem araçlarında yolcu ile sürücü (vatman) arasında güvenli ve kesintisiz sesli iletişim sağlayan IP tabanlı birimdir. İki yönlü sesli iletişim (full-duplex) ile aynı anda konuşma ve dinleme mümkündür; vatman ile görüşme ve acil durum çağrısı senaryoları için tasarlanmıştır. Gelişmiş IP haberleşme protokolü, PoE beslemesi, dahili mikrofon ve hoparlör, 'Konuş' ve 'Bekle' LED göstergeleri ile kullanıcı dostu arayüz sunar. Bir sürücü ünitesi ve istenilen sayıda yolcu ünitesi ile ölçeklenebilir; endüstriyel PC ve santral yazılımı ile tam entegre yönetim ve izleme imkânı sağlar.",
        features: [
          "İki yönlü sesli iletişim (full-duplex) — aynı anda konuşma ve dinleme",
          "Vatman ile görüşme ve acil durum çağrısı için güvenli haberleşme",
          "Gelişmiş IP haberleşme protokolü, ethernet üzerinden kesintisiz dijital iletişim",
          "PoE (Power over Ethernet) — tek kablo ile veri ve enerji iletimi",
          "Dahili yüksek hassasiyetli mikrofon ve endüstriyel hoparlör",
          "'Konuş' ve 'Bekle' LED göstergeleri ile interaktif durum bildirimi",
          "Bir sürücü ünitesi + istenilen sayıda yolcu ünitesi ile ölçeklenebilir yapı",
          "Endüstriyel PC ve santral yazılımı ile tam entegre yönetim ve izleme"
        ],
        slogan: "Raylı Sistem Araçları İçin IP Tabanlı, Güvenli ve Kesintisiz Yolcu-Sürücü Haberleşme Çözümü.",
        keyHighlights: [
          { label: "Haberleşme Protokolü", value: "Gelişmiş IP haberleşme ile ethernet üzerinden kesintisiz dijital iletişim" },
          { label: "Enerji Beslemesi", value: "PoE (Power over Ethernet) — tek kablo ile veri ve enerji iletimi" },
          { label: "Ses Donanımı", value: "Dahili yüksek hassasiyetli mikrofon ve endüstriyel hoparlör" },
          { label: "Kullanıcı Arayüzü", value: "'Konuş' ve 'Bekle' LED göstergeleri ile interaktif durum bildirimi" },
          { label: "Sistem Mimarisi", value: "Bir sürücü ünitesi ve istenilen sayıda yolcu ünitesi ile ölçeklenebilir yapı" },
          { label: "Yönetim", value: "Endüstriyel PC ve santral yazılımı ile tam entegre yönetim ve izleme" }
        ],
        technicalSpecs: [
          { label: "Haberleşme Protokolü", value: "Gelişmiş IP haberleşme protokolü, ethernet üzerinden kesintisiz dijital iletişim" },
          { label: "Enerji Beslemesi", value: "PoE (Power over Ethernet) — tek kablo üzerinden veri ve enerji iletimi" },
          { label: "Ses Donanımı", value: "Cihaz üzerinde dahili yüksek hassasiyetli mikrofon ve endüstriyel hoparlör" },
          { label: "Kullanıcı Arayüzü", value: "'Konuş' ve 'Bekle' LED göstergeleri ile interaktif durum bildirimi" },
          { label: "Sistem Mimarisi", value: "Bir sürücü ünitesi ve istenilen sayıda yolcu ünitesi ile ölçeklenebilir yapı" },
          { label: "Yönetim", value: "Endüstriyel PC ve santral yazılımı ile tam entegre yönetim ve izleme" }
        ],
        certifications: ["EN 50155 (Demiryolu – Elektronik Ekipman)", "EN 50121-4 (EMC Uyumluluğu)", "CE & RoHS Uyumluluğu"],
        images: ["/images/products/IPintercom.jpeg"],
        imageAlt: "Atak Ulaşım IP Intercom - Raylı Sistem Yolcu İletişim Ünitesi"
      },
      {
        title: "Sürücü İnterkom Paneli",
        description: "Sürücü kabini için entegre interkom ve acil durum butonu içeren kontrol paneli.",
        specs: ["Acil Durum Butonu", "Hoparlör", "Mikrofon", "LED Gösterge"],
        fullDescription: "Sürücü İnterkom Paneli, tüm yolcu interkom çağrılarını yönetmek için tasarlanmış merkezi kontrol ünitesidir. Sezgisel arayüzü ile hızlı ve güvenli iletişim sağlar.",
        features: [
          "Çoklu hat yönetimi",
          "Ses kayıt özelliği",
          "Dokunmatik ekran arayüzü",
          "PA sistemi entegrasyonu",
          "Acil durum önceliklendirme"
        ],
        images: []
      },
    ]
  },
  {
    title: "CCTV Güvenlik Sistemleri",
    description: "Araç içi ve platform güvenlik kamera sistemleri.",
    products: [
      {
        title: "CCTV Panel PC",
        description: "Araç içi güvenlik kamera sistemleri için merkezi kontrol ünitesi ve NVR kayıt sistemi.",
        specs: ["NVR Kayıt", "Multi-kamera", "PoE Destekli", "ONVIF Uyumlu"],
        fullDescription: "CCTV Panel PC, araç içindeki tüm güvenlik kameralarını yöneten ve kayıtları depolayan merkezi sistemdir. Yüksek kapasiteli depolama ve akıllı video analizi özellikleri sunar.",
        features: [
          "16 kanal IP kamera desteği",
          "2TB SSD depolama",
          "H.265 sıkıştırma",
          "Akıllı video analizi",
          "Uzaktan erişim"
        ],
        images: []
      },
      {
        title: "Video Yönetim Yazılımı",
        description: "Merkezi video yönetim ve izleme yazılımı, çoklu kamera desteği.",
        specs: ["Canlı İzleme", "Kayıt Oynatma", "Olay Yönetimi", "Merkezi Kontrol"],
        fullDescription: "Video Yönetim Yazılımı, tüm araç filosundaki kameraları tek bir merkezden izleme ve yönetme imkanı sağlayan profesyonel bir yazılım çözümüdür.",
        features: [
          "Sınırsız kamera desteği",
          "Çoklu monitör görüntüleme",
          "Olay tabanlı arama",
          "Harita entegrasyonu",
          "Otomatik yedekleme"
        ],
        images: []
      },
    ]
  },
]

function ProductModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  const [currentImage, setCurrentImage] = useState(0)
  
  if (!isOpen || !product) return null
  
  const hasImages = product.images.length > 0
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white text-foreground/80 transition-colors backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid md:grid-cols-2 min-h-0 h-full max-h-[90vh]">
          {/* Image / Placeholder — sabit çerçeve, foto tam sığar (object-contain) */}
          <div className="relative bg-muted w-full aspect-[4/3] md:aspect-auto md:min-h-[320px] md:max-h-[70vh] overflow-hidden">
            {hasImages ? (
              <div className="absolute inset-3 md:inset-4">
                <Image
                  src={product.images[currentImage] || product.images[0]}
                  alt={product.imageAlt ?? product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <ProductImagePlaceholder title={product.title} size="modal" className="absolute inset-0 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
            )}
            
            {hasImages && product.images.length > 1 && (
              <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        index === currentImage ? "bg-primary scale-110" : "bg-primary/30 hover:bg-primary/50"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors backdrop-blur-sm"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors backdrop-blur-sm"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh] flex flex-col">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{product.title}</h2>
            {product.slogan && (
              <p className="text-muted-foreground text-sm mb-4 leading-snug border-l-2 border-primary/50 pl-3">
                {product.slogan}
              </p>
            )}
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              {product.fullDescription}
            </p>

            {/* Key highlights with icons (badges) */}
            {product.keyHighlights && product.keyHighlights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Öne Çıkan Özellikler</h3>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  {product.keyHighlights.map((h, i) => {
                    const Icon = [Volume2, ThermometerSun, Network][i] ?? Volume2
                    return (
                      <div
                        key={h.label}
                        className="flex items-start gap-2 text-sm bg-muted/60 rounded-lg px-3 py-2.5 border border-border/50"
                      >
                        <Icon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-foreground">{h.label}:</span>{" "}
                          <span className="text-muted-foreground">{h.value}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Özellikler</h3>
              <div className="flex flex-wrap gap-1.5">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-foreground px-2.5 py-1 rounded-md border border-primary/20"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Technical specs: table on desktop, stacked list on mobile to avoid overflow */}
            <div className="mb-6 min-w-0">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Teknik Spesifikasyonlar</h3>
              {product.technicalSpecs && product.technicalSpecs.length > 0 ? (
                <div className="overflow-x-auto -mx-1 px-1">
                  <table className="w-full min-w-[280px] border-collapse text-sm">
                    <tbody>
                      {product.technicalSpecs.map((row) => (
                        <tr key={row.label} className="border-b border-border/60 last:border-0">
                          <td className="py-2 pr-4 font-medium text-foreground whitespace-nowrap align-top">{row.label}</td>
                          <td className="py-2 text-muted-foreground break-words">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs font-medium bg-muted/80 text-muted-foreground px-3 py-1.5 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Certifications / Trust signals */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-auto pt-4 border-t border-border/60">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Sertifikasyon ve Uyumluluk
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center text-[11px] font-medium bg-background border border-border rounded-md px-2.5 py-1.5 text-muted-foreground"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }
export default function UrunlerimizPage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  return (
    <main className="min-h-screen">
      <PageHeroIndustrial
        label="Ürün Kataloğu"
        title="Ürünlerimiz"
        description="Metro ve tramvay araçları için EN50155, EN50121 standartlarına uygun yerli tasarım ve üretim ürünlerimiz."
      />
      
      {/* Product Categories */}
      {productCategories.map((category, categoryIndex) => (
        <section
          key={category.title}
          className="py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-10 sm:mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {category.title}
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                {category.description}
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => (
                <button
                  key={product.title}
                  onClick={() => {
                    setSelectedProduct(product)
                    setIsModalOpen(true)
                  }}
                  className="group text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-card border border-border/60 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <ProductThumbnail product={product} className="rounded-t-2xl sm:rounded-t-3xl" />
                  <div className="p-5 sm:p-6">
                    <h3 className="font-semibold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.specs.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="text-[11px] font-medium bg-muted/80 text-muted-foreground px-2 py-1 rounded-lg"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-xs font-medium text-primary group-hover:underline">
                      Detayları Görüntüle →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedProduct(null) }} />
      
      <Footer />
    </main>
  )
}
