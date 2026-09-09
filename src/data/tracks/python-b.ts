import type { Lesson } from "../types";

export const PYTHON_B: Lesson[] = [
  {
    id: "python-196",
    level: 196,
    language: "python",
    title: "zip() ile eşleştir",
    description: "zip() ile iki listeyi paralel dolaş.",
    explanation:
      "`zip()` fonksiyonu birden fazla listeyi yan yana eşleştirip demetler (tuple) üretir.\nÖrneğin isim listesi ile yaş listesini `zip(isimler, yaslar)` ile birlikte dolaşabilirsin.",
    example: `names = ["Ali", "Ayse"]\nages = [17, 16]\nfor n, a in zip(names, ages):\n    print(n, a)`,
    hints: [
      "for döngüsünde zip(a, b) kullan.",
      "Döngü değişkenlerini n ve p gibi iki isimle al.",
      'for n, p in zip(names, points):\\n    print(n, p)',
    ],
    challenge:
      "names = ['Ali', 'Ayse', 'Deniz'] ve points = [80, 90, 70] listelerini zip() ile eşleştirip her satırda 'isim puan' şeklinde yazdır.",
    files: [
      {
        name: "main.py",
        content: `names = ["Ali", "Ayse", "Deniz"]\npoints = [80, 90, 70]\n# TODO: zip ile eslestir ve yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "zip\\(", label: "zip() kullanıldı" },
      { type: "output", value: "Ali 80", label: "Çıktıda 'Ali 80' var" },
      { type: "output", value: "Deniz 70", label: "Çıktıda 'Deniz 70' var" },
    ],
  },
  {
    id: "python-197",
    level: 197,
    language: "python",
    title: "List comprehension",
    description: "Tek satırda liste üret.",
    explanation:
      "List comprehension, bir listeyi tek satırda oluşturmanın kısa yoludur.\n`[ifade for x in liste]` şeklinde yazılır ve normal for döngüsüne eşdeğerdir.",
    example: `numbers = [1, 2, 3]\nsquares = [n * n for n in numbers]\nprint(squares)`,
    hints: [
      "Köşeli parantez içinde ifade ve for yaz.",
      "n * 2 ifadesini kullan.",
      "doubled = [n * 2 for n in numbers]",
    ],
    challenge:
      "numbers = [1, 2, 3, 4, 5] listesindeki her sayının 2 katını içeren doubled listesini comprehension ile oluşturup print(doubled) yap.",
    files: [
      {
        name: "main.py",
        content: `numbers = [1, 2, 3, 4, 5]\n# TODO: doubled listesini comprehension ile olustur\n`,
      },
    ],
    checks: [
      { type: "regex", value: "\\[.*for\\s+\\w+\\s+in", label: "List comprehension kullanıldı" },
      { type: "output-exact", value: "[2, 4, 6, 8, 10]", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-198",
    level: 198,
    language: "python",
    title: "Koşullu list comprehension",
    description: "if ile filtrelenmiş liste üret.",
    explanation:
      "List comprehension içine `if` koşulu ekleyerek sadece istediğin elemanları seçebilirsin.\n`[ifade for x in liste if koşul]` şeklinde yazılır.",
    example: `numbers = [1, 2, 3, 4]\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)`,
    hints: [
      "Comprehension'ın sonuna if koşulu ekle.",
      "n % 2 == 0 ile çift sayıları seç.",
      "evens = [n for n in numbers if n % 2 == 0]",
    ],
    challenge:
      "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] listesinden sadece çift sayıları içeren evens listesini oluşturup print(evens) yap.",
    files: [
      {
        name: "main.py",
        content: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# TODO: evens listesini olustur\n`,
      },
    ],
    checks: [
      { type: "regex", value: "if\\s+\\w+\\s*%\\s*2\\s*==\\s*0", label: "Koşullu filtre var" },
      { type: "output-exact", value: "[2, 4, 6, 8, 10]", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-199",
    level: 199,
    language: "python",
    title: "Dict comprehension",
    description: "Tek satırda sözlük üret.",
    explanation:
      "Dict comprehension, sözlükleri tek satırda oluşturur.\n`{anahtar: deger for x in liste}` şeklinde yazılır.",
    example: `numbers = [1, 2, 3]\nsquares = {n: n * n for n in numbers}\nprint(squares)`,
    hints: [
      "Süslü parantez kullan: {key: value for ...}.",
      "Anahtar n, değer n * n olsun.",
      "squares = {n: n * n for n in numbers}",
    ],
    challenge:
      "numbers = [1, 2, 3, 4] listesinden her sayıyı karesine eşleyen squares sözlüğünü dict comprehension ile oluşturup print(squares) yap.",
    files: [
      {
        name: "main.py",
        content: `numbers = [1, 2, 3, 4]\n# TODO: squares sozlugunu olustur\n`,
      },
    ],
    checks: [
      { type: "regex", value: "\\{.*:.*for\\s+\\w+\\s+in", label: "Dict comprehension kullanıldı" },
      { type: "output-exact", value: "{1: 1, 2: 4, 3: 9, 4: 16}", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-200",
    level: 200,
    language: "python",
    title: "sorted() ve key",
    description: "Listeyi özel bir kritere göre sırala.",
    explanation:
      "`sorted()` fonksiyonu bir listeyi sıralı döner. `key` parametresi ile sıralama kriterini özelleştirebilirsin.\nÖrneğin `key=len` ile string uzunluğuna göre sıralayabilirsin.",
    example: `words = ["muz", "elma", "kivi"]\nresult = sorted(words, key=len)\nprint(result)`,
    hints: [
      "sorted(liste, key=...) kullan.",
      "lambda ile sözlükteki bir anahtara göre sırala.",
      "sorted(students, key=lambda s: s['score'])",
    ],
    challenge:
      "students = [{'name': 'Ali', 'score': 70}, {'name': 'Ayse', 'score': 90}, {'name': 'Deniz', 'score': 60}] listesini score'a göre küçükten büyüğe sıralayıp her ismi ayrı satırda print et.",
    files: [
      {
        name: "main.py",
        content: `students = [\n    {"name": "Ali", "score": 70},\n    {"name": "Ayse", "score": 90},\n    {"name": "Deniz", "score": 60},\n]\n# TODO: score'a gore sirala ve isimleri yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "sorted\\(.*key\\s*=", label: "sorted() key ile kullanıldı" },
      { type: "output-exact", value: "Deniz\nAli\nAyse", label: "Sıralama doğru" },
    ],
  },
  {
    id: "python-201",
    level: 201,
    language: "python",
    title: "def / return",
    description: "Kendi fonksiyonunu yaz.",
    explanation:
      "`def` ile fonksiyon tanımlanır, `return` ile bir değer geri döndürülür.\nFonksiyonlar tekrar eden kodu tek bir yerde toplamanı sağlar.",
    example: `def square(n):\n    return n * n\n\nprint(square(4))`,
    hints: [
      "def fonksiyon_adi(parametre): şeklinde başla.",
      "İçinde return ile toplamı döndür.",
      "def add(a, b):\\n    return a + b",
    ],
    challenge:
      "a ve b parametreleri alan add(a, b) fonksiyonunu yaz, toplamı return et ve print(add(3, 5)) ile çağır.",
    files: [
      {
        name: "main.py",
        content: `# TODO: add fonksiyonunu tanimla\n\nprint(add(3, 5))\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def\\s+add\\s*\\(", label: "add fonksiyonu tanımlı" },
      { type: "output-exact", value: "8", label: "Çıktı 8" },
    ],
  },
  {
    id: "python-202",
    level: 202,
    language: "python",
    title: "Varsayılan argümanlar",
    description: "Parametrelere varsayılan değer ver.",
    explanation:
      "Fonksiyon parametrelerine varsayılan değer atanabilir; çağrıda o parametre verilmezse varsayılan kullanılır.\n`def greet(name, greeting=\"Merhaba\")` gibi tanımlanır.",
    example: `def greet(name, greeting="Merhaba"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Ali"))`,
    hints: [
      "İkinci parametreye = ile varsayılan değer ver.",
      "greeting parametresinin varsayılanı 'Merhaba' olsun.",
      'def greet(name, greeting="Merhaba"):\\n    return f"{greeting}, {name}!"',
    ],
    challenge:
      "name ve varsayılan değeri 'Merhaba' olan greeting parametreleri alan greet fonksiyonunu yaz. print(greet('Ali')) ve print(greet('Ayse', 'Selam')) çağır.",
    files: [
      {
        name: "main.py",
        content: `# TODO: greet fonksiyonunu tanimla (greeting varsayilan 'Merhaba')\n\nprint(greet("Ali"))\nprint(greet("Ayse", "Selam"))\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def\\s+greet\\s*\\(\\s*name\\s*,\\s*greeting\\s*=", label: "Varsayılan değer tanımlı" },
      { type: "output-exact", value: "Merhaba, Ali!\nSelam, Ayse!", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-203",
    level: 203,
    language: "python",
    title: "Pozisyonel/keyword argümanlar",
    description: "Fonksiyonu keyword argümanlarla çağır.",
    explanation:
      "Fonksiyonlar pozisyona göre veya `isim=deger` şeklinde keyword argümanlarla çağırılabilir.\nKeyword argümanlar sırayı önemsiz hale getirir ve kodu daha okunaklı yapar.",
    example: `def info(name, age):\n    return f"{name} - {age}"\n\nprint(info(age=17, name="Ali"))`,
    hints: [
      "Fonksiyonu name= ve age= şeklinde çağır.",
      "Sıra önemli değil, isimleri doğru yaz.",
      'print(describe(age=15, city="Ankara", name="Deniz"))',
    ],
    challenge:
      "name, age, city parametreleri alan describe(name, age, city) fonksiyonunu yaz (f\"{name}, {age}, {city}\" döndürsün) ve keyword argümanlarla, sırayı karıştırarak çağır: describe(age=15, city='Ankara', name='Deniz').",
    files: [
      {
        name: "main.py",
        content: `# TODO: describe fonksiyonunu tanimla\n\nprint(describe(age=15, city="Ankara", name="Deniz"))\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def\\s+describe\\s*\\(", label: "describe fonksiyonu tanımlı" },
      { type: "output-exact", value: "Deniz, 15, Ankara", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-204",
    level: 204,
    language: "python",
    title: "*args",
    description: "Değişken sayıda argüman al.",
    explanation:
      "`*args` bir fonksiyona istediğin kadar pozisyonel argüman geçmeni sağlar; fonksiyon içinde bir tuple olarak gelir.\nÖrneğin `def total(*args)` içinde `args` tuple'ının elemanlarını toplayabilirsin.",
    example: `def total(*args):\n    return sum(args)\n\nprint(total(1, 2, 3))`,
    hints: [
      "Parametre olarak *numbers kullan.",
      "sum() fonksiyonu ile args'ı topla.",
      "def total(*numbers):\\n    return sum(numbers)",
    ],
    challenge:
      "*numbers şeklinde değişken sayıda argüman alan total fonksiyonunu yaz, toplamlarını return et ve print(total(1, 2, 3, 4)) çağır.",
    files: [
      {
        name: "main.py",
        content: `# TODO: *numbers alan total fonksiyonunu tanimla\n\nprint(total(1, 2, 3, 4))\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def\\s+total\\s*\\(\\s*\\*\\w+\\s*\\)", label: "*args kullanıldı" },
      { type: "output-exact", value: "10", label: "Çıktı 10" },
    ],
  },
  {
    id: "python-205",
    level: 205,
    language: "python",
    title: "**kwargs",
    description: "Değişken sayıda keyword argüman al.",
    explanation:
      "`**kwargs` bir fonksiyona istediğin kadar keyword argüman geçmeni sağlar; fonksiyon içinde bir sözlük olarak gelir.\nSözlük gibi `.items()` ile gezilebilir.",
    example: `def info(**kwargs):\n    for key, value in kwargs.items():\n        print(key, value)\n\ninfo(name="Ali", age=17)`,
    hints: [
      "Parametre olarak **kwargs kullan.",
      "for key, value in kwargs.items(): ile gez.",
      'def show(**kwargs):\\n    for k, v in kwargs.items():\\n        print(f"{k}: {v}")',
    ],
    challenge:
      "**kwargs alan show fonksiyonunu yaz; her anahtar-değer çiftini 'anahtar: deger' şeklinde yazdırsın. show(name='Ali', age=17) ile çağır.",
    files: [
      {
        name: "main.py",
        content: `# TODO: **kwargs alan show fonksiyonunu tanimla\n\nshow(name="Ali", age=17)\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def\\s+show\\s*\\(\\s*\\*\\*\\w+\\s*\\)", label: "**kwargs kullanıldı" },
      { type: "output-exact", value: "name: Ali\nage: 17", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-206",
    level: 206,
    language: "python",
    title: "lambda",
    description: "Anonim fonksiyon yaz.",
    explanation:
      "`lambda` tek satırlık, isimsiz küçük fonksiyonlar oluşturmanı sağlar.\n`lambda parametreler: ifade` şeklinde yazılır ve bir değişkene atanabilir veya doğrudan kullanılabilir.",
    example: `square = lambda n: n * n\nprint(square(5))`,
    hints: [
      "lambda x, y: ... şeklinde yaz.",
      "İki sayıyı çarpan bir lambda tanımla.",
      "multiply = lambda a, b: a * b",
    ],
    challenge:
      "İki sayıyı çarpan multiply adında bir lambda tanımla ve print(multiply(4, 5)) çağır.",
    files: [
      {
        name: "main.py",
        content: `# TODO: multiply lambda'sini tanimla\n\nprint(multiply(4, 5))\n`,
      },
    ],
    checks: [
      { type: "regex", value: "lambda\\s+\\w+\\s*,\\s*\\w+\\s*:", label: "lambda kullanıldı" },
      { type: "output-exact", value: "20", label: "Çıktı 20" },
    ],
  },
  {
    id: "python-207",
    level: 207,
    language: "python",
    title: "map/filter",
    description: "map ve filter ile listeyi dönüştür.",
    explanation:
      "`map(fonksiyon, liste)` her elemana fonksiyonu uygular, `filter(fonksiyon, liste)` sadece koşulu sağlayanları bırakır.\nİkisi de sonucu `list()` ile listeye çevirmek gerekir.",
    example: `numbers = [1, 2, 3, 4]\ndoubled = list(map(lambda n: n * 2, numbers))\nprint(doubled)`,
    hints: [
      "map ile her sayıyı 2 ile çarp, list() ile listeye çevir.",
      "filter ile çift sayıları seç, list() ile listeye çevir.",
      "evens = list(filter(lambda n: n % 2 == 0, numbers))",
    ],
    challenge:
      "numbers = [1, 2, 3, 4, 5, 6] listesinden map ile doubled (her sayının 2 katı) ve filter ile evens (çift sayılar) listelerini oluştur, ikisini de print et.",
    files: [
      {
        name: "main.py",
        content: `numbers = [1, 2, 3, 4, 5, 6]\n# TODO: doubled ve evens listelerini olustur\n`,
      },
    ],
    checks: [
      { type: "regex", value: "map\\(", label: "map() kullanıldı" },
      { type: "regex", value: "filter\\(", label: "filter() kullanıldı" },
      { type: "output-exact", value: "[2, 4, 6, 8, 10, 12]\n[2, 4, 6]", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-208",
    level: 208,
    language: "python",
    title: "Scope kuralları",
    description: "global ve local değişkenler.",
    explanation:
      "Fonksiyon içinde tanımlanan değişkenler yereldir (local), fonksiyon dışına çıkamaz.\nFonksiyon içinden global bir değişkeni değiştirmek için `global` anahtar kelimesi kullanılır.",
    example: `count = 0\n\ndef increase():\n    global count\n    count += 1\n\nincrease()\nprint(count)`,
    hints: [
      "Fonksiyon içinde global count yaz.",
      "count += 1 ile artır.",
      "def increase():\\n    global count\\n    count += 1",
    ],
    challenge:
      "count = 0 global değişkenini tanımla. increase() fonksiyonu global count'u 1 artırsın. increase()'i 3 kez çağırıp print(count) yap (sonuç 3 olmalı).",
    files: [
      {
        name: "main.py",
        content: `count = 0\n\n# TODO: increase fonksiyonunu tanimla (global count kullan)\n\nincrease()\nincrease()\nincrease()\nprint(count)\n`,
      },
    ],
    checks: [
      { type: "regex", value: "global\\s+count", label: "global count kullanıldı" },
      { type: "output-exact", value: "3", label: "Çıktı 3" },
    ],
  },
  {
    id: "python-209",
    level: 209,
    language: "python",
    title: "Modül import",
    description: "math ve random modüllerini kullan.",
    explanation:
      "`import math` matematiksel fonksiyonlara (sqrt, pi gibi) erişim sağlar.\n`import random` rastgele sayı üretmeye yarar; `random.seed(n)` ile aynı 'rastgele' sonucu tekrar üretebilirsin (test edilebilir hale gelir).",
    example: `import math\nimport random\n\nrandom.seed(1)\nprint(math.sqrt(16))\nprint(random.randint(1, 10))`,
    hints: [
      "import math ve import random ekle.",
      "random.seed(42) çağır, sonra random.randint(1, 100) kullan.",
      "math.sqrt(64) ile karekök al.",
    ],
    challenge:
      "math ve random modüllerini import et. print(math.sqrt(64)) yaz. random.seed(42) çağır ve print(random.randint(1, 100)) yaz.",
    files: [
      {
        name: "main.py",
        content: `# TODO: math ve random import et\n\n# TODO: math.sqrt(64) yazdir\n\n# TODO: random.seed(42) ve random.randint(1, 100) yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "import\\s+math", label: "math import edildi" },
      { type: "regex", value: "import\\s+random", label: "random import edildi" },
      { type: "output", value: "8.0", label: "Çıktıda 8.0 var" },
    ],
  },
  {
    id: "python-210",
    level: 210,
    language: "python",
    title: "try/except/finally",
    description: "Hataları yakala ve yönet.",
    explanation:
      "`try` bloğunda hata riski taşıyan kod çalıştırılır, hata olursa `except` bloğu devreye girer.\n`finally` bloğu hata olsa da olmasa da her zaman çalışır.",
    example: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Sifira bolme hatasi!")\nfinally:\n    print("Islem tamamlandi")`,
    hints: [
      "try içine bölme işlemini koy.",
      "except ZeroDivisionError: bloğu ekle.",
      "finally bloğuna 'Islem tamamlandi' yazdır.",
    ],
    challenge:
      "10 / 0 işlemini try içinde yap, ZeroDivisionError'ı yakala ve 'Sifira bolme hatasi!' yazdır, finally bloğunda 'Islem tamamlandi' yazdır.",
    files: [
      {
        name: "main.py",
        content: `# TODO: try/except/finally yap\n`,
      },
    ],
    checks: [
      { type: "regex", value: "except\\s+ZeroDivisionError", label: "ZeroDivisionError yakalandı" },
      { type: "regex", value: "finally\\s*:", label: "finally bloğu var" },
      { type: "output-exact", value: "Sifira bolme hatasi!\nIslem tamamlandi", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-211",
    level: 211,
    language: "python",
    title: "class ve nesne",
    description: "İlk sınıfını tanımla.",
    explanation:
      "`class` anahtar kelimesi ile yeni bir sınıf tanımlanır. Sınıftan `Sinif()` şeklinde nesne (instance) oluşturulur.\nSınıflar, veri ve davranışları bir arada tutmanı sağlar.",
    example: `class Dog:\n    pass\n\nmy_dog = Dog()\nprint(type(my_dog))`,
    hints: [
      "class Student: ile başla, içine pass yaz.",
      "Student() ile bir nesne oluştur.",
      "student = Student()\\nprint('Nesne olusturuldu')",
    ],
    challenge:
      "Student adında boş bir class tanımla (pass kullan). Bir nesne oluştur (student = Student()) ve print('Nesne olusturuldu') yaz.",
    files: [
      {
        name: "main.py",
        content: `# TODO: Student class'ini tanimla\n\n# TODO: nesne olustur ve yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "class\\s+Student", label: "class tanımlı" },
      { type: "output-exact", value: "Nesne olusturuldu", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-212",
    level: 212,
    language: "python",
    title: "__init__ ve self",
    description: "Nesneye başlangıç değerleri ver.",
    explanation:
      "`__init__` metodu bir nesne oluşturulduğunda otomatik çalışır ve başlangıç değerlerini ayarlar.\n`self` parametresi, o an oluşturulan nesnenin kendisini temsil eder.",
    example: `class Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog("Karabas")\nprint(my_dog.name)`,
    hints: [
      "__init__(self, name, age) tanımla.",
      "self.name = name ve self.age = age yaz.",
      'def __init__(self, name, age):\\n    self.name = name\\n    self.age = age',
    ],
    challenge:
      "Student class'ına name ve age alan __init__ metodu ekle (self.name, self.age ata). student = Student('Ali', 17) oluştur, print(student.name, student.age) yaz.",
    files: [
      {
        name: "main.py",
        content: `class Student:\n    # TODO: __init__ metodunu ekle\n    pass\n\nstudent = Student("Ali", 17)\nprint(student.name, student.age)\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def __init__\\(self", label: "__init__ tanımlı" },
      { type: "output-exact", value: "Ali 17", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-213",
    level: 213,
    language: "python",
    title: "Metot ve attribute",
    description: "Sınıfa davranış ekle.",
    explanation:
      "Sınıf içindeki fonksiyonlara metot denir ve ilk parametreleri her zaman `self` olur.\nMetotlar, nesnenin attribute'larını (self.x gibi) kullanarak işlem yapabilir.",
    example: `class Circle:\n    def __init__(self, radius):\n        self.radius = radius\n\n    def area(self):\n        return 3.14 * self.radius ** 2\n\nc = Circle(2)\nprint(c.area())`,
    hints: [
      "greet adında bir metot tanımla, self kullan.",
      "Metot içinde self.name'i kullanarak bir string döndür.",
      'def greet(self):\\n    return f"Merhaba, ben {self.name}"',
    ],
    challenge:
      "Student class'ına name alan __init__ ve greet(self) metodu ekle. greet, 'Merhaba, ben {name}' döndürsün. student = Student('Ayse'); print(student.greet()) yaz.",
    files: [
      {
        name: "main.py",
        content: `class Student:\n    def __init__(self, name):\n        self.name = name\n\n    # TODO: greet metodunu ekle\n\nstudent = Student("Ayse")\nprint(student.greet())\n`,
      },
    ],
    checks: [
      { type: "regex", value: "def\\s+greet\\s*\\(\\s*self\\s*\\)", label: "greet metodu tanımlı" },
      { type: "output-exact", value: "Merhaba, ben Ayse", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-214",
    level: 214,
    language: "python",
    title: "Inheritance",
    description: "Bir sınıftan miras al.",
    explanation:
      "Bir sınıf, başka bir sınıftan özellik ve metotlarını miras alabilir: `class Child(Parent):`.\nBu sayede ortak davranışları tekrar yazmadan kullanabilirsin.",
    example: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    pass\n\nd = Dog("Karabas")\nprint(d.name)`,
    hints: [
      "class Student(Person): şeklinde miras al.",
      "Person'daki __init__ zaten name'i ayarlar; Student ekstra bir şey eklemesin.",
      "student = Student('Ali')\\nprint(student.name)",
    ],
    challenge:
      "Person class'ı name alan __init__ ile tanımlı gelsin. Person'dan miras alan Student class'ını tanımla (ekstra kod eklemeden). student = Student('Ali') oluştur, print(student.name) yaz.",
    files: [
      {
        name: "main.py",
        content: `class Person:\n    def __init__(self, name):\n        self.name = name\n\n# TODO: Person'dan miras alan Student class'ini tanimla\n\nstudent = Student("Ali")\nprint(student.name)\n`,
      },
    ],
    checks: [
      { type: "regex", value: "class\\s+Student\\s*\\(\\s*Person\\s*\\)", label: "Student, Person'dan miras aldı" },
      { type: "output-exact", value: "Ali", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-215",
    level: 215,
    language: "python",
    title: "Method overriding ve super()",
    description: "Miras alınan metodu yeniden tanımla.",
    explanation:
      "Alt sınıf, üst sınıftaki bir metodu yeniden tanımlayabilir (override).\n`super()` ile üst sınıfın metoduna erişip onu genişletebilirsin.",
    example: `class Animal:\n    def speak(self):\n        return "Ses cikariyor"\n\nclass Dog(Animal):\n    def speak(self):\n        return super().speak() + " - Hav hav"\n\nprint(Dog().speak())`,
    hints: [
      "Student class'ında __init__'i override et.",
      "super().__init__(name) ile Person'ın __init__'ini çağır.",
      "def __init__(self, name, school):\\n    super().__init__(name)\\n    self.school = school",
    ],
    challenge:
      "Person class'ı name alan __init__ ile tanımlı gelsin. Person'dan miras alan Student class'ı yaz; __init__(self, name, school) tanımla, super().__init__(name) çağır ve self.school = school ata. student = Student('Ali', 'Lise'); print(student.name, student.school) yaz.",
    files: [
      {
        name: "main.py",
        content: `class Person:\n    def __init__(self, name):\n        self.name = name\n\n# TODO: Student class'ini tanimla (super() kullan)\n\nstudent = Student("Ali", "Lise")\nprint(student.name, student.school)\n`,
      },
    ],
    checks: [
      { type: "regex", value: "super\\(\\)", label: "super() kullanıldı" },
      { type: "output-exact", value: "Ali Lise", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-216",
    level: 216,
    language: "python",
    title: "String metodları",
    description: "upper, split, join, replace, strip.",
    explanation:
      "String'lerin birçok hazır metodu vardır: `.upper()` büyük harfe çevirir, `.split()` parçalara ayırır, `.join()` birleştirir, `.replace()` değiştirir, `.strip()` boşlukları temizler.\nBu metotlar orijinal string'i değiştirmez, yeni bir string döndürür.",
    example: `text = "  Merhaba Dunya  "\nprint(text.strip().upper())\nprint(text.strip().split(" "))`,
    hints: [
      "strip() ile baştaki/sondaki boşlukları temizle.",
      "split(',') ile virgülle ayır, join ile '-' koyarak birleştir.",
      "'-'.join(word.strip().upper() for word in text.split(','))",
    ],
    challenge:
      "text = '  elma, armut, kivi  ' değişkenini strip() ile temizle, ',' ile split et, her parçayı strip+upper yap ve '-' ile join ederek print et. Sonuç: 'ELMA-ARMUT-KIVI'.",
    files: [
      {
        name: "main.py",
        content: `text = "  elma, armut, kivi  "\n# TODO: temizle, ayir, buyuk harfe cevir, '-' ile birlestir ve yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "\\.split\\(", label: "split() kullanıldı" },
      { type: "regex", value: "\\.join\\(", label: "join() kullanıldı" },
      { type: "output-exact", value: "ELMA-ARMUT-KIVI", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-217",
    level: 217,
    language: "python",
    title: "Dosya yazma ve okuma",
    description: "with open() ile dosyaya yaz ve oku.",
    explanation:
      "`with open(dosya, \"w\") as f:` bir dosyayı yazma modunda açar, `f.write(...)` ile içine yazar.\n`with open(dosya, \"r\") as f:` ise okuma modunda açar; `with` bloğu bitince dosya otomatik kapanır.",
    example: `with open("notes.txt", "w") as f:\n    f.write("Merhaba")\n\nwith open("notes.txt", "r") as f:\n    print(f.read())`,
    hints: [
      "Önce 'w' modunda dosyayı aç ve yaz.",
      "Sonra 'r' modunda tekrar aç ve read() ile oku.",
      'with open("notes.txt", "w") as f:\\n    f.write("Merhaba Dunya")',
    ],
    challenge:
      "'notes.txt' dosyasına 'Merhaba Dunya' yaz (with open ile 'w' modu), sonra aynı dosyayı 'r' modunda açıp içeriğini okuyup print et.",
    files: [
      {
        name: "main.py",
        content: `# TODO: notes.txt dosyasina yaz, sonra oku ve yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "with open\\(", label: "with open() kullanıldı" },
      { type: "regex", value: "\\.write\\(", label: "write() kullanıldı" },
      { type: "output-exact", value: "Merhaba Dunya", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-218",
    level: 218,
    language: "python",
    title: "JSON",
    description: "json.dumps ve json.loads kullan.",
    explanation:
      "`json` modülü Python nesneleriyle JSON metni arasında dönüşüm yapar.\n`json.dumps(obj)` bir Python nesnesini JSON string'e çevirir, `json.loads(text)` JSON string'i tekrar Python nesnesine çevirir.",
    example: `import json\n\ndata = {"name": "Ali", "age": 17}\ntext = json.dumps(data)\nprint(text)\nparsed = json.loads(text)\nprint(parsed["name"])`,
    hints: [
      "import json ekle.",
      "json.dumps() ile sözlüğü string'e çevir.",
      'json.loads(text)["age"] ile değer al.',
    ],
    challenge:
      "json modülünü import et. data = {'name': 'Ali', 'age': 17} sözlüğünü json.dumps ile text değişkenine çevirip print et. Sonra json.loads(text) ile parsed'e çevirip print(parsed['age']) yaz.",
    files: [
      {
        name: "main.py",
        content: `# TODO: json import et\n\ndata = {"name": "Ali", "age": 17}\n# TODO: dumps ile yazdir, loads ile geri cevirip age yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "import\\s+json", label: "json import edildi" },
      { type: "regex", value: "json\\.dumps\\(", label: "json.dumps kullanıldı" },
      { type: "regex", value: "json\\.loads\\(", label: "json.loads kullanıldı" },
      { type: "output", value: "17", label: "Çıktıda 17 var" },
    ],
  },
  {
    id: "python-219",
    level: 219,
    language: "python",
    title: "Regex",
    description: "re.findall ve re.sub kullan.",
    explanation:
      "`re` modülü düzenli ifadelerle (regex) metin arama/değiştirme yapar.\n`re.findall(desen, metin)` desene uyan tüm eşleşmeleri liste olarak döner, `re.sub(desen, yeni, metin)` eşleşmeleri değiştirir.",
    example: `import re\n\ntext = "Ali 17, Ayse 16"\nnumbers = re.findall(r"\\d+", text)\nprint(numbers)\nresult = re.sub(r"\\d+", "X", text)\nprint(result)`,
    hints: [
      "import re ekle.",
      'r"\\d+" deseniyle sayıları bul.',
      're.sub(r"\\d+", "*", text) ile sayıları * yap.',
    ],
    challenge:
      "re modülünü import et. text = 'Ali 17, Ayse 16, Deniz 15' metnindeki tüm sayıları re.findall ile bulup print et. Sonra re.sub ile sayıları '*' ile değiştirip print et.",
    files: [
      {
        name: "main.py",
        content: `# TODO: re import et\n\ntext = "Ali 17, Ayse 16, Deniz 15"\n# TODO: findall ile sayilari bul ve yazdir\n# TODO: sub ile sayilari '*' yap ve yazdir\n`,
      },
    ],
    checks: [
      { type: "regex", value: "import\\s+re", label: "re import edildi" },
      { type: "regex", value: "re\\.findall\\(", label: "re.findall kullanıldı" },
      { type: "regex", value: "re\\.sub\\(", label: "re.sub kullanıldı" },
      { type: "output-exact", value: "['17', '16', '15']\nAli *, Ayse *, Deniz *", label: "Çıktı doğru" },
    ],
  },
  {
    id: "python-220",
    level: 220,
    language: "python",
    title: "Final: Öğrenci not takip sınıfı",
    description: "Ortalama hesaplayan bir class yaz.",
    explanation:
      "Şimdiye kadar öğrendiğin class, __init__, metot ve liste bilgilerini birleştirerek gerçek bir uygulama yazacaksın.\nBir öğrencinin notlarını tutan ve ortalamasını hesaplayan bir sınıf tasarla.",
    example: `class Student:\n    def __init__(self, name):\n        self.name = name\n        self.grades = []\n\n    def add_grade(self, grade):\n        self.grades.append(grade)\n\ns = Student("Ali")\ns.add_grade(80)\nprint(s.grades)`,
    hints: [
      "__init__(self, name) içinde self.grades = [] ile başlat.",
      "add_grade(self, grade) metodu ile self.grades.append(grade) yap.",
      "average(self) metodu sum(self.grades) / len(self.grades) döndürsün.",
    ],
    challenge:
      "Student class'ı yaz: __init__(self, name) name'i ve boş grades listesini ayarlasın; add_grade(self, grade) not eklesin; average(self) notların ortalamasını döndürsün. student = Student('Ali') oluştur, 80, 90, 70 notlarını ekle, print(student.average()) yaz (sonuç 80.0 olmalı).",
    files: [
      {
        name: "main.py",
        content: `# TODO: Student class'ini tanimla (__init__, add_grade, average)\n\nstudent = Student("Ali")\nstudent.add_grade(80)\nstudent.add_grade(90)\nstudent.add_grade(70)\nprint(student.average())\n`,
      },
    ],
    checks: [
      { type: "regex", value: "class\\s+Student", label: "class tanımlı" },
      { type: "regex", value: "def __init__\\(self", label: "__init__ tanımlı" },
      { type: "regex", value: "def\\s+average\\s*\\(\\s*self\\s*\\)", label: "average metodu tanımlı" },
      { type: "output-exact", value: "80.0", label: "Çıktı 80.0" },
    ],
  },
];
