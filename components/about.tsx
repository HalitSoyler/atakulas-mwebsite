import { Shield, Target, Leaf } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Shield,
    title: "Kalite ve Güvenilirlik",
    description: "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018 sertifikalarıyla uluslararası standartlarda üretim."
  },
  {
    icon: Target,
    title: "Yerli Ar-Ge",
    description: "TÜBİTAK destekli projelerle Türkiye'nin dışa bağımlılığını sona erdirme hedefi."
  },
  {
    icon: Leaf,
    title: "Sürdürülebilir Gelecek",
    description: "Çevre dostu üretim süreçleri ve enerji verimliliği odaklı çözümler."
  },
]

const certifications = [
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2018",
  "Yerli Malı Belgesi",
]

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Atak Ulaşım Hakkında
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              1998'den Beri Mühendislik Mükemmelliği
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              ATAK ULAŞIM LTD. ŞTİ., 1998 yılında bilgisayar sektöründe faaliyete başlamış olup, 
              bugün Elektronik Tasarım-Üretim, Yazılım ve Taahhüt alanlarında uzmanlaşmış bir kuruluştur.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Ankara-Yenimahalle merkezli şirketimiz, Kayseri Teknopark şubesiyle birlikte 
              metro ve tramvay araçları için yerli tasarım ve üretim çözümleri sunmaktadır.
            </p>
            
            <div className="mt-10 grid gap-6">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-primary/5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mb-6">
                    <Image 
                      src="/images/Logos/svg_files/header_250x100.svg" 
                      alt="Atak Ulaşım" 
                      width={250} 
                      height={100} 
                      className="mx-auto h-10 w-auto"
                    />
                  </div>
                  <div className="text-6xl font-bold text-foreground">25+</div>
                  <div className="text-lg font-medium text-muted-foreground mt-2">Yıllık Deneyim</div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Sertifikalarımız</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {certifications.map((cert) => (
                        <span key={cert} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
