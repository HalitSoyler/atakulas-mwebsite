"use client"
import { makeProjectPage } from "@/components/project-detail-page"

export default makeProjectPage({
  title:    { tr: "Metro/Tramvay PIS Sistemleri", en: "Metro/Tram PIS Systems" },
  client:   { tr: "Çeşitli Belediyeler", en: "Various Municipalities" },
  location: { tr: "Türkiye Geneli", en: "Turkey-wide" },
  year:     "2019–2024",
  summary: {
    tr: "Türkiye genelindeki metro ve tramvay hatları için EN 50155 uyumlu yolcu bilgilendirme sistemleri, sürücü kontrol üniteleri ve interkom altyapısı.",
    en: "EN 50155 compliant passenger information systems, driver control units and intercom infrastructure for metro and tram lines across Turkey.",
  },
  scope: {
    tr: ["Kapı üstü LCD ekranlar","Otomatik anons sistemleri","Sürücü kontrol üniteleri","LED güzergah panelleri","İnterkom sistemleri","Merkezi kontrol yazılımı","Kurulum ve devreye alma","Bakım ve teknik destek"],
    en: ["Above-door LCD screens","Automatic announcement systems","Driver control units","LED route panels","Intercom systems","Central control software","Installation and commissioning","Maintenance and technical support"],
  },
  technical: {
    tr: ["Ekran Boyutu: 15\" - 29\" LCD","Çözünürlük: Full HD (1920x1080)","Parlaklık: 500-1000 nits","Çalışma Sıcaklığı: -25°C ile +70°C","Standartlar: EN 50155, EN 45545","Koruma Sınıfı: IP54 / IP65"],
    en: ["Screen Size: 15\" - 29\" LCD","Resolution: Full HD (1920x1080)","Brightness: 500-1000 nits","Operating Temperature: -25°C to +70°C","Standards: EN 50155, EN 45545","Protection Class: IP54 / IP65"],
  },
  about: {
    tr: "Türkiye genelindeki çeşitli metro ve tramvay hatlarında kullanılmak üzere yolcu bilgilendirme sistemleri (PIS) tasarımı, üretimi ve kurulumu yapılmaktadır.",
    en: "Passenger information systems (PIS) are designed, manufactured and installed for use on various metro and tram lines across Turkey.",
  },
  images:        ["/images/projects/metro.jpg"],
  metric:        { value: "15+", label: { tr: "Hat", en: "Lines" } },
  progress:      85,
  progressLabel: { tr: "Devam Ediyor", en: "Ongoing" },
  tags:          ["PIS/PAS", "İnterkom", "LED"],
  certifications: ["EN 50155", "EN 45545"],
})
