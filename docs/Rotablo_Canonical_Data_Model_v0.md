# Rotablo Canonical Data Model v0

## 1. Amaç

Bu doküman, Rotablo'nun ürün tanımını uygulamanın güvenebileceği kanonik veri modeline çevirir.

Amaç:

- Excel gibi ham içerik kaynaklarını normalize etmek
- ürün dilindeki kavramları net domain nesnelerine dönüştürmek
- içerik verisi ile kullanıcı/runtime verisini ayırmak
- ileride kurulacak veritabanı, API ve import hattına stabil bir temel vermek

Bu model, doğrudan SQL şeması değildir. Önce domain modelini sabitler.

## 2. Modelleme İlkeleri

Rotablo veri modeli şu ilkelere göre kurulmalıdır:

1. Görsel veya sembolik veri değil, anlam saklanır.
2. Excel satır yapısı değil, ürün nesneleri kaynak kabul edilir.
3. Küratörlü içerik ile kullanıcı eylemleri farklı katmanlarda tutulur.
4. Uyarılar serbest metin olarak değil, mümkün olduğunca trait tabanlı modellenir.
5. Hesaplanan değerler ile kaynak veriler karıştırılmaz.
6. Etap, sistemdeki ana atomik sürüş birimidir.

## 3. Veri Katmanları

Rotablo verisi üç katmanda düşünülmelidir:

### A. Küratörlü içerik katmanı

Editör veya import süreciyle üretilen, kullanıcıdan bağımsız sabit içerik.

Temel nesneler:

- `route`
- `stage`
- `sideQuest`
- `achievementDefinition`
- `geoAsset`
- `hazardProfile`

### B. Türetilmiş sistem katmanı

İçerik ve kurallardan üretilen, ama kullanıcıya özel olmayan sistem verisi.

Örnekler:

- stage zorluk bandı
- stage risk seviyesi
- önerilen araç segmenti
- stage toplam puanı
- rota toplam km

### C. Kullanıcı / runtime katmanı

Kullanıcıya, planına ve ilerlemesine bağlı veriler.

Temel nesneler:

- `vehicleProfile`
- `budgetScenario`
- `tripPlan`
- `tripSelection`
- `stageCompletion`
- `achievementProgress`
- `xpLedger`

## 4. Çekirdek İçerik Nesneleri

## 4.1 `route`

Bir rota, kullanıcıya gösterilen üst düzey oynanabilir omurgadır.

Route şu tiplerden biri olabilir:

- `main`
- `bypass`
- `connector`

`sideQuest`, route değil; ayrı bir nesne olarak modellenmelidir.

### Route alanları

- `id`
- `code`
- `slug`
- `name`
- `family`
- `summary`
- `description`
- `originLabel`
- `destinationLabel`
- `isLoop`
- `isCrossBorder`
- `countrySet`
- `regionSet`
- `defaultStartCity`
- `defaultEndCity`
- `plannedStageCount`
- `plannedDayCount`
- `plannedDistanceKm`
- `status`
- `sortOrder`
- `heroAssetId`
- `mapAssetId`
- `connectsFromRouteId` nullable
- `connectsToRouteId` nullable

### Route notları

- `main` rotalar ürünün ana omurgasıdır.
- `bypass` rotalar kendi başına kısa rota gibi çalışabilir.
- `connector` rotalar iki rota ailesi arasında köprü görevi görür.
- `connectsFromRouteId` ve `connectsToRouteId`, özellikle `connector` ve bazı `bypass` rotalar için anlamlıdır.

## 4.2 `stage`

Stage, Rotablo'daki en küçük tamamlanabilir ana sürüş birimidir.

Her stage tam olarak bir route'a bağlıdır.

### Stage alanları

- `id`
- `routeId`
- `code`
- `slug`
- `sequenceIndex`
- `dayNumber` nullable
- `dayLabel` nullable
- `title`
- `summary`
- `distanceKm`
- `estimatedDriveMinutes` nullable
- `difficultyScore`
- `sceneryScore`
- `flowIndex` nullable
- `echoIndex` nullable
- `gPotIndex` nullable
- `questTags`
- `primaryVisitName`
- `primaryVisitSummary`
- `detourAnchorName` nullable
- `detourKm` default `0`
- `lodgingOptions`
- `foodOptions`
- `achievementDefinitionId` nullable
- `hazardProfileId`
- `geoAssetId` nullable
- `surfaceType` nullable
- `roadCharacter` nullable
- `fixedRouteFeeTl` nullable
- `fixedRouteFeeNote` nullable
- `country`
- `region`
- `status`

### Stage model kararları

