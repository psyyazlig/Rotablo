# Rotablo Product Definition v0

## 1. Ürün Özeti

Rotablo, otomobil tutkunları için tasarlanmış küratörlü bir sürüş ve rota keşif platformudur. Standart navigasyon ürünlerinin "en hızlı varış" mantığı yerine, sürüş keyfi yüksek asfalt yolları, teknik virajları, manzara kalitesi yüksek etapları ve rota üzerindeki kültürel deneyimleri merkeze alır.

Ürünün temel vaadi şudur:

**"Seni A noktasından B noktasına en kısa sürede değil, en iyi sürüş deneyimiyle götüren rota ekosistemi."**

Rotablo sadece rota listesi sunan bir içerik ürünü değildir. Kullanıcının araç profiline, bütçesine, zamanına ve sürüş iştahına göre rota planlamasını destekleyen; etap tamamlama, başarımlar ve sürücü ilerlemesi ile oyunlaştırılmış bir deneyim katmanı kuran bir `driving companion` ürünüdür.

## 2. Problem Tanımı

Bugünkü harita ve navigasyon uygulamaları şu ihtiyaçları karşılamıyor:

- Sürüş tutkunu kullanıcı için yolun kendisini bir deneyim olarak ele almıyorlar.
- Teknik asfalt kalitesi, viraj ritmi, manzara değeri ve otomobil odaklı rota kürasyonu sunmuyorlar.
- Yol üzerindeki kültür, gastronomi, sahil, doğa ve ekstrem etapları tek bir sistemde birleştirmiyorlar.
- Kullanıcının aracına göre risk, uygunluk ve hazırlık uyarıları üretmiyorlar.
- Roadtrip planlamasını oyunlaştırılmış bir ilerleme sistemine bağlamıyorlar.

Rotablo bu boşluğu, insan eliyle tasarlanmış rota omurgaları ve bunların çevresine kurulmuş etap, side quest ve bağlantı sistemiyle doldurur.

## 3. Vizyon

Rotablo'nun uzun vadeli vizyonu, otomobil severler için "açık dünya sürüş RPG'si" hissi veren en güçlü rota ekosistemi olmaktır.

Bu vizyonda kullanıcı:

- bir ana rotaya girer,
- yol üstünde yan görevler açar,
- araç profiline göre riskleri görür,
- sürüş stiliyle uyumlu etapları seçer,
- başarımlar kazanır,
- zaman içinde kendi sürücü kimliğini inşa eder.

## 4. Ürün İlkeleri

Rotablo ürün kararları şu ilkelere göre verilmelidir:

1. Yol sadece ulaşım değil, deneyimdir.
2. Otoyol optimizasyonu değil, sürüş kalitesi optimizasyonu esastır.
3. İçerik algoritmadan önce kürasyonla başlar.
4. Etaplar açıklanabilir metadata ile sunulmalıdır.
5. Oyunlaştırma, deneyimi güçlendirmeli; ciddiyeti ve güvenliği zayıflatmamalıdır.
6. Araç uyumu ve yol riski, içerik sunumunun asli parçasıdır.

## 5. Hedef Kullanıcı

### Birincil kullanıcı

Otomobil kullanmayı seven, hafta sonu sürüşü veya uzun roadtrip planlayan, "hangi yol daha keyifli?" sorusuna klasik harita ürünlerinden daha iyi cevap arayan kullanıcı.

Bu profil genelde:

- sürüş deneyimine önem verir,
- yol kalitesini ve viraj karakterini önemser,
- otomobili sadece araç değil hobi olarak görür,
- rota üstünde manzara, tarih, gastronomi gibi duraklara değer verir,
- planlama yapmadan uzun sürüşe çıkmak istemez.

### İkincil kullanıcı

- Premium otomobil sahipleri
- Kulüp veya arkadaş grubuyla rota yapan sürücüler
- İçerik odaklı gezi planlayan ama sürüş kalitesine de önem veren kullanıcılar
- Türkiye içinde "özel yol" keşfetmek isteyen gezginler

## 6. Jobs To Be Done

Kullanıcı Rotablo'yu şu işler için kullanır:

- "Bu hafta sonu kısa ama keyifli bir sürüş rotası bulmak istiyorum."
- "Uzun roadtrip planlıyorum; etap etap ne göreceğimi ve ne kadar harcayacağımı bilmek istiyorum."
- "Aracıma uygun, sürüş karakteri güçlü yolları seçmek istiyorum."
- "Ana rotadan çok uzaklaşmadan ekstra keşif yapılabilecek yan etapları görmek istiyorum."
- "Yaptığım sürüşleri sadece tamamlamak değil, ilerleme hissiyle yaşamak istiyorum."

