# Rotablo V1 Kilitli Kararlar

**Versiyon**: 1.0  
**Tarih**: 2026-04-07  
**Karar Sahibi**: Proje Sahibi  
**Durum**: Kilitli - V1 geliştirme boyunca değişmez

---

## Özet Karar Matrisi

| # | Karar Alanı | V1 Kararı | Durum |
|---|-------------|-----------|-------|
| 1 | Ürün Kimliği | Rota Planner + Pasif Companion | 🔒 Kilitli |
| 2 | Planlama UX | Granular Seçim + Filter Helper | 🔒 Kilitli |
| 3 | Tamamlama Mekanizması | Manuel (GPS yok) | 🔒 Kilitli |
| 4 | Araç Profili | 6 Alan Zorunlu | 🔒 Kilitli |
| 5 | Sınır Ötesi İçerik | Türkiye Only | 🔒 Kilitli |
| 6 | XP/Achievement Sistemi | Weighted (Basit Formül) | 🔒 Kilitli |

---

## Karar 1: Ürün Kimliği

### Karar
**V1 = Rota Planner + Pasif Companion**

### Tanım
- Kullanıcı sürüş öncesi rota keşfeder, planlar, hazırlanır
- Sürüş sırasında uygulama pasif kalır (GPS tracking yok)
- Tamamlama sürüş sonrası manuel işaretlenir
- Offline-first mimari zorunlu değil

### Alternatifler ve Neden Reddedildi

| Alternatif | Neden Reddedildi |
|------------|------------------|
| **Sadece Rota Planner** | Vizyonu kısıtlar, "companion" vaadini zayıflatır |
| **Aktif Sürüş Companion** | GPS tracking, background location, battery optimization → MVP için çok ağır |

### Teknik Sonuçlar
- GPS/location servisleri V1'de yok
- Background process yok
- Geofencing yok
- Offline harita verisi opsiyonel
- Push notification minimal (sadece reminder, location-based değil)

### V2'de Yeniden Değerlendirme
- GPS tracking eklenir (opt-in)
- Proximity-based side quest önerileri
- Real-time etap tamamlama doğrulaması

**Karar Tarihi**: 2026-04-07  
**Gerekçe**: MVP hızını korur, teknik riski düşürür, vizyon yönünü açık tutar

---

## Karar 2: Planlama UX

### Karar
**Granular Seçim + Filter Helper**

### Tanım
- Kullanıcı her stage'i checkbox ile seçer/kaldırır
- Side quest'ler her stage altında toggle
- UI'da hızlı seçim helper'ları:
  - "Tümünü Seç"
  - "Tümünü Kaldır"
  - "Sadece Drive Quest"
  - "Sadece Coast Quest"
  - "Zorluk 3+ Etaplar"
  - "Manzara 8+ Etaplar"

### Alternatifler ve Neden Reddedildi

| Alternatif | Neden Reddedildi |
|------------|------------------|
| **Sadece Preset** | Esneklik düşük, kullanıcı kontrolü zayıf |
| **Preset + Granular** | Preset tasarımı içerik işi gerektirir, her rota için özel kürasyon → MVP yavaşlar |

### Teknik Sonuçlar
- `tripSelection` tablosu her stage/side quest için kayıt tutar
- Filter helper'lar runtime'da çalışır (içerik katmanında veri gerektirmez)
- Bütçe hesabı seçim değiştikçe dinamik güncellenir
- Validation: Ardışık gün zorunluluğu yok (kullanıcı istediği kombinasyonu yapabilir)

### V2'de Yeniden Değerlendirme
- Kullanıcı davranışı analiz edilir
- Sık kullanılan kombinasyonlar "Önerilen Paketler" olarak sunulabilir
- AI-powered öneri: "Senin için özel 5 günlük plan"

**Karar Tarihi**: 2026-04-07  
**Gerekçe**: Preset sistemi içerik bağımlılığı yaratır, filter sistemi runtime'da çalışır ve daha hızlı implement edilir

---

## Karar 3: Tamamlama Mekanizması

### Karar
**Manuel Tamamlama (GPS yok)**

### Tanım
- Her stage/side quest için "✓ Tamamla" butonu
- Tek tık işaretleme
- 30 saniye içinde "Geri Al" (toast notification)
- Geçmiş tamamlamalar profil sayfasından düzenlenebilir
- Kötüye kullanım freni: XP katmanında filtreleme

### Alternatifler ve Neden Reddedildi

| Alternatif | Neden Reddedildi |
|------------|------------------|
| **GPS Zorunlu Doğrulama** | Battery drain, privacy concern, offline çalışmaz, teknik karmaşıklık |
| **Manuel + Opsiyonel GPS** | İki sistem paralel → conflict resolution karmaşık, test maliyeti yüksek |
| **İkinci Onay Adımı** | UX friction yaratır ama kötüye kullanımı engellemez |

### Kötüye Kullanım Freni (XP Katmanı)
- Tamamlama hızı analizi:
  - Örnek: 37 günlük rota 2 günde tamamlandı → XP verilir ama rozet verilmez
