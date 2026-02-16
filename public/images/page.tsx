"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Monitor, Speaker, Radio, LayoutGrid, Tv, Volume2, Camera, Cpu, Headphones, X, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Product {
  icon: React.ElementType
  title: string
  description: string
  specs: string[]
  fullDescription: string
  features: string[]
  images: string[]
}

const productCategories = [
  {
    title: "PIS/PAS Yolcu Bilgilendirme Sistemleri",
    description: "Metro ve tramvay araçları için tam entegre yolcu bilgilendirme sistemleri.",
    products: [
      {
        icon: Monitor,
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
        images: ["/images/products/driver-unit-1.jpg", "/images/products/driver-unit-2.jpg", "/images/products/driver-unit-3.jpg"]
      },
      {
        icon: Speaker,
        title: "Anons/Amfi Ünitesi",
        description: "Ses giriş/çıkış arayüzleri, iç ve dış hoparlör kontrolü ve zincirleme bağlantı özellikli amfi sistemi.",
        specs: ["RS-485 Port", "Daisy-chain", "İç/Dış Hoparlör", "Ses Kontrolü"],
        fullDescription: "Anons/Amfi Ünitesi, araç içi ve dış anonslar için yüksek kaliteli ses çıkışı sağlayan profesyonel bir sistemdir. Zincirleme bağlantı özelliği sayesinde birden fazla ünite kolayca entegre edilebilir.",
        features: [
          "Class-D amplifikatör teknolojisi",
          "2x50W çıkış gücü",
          "Otomatik ses seviyesi ayarı",
          "Gürültü filtreleme",
          "Acil durum öncelikli anons"
        ],
        images: ["/images/products/announce-unit-1.jpg", "/images/products/announce-unit-2.jpg", "/images/products/announce-unit-3.jpg"]
      },
      {
        icon: LayoutGrid,
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
        images: ["/images/products/led-panel-1.jpg", "/images/products/led-panel-2.jpg", "/images/products/led-panel-3.jpg"]
      },
      {
        icon: Tv,
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
        images: ["/images/products/lcd-door-1.jpg", "/images/products/lcd-door-2.jpg", "/images/products/lcd-door-3.jpg"]
      },
      {
        icon: Volume2,
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
        images: ["/images/products/ad-screen-1.jpg", "/images/products/ad-screen-2.jpg", "/images/products/ad-screen-3.jpg"]
      },
    ]
  },
  {
    title: "İnterkom Sistemleri",
    description: "Acil durum haberleşmesi için gelişmiş interkom çözümleri.",
    products: [
      {
        icon: Radio,
        title: "İnterkom Ünitesi",
        description: "RJ45 port üzerinden PoE besleme ve IP haberleşme özellikli acil durum interkom sistemi.",
        specs: ["PoE Besleme", "IP Haberleşme", "RJ45 Port", "Acil Durum"],
        fullDescription: "İnterkom Ünitesi, yolcuların acil durumlarda sürücü ile iletişim kurmasını sağlayan güvenlik sisteminin temel bileşenidir. PoE teknolojisi sayesinde tek kablo ile hem güç hem data aktarımı yapılır.",
        features: [
          "Tek tuşla acil çağrı",
          "Çift yönlü ses iletişimi",
          "Vandal-proof tasarım",
          "Gürültü bastırma",
          "LED durum göstergesi"
        ],
        images: ["/images/products/intercom-1.jpg", "/images/products/intercom-2.jpg", "/images/products/intercom-3.jpg"]
      },
      {
        icon: Headphones,
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
        images: ["/images/products/driver-intercom-1.jpg", "/images/products/driver-intercom-2.jpg", "/images/products/driver-intercom-3.jpg"]
      },
    ]
  },
  {
    title: "CCTV Güvenlik Sistemleri",
    description: "Araç içi ve platform güvenlik kamera sistemleri.",
    products: [
      {
        icon: Camera,
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
        images: ["/images/products/cctv-panel-1.jpg", "/images/products/cctv-panel-2.jpg", "/images/products/cctv-panel-3.jpg"]
      },
      {
        icon: Cpu,
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
        images: ["/images/products/vms-1.jpg", "/images/products/vms-2.jpg", "/images/products/vms-3.jpg"]
      },
    ]
  },
]

function ProductModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  const [currentImage, setCurrentImage] = useState(0)
  
  if (!isOpen || !product) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid md:grid-cols-2 h-full">
          {/* Image Carousel */}
          <div className="relative bg-muted aspect-square md:aspect-auto min-h-[300px]">
            <img 
              src="/placeholder.svg"
              alt={`${product.title} - Gorsel ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-xs bg-background/80 px-3 py-1 rounded-full">
              Gorsel {currentImage + 1}/3
            </p>
          </div>
            
            {/* Image Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImage ? "bg-primary" : "bg-primary/30"
                  )}
                />
              ))}
            </div>
            
            {/* Arrow Navigation */}
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <product.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{product.title}</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.fullDescription}
            </p>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Teknik Özellikler</h3>
              <div className="flex flex-wrap gap-2">
                {product.specs.map((spec) => (
                  <span key={spec} className="text-xs font-medium bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </div>
  )
}

export default function UrunlerimizPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#1e3a5f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4">
                Ürün Kataloğu
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-balance">
                Ürünlerimiz
              </h1>
              <p className="mt-6 text-lg text-white/80 leading-relaxed">
                Metro ve tramvay araçları için EN50155, EN50121 standartlarına uygun yerli tasarım ve üretim ürünlerimiz.
              </p>
            </div>
            
            {/* Video Demo Placeholder */}
            <div className="hidden lg:block">
              <div className="relative aspect-video bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-cyan-500 transition-colors">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-white/80 mt-4 text-sm">Ürün Tanıtım Videosu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories */}
      {productCategories.map((category, categoryIndex) => (
        <section 
          key={category.title} 
          className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-background' : 'bg-muted'}`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {category.title}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {category.description}
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.products.map((product) => (
                <Card 
                  key={product.title} 
                  className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => openModal(product)}
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
                          className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      İncele
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}
      

      
      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
      
      <Footer />
    </main>
  )
}
