# Kilit Kararlar Kılavuzu (V1 Locked Decisions)

## STRICT RULE FOR AI AGENTS:
Eğer geliştireceğiniz veya yazacağınız kod aşağıdakilerden birini içeriyorsa "HATA (HALÜSİNASYON)" demektir, yazmayın ve onay isteyin:
- **Aktif GPS Takibi & Background Location:** (YALNIZCA MOCK / YEDEK GEOFENCE, canli gps navigation yok) -> Tamamlama (Completion) işlemi sadece **MANUAL** bir onaya (veya pseudo-queue) tabidir.
- **Offline DB Engine (WatermelonDB vd.):** V1'de karmaşık lokal sync veritabanı yok; bunun yerine offline liste izleme ve `MMKV + Zustand` üzerinden pending queue kullanılmaktadır.
- **Microservices Mimari:** Frontend ve Single Fastify API var. Dağıtık bir Mimari Yok!

Tüm detaylı onaylı kararlar için `../docs/Rotablo_Application_Architecture_v0.md` dosyasına bakınız.
