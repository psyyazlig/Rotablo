# Rotablo Application Architecture v0

**Versiyon**: 3.0 (Konsolide Mimari)
**Tarih**: 2026-04-09 

## 1. Amaç ve Mimari Prensipler

Bu doküman, Rotablo'nun ürün tanımlarını (`Product Definition v0`) ve kilitlenmiş MVP kararlarını (`V1 Locked Decisions`) hayata geçirecek net teknik altyapıyı belirler. Geçmiş mimari taslaklarında yer alan ve V1 kilitli kararlarıyla (Örn: GPS takip yok, tamamlama manuel) çelişen "Over-Engineering" (WatermelonDB, Background Location, Geofencing) kavramları ayıklanmış, gerçekçi bir MVP + Ölçeklenme haritası çıkarılmıştır.

**Ana Prensipler:**
- **Offline-Tolerant (Offline-First değil):** V1 için karmaşık WatermelonDB senkronizasyonu yerine, MMKV + Zustand ile salt okunur katalog önbelleği (Cache) ve pending completion kuyruğu kullanılacaktır.
- **REST API Önceliği:** V1 ihtiyaçları dikey sorgular barındırmadığı için GraphQL veya tRPC yerine RESTful API seçilmiştir.
- **Micro-Tasks Mimari:** Hem mobil hem backend, domain-driven (özellik bazlı) klasör yapılarına oturtulmuştur.

---

## 2. Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji / Araç | Gerekçe / MVP Kararı |
|---|---|---|
| **Veritabanı** | PostgreSQL (+ PostGIS) | Supabase Managed DB. Güçlü ilişkisel bütünlük ve coğrafi arama. |
| **Backend API** | Node.js (Fastify) + Prisma ORM | Tipten tipe güvenlik, mikro saniye düzeyinde performans ve kolay RDBMS yönetimi. |
| **Mobile Client** | React Native (Expo EAS) | Tek kod tabanında iki platforma derleme, hızlı build (EAS) süreci. |
| **Harita** | Mapbox GL | Küratörlü yollar için "premium" ve karanlık tema tabanlı custom tile desteği. |
| **State & Cache** | Zustand + React Query + MMKV | Redux'ın hantallığından uzak, performanslı local cache mekanizması (WatermelonDB V2'de değerlendirilecek). |
| **Auth** | Supabase Auth (JWT) | Fastify backend'i JWT doğrulayarak sistemi işletecek. |
| **Hosting** | Railway | Backend API için zero-config, uygun maliyetli ölçeklenebilir platform. |

---

## 3. Sistem Mimarisi & Bileşenler

```text
[ Mobile App (Zustand + MMKV Cache) ]
           |
       REST API (JWT Auth)
           |
[ Node.js Fastify Backend (Prisma ORM) ]
           |
[ Supabase PostgreSQL DB ]
```

### 3.1. Frontend (Mobile) Katmanı Detayı

**Mimari Yaklaşım**: Feature-based folder structure

```text
mobile/
├── src/
│   ├── features/
│   │   ├── auth/          (Login/Register)
│   │   ├── routes/        (Katalog)
│   │   ├── trips/         (Trip planner, bütçe widget'ları)
│   │   └── vehicles/      (Araç profili - 6 alanlı)
│   ├── shared/
│   │   ├── components/    (Ortak UI, kartlar)
│   │   └── store/         (Zustand & MMKV entegrasyonu)
│   ├── navigation/        (Native Stack)
│   └── services/          (Axios interceptor, API calls)
```

### 3.2. Offline ve State Yönetimi (V1)

**Ne Çalışır?** Planlanmış rotanın etaplarını görüntüleme ve manuel olan "Etap Tamamlandı" butonuna basma.
**Nasıl Çalışır?** 
1. İnternet yoksa `StageCompletion` action'ı Zustand içinde `pending_sync_queue` listesine yazılır.
2. İnternet geldiğinde `POST /api/completions/sync` endpointine kuyruk gönderilir.
3. Kapsamlı senkronizasyon (WatermelonDB) motoru MVP (V1) hızını kesmemek adına kurulmaz.

---

## 4. API Endpoints (Core Draft)

*Detaylı sözleşmeler postman/swagger üzerinden şekillenecektir. Genel gruplar:*

- **Public Content:** `GET /api/v1/catalog/routes`, `GET /api/v1/catalog/stages`
- **User Actions:** `POST /api/v1/vehicles`, `POST /api/v1/trips`
- **Gamification:** `POST /api/v1/gamification/complete`, `GET /api/v1/gamification/xp`

---

## 5. Deployment ve Maliyet (V1 Launch)

MVP için izlenecek altyapı:

| Servis | Araç | V1 Maliyet (Tahmini) |
|---|---|---|
| **Veritabanı & DB** | Supabase (Pro veya Free) | $0 - $25/ay |
| **API Hosting** | Railway (Developer) | $5 - $20/ay |
| **App Builds** | Expo EAS | $0 (Aylık 30 build) |
| **Harita** | Mapbox | $0 (İlk 50k yükleme) |
| **Hata Takibi** | Sentry (Team/Free) | $0 - $26/ay |

Ortalama MVP Gideri: İlk aylar **$5-$10**, lansman trafiği ile **$60-$100** bandında tutulacaktır.

---

## 6. Sınırlar: V1 ve V2 Ayrımı

Sistemi karmaşadan korumak için aşağıdaki yetenekler **KESİNLİKLE V1 DIŞIDIR**:
- **Background Location & Geofencing:** (`expo-location` ile arkaplan takibi ve batarya optimizasyonu).
- **Ağır Client DB:** (`WatermelonDB`)
- **Sosyal Ağ Özellikleri:** Puan tabloları, arkadaş ekleme.
- **Gerçek Zamanlı Senkronizasyon:** WebSockets.
