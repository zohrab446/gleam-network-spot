import type { Lesson } from "../types";

export const PYTHON_A: Lesson[] = [
  {
    id: "python-171",
    level: 171,
    language: "python",
    title: "Merhaba Python",
    description: "print() ile ekrana yazı yazdır.",
    explanation:
      "Python'da ekrana bir şey yazdırmak için `print()` fonksiyonu kullanılır.\nParantez içine yazmak istediğin metni tırnak işaretleri arasında koyarsın.",
    example: `print("Merhaba")`,
    hints: [
      "print() fonksiyonunu kullan.",
      "Metni çift tırnak içine yaz.",
      `print("Merhaba, CodeQuest!")`,
    ],
    challenge: `Ekrana "Merhaba, CodeQuest!" yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: print() ile "Merhaba, CodeQuest!" yazdır\n` },
    ],
    checks: [
      { type: "output", value: "Merhaba, CodeQuest!", label: "Çıktıda 'Merhaba, CodeQuest!' var" },
    ],
  },
  {
    id: "python-172",
    level: 172,
    language: "python",
    title: "Yorum satırları",
    description: "# ile kod içine not düş.",
    explanation:
      "Python'da `#` işaretinden sonraki her şey yorum sayılır ve çalıştırılmaz.\nYorumlar kodu açıklamak için kullanılır, program çıktısını etkilemez.",
    example: `# Bu bir yorumdur\nprint("Kod çalışır")`,
    hints: [
      "# işareti ile bir yorum satırı ekle.",
      "Yorum satırı print() çağrısını etkilemez.",
      `# Bu satır çalışmaz\nprint("Selam")`,
    ],
    challenge: `Bir yorum satırı ekle (içeriği ne olursa olsun) ve ardından "Selam" yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: bir yorum satırı yaz\n# TODO: print() ile "Selam" yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "^\\s*#.+", label: "Yorum satırı var" },
      { type: "output", value: "Selam", label: "Çıktıda 'Selam' var" },
    ],
  },
  {
    id: "python-173",
    level: 173,
    language: "python",
    title: "Değişkenler ve dinamik tipler",
    description: "Değişken tanımla ve type() ile tipini öğren.",
    explanation:
      "Python'da değişken tanımlarken tip belirtmene gerek yoktur, değer atadığın anda tip otomatik belirlenir.\n`type()` fonksiyonu bir değişkenin tipini gösterir.",
    example: `age = 15\nprint(type(age))`,
    hints: [
      "name adında bir değişken oluştur ve bir isim ata.",
      "type(name) ile tipini yazdır.",
      `name = "Ada"\nprint(name)\nprint(type(name))`,
    ],
    challenge: `name adlı değişkene bir isim (string) ata, sonra name ve type(name) değerlerini yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: name değişkenini oluştur\n# TODO: name ve type(name) yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "name\\s*=", label: "name değişkeni tanımlanmış" },
      { type: "output", value: "<class 'str'>", label: "type() çıktısı str gösteriyor" },
    ],
  },
  {
    id: "python-174",
    level: 174,
    language: "python",
    title: "f-strings",
    description: "f-string ile değişkenleri metin içine göm.",
    explanation:
      "f-string, bir string başına `f` koyup içine `{degisken}` yazarak değerleri metne gömmeni sağlar.\nBu, string birleştirmekten daha okunaklı bir yoldur.",
    example: `name = "Ada"\nprint(f"Merhaba {name}")`,
    hints: [
      "age adında bir değişkene bir sayı ata.",
      "f-string ile bir metin oluştur.",
      `age = 15\nprint(f"Yaşım {age}")`,
    ],
    challenge: `age adlı değişkene bir sayı ata ve f-string kullanarak "Yaşım 15" gibi bir çıktı ver.`,
    files: [
      { name: "main.py", content: `age = 15\n# TODO: f-string ile "Yaşım <age>" yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "f[\"']", label: "f-string kullanılmış" },
      { type: "output", value: "Yaşım 15", label: "Çıktıda 'Yaşım 15' var" },
    ],
  },
  {
    id: "python-175",
    level: 175,
    language: "python",
    title: "input() ile girdi al",
    description: "Kullanıcıdan gelen veriyi input() ile oku.",
    explanation:
      "`input()` fonksiyonu kullanıcıdan bir satır metin okur ve string olarak döner.\nParantez içine yazdığın metin, kullanıcıya soru olarak gösterilir.",
    example: `name = input("Adın ne? ")\nprint(f"Merhaba {name}")`,
    hints: [
      "input() ile bir isim oku.",
      "Okuduğun değeri bir değişkene ata.",
      `name = input()\nprint(f"Merhaba {name}")`,
    ],
    challenge: `Girdi: "Ali". input() ile bir isim oku ve "Merhaba Ali" yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: input() ile isim oku\n# TODO: "Merhaba <isim>" yazdır\n` },
    ],
    stdin: ["Ali"],
    checks: [
      { type: "regex", value: "input\\(", label: "input() kullanılmış" },
      { type: "output", value: "Merhaba Ali", label: "Çıktıda 'Merhaba Ali' var" },
    ],
  },
  {
    id: "python-176",
    level: 176,
    language: "python",
    title: "Tip dönüşümleri",
    description: "int(), str(), float() ile tip dönüştür.",
    explanation:
      "`input()` her zaman string döner, sayısal işlem yapmak için `int()` veya `float()` ile dönüştürmen gerekir.\n`str()` ise sayıyı yazıya çevirir.",
    example: `n = int("5")\nprint(n + 1)`,
    hints: [
      "input() ile okuduğun değeri int() ile sayıya çevir.",
      "Sayıya 1 ekleyip sonucu yazdır.",
      `age = int(input())\nprint(age + 1)`,
    ],
    challenge: `Girdi: "17". input() ile oku, int() ile sayıya çevir ve 1 ekleyerek sonucu (18) yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: input() ile oku, int() ile çevir\n# TODO: 1 ekleyip yazdır\n` },
    ],
    stdin: ["17"],
    checks: [
      { type: "regex", value: "int\\(", label: "int() kullanılmış" },
      { type: "output", value: "18", label: "Çıktıda 18 var" },
    ],
  },
  {
    id: "python-177",
    level: 177,
    language: "python",
    title: "Aritmetik: // ve **",
    description: "Tam sayı bölme ve üs alma.",
    explanation:
      "`//` operatörü bölmenin tam sayı kısmını verir (taban bölme).\n`**` operatörü üs almak için kullanılır, örneğin `2 ** 3` sekiz eder.",
    example: `print(7 // 2)\nprint(2 ** 3)`,
    hints: [
      "// operatörüyle 17 // 4 işlemini yazdır.",
      "** operatörüyle 2 ** 5 işlemini yazdır.",
      `print(17 // 4)\nprint(2 ** 5)`,
    ],
    challenge: `17 // 4 (sonuç 4) ve 2 ** 5 (sonuç 32) işlemlerini ayrı satırlarda yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: 17 // 4 yazdır\n# TODO: 2 ** 5 yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "//", label: "// operatörü kullanılmış" },
      { type: "regex", value: "\\*\\*", label: "** operatörü kullanılmış" },
      { type: "output", value: "4", label: "Çıktıda 4 var" },
      { type: "output", value: "32", label: "Çıktıda 32 var" },
    ],
  },
  {
    id: "python-178",
    level: 178,
    language: "python",
    title: "Karşılaştırma ve mantıksal operatörler",
    description: "==, >, and, or ile koşul ifadeleri kur.",
    explanation:
      "Karşılaştırma operatörleri (`==`, `!=`, `>`, `<`) True/False sonucu verir.\n`and` ve `or` ile birden fazla koşulu birleştirebilirsin.",
    example: `age = 20\nprint(age > 18 and age < 65)`,
    hints: [
      "age adında bir değişkene bir sayı ata.",
      "and operatörüyle iki karşılaştırmayı birleştir.",
      `age = 20\nprint(age >= 18 and age <= 65)`,
    ],
    challenge: `age adlı değişkene 20 ata ve age >= 18 and age <= 65 ifadesinin sonucunu (True) yazdır.`,
    files: [
      { name: "main.py", content: `age = 20\n# TODO: and ile koşulu yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "\\band\\b", label: "and operatörü kullanılmış" },
      { type: "output", value: "True", label: "Çıktıda True var" },
    ],
  },
  {
    id: "python-179",
    level: 179,
    language: "python",
    title: "if / elif / else",
    description: "Koşullu dallanma yaz.",
    explanation:
      "`if` bir koşul doğruysa çalışır, `elif` ek koşullar için, `else` hiçbiri doğru değilse çalışır.\nPython'da bloklar girinti (4 boşluk) ile belirlenir.",
    example: `n = 5\nif n > 0:\n    print("pozitif")\nelse:\n    print("negatif")`,
    hints: [
      "n adında bir değişkene bir sayı ata.",
      "if/elif/else ile pozitif, negatif, sıfır durumlarını ayır.",
      `n = 0\nif n > 0:\n    print("pozitif")\nelif n < 0:\n    print("negatif")\nelse:\n    print("sıfır")`,
    ],
    challenge: `n değişkenine 0 ata. n pozitifse "pozitif", negatifse "negatif", sıfırsa "sıfır" yazdır (if/elif/else kullan).`,
    files: [
      { name: "main.py", content: `n = 0\n# TODO: if/elif/else yaz\n` },
    ],
    checks: [
      { type: "regex", value: "\\belif\\b", label: "elif kullanılmış" },
      { type: "output-exact", value: "sıfır", label: "Çıktı tam olarak 'sıfır'" },
    ],
  },
  {
    id: "python-180",
    level: 180,
    language: "python",
    title: "Tek satır koşul",
    description: "Şartlı ifade (ternary) yaz.",
    explanation:
      "Python'da `deger1 if kosul else deger2` biçiminde tek satırlık koşullu ifade yazılabilir.\nBu, kısa if/else durumları için kullanışlıdır.",
    example: `n = 5\nresult = "çift" if n % 2 == 0 else "tek"\nprint(result)`,
    hints: [
      "n adında bir sayı değişkeni oluştur.",
      "n % 2 == 0 koşulunu tek satır if/else ile kullan.",
      `n = 7\nresult = "çift" if n % 2 == 0 else "tek"\nprint(result)`,
    ],
    challenge: `n değişkenine 7 ata. Tek satır koşul kullanarak n çiftse "çift", tekse "tek" yazan result değişkenini oluştur ve yazdır.`,
    files: [
      { name: "main.py", content: `n = 7\n# TODO: tek satır if/else ile result oluştur ve yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "if.+else", label: "Tek satır if/else kullanılmış" },
      { type: "output", value: "tek", label: "Çıktıda 'tek' var" },
    ],
  },
  {
    id: "python-181",
    level: 181,
    language: "python",
    title: "Listeler ve indeksleme",
    description: "Liste oluştur, elemanına indeksle eriş.",
    explanation:
      "Liste, köşeli parantez `[]` ile tanımlanan sıralı bir veri koleksiyonudur.\nElemanlara `liste[0]` gibi indeks numarasıyla erişilir, indeks 0'dan başlar.",
    example: `fruits = ["elma", "armut", "muz"]\nprint(fruits[0])`,
    hints: [
      "fruits adında bir liste oluştur.",
      "Listenin ilk elemanına fruits[0] ile eriş.",
      `fruits = ["elma", "armut", "muz"]\nprint(fruits[1])`,
    ],
    challenge: `fruits listesine 3 meyve ekle. İkinci elemanı (indeks 1) yazdır.`,
    files: [
      { name: "main.py", content: `fruits = ["elma", "armut", "muz"]\n# TODO: fruits[1] yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "fruits\\[1\\]", label: "İndeksleme kullanılmış" },
      { type: "output", value: "armut", label: "Çıktıda 'armut' var" },
    ],
  },
  {
    id: "python-182",
    level: 182,
    language: "python",
    title: "Slicing",
    description: "Liste dilimleme ile alt liste al.",
    explanation:
      "Dilimleme (`liste[start:end]`) belirli bir aralıktaki elemanları alır, `end` dahil değildir.\nBaşlangıç veya bitiş boş bırakılırsa listenin başından/sonuna kadar alınır.",
    example: `nums = [1, 2, 3, 4, 5]\nprint(nums[1:4])`,
    hints: [
      "nums listesi tanımla.",
      "nums[1:4] ile bir dilim al.",
      `nums = [1, 2, 3, 4, 5]\nprint(nums[1:4])`,
    ],
    challenge: `nums = [1, 2, 3, 4, 5] listesini oluştur ve nums[1:4] dilimini yazdır ([2, 3, 4]).`,
    files: [
      { name: "main.py", content: `nums = [1, 2, 3, 4, 5]\n# TODO: nums[1:4] yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "\\[1:4\\]", label: "Dilimleme kullanılmış" },
      { type: "output", value: "[2, 3, 4]", label: "Çıktıda [2, 3, 4] var" },
    ],
  },
  {
    id: "python-183",
    level: 183,
    language: "python",
    title: "append / pop / insert / remove",
    description: "Liste elemanlarını ekle ve çıkar.",
    explanation:
      "`append()` listenin sonuna eleman ekler, `pop()` son elemanı çıkarır, `insert(i, x)` belirli konuma ekler, `remove(x)` değere göre siler.\nBu metotlar listeyi yerinde değiştirir.",
    example: `nums = [1, 2, 3]\nnums.append(4)\nprint(nums)`,
    hints: [
      "nums listesine append() ile bir eleman ekle.",
      "remove() ile bir elemanı sil.",
      `nums = [1, 2, 3]\nnums.append(4)\nnums.remove(2)\nprint(nums)`,
    ],
    challenge: `nums = [1, 2, 3] listesine append() ile 4 ekle, remove() ile 2'yi sil, sonucu yazdır ([1, 3, 4]).`,
    files: [
      { name: "main.py", content: `nums = [1, 2, 3]\n# TODO: append(4) ve remove(2) yap, yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "\\.append\\(", label: "append() kullanılmış" },
      { type: "regex", value: "\\.remove\\(", label: "remove() kullanılmış" },
      { type: "output", value: "[1, 3, 4]", label: "Çıktıda [1, 3, 4] var" },
    ],
  },
  {
    id: "python-184",
    level: 184,
    language: "python",
    title: "Tuple",
    description: "Değiştirilemeyen sıralı veri: tuple.",
    explanation:
      "Tuple, parantez `()` ile tanımlanan ve oluşturulduktan sonra değiştirilemeyen bir koleksiyondur.\nElemanlarına listelerde olduğu gibi indeksle erişilir.",
    example: `point = (3, 4)\nprint(point[0])`,
    hints: [
      "point adında bir tuple oluştur, iki sayı içersin.",
      "point[0] ve point[1] değerlerini yazdır.",
      `point = (3, 4)\nprint(point[0])\nprint(point[1])`,
    ],
    challenge: `point = (3, 4) tuple'ını oluştur ve iki elemanını ayrı satırlarda yazdır.`,
    files: [
      { name: "main.py", content: `point = (3, 4)\n# TODO: point[0] ve point[1] yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "point\\s*=\\s*\\(", label: "Tuple tanımlanmış" },
      { type: "output", value: "3", label: "Çıktıda 3 var" },
      { type: "output", value: "4", label: "Çıktıda 4 var" },
    ],
  },
  {
    id: "python-185",
    level: 185,
    language: "python",
    title: "Set",
    description: "Benzersiz elemanlar topluluğu: set.",
    explanation:
      "Set, tekrarlayan elemanları otomatik olarak eleyen, sırasız bir koleksiyondur.\nSüslü parantez `{}` ile tanımlanır ve `add()` ile eleman eklenir.",
    example: `colors = {"red", "blue"}\ncolors.add("green")\nprint(len(colors))`,
    hints: [
      "nums adında tekrar eden sayılar içeren bir liste ver, set() ile benzersiz yap.",
      "len() ile eleman sayısını yazdır.",
      `nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(len(unique))`,
    ],
    challenge: `nums = [1, 2, 2, 3, 3, 3] listesini set()'e çevir ve benzersiz eleman sayısını (3) yazdır.`,
    files: [
      { name: "main.py", content: `nums = [1, 2, 2, 3, 3, 3]\n# TODO: set() yap, len() ile yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "set\\(", label: "set() kullanılmış" },
      { type: "output-exact", value: "3", label: "Çıktı tam olarak 3" },
    ],
  },
  {
    id: "python-186",
    level: 186,
    language: "python",
    title: "Dictionary",
    description: "Anahtar-değer çiftleriyle veri tut.",
    explanation:
      "Dictionary (sözlük), `{anahtar: değer}` biçiminde veri tutan bir yapıdır.\nBir değere `sozluk[\"anahtar\"]` şeklinde erişilir.",
    example: `person = {"name": "Ada", "age": 15}\nprint(person["name"])`,
    hints: [
      "person adında bir sözlük oluştur, name ve age anahtarları olsun.",
      "person[\"name\"] ile bir değere eriş.",
      `person = {"name": "Ada", "age": 15}\nprint(person["age"])`,
    ],
    challenge: `person = {"name": "Ada", "age": 15} sözlüğünü oluştur ve person["age"] değerini yazdır.`,
    files: [
      { name: "main.py", content: `person = {"name": "Ada", "age": 15}\n# TODO: person["age"] yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "person\\[[\"']age[\"']\\]", label: "Sözlük değerine erişilmiş" },
      { type: "output", value: "15", label: "Çıktıda 15 var" },
    ],
  },
  {
    id: "python-187",
    level: 187,
    language: "python",
    title: "keys / values / items / get",
    description: "Sözlük üzerinde gezinme metotları.",
    explanation:
      "`.keys()` tüm anahtarları, `.values()` tüm değerleri, `.items()` çift olarak ikisini verir.\n`.get(anahtar, varsayilan)` anahtar yoksa hata vermek yerine varsayılan değer döner.",
    example: `person = {"name": "Ada"}\nprint(person.get("age", 0))`,
    hints: [
      "person sözlüğü tanımla.",
      ".get() ile olmayan bir anahtar için varsayılan değer ver.",
      `person = {"name": "Ada"}\nprint(person.get("age", 0))`,
    ],
    challenge: `person = {"name": "Ada"} sözlüğünü oluştur, person.get("age", 0) ile olmayan bir anahtarı 0 varsayılanıyla yazdır.`,
    files: [
      { name: "main.py", content: `person = {"name": "Ada"}\n# TODO: get() ile "age" oku, varsayılan 0\n` },
    ],
    checks: [
      { type: "regex", value: "\\.get\\(", label: "get() kullanılmış" },
      { type: "output-exact", value: "0", label: "Çıktı tam olarak 0" },
    ],
  },
  {
    id: "python-188",
    level: 188,
    language: "python",
    title: "İç içe veri yapıları",
    description: "Liste içinde sözlük, sözlük içinde liste.",
    explanation:
      "Veri yapıları iç içe kullanılabilir: bir listenin elemanı bir sözlük olabilir.\nİç içe erişim için köşeli parantezleri art arda kullanırsın.",
    example: `people = [{"name": "Ada"}, {"name": "Ali"}]\nprint(people[0]["name"])`,
    hints: [
      "people adında sözlük içeren bir liste oluştur.",
      "people[1][\"name\"] ile ikinci kişinin adına eriş.",
      `people = [{"name": "Ada"}, {"name": "Ali"}]\nprint(people[1]["name"])`,
    ],
    challenge: `people = [{"name": "Ada"}, {"name": "Ali"}] listesini oluştur ve ikinci kişinin adını yazdır.`,
    files: [
      { name: "main.py", content: `people = [{"name": "Ada"}, {"name": "Ali"}]\n# TODO: ikinci kişinin adını yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "people\\[1\\]\\[[\"']name[\"']\\]", label: "İç içe erişim kullanılmış" },
      { type: "output", value: "Ali", label: "Çıktıda 'Ali' var" },
    ],
  },
  {
    id: "python-189",
    level: 189,
    language: "python",
    title: "len / min / max / sum",
    description: "Yerleşik fonksiyonlarla liste analizi.",
    explanation:
      "`len()` eleman sayısını, `min()`/`max()` en küçük/büyük değeri, `sum()` toplamı verir.\nBu fonksiyonlar listeler üzerinde doğrudan çalışır.",
    example: `nums = [3, 1, 4, 1, 5]\nprint(sum(nums))`,
    hints: [
      "nums listesini tanımla.",
      "max() ve sum() fonksiyonlarını kullan.",
      `nums = [3, 1, 4, 1, 5]\nprint(max(nums))\nprint(sum(nums))`,
    ],
    challenge: `nums = [3, 1, 4, 1, 5] listesinin max() değerini ve sum() toplamını ayrı satırlarda yazdır.`,
    files: [
      { name: "main.py", content: `nums = [3, 1, 4, 1, 5]\n# TODO: max(nums) ve sum(nums) yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "max\\(", label: "max() kullanılmış" },
      { type: "regex", value: "sum\\(", label: "sum() kullanılmış" },
      { type: "output", value: "5", label: "Çıktıda 5 var" },
      { type: "output", value: "14", label: "Çıktıda 14 var" },
    ],
  },
  {
    id: "python-190",
    level: 190,
    language: "python",
    title: "in / not in",
    description: "Bir öğenin bir koleksiyonda olup olmadığını kontrol et.",
    explanation:
      "`in` operatörü bir değerin bir liste, string veya sözlükte olup olmadığını kontrol eder ve True/False döner.\n`not in` ise tam tersini sorar.",
    example: `fruits = ["elma", "armut"]\nprint("elma" in fruits)`,
    hints: [
      "fruits listesini tanımla.",
      "in operatörüyle bir elemanın listede olup olmadığını kontrol et.",
      `fruits = ["elma", "armut"]\nprint("muz" not in fruits)`,
    ],
    challenge: `fruits = ["elma", "armut"] listesini oluştur ve "muz" not in fruits ifadesinin sonucunu (True) yazdır.`,
    files: [
      { name: "main.py", content: `fruits = ["elma", "armut"]\n# TODO: "muz" not in fruits yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "\\bnot in\\b", label: "not in kullanılmış" },
      { type: "output", value: "True", label: "Çıktıda True var" },
    ],
  },
  {
    id: "python-191",
    level: 191,
    language: "python",
    title: "for döngüsü",
    description: "Bir liste üzerinde döngü kur.",
    explanation:
      "`for` döngüsü bir koleksiyonun (liste, string vb.) her elemanı üzerinde sırayla çalışır.\nSyntax: `for eleman in koleksiyon:` şeklindedir.",
    example: `for fruit in ["elma", "armut"]:\n    print(fruit)`,
    hints: [
      "nums adında bir sayı listesi tanımla.",
      "for döngüsüyle her sayıyı yazdır.",
      `nums = [1, 2, 3]\nfor n in nums:\n    print(n)`,
    ],
    challenge: `nums = [1, 2, 3] listesini for döngüsüyle gez ve her sayıyı ayrı satırda yazdır.`,
    files: [
      { name: "main.py", content: `nums = [1, 2, 3]\n# TODO: for döngüsüyle her sayıyı yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "\\bfor\\b", label: "for döngüsü kullanılmış" },
      { type: "output-exact", value: "1\n2\n3", label: "Çıktı satır satır 1, 2, 3" },
    ],
  },
  {
    id: "python-192",
    level: 192,
    language: "python",
    title: "range()",
    description: "Belirli sayı aralığında döngü kur.",
    explanation:
      "`range(n)` 0'dan n-1'e kadar sayı üretir, `range(a, b)` a'dan b-1'e kadar üretir.\nfor döngüsüyle birlikte sıkça kullanılır.",
    example: `for i in range(3):\n    print(i)`,
    hints: [
      "range(1, 6) ile 1'den 5'e kadar sayı üret.",
      "for döngüsüyle her sayıyı yazdır.",
      `for i in range(1, 6):\n    print(i)`,
    ],
    challenge: `range(1, 6) kullanarak 1'den 5'e kadar sayıları ayrı satırlarda yazdır.`,
    files: [
      { name: "main.py", content: `# TODO: range(1, 6) ile döngü kur, her sayıyı yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "range\\(", label: "range() kullanılmış" },
      { type: "output-exact", value: "1\n2\n3\n4\n5", label: "Çıktı 1'den 5'e kadar" },
    ],
  },
  {
    id: "python-193",
    level: 193,
    language: "python",
    title: "while döngüsü",
    description: "Koşul sağlandığı sürece tekrar et.",
    explanation:
      "`while` döngüsü, koşul True olduğu sürece bloğu tekrar tekrar çalıştırır.\nDöngünün sonsuza gitmemesi için içeride koşulu değiştiren bir işlem olmalıdır.",
    example: `n = 0\nwhile n < 3:\n    print(n)\n    n += 1`,
    hints: [
      "n adında bir sayaç değişkeni oluştur, 0'dan başlasın.",
      "while n < 5 koşuluyla döngü kur.",
      `n = 0\nwhile n < 5:\n    print(n)\n    n += 1`,
    ],
    challenge: `n = 0'dan başlayarak while ile n < 5 olduğu sürece n'i yazdır ve her seferinde 1 artır.`,
    files: [
      { name: "main.py", content: `n = 0\n# TODO: while n < 5 döngüsü, n yazdır, n'i artır\n` },
    ],
    checks: [
      { type: "regex", value: "\\bwhile\\b", label: "while döngüsü kullanılmış" },
      { type: "output-exact", value: "0\n1\n2\n3\n4", label: "Çıktı 0'dan 4'e kadar" },
    ],
  },
  {
    id: "python-194",
    level: 194,
    language: "python",
    title: "break / continue",
    description: "Döngü akışını kontrol et.",
    explanation:
      "`break` döngüyü tamamen durdurur, `continue` ise mevcut adımı atlayıp bir sonraki döngü adımına geçer.\nGenellikle bir koşulla birlikte kullanılırlar.",
    example: `for i in range(5):\n    if i == 3:\n        break\n    print(i)`,
    hints: [
      "range(10) ile döngü kur.",
      "Sayı çift ise continue ile atla, 6 olduğunda break ile döngüyü durdur.",
      `for i in range(10):\n    if i == 6:\n        break\n    if i % 2 == 0:\n        continue\n    print(i)`,
    ],
    challenge: `range(10) ile döngü kur: sayı çiftse continue ile atla, sayı 6 olduğunda break ile döngüyü bitir. Sadece tek sayıları (1, 3, 5) yazdırmalısın.`,
    files: [
      { name: "main.py", content: `# TODO: range(10) döngüsü, continue ve break kullan\n` },
    ],
    checks: [
      { type: "regex", value: "\\bbreak\\b", label: "break kullanılmış" },
      { type: "regex", value: "\\bcontinue\\b", label: "continue kullanılmış" },
      { type: "output-exact", value: "1\n3\n5", label: "Çıktı sadece 1, 3, 5" },
    ],
  },
  {
    id: "python-195",
    level: 195,
    language: "python",
    title: "enumerate()",
    description: "Döngüde hem indeks hem değeri al.",
    explanation:
      "`enumerate()` bir koleksiyonu gezerken hem elemanın indeksini hem kendisini aynı anda verir.\nSyntax: `for i, deger in enumerate(koleksiyon):` şeklindedir.",
    example: `for i, fruit in enumerate(["elma", "armut"]):\n    print(i, fruit)`,
    hints: [
      "fruits adında bir liste tanımla.",
      "enumerate() ile hem indeksi hem elemanı al.",
      `fruits = ["elma", "armut", "muz"]\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)`,
    ],
    challenge: `fruits = ["elma", "armut", "muz"] listesini enumerate() ile gez ve her satırda "indeks eleman" formatında yazdır (örn. "0 elma").`,
    files: [
      { name: "main.py", content: `fruits = ["elma", "armut", "muz"]\n# TODO: enumerate() ile gez, "indeks eleman" yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "enumerate\\(", label: "enumerate() kullanılmış" },
      { type: "output-exact", value: "0 elma\n1 armut\n2 muz", label: "Çıktı indeks ve elemanlarla eşleşiyor" },
    ],
  },
];
