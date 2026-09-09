import type { Lesson } from "../types";

const HTML_BASE = (body: string) => `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n${body}\n    <script src="script.js"></script>\n  </body>\n</html>`;

const STYLE_CSS = `body {\n  font-family: sans-serif;\n  background: #f8fafc;\n  color: #1e293b;\n  padding: 16px;\n}`;

export const JS_A: Lesson[] = [
  {
    id: "js-71",
    level: 71,
    language: "javascript",
    title: "JavaScript'e ilk adım",
    description: "script.js dosyasını HTML'e bağla ve konsola yaz.",
    explanation:
      "JavaScript kodunu bir HTML sayfasına bağlamak için `<script>` etiketi kullanılır. `src` özelliği hangi dosyanın çalıştırılacağını belirtir.\n`console.log()` fonksiyonu, tarayıcının geliştirici konsoluna metin yazdırır. Kod yazarken en çok kullanacağın araçlardan biri budur.",
    example: `console.log("Merhaba");\nconsole.log(42);`,
    hints: [
      "`</body>` etiketinden önce bir `<script>` etiketi ekle.",
      "Etiketin `src` özelliğine \"script.js\" yaz.",
      `<script src="script.js"></script> ve script.js içine console.log("Hello, CodeQuest!");`,
    ],
    challenge: "index.html'in body sonuna script.js'i bağla ve script.js içinde console.log(\"Hello, CodeQuest!\") çalıştır.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>CodeQuest</h1>\n    <!-- TODO: script.js'i buraya bağla -->\n  </body>\n</html>`,
      },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: console.log ile "Hello, CodeQuest!" yaz` },
    ],
    checks: [
      { type: "regex", file: "index.html", value: "<script[^>]+src=[\"']script\\.js[\"']", label: "script.js HTML'e bağlandı" },
      { type: "output", value: "Hello, CodeQuest!", label: "Konsolda 'Hello, CodeQuest!' yazıyor" },
    ],
  },
  {
    id: "js-72",
    level: 72,
    language: "javascript",
    title: "let ve const",
    description: "Değişken tanımlamayı öğren.",
    explanation:
      "`let` ile değeri sonra değişebilecek bir değişken tanımlarsın. `const` ile tanımlanan değişkenin değeri asla değişmez.\nİkisi de bir kez tanımlanır, sonra kullanılır.",
    example: `let age = 15;\nconst name = "Ali";\nage = 16;\nconsole.log(name, age);`,
    hints: [
      "Bir `let` değişkeni ve bir `const` değişkeni tanımla.",
      "İkisini de console.log ile yazdır.",
      `let score = 10; const title = "Oyuncu"; console.log(title, score);`,
    ],
    challenge: "let score = 10 ve const title = \"Oyuncu\" tanımla, ikisini de console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Oyuncu Paneli</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: score (let) ve title (const) tanımla, console.log ile yazdır` },
    ],
    checks: [
      { type: "regex", value: "let\\s+score", label: "let score tanımlandı" },
      { type: "regex", value: "const\\s+title", label: "const title tanımlandı" },
      { type: "output", value: "Oyuncu", label: "Çıktıda 'Oyuncu' yazıyor" },
    ],
  },
  {
    id: "js-73",
    level: 73,
    language: "javascript",
    title: "Veri tipleri ve typeof",
    description: "number, string, boolean ve typeof kullan.",
    explanation:
      "JavaScript'te sık kullanılan tipler: `number` (sayı), `string` (metin), `boolean` (true/false).\n`typeof` bir değerin tipini string olarak döndürür, örneğin `typeof 5` -> \"number\".",
    example: `let x = 5;\nconsole.log(typeof x);\nconsole.log(typeof "merhaba");`,
    hints: [
      "3 farklı tipte değişken tanımla: sayı, metin, boolean.",
      "Her biri için typeof kullanarak tipini yazdır.",
      `let n = 5; let s = "hi"; let b = true; console.log(typeof n, typeof s, typeof b);`,
    ],
    challenge: "n=5, s=\"hi\", b=true tanımla ve typeof n, typeof s, typeof b değerlerini console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Veri Tipleri</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: n, s, b değişkenlerini tanımla ve typeof ile yazdır` },
    ],
    checks: [
      { type: "regex", value: "typeof\\s+n", label: "typeof n kullanıldı" },
      { type: "output", value: "number", label: "Çıktıda 'number' var" },
      { type: "output", value: "boolean", label: "Çıktıda 'boolean' var" },
    ],
  },
  {
    id: "js-74",
    level: 74,
    language: "javascript",
    title: "Aritmetik operatörler",
    description: "Toplama, çarpma ve mod işlemleri yap.",
    explanation:
      "`+ - * /` temel aritmetik işlemlerdir. `%` (mod) bölümden kalanı verir, örneğin `10 % 3` -> 1.\nBu operatörleri sayılarla veya değişkenlerle kullanabilirsin.",
    example: `let a = 10;\nlet b = 3;\nconsole.log(a + b);\nconsole.log(a % b);`,
    hints: [
      "a = 12, b = 5 tanımla.",
      "Toplamını ve mod (%) sonucunu ayrı console.log ile yazdır.",
      `let a = 12; let b = 5; console.log(a + b); console.log(a % b);`,
    ],
    challenge: "a=12, b=5 tanımla; a+b ve a%b sonuçlarını ayrı satırlarda console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Hesap Makinesi</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: a, b tanımla; toplam ve mod sonucunu yazdır` },
    ],
    checks: [
      { type: "output", value: "17", label: "Çıktıda toplam (17) var" },
      { type: "output", value: "2", label: "Çıktıda mod sonucu (2) var" },
    ],
  },
  {
    id: "js-75",
    level: 75,
    language: "javascript",
    title: "Template literals",
    description: "Backtick ile metin içine değişken göm.",
    explanation:
      "Backtick (\\`) ile yazılan stringlere template literal denir. İçine \\${degisken} yazarak değişkenleri metnin içine gömebilirsin.\nBu, string birleştirmekten (+) daha okunaklıdır.",
    example: "let name = \"Ayşe\";\nlet age = 14;\nconsole.log(`Merhaba ${name}, ${age} yaşındasın.`);",
    hints: [
      "name ve age değişkenlerini tanımla.",
      "Backtick içinde \\${name} ve \\${age} kullan.",
      "let name = \"Zeynep\"; let age = 16; console.log(`Merhaba ${name}, ${age} yaşındasın.`);",
    ],
    challenge: "name=\"Zeynep\", age=16 tanımla; \"Merhaba Zeynep, 16 yaşındasın.\" çıktısını template literal ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Tanışma</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: name, age tanımla ve template literal ile yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\$\\{\\s*name\\s*\\}", label: "Template literal içinde \\${name} kullanıldı" },
      { type: "output", value: "Merhaba Zeynep, 16 yaşındasın.", label: "Çıktı doğru" },
    ],
  },
  {
    id: "js-76",
    level: 76,
    language: "javascript",
    title: "Karşılaştırma operatörleri",
    description: "===, !== ve büyüklük/küçüklük karşılaştır.",
    explanation:
      "`===` iki değerin tip ve değer olarak eşit olup olmadığını kontrol eder (kesin eşitlik). `!==` ise eşit olmadığını kontrol eder.\n`>` `<` `>=` `<=` sayıları karşılaştırmak için kullanılır. Sonuç her zaman `true` veya `false`'dur.",
    example: `console.log(5 === 5);\nconsole.log(5 === "5");\nconsole.log(7 > 3);`,
    hints: [
      "a=8, b=8 tanımla, a === b sonucunu yazdır.",
      "a > 10 sonucunu da yazdır.",
      `let a = 8; let b = 8; console.log(a === b); console.log(a > 10);`,
    ],
    challenge: "a=8, b=8 tanımla; a === b ve a > 10 sonuçlarını console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Karşılaştırma</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: a, b tanımla; a===b ve a>10 yazdır` },
    ],
    checks: [
      { type: "regex", value: "===", label: "=== kullanıldı" },
      { type: "output", value: "true", label: "Çıktıda true var" },
      { type: "output", value: "false", label: "Çıktıda false var" },
    ],
  },
  {
    id: "js-77",
    level: 77,
    language: "javascript",
    title: "Mantıksal operatörler",
    description: "&&, || ve ! kullan.",
    explanation:
      "`&&` (ve) her iki koşul da doğruysa true döner. `||` (veya) koşullardan biri doğruysa true döner. `!` bir değeri tersine çevirir.\nBu operatörler genellikle koşullu ifadelerde kullanılır.",
    example: `let isAdult = true;\nlet hasTicket = false;\nconsole.log(isAdult && hasTicket);\nconsole.log(isAdult || hasTicket);`,
    hints: [
      "sunny ve warm adında iki boolean tanımla.",
      "&& ve || sonuçlarını ayrı console.log ile yazdır.",
      `let sunny = true; let warm = false; console.log(sunny && warm); console.log(sunny || warm);`,
    ],
    challenge: "sunny=true, warm=false tanımla; sunny && warm ve sunny || warm sonuçlarını console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Hava Durumu</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: sunny, warm tanımla; && ve || sonuçlarını yazdır` },
    ],
    checks: [
      { type: "regex", value: "&&", label: "&& kullanıldı" },
      { type: "regex", value: "\\|\\|", label: "|| kullanıldı" },
      { type: "output", value: "false", label: "Çıktıda false var" },
      { type: "output", value: "true", label: "Çıktıda true var" },
    ],
  },
  {
    id: "js-78",
    level: 78,
    language: "javascript",
    title: "if / else",
    description: "Koşullu kod bloğu yaz.",
    explanation:
      "`if` bir koşul doğruysa içindeki kodu çalıştırır. `else` koşul yanlışsa çalışacak alternatif kodu belirtir.\n`else if` ile birden fazla koşulu sırayla kontrol edebilirsin.",
    example: `let score = 45;\nif (score >= 50) {\n  console.log("Geçti");\n} else {\n  console.log("Kaldı");\n}`,
    hints: [
      "score değişkenini 70 yap.",
      "if (score >= 50) bloğunda \"Geçti\" yazdır, else bloğunda \"Kaldı\" yazdır.",
      `let score = 70; if (score >= 50) { console.log("Geçti"); } else { console.log("Kaldı"); }`,
    ],
    challenge: "score=70 tanımla; score>=50 ise \"Geçti\", değilse \"Kaldı\" yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Not Kontrolü</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: score tanımla; if/else ile Geçti/Kaldı yazdır` },
    ],
    checks: [
      { type: "regex", value: "if\\s*\\(", label: "if kullanıldı" },
      { type: "regex", value: "else", label: "else kullanıldı" },
      { type: "output", value: "Geçti", label: "Çıktıda 'Geçti' var" },
    ],
  },
  {
    id: "js-79",
    level: 79,
    language: "javascript",
    title: "Ternary operatör",
    description: "Tek satırda koşul yaz.",
    explanation:
      "Ternary operatör (`koşul ? doğruysa : yanlışsa`) if/else'i tek satırda yazmanı sağlar.\nSonuç doğrudan bir değişkene atanabilir veya yazdırılabilir.",
    example: `let age = 20;\nlet status = age >= 18 ? "Yetişkin" : "Çocuk";\nconsole.log(status);`,
    hints: [
      "age değişkenini 15 yap.",
      "Ternary ile age >= 18 kontrolü yaparak status değişkenine ata.",
      `let age = 15; let status = age >= 18 ? "Yetişkin" : "Çocuk"; console.log(status);`,
    ],
    challenge: "age=15 tanımla; ternary operatörle status'a \"Yetişkin\" veya \"Çocuk\" ata ve console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Yaş Kontrolü</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: age tanımla; ternary ile status oluştur ve yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\?.*:", label: "Ternary operatör kullanıldı" },
      { type: "output", value: "Çocuk", label: "Çıktıda 'Çocuk' var" },
    ],
  },
  {
    id: "js-80",
    level: 80,
    language: "javascript",
    title: "switch-case",
    description: "Çoklu koşulları switch ile yönet.",
    explanation:
      "`switch` bir değişkenin farklı değerlerine göre farklı kod bloklarını çalıştırmanı sağlar. Her durum `case` ile belirtilir.\n`break` bir case bittiğinde diğerlerine geçmeyi engeller. `default` hiçbir case eşleşmezse çalışır.",
    example: `let day = 3;\nswitch (day) {\n  case 1:\n    console.log("Pazartesi");\n    break;\n  default:\n    console.log("Diğer gün");\n}`,
    hints: [
      "fruit değişkenini \"muz\" yap.",
      "switch (fruit) içinde \"elma\", \"muz\" case'leri ve default ekle, her birinde break kullan.",
      `let fruit = "muz"; switch (fruit) { case "elma": console.log("Kırmızı"); break; case "muz": console.log("Sarı"); break; default: console.log("Bilinmiyor"); }`,
    ],
    challenge: "fruit=\"muz\" tanımla; switch ile \"elma\"->\"Kırmızı\", \"muz\"->\"Sarı\", default->\"Bilinmiyor\" yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Meyve Rengi</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: fruit tanımla; switch-case ile rengini yazdır` },
    ],
    checks: [
      { type: "regex", value: "switch\\s*\\(", label: "switch kullanıldı" },
      { type: "regex", value: "break", label: "break kullanıldı" },
      { type: "output", value: "Sarı", label: "Çıktıda 'Sarı' var" },
    ],
  },
  {
    id: "js-81",
    level: 81,
    language: "javascript",
    title: "Fonksiyon tanımlama",
    description: "function ile yeniden kullanılabilir kod yaz.",
    explanation:
      "`function` anahtar kelimesiyle bir işlemi tekrar tekrar kullanabileceğin bir fonksiyon tanımlarsın. Parametreler parantez içinde belirtilir.\n`return` fonksiyonun sonucunu geri döndürür.",
    example: `function square(n) {\n  return n * n;\n}\nconsole.log(square(4));`,
    hints: [
      "add adında iki parametre alan bir fonksiyon tanımla.",
      "return ile a+b sonucunu döndür.",
      `function add(a, b) { return a + b; } console.log(add(3, 5));`,
    ],
    challenge: "add(a, b) fonksiyonunu tanımla, a+b döndürsün. add(3, 5) çağrısının sonucunu console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Toplama Fonksiyonu</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: add fonksiyonunu tanımla ve add(3, 5) çağrısını yazdır` },
    ],
    checks: [
      { type: "regex", value: "function\\s+add", label: "function add tanımlandı" },
      { type: "regex", value: "return", label: "return kullanıldı" },
      { type: "output", value: "8", label: "Çıktıda 8 var" },
    ],
  },
  {
    id: "js-82",
    level: 82,
    language: "javascript",
    title: "Arrow function",
    description: "Ok fonksiyonu ile kısa fonksiyon yaz.",
    explanation:
      "Arrow function, `function` yazmadan `(parametreler) => { ... }` şeklinde kısa fonksiyon tanımlama yoludur.\nTek satırlık fonksiyonlarda `{}` ve `return` bile atlanabilir: `(a, b) => a + b`.",
    example: `const multiply = (a, b) => a * b;\nconsole.log(multiply(3, 4));`,
    hints: [
      "square adında bir arrow function tanımla, tek parametre alsın.",
      "const ile tanımla, tek satırda n*n döndür.",
      `const square = (n) => n * n; console.log(square(6));`,
    ],
    challenge: "square adında arrow function tanımla (n*n döndürsün), square(6) sonucunu console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Kare Alma</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: square arrow function tanımla ve square(6) yazdır` },
    ],
    checks: [
      { type: "regex", value: "=>", label: "Arrow function (=>) kullanıldı" },
      { type: "output", value: "36", label: "Çıktıda 36 var" },
    ],
  },
  {
    id: "js-83",
    level: 83,
    language: "javascript",
    title: "for döngüsü",
    description: "for ile tekrar eden işlem yap.",
    explanation:
      "`for` döngüsü belirli sayıda tekrar yapmak için kullanılır: `for (başlangıç; koşul; adım) { ... }`.\nÖrneğin `for (let i = 0; i < 5; i++)` 0'dan 4'e kadar 5 kez çalışır.",
    example: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
    hints: [
      "1'den 5'e kadar sayan bir for döngüsü yaz.",
      "Döngü içinde her sayıyı console.log ile yazdır.",
      `for (let i = 1; i <= 5; i++) { console.log(i); }`,
    ],
    challenge: "for döngüsüyle 1'den 5'e kadar (dahil) her sayıyı ayrı satırda console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Sayaç</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: for döngüsüyle 1'den 5'e kadar yazdır` },
    ],
    checks: [
      { type: "regex", value: "for\\s*\\(", label: "for döngüsü kullanıldı" },
      { type: "output", value: "5", label: "Çıktıda 5 var" },
      { type: "output", value: "1", label: "Çıktıda 1 var" },
    ],
  },
  {
    id: "js-84",
    level: 84,
    language: "javascript",
    title: "while döngüsü",
    description: "Koşul doğru olduğu sürece tekrar et.",
    explanation:
      "`while` döngüsü, koşul doğru olduğu sürece kod bloğunu tekrar tekrar çalıştırır.\nSonsuz döngüye girmemek için döngü içinde koşulu etkileyen bir değişikliği unutma (örn. sayacı artırmak).",
    example: `let i = 0;\nwhile (i < 3) {\n  console.log(i);\n  i++;\n}`,
    hints: [
      "count değişkenini 0 yap, count < 4 olduğu sürece döngü kur.",
      "Döngü içinde count'u yazdır ve count++ ile artır.",
      `let count = 0; while (count < 4) { console.log(count); count++; }`,
    ],
    challenge: "count=0 tanımla; while döngüsüyle count < 4 olduğu sürece count'u yazdırıp bir artır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Geri Sayım</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: while döngüsüyle count'u 0'dan 3'e kadar yazdır` },
    ],
    checks: [
      { type: "regex", value: "while\\s*\\(", label: "while döngüsü kullanıldı" },
      { type: "output", value: "3", label: "Çıktıda 3 var" },
      { type: "output", value: "0", label: "Çıktıda 0 var" },
    ],
  },
  {
    id: "js-85",
    level: 85,
    language: "javascript",
    title: "Dizi oluşturma ve erişim",
    description: "Array oluştur, index ile eleman al.",
    explanation:
      "Bir dizi (array) köşeli parantezle oluşturulur: `let arr = [1, 2, 3]`. Elemanlara index (0'dan başlar) ile erişilir: `arr[0]`.\n`arr.length` dizinin eleman sayısını verir.",
    example: `let colors = ["kırmızı", "mavi"];\nconsole.log(colors[0]);\nconsole.log(colors.length);`,
    hints: [
      "fruits adında 3 elemanlı bir dizi oluştur.",
      "İlk elemanı ve dizinin uzunluğunu console.log ile yazdır.",
      `let fruits = ["elma", "muz", "çilek"]; console.log(fruits[0]); console.log(fruits.length);`,
    ],
    challenge: "fruits = [\"elma\", \"muz\", \"çilek\"] tanımla; fruits[0] ve fruits.length değerlerini console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Meyve Sepeti</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: fruits dizisini tanımla, ilk elemanı ve uzunluğu yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\[.*elma.*\\]", label: "Dizi tanımlandı" },
      { type: "output", value: "elma", label: "Çıktıda 'elma' var" },
      { type: "output", value: "3", label: "Çıktıda 3 (uzunluk) var" },
    ],
  },
  {
    id: "js-86",
    level: 86,
    language: "javascript",
    title: "push / pop / shift / unshift",
    description: "Dizi eleman ekleme ve çıkarma yöntemleri.",
    explanation:
      "`push` diziye sona eleman ekler, `pop` sondan bir eleman çıkarır. `unshift` başa eleman ekler, `shift` baştan çıkarır.\nBu yöntemler diziyi doğrudan değiştirir (mutasyon).",
    example: `let arr = [1, 2];\narr.push(3);\narr.unshift(0);\nconsole.log(arr);`,
    hints: [
      "nums = [2, 3] dizisini tanımla.",
      "push(4) ve unshift(1) uygula, sonra diziyi yazdır.",
      `let nums = [2, 3]; nums.push(4); nums.unshift(1); console.log(nums);`,
    ],
    challenge: "nums=[2, 3] tanımla; push(4) ve unshift(1) uygula, ardından diziyi console.log ile yazdır (sonuç [1,2,3,4] olmalı).",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Dizi İşlemleri</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: nums dizisine push ve unshift uygula, yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\.push\\(", label: "push kullanıldı" },
      { type: "regex", value: "\\.unshift\\(", label: "unshift kullanıldı" },
      { type: "output", value: "1", label: "Çıktıda dizi elemanları var" },
    ],
  },
  {
    id: "js-87",
    level: 87,
    language: "javascript",
    title: "forEach",
    description: "Dizinin her elemanı için işlem yap.",
    explanation:
      "`forEach`, bir dizinin her elemanı için bir fonksiyonu çalıştırır. Bu fonksiyon parametre olarak her elemanı sırayla alır.\nDöngü kurmadan dizide gezinmenin kolay bir yoludur.",
    example: `let nums = [1, 2, 3];\nnums.forEach((n) => console.log(n * 2));`,
    hints: [
      "names dizisini 3 isimle oluştur.",
      "forEach kullanarak her ismi console.log ile yazdır.",
      `let names = ["Ali", "Ayşe", "Mert"]; names.forEach((name) => console.log(name));`,
    ],
    challenge: "names=[\"Ali\", \"Ayşe\", \"Mert\"] tanımla; forEach ile her ismi ayrı satırda console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>İsim Listesi</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: names dizisini forEach ile yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\.forEach\\(", label: "forEach kullanıldı" },
      { type: "output", value: "Ayşe", label: "Çıktıda 'Ayşe' var" },
    ],
  },
  {
    id: "js-88",
    level: 88,
    language: "javascript",
    title: "map",
    description: "Dizinin dönüştürülmüş yeni halini oluştur.",
    explanation:
      "`map`, bir dizinin her elemanına bir işlem uygulayıp yeni bir dizi döndürür. Orijinal dizi değişmez.\nÖrneğin sayıları ikiyle çarpan yeni bir dizi elde etmek için kullanılır.",
    example: `let nums = [1, 2, 3];\nlet doubled = nums.map((n) => n * 2);\nconsole.log(doubled);`,
    hints: [
      "nums = [1, 2, 3, 4] dizisini tanımla.",
      "map ile her elemanın karesini alan yeni bir dizi oluştur.",
      `let nums = [1, 2, 3, 4]; let squares = nums.map((n) => n * n); console.log(squares);`,
    ],
    challenge: "nums=[1, 2, 3, 4] tanımla; map ile her elemanın karesini alıp squares dizisine ata ve console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Kareler</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: nums dizisinin karelerini map ile oluştur ve yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\.map\\(", label: "map kullanıldı" },
      { type: "output", value: "16", label: "Çıktıda 16 var" },
    ],
  },
  {
    id: "js-89",
    level: 89,
    language: "javascript",
    title: "filter",
    description: "Koşula uyan elemanları seç.",
    explanation:
      "`filter`, bir dizinin elemanlarından belirtilen koşula uyanları içeren yeni bir dizi döndürür.\nKoşul fonksiyonu her eleman için true/false döner; sadece true olanlar yeni diziye girer.",
    example: `let nums = [1, 2, 3, 4, 5];\nlet evens = nums.filter((n) => n % 2 === 0);\nconsole.log(evens);`,
    hints: [
      "nums = [3, 8, 12, 5, 20] dizisini tanımla.",
      "filter ile 10'dan büyük olanları seç.",
      `let nums = [3, 8, 12, 5, 20]; let big = nums.filter((n) => n > 10); console.log(big);`,
    ],
    challenge: "nums=[3, 8, 12, 5, 20] tanımla; filter ile 10'dan büyük elemanları big dizisine ata ve console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Büyük Sayılar</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: nums dizisinden 10'dan büyük olanları filter ile seç ve yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\.filter\\(", label: "filter kullanıldı" },
      { type: "output", value: "12", label: "Çıktıda 12 var" },
      { type: "output", value: "20", label: "Çıktıda 20 var" },
    ],
  },
  {
    id: "js-90",
    level: 90,
    language: "javascript",
    title: "Obje oluşturma ve erişim",
    description: "Nesne (object) tanımla ve özelliklerine eriş.",
    explanation:
      "Bir obje süslü parantezle oluşturulur: `{ key: value }`. Özelliklere nokta (`obj.key`) veya köşeli parantez (`obj[\"key\"]`) ile erişilir.\nObjeler ilişkili verileri bir arada tutmak için kullanılır.",
    example: `let person = { name: "Ali", age: 20 };\nconsole.log(person.name);\nconsole.log(person["age"]);`,
    hints: [
      "student adında name ve grade özellikleri olan bir obje oluştur.",
      "İki özelliği de console.log ile yazdır.",
      `let student = { name: "Cem", grade: 9 }; console.log(student.name); console.log(student.grade);`,
    ],
    challenge: "student = { name: \"Cem\", grade: 9 } tanımla; student.name ve student.grade değerlerini console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1>Öğrenci Kartı</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: student objesini tanımla, name ve grade özelliklerini yazdır` },
    ],
    checks: [
      { type: "regex", value: "\\{[^}]*name[^}]*\\}", label: "Obje tanımlandı" },
      { type: "output", value: "Cem", label: "Çıktıda 'Cem' var" },
      { type: "output", value: "9", label: "Çıktıda 9 var" },
    ],
  },
  {
    id: "js-91",
    level: 91,
    language: "javascript",
    title: "getElementById + textContent",
    description: "DOM'dan eleman seç ve içeriğini değiştir.",
    explanation:
      "`document.getElementById(\"id\")` sayfadaki belirli bir elemanı id'sine göre seçer. `textContent` ile o elemanın yazısını değiştirebilirsin.\nBu, JavaScript'in sayfayı canlı olarak güncellemesinin en temel yoludur.",
    example: `let title = document.getElementById("title");\ntitle.textContent = "Yeni Başlık";`,
    hints: [
      "id'si \"baslik\" olan elemanı getElementById ile seç.",
      "Seçtiğin elemanın textContent'ini değiştir.",
      `document.getElementById("baslik").textContent = "Hoş geldin!";`,
    ],
    challenge: "id'si \"baslik\" olan elemanın textContent'ini \"Hoş geldin!\" yap.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <h1 id="baslik">Başlık</h1>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: id'si "baslik" olan elemanın textContent'ini değiştir` },
    ],
    checks: [
      { type: "regex", value: "getElementById\\(\\s*[\"']baslik[\"']\\s*\\)", label: "getElementById ile 'baslik' seçildi" },
      { type: "dom", selector: "#baslik", text: "Hoş geldin!", label: "Başlık 'Hoş geldin!' oldu" },
    ],
  },
  {
    id: "js-92",
    level: 92,
    language: "javascript",
    title: "querySelector / querySelectorAll",
    description: "CSS seçicisiyle eleman(lar) bul.",
    explanation:
      "`querySelector` bir CSS seçicisine uyan ilk elemanı döndürür. `querySelectorAll` ise uyan tüm elemanları bir liste olarak döndürür.\nSeçiciler CSS'teki gibi yazılır: `.sinif`, `#id`, `etiket`.",
    example: `let first = document.querySelector(".kart");\nlet all = document.querySelectorAll(".kart");\nconsole.log(all.length);`,
    hints: [
      "querySelectorAll ile tüm .kart elemanlarını seç.",
      "İlk .kart elemanının textContent'ini querySelector ile değiştir.",
      `document.querySelector(".kart").textContent = "İlk Kart"; console.log(document.querySelectorAll(".kart").length);`,
    ],
    challenge: "querySelector ile ilk .kart elemanının textContent'ini \"İlk Kart\" yap ve querySelectorAll(\".kart\").length değerini console.log ile yazdır.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <div class="kart">Kart 1</div>\n    <div class="kart">Kart 2</div>\n    <div class="kart">Kart 3</div>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: querySelector ile ilk .kart'ı değiştir, querySelectorAll ile uzunluğu yazdır` },
    ],
    checks: [
      { type: "regex", value: "querySelectorAll\\(", label: "querySelectorAll kullanıldı" },
      { type: "dom", selector: ".kart", text: "İlk Kart", label: "İlk kartın yazısı değişti" },
      { type: "output", value: "3", label: "Çıktıda 3 (kart sayısı) var" },
    ],
  },
  {
    id: "js-93",
    level: 93,
    language: "javascript",
    title: "innerHTML",
    description: "Bir elemanın içine HTML kodu ekle.",
    explanation:
      "`innerHTML`, textContent'ten farklı olarak bir elemanın içine HTML etiketleri de yazmanı sağlar.\nÖrneğin bir div'in içine `<strong>` etiketiyle kalın yazı ekleyebilirsin.",
    example: `let box = document.getElementById("box");\nbox.innerHTML = "<strong>Önemli!</strong>";`,
    hints: [
      "id'si \"kutu\" olan elemanı seç.",
      "innerHTML ile içine bir <b> etiketi ekle.",
      `document.getElementById("kutu").innerHTML = "<b>Merhaba!</b>";`,
    ],
    challenge: "id'si \"kutu\" olan elemanın innerHTML'ini \"<b>Merhaba!</b>\" yap.",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <div id="kutu"></div>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: id'si "kutu" olan elemanın innerHTML'ini değiştir` },
    ],
    checks: [
      { type: "regex", value: "innerHTML", label: "innerHTML kullanıldı" },
      { type: "dom", selector: "#kutu b", text: "Merhaba!", label: "Kutu içinde <b>Merhaba!</b> var" },
    ],
  },
  {
    id: "js-94",
    level: 94,
    language: "javascript",
    title: "Inline stil (element.style)",
    description: "JavaScript ile CSS stilini değiştir.",
    explanation:
      "`element.style.ozellik` ile bir elemanın CSS özelliğini doğrudan JavaScript'ten değiştirebilirsin.\nÖzellik adları CSS'teki tire yerine camelCase yazılır, örneğin `background-color` -> `backgroundColor`.",
    example: `let box = document.getElementById("box");\nbox.style.color = "red";\nbox.style.backgroundColor = "yellow";`,
    hints: [
      "id'si \"kutu2\" olan elemanı seç.",
      "style.backgroundColor özelliğini \"indigo\" yap, style.color'ı \"white\" yap.",
      `let el = document.getElementById("kutu2"); el.style.backgroundColor = "indigo"; el.style.color = "white";`,
    ],
    challenge: "id'si \"kutu2\" olan elemanın arka plan rengini \"indigo\", yazı rengini \"white\" yap (element.style ile).",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <div id="kutu2">Renkli kutu</div>`) },
      { name: "style.css", readonly: true, content: STYLE_CSS },
      { name: "script.js", content: `// TODO: kutu2'nin arka plan ve yazı rengini style ile değiştir` },
    ],
    checks: [
      { type: "regex", value: "\\.style\\.", label: "element.style kullanıldı" },
      { type: "style", selector: "#kutu2", property: "background-color", value: "rgb(75, 0, 130)", label: "Arka plan indigo" },
      { type: "style", selector: "#kutu2", property: "color", value: "rgb(255, 255, 255)", label: "Yazı rengi beyaz" },
    ],
  },
  {
    id: "js-95",
    level: 95,
    language: "javascript",
    title: "classList: add / remove / toggle",
    description: "Elemanın CSS sınıflarını yönet.",
    explanation:
      "`element.classList.add(\"sinif\")` bir sınıf ekler, `.remove(\"sinif\")` kaldırır, `.toggle(\"sinif\")` varsa kaldırır yoksa ekler.\nBu yöntem, stilleri doğrudan değiştirmek yerine CSS sınıflarıyla yönetmenin temiz bir yoludur.",
    example: `let box = document.getElementById("box");\nbox.classList.add("aktif");\nbox.classList.remove("gizli");`,
    hints: [
      "id'si \"kutu3\" olan elemanı seç.",
      "classList.remove ile \"gizli\" sınıfını kaldır, classList.add ile \"aktif\" sınıfını ekle.",
      `let el = document.getElementById("kutu3"); el.classList.remove("gizli"); el.classList.add("aktif");`,
    ],
    challenge: "id'si \"kutu3\" olan elemandan \"gizli\" sınıfını kaldır ve \"aktif\" sınıfını ekle (classList kullan).",
    files: [
      { name: "index.html", readonly: true, content: HTML_BASE(`    <div id="kutu3" class="gizli">Kutu</div>`) },
      { name: "style.css", readonly: true, content: `${STYLE_CSS}\n\n.gizli {\n  display: none;\n}\n.aktif {\n  display: block;\n  font-weight: bold;\n}` },
      { name: "script.js", content: `// TODO: kutu3'ten "gizli" sınıfını kaldır, "aktif" sınıfını ekle` },
    ],
    checks: [
      { type: "regex", value: "classList\\.remove\\(", label: "classList.remove kullanıldı" },
      { type: "regex", value: "classList\\.add\\(", label: "classList.add kullanıldı" },
      { type: "dom", selector: "#kutu3.aktif", count: 1, label: "kutu3 'aktif' sınıfına sahip" },
    ],
  },
];