- `sequenceIndex`, route içindeki gerçek sıralamadır ve zorunludur.
- `dayNumber`, yalnızca gerçekten gün bazlı rotalarda dolu olur.
- `dayLabel`, ham kaynaktaki `X`, `Y` gibi değerleri kaybetmemek için vardır; ürün ekranında zorunlu değildir.
- `title`, kullanıcı dostu başlıktır; gerekiyorsa editöryal olarak ayrıca yazılır.
- `primaryVisitName` ve `primaryVisitSummary`, mevcut Excel'deki `Ziyaret Noktası -- Quest Detayı` alanının ayrıştırılmış halidir.

## 4.3 `sideQuest`

Side quest, ana stage'den sapılıp geri dönülen isteğe bağlı keşif etabıdır.

Bu nesne route değildir. Bir `hostStage` üzerine bağlanır.

### Side quest alanları

- `id`
- `hostStageId`
- `hostRouteId`
- `code`
- `slug`
- `name`
- `summary`
- `distanceKm`
- `detourKm`
- `detourAnchorName`
- `difficultyScore`
- `sceneryScore`
- `flowIndex` nullable
- `echoIndex` nullable
- `gPotIndex` nullable
- `questTags`
- `achievementDefinitionId` nullable
- `hazardProfileId`
- `geoAssetId` nullable
- `fixedRouteFeeTl` nullable
- `fixedRouteFeeNote` nullable
- `country`
- `region`
- `status`

### Side quest kuralları

- Her side quest bir stage'e bağlı olmalıdır.
- Side quest tek başına rota kataloğunda ana ürün nesnesi gibi sunulmamalıdır.
- Planlama ekranında kullanıcı tarafından açıkça eklenip çıkarılabilmelidir.

## 4.4 `achievementDefinition`

Achievement, küratörlü bir ödül tanımıdır.

### AchievementDefinition alanları

- `id`
- `code`
- `title`
- `scope`
- `description`
- `badgeKey`
- `xpReward`
- `rarity` nullable
- `status`

### Scope değerleri

- `stage`
- `route`
- `sideQuest`

## 4.5 `hazardProfile`

Araç bazlı uyarılar doğrudan stage üstüne serbest metin olarak gömülmemelidir. Bunun yerine stage veya side quest bir risk profiline bağlanmalıdır.

### HazardProfile alanları

- `id`
- `lowClearanceRisk`
- `narrowRoadRisk`
- `cliffEdgeRisk`
- `hairpinDensity`
- `coldSurfaceRisk`
- `highAltitudeRisk`
- `roughSurfaceRisk`
- `tunnelEchoPresence`
- `seasonalSensitivity`
- `crossBorderComplexity`
- `notes`

### Model mantığı

- İçerik katmanı risk trait'lerini saklar.
- Runtime motoru, kullanıcının araç profiline göre bu trait'lerden uyarı üretir.
- Böylece aynı stage için farklı araçlarda farklı uyarı mesajı üretilebilir.

## 4.6 `geoAsset`

GeoJSON veya benzeri coğrafi veriler içerik nesnesinden ayrı tutulmalıdır.

### GeoAsset alanları

- `id`
- `entityType`
- `entityId`
- `geometryType`
- `sourceType`
- `sourcePath`
- `bbox`
- `distanceKm`
- `startPointLabel`
- `endPointLabel`
- `status`

### Neden ayrı nesne?

- geometri verisi ağırdır
- aynı nesne için farklı çözünürlüklerde veri tutulabilir
- mobil istemci, gerektiğinde özet veya detay geometri çekebilir

## 5. Kullanıcı / Runtime Nesneleri

## 5.1 `vehicleProfile`

Araç profili, uyarı sistemi ve öneri motoru için temel kullanıcı nesnesidir.

### VehicleProfile alanları

- `id`
- `userId`
- `brand`
- `model`
- `year` nullable
- `bodyType`
- `drivetrain`
- `transmission` nullable
- `groundClearanceClass`
- `tireSeason`
- `tirePerformanceClass` nullable
- `powerBand` nullable
- `usageStyle` nullable
- `isPrimary`

### Başlangıç enum mantığı

- `groundClearanceClass`: `low`, `medium`, `high`
- `tireSeason`: `summer`, `allSeason`, `winter`
- `drivetrain`: `fwd`, `rwd`, `awd`, `4wd`

## 5.2 `budgetScenario`

Kullanıcının rotayı farklı ekonomik parametrelerle değerlendirdiği hesap senaryosu.

### BudgetScenario alanları

- `id`
- `userId`
- `name`
- `fuelPriceTlPerLiter`
- `consumptionLitersPer100Km`
- `lodgingTier`
- `lodgingDailyTl`
- `foodDailyTl`
- `includeFixedRouteFees`
- `currency`

