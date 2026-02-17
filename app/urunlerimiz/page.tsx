"use client"

import React, { use, useState } from "react"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { PageHeroIndustrial } from "@/components/page-hero-industrial"
import { X, ChevronLeft, ChevronRight, Play, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  title: string
  description: string
  specs: string[]
  fullDescription: string
  features: string[]
  images: string[] // paths for future real images; empty or invalid = placeholder
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
      <div className={cn("relative overflow-hidden aspect-[4/3]", className)}>
        <Image
          src={firstImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
        images: []
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
        images: []
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
        
        <div className="grid md:grid-cols-2 h-full">
          {/* Image / Placeholder */}
          <div className="relative bg-muted min-h-[280px] md:min-h-0">
            {hasImages ? (
              <div className="relative w-full h-full min-h-[280px]">
                <Image
                  src={product.images[currentImage] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            ) : (
              <ProductImagePlaceholder title={product.title} size="modal" className="min-h-[280px] md:min-h-full rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
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
          <div className="p-6 sm:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
            <h2 className="text-2xl font-bold text-foreground mb-4">{product.title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              {product.fullDescription}
            </p>
            
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Özellikler</h3>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Teknik Özellikler</h3>
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
            </div>
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
