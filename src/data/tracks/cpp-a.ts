import type { Lesson } from "../types";

export const CPP_A: Lesson[] = [
  {
    id: "cpp-221",
    level: 221,
    language: "cpp",
    title: "İlk C++ programın",
    description: "#include <iostream> ve int main() ile programın giriş noktasını yaz.",
    explanation:
      "Her C++ programı `main()` fonksiyonuyla başlar. Ekrana yazı yazmak için `<iostream>` kütüphanesini `#include` etmen gerekir.\nFonksiyon sonunda `return 0;` programın başarıyla bittiğini belirtir.",
    example: `#include <iostream>\n\nint main() {\n    std::cout << "Merhaba";\n    return 0;\n}`,
    hints: [
      "Dosyanın en üstüne #include <iostream> ekle.",
      "int main() { ... } gövdesi içinde std::cout << \"CodeQuest\"; yaz.",
      "En sona return 0; koymayı unutma.",
    ],
    challenge: "Ekrana \"CodeQuest\" yazan bir C++ programı yaz (main fonksiyonu ve return 0 ile).",
    files: [
      { name: "main.cpp", content: `// TODO: #include <iostream> ekle\n\nint main() {\n    // TODO: CodeQuest yaz\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "#include\\s*<iostream>", label: "iostream include edilmiş" },
      { type: "output", value: "CodeQuest", label: "Çıktıda 'CodeQuest' var" },
    ],
  },
  {
    id: "cpp-222",
    level: 222,
    language: "cpp",
    title: "cout ve endl",
    description: "std::cout ile birden çok satır yazdır, std::endl ile satır atla.",
    explanation:
      "`std::cout <<` operatörü ile ekrana veri gönderirsin, birden fazla `<<` zincirlenebilir.\n`std::endl` yeni satıra geçirir (`\\n` de aynı işi görür).",
    example: `std::cout << "Bir" << std::endl;\nstd::cout << "Iki" << std::endl;`,
    hints: [
      "İki ayrı std::cout satırı kullan.",
      "Her satırın sonuna std::endl ekle.",
      "std::cout << \"Merhaba\" << std::endl; std::cout << \"Dunya\" << std::endl;",
    ],
    challenge: "Ekrana iki ayrı satırda \"Merhaba\" ve \"Dunya\" yazdır (std::endl kullanarak).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    // TODO: iki satır yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "std::endl", label: "std::endl kullanılmış" },
      { type: "output-exact", value: "Merhaba\nDunya", label: "Çıktı tam olarak iki satır" },
    ],
  },
  {
    id: "cpp-223",
    level: 223,
    language: "cpp",
    title: "Temel tipler",
    description: "int, double, char, bool değişkenleri tanımla ve yazdır.",
    explanation:
      "C++'ta her değişkenin bir tipi olmalı: `int` tam sayı, `double` ondalıklı sayı, `char` tek karakter, `bool` doğru/yanlış tutar.\nDeğişkeni tanımlarken tipini önüne yazarsın: `int yas = 17;`.",
    example: `int yas = 17;\ndouble boy = 1.75;\nchar harf = 'A';\nbool aktif = true;\nstd::cout << yas << " " << boy;`,
    hints: [
      "Dört farklı tipte değişken tanımla: int, double, char, bool.",
      "Her birini std::cout ile ayrı satırda yazdır.",
      "int yas = 17; double boy = 1.75; char harf = 'C'; bool ok = true;",
    ],
    challenge: "int (17), double (1.75), char ('C'), bool (true) tipinde birer değişken tanımla ve her birini ayrı satırda yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    // TODO: 4 farklı tipte değişken tanımla ve yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\bint\\s+\\w+\\s*=", label: "int değişken tanımlı" },
      { type: "regex", value: "\\bdouble\\s+\\w+\\s*=", label: "double değişken tanımlı" },
      { type: "regex", value: "\\bchar\\s+\\w+\\s*=\\s*'C'", label: "char değişken tanımlı" },
      { type: "regex", value: "\\bbool\\s+\\w+\\s*=\\s*true", label: "bool değişken tanımlı" },
    ],
  },
  {
    id: "cpp-224",
    level: 224,
    language: "cpp",
    title: "std::cin ile girdi al",
    description: "std::cin ile kullanıcıdan bir sayı oku ve kullan.",
    explanation:
      "`std::cin >>` operatörü klavyeden (veya girdi akışından) veri okur.\nOkunan değer bir değişkene atanır, sonra normal bir değişken gibi kullanılabilir.",
    example: `int sayi;\nstd::cin >> sayi;\nstd::cout << "Girilen: " << sayi;`,
    hints: [
      "Bir int değişken tanımla.",
      "std::cin >> ile bu değişkene değer oku.",
      "int yas; std::cin >> yas; std::cout << \"Yas: \" << yas;",
    ],
    challenge: "Kullanıcıdan bir tam sayı oku (yas) ve \"Yas: \" yazısından sonra bu sayıyı yazdır. Girdi: 17",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int yas;\n    // TODO: std::cin ile oku ve yazdır\n    return 0;\n}` },
    ],
    stdin: ["17"],
    checks: [
      { type: "regex", value: "std::cin\\s*>>", label: "std::cin ile okuma yapılmış" },
      { type: "output", value: "Yas: 17", label: "Çıktıda 'Yas: 17' var" },
    ],
  },
  {
    id: "cpp-225",
    level: 225,
    language: "cpp",
    title: "const ile sabit tanımla",
    description: "const anahtar kelimesiyle değiştirilemeyen bir değer tanımla.",
    explanation:
      "`const` ile tanımlanan bir değişkenin değeri bir kere atanır ve bir daha değiştirilemez.\nSabitler genellikle büyük harfle yazılır, kodun anlamını netleştirir (örn. PI, MAX_SKOR).",
    example: `const int MAX_SKOR = 100;\nstd::cout << MAX_SKOR;`,
    hints: [
      "const int ile bir sabit tanımla.",
      "Sabitin adını PI yap ve değerini 3.14 gibi bir double yapman gerekiyorsa const double kullan.",
      "const double PI = 3.14; std::cout << PI;",
    ],
    challenge: "const double PI = 3.14; tanımla ve ekrana yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    // TODO: const double PI tanımla ve yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "const\\s+double\\s+PI\\s*=\\s*3\\.14", label: "const double PI tanımlı" },
      { type: "output", value: "3.14", label: "Çıktıda 3.14 var" },
    ],
  },
  {
    id: "cpp-226",
    level: 226,
    language: "cpp",
    title: "Aritmetik ve atama operatörleri",
    description: "+, -, *, /, += gibi operatörlerle hesaplama yap.",
    explanation:
      "C++'ta `+ - * /` temel aritmetik işlemleri yapar. `+=`, `-=`, `*=` gibi atama operatörleri ise bir değişkeni kendisiyle işleyip günceller.\nÖrneğin `x += 5;` ifadesi `x = x + 5;` ile aynıdır.",
    example: `int x = 10;\nx += 5;\nstd::cout << x;`,
    hints: [
      "Bir int değişken tanımla, örneğin skor = 10.",
      "+= operatörüyle skor'a 5 ekle.",
      "int skor = 10; skor += 5; std::cout << skor;",
    ],
    challenge: "skor adında int değişken 10 ile başlat, += ile 5 ekle, sonucu yazdır (15 olmalı).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int skor = 10;\n    // TODO: skor += 5;\n    std::cout << skor;\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "skor\\s*\\+=\\s*5", label: "+= operatörü kullanılmış" },
      { type: "output", value: "15", label: "Çıktı 15" },
    ],
  },
  {
    id: "cpp-227",
    level: 227,
    language: "cpp",
    title: "static_cast ile dönüşüm",
    description: "static_cast<T> ile bir tipi başka bir tipe dönüştür.",
    explanation:
      "`static_cast<double>(x)` gibi bir ifade, `x` değişkenini `double` tipine dönüştürür.\nBu, örneğin iki tam sayının bölümünü ondalıklı almak istediğinde kullanışlıdır.",
    example: `int a = 7, b = 2;\ndouble sonuc = static_cast<double>(a) / b;\nstd::cout << sonuc;`,
    hints: [
      "İki int tanımla: a = 7, b = 2.",
      "static_cast<double> ile a'yı double'a çevir, sonra b'ye böl.",
      "double sonuc = static_cast<double>(a) / b; std::cout << sonuc;",
    ],
    challenge: "a=7, b=2 int değişkenlerini tanımla, static_cast<double> kullanarak a/b'yi ondalıklı hesapla ve yazdır (3.5).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int a = 7, b = 2;\n    // TODO: static_cast ile double bölme yap\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "static_cast<", label: "static_cast kullanılmış" },
      { type: "output", value: "3.5", label: "Çıktıda 3.5 var" },
    ],
  },
  {
    id: "cpp-228",
    level: 228,
    language: "cpp",
    title: "std::string kullan",
    description: "std::string ile metin tut ve birleştir.",
    explanation:
      "`std::string` metin verisi tutan bir tiptir, `<string>` kütüphanesinden gelir.\nİki string'i `+` ile birleştirebilirsin (concatenation).",
    example: `#include <string>\nstd::string ad = "Ali";\nstd::string mesaj = "Merhaba " + ad;\nstd::cout << mesaj;`,
    hints: [
      "#include <string> ekle.",
      "std::string tipinde ad değişkeni tanımla (\"Ayşe\").",
      "std::string mesaj = \"Merhaba \" + ad; std::cout << mesaj;",
    ],
    challenge: "#include <string> ekle, ad = \"Ayşe\" olan bir std::string tanımla, \"Merhaba Ayşe\" yazan bir mesaj oluşturup yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n// TODO: #include <string> ekle\n\nint main() {\n    // TODO: string birleştir ve yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "#include\\s*<string>", label: "string include edilmiş" },
      { type: "output", value: "Merhaba Ayşe", label: "Çıktıda 'Merhaba Ayşe' var" },
    ],
  },
  {
    id: "cpp-229",
    level: 229,
    language: "cpp",
    title: "if / else if / else",
    description: "Koşullu ifadelerle farklı çıktılar üret.",
    explanation:
      "`if` bir koşul doğruysa çalışır, `else if` başka bir koşulu dener, `else` hiçbiri doğru değilse çalışır.\nKarşılaştırma operatörleri `>`, `<`, `==` gibi koşul yazmanı sağlar.",
    example: `int not_ = 75;\nif (not_ >= 90) std::cout << "AA";\nelse if (not_ >= 60) std::cout << "BB";\nelse std::cout << "FF";`,
    hints: [
      "int puan = 45; tanımla.",
      "if (puan >= 50) ... else ... yapısı kur.",
      "if (puan >= 50) std::cout << \"Gecti\"; else std::cout << \"Kaldi\";",
    ],
    challenge: "puan = 45 tanımla, if/else ile 50 ve üstü \"Gecti\", altı \"Kaldi\" yazdır (45 için \"Kaldi\" çıkmalı).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int puan = 45;\n    // TODO: if/else yaz\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\belse\\b", label: "else kullanılmış" },
      { type: "output", value: "Kaldi", label: "Çıktı 'Kaldi'" },
    ],
  },
  {
    id: "cpp-230",
    level: 230,
    language: "cpp",
    title: "switch-case",
    description: "switch-case ile çoklu seçenekleri yönet.",
    explanation:
      "`switch` bir değişkenin değerine göre farklı `case` bloklarına dallanır.\nHer case sonunda `break;` koymayı unutma, yoksa alttaki case'lere de düşer (fall-through).",
    example: `int gun = 3;\nswitch (gun) {\n    case 1: std::cout << "Pazartesi"; break;\n    case 2: std::cout << "Sali"; break;\n    default: std::cout << "Bilinmiyor";\n}`,
    hints: [
      "int gun = 3; tanımla.",
      "switch(gun) içinde case 3 için \"Carsamba\" yazdır.",
      "switch (gun) { case 3: std::cout << \"Carsamba\"; break; default: std::cout << \"?\"; }",
    ],
    challenge: "gun = 3 tanımla, switch-case ile case 3'te \"Carsamba\" yazdır, default'ta \"?\" yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int gun = 3;\n    // TODO: switch-case yaz\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\bswitch\\s*\\(", label: "switch kullanılmış" },
      { type: "regex", value: "\\bcase\\s+3\\s*:", label: "case 3 var" },
      { type: "output", value: "Carsamba", label: "Çıktı 'Carsamba'" },
    ],
  },
  {
    id: "cpp-231",
    level: 231,
    language: "cpp",
    title: "for döngüsü",
    description: "for döngüsüyle sayıları tekrarlı yazdır.",
    explanation:
      "`for (baslangic; kosul; artis)` döngüsü belirli sayıda tekrar yapar.\nÖrneğin `for (int i = 0; i < 5; i++)` 0'dan 4'e kadar 5 kez çalışır.",
    example: `for (int i = 1; i <= 3; i++) {\n    std::cout << i << " ";\n}`,
    hints: [
      "for (int i = 1; i <= 5; i++) yapısını kur.",
      "Döngü içinde std::cout << i << std::endl; yaz.",
      "for (int i = 1; i <= 5; i++) { std::cout << i << std::endl; }",
    ],
    challenge: "1'den 5'e kadar sayıları for döngüsüyle her biri ayrı satırda yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    // TODO: for döngüsü ile 1-5 yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\bfor\\s*\\(", label: "for döngüsü kullanılmış" },
      { type: "output-exact", value: "1\n2\n3\n4\n5", label: "Çıktı 1'den 5'e kadar" },
    ],
  },
  {
    id: "cpp-232",
    level: 232,
    language: "cpp",
    title: "while / do-while",
    description: "while döngüsüyle koşul sağlandıkça tekrarla.",
    explanation:
      "`while (kosul)` koşul doğru olduğu sürece döngüyü tekrarlar.\n`do { } while(kosul);` ise bloğu en az bir kere çalıştırdıktan sonra koşulu kontrol eder.",
    example: `int i = 0;\nwhile (i < 3) {\n    std::cout << i << " ";\n    i++;\n}`,
    hints: [
      "int sayac = 0; tanımla.",
      "while (sayac < 3) döngüsü kur, içinde yazdır ve sayac++ yap.",
      "int sayac = 0; while (sayac < 3) { std::cout << sayac << std::endl; sayac++; }",
    ],
    challenge: "sayac = 0 ile başlat, while döngüsüyle sayac 3'ten küçük olduğu sürece değerini yazdır ve arttır (0,1,2 satırları).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int sayac = 0;\n    // TODO: while döngüsü yaz\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\bwhile\\s*\\(", label: "while kullanılmış" },
      { type: "output-exact", value: "0\n1\n2", label: "Çıktı 0,1,2" },
    ],
  },
  {
    id: "cpp-233",
    level: 233,
    language: "cpp",
    title: "Klasik diziler",
    description: "int dizisi tanımla ve elemanlarını döngüyle yazdır.",
    explanation:
      "`int sayilar[5] = {1,2,3,4,5};` gibi sabit boyutlu bir dizi tanımlanır.\nElemanlarına `sayilar[i]` şeklinde indeksle erişilir, döngüyle tüm elemanları gezebilirsin.",
    example: `int sayilar[3] = {10, 20, 30};\nfor (int i = 0; i < 3; i++) {\n    std::cout << sayilar[i] << " ";\n}`,
    hints: [
      "int dizi[5] = {1,2,3,4,5}; tanımla.",
      "for döngüsüyle 0'dan 4'e kadar dizi[i]'yi yazdır.",
      "for (int i = 0; i < 5; i++) std::cout << dizi[i] << std::endl;",
    ],
    challenge: "int dizi[5] = {1,2,3,4,5}; tanımla ve for döngüsüyle her elemanı ayrı satırda yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int dizi[5] = {1, 2, 3, 4, 5};\n    // TODO: for döngüsüyle yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "dizi\\[i\\]", label: "dizi[i] ile erişim yapılmış" },
      { type: "output-exact", value: "1\n2\n3\n4\n5", label: "Tüm elemanlar sırayla yazdırılmış" },
    ],
  },
  {
    id: "cpp-234",
    level: 234,
    language: "cpp",
    title: "Çok boyutlu diziler",
    description: "2 boyutlu dizi (matris) tanımla ve iç içe döngüyle gez.",
    explanation:
      "`int matris[2][2] = {{1,2},{3,4}};` gibi çok boyutlu bir dizi satır ve sütunlardan oluşur.\nİki eleman erişmek için iki indeks gerekir: `matris[i][j]`, genelde iç içe for döngüsüyle gezilir.",
    example: `int m[2][2] = {{1,2},{3,4}};\nfor (int i = 0; i < 2; i++)\n    for (int j = 0; j < 2; j++)\n        std::cout << m[i][j] << " ";`,
    hints: [
      "int matris[2][2] = {{1,2},{3,4}}; tanımla.",
      "İç içe iki for döngüsü kur (i satır, j sütun).",
      "for (int i=0;i<2;i++) for (int j=0;j<2;j++) std::cout << matris[i][j] << std::endl;",
    ],
    challenge: "matris[2][2] = {{1,2},{3,4}} tanımla, iç içe for döngüsüyle tüm elemanları satır satır yazdır (sıra: 1,2,3,4).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int matris[2][2] = {{1, 2}, {3, 4}};\n    // TODO: iç içe for döngüsü ile yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "matris\\[i\\]\\[j\\]", label: "matris[i][j] ile erişim yapılmış" },
      { type: "output-exact", value: "1\n2\n3\n4", label: "Tüm elemanlar sırayla yazdırılmış" },
    ],
  },
  {
    id: "cpp-235",
    level: 235,
    language: "cpp",
    title: "Fonksiyon prototip ve gövde",
    description: "Kendi fonksiyonunu tanımla ve main içinden çağır.",
    explanation:
      "Bir fonksiyon dönüş tipi, adı ve parametreleriyle tanımlanır: `int topla(int a, int b) { return a + b; }`.\nFonksiyonu `main` içinden adıyla ve parantez içinde argümanlarla çağırırsın.",
    example: `int kare(int x) {\n    return x * x;\n}\n\nint main() {\n    std::cout << kare(4);\n    return 0;\n}`,
    hints: [
      "int topla(int a, int b) { return a + b; } fonksiyonunu main'in üstünde tanımla.",
      "main içinden topla(3, 4) şeklinde çağır.",
      "std::cout << topla(3, 4); // main içinde",
    ],
    challenge: "topla(int a, int b) fonksiyonunu tanımla (a+b döndürsün), main içinde topla(3,4) çağırıp sonucu yazdır (7).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\n// TODO: int topla(int a, int b) fonksiyonunu tanımla\n\nint main() {\n    // TODO: topla(3, 4) çağır ve yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "int\\s+topla\\s*\\(\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", label: "topla fonksiyonu tanımlı" },
      { type: "output", value: "7", label: "Çıktı 7" },
    ],
  },
  {
    id: "cpp-236",
    level: 236,
    language: "cpp",
    title: "Pass by value",
    description: "Bir fonksiyona değer kopyalayarak gönder, orijinali değişmez.",
    explanation:
      "Fonksiyona normal parametre verirken (pass by value) argümanın bir kopyası gönderilir.\nFonksiyon içinde parametreyi değiştirsen bile, çağıran taraftaki orijinal değişken etkilenmez.",
    example: `void artir(int x) {\n    x = x + 1;\n}\n\nint main() {\n    int sayi = 5;\n    artir(sayi);\n    std::cout << sayi; // 5, degismedi\n}`,
    hints: [
      "void artir(int x) fonksiyonu tanımla, içinde x = x + 1 yap.",
      "main içinde sayi = 5 tanımla, artir(sayi) çağır.",
      "std::cout << sayi; // hâlâ 5 çünkü pass by value",
    ],
    challenge: "void artir(int x) fonksiyonu yaz (x'i 1 arttırsın), main'de sayi=5 tanımla, artir(sayi) çağır, sayi'yi yazdır (5 kalmalı, değişmemeli).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\n// TODO: void artir(int x) fonksiyonu tanımla\n\nint main() {\n    int sayi = 5;\n    // TODO: artir(sayi) çağır ve sayi'yi yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "void\\s+artir\\s*\\(\\s*int\\s+\\w+\\s*\\)", label: "artir fonksiyonu pass by value" },
      { type: "output", value: "5", label: "Çıktı 5 (değişmedi)" },
    ],
  },
  {
    id: "cpp-237",
    level: 237,
    language: "cpp",
    title: "Pass by reference (&)",
    description: "Referansla parametre geçirerek orijinal değeri değiştir.",
    explanation:
      "Parametre tipinin yanına `&` koyarsan (`int &x`), fonksiyon orijinal değişkenin kendisiyle çalışır.\nBu şekilde fonksiyon içindeki değişiklik çağıran taraftaki değişkeni de değiştirir.",
    example: `void artir(int &x) {\n    x = x + 1;\n}\n\nint main() {\n    int sayi = 5;\n    artir(sayi);\n    std::cout << sayi; // 6\n}`,
    hints: [
      "void artir(int &x) şeklinde referans parametre kullan.",
      "İçinde x = x + 1; yap.",
      "main'de sayi=5, artir(sayi), std::cout << sayi; // 6 olmalı",
    ],
    challenge: "void artir(int &x) fonksiyonu yaz (x'i 1 arttırsın), main'de sayi=5 tanımla, artir(sayi) çağır, sayi'yi yazdır (6 olmalı, değişmiş).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\n// TODO: void artir(int &x) fonksiyonu tanımla\n\nint main() {\n    int sayi = 5;\n    // TODO: artir(sayi) çağır ve sayi'yi yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "int\\s*&\\s*\\w+\\s*\\)", label: "referans parametre (&) kullanılmış" },
      { type: "output", value: "6", label: "Çıktı 6 (değişti)" },
    ],
  },
  {
    id: "cpp-238",
    level: 238,
    language: "cpp",
    title: "const referans parametre",
    description: "const & ile büyük veriyi kopyalamadan güvenle fonksiyona geçir.",
    explanation:
      "`const std::string &metin` gibi bir parametre, veriyi kopyalamadan (verimli) alır ama fonksiyon içinde değiştirilmesini engeller (güvenli).\nBüyük nesneleri (string, vector gibi) fonksiyona geçirirken en yaygın yöntem budur.",
    example: `void yazdir(const std::string &metin) {\n    std::cout << metin;\n}\n\nint main() {\n    yazdir("Merhaba");\n}`,
    hints: [
      "#include <string> ekle.",
      "void yazdir(const std::string &metin) fonksiyonu tanımla, içinde std::cout << metin; yap.",
      "main içinde yazdir(\"CodeQuest\"); çağır.",
    ],
    challenge: "void yazdir(const std::string &metin) fonksiyonu yaz, main içinde yazdir(\"CodeQuest\"); çağırıp ekrana yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n#include <string>\n\n// TODO: void yazdir(const std::string &metin) tanımla\n\nint main() {\n    // TODO: yazdir(\"CodeQuest\") çağır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "const\\s+std::string\\s*&\\s*\\w+", label: "const & parametre kullanılmış" },
      { type: "output", value: "CodeQuest", label: "Çıktıda 'CodeQuest' var" },
    ],
  },
  {
    id: "cpp-239",
    level: 239,
    language: "cpp",
    title: "Function overloading",
    description: "Aynı isimli, farklı parametreli iki fonksiyon tanımla.",
    explanation:
      "C++'ta aynı isme sahip birden fazla fonksiyon tanımlanabilir, yeter ki parametre listeleri farklı olsun (overloading).\nDerleyici çağrıya bakarak hangi fonksiyonun kullanılacağına karar verir.",
    example: `int topla(int a, int b) { return a + b; }\ndouble topla(double a, double b) { return a + b; }\n\nint main() {\n    std::cout << topla(2, 3) << " " << topla(2.5, 1.5);\n}`,
    hints: [
      "int topla(int a, int b) fonksiyonunu tanımla.",
      "Aynı isimle double topla(double a, double b) fonksiyonunu da tanımla.",
      "main'de topla(2, 3) ve topla(2.5, 1.5) çağır, ikisini de yazdır.",
    ],
    challenge: "topla(int,int) ve topla(double,double) olmak üzere iki overload fonksiyon yaz, main'de topla(2,3) ve topla(2.5,1.5) çağırıp yazdır (5 ve 4).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\n// TODO: iki overload topla fonksiyonu tanımla\n\nint main() {\n    // TODO: her iki topla'yı çağır ve yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "int\\s+topla\\s*\\(\\s*int", label: "int topla overload var" },
      { type: "regex", value: "double\\s+topla\\s*\\(\\s*double", label: "double topla overload var" },
      { type: "output", value: "5", label: "Çıktıda 5 var" },
      { type: "output", value: "4", label: "Çıktıda 4 var" },
    ],
  },
  {
    id: "cpp-240",
    level: 240,
    language: "cpp",
    title: "Recursive fonksiyon (faktöriyel)",
    description: "Kendini çağıran bir fonksiyonla faktöriyel hesapla.",
    explanation:
      "Bir fonksiyon kendi kendini çağırabilir, buna recursion (özyineleme) denir.\nHer recursive fonksiyonun bir taban durumu (base case) olmalı, yoksa sonsuz döngüye girer.",
    example: `int faktoriyel(int n) {\n    if (n <= 1) return 1;\n    return n * faktoriyel(n - 1);\n}`,
    hints: [
      "Taban durumu: n <= 1 ise 1 döndür.",
      "Genel durum: n * faktoriyel(n-1) döndür.",
      "int faktoriyel(int n) { if (n <= 1) return 1; return n * faktoriyel(n - 1); }",
    ],
    challenge: "faktoriyel(int n) fonksiyonunu recursive yaz, main içinde faktoriyel(5) çağırıp yazdır (120).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\n// TODO: recursive faktoriyel fonksiyonu\n\nint main() {\n    std::cout << faktoriyel(5);\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "faktoriyel\\s*\\(\\s*n\\s*-\\s*1\\s*\\)", label: "fonksiyon kendini çağırıyor" },
      { type: "output", value: "120", label: "Çıktı 120" },
    ],
  },
  {
    id: "cpp-241",
    level: 241,
    language: "cpp",
    title: "Adres operatörü &",
    description: "& operatörüyle bir değişkenin bellek adresini al.",
    explanation:
      "`&degisken` ifadesi o değişkenin bellekteki adresini verir (bir pointer türü).\nAdres değerinin kendisi her çalıştırmada farklı olabilir, bu yüzden genelde sadece bir pointer'a atanır, ekrana yazdırılan sayısal değeri test edilmez.",
    example: `int x = 5;\nint *p = &x;\nstd::cout << "x'in adresi bir pointer'da tutuldu";`,
    hints: [
      "int x = 42; tanımla.",
      "int *p = &x; ile adresini bir pointer'a ata.",
      "std::cout << \"Adres alindi\"; ile bunu doğrula, adres değerini yazdırma.",
    ],
    challenge: "int x = 42; tanımla, & operatörüyle adresini int *p pointer'ına ata, ardından \"Adres alindi\" yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int x = 42;\n    // TODO: int *p = &x; yap ve \"Adres alindi\" yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "int\\s*\\*\\s*p\\s*=\\s*&\\s*x", label: "& ile adres alınmış" },
      { type: "output", value: "Adres alindi", label: "Çıktıda 'Adres alindi' var" },
    ],
  },
  {
    id: "cpp-242",
    level: 242,
    language: "cpp",
    title: "Pointer ve dereferencing",
    description: "Bir pointer üzerinden değere ulaş (dereference) ve değiştir.",
    explanation:
      "Bir pointer'ın gösterdiği değere ulaşmak için başına `*` koyarsın, buna dereferencing denir.\n`*p = 10;` yazmak, p'nin işaret ettiği değişkenin değerini 10 yapar.",
    example: `int x = 5;\nint *p = &x;\n*p = 10;\nstd::cout << x; // 10`,
    hints: [
      "int x = 5; ve int *p = &x; tanımla.",
      "*p = 99; ile p üzerinden x'in değerini değiştir.",
      "std::cout << x; // artık 99 olmalı",
    ],
    challenge: "x=5 tanımla, p pointer'ını x'e bağla, *p=99 ile x'i değiştir, x'i yazdır (99).",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int x = 5;\n    int *p = &x;\n    // TODO: *p = 99; yap\n    std::cout << x;\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\*p\\s*=\\s*99", label: "*p ile dereference edilip değiştirilmiş" },
      { type: "output", value: "99", label: "Çıktı 99" },
    ],
  },
  {
    id: "cpp-243",
    level: 243,
    language: "cpp",
    title: "nullptr",
    description: "Bir pointer'ı nullptr ile boş olarak başlat ve kontrol et.",
    explanation:
      "Henüz bir adrese işaret etmeyen pointer'lar `nullptr` ile başlatılmalıdır (eski kodda `NULL` da görülür).\nBir pointer kullanılmadan önce `if (p == nullptr)` ile boş olup olmadığı kontrol edilebilir.",
    example: `int *p = nullptr;\nif (p == nullptr) {\n    std::cout << "Bos pointer";\n}`,
    hints: [
      "int *p = nullptr; ile boş pointer tanımla.",
      "if (p == nullptr) koşulunu yaz.",
      "if (p == nullptr) std::cout << \"Bos pointer\";",
    ],
    challenge: "int *p = nullptr; tanımla, if (p == nullptr) kontrolü yap, doğruysa \"Bos pointer\" yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    // TODO: int *p = nullptr; tanımla ve kontrol et\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "nullptr", label: "nullptr kullanılmış" },
      { type: "output", value: "Bos pointer", label: "Çıktıda 'Bos pointer' var" },
    ],
  },
  {
    id: "cpp-244",
    level: 244,
    language: "cpp",
    title: "Pointer aritmetiği",
    description: "Bir diziyi pointer aritmetiğiyle gez.",
    explanation:
      "Bir dizinin adı aslında ilk elemanına işaret eden bir pointer gibi davranır.\n`p + 1` ifadesi bir sonraki elemanın adresini verir, `*(p + i)` ile o elemana ulaşabilirsin.",
    example: `int dizi[3] = {10, 20, 30};\nint *p = dizi;\nstd::cout << *(p + 1); // 20`,
    hints: [
      "int dizi[3] = {10,20,30}; tanımla.",
      "int *p = dizi; ile pointer'ı diziye bağla.",
      "for (int i = 0; i < 3; i++) std::cout << *(p + i) << std::endl;",
    ],
    challenge: "dizi[3] = {10,20,30} tanımla, p pointer'ını diziye bağla, *(p+i) ile döngüde tüm elemanları ayrı satırda yazdır.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    int dizi[3] = {10, 20, 30};\n    int *p = dizi;\n    // TODO: *(p + i) ile döngüde yazdır\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\*\\(\\s*p\\s*\\+\\s*i\\s*\\)", label: "pointer aritmetiği kullanılmış" },
      { type: "output-exact", value: "10\n20\n30", label: "Çıktı 10,20,30" },
    ],
  },
  {
    id: "cpp-245",
    level: 245,
    language: "cpp",
    title: "new ve delete",
    description: "new ile dinamik bellek ayır, delete ile serbest bırak.",
    explanation:
      "`new int(5)` heap üzerinde dinamik olarak bellek ayırır ve o adrese bir pointer döner.\nKullanımı bitince `delete p;` ile bu belleği serbest bırakman gerekir, yoksa bellek sızıntısı (memory leak) olur.",
    example: `int *p = new int(5);\nstd::cout << *p;\ndelete p;`,
    hints: [
      "int *p = new int(42); ile dinamik bellek ayır.",
      "*p ile değeri yazdır.",
      "İşin bitince delete p; ile belleği serbest bırak.",
    ],
    challenge: "new ile bir int (42) için dinamik bellek ayır, değeri yazdır, sonra delete ile belleği serbest bırak.",
    files: [
      { name: "main.cpp", content: `#include <iostream>\n\nint main() {\n    // TODO: new ile bellek ayır, yazdır, delete ile serbest bırak\n    return 0;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\bnew\\s+int", label: "new ile bellek ayrılmış" },
      { type: "regex", value: "\\bdelete\\s+\\w+", label: "delete ile bellek serbest bırakılmış" },
      { type: "output", value: "42", label: "Çıktı 42" },
    ],
  },
];