- V1'de hız rozeti yok
- V1'de leaderboard yok
- V2'de sosyal özellikler gelirse: Sadece "güvenilir" tamamlamalar leaderboard'a dahil

### Geri Al Mekanizması
- **Süre**: 30 saniye
- **UI**: Toast notification: "Etap 3 tamamlandı ✓ [Geri Al]"
- **Scope**: Sadece son işlem
- **Geçmiş düzenleme**: Profil → Tamamlama Geçmişi (zaman sınırı yok)

### Teknik Sonuçlar
- `stageCompletion.completionSource = 'manual'` (tek değer V1'de)
- `completedAt` timestamp saklanır
- GPS servisleri yok
- Location permission request yok

### V2'de Yeniden Değerlendirme
- GPS tracking opt-in olarak eklenir
- "Doğrulanmış Tamamlama" badge sistemi
- Doğrulanmış tamamlama: 2x XP

**Karar Tarihi**: 2026-04-07  
**Gerekçe**: UX sürtünmesiz kalır, teknik karmaşıklık düşük, metrik kirliliği backend'de filtrelenir

---

## Karar 4: Araç Profili

### Karar
**6 Alan Zorunlu**

### Alanlar
1. **Marka** (free text)
2. **Model** (free text)
3. **Gövde Tipi** (`sedan`, `suv`, `hatchback`, `coupe`, `convertible`)
4. **Çekiş Tipi** (`fwd`, `rwd`, `awd`, `4wd`)
5. **Yerden Yükseklik** (`low`, `medium`, `high`)
6. **Lastik Mevsimi** (`summer`, `allSeason`, `winter`)

### Alternatifler ve Neden Reddedildi

| Alternatif | Neden Reddedildi |
|------------|------------------|
| **3-5 Alan (Minimal)** | Uyarı kalitesi düşük, kişiselleştirme zayıf |
| **8-10 Alan, 5 Zorunlu** | Zorunlu/opsiyonel karışımı UX'te belirsizlik yaratır |
| **15+ Alan (Detaylı)** | Onboarding friction, casual kullanıcı kaçırma riski |

### Uyarı Motoru Mantığı
Bu 6 alanla üretilebilecek uyarılar:

| Uyarı Tipi | Gerekli Alanlar | Örnek |
|------------|-----------------|-------|
| Düşük karoser riski | Yerden yükseklik + Gövde tipi | "Low clearance + sedan → dikkat" |
| Tutuş/kayma riski | Lastik + Çekiş + Yerden yükseklik | "Summer tire + RWD + yüksek rakım → risk" |
| Soğuk zemin riski | Lastik + Çekiş | "Summer tire + FWD + kış etabı → tehlikeli" |
| Rüzgar/açık tavan | Gövde tipi | "Convertible + yüksek rakım → soğuk" |
| Hairpin yorgunluğu | Çekiş | "RWD + hairpin yoğun → yorucu" |

### Teknik Sonuçlar
- Onboarding: Tek ekran, 6 alan
- Validation: Hepsi zorunlu
- Birden fazla araç profili: Desteklenir (V1'de)
- Marka/model: Free text (dropdown/API entegrasyonu V2'de)

### V2'de Yeniden Değerlendirme
- "Gelişmiş Profil" feature: +5 alan (motor gücü, vites tipi, süspansiyon, vs.)
- Gelişmiş profil ile uyarılar daha detaylı olur
- Marka/model database entegrasyonu (otomatik spec çekme)

**Karar Tarihi**: 2026-04-07  
**Gerekçe**: Uyarı motoru için hem araç segmenti hem yol tutuş/risk bilgisi gerekir, 6 alan bu dengeyi sağlar

---

## Karar 5: Sınır Ötesi İçerik

### Karar
**V1 = Türkiye Only, V1.1 = Gürcistan (Feature Flag)**

### V1 Kapsamı
- Sadece Türkiye içi rotalar aktif
- `isCrossBorder = false` (tüm rotalar)
- `countrySet = ["TR"]`
- Bütçe simülatörü: Sadece TL
- Harita: Türkiye bbox

### V1.1 Hazırlığı
- Veri modeli cross-border'ı destekler (hazır ama pasif)
- Gürcistan içeriği import edilir ama feature flag kapalı
- UI'da Gürcistan rotaları "Yakında" badge ile gösterilir (opsiyonel)

### Alternatifler ve Neden Reddedildi

| Alternatif | Neden Reddedildi |
|------------|------------------|
| **V1'de Gürcistan Dahil** | İçerik normalizasyonu karmaşık, multi-currency, sınır geçiş uyarıları, harita lisansı, hukuki → MVP yavaşlar |
| **Gürcistan Hiç Yok** | Vizyon kısıtlanır, unique selling point zayıflar |

### V1.1'de Açılacak Özellikler
- `isCrossBorder = true` rotalar aktif
- Sınır geçiş uyarıları:
  - Pasaport kontrolü
  - Araç sigortası (yeşil kart)
  - Vize gerekliliği (Türkiye vatandaşları için yok, ama diğer ülkeler için)
  - Yakıt fiyat farkı uyarısı
- Multi-currency bütçe:
  - Türkiye kısmı: TL
  - Gürcistan kısmı: GEL
  - Toplam: Kullanıcı seçimi (TL veya EUR)

### Teknik Sonuçlar
- V1 backend: Cross-border alanları var ama kullanılmıyor
- V1 frontend: Gürcistan rotaları filtrelenir (feature flag)
- V1.1: Feature flag açılır, yeni UI bileşenleri eklenir

### V2'de Yeniden Değerlendirme
- Diğer sınır ötesi içerikler: Bulgaristan, Yunanistan, İran?
- Schengen uyarıları
- Araç gümrük prosedürleri

**Karar Tarihi**: 2026-04-07  
**Gerekçe**: MVP hızlı çıkar, Gürcistan içeriği hazırlanırken Türkiye'de traction kazanılır, teknik altyapı cross-border'a hazır

---

## Karar 6: XP/Achievement Sistemi

### Karar
**Weighted (Basit Formül)**

### XP Formülü
```
XP = Base × (1.0 + difficultyScore × 0.2) + (sceneryScore × 5)
```

**Sabitler**:
- Base XP: 100
- Zorluk çarpanı: 0.2 (difficulty 1-5 → çarpan 1.0-2.0)
- Manzara bonusu: 5 (scenery 1-10 → bonus 5-50)

**Örnekler**:
- Kolay etap (difficulty=1, scenery=5): 100 × 1.2 + 25 = **145 XP**
- Orta etap (difficulty=3, scenery=7): 100 × 1.6 + 35 = **195 XP**
- Zor etap (difficulty=5, scenery=10): 100 × 2.0 + 50 = **250 XP**

### Side Quest XP
- Side quest XP = Stage XP formülü (aynı mantık)
- Side quest genelde daha kısa → difficulty/scenery daha düşük → XP daha az

### Rota Tamamlama Bonusu
- Rota tamamlama: Toplam stage XP'sinin %20'si bonus
- Örnek: R01 (37 etap, ortalama 180 XP) → 37 × 180 = 6660 XP + %20 bonus = **7992 XP**

### Seviye Sistemi
- Seviye 1-10: Her 1000 XP
- Seviye 11-20: Her 2000 XP
- Seviye 21-30: Her 3000 XP
- Seviye 31+: Her 5000 XP

### Achievement Tipleri (V1)
| Tip | Örnek | XP Ödülü |
|-----|-------|----------|
| Etap bazlı | "Balıkaşıran Bağlarını Keşfettiniz" | 50 XP |
| Rota bazlı | "R01 Tamamlandı" | 500 XP |
| Milestone | "İlk 10 Etap" | 200 XP |
| Kategori | "10 Drive Quest Tamamlandı" | 300 XP |

### V1'de YOK
- Hız rozeti ("En Hızlı R01")
- Leaderboard (global, arkadaş, kulüp)
- Seasonal/event achievement
- Prestige/reset mekanizması
- Combo achievement ("Aynı günde 3 side quest")

### Alternatifler ve Neden Reddedildi

| Alternatif | Neden Reddedildi |
|------------|------------------|
| **Flat XP** | Depth yok, long-term engagement zayıf |
| **Simülasyonist** | Karmaşık (hava, araç match, tamamlama hızı), balance zor, casual kullanıcı alienation |

### Teknik Sonuçlar
- `xpLedger` tablosu her kazanımı kaydeder
- `achievementProgress` tablosu kazanılan achievement'leri tutar
- XP hesabı backend'de (client'a güvenilmez)
- Achievement unlock logic: Event-driven (stage complete → check achievements)

### V2'de Yeniden Değerlendirme
- Hız rozeti eklenir (GPS doğrulamalı tamamlama gelince)
- Leaderboard (sosyal özellikler gelince)
- Seasonal challenge'lar
- Prestige system (seviye 50+ için)

**Karar Tarihi**: 2026-04-07  
**Gerekçe**: Flat sistemden daha motive edici, simülasyonist kadar karmaşık değil, MVP için yeterli depth

---

## Ek Detaylar

### Geri Al Mekanizması (Tamamlama)
- **Süre**: 30 saniye
- **UI**: Toast notification
- **Scope**: Sadece son işlem
- **Geçmiş düzenleme**: Profil sayfasında ayrı bölüm

### Filter Helper'lar (Planlama)
- "Tümünü Seç"
- "Tümünü Kaldır"
- "Sadece Drive Quest"
- "Sadece Coast Quest"
- "Sadece Scenic Quest"
- "Zorluk 3+ Etaplar"
- "Manzara 8+ Etaplar"

---

## Karar Değişiklik Prosedürü

Bu kararlar V1 geliştirme boyunca **kilitlidir**. Değişiklik için:

1. Kritik teknik engel veya kullanıcı feedback'i gerekir
2. Proje sahibi onayı zorunludur
3. Değişiklik bu dokümanda versiyonlanır
4. Etkilenen spec/kod bölümleri güncellenir

---

## Versiyon Geçmişi

| Versiyon | Tarih | Değişiklik |
|----------|-------|------------|
| 1.0 | 2026-04-07 | İlk versiyon - 6 ana karar kilitlendi |