## 7. Ürün Kapsamının Çekirdeği

Rotablo'nun çekirdeği üç katmanlı rota mimarisidir:

### Ana Rotalar

Başlangıç ve bitişi tanımlı, çok günlü ana omurgalar. Bunlar ürünün "main quest" yapısını oluşturur.

### Bağlantı / Bypass Rotaları

Ana rotalar arasında geçiş sağlayan veya alternatif omurga sunan hatlar. Bunlar ürünün dünyasını lineer değil ağ yapısında hissettirir.

### Side Quest'ler

Ana omurgadan belirli bir mesafe içinde ayrılıp geri dönülen isteğe bağlı keşif etapları. Bunlar ürünün açık dünya hissini kuran ana bileşendir.

## 8. İçerik Modeli

Her etap için ürün seviyesinde ihtiyaç duyulan çekirdek veri alanları:

- `routeFamily`: main, bypass, connection, sideQuest
- `routeCode`: ör. `R01`, `R06`, `BP`
- `stageCode`: ör. `01--03`
- `dayNumber`
- `title`
- `summary`
- `distanceKm`
- `detourKm`
- `detourAnchor`
- `difficultyScore` (1-5)
- `sceneryScore` (1-10)
- `questTags`
- `visitPoint`
- `achievementTitle`
- `lodgingOptions`
- `foodOptions`
- `roadNotes`
- `vehicleWarnings`
- `region`
- `country`
- `isCrossBorder`

### Sabit quest/category sözlüğü

V0 için aşağıdaki sekiz kategori kanonik kabul edilir:

- `drive`: teknik sürüş
- `scenic`: manzara
- `history`: tarih/kültür
- `gastronomy`: gastronomi
- `wine`: bağ evi/şarap
- `coast`: koy/sahil
- `elite`: ekstrem/elite
- `nature`: doğa/orman

`drone` kategorisi şimdilik ürün çekirdeğine alınmaz. Gerekirse sonraki versiyonda ek kategori olarak açılır.

## 9. Temel Ürün Deneyimi

V1'de kullanıcı deneyimi şu akış üzerine kurulmalıdır:

1. Kullanıcı rota kataloğuna girer.
2. Ana rota veya kısa rota koleksiyonlarından birini inceler.
3. Etap detaylarında sürüş karakteri, manzara, quest türleri, detour ve ziyaret noktalarını görür.
4. Kendi araç profilini seçer veya oluşturur.
5. Araç profiline göre kritik uyarıları görür.
6. Bütçe parametrelerini girer ve toplam maliyeti hesaplar.
7. Side quest ve bağlantıları dahil ederek kişisel planını oluşturur.
8. Etapları tamamladıkça achievement ve XP kazanır.

Bu akışta "aktif navigasyon" yardımcı olabilir, ancak ürünün çekirdeği rota keşfi, seçim, hazırlık ve tamamlama hissidir.

## 10. MVP Tanımı

İlk sürüm için ürün kapsamı şu şekilde tutulmalıdır:

### MVP içinde

- Küratörlü rota kataloğu
- Ana rota detay sayfaları
- Etap detay ekranı
- Zorluk ve manzara puanları
- Quest kategori gösterimi
- Side quest ve detour gösterimi
- Araç profili oluşturma
- Araç bazlı temel uyarılar
- Bütçe simülatörü
- Achievement sistemi
- XP ve sürücü seviye mantığı
- Rota ve etap tamamlama işaretleme

### MVP dışında

- Tam teşekküllü turn-by-turn navigasyon
- Gerçek zamanlı trafik optimizasyonu
- Sosyal ağ / kullanıcılar arası feed
- UGC rota oluşturma
- Otomatik AI rota üretimi
- Gelişmiş telemetri entegrasyonları
- Canlı hava ve yol durumu skorlarının otomatik etkilenmesi

## 11. Araç Profili ve Uyarı Sistemi

Rotablo'yu standart rota içeriğinden ayıran güçlü özelliklerden biri araç uyumluluğudur.

V1 için araç profili en az şu alanları desteklemelidir:

- marka
- model
- gövde tipi
- çekiş tipi
- yerden yükseklik segmenti
- lastik tipi / mevsim tipi
- performans karakteri

Bu profil üzerinden temel uyarılar üretilir:

- düşük karoser / alt takım riski
- yüksek rakım / soğuk zemin / tutuş riski
- ekstrem etap uygunluğu
- uzun etap yorgunluğu veya sürüş yoğunluğu uyarısı

