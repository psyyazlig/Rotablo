# Rotablo Terminology Standard v1

## Amaç
Product Definition, Data Model ve kod arasında terminoloji tutarlılığı sağlamak.

## Kanonik Terimler

### Route Ailesi
| Terim | Kullanım | Enum Değeri | Açıklama |
|-------|----------|-------------|----------|
| **Main Route** | Tüm dokümanlarda | `main` | Ana omurga rotalar (R01-R06) |
| **Bypass Route** | Tüm dokümanlarda | `bypass` | Alternatif kısa rotalar |
| **Connector Route** | Tüm dokümanlarda | `connector` | İki rota arası bağlantı |

**Karar**: "connection" terimi kullanılmayacak. Sadece "connector".

**Etkilenen dokümanlar**:
- Product Definition: "Bağlantı / Bypass Rotaları" → "Connector / Bypass Rotaları"

---

### Side Quest
| Soru | Cevap |
|------|-------|
| Side quest bir route mu? | **Hayır** |
| Nasıl modellenir? | Ayrı entity, `hostStageId` ile stage'e bağlı |
| `routeFamily` enum'unda var mı? | **Hayır** |
| Rota kataloğunda gösterilir mi? | Hayır, sadece stage detayında |

**Karar**: Side quest, route değildir. `sideQuest` entity'si ayrı tutulur.

---

### Stage Kodlama
| Format | Örnek | Açıklama |
|--------|-------|----------|
| Ana stage | `01-03` | Rota 01, 3. etap |
| Bypass stage | `BP-02` | Bypass rotası, 2. etap |
| Connector stage | `CN-01` | Connector rotası, 1. etap |

**Karar**: Stage code formatı `{routeCode}-{sequenceNumber}` şeklinde.

**Özel durumlar**:
- Gün numarası olmayan etaplar: `dayNumber = null`, `dayLabel` kullanılır
- `X`, `Y` gibi işaretler: `dayLabel` alanına yazılır

---

### Quest Kategorileri
| Kod | Görünen İsim | Sembol (Excel'den) |
|-----|--------------|-------------------|
| `drive` | Teknik Sürüş | 🏎️ |
| `scenic` | Manzara | 🏔️ |
| `history` | Tarih/Kültür | 🏛️ |
| `gastronomy` | Gastronomi | 🍽️ |
| `wine` | Bağ Evi/Şarap | 🍷 |
| `coast` | Koy/Sahil | 🏖️ |
| `elite` | Ekstrem/Elite | ⚡ |
| `nature` | Doğa/Orman | 🌲 |

**Karar**: Kod değerleri saklanır, semboller UI'da gösterilir. `drone` kategorisi V1'de yok.

---

### Araç Profili Alanları
| Alan | Enum Değerleri | Zorunlu |
|------|----------------|---------|
| `brand` | Free text | ✓ |
| `model` | Free text | ✓ |
| `bodyType` | `sedan`, `suv`, `hatchback`, `coupe`, `convertible` | ✓ |
| `drivetrain` | `fwd`, `rwd`, `awd`, `4wd` | ✓ |
| `groundClearanceClass` | `low`, `medium`, `high` | ✓ |
| `tireSeason` | `summer`, `allSeason`, `winter` | ✓ |

**Karar**: V1'de 6 alan, hepsi zorunlu.

---

### Tamamlama
| Terim | Enum Değeri | Açıklama |
|-------|-------------|----------|
| Manuel tamamlama | `manual` | Kullanıcı işaretledi |
| GPS doğrulamalı | `gps` | V1'de yok, V2'de gelecek |

**Karar**: V1'de sadece `manual`. `completionSource` alanı var ama sadece `manual` değeri kullanılır.

---

### XP ve Achievement
| Terim | Açıklama |
|-------|----------|
| Base XP | Sabit başlangıç değeri (100) |
| Zorluk Çarpanı | `difficultyScore` bazlı (1.0 - 2.0) |
| Manzara Bonusu | `sceneryScore` bazlı (0 - 50) |

**Formül**: `XP = 100 × (1.0 + difficultyScore × 0.2) + (sceneryScore × 5)`

**Örnek**:
- Kolay etap (difficulty=1, scenery=5): 100 × 1.2 + 25 = 145 XP
- Zor etap (difficulty=5, scenery=10): 100 × 2.0 + 50 = 250 XP

---

### Status Değerleri
| Entity | Status Enum |
|--------|-------------|
| Route, Stage, Side Quest | `draft`, `active`, `archived` |
| Trip Plan | `draft`, `active`, `completed`, `archived` |
| Stage Completion | `completed` (tek değer, V1'de) |

---

### Sınır Ötesi
| Alan | V1 Değeri | V1.1 Değeri |
|------|-----------|-------------|
| `isCrossBorder` | `false` (tüm rotalar) | `true` (Gürcistan rotaları) |
| `countrySet` | `["TR"]` | `["TR", "GE"]` |

**Karar**: V1'de Gürcistan içeriği pasif (feature flag kapalı).

---

## Kod Naming Convention

### Backend (Node.js/TypeScript)
```typescript
// Entity isimleri: PascalCase, tekil
class Route {}
class Stage {}
class SideQuest {}

// Enum'lar: PascalCase
enum RouteFamily {
  Main = 'main',
  Bypass = 'bypass',
  Connector = 'connector'
}

// Alan isimleri: camelCase
routeId: string
hostStageId: string
groundClearanceClass: string
```

### Frontend (React Native/TypeScript)
```typescript
// Component isimleri: PascalCase
<RouteCard />
<StageDetail />
<VehicleProfileForm />

// Props: camelCase
routeData: Route
onStageComplete: () => void
```

### Database (PostgreSQL)
```sql
-- Tablo isimleri: snake_case, çoğul
routes
stages
side_quests
vehicle_profiles

-- Kolon isimleri: snake_case
route_id
host_stage_id
ground_clearance_class
```

---

## Tutarsızlık Çözümleri

| Eski Terim (Product Definition) | Yeni Terim (Standart) | Değişiklik Nedeni |
|----------------------------------|----------------------|-------------------|
| "Bağlantı Rotaları" | "Connector Rotaları" | Enum değeriyle uyum |
| "connection" | "connector" | Kod ve model tutarlılığı |
| `routeFamily: sideQuest` | Side quest ayrı entity | Mimari netlik |

---

## Versiyon Geçmişi

| Versiyon | Tarih | Değişiklik |
|----------|-------|------------|
| v1 | 2026-04-07 | İlk versiyon |
