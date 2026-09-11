# PayTR ile ücretli enerji ve ipucu paketleri

## Amaç
Oyuncuların kartla 5/15/30 enerji veya 10/25/50 ipucu satın alabilmesini, ödeme onaylandığında hakkın güvenli biçimde hesaba eklenmesini sağlamak.

## Yapılacaklar
- Ödüller sayfasına enerji paketlerinin yanında 10, 25 ve 50 ipuculuk paketleri eklemek.
- Ders ekranındaki mevcut üç ipucunu hak bakiyesine bağlamak; ilk kullanımda bir ipucu düşürmek, açılmış ipucunu tekrar görüntülerken ücret almamak.
- Pro üyelerde ipuçlarını sınırsız yapmak; diğer oyuncular için kalan ipucu sayısını göstermek.
- PayTR ödeme penceresini uygulama içinde açmak ve ödeme sonucu sayfalarını hazırlamak.
- Ödeme kayıtlarını veritabanında tutmak; fiyatı ve verilecek hakkı yalnızca sunucudaki paket kataloğundan belirlemek.
- PayTR bildirimini imza doğrulamasıyla işlemek; aynı bildirimin tekrarlanması halinde enerji veya ipucunu ikinci kez vermemek.
- Satın alma tamamlandığında profil, enerji ve ipucu bakiyesini otomatik yenilemek.
- Başarısız, iptal edilmiş ve bekleyen ödeme durumlarını kullanıcıya açık biçimde göstermek.

## Paketler
- Enerji: mevcut 5 / 15 / 30 enerji paketleri ve mevcut fiyatları.
- İpucu: 10 ipucu ₺49, 25 ipucu ₺99, 50 ipucu ₺169.
- Enerji satın alımları günlük enerji sınırının üstüne eklenebilir.

## Güvenlik
- PayTR Merchant ID, Merchant Key ve Merchant Salt yalnızca güvenli gizli anahtar kasasında tutulacak.
- Tarayıcıdan gelen fiyat, adet ve kullanıcı bilgilerine güvenilmeyecek.
- Bildirim imzası zamanlamaya dayanıklı karşılaştırmayla doğrulanacak.
- Ödeme kayıtlarına kullanıcılar yalnızca kendi hesaplarında erişebilecek; hak verme işlemi yalnızca doğrulanmış PayTR bildirimiyle yapılacak.

## Teknik ayrıntılar
- `profiles` tablosuna ipucu bakiyesi ve toplam kullanım alanları eklenecek.
- Kullanıcıya özel ödeme kayıt tablosu, açık ipuçları tablosu ve güvenli veritabanı fonksiyonları eklenecek.
- Uygulama içi ödeme başlatma için kimlik doğrulamalı server function; PayTR callback için `/api/public/paytr/callback`; sonuç ekranları için ayrı rotalar kullanılacak.
- PayTR test modu ile gerçek para çekmeden uçtan uca doğrulama yapılacak; canlı moda PayTR hesabı onaylandıktan sonra geçilecek.

## Gerekli bilgiler
Altyapı hazırlandıktan sonra güvenli form üzerinden PayTR Merchant ID, Merchant Key ve Merchant Salt istenecek. Bu değerler kodda veya `.env` dosyasında tutulmayacak.
