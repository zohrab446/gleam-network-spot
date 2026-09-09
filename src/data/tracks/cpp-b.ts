import type { Lesson } from "../types";

export const CPP_B: Lesson[] = [
  {
    id: "cpp-246",
    level: 246,
    language: "cpp",
    title: "new ve delete ile dinamik dizi",
    description: "new[] ile dinamik dizi oluştur, delete[] ile belleği serbest bırak.",
    explanation:
      "`new int[n]` ile çalışma zamanında boyutu belirlenen bir dizi oluşturulur (yığın yerine heap'te).\nİşin bitince `delete[] dizi;` ile bellek serbest bırakılmalı, yoksa bellek sızıntısı olur.",
    example: "int n = 3;\nint* dizi = new int[n];\ndizi[0] = 10;\nstd::cout << dizi[0];\ndelete[] dizi;",
    hints: [
      "new int[5] ile 5 elemanlık dinamik dizi oluştur.",
      "Dizinin elemanlarına indeksle (dizi[i]) değer ata ve yazdır.",
      "int* dizi = new int[3]; dizi[0]=1; dizi[1]=2; dizi[2]=3; std::cout << dizi[0]+dizi[1]+dizi[2]; delete[] dizi;",
    ],
    challenge: "new int[3] ile dinamik dizi oluştur, 1, 2, 3 değerlerini ata, toplamlarını yazdır (6), sonra delete[] ile serbest bırak.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\nint main() {\n    // TODO: new int[3] ile dizi olustur, 1 2 3 ata, toplamini yazdir, delete[] yap\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "new\\s+int\\s*\\[", label: "new int[] kullanılmış" },
      { type: "regex", value: "delete\\s*\\[\\]", label: "delete[] kullanılmış" },
      { type: "output", value: "6", label: "Çıktıda 6 var" },
    ],
  },
  {
    id: "cpp-247",
    level: 247,
    language: "cpp",
    title: "struct tanımlama",
    description: "struct ile birden çok alanı gruplayan yeni bir tip tanımla.",
    explanation:
      "`struct` birbiriyle ilişkili verileri tek bir tip altında toplar.\nÜyelerine nokta operatörüyle (`.`) erişilir: `ogrenci.ad`.",
    example: "struct Ogrenci {\n    std::string ad;\n    int yas;\n};\n\nOgrenci o;\no.ad = \"Ali\";\no.yas = 20;\nstd::cout << o.ad;",
    hints: [
      "struct Nokta { int x; int y; }; şeklinde bir struct tanımla.",
      "Nokta tipinde bir değişken oluştur ve x, y alanlarına değer ver.",
      "struct Nokta { int x; int y; }; Nokta p; p.x = 3; p.y = 4; std::cout << p.x + p.y;",
    ],
    challenge: "Nokta adında struct tanımla (int x, int y). x=3, y=4 ata, toplamlarını yazdır (7).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: struct Nokta { int x; int y; };\n\nint main() {\n    // TODO: Nokta p olustur, x=3 y=4 ata, toplami yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "struct\\s+Nokta", label: "struct Nokta tanımlı" },
      { type: "output", value: "7", label: "Çıktıda 7 var" },
    ],
  },
  {
    id: "cpp-248",
    level: 248,
    language: "cpp",
    title: "struct dizisi",
    description: "Bir struct tipinden dizi oluştur ve döngüyle gez.",
    explanation:
      "Struct tipinden dizi tanımlamak, normal dizi gibi çalışır: `Ogrenci ogrenciler[3];`.\nHer eleman `ogrenciler[i].alan` şeklinde erişilir ve döngüyle işlenebilir.",
    example: "struct Ogrenci { std::string ad; int not_; };\nOgrenci liste[2];\nliste[0].not_ = 80;\nliste[1].not_ = 90;\nfor (int i = 0; i < 2; i++) std::cout << liste[i].not_ << \" \";",
    hints: [
      "struct Ogrenci { std::string ad; int not_; }; tanımla.",
      "Ogrenci liste[3]; dizisi oluştur ve for döngüsüyle not_ alanlarına değer ata.",
      "for (int i = 0; i < 3; i++) { liste[i].not_ = (i+1)*10; std::cout << liste[i].not_ << \" \"; }",
    ],
    challenge: "3 elemanlı Ogrenci struct dizisi oluştur (int not_ alanı), her birine sırayla 10, 20, 30 ata ve for döngüsüyle yazdır (\"10 20 30 \").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <string>\n\nstruct Ogrenci {\n    std::string ad;\n    int not_;\n};\n\nint main() {\n    // TODO: Ogrenci liste[3] olustur, 10 20 30 ata, dongude yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "Ogrenci\\s+\\w+\\s*\\[\\s*3\\s*\\]", label: "3 elemanlı struct dizisi" },
      { type: "regex", value: "for\\s*\\(", label: "for döngüsü kullanılmış" },
      { type: "output", value: "10 20 30", label: "Çıktıda '10 20 30' var" },
    ],
  },
  {
    id: "cpp-249",
    level: 249,
    language: "cpp",
    title: "class temelleri",
    description: "class anahtar kelimesiyle üye değişken ve metot içeren bir tip tanımla.",
    explanation:
      "`class`, struct'a benzer ama üyeleri varsayılan olarak `private`'tır. Metotlar (fonksiyonlar) sınıfın içine yazılır.\nDışarıdan erişim için `public:` etiketi kullanılır.",
    example: "class Hayvan {\npublic:\n    std::string isim;\n    void sesCikar() {\n        std::cout << isim << \" ses cikardi\";\n    }\n};\n\nHayvan h;\nh.isim = \"Kedi\";\nh.sesCikar();",
    hints: [
      "class Araba { public: ... }; şeklinde bir sınıf tanımla.",
      "İçine public bir int hiz üyesi ve bunu yazdıran bir metot ekle.",
      "class Araba { public: int hiz; void bilgi() { std::cout << \"Hiz: \" << hiz; } };",
    ],
    challenge: "Araba adında class tanımla (public int hiz üyesi ve bilgi() metodu 'Hiz: <hiz>' yazdırsın). hiz=120 ata, bilgi() çağır.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Araba tanimla (public int hiz, void bilgi() metodu)\n\nint main() {\n    // TODO: Araba nesnesi olustur, hiz=120 ata, bilgi() cagir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "class\\s+Araba", label: "class Araba tanımlı" },
      { type: "regex", value: "public\\s*:", label: "public etiketi kullanılmış" },
      { type: "output", value: "Hiz: 120", label: "Çıktıda 'Hiz: 120' var" },
    ],
  },
  {
    id: "cpp-250",
    level: 250,
    language: "cpp",
    title: "Constructor (yapıcı fonksiyon)",
    description: "Sınıf adıyla aynı isimde bir constructor yazarak nesne oluştururken değer ata.",
    explanation:
      "Constructor, sınıfla aynı isme sahip özel bir fonksiyondur ve nesne oluşturulduğunda otomatik çalışır.\nÜyelere ilk değerleri atamak için kullanılır: `Nokta(int x, int y) { this->x = x; this->y = y; }`.",
    example: "class Nokta {\npublic:\n    int x, y;\n    Nokta(int a, int b) {\n        x = a;\n        y = b;\n    }\n};\nNokta p(3, 4);\nstd::cout << p.x;",
    hints: [
      "Sınıfla aynı isimde parametreli bir fonksiyon (constructor) tanımla.",
      "Constructor içinde parametreleri üye değişkenlere ata.",
      "class Kutu { public: int genislik; Kutu(int g) { genislik = g; } };  Kutu k(5); std::cout << k.genislik;",
    ],
    challenge: "Kutu adında class tanımla (public int genislik), Kutu(int g) constructor'ı ile genislik'i ayarla. Kutu k(7); oluştur, genislik'i yazdır (7).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Kutu tanimla, constructor ile genislik ata\n\nint main() {\n    // TODO: Kutu k(7); olustur ve genislik yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "Kutu\\s*\\(\\s*int", label: "Constructor tanımlı" },
      { type: "output", value: "7", label: "Çıktıda 7 var" },
    ],
  },
  {
    id: "cpp-251",
    level: 251,
    language: "cpp",
    title: "Getter / Setter",
    description: "private üye değişkenlere erişim için getter ve setter metotları yaz.",
    explanation:
      "`private` üyelere sınıf dışından doğrudan erişilemez, bu yüzden `getX()` gibi okuma (getter) ve `setX()` gibi yazma (setter) metotları kullanılır.\nBu yaklaşım verinin kontrollü şekilde değiştirilmesini sağlar (encapsulation).",
    example: "class Hesap {\nprivate:\n    int bakiye;\npublic:\n    void setBakiye(int b) { bakiye = b; }\n    int getBakiye() { return bakiye; }\n};\nHesap h;\nh.setBakiye(100);\nstd::cout << h.getBakiye();",
    hints: [
      "private bir int yas üyesi tanımla.",
      "public setYas(int) ve getYas() metotları yaz.",
      "class Kisi { private: int yas; public: void setYas(int y) { yas = y; } int getYas() { return yas; } };",
    ],
    challenge: "Kisi adında class tanımla, private int yas üyesi, public setYas(int) ve getYas() metotları olsun. yas=25 ayarla ve getYas() ile yazdır.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Kisi tanimla (private int yas, setYas, getYas)\n\nint main() {\n    // TODO: Kisi nesnesi olustur, yas=25 ayarla, getYas ile yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "private\\s*:", label: "private etiketi kullanılmış" },
      { type: "regex", value: "setYas", label: "setYas metodu var" },
      { type: "output", value: "25", label: "Çıktıda 25 var" },
    ],
  },
  {
    id: "cpp-252",
    level: 252,
    language: "cpp",
    title: "this işaretçisi",
    description: "this ile mevcut nesneye işaret et, isim çakışmalarını çöz.",
    explanation:
      "`this`, çağrıldığı nesnenin adresini tutan bir işaretçidir.\nParametre adı üye değişkenle aynıysa (`this->isim = isim;`) hangisinin kastedildiğini netleştirmek için kullanılır.",
    example: "class Kisi {\npublic:\n    std::string isim;\n    Kisi(std::string isim) {\n        this->isim = isim;\n    }\n};\nKisi k(\"Ayse\");\nstd::cout << k.isim;",
    hints: [
      "Constructor parametresine üye değişkenle aynı ismi ver (isim).",
      "this->isim = isim; şeklinde ata.",
      "class Urun { public: std::string isim; Urun(std::string isim) { this->isim = isim; } };",
    ],
    challenge: "Urun adında class tanımla (public std::string isim), Urun(std::string isim) constructor'ında this->isim = isim; kullan. Urun u(\"Kalem\"); oluştur ve isim'i yazdır.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <string>\n\n// TODO: class Urun tanimla, this ile isim ata\n\nint main() {\n    // TODO: Urun u(\"Kalem\") olustur ve isim yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "this\\s*->\\s*isim", label: "this->isim kullanılmış" },
      { type: "output", value: "Kalem", label: "Çıktıda 'Kalem' var" },
    ],
  },
  {
    id: "cpp-253",
    level: 253,
    language: "cpp",
    title: "static üye",
    description: "static üye değişken ile tüm nesneler arasında paylaşılan bir değer tut.",
    explanation:
      "`static` üye değişken, sınıfın tüm nesneleri arasında paylaşılır; her nesnede ayrı kopyası olmaz.\nSınıf dışında bir kez tanımlanması gerekir: `int Sayac::adet = 0;`.",
    example: "class Sayac {\npublic:\n    static int adet;\n    Sayac() { adet++; }\n};\nint Sayac::adet = 0;\nSayac a, b;\nstd::cout << Sayac::adet;",
    hints: [
      "class içinde static int adet; tanımla.",
      "Sınıf dışında int Sayac::adet = 0; ile başlangıç değeri ver.",
      "Constructor içinde adet++; yaparak her yeni nesnede sayaç artır.",
    ],
    challenge: "Sayac adında class tanımla, static int adet üyesi olsun, her nesne oluşturulduğunda adet++ yapılsın. 3 nesne oluştur ve Sayac::adet değerini yazdır (3).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Sayac tanimla (static int adet), constructor'da adet++\n\nint main() {\n    // TODO: 3 nesne olustur, Sayac::adet yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "static\\s+int\\s+adet", label: "static int adet tanımlı" },
      { type: "regex", value: "Sayac\\s*::\\s*adet", label: "static üyeye sınıf dışında erişilmiş" },
      { type: "output", value: "3", label: "Çıktıda 3 var" },
    ],
  },
  {
    id: "cpp-254",
    level: 254,
    language: "cpp",
    title: "Kalıtım (inheritance)",
    description: "Bir sınıftan türeyen alt sınıf oluştur ve üye/metotları miras al.",
    explanation:
      "Kalıtımda `class Kopek : public Hayvan` ile `Kopek`, `Hayvan`'ın tüm public üyelerini miras alır.\nBu sayede ortak davranışlar tekrar yazılmadan yeniden kullanılabilir.",
    example: "class Hayvan {\npublic:\n    void yemekYe() { std::cout << \"Yemek yiyor\"; }\n};\nclass Kopek : public Hayvan {\npublic:\n    void havla() { std::cout << \"Hav!\"; }\n};\nKopek k;\nk.yemekYe();\nk.havla();",
    hints: [
      "class Hayvan { public: void sesCikar() { ... } }; tanımla.",
      "class Kedi : public Hayvan { ... }; ile Kedi sınıfını Hayvan'dan türet.",
      "Kedi nesnesi oluşturup hem Hayvan'ın hem Kedi'nin metotlarını çağır.",
    ],
    challenge: "Hayvan adında class tanımla (public void sesCikar() { std::cout << \"Ses\"; }). Kedi adında Hayvan'dan public türeyen bir class tanımla (public void miyavla() { std::cout << \"Miyav\"; }). Kedi k; oluştur, sesCikar() ve miyavla() çağır.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Hayvan tanimla (sesCikar), class Kedi : public Hayvan tanimla (miyavla)\n\nint main() {\n    // TODO: Kedi k; olustur, sesCikar() ve miyavla() cagir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "class\\s+Kedi\\s*:\\s*public\\s+Hayvan", label: "Kedi, Hayvan'dan public türemiş" },
      { type: "output", value: "Ses", label: "Çıktıda 'Ses' var" },
      { type: "output", value: "Miyav", label: "Çıktıda 'Miyav' var" },
    ],
  },
  {
    id: "cpp-255",
    level: 255,
    language: "cpp",
    title: "virtual ve polimorfizm",
    description: "virtual fonksiyonla alt sınıfların davranışı override etmesini sağla.",
    explanation:
      "`virtual` olarak işaretlenen bir metot, alt sınıfta `override` edilerek farklı davranabilir.\nÜst sınıf işaretçisi/referansı üzerinden çağrıldığında, gerçek nesnenin tipine göre doğru metot çalışır (dinamik bağlama).",
    example: "class Sekil {\npublic:\n    virtual void ciz() { std::cout << \"Sekil\"; }\n};\nclass Daire : public Sekil {\npublic:\n    void ciz() override { std::cout << \"Daire\"; }\n};\nSekil* s = new Daire();\ns->ciz();",
    hints: [
      "Üst sınıfta virtual void ciz() { ... } tanımla.",
      "Alt sınıfta aynı imzayla void ciz() override { ... } yaz.",
      "Sekil* s = new Daire(); s->ciz(); ile polimorfizmi test et.",
    ],
    challenge: "Sekil adında class tanımla (virtual void ciz() { std::cout << \"Sekil\"; }). Daire adında Sekil'den türeyen class tanımla (void ciz() override { std::cout << \"Daire\"; }). Sekil* s = new Daire(); ile s->ciz(); çağır (çıktı 'Daire' olmalı).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Sekil (virtual ciz), class Daire : public Sekil (ciz override)\n\nint main() {\n    // TODO: Sekil* s = new Daire(); s->ciz();\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "virtual\\s+void\\s+ciz", label: "virtual void ciz tanımlı" },
      { type: "regex", value: "override", label: "override kullanılmış" },
      { type: "output", value: "Daire", label: "Çıktıda 'Daire' var" },
    ],
  },
  {
    id: "cpp-256",
    level: 256,
    language: "cpp",
    title: "Operator overloading",
    description: "operator+ ile iki nesneyi + ile toplayabilecek şekilde tanımla.",
    explanation:
      "C++'ta operatörler sınıflar için yeniden tanımlanabilir (`overload`). Örneğin `operator+` sayesinde iki `Nokta` nesnesi `+` ile toplanabilir.\nBu, kodun matematiksel ifadeler gibi okunmasını sağlar.",
    example: "class Nokta {\npublic:\n    int x;\n    Nokta operator+(const Nokta& b) {\n        Nokta sonuc;\n        sonuc.x = x + b.x;\n        return sonuc;\n    }\n};",
    hints: [
      "class Nokta içinde int x ve int y üyeleri tanımla.",
      "Nokta operator+(const Nokta& b) metodu yazarak x ve y'leri topla.",
      "Nokta a; a.x=1; a.y=2; Nokta b; b.x=3; b.y=4; Nokta c = a + b; std::cout << c.x << \" \" << c.y;",
    ],
    challenge: "Nokta adında class tanımla (int x, y), operator+ ile iki Nokta'yı toplayabilecek şekilde overload et. a=(1,2), b=(3,4), c=a+b oluştur, c.x ve c.y'yi boşlukla yazdır (\"4 6\").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Nokta tanimla, operator+ overload et\n\nint main() {\n    // TODO: a, b Nokta olustur, c = a + b yap, c.x ve c.y yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "operator\\s*\\+", label: "operator+ tanımlı" },
      { type: "output", value: "4 6", label: "Çıktıda '4 6' var" },
    ],
  },
  {
    id: "cpp-257",
    level: 257,
    language: "cpp",
    title: "friend fonksiyon",
    description: "friend anahtar kelimesiyle sınıf dışı bir fonksiyona private erişim ver.",
    explanation:
      "`friend` olarak işaretlenen bir fonksiyon, sınıfın `private` üyelerine sınıfın parçası olmadan erişebilir.\nGenellikle iki sınıf ya da bir sınıfla harici bir fonksiyon arasında sıkı işbirliği gerektiğinde kullanılır.",
    example: "class Kutu {\nprivate:\n    int uzunluk;\npublic:\n    Kutu(int u) : uzunluk(u) {}\n    friend void goster(Kutu k);\n};\nvoid goster(Kutu k) {\n    std::cout << k.uzunluk;\n}",
    hints: [
      "class içinde private int deger üyesi ve constructor tanımla.",
      "friend void goster(Kutu k); satırını sınıfa ekle.",
      "Sınıf dışında void goster(Kutu k) { std::cout << k.deger; } fonksiyonunu yaz ve çağır.",
    ],
    challenge: "Kutu adında class tanımla (private int deger, constructor Kutu(int d)). friend void goster(Kutu k); ekle, bu fonksiyon k.deger'i yazdırsın. Kutu k(42); ile goster(k); çağır.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Kutu tanimla (private int deger), friend void goster(Kutu k);\n\nint main() {\n    // TODO: Kutu k(42); olustur, goster(k) cagir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "friend\\s+void\\s+goster", label: "friend fonksiyon tanımlı" },
      { type: "output", value: "42", label: "Çıktıda 42 var" },
    ],
  },
  {
    id: "cpp-258",
    level: 258,
    language: "cpp",
    title: "Destructor",
    description: "~SınıfAdı() ile nesne yok olurken çalışan bir destructor yaz.",
    explanation:
      "Destructor, nesne kapsam dışına çıktığında ya da `delete` ile silindiğinde otomatik çağrılır.\nÖzellikle `new` ile alınan belleği temizlemek veya kapanış mesajı vermek için kullanılır.",
    example: "class Kaynak {\npublic:\n    Kaynak() { std::cout << \"Olusturuldu \"; }\n    ~Kaynak() { std::cout << \"Yok edildi\"; }\n};\n{\n    Kaynak k;\n}",
    hints: [
      "class içinde constructor'da bir mesaj, destructor'da (~SinifAdi()) başka bir mesaj yazdır.",
      "Destructor tanımı ~ ile başlar ve parametre almaz.",
      "class Kayit { public: Kayit() { std::cout << \"Baslangic \"; } ~Kayit() { std::cout << \"Bitis\"; } }; { Kayit k; }",
    ],
    challenge: "Kayit adında class tanımla, constructor'da \"Baslangic \" yazdır, destructor'da (~Kayit()) \"Bitis\" yazdır. main içinde bir blok {} açıp Kayit nesnesi oluştur (blok bitince destructor tetiklensin).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: class Kayit tanimla (constructor 'Baslangic ' yazsin, destructor 'Bitis' yazsin)\n\nint main() {\n    {\n        // TODO: Kayit nesnesi olustur\n    }\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "~Kayit\\s*\\(", label: "Destructor tanımlı" },
      { type: "output-exact", value: "Baslangic Bitis", label: "Çıktı tam olarak 'Baslangic Bitis'" },
    ],
  },
  {
    id: "cpp-259",
    level: 259,
    language: "cpp",
    title: "Template fonksiyon",
    description: "template <typename T> ile herhangi bir tiple çalışan genel bir fonksiyon yaz.",
    explanation:
      "`template <typename T>` sayesinde bir fonksiyon farklı tipler için tekrar yazılmadan kullanılabilir.\nDerleyici, fonksiyon çağrısındaki argüman tipine göre `T`'yi otomatik belirler.",
    example: "template <typename T>\nT topla(T a, T b) {\n    return a + b;\n}\nstd::cout << topla(3, 4);\nstd::cout << topla(1.5, 2.5);",
    hints: [
      "template <typename T> satırıyla fonksiyonu genelleştir.",
      "Fonksiyon T tipinde iki parametre alsın ve büyük olanı döndürsün.",
      "template <typename T> T maksimum(T a, T b) { return (a > b) ? a : b; } std::cout << maksimum(3, 7) << \" \" << maksimum(2.5, 1.5);",
    ],
    challenge: "maksimum adında template fonksiyon yaz (T tipinde iki parametre alıp büyüğünü döndürsün). maksimum(3, 7) ve maksimum(2.5, 1.5) çağırıp sonuçları boşlukla yazdır (\"7 2.5\").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: template <typename T> T maksimum(T a, T b) fonksiyonunu yaz\n\nint main() {\n    // TODO: maksimum(3,7) ve maksimum(2.5,1.5) yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "template\\s*<\\s*typename\\s+T\\s*>", label: "template <typename T> kullanılmış" },
      { type: "output", value: "7 2.5", label: "Çıktıda '7 2.5' var" },
    ],
  },
  {
    id: "cpp-260",
    level: 260,
    language: "cpp",
    title: "Template class",
    description: "template <typename T> ile herhangi bir tipte veri tutan genel bir sınıf yaz.",
    explanation:
      "Template class, `Kutu<int>` veya `Kutu<std::string>` gibi farklı tiplerde nesneler oluşturmayı sağlar.\nSınıf tanımının başına `template <typename T>` eklenir ve `T`, üye değişken/metot tiplerinde kullanılır.",
    example: "template <typename T>\nclass Kutu {\npublic:\n    T deger;\n    Kutu(T d) : deger(d) {}\n};\nKutu<int> k(5);\nstd::cout << k.deger;",
    hints: [
      "template <typename T> ile bir class tanımla, T tipinde bir üye ve constructor ekle.",
      "Kutu<int> ve Kutu<std::string> gibi farklı tipte nesneler oluşturabilirsin.",
      "template <typename T> class Kutu { public: T deger; Kutu(T d) : deger(d) {} };  Kutu<int> k(9); std::cout << k.deger;",
    ],
    challenge: "Kutu adında template class tanımla (T deger üyesi, constructor Kutu(T d)). Kutu<int> k(9); oluştur ve k.deger'i yazdır (9).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\n// TODO: template <typename T> class Kutu tanimla\n\nint main() {\n    // TODO: Kutu<int> k(9); olustur ve k.deger yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "template\\s*<\\s*typename\\s+T\\s*>\\s*\\n?\\s*class\\s+Kutu", label: "template class Kutu tanımlı" },
      { type: "output", value: "9", label: "Çıktıda 9 var" },
    ],
  },
  {
    id: "cpp-261",
    level: 261,
    language: "cpp",
    title: "std::vector",
    description: "std::vector ile boyutu dinamik değişebilen bir dizi kullan.",
    explanation:
      "`std::vector<T>`, C++'ta en çok kullanılan dinamik dizi tipidir; `push_back` ile eleman eklenir, `size()` ile boyutu öğrenilir.\n`<vector>` başlığını include etmek gerekir.",
    example: "#include <vector>\nstd::vector<int> sayilar;\nsayilar.push_back(10);\nsayilar.push_back(20);\nstd::cout << sayilar[0] << \" \" << sayilar.size();",
    hints: [
      "#include <vector> ekle.",
      "std::vector<int> ile bir vektör tanımla ve push_back ile eleman ekle.",
      "std::vector<int> v; v.push_back(1); v.push_back(2); v.push_back(3); for (int x : v) std::cout << x << \" \";",
    ],
    challenge: "std::vector<int> oluştur, push_back ile 1, 2, 3 ekle, range-for ile hepsini boşlukla yazdır (\"1 2 3 \").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <vector>\n\nint main() {\n    // TODO: vector<int> olustur, 1 2 3 push_back et, dongude yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "std::vector\\s*<\\s*int\\s*>", label: "std::vector<int> kullanılmış" },
      { type: "regex", value: "push_back", label: "push_back kullanılmış" },
      { type: "output", value: "1 2 3", label: "Çıktıda '1 2 3' var" },
    ],
  },
  {
    id: "cpp-262",
    level: 262,
    language: "cpp",
    title: "std::string metotları",
    description: "length(), substr(), find() gibi string metotlarını kullan.",
    explanation:
      "`std::string` birçok yararlı metot sunar: `length()` uzunluk verir, `substr(baslangic, uzunluk)` alt dize alır, `find(x)` arama yapar.\nBunlar metin işlemede sık kullanılır.",
    example: "std::string s = \"Merhaba Dunya\";\nstd::cout << s.length() << std::endl;\nstd::cout << s.substr(0, 7) << std::endl;",
    hints: [
      "Bir std::string tanımla ve length() ile uzunluğunu yazdır.",
      "substr(0, 5) ile ilk 5 karakteri al ve yazdır.",
      "std::string s = \"CodeQuest\"; std::cout << s.length() << std::endl; std::cout << s.substr(0, 4) << std::endl;",
    ],
    challenge: "s = \"CodeQuest\" tanımla. Önce s.length()'i yazdır, sonra yeni satırda s.substr(0, 4)'ü yazdır (çıktı: \"9\\nCode\").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = \"CodeQuest\";\n    // TODO: length() ve substr(0,4) yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "\\.length\\(\\)", label: "length() kullanılmış" },
      { type: "regex", value: "\\.substr\\(", label: "substr() kullanılmış" },
      { type: "output-exact", value: "9\nCode", label: "Çıktı tam olarak '9\\nCode'" },
    ],
  },
  {
    id: "cpp-263",
    level: 263,
    language: "cpp",
    title: "std::map",
    description: "Anahtar-değer çiftleri saklamak için std::map kullan.",
    explanation:
      "`std::map<K, V>` anahtar-değer çiftlerini anahtara göre sıralı tutar.\nEleman eklemek için `harita[anahtar] = deger;`, erişmek için `harita[anahtar]` kullanılır. `<map>` include edilmelidir.",
    example: "#include <map>\nstd::map<std::string, int> yaslar;\nyaslar[\"Ali\"] = 25;\nyaslar[\"Ayse\"] = 30;\nstd::cout << yaslar[\"Ali\"];",
    hints: [
      "#include <map> ekle.",
      "std::map<std::string, int> tanımla, en az iki anahtar-değer çifti ekle.",
      "std::map<std::string, int> m; m[\"a\"] = 1; m[\"b\"] = 2; std::cout << m[\"a\"] + m[\"b\"];",
    ],
    challenge: "std::map<std::string, int> oluştur, \"elma\"=3 ve \"armut\"=5 ekle, ikisinin toplamını yazdır (8).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    // TODO: map olustur, elma=3 armut=5 ekle, toplamini yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "std::map\\s*<", label: "std::map kullanılmış" },
      { type: "output", value: "8", label: "Çıktıda 8 var" },
    ],
  },
  {
    id: "cpp-264",
    level: 264,
    language: "cpp",
    title: "std::set",
    description: "Tekrarsız ve sıralı elemanlar tutan std::set kullan.",
    explanation:
      "`std::set<T>`, elemanları otomatik sıralar ve tekrarları saklamaz; aynı değeri tekrar `insert` etmek etkisiz olur.\n`<set>` include edilmelidir, `size()` eleman sayısını verir.",
    example: "#include <set>\nstd::set<int> s;\ns.insert(3);\ns.insert(1);\ns.insert(3);\nstd::cout << s.size();",
    hints: [
      "#include <set> ekle.",
      "std::set<int> tanımla ve insert ile bazı sayılar ekle (tekrarlı olanlar da olsun).",
      "std::set<int> s; s.insert(5); s.insert(5); s.insert(7); std::cout << s.size();",
    ],
    challenge: "std::set<int> oluştur, 4, 4, 4, 9 değerlerini insert et, size()'ı yazdır (tekrarlar sayılmadığı için 2 olmalı).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <set>\n\nint main() {\n    // TODO: set<int> olustur, 4 4 4 9 insert et, size() yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "std::set\\s*<\\s*int\\s*>", label: "std::set<int> kullanılmış" },
      { type: "output", value: "2", label: "Çıktıda 2 var" },
    ],
  },
  {
    id: "cpp-265",
    level: 265,
    language: "cpp",
    title: "Iterator kullanımı",
    description: "begin() ve end() ile bir konteynerin elemanlarında iterator kullanarak gez.",
    explanation:
      "Iterator, bir konteynerin (vector, set, map...) elemanlarını sırayla dolaşmak için kullanılan bir tür işaretçidir.\n`it != v.end()` koşuluyla döngü kurulur, `*it` mevcut elemanı verir, `++it` bir sonrakine geçer.",
    example: "std::vector<int> v = {1, 2, 3};\nfor (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it << \" \";\n}",
    hints: [
      "std::vector<int>::iterator tipinde bir değişken tanımla.",
      "it = v.begin() ile başlat, it != v.end() koşuluyla döngü kur, ++it ile ilerlet.",
      "for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it) std::cout << *it << \" \";",
    ],
    challenge: "std::vector<int> v = {5, 10, 15}; tanımla. Iterator kullanarak (begin()/end()) elemanları boşlukla yazdır (\"5 10 15 \").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {5, 10, 15};\n    // TODO: iterator ile dolas ve yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "::iterator", label: "iterator tipi kullanılmış" },
      { type: "regex", value: "\\.begin\\(\\)", label: "begin() kullanılmış" },
      { type: "output", value: "5 10 15", label: "Çıktıda '5 10 15' var" },
    ],
  },
  {
    id: "cpp-266",
    level: 266,
    language: "cpp",
    title: "algorithm: sort ve find",
    description: "<algorithm> başlığındaki std::sort ve std::find fonksiyonlarını kullan.",
    explanation:
      "`std::sort(basla, bitir)` bir aralığı küçükten büyüğe sıralar.\n`std::find(basla, bitir, deger)` bir değeri arar ve bulunduğu iterator'ı (veya `end()`) döndürür. İkisi de `<algorithm>` içindedir.",
    example: "#include <algorithm>\nstd::vector<int> v = {3, 1, 2};\nstd::sort(v.begin(), v.end());\nfor (int x : v) std::cout << x << \" \";\nauto it = std::find(v.begin(), v.end(), 2);\nif (it != v.end()) std::cout << \"bulundu\";",
    hints: [
      "#include <algorithm> ekle.",
      "std::sort(v.begin(), v.end()); ile vektörü sırala.",
      "std::find(v.begin(), v.end(), deger) ile arama yap, sonucu v.end() ile karşılaştır.",
    ],
    challenge: "std::vector<int> v = {5, 1, 4, 2}; tanımla. std::sort ile sırala ve boşlukla yazdır. Sonra std::find ile 4'ü ara, bulunduysa yeni satırda \"bulundu\" yazdır (çıktı: \"1 2 4 5 \\nbulundu\").",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {5, 1, 4, 2};\n    // TODO: sort ile sirala ve yazdir, sonra find ile 4 ara\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "std::sort\\s*\\(", label: "std::sort kullanılmış" },
      { type: "regex", value: "std::find\\s*\\(", label: "std::find kullanılmış" },
      { type: "output-exact", value: "1 2 4 5\nbulundu", label: "Çıktı tam olarak '1 2 4 5\\nbulundu'" },
    ],
  },
  {
    id: "cpp-267",
    level: 267,
    language: "cpp",
    title: "Lambda ifadeleri",
    description: "İsimsiz fonksiyonlar (lambda) tanımla ve kullan.",
    explanation:
      "Lambda ifadesi `[]() { ... }` sözdizimiyle yazılan, adı olmayan küçük fonksiyonlardır.\nDeğişken yakalamak için `[]` içine `=` (değerle) veya `&` (referansla) yazılabilir; genellikle `std::sort` gibi fonksiyonlara karşılaştırıcı olarak verilir.",
    example: "auto topla = [](int a, int b) {\n    return a + b;\n};\nstd::cout << topla(3, 4);",
    hints: [
      "auto ile bir lambda değişkeni tanımla: auto isim = [](parametreler) { ... };",
      "Lambda'yı normal bir fonksiyon gibi çağır.",
      "auto carp = [](int a, int b) { return a * b; }; std::cout << carp(3, 4);",
    ],
    challenge: "carp adında bir lambda tanımla (iki int alıp çarpımını döndürsün). carp(3, 4)'ü çağır ve sonucu yazdır (12).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n\nint main() {\n    // TODO: carp adinda lambda tanimla ve carp(3,4) yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "\\[\\s*\\]\\s*\\(", label: "Lambda ifadesi kullanılmış" },
      { type: "output", value: "12", label: "Çıktıda 12 var" },
    ],
  },
  {
    id: "cpp-268",
    level: 268,
    language: "cpp",
    title: "std::stringstream",
    description: "std::stringstream ile bir string üzerinden veri okuma/parçalama yap.",
    explanation:
      "`std::stringstream`, bir string'i sanki dosya/akışmış gibi okumayı sağlar; `<sstream>` içindedir.\n`>>` operatörüyle boşluklara göre ayrılmış parçalar okunabilir, sayıyı string'e çevirmek için de kullanılır.",
    example: "#include <sstream>\nstd::stringstream ss(\"10 20\");\nint a, b;\nss >> a >> b;\nstd::cout << a + b;",
    hints: [
      "#include <sstream> ekle.",
      "std::stringstream ss(\"...\"); ile bir string'i akışa dönüştür.",
      "ss >> a >> b; ile iki değeri oku, sonra topla.",
    ],
    challenge: "std::stringstream ss(\"7 8\"); tanımla, iki int değişkene ss >> a >> b; ile oku, toplamını yazdır (15).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <sstream>\n\nint main() {\n    std::stringstream ss(\"7 8\");\n    // TODO: iki int oku ve toplamini yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "std::stringstream", label: "std::stringstream kullanılmış" },
      { type: "output", value: "15", label: "Çıktıda 15 var" },
    ],
  },
  {
    id: "cpp-269",
    level: 269,
    language: "cpp",
    title: "Exception: try / catch",
    description: "throw ile hata fırlat, try/catch ile yakala.",
    explanation:
      "`throw` bir hata (exception) fırlatır; program akışı en yakın uygun `catch` bloğuna atlar.\n`try { ... } catch (...) { ... }` yapısı, hataları programın çökmesini önleyecek şekilde ele almayı sağlar.",
    example: "try {\n    throw std::runtime_error(\"Hata!\");\n} catch (const std::exception& e) {\n    std::cout << e.what();\n}",
    hints: [
      "try { ... } catch (...) { ... } bloğu kur.",
      "İçinde bir koşula göre throw std::runtime_error(\"mesaj\"); fırlat.",
      "catch (const std::exception& e) { std::cout << e.what(); } ile hatayı yakala ve yazdır.",
    ],
    challenge: "int sayi = 0; için try bloğunda eğer sayi == 0 ise throw std::runtime_error(\"Sifira bolme\"); fırlat, catch bloğunda e.what() ile mesajı yazdır.",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <stdexcept>\n\nint main() {\n    int sayi = 0;\n    // TODO: try/catch ile sayi==0 durumunda hata firlat ve yakala\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "throw\\s+std::runtime_error", label: "throw std::runtime_error kullanılmış" },
      { type: "regex", value: "catch\\s*\\(", label: "catch bloğu var" },
      { type: "output", value: "Sifira bolme", label: "Çıktıda 'Sifira bolme' var" },
    ],
  },
  {
    id: "cpp-270",
    level: 270,
    language: "cpp",
    title: "Mini proje: Öğrenci not ortalaması",
    description: "class, vector ve döngüleri birleştirerek öğrenci notlarının ortalamasını hesapla.",
    explanation:
      "Bu mini projede bir `Ogrenci` sınıfı, notlarını tutan bir `std::vector<int>` ve ortalamayı hesaplayan bir metot birlikte kullanılır.\nGerçek uygulamalarda sınıflar genellikle böyle birden fazla kavramı bir araya getirir.",
    example: "class Ogrenci {\npublic:\n    std::vector<int> notlar;\n    double ortalama() {\n        double toplam = 0;\n        for (int n : notlar) toplam += n;\n        return toplam / notlar.size();\n    }\n};",
    hints: [
      "class Ogrenci içinde std::vector<int> notlar; üyesi tanımla.",
      "ortalama() metodunda döngüyle notları topla, notlar.size()'a böl.",
      "Ogrenci o; o.notlar.push_back(80); o.notlar.push_back(90); o.notlar.push_back(70); std::cout << o.ortalama();",
    ],
    challenge: "Ogrenci adında class tanımla (std::vector<int> notlar üyesi, double ortalama() metodu). 80, 90, 70 notlarını ekle ve ortalama()'yı yazdır (80).",
    files: [
      { name: "main.cpp", content: "#include <iostream>\n#include <vector>\n\n// TODO: class Ogrenci tanimla (vector<int> notlar, double ortalama())\n\nint main() {\n    // TODO: Ogrenci o olustur, 80 90 70 notlarini ekle, ortalamayi yazdir\n    return 0;\n}" },
    ],
    checks: [
      { type: "regex", value: "class\\s+Ogrenci", label: "class Ogrenci tanımlı" },
      { type: "regex", value: "std::vector\\s*<\\s*int\\s*>\\s*notlar", label: "notlar vektörü tanımlı" },
      { type: "output", value: "80", label: "Çıktıda 80 var" },
    ],
  },
];
