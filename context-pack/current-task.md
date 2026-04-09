# Mevcut Görev Bağlamı (Current Task Context)

**Faz:** 3 (Mobil İskelet) -> 0'a Geçiş & Git/Klasör Restorasyonu
**Aktif Görev:** Projenin tek klasör altında (Monorepo ve Submodules) yapılandırılması, Vibecoding (Yapay zeka orkestrasyonu) kılavuzuna uyumlanarak asistanların halüsinasyon görmesini engelleyecek ortamın tamamlanması.

## Mevcut Durum
- `scripts/`: Excel'den kanonik JSON'a temizleyici ETL yapısı hazırlandı.
- `backend/`: PostgreSQL, Prisma, Fastify tabanlı Core API stub'ları kuruldu.
- `mobile/`: Zustand, MMKV, React Navigation barındıran Rota Kataloğu ve Garaj menüleri şablonlandı.

## Sonraki Acil / Bekleyen Görevler
1. Git CLI kullanıma girdiğinde `setup-git.ps1` dosyasının çalıştırılarak multi-repo takip mimarisine geçiş.
2. `shared` isminde bir Git Submodule repolanıp Frontend ve Backend projelerinin kullandığı tip sözleşmelerinin (Zod) buraya konulması.
