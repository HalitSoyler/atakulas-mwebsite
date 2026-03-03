## Atak Ulaşım – Güvenlik Standartları

Bu dosya, projede kullanılan çevresel değişkenler, XSS yüzeyi ve iletişim formu API’si için uygulanan sertleştirme adımlarını ve yeni geliştirmelerde izlenecek standartları özetler.

---

## 1. Çevresel Değişkenler (ENV) ve `NEXT_PUBLIC_` Kuralları

### 1.1. Mevcut ENV envanteri

Uygulama kaynak kodunda okunan tek çevresel değişken:

- `NEXT_PUBLIC_SITE_URL`  
  - Kullanıldığı yerler:  
    - `app/layout.tsx` içinde `metadataBase` için site kök URL’si  
    - `app/sitemap.ts` içinde `baseUrl`  
    - `app/robots.ts` içinde `baseUrl`  
  - Varsayılan değer: `https://www.atakulasim.com.tr`  
  - Sınıf: **Public (gizli değil)** – domain zaten herkese açık olduğu ve client tarafında da kullanılmasında sakınca olmadığı için `NEXT_PUBLIC_` öneki ile tanımlanması uygundur.

Projede şu anda `.env` dosyası versiyon kontrollü değil (üretilmiş `.env*` dosyası bulunamadı); deployment ortamında aşağıdaki şekilde ayarlanması beklenir:

```bash
NEXT_PUBLIC_SITE_URL=https://www.atakulasim.com.tr
```

Farklı ortamlar için (staging, test vb.) domain değiştikçe bu değişken ortam bazında güncellenir.

### 1.2. Gizli vs. public ENV isimlendirme kuralları

ENV anahtarları iki kategoriye ayrılır:

1. **Gizli (secret) değerler**  
   Örnekler: veritabanı URL’leri, API anahtarları, SMTP şifreleri, token imzalama anahtarları vb.  
   Kurallar:  
   - **Asla** `NEXT_PUBLIC_` ile başlamaz.  
   - Sadece sunucu tarafında (route handler, server component, edge function vb.) okunur.  
   - Örnek isimler:
     - `DATABASE_URL`
     - `REDIS_URL`
     - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`
     - `JWT_SECRET`, `ENCRYPTION_KEY`

2. **Public değerler**  
   Örnekler: public domain, analytics ölçüm ID’leri, tamamen herkese açık feature flag’ler.  
   Kurallar:  
   - Client tarafında okunması gereken tüm değerler **zorunlu olarak** `NEXT_PUBLIC_` ile başlar.  
   - Bu değerler gizli olmayacağı varsayımı ile tasarlanır (herhangi bir kullanıcı source’ta görebilirmiş gibi düşünülür).  
   - Örnek isimler:
     - `NEXT_PUBLIC_SITE_URL`
     - `NEXT_PUBLIC_ANALYTICS_ID`
     - `NEXT_PUBLIC_FEATURE_X_ENABLED`

### 1.3. Uygulama içi kullanım rehberi

- Yeni bir ENV anahtarı eklerken önce şu soru sorulmalı:  
  - **Bu değer kullanıcıya görünse dahi sorun olur mu?**  
    - Evet → Gizli değişken, `NEXT_PUBLIC_` **olamaz**, yalnızca server tarafında kullanılabilir.  
    - Hayır → Public değişken, `NEXT_PUBLIC_` ile isimlendirilebilir.
- Client component’lerde **yalnızca** `NEXT_PUBLIC_` ile başlayan anahtarlar kullanılabilir.  
- Domain değeri için standart kullanım:

```ts
// Sunucu tarafında (örnek)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atakulasim.com.tr"
```

Bu sayede:

- Varsayılan production domain kodda durur,  
- Özel ortam domain’leri `.env` üzerinden yönetilir,  
- Değer public olduğu için `NEXT_PUBLIC_` kullanımı güvenlik açısından sorun oluşturmaz.

---

## 2. XSS Yüzeyi ve HTML Render Standartları

### 2.1. Mevcut `dangerouslySetInnerHTML` kullanımı

Kod tabanında `dangerouslySetInnerHTML` sadece `components/ui/chart.tsx` içerisinde kullanılıyor:

- Bileşen: `ChartStyle`  
- Amaç: Chart konfigürasyonuna göre CSS custom property’leri (`--color-...`) üreten bir `<style>` etiketi oluşturmak.  
- Kaynak: Sadece kod içinden gelen `config` nesnesi; kullanıcı girdisi veya dış veri kaynağı bu string’e girmiyor.

Bu kullanımda:

- Üretilen HTML/CSS **tamamen sabit ve güvenilir** kaynaktan gelmektedir.  
- Kullanıcıdan gelen string veya dış bir HTML parçası işin içine girmediği için pratikte XSS riski yoktur.  
- Bu nedenle mevcut `dangerouslySetInnerHTML` kullanımı güvenli kabul edilmektedir.

### 2.2. Gelecekteki HTML içerikler için şablon

İleride zengin metin (blog, haber, WYSIWYG editör çıktısı, CMS içerikleri vb.) göstermeye ihtiyaç duyulduğunda:

1. HTML içerikler sunucu tarafında mutlaka sanitize edilmelidir. Örnek yaklaşım:  
   - DOMPurify veya benzeri, sunucu uyumlu bir kütüphane ile gelen HTML’den script, inline event handler ve tehlikeli öznitelikler temizlenir.  
2. Uygulamada `dangerouslySetInnerHTML` çağrıları **tek bir wrapper bileşende** toplanmalıdır. Örnek konsept:

```tsx
// Örnek konsept, henüz projede uygulanmadı
function SafeHtml({ html }: { html: string }) {
  const safe = sanitizeHtmlOnServer(html) // DOMPurify vb. ile
  return <div dangerouslySetInnerHTML={{ __html: safe }} />
}
```

Bu sayede:

- `dangerouslySetInnerHTML` doğrudan bileşenlerde kullanılmak yerine tek bir kontrol noktasına hapsedilir.  
- Her yeni HTML gösteriminde aynı sanitize mantığı otomatik olarak uygulanır.

### 2.3. Kullanıcı girdisinin ekrana basılması

Formlardan, URL parametrelerinden veya API’lerden gelen string’ler React JSX içinde doğrudan `{degisken}` şeklinde render edildiğinde:

- React bu string’leri HTML olarak parse etmez, yani ekstra `dangerouslySetInnerHTML` kullanılmadığı sürece XSS riski düşüktür.  
- Yine de aşağıdaki alanlara kullanıcı girdisi koyarken ek kontroller önerilir:
  - `href`, `src`, `iframe src`  
  - `style` veya `className` içinde dinamik parçalar  
  - inline `onClick` benzeri handler isimlerinin dinamik oluşturulması (kaçınılmalı)

Gerek görülürse ileride `sanitizeUrl`, `sanitizeClassFragment` gibi küçük yardımcı fonksiyonlarla bu alanlar için ek doğrulama katmanları eklenebilir.

---

## 3. İletişim Formu API’si ve Yeniden Kullanılabilir Güvenlik Standardı

### 3.1. Mevcut `POST /api/contact` akışı

`app/api/contact/route.ts` dosyasında tanımlı iletişim formu API’si aşağıdaki sertleştirme adımlarını uygular:

1. **Rate limit**  
   - Yardımcı: `checkRateLimit` (`lib/rate-limit.ts`)  
   - Anahtar: `contact:${ip}` (IP bazlı)  
   - Politika: `windowMs = 60_000 ms` (1 dakika), `maxRequests = 5`  
   - Limit aşıldığında:
     - HTTP durum kodu: `429`  
     - Mesaj: teknik detay içermeyen, kullanıcıya yönelik genel bir hata metni.

2. **Şema doğrulama (validation)**  
   - Kütüphane: `zod`  
   - Şema: `contactSchema`  
     - Zorunlu alanlar: `firstName`, `lastName`, `email`, `message`  
     - Opsiyonel alanlar: `phone`, `company`, `service`, `honeypot`  
   - `safeParse` başarısızsa:
     - HTTP durum kodu: `400`  
     - Mesaj: alan detaylarını sızdırmayan, genel bir doğrulama hatası.

3. **Honeypot alanı**  
   - Yardımcı: `honeypotTriggered` (`lib/sanitize.ts`)  
   - Form tarafında `website` alanı görsel olarak gizlenir (screen reader hariç).  
   - Bu alan dolu gönderilirse istek spam olarak kabul edilir ve kullanıcıya başarı döndürülür:
     - HTTP durum kodu: `200`  
     - `success: true`  
   - Böylece botlar geri bildirim almaz, fakat gerçek kullanıcı davranışı bozulmaz.

4. **Sunucu tarafı sanitize**  
   - Yardımcılar:  
     - `sanitizeInput` (metin alanları için)  
     - `sanitizeEmail`  
     - `sanitizePhone`  
   - Tüm kritik alanlar (`firstName`, `lastName`, `email`, `message` vb.) bu fonksiyonlardan geçirilir.  
   - Temel davranışlar:  
     - Maksimum uzunluk sınırlaması,  
     - `null` byte ve gereksiz boşlukların temizlenmesi,  
     - `<script>` ve inline event handler pattern’lerinin temizlenmesi,  
     - E-posta ve telefon formatlarının sadeleştirilip doğrulanması.

5. **Hata mesajları**  
   - Kullanıcıya hiçbir zaman teknik stack trace veya iç hata detayı dönülmez.  
   - Beklenmeyen hatalarda (`try/catch` bloğu) log’a yazılır, kullanıcıya genel bir hata mesajı verilir (`500` durumu).

6. **İstemci tarafı ön-sanitize**  
   - `app/iletisim/page.tsx` ve `components/contact.tsx` içindeki formlar, input değerlerini API’ye göndermeden önce `sanitizeInput` ile temizler.  
   - Sunucu tarafında tekrar sanitize + validate yapıldığı için çift katmanlı bir koruma sağlanır.

### 3.2. Yeni formlar ve API rotaları için standart

Yeni bir form veya herkese açık POST API’si eklerken aşağıdaki standart izlenmelidir:

1. **Rate limit standardı**  
   - Tüm public POST endpoint’lerinde `checkRateLimit` kullanılmalıdır.  
   - Önerilen politika:
     - Kritik formlar (iletişim, teklif, kayıt): en az `windowMs = 60_000`, `maxRequests = 5`.  
     - Daha yoğun beklenen, ama istismar edilmesi daha az kritik endpoint’ler için değerler ihtiyaca göre artırılabilir.  
   - Rate limit anahtarları şu formatta tutulmalıdır:
     - `"{routeName}:{ip}"` (örnek: `"contact:1.2.3.4"`, `"quote:1.2.3.4"`).

2. **Girdi doğrulama ve sanitize standardı**  
   - Her yeni endpoint için bir `zod` şeması tanımlanmalıdır.  
   - Şema:
     - Zorunlu/opsiyonel alanları net tanımlar,  
     - Özel pattern gerekiyorsa (örneğin sadece belirli enum değerleri) `z.enum` vb. ile sınırlar.  
   - Sunucu tarafında:
     - `safeParse` ile doğrulama yapılır.  
     - Ardından string alanlar için `sanitizeInput`, e-posta için `sanitizeEmail`, telefon için `sanitizePhone` kullanılır.  
   - Form bileşenleri tarafında:
     - Gönderim öncesi aynı `sanitizeInput` fonksiyonu ile temel temizlik yapılması tavsiye edilir; API tarafındaki kontrollere **ek** bir bariyer olarak düşünülür.

3. **Honeypot ve spam koruması**  
   - Formlar için `website` benzeri, gizli bir honeypot alanı eklenmelidir.  
   - API tarafında `honeypotTriggered` ile kontrol edilip, tetiklendiğinde:
     - Kullanıcıya her zamanki gibi `success: true` döndürülür (spam tespiti ifşa edilmez).  
     - Gerek görülürse bu durum loglanır.

4. **Hata mesajı standardı**  
   - Yanlış input durumunda:
     - `400` veya `422` kodu ile, alan isimlerine girmeyen genel bir mesaj döndürülmelidir.  
   - Rate limit aşıldığında:
     - `429` kodu ve tekrar denemeyi teşvik eden genel bir mesaj kullanılmalıdır (iletişim API’sindeki metin örnek alınabilir).  
   - Beklenmeyen hatalarda (`500`):
     - Kullanıcıya “beklenmeyen hata” mesajı gösterilir, teknik detaylar yalnızca server log’larında tutulur.

Bu standartlar, mevcut iletişim formu akışında halihazırda uygulanmakta olup, yeni formlar ve POST API rotaları için tekrar kullanılabilir bir güvenlik çerçevesi olarak benimsenmelidir.