### Not

Yakıt maliyeti runtime'da hesaplanmalıdır. Excel'den gelen statik yakıt toplamları kanonik kaynak kabul edilmemelidir.

## 5.3 `tripPlan`

Kullanıcının oluşturduğu gerçek plan nesnesi.

### TripPlan alanları

- `id`
- `userId`
- `routeId`
- `vehicleProfileId`
- `budgetScenarioId`
- `name`
- `status`
- `startDate` nullable
- `selectedStageCount`
- `selectedSideQuestCount`
- `plannedDistanceKm`
- `plannedDriveMinutes` nullable
- `plannedTotalCostTl` nullable

### Status değerleri

- `draft`
- `active`
- `completed`
- `archived`

## 5.4 `tripSelection`

TripPlan içindeki stage ve side quest seçimlerini tutan ara nesne.

### TripSelection alanları

- `id`
- `tripPlanId`
- `entityType`
- `entityId`
- `selectionOrder`
- `isOptional`
- `isIncluded`

### EntityType değerleri

- `stage`
- `sideQuest`

## 5.5 `stageCompletion`

Tamamlama ve ilerleme kaydı.

### StageCompletion alanları

- `id`
- `userId`
- `tripPlanId` nullable
- `entityType`
- `entityId`
- `status`
- `completedAt` nullable
- `completionSource`
- `notes` nullable

### CompletionSource değerleri

- `manual`
- `gps`
- `import`

## 5.6 `achievementProgress`

Kullanıcının kazandığı başarımları tutar.

### AchievementProgress alanları

- `id`
- `userId`
- `achievementDefinitionId`
- `awardedAt`
- `sourceEntityType`
- `sourceEntityId`

## 5.7 `xpLedger`

XP kazanımlarının izlenebilir olması için ledger mantığı önerilir.

### XpLedger alanları

- `id`
- `userId`
- `amount`
- `reasonType`
- `reasonEntityType`
- `reasonEntityId`
- `createdAt`

## 6. Enum ve Sözlükler

## 6.1 Quest tag sözlüğü

Sembol değil, kod saklanmalıdır.

- `drive`
- `scenic`
- `history`
- `gastronomy`
- `wine`
- `coast`
- `elite`
- `nature`

`drone` V0 kapsamı dışındadır.

## 6.2 Route family sözlüğü

- `main`
- `bypass`
- `connector`

## 6.3 Status sözlüğü

İçerik nesneleri için başlangıçta yeterli ortak status seti:

- `draft`
- `active`
- `archived`

## 7. Excel Kaynağından Kanonik Modele Dönüşüm

Excel, kanonik kaynak değil; import kaynağıdır.

## 7.1 Satır tipleri

Import hattı her satırı önce şu tiplere ayırmalıdır:

- `sectionHeader`
- `columnHeader`
- `routeStage`
- `sideQuest`
- `connectorStage`
- `bypassStage`
- `empty`

Header satırları uygulama verisine dönüşmemelidir.

## 7.2 Kolon eşlemesi

### A sütunu: `Gün`

- sayı ise `dayNumber`
- `X`, `Y` gibi işaret ise `dayLabel`
- section/header ise veri dışı

### B sütunu: `Rota--Etap`

- ana route stage ise `route.code` + `stage.code`
- side quest alanında host stage referansına dönüşür
- connector veya bypass kodları ilgili route ailesine göre normalize edilir

### C sütunu: `KM`

- `distanceKm`

### D sütunu: `Konaklama`

- `lodgingOptions.eco`
- `lodgingOptions.mid`
- `lodgingOptions.luxury`

### E sütunu: `Yakıt -- Yol (TL)`

Bu sütun ikiye ayrılmalıdır:

- statik yakıt tahmini varsa import edilir ama `authoritative = false` kabul edilir
- sabit yol, köprü, sınır, feribot gibi ücret varsa `fixedRouteFeeTl` ve `fixedRouteFeeNote` alanına taşınır

Kanonik bütçe motoru için asıl kaynak bu sütun olmamalıdır.

### F sütunu: `Gastronomi`

- `foodOptions.option1`
- `foodOptions.option2`
- `foodOptions.option3`

### G sütunu: `Quest`

- semboller enum kodlarına çevrilir
- saklanan değer dizi olmalıdır

### H sütunu: `Zorluk -- Manzara`

- `difficultyScore`
- `sceneryScore`

### I sütunu: `Detour`

- `detourAnchorName`
- `detourKm`

### J sütunu: `Ziyaret Noktası -- Quest Detayı`

Mümkünse şu iki alana ayrılır:

- `primaryVisitName`
- `primaryVisitSummary`

Ayraç güvenilmezse tüm değer önce `primaryVisitSummary` olarak tutulur, editöryal ayrıştırma sonra yapılır.

### K sütunu: `Başarım`

- `achievementDefinition.title`

## 7.3 Import sonrası zorunlu normalizasyonlar

- sheet isimlerindeki trailing space temizlenmeli
- ikon ve emoji değerleri enum'a çevrilmeli
- tekrar eden achievement başlıkları birleştirilmeli
- stage kodları standart biçime getirilmeli
- side quest host ilişkileri doğrulanmalı
- connector ve bypass route ayrımı açık biçimde işaretlenmeli

## 8. Alan Tipi ve Validation Kuralları

## 8.1 Ortak kurallar

- tüm `id` alanları stabil ve insan editine kapalı olmalıdır
- tüm `code` alanları editöryal görünür kimliktir
- `slug` alanları URL ve mobil deep link dostu olmalıdır

## 8.2 Route validation

- `family` zorunludur
- `name` zorunludur
- `plannedStageCount >= 1`
- `plannedDistanceKm > 0`

## 8.3 Stage validation

- her stage bir route'a bağlı olmalıdır
- `sequenceIndex` route içinde benzersiz olmalıdır
- `distanceKm > 0`
- `difficultyScore` 1 ile 5 arasında olmalıdır
- `sceneryScore` 1 ile 10 arasında olmalıdır
- `questTags` boş olabilir ama null olmamalıdır

## 8.4 Side quest validation

- her side quest bir `hostStageId` taşımalıdır
- `detourKm >= distanceKm` olmak zorunda değildir; çünkü bir side quest toplam ekstra sapmayı ifade edebilir
- `distanceKm > 0`

## 8.5 Achievement validation

- `title` zorunludur
- `scope` zorunludur
- `xpReward >= 0`

## 9. Modelin Bilinçli Ayrımları

Bu v0 modelinde bilinçli olarak şu ayrımlar yapılmıştır:

### `route` ile `sideQuest` ayrıdır

Çünkü side quest, rota kataloğunda ana omurga gibi davranmaz; host stage'e bağlıdır.

### `hazardProfile` ile `vehicleWarning` ayrıdır

İçerik aynı kalırken araç bazlı uyarı değişebilir.

### `fixedRouteFeeTl` ile yakıt maliyeti ayrıdır

Yakıt dinamik hesaplanır; köprü, feribot, sınır veya sabit yol masrafı ise içerik tarafında tutulabilir.

### `sequenceIndex` ile `dayNumber` ayrıdır

Ham kaynakta her etap gerçek gün numarası taşımıyor. Sıralama ile takvim aynı şey değildir.

## 10. Örnek Kanonik Temsil

```json
{
  "route": {
    "id": "route:r01",
    "code": "R01",
    "name": "Rota 01",
    "family": "main",
    "plannedDayCount": 37,
    "plannedDistanceKm": 7300,
    "isCrossBorder": false
  },
  "stage": {
    "id": "stage:r01:01-03",
    "routeId": "route:r01",
    "code": "01-03",
    "sequenceIndex": 9,
    "dayNumber": 9,
    "distanceKm": 210,
    "difficultyScore": 3,
    "sceneryScore": 9,
    "questTags": ["drive", "coast", "wine"],
    "detourAnchorName": "Balıkaşıran",
    "detourKm": 15
  },
  "sideQuest": {
    "id": "sq:r04:d01:belgrad-ormani",
    "hostStageId": "stage:r04:04-01",
    "distanceKm": 35,
    "questTags": ["drive", "nature"]
  }
}
```

## 11. Teknik Faz İçin Sonraki Adım

Bu modelden sonra üretilecek doğru belge:

`Application Architecture v0`

Bu belgede artık şu kararlar verilebilir:

- PostgreSQL / PostGIS gerekip gerekmediği
- GeoJSON saklama yaklaşımı
- Node.js servis sınırları
- React Native ekran veri kontratları
- admin/import paneli ihtiyacı
- AI destekli içerik işleme noktaları

## 12. Sonuç

Rotablo'nun veri omurgası, Excel satırlarının birebir kopyası olmamalıdır. Doğru yaklaşım:

- rotayı ayrı,
- stage'i ayrı,
- side quest'i ayrı,
- risk trait'ini ayrı,
- kullanıcı planını ayrı,
- tamamlama ve oyunlaştırmayı ayrı

modellemektir.

Bu ayrım doğru yapılırsa, hem MVP hızlı çıkar hem de sistem daha sonra karmaşıklaşmadan büyüyebilir.