Bu uyarı motoru öneri verir; kullanıcı adına karar vermez.

## 12. Bütçe Simülatörü

Planlama katmanının merkezinde dinamik bütçe hesabı yer almalıdır.

V1'de kullanıcı şu parametreleri değiştirebilmelidir:

- yakıt litre fiyatı
- araç tüketimi
- konaklama segmenti
- günlük yemek bütçesi

Temel mantık:

`yakıt + konaklama + yemek = toplam plan maliyeti`

Bu hesap:

- rota seviyesinde,
- seçilen etaplar seviyesinde,
- side quest dahil / hariç senaryosunda

yeniden üretilebilmelidir.

## 13. Oyunlaştırma Sistemi

Gamification, Rotablo'da kozmetik bir ek değil, kullanıcı motivasyonunu güçlendiren ürün katmanıdır.

V1 için yeterli çekirdek:

- etap bazlı achievement
- rota tamamlama başarımı
- XP kazanımı
- sürücü seviyesi
- tamamlanan quest sayısı

Gamification tonu önemli bir ürüne benzemeli; çocuklaşmamalı. Duygu, "driving prestige + progression" olmalıdır.

## 14. Konumlandırma

Rotablo'nun kısa konumlandırma cümlesi:

**Rotablo, sürüş tutkunu kullanıcılar için tasarlanmış, küratörlü yol deneyimlerini rota planlama ve oyunlaştırma ile birleştiren mobil platformdur.**

Rakip değil ama kıyas ekseni olarak kullanıcı zihninde:

- Google Maps kadar yaygın değil,
- Waze kadar trafik odaklı değil,
- klasik gezi blogları kadar pasif değil,
- driving game kadar soyut değil.

Rotablo bunların arasında "gerçek dünya sürüş RPG planner" alanını hedefler.

## 15. Başarı Metrikleri

İlk sürüm için anlamlı ürün metrikleri:

- rota detay görüntüleme oranı
- rota planı oluşturma oranı
- bütçe simülasyonu kullanım oranı
- araç profili tamamlama oranı
- ilk achievement kazanma oranı
- ilk rota veya etap tamamlama oranı
- side quest ekleme oranı

North star mantığı için aday metrik:

**Planlanan ve tamamlanan sürüş deneyimi sayısı**

## 16. İçerik ve Veri Gerçekliği

Mevcut Excel veri seti çok değerlidir, ancak doğrudan uygulama verisi olarak kullanıma hazır değildir. Ürün açısından ilk içerik işi:

- rota türlerinin standardizasyonu
- etap kimliklerinin temizlenmesi
- quest sembollerinin enum'a çevrilmesi
- section/header satırlarının veri satırlarından ayrılması
- side quest ve bypass mantığının net ilişki modeliyle tanımlanması
- Türkiye ve sınır ötesi içeriklerin aynı çatı altında normalize edilmesi

Bu nedenle içerik import süreci, teknik iş değil doğrudan ürün işidir.

## 17. Fazlama Önerisi

### Faz 1

Küratörlü rota keşfi ve planlama

### Faz 2

Araç profili tabanlı akıllı uyarılar ve daha güçlü kişiselleştirme

### Faz 3

İleri oyunlaştırma, koleksiyon, sezonlar veya özel challenge yapıları

### Faz 4

Canlı sürüş companion özellikleri ve daha derin akıllı rota katmanı

## 18. Açık Kararlar

Teknik mimariye geçmeden önce netleştirilmesi gereken ürün kararları:

1. V1'in ana kimliği "rota planner" mı olacak, yoksa "aktif sürüş companion" mı?
2. Kullanıcı rotayı etap etap mı planlayacak, yoksa hazır quest paketi mi seçecek?
3. Tamamlama manuel mi işaretlenecek, yoksa konum/veri tabanlı doğrulama gelecek mi?
4. Araç profili ne kadar detaylı başlayacak?
5. Gürcü DLC gibi sınır ötesi içerikler V1'de olacak mı, yoksa Türkiye içi çekirdekle mi başlanacak?
6. Achievement ve XP dengesi ne kadar simülasyonist, ne kadar basit olacak?

## 19. Sonuç

Rotablo'nun ilk sürümü, tam navigasyon ürünü olmaya çalışmamalıdır. En doğru başlangıç, yüksek kalite küratörlü rota içeriğini; planlama, araç farkındalığı ve oyunlaştırma ile birleştiren net bir mobil deneyim oluşturmaktır.

Başka bir deyişle:

**V1'in görevi yolu üretmek değil, doğru yolu seçmeyi ve yaşamayı unutulmaz hale getirmektir.**
