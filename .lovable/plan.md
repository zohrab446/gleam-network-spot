# PayTR test modu düzenlemesi

## Yapılacaklar
- PayTR token isteğinde `test_mode` değerini ortam ayarından bağımsız olarak `"1"` gönder.
- Test sırasında ayrıntılı PayTR hata bilgisini açmak için `debug_on` değerini `"1"` tut.
- Token imzasının da aynı test modu değeriyle üretildiğini doğrula.
- Ödeme penceresini giriş yapılmış hesapla açarak test et ve uygulamanın derlenmesini doğrula.

## Teknik detay
Bu değişiklik yalnızca PayTR test akışını etkiler; ürün fiyatları, teslimat ve güvenli callback doğrulaması değişmez.
