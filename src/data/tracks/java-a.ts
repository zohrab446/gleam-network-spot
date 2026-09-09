import type { Lesson } from "../types";

export const JAVA_A: Lesson[] = [
  {
    id: "java-271",
    level: 271,
    language: "java",
    title: "Java'ya merhaba",
    description: "public class Main ve main metodu ile ilk Java programı.",
    explanation:
      "Her Java programı bir sınıf içinde yazılır. Dosya adıyla aynı isimde `public class Main` tanımlarız.\nProgram, `public static void main(String[] args)` metodundan başlar. Java 15 kullanıyoruz.",
    example: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Merhaba");\n  }\n}`,
    hints: [
      "public class Main { } bloğunu yaz.",
      "İçine public static void main(String[] args) { } metodunu ekle.",
      'main içine System.out.println("Merhaba Java"); yaz.',
    ],
    challenge: 'Main sınıfı ve main metodunu oluştur, ekrana "Merhaba Java" yazdır.',
    files: [
      { name: "Main.java", content: `// TODO: public class Main tanımla ve main metodunu yaz\n` },
    ],
    checks: [
      { type: "regex", value: "public\\s+class\\s+Main", label: "public class Main var" },
      { type: "regex", value: "public\\s+static\\s+void\\s+main\\s*\\(\\s*String\\[\\]\\s*args\\s*\\)", label: "main metodu doğru" },
      { type: "output", value: "Merhaba Java", label: "Çıktıda 'Merhaba Java' var" },
    ],
  },
  {
    id: "java-272",
    level: 272,
    language: "java",
    title: "println ve printf",
    description: "System.out.println ve System.out.printf ile yazdırma.",
    explanation:
      "`System.out.println` bir satır yazıp alt satıra geçer. `System.out.printf` ise `%d`, `%s`, `%f` gibi biçim belirteçleriyle yazdırır.\nprintf içinde `\\n` ile satır sonu ekleyebilirsin.",
    example: `System.out.println("Skor:");\nSystem.out.printf("%d puan%n", 10);`,
    hints: [
      "İlk satırda println ile bir başlık yaz.",
      "İkinci satırda printf ile bir tam sayı yazdır.",
      'System.out.printf("Yas: %d%n", 15);',
    ],
    challenge: 'println ile "Bilgiler:" yazdır, sonra printf ile "Yas: 15" çıktısını üret.',
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: println ve printf kullan\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "System\\.out\\.printf\\(", label: "printf kullanılmış" },
      { type: "output", value: "Bilgiler:", label: "Çıktıda 'Bilgiler:' var" },
      { type: "output", value: "Yas: 15", label: "Çıktıda 'Yas: 15' var" },
    ],
  },
  {
    id: "java-273",
    level: 273,
    language: "java",
    title: "İlkel tipler",
    description: "int, double, boolean, char tipleriyle değişken tanımlama.",
    explanation:
      "Java'da her değişkenin bir tipi vardır: `int` tam sayı, `double` ondalık sayı, `boolean` doğru/yanlış, `char` tek karakter.\nDeğişkenler `tip isim = değer;` şeklinde tanımlanır.",
    example: `int age = 16;\ndouble price = 9.99;\nboolean active = true;\nchar grade = 'A';`,
    hints: [
      "int, double, boolean, char tipinde birer değişken tanımla.",
      "Her değişkeni System.out.println ile yazdır.",
      "int age = 20; System.out.println(age); şeklinde devam et.",
    ],
    challenge: "int age = 20, double height = 1.75, boolean isStudent = true, char grade = 'B' tanımla ve hepsini yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: 4 ilkel tip değişken tanımla ve yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "int\\s+age\\s*=\\s*20", label: "int age = 20 var" },
      { type: "regex", value: "double\\s+height\\s*=\\s*1\\.75", label: "double height var" },
      { type: "regex", value: "boolean\\s+isStudent\\s*=\\s*true", label: "boolean isStudent var" },
      { type: "regex", value: "char\\s+grade\\s*=\\s*'B'", label: "char grade var" },
    ],
  },
  {
    id: "java-274",
    level: 274,
    language: "java",
    title: "String sınıfı",
    description: "length() ve toUpperCase() metotları.",
    explanation:
      "`String` bir metin sınıfıdır. `.length()` karakter sayısını, `.toUpperCase()` büyük harfli halini döndürür.\nString metotları yeni bir değer döndürür, orijinali değiştirmez.",
    example: `String name = "ali";\nSystem.out.println(name.length());\nSystem.out.println(name.toUpperCase());`,
    hints: [
      'String name = "codequest"; tanımla.',
      ".length() ile uzunluğunu yazdır.",
      ".toUpperCase() ile büyük harfli halini yazdır.",
    ],
    challenge: '"codequest" stringinin uzunluğunu ve büyük harfli halini yazdır.',
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    String name = "codequest";\n    // TODO: length ve toUpperCase yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.length\\(\\)", label: "length() kullanılmış" },
      { type: "regex", value: "\\.toUpperCase\\(\\)", label: "toUpperCase() kullanılmış" },
      { type: "output", value: "9", label: "Uzunluk 9 yazdırılmış" },
      { type: "output", value: "CODEQUEST", label: "Büyük harfli hal yazdırılmış" },
    ],
  },
  {
    id: "java-275",
    level: 275,
    language: "java",
    title: "Scanner ile girdi",
    description: "Scanner sınıfıyla klavyeden veri okuma.",
    explanation:
      "`Scanner` sınıfı, `System.in`'den kullanıcı girdisi okumamızı sağlar. `import java.util.Scanner;` gerekir.\n`.nextLine()` bir satır metin, `.nextInt()` bir tam sayı okur.",
    example: `import java.util.Scanner;\nScanner sc = new Scanner(System.in);\nString name = sc.nextLine();`,
    hints: [
      "Dosyanın başına import java.util.Scanner; ekle.",
      "Scanner sc = new Scanner(System.in); ile nesne oluştur.",
      'String name = sc.nextLine(); ile oku, sonra "Merhaba " + name yazdır.',
    ],
    challenge: "Scanner ile bir isim oku ve \"Merhaba <isim>\" yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Scanner ile isim oku ve selamla\n  }\n}` },
    ],
    stdin: ["Ayşe"],
    checks: [
      { type: "regex", value: "import\\s+java\\.util\\.Scanner", label: "Scanner import edilmiş" },
      { type: "regex", value: "new\\s+Scanner\\(\\s*System\\.in\\s*\\)", label: "Scanner nesnesi oluşturulmuş" },
      { type: "output", value: "Merhaba Ayşe", label: "Çıktıda 'Merhaba Ayşe' var" },
    ],
  },
  {
    id: "java-276",
    level: 276,
    language: "java",
    title: "Aritmetik ve atama operatörleri",
    description: "+, -, *, /, %, +=, -= gibi operatörler.",
    explanation:
      "Aritmetik operatörler `+ - * / %` sayılarla işlem yapar. Atama operatörleri `+= -= *= /=` ise bir işlemle atamayı birleştirir.\nÖrneğin `x += 5;` demek `x = x + 5;` demektir.",
    example: `int x = 10;\nx += 5;\nSystem.out.println(x % 3);`,
    hints: [
      "int total = 20; tanımla.",
      "total += 10; ile artır.",
      "System.out.println(total); ve System.out.println(total % 7); yazdır.",
    ],
    challenge: "total=20 değişkenine +=10 uygula, sonra total ve total%7 değerlerini yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    int total = 20;\n    // TODO: += kullan ve yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "total\\s*\\+=\\s*10", label: "+= kullanılmış" },
      { type: "output", value: "30", label: "30 yazdırılmış" },
      { type: "output", value: "2", label: "Kalan 2 yazdırılmış" },
    ],
  },
  {
    id: "java-277",
    level: 277,
    language: "java",
    title: "Casting (tip dönüşümü)",
    description: "int ve double arasında tip dönüşümü.",
    explanation:
      "Büyük tipten küçük tipe geçerken (double -> int) açık dönüşüm `(int)` gerekir; bu işleme casting denir.\nKüçükten büyüğe (int -> double) otomatik dönüşüm olur.",
    example: `double d = 9.7;\nint i = (int) d;\nSystem.out.println(i);`,
    hints: [
      "double price = 12.9; tanımla.",
      "(int) ile int'e dönüştür.",
      "int intPrice = (int) price; System.out.println(intPrice);",
    ],
    challenge: "price=12.9 değerini (int) ile dönüştür ve sonucu (12) yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    double price = 12.9;\n    // TODO: int'e cast et ve yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "\\(int\\)\\s*price", label: "(int) casting yapılmış" },
      { type: "output-exact", value: "12", label: "Çıktı tam olarak 12" },
    ],
  },
  {
    id: "java-278",
    level: 278,
    language: "java",
    title: "if-else",
    description: "Koşullu dallanma.",
    explanation:
      "`if` bir koşul doğruysa bloğu çalıştırır, `else` yanlışsa devreye girer. `else if` ile birden fazla koşul sıralanabilir.\nKoşullar `>`, `<`, `==`, `>=` gibi karşılaştırma operatörleriyle yazılır.",
    example: `int score = 70;\nif (score >= 50) {\n  System.out.println("Gecti");\n} else {\n  System.out.println("Kaldi");\n}`,
    hints: [
      "int score = 40; tanımla.",
      "if (score >= 50) ile kontrol et.",
      'else bloğunda System.out.println("Kaldi"); yaz.',
    ],
    challenge: "score=40 için 50 üstü/altı kontrolü yap, sonucu 'Gecti' veya 'Kaldi' olarak yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    int score = 40;\n    // TODO: if-else yaz\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "if\\s*\\(\\s*score\\s*>=\\s*50\\s*\\)", label: "if koşulu doğru" },
      { type: "regex", value: "else", label: "else bloğu var" },
      { type: "output", value: "Kaldi", label: "Çıktıda 'Kaldi' var" },
    ],
  },
  {
    id: "java-279",
    level: 279,
    language: "java",
    title: "switch (klasik ve expression)",
    description: "switch-case ve Java 15 switch expression.",
    explanation:
      "Klasik `switch` her case sonunda `break` ister. Java 15'te `switch` expression ile `case X -> ...` yazılıp doğrudan değer döndürülebilir.\nBu yeni biçim daha kısa ve hatasızdır.",
    example: `int day = 3;\nString name = switch (day) {\n  case 1 -> "Pazartesi";\n  case 3 -> "Carsamba";\n  default -> "Bilinmiyor";\n};\nSystem.out.println(name);`,
    hints: [
      "int day = 5; tanımla.",
      "switch expression ile day için bir gün adı döndür (case 5 -> \"Cuma\").",
      "String name = switch (day) { case 5 -> \"Cuma\"; default -> \"Bilinmiyor\"; }; sonra yazdır.",
    ],
    challenge: "day=5 için switch expression kullanarak \"Cuma\" değerini bir değişkene ata ve yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    int day = 5;\n    // TODO: switch expression kullan\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "switch\\s*\\(\\s*day\\s*\\)", label: "switch kullanılmış" },
      { type: "regex", value: "->", label: "expression (->) biçimi kullanılmış" },
      { type: "output", value: "Cuma", label: "Çıktıda 'Cuma' var" },
    ],
  },
  {
    id: "java-280",
    level: 280,
    language: "java",
    title: "String karşılaştırma: .equals()",
    description: "== yerine .equals() ile string karşılaştırma.",
    explanation:
      "String'leri karşılaştırırken `==` yerine `.equals()` kullanılmalıdır; çünkü `==` referansları karşılaştırır, içeriği değil.\n`.equals()` iki stringin karakterlerinin aynı olup olmadığına bakar.",
    example: `String a = "java";\nif (a.equals("java")) {\n  System.out.println("Ayni");\n}`,
    hints: [
      'String password = "1234"; tanımla.',
      '.equals("1234") ile karşılaştır.',
      'if (password.equals("1234")) { System.out.println("Dogru"); }',
    ],
    challenge: 'password="1234" değerini .equals() ile "1234" ile karşılaştır ve "Dogru" yazdır.',
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    String password = "1234";\n    // TODO: .equals ile karşılaştır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.equals\\(", label: ".equals() kullanılmış" },
      { type: "output", value: "Dogru", label: "Çıktıda 'Dogru' var" },
    ],
  },
  {
    id: "java-281",
    level: 281,
    language: "java",
    title: "for ve while döngüleri",
    description: "for ve while ile tekrarlı işlemler.",
    explanation:
      "`for` döngüsü belli sayıda tekrar için idealdir: `for (int i = 0; i < n; i++)`. `while` ise koşul doğru olduğu sürece çalışır.\nHer ikisi de bloğu tekrar tekrar çalıştırır.",
    example: `for (int i = 1; i <= 3; i++) {\n  System.out.println(i);\n}\nint j = 0;\nwhile (j < 2) {\n  j++;\n}`,
    hints: [
      "for (int i = 1; i <= 5; i++) döngüsü yaz.",
      "Her adımda i değerini yazdır.",
      "System.out.println(i); satırını döngü içine ekle.",
    ],
    challenge: "for döngüsüyle 1'den 5'e kadar sayıları yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: for döngüsü ile 1-5 yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "for\\s*\\(", label: "for döngüsü var" },
      { type: "output-exact", value: "1\n2\n3\n4\n5", label: "1'den 5'e satır satır yazdırılmış" },
    ],
  },
  {
    id: "java-282",
    level: 282,
    language: "java",
    title: "for-each döngüsü",
    description: "Dizi/koleksiyon elemanlarını for-each ile gezme.",
    explanation:
      "`for-each` döngüsü bir dizinin her elemanını sırayla dolaşır: `for (int x : arr)`. İndeks tutmaya gerek kalmaz.\nDaha okunaklıdır ve elemanlarla doğrudan çalışmayı sağlar.",
    example: `int[] nums = {1, 2, 3};\nfor (int n : nums) {\n  System.out.println(n);\n}`,
    hints: [
      "int[] nums = {10, 20, 30}; tanımla.",
      "for (int n : nums) ile her elemanı gez.",
      "Döngü içinde System.out.println(n); yaz.",
    ],
    challenge: "nums = {10, 20, 30} dizisini for-each ile satır satır yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    int[] nums = {10, 20, 30};\n    // TODO: for-each kullan\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "for\\s*\\(\\s*int\\s+\\w+\\s*:\\s*nums\\s*\\)", label: "for-each döngüsü var" },
      { type: "output-exact", value: "10\n20\n30", label: "Elemanlar sırayla yazdırılmış" },
    ],
  },
  {
    id: "java-283",
    level: 283,
    language: "java",
    title: "Diziler",
    description: "Dizi tanımlama ve indeksle erişim.",
    explanation:
      "Bir dizi aynı tipten birden fazla değeri tutar: `int[] arr = {1, 2, 3};`. Elemanlara `arr[0]` gibi indeksle erişilir.\nİndeksler 0'dan başlar.",
    example: `String[] fruits = {"elma", "armut"};\nSystem.out.println(fruits[0]);`,
    hints: [
      'String[] colors = {"red", "green", "blue"}; tanımla.',
      "colors[1] ile ikinci elemana eriş.",
      "System.out.println(colors[1]); yaz.",
    ],
    challenge: 'colors = {"red", "green", "blue"} dizisinden ikinci elemanı (green) yazdır.',
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    String[] colors = {"red", "green", "blue"};\n    // TODO: ikinci elemanı yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "colors\\[1\\]", label: "colors[1] kullanılmış" },
      { type: "output-exact", value: "green", label: "Çıktı tam olarak green" },
    ],
  },
  {
    id: "java-284",
    level: 284,
    language: "java",
    title: "Arrays.toString ve Arrays.sort",
    description: "java.util.Arrays yardımcı metotları.",
    explanation:
      "`Arrays.toString(arr)` bir diziyi okunabilir metne çevirir. `Arrays.sort(arr)` diziyi yerinde küçükten büyüğe sıralar.\nBu metotları kullanmak için `import java.util.Arrays;` gerekir.",
    example: `import java.util.Arrays;\nint[] nums = {3, 1, 2};\nArrays.sort(nums);\nSystem.out.println(Arrays.toString(nums));`,
    hints: [
      "import java.util.Arrays; ekle.",
      "int[] nums = {5, 2, 8, 1}; tanımla.",
      "Arrays.sort(nums); yap, sonra Arrays.toString(nums) yazdır.",
    ],
    challenge: "nums = {5, 2, 8, 1} dizisini sırala ve Arrays.toString ile yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    int[] nums = {5, 2, 8, 1};\n    // TODO: sort ve toString kullan\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "import\\s+java\\.util\\.Arrays", label: "Arrays import edilmiş" },
      { type: "regex", value: "Arrays\\.sort\\(", label: "Arrays.sort kullanılmış" },
      { type: "output", value: "[1, 2, 5, 8]", label: "Sıralı dizi yazdırılmış" },
    ],
  },
  {
    id: "java-285",
    level: 285,
    language: "java",
    title: "Statik metotlar",
    description: "static anahtar kelimesiyle metot tanımlama.",
    explanation:
      "`static` metotlar sınıfa aittir, nesne oluşturmadan çağrılabilir. `main` metodu da statiktir.\nBaşka bir statik metot, `Main.metotAdi()` ya da doğrudan `metotAdi()` şeklinde çağrılabilir.",
    example: `static int square(int x) {\n  return x * x;\n}\n// çağırma: square(4)`,
    hints: [
      "main dışında static int square(int x) metodu tanımla.",
      "İçinde return x * x; yaz.",
      "main içinde System.out.println(square(5)); çağır.",
    ],
    challenge: "square(int x) adında statik bir metot yaz, x*x döndürsün; main içinde square(5) çağırıp yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  // TODO: static int square(int x) metodu ekle\n\n  public static void main(String[] args) {\n    // TODO: square(5) çağır ve yazdır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "static\\s+\\w+\\s+square\\s*\\(", label: "static square metodu tanımlı" },
      { type: "output-exact", value: "25", label: "Çıktı 25" },
    ],
  },
  {
    id: "java-286",
    level: 286,
    language: "java",
    title: "Parametreler ve scope",
    description: "Metot parametreleri ve değişken görünürlüğü.",
    explanation:
      "Bir metoda birden fazla parametre geçirilebilir: `static int add(int a, int b)`. Parametreler yalnızca o metot içinde (scope) geçerlidir.\nMetot dışında tanımlanan bir değişkene metot içinden erişilemez.",
    example: `static int add(int a, int b) {\n  return a + b;\n}\nSystem.out.println(add(2, 3));`,
    hints: [
      "static int add(int a, int b) metodu tanımla.",
      "return a + b; yaz.",
      "main içinde System.out.println(add(4, 6)); çağır.",
    ],
    challenge: "İki parametre alan add(int a, int b) metodu yaz, main içinde add(4, 6) sonucunu (10) yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  // TODO: static int add(int a, int b) yaz\n\n  public static void main(String[] args) {\n    // TODO: add(4, 6) çağır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "static\\s+\\w+\\s+add\\s*\\(\\s*int\\s+\\w+\\s*,\\s*int\\s+\\w+\\s*\\)", label: "add metodu iki parametreli" },
      { type: "output-exact", value: "10", label: "Çıktı 10" },
    ],
  },
  {
    id: "java-287",
    level: 287,
    language: "java",
    title: "Method overloading",
    description: "Aynı isimli farklı parametreli metotlar.",
    explanation:
      "Aynı isme sahip birden fazla metot, farklı parametre sayısı veya tipiyle tanımlanabilir; buna overloading (aşırı yükleme) denir.\nJava, çağrıda verilen argümanlara bakarak doğru metodu seçer.",
    example: `static int sum(int a, int b) { return a + b; }\nstatic double sum(double a, double b) { return a + b; }`,
    hints: [
      "static int sum(int a, int b) metodu tanımla.",
      "Aynı isimle static double sum(double a, double b) metodu daha ekle.",
      "main içinde her ikisini de çağır ve yazdır: sum(2,3) ve sum(2.5, 1.5)",
    ],
    challenge: "sum(int,int) ve sum(double,double) adında iki overload metot yaz, her ikisini de çağırıp yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  // TODO: sum metotlarını overload et\n\n  public static void main(String[] args) {\n    // TODO: iki farklı sum çağır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "static\\s+int\\s+sum\\s*\\(\\s*int", label: "int overload var" },
      { type: "regex", value: "static\\s+double\\s+sum\\s*\\(\\s*double", label: "double overload var" },
      { type: "output", value: "5", label: "int toplam yazdırılmış" },
      { type: "output", value: "4.0", label: "double toplam yazdırılmış" },
    ],
  },
  {
    id: "java-288",
    level: 288,
    language: "java",
    title: "Varargs",
    description: "Değişken sayıda argüman alan metotlar.",
    explanation:
      "`...` ile tanımlanan parametre (varargs), metoda istenilen sayıda argüman geçmeye izin verir. Metot içinde bir dizi gibi davranır.\nÖrnek: `static int sum(int... nums)`.",
    example: `static int sum(int... nums) {\n  int total = 0;\n  for (int n : nums) total += n;\n  return total;\n}`,
    hints: [
      "static int sum(int... nums) metodu tanımla.",
      "for-each ile nums içindeki değerleri topla.",
      "main içinde sum(1, 2, 3, 4) çağır ve yazdır.",
    ],
    challenge: "Varargs kullanan sum(int... nums) metodu yaz, sum(1,2,3,4) sonucunu (10) yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  // TODO: static int sum(int... nums) yaz\n\n  public static void main(String[] args) {\n    // TODO: sum(1, 2, 3, 4) çağır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "int\\.\\.\\.\\s*\\w+", label: "varargs (int...) kullanılmış" },
      { type: "output-exact", value: "10", label: "Çıktı 10" },
    ],
  },
  {
    id: "java-289",
    level: 289,
    language: "java",
    title: "Math sınıfı",
    description: "Math.max, Math.pow, Math.sqrt gibi metotlar.",
    explanation:
      "`Math` sınıfı hazır matematik işlemleri sunar: `Math.max(a,b)` büyüğü, `Math.pow(a,b)` üssü, `Math.sqrt(a)` karekökü verir.\nBu metotlar statiktir, doğrudan `Math.metot()` şeklinde çağrılır.",
    example: `System.out.println(Math.max(3, 7));\nSystem.out.println(Math.sqrt(16));`,
    hints: [
      "Math.pow(2, 5) ile üs alma yap.",
      "Math.sqrt(81) ile karekök al.",
      "İkisini de System.out.println ile yazdır.",
    ],
    challenge: "Math.pow(2, 5) ve Math.sqrt(81) sonuçlarını yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Math.pow ve Math.sqrt kullan\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "Math\\.pow\\(", label: "Math.pow kullanılmış" },
      { type: "regex", value: "Math\\.sqrt\\(", label: "Math.sqrt kullanılmış" },
      { type: "output", value: "32.0", label: "2^5 yazdırılmış" },
      { type: "output", value: "9.0", label: "sqrt(81) yazdırılmış" },
    ],
  },
  {
    id: "java-290",
    level: 290,
    language: "java",
    title: "Recursion",
    description: "Kendini çağıran fonksiyonlarla faktöriyel.",
    explanation:
      "Bir metodun kendisini çağırmasına recursion (özyineleme) denir. Her recursive metodun bir taban durumu (base case) olmalıdır, yoksa sonsuz döner.\nFaktöriyel: `n! = n * (n-1)!`, taban durumu `0! = 1`.",
    example: `static int factorial(int n) {\n  if (n == 0) return 1;\n  return n * factorial(n - 1);\n}`,
    hints: [
      "static int factorial(int n) metodu tanımla.",
      "Taban durumu: n == 0 ise 1 döndür.",
      "return n * factorial(n - 1); ile özyinele, main'de factorial(5) çağır.",
    ],
    challenge: "Recursive factorial(int n) metodu yaz, factorial(5) sonucunu (120) yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  // TODO: static int factorial(int n) yaz\n\n  public static void main(String[] args) {\n    // TODO: factorial(5) çağır\n  }\n}` },
    ],
    checks: [
      { type: "regex", value: "factorial\\s*\\(\\s*n\\s*-\\s*1\\s*\\)", label: "recursive çağrı var" },
      { type: "output-exact", value: "120", label: "Çıktı 120" },
    ],
  },
  {
    id: "java-291",
    level: 291,
    language: "java",
    title: "Class ve instance",
    description: "Kendi sınıfını tanımlama ve nesne oluşturma.",
    explanation:
      "`class` ile kendi veri tipini tanımlarsın. `new` anahtar kelimesiyle o sınıftan bir nesne (instance) oluşturursun.\nAynı dosyada Main dışında public olmayan başka sınıflar da tanımlanabilir.",
    example: `class Dog {\n  String name;\n}\nDog d = new Dog();\nd.name = "Karabas";`,
    hints: [
      "Main dışında class Dog { String name; } tanımla.",
      "main içinde Dog d = new Dog(); ile nesne oluştur.",
      'd.name = "Karabas"; ata, sonra System.out.println(d.name); yazdır.',
    ],
    challenge: "Dog sınıfı tanımla (String name alanı), bir nesne oluştur, name alanını ata ve yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Dog nesnesi oluştur ve name ata\n  }\n}\n\n// TODO: class Dog tanımla\n` },
    ],
    checks: [
      { type: "regex", value: "class\\s+Dog", label: "Dog sınıfı tanımlı" },
      { type: "regex", value: "new\\s+Dog\\s*\\(\\s*\\)", label: "Dog nesnesi oluşturulmuş" },
      { type: "output", value: "Karabas", label: "Çıktıda 'Karabas' var" },
    ],
  },
  {
    id: "java-292",
    level: 292,
    language: "java",
    title: "Fields ve metotlar",
    description: "Sınıf içinde alan ve davranış tanımlama.",
    explanation:
      "Bir sınıfın alanları (fields) verisini, metotları davranışını tanımlar. Metotlar sınıfın alanlarına doğrudan erişebilir.\nÖrneğin bir `Car` sınıfının `speed` alanı ve `printSpeed()` metodu olabilir.",
    example: `class Car {\n  int speed;\n  void printSpeed() {\n    System.out.println(speed);\n  }\n}`,
    hints: [
      "class Car { int speed; } tanımla.",
      "Car içine void printSpeed() { System.out.println(speed); } metodunu ekle.",
      "main içinde Car c = new Car(); c.speed = 120; c.printSpeed();",
    ],
    challenge: "Car sınıfı yaz (int speed, printSpeed metodu); speed=120 ver ve printSpeed() ile yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Car nesnesi oluştur, speed ata, printSpeed çağır\n  }\n}\n\n// TODO: class Car tanımla (speed alanı + printSpeed metodu)\n` },
    ],
    checks: [
      { type: "regex", value: "class\\s+Car", label: "Car sınıfı tanımlı" },
      { type: "regex", value: "void\\s+printSpeed\\s*\\(", label: "printSpeed metodu var" },
      { type: "output-exact", value: "120", label: "Çıktı 120" },
    ],
  },
  {
    id: "java-293",
    level: 293,
    language: "java",
    title: "Constructor ve this",
    description: "Nesne oluşturulurken çalışan constructor.",
    explanation:
      "Constructor, sınıf adıyla aynı isimli özel bir metottur ve `new` ile nesne oluşturulurken otomatik çalışır.\n`this` anahtar kelimesi, parametre ile alan adı çakıştığında sınıfın kendi alanını işaret eder.",
    example: `class Person {\n  String name;\n  Person(String name) {\n    this.name = name;\n  }\n}\nPerson p = new Person("Ali");`,
    hints: [
      "class Person { String name; } tanımla.",
      "Person(String name) { this.name = name; } constructor ekle.",
      'main içinde Person p = new Person("Ali"); System.out.println(p.name);',
    ],
    challenge: "Person sınıfına constructor ekle (this.name = name), \"Ali\" ile nesne oluştur ve name'i yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Person nesnesi oluştur ve yazdır\n  }\n}\n\n// TODO: class Person tanımla (constructor ile)\n` },
    ],
    checks: [
      { type: "regex", value: "this\\.name\\s*=\\s*name", label: "this.name = name kullanılmış" },
      { type: "regex", value: "new\\s+Person\\s*\\(\\s*\"Ali\"\\s*\\)", label: "Person(\"Ali\") ile oluşturulmuş" },
      { type: "output", value: "Ali", label: "Çıktıda 'Ali' var" },
    ],
  },
  {
    id: "java-294",
    level: 294,
    language: "java",
    title: "Constructor overloading",
    description: "Bir sınıfa birden fazla constructor tanımlama.",
    explanation:
      "Bir sınıfın farklı parametre listeleriyle birden çok constructor'ı olabilir; buna constructor overloading denir.\nBoş bir constructor varsayılan değerler verirken, parametreli olanı özel değer atayabilir.",
    example: `class Box {\n  int size;\n  Box() { size = 1; }\n  Box(int size) { this.size = size; }\n}`,
    hints: [
      "class Box { int size; } tanımla.",
      "Box() { size = 1; } ve Box(int size) { this.size = size; } iki constructor ekle.",
      "main içinde Box b1 = new Box(); Box b2 = new Box(5); ikisinin size'ını yazdır.",
    ],
    challenge: "Box sınıfına parametresiz ve parametreli constructor ekle; iki nesne oluştur, size değerlerini yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: iki Box nesnesi oluştur ve size yazdır\n  }\n}\n\n// TODO: class Box tanımla (iki constructor)\n` },
    ],
    checks: [
      { type: "regex", value: "Box\\s*\\(\\s*\\)", label: "parametresiz constructor var" },
      { type: "regex", value: "Box\\s*\\(\\s*int\\s+size\\s*\\)", label: "parametreli constructor var" },
      { type: "output", value: "1", label: "Varsayılan size yazdırılmış" },
      { type: "output", value: "5", label: "Özel size yazdırılmış" },
    ],
  },
  {
    id: "java-295",
    level: 295,
    language: "java",
    title: "Encapsulation",
    description: "private alanlar ve getter metotlarla veri gizleme.",
    explanation:
      "Encapsulation, sınıfın alanlarını `private` yaparak dışarıdan doğrudan erişimi engellemek, bunun yerine getter/setter metotları sunmaktır.\nBu, verinin kontrollü şekilde değiştirilmesini sağlar.",
    example: `class Account {\n  private double balance;\n  public double getBalance() { return balance; }\n  public void setBalance(double b) { balance = b; }\n}`,
    hints: [
      "class Account { private double balance; } tanımla.",
      "public double getBalance() ve public void setBalance(double b) metotlarını ekle.",
      "main içinde Account a = new Account(); a.setBalance(100); System.out.println(a.getBalance());",
    ],
    challenge: "Account sınıfına private balance alanı ve getter/setter ekle; 100 ata, getBalance ile yazdır.",
    files: [
      { name: "Main.java", content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Account nesnesi oluştur, setBalance(100) çağır, getBalance yazdır\n  }\n}\n\n// TODO: class Account tanımla (private balance + getter/setter)\n` },
    ],
    checks: [
      { type: "regex", value: "private\\s+double\\s+balance", label: "balance alanı private" },
      { type: "regex", value: "public\\s+double\\s+getBalance\\s*\\(", label: "getBalance metodu var" },
      { type: "regex", value: "public\\s+void\\s+setBalance\\s*\\(", label: "setBalance metodu var" },
      { type: "output-exact", value: "100.0", label: "Çıktı 100.0" },
    ],
  },
];
