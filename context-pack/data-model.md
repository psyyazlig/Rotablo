# Rotablo Canonical Data Model Reference

> Referans Dosya: `../docs/Rotablo_Canonical_Data_Model_v0.md` içerisindeki Prisma şemasından okunmuştur.

1. **Layer 1: Curated Content (Read Only)**
   `Route` (1) -> (N) `Stage` (1) -> (N) `SideQuest`
   Zorunlu enumlar: Zorluk (1-5), Manzara (1-10).
2. **Layer 2: User Status**
   `VehicleProfile` -> Seçilen araçla `TripPlan` entegrasyonu. (Drivetrain, BodyType, GroundClearance)
3. **Layer 3: Gamification Ledger**
   `StageCompletion` -> Tamamlanma onayı ve `XPLedger` logu.
