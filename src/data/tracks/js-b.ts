import type { Lesson } from "../types";

const HTML = `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <h1 id="title">CodeQuest</h1>
      <p id="info">Hazır</p>
      <button id="btn">Tıkla</button>
      <input id="txt" type="text" />
      <ul id="list"></ul>
      <div id="modal" class="hidden">Modal içerik</div>
      <div id="box">Kutu</div>
    </div>
    <script src="script.js"></script>
  </body>
</html>`;

const CSS = `body { font-family: sans-serif; padding: 16px; }
.hidden { display: none; }
.dark { background: #111; color: #eee; }
.active { color: green; }`;

export const JS_B: Lesson[] = [
  {
    id: "js-96",
    level: 96,
    language: "javascript",
    title: "Özellik oku ve yaz",
    description: "setAttribute ve getAttribute ile HTML özelliklerini yönet.",
    explanation:
      "`setAttribute(isim, değer)` bir elemente özellik ekler ya da değiştirir.\n`getAttribute(isim)` mevcut değeri okur. Örneğin bir resmin `src`'sini veya bir linkin `href`'ini böyle değiştirebilirsin.",
    example: `const el = document.getElementById("box");\nel.setAttribute("data-durum", "aktif");\nconsole.log(el.getAttribute("data-durum"));`,
    hints: [
      "id'si 'title' olan elementi document.getElementById ile seç.",
      "setAttribute ile 'data-seviye' özelliğine '96' değerini ver.",
      "const el = document.getElementById('title'); el.setAttribute('data-seviye', '96');",
    ],
    challenge: "id'si 'title' olan elemente 'data-seviye' özelliğini '96' değeriyle ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: title elementine data-seviye="96" ekle\n` },
    ],
    checks: [
      { type: "dom", selector: "#title", label: "data-seviye özelliği var", attr: "data-seviye", attrValue: "96" },
    ],
  },
  {
    id: "js-97",
    level: 97,
    language: "javascript",
    title: "Yeni eleman oluştur",
    description: "createElement ve appendChild ile sayfaya eleman ekle.",
    explanation:
      "`document.createElement('etiket')` yeni bir HTML elementi oluşturur ama sayfaya eklenmez.\n`parent.appendChild(el)` bu elementi bir üst elemente ekler ve görünür hale getirir.",
    example: `const li = document.createElement("li");\nli.textContent = "Yeni öğe";\ndocument.getElementById("list").appendChild(li);`,
    hints: [
      "createElement('li') ile yeni bir liste öğesi oluştur.",
      "textContent ile içine 'Merhaba' yaz.",
      "const li = document.createElement('li'); li.textContent = 'Merhaba'; document.getElementById('list').appendChild(li);",
    ],
    challenge: "id'si 'list' olan ul'ye içinde 'Merhaba' yazan bir <li> ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: list'e yeni bir li ekle\n` },
    ],
    checks: [
      { type: "dom", selector: "#list li", label: "li eklendi", text: "Merhaba" },
    ],
  },
  {
    id: "js-98",
    level: 98,
    language: "javascript",
    title: "Tıklama dinleyicisi",
    description: "addEventListener ile click olayını yakala.",
    explanation:
      "`element.addEventListener('click', fonksiyon)` o elemente tıklandığında fonksiyonu çalıştırır.\nFare tıklaması sanal ortamda simüle edilemez, bu yüzden kodunun doğru yazıldığını kontrol ediyoruz.",
    example: `const btn = document.getElementById("btn");\nbtn.addEventListener("click", () => {\n  console.log("tıklandı");\n});`,
    hints: [
      "id'si 'btn' olan butonu seç.",
      "addEventListener metodunu 'click' olayıyla kullan.",
      "document.getElementById('btn').addEventListener('click', () => { console.log('tıklandı'); });",
    ],
    challenge: "'btn' butonuna tıklanınca konsola bir mesaj yazan bir click dinleyicisi ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: btn'e click dinleyicisi ekle\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
    ],
  },
  {
    id: "js-99",
    level: 99,
    language: "javascript",
    title: "Sayaç görevi",
    description: "Tıklamayla artan bir sayaç yap.",
    explanation:
      "Bir değişkende sayıyı tutup, her tıklamada artırıp ekrana yazdırabilirsin.\n`textContent` ile elementin içeriğini güncel sayı ile değiştir.",
    example: `let sayac = 0;\nbtn.addEventListener("click", () => {\n  sayac++;\n  info.textContent = sayac;\n});`,
    hints: [
      "Bir 'let count = 0;' değişkeni oluştur.",
      "btn'e click dinleyicisi ekleyip count'u artır.",
      "info.textContent değerini her tıklamada count ile güncelle; sayfa yüklendiğinde info metni '0' olsun.",
    ],
    challenge: "'info' elementinin başlangıç metni '0' olsun; 'btn'e tıklanınca count artıp 'info' içine yazılsın.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `let count = 0;\n// TODO: info elementine başlangıç değerini yaz ve click dinleyicisi ekle\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
      { type: "dom", selector: "#info", label: "info başlangıçta 0", text: "0" },
    ],
  },
  {
    id: "js-100",
    level: 100,
    language: "javascript",
    title: "Klavye olayı",
    description: "keydown eventi ile tuş basımını yakala.",
    explanation:
      "`addEventListener('keydown', fonksiyon)` bir tuşa basıldığında çalışır.\nEvent nesnesinin `key` özelliği hangi tuşa basıldığını söyler.",
    example: `document.addEventListener("keydown", (e) => {\n  console.log(e.key);\n});`,
    hints: [
      "document üzerinde bir dinleyici ekle.",
      "Olay adı olarak 'keydown' kullan.",
      "document.addEventListener('keydown', (e) => { console.log(e.key); });",
    ],
    challenge: "document'e basılan tuşu konsola yazan bir keydown dinleyicisi ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: keydown dinleyicisi ekle\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]keydown['\"]", label: "keydown dinleyicisi eklendi" },
    ],
  },
  {
    id: "js-101",
    level: 101,
    language: "javascript",
    title: "Varsayılanı engelle",
    description: "preventDefault() ile tarayıcının varsayılan davranışını durdur.",
    explanation:
      "Bazı olaylar (form gönderme, link tıklama) tarayıcının varsayılan bir davranışı vardır.\n`event.preventDefault()` bu davranışı durdurur, mesela sayfanın yenilenmesini engeller.",
    example: `form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  console.log("gönderim durduruldu");\n});`,
    hints: [
      "btn'e bir click dinleyicisi ekle.",
      "Dinleyici fonksiyonu parametre olarak event alsın (örn. e).",
      "btn.addEventListener('click', (e) => { e.preventDefault(); });",
    ],
    challenge: "'btn' elementine click dinleyicisi ekle ve içinde e.preventDefault() çağır.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: click dinleyicisinde preventDefault kullan\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
      { type: "regex", value: "preventDefault\\s*\\(", label: "preventDefault çağrıldı" },
    ],
  },
  {
    id: "js-102",
    level: 102,
    language: "javascript",
    title: "Yazı kutusu olayı",
    description: "input eventi ile yazı kutusundaki değişimi yakala.",
    explanation:
      "`addEventListener('input', fonksiyon)` bir input elementinin değeri her değiştiğinde çalışır.\n`event.target.value` yazılan güncel metni verir.",
    example: `txt.addEventListener("input", (e) => {\n  console.log(e.target.value);\n});`,
    hints: [
      "id'si 'txt' olan input'u seç.",
      "Olay adı olarak 'input' kullan.",
      "document.getElementById('txt').addEventListener('input', (e) => { console.log(e.target.value); });",
    ],
    challenge: "'txt' input'una, yazılan değeri konsola yazan bir input dinleyicisi ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: input dinleyicisi ekle\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]input['\"]", label: "input dinleyicisi eklendi" },
    ],
  },
  {
    id: "js-103",
    level: 103,
    language: "javascript",
    title: "Modal aç/kapa",
    description: "classList ile bir modalı göster/gizle.",
    explanation:
      "`classList.remove('hidden')` bir sınıfı kaldırıp elementi gösterebilir.\n`classList.add('hidden')` ise tekrar gizler. Buton tıklamasıyla bu ikisini birleştirebilirsin.",
    example: `btn.addEventListener("click", () => {\n  modal.classList.remove("hidden");\n});`,
    hints: [
      "id'si 'modal' olan elementi seç.",
      "btn'e click dinleyicisi ekle.",
      "btn.addEventListener('click', () => { document.getElementById('modal').classList.remove('hidden'); });",
    ],
    challenge: "'btn'e tıklanınca 'modal' elementinden 'hidden' sınıfını kaldıran bir dinleyici ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: click ile modal'ı göster\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
      { type: "regex", value: "classList\\.remove\\(\\s*['\"]hidden['\"]", label: "hidden sınıfı kaldırılıyor" },
    ],
  },
  {
    id: "js-104",
    level: 104,
    language: "javascript",
    title: "Olayı durdur",
    description: "stopPropagation ile olayın üst elemente yayılmasını engelle.",
    explanation:
      "Bir elemente tıkladığında olay üst elementlere de yayılır (bubbling).\n`event.stopPropagation()` bu yayılmayı durdurur, sadece tıklanan eleman tepki verir.",
    example: `box.addEventListener("click", (e) => {\n  e.stopPropagation();\n});`,
    hints: [
      "id'si 'box' olan elemente click dinleyicisi ekle.",
      "Dinleyici fonksiyonuna event parametresi ver.",
      "box.addEventListener('click', (e) => { e.stopPropagation(); });",
    ],
    challenge: "'box' elementine click dinleyicisi ekle ve içinde e.stopPropagation() çağır.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: box'a click dinleyicisi ekle, stopPropagation kullan\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
      { type: "regex", value: "stopPropagation\\s*\\(", label: "stopPropagation çağrıldı" },
    ],
  },
  {
    id: "js-105",
    level: 105,
    language: "javascript",
    title: "Fare üzerine gelince",
    description: "mouseover ve mouseout olaylarıyla fareyi takip et.",
    explanation:
      "`mouseover` fare bir elementin üzerine geldiğinde tetiklenir.\n`mouseout` fare elementten ayrıldığında tetiklenir. İkisi genelde birlikte kullanılır.",
    example: `box.addEventListener("mouseover", () => {\n  box.classList.add("active");\n});\nbox.addEventListener("mouseout", () => {\n  box.classList.remove("active");\n});`,
    hints: [
      "box'a mouseover dinleyicisi ekle.",
      "box'a ayrıca mouseout dinleyicisi ekle.",
      "box.addEventListener('mouseover', () => {...}); box.addEventListener('mouseout', () => {...});",
    ],
    challenge: "'box' elementine hem mouseover hem mouseout dinleyicileri ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: mouseover ve mouseout dinleyicileri ekle\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]mouseover['\"]", label: "mouseover dinleyicisi eklendi" },
      { type: "regex", value: "addEventListener\\(\\s*['\"]mouseout['\"]", label: "mouseout dinleyicisi eklendi" },
    ],
  },
  {
    id: "js-106",
    level: 106,
    language: "javascript",
    title: "Gecikmeli çalıştır",
    description: "setTimeout ile bir kodu belirli süre sonra çalıştır.",
    explanation:
      "`setTimeout(fonksiyon, ms)` fonksiyonu belirtilen milisaniye sonra bir kere çalıştırır.\nBu sayede kodun anında değil, biraz gecikmeyle çalışmasını sağlayabilirsin.",
    example: `setTimeout(() => {\n  console.log("500ms sonra");\n}, 500);`,
    hints: [
      "setTimeout fonksiyonunu kullan.",
      "İçine console.log('Merhaba') yazan bir fonksiyon ver.",
      "setTimeout(() => { console.log('Merhaba'); }, 300);",
    ],
    challenge: "300ms sonra konsola 'Merhaba' yazan bir setTimeout kullan.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: setTimeout ile 300ms sonra 'Merhaba' yazdır\n` },
    ],
    checks: [
      { type: "output", value: "Merhaba", label: "Çıktıda 'Merhaba' var" },
    ],
  },
  {
    id: "js-107",
    level: 107,
    language: "javascript",
    title: "Tekrarlayan çalıştır",
    description: "setInterval ve clearInterval ile tekrar eden bir işlemi yönet.",
    explanation:
      "`setInterval(fonksiyon, ms)` fonksiyonu her ms milisaniyede bir tekrar tekrar çalıştırır.\n`clearInterval(id)` bu tekrarı durdurur. Sonsuz döngüden kaçınmak için sayaçla durdurmalısın.",
    example: `let i = 0;\nconst id = setInterval(() => {\n  i++;\n  console.log(i);\n  if (i >= 3) clearInterval(id);\n}, 100);`,
    hints: [
      "Bir sayaç değişkeni ve setInterval kullan.",
      "Her tetiklemede sayaç değerini konsola yaz.",
      "sayaç 3'e ulaşınca clearInterval(id) ile durdur; interval 100ms olsun.",
    ],
    challenge: "100ms'de bir sayan, 3'e ulaşınca duran ve her adımda sayıyı konsola yazan bir setInterval yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: setInterval ile 3'e kadar say ve durdur\n` },
    ],
    checks: [
      { type: "output", value: "3", label: "Çıktıda 3 var" },
      { type: "regex", value: "clearInterval\\s*\\(", label: "clearInterval çağrıldı" },
    ],
  },
  {
    id: "js-108",
    level: 108,
    language: "javascript",
    title: "Diziyi ara",
    description: "find, some ve includes ile dizide arama yap.",
    explanation:
      "`find` şartı sağlayan ilk elemanı döner. `some` şartı sağlayan en az bir eleman var mı diye bakar (true/false).\n`includes` dizide bir değer var mı diye bakar.",
    example: `const nums = [1, 2, 3, 4];\nconsole.log(nums.find((n) => n > 2));\nconsole.log(nums.includes(4));`,
    hints: [
      "Bir sayı dizisi oluştur, örn. [3, 7, 10, 15].",
      "find ile 10'dan büyük ilk sayıyı bul ve yazdır.",
      "console.log([3, 7, 10, 15].find((n) => n > 10));",
    ],
    challenge: "[3, 7, 10, 15] dizisinde find ile 10'dan büyük ilk sayıyı bulup konsola yaz (15 olmalı).",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: find ile 10'dan büyük ilk sayıyı yazdır\n` },
    ],
    checks: [
      { type: "output", value: "15", label: "Çıktıda 15 var" },
      { type: "regex", value: "\\.find\\s*\\(", label: "find kullanıldı" },
    ],
  },
  {
    id: "js-109",
    level: 109,
    language: "javascript",
    title: "Diziyi topla",
    description: "reduce ile diziyi tek bir değere indirge.",
    explanation:
      "`reduce((toplam, eleman) => ..., başlangıç)` diziyi gezerek tek bir sonuç üretir.\nGenelde toplam, çarpım gibi biriktirici işlemler için kullanılır.",
    example: `const nums = [1, 2, 3];\nconst toplam = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(toplam);`,
    hints: [
      "[1, 2, 3, 4] dizisini oluştur.",
      "reduce ile toplamı hesapla, başlangıç değeri 0 olsun.",
      "console.log([1, 2, 3, 4].reduce((acc, n) => acc + n, 0));",
    ],
    challenge: "[1, 2, 3, 4] dizisinin toplamını reduce ile hesaplayıp konsola yaz (10 olmalı).",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: reduce ile toplamı hesapla\n` },
    ],
    checks: [
      { type: "output", value: "10", label: "Çıktıda 10 var" },
      { type: "regex", value: "\\.reduce\\s*\\(", label: "reduce kullanıldı" },
    ],
  },
  {
    id: "js-110",
    level: 110,
    language: "javascript",
    title: "Parçalara ayır",
    description: "Destructuring ile dizi ve nesnelerden değer çıkar.",
    explanation:
      "`const [a, b] = dizi;` dizinin elemanlarını ayrı değişkenlere atar.\n`const {isim} = nesne;` ise nesnenin bir özelliğini değişkene atar. Kod daha kısa ve okunaklı olur.",
    example: `const kisi = { isim: "Ali", yas: 20 };\nconst { isim, yas } = kisi;\nconsole.log(isim, yas);`,
    hints: [
      "Bir nesne oluştur: { isim: 'Zeynep', yas: 17 }.",
      "Destructuring ile isim ve yas değişkenlerini çıkar.",
      "const { isim, yas } = { isim: 'Zeynep', yas: 17 }; console.log(isim, yas);",
    ],
    challenge: "{ isim: 'Zeynep', yas: 17 } nesnesinden destructuring ile isim ve yas'ı çıkar, ikisini de konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: destructuring kullan\n` },
    ],
    checks: [
      { type: "output", value: "Zeynep", label: "Çıktıda Zeynep var" },
      { type: "output", value: "17", label: "Çıktıda 17 var" },
    ],
  },
  {
    id: "js-111",
    level: 111,
    language: "javascript",
    title: "Yay ve topla",
    description: "Spread ve rest operatörleriyle diziler oluştur/topla.",
    explanation:
      "`...` bir dizinin elemanlarını 'yayar' (spread), yeni bir dizi oluşturmakta kullanılır.\nBir fonksiyon parametresinde ise kalan argümanları bir diziye 'toplar' (rest).",
    example: `const a = [1, 2];\nconst b = [...a, 3, 4];\nconsole.log(b);\nfunction topla(...nums) {\n  return nums.reduce((s, n) => s + n, 0);\n}`,
    hints: [
      "[1, 2] dizisini spread ile [1, 2, 3] yap.",
      "console.log ile yeni diziyi yazdır.",
      "const a = [1, 2]; const b = [...a, 3]; console.log(b);",
    ],
    challenge: "[1, 2] dizisini spread operatörüyle genişletip sonuna 3 ekle, sonucu konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: spread operatörü kullan\n` },
    ],
    checks: [
      { type: "regex", value: "\\.\\.\\.", label: "spread operatörü kullanıldı" },
      { type: "output", value: "3", label: "Çıktıda 3 var" },
    ],
  },
  {
    id: "js-112",
    level: 112,
    language: "javascript",
    title: "Tarayıcıda sakla",
    description: "localStorage ile veriyi kalıcı olarak sakla.",
    explanation:
      "`localStorage.setItem('anahtar', deger)` veriyi tarayıcıda saklar.\n`localStorage.getItem('anahtar')` bu değeri geri okur. Değerler her zaman metin (string) olarak saklanır.",
    example: `localStorage.setItem("isim", "Ali");\nconsole.log(localStorage.getItem("isim"));`,
    hints: [
      "setItem ile 'kullanici' anahtarına 'CodeQuest' değerini kaydet.",
      "getItem ile bu değeri geri oku.",
      "localStorage.setItem('kullanici', 'CodeQuest'); console.log(localStorage.getItem('kullanici'));",
    ],
    challenge: "'kullanici' anahtarına 'CodeQuest' değerini kaydet, sonra getItem ile okuyup konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: localStorage kullan\n` },
    ],
    checks: [
      { type: "regex", value: "localStorage\\.setItem\\s*\\(", label: "setItem kullanıldı" },
      { type: "output", value: "CodeQuest", label: "Çıktıda CodeQuest var" },
    ],
  },
  {
    id: "js-113",
    level: 113,
    language: "javascript",
    title: "Nesneyi metne çevir",
    description: "JSON.stringify ve JSON.parse ile veri dönüştür.",
    explanation:
      "`JSON.stringify(nesne)` bir nesneyi metne (string) çevirir, saklamak veya göndermek için kullanılır.\n`JSON.parse(metin)` ise bu metni tekrar nesneye çevirir.",
    example: `const obj = { a: 1 };\nconst str = JSON.stringify(obj);\nconst geri = JSON.parse(str);\nconsole.log(geri.a);`,
    hints: [
      "{ isim: 'Ali' } nesnesini stringify ile metne çevir.",
      "Bu metni parse ile tekrar nesneye çevir.",
      "const str = JSON.stringify({ isim: 'Ali' }); console.log(JSON.parse(str).isim);",
    ],
    challenge: "{ isim: 'Ali' } nesnesini JSON.stringify ile metne çevir, sonra JSON.parse ile geri çevirip isim'i konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: JSON.stringify ve JSON.parse kullan\n` },
    ],
    checks: [
      { type: "regex", value: "JSON\\.stringify\\s*\\(", label: "stringify kullanıldı" },
      { type: "regex", value: "JSON\\.parse\\s*\\(", label: "parse kullanıldı" },
      { type: "output", value: "Ali", label: "Çıktıda Ali var" },
    ],
  },
  {
    id: "js-114",
    level: 114,
    language: "javascript",
    title: "Söz ver",
    description: "Promise ile asenkron bir işlemi temsil et.",
    explanation:
      "`Promise`, ileride tamamlanacak bir işlemi temsil eder. `resolve(deger)` başarıyı bildirir.\n`.then(fonksiyon)` promise tamamlandığında çalışır ve sonucu alır.",
    example: `const p = new Promise((resolve) => {\n  resolve("tamam");\n});\np.then((sonuc) => console.log(sonuc));`,
    hints: [
      "new Promise ile bir promise oluştur.",
      "İçinde setTimeout ile 200ms sonra resolve('Bitti') çağır.",
      "new Promise((resolve) => setTimeout(() => resolve('Bitti'), 200)).then((s) => console.log(s));",
    ],
    challenge: "200ms sonra 'Bitti' değeriyle resolve olan bir Promise oluştur, then ile sonucu konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: Promise oluştur ve then ile sonucu yazdır\n` },
    ],
    checks: [
      { type: "regex", value: "new\\s+Promise\\s*\\(", label: "Promise oluşturuldu" },
      { type: "output", value: "Bitti", label: "Çıktıda Bitti var" },
    ],
  },
  {
    id: "js-115",
    level: 115,
    language: "javascript",
    title: "Bekleyerek çalış",
    description: "async/await ile promise sonucunu daha okunaklı al.",
    explanation:
      "`async` bir fonksiyonun içinde `await` kullanmanı sağlar.\n`await promise` promise tamamlanana kadar bekler ve sonucu doğrudan döner, `.then` yazmana gerek kalmaz.",
    example: `async function calistir() {\n  const sonuc = await Promise.resolve("hazır");\n  console.log(sonuc);\n}\ncalistir();`,
    hints: [
      "async bir fonksiyon tanımla.",
      "İçinde await ile Promise.resolve('Hazır') sonucunu al.",
      "async function run() { const s = await Promise.resolve('Hazır'); console.log(s); } run();",
    ],
    challenge: "async bir fonksiyon yaz, içinde await ile Promise.resolve('Hazır') değerini al ve konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: async/await kullan\n` },
    ],
    checks: [
      { type: "regex", value: "async\\s+function|async\\s*\\(", label: "async fonksiyon kullanıldı" },
      { type: "regex", value: "await\\s+", label: "await kullanıldı" },
      { type: "output", value: "Hazır", label: "Çıktıda Hazır var" },
    ],
  },
  {
    id: "js-116",
    level: 116,
    language: "javascript",
    title: "Hatayı yakala",
    description: "try/catch ile hataları güvenle yönet.",
    explanation:
      "`try { ... }` bloğu içindeki kod çalışırken hata olursa program çökmez.\n`catch (hata) { ... }` bloğu bu hatayı yakalayıp işlemene izin verir.",
    example: `try {\n  throw new Error("sorun var");\n} catch (e) {\n  console.log(e.message);\n}`,
    hints: [
      "try bloğu içinde throw new Error('Hata!') çağır.",
      "catch bloğunda e.message'ı yakala.",
      "try { throw new Error('Hata!'); } catch (e) { console.log(e.message); }",
    ],
    challenge: "try/catch kullanarak 'Hata!' mesajlı bir Error fırlat ve catch içinde mesajı konsola yaz.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: try/catch kullan\n` },
    ],
    checks: [
      { type: "regex", value: "try\\s*\\{[\\s\\S]*catch", label: "try/catch kullanıldı" },
      { type: "output", value: "Hata!", label: "Çıktıda Hata! var" },
    ],
  },
  {
    id: "js-117",
    level: 117,
    language: "javascript",
    title: "Mini yapılacaklar listesi",
    description: "Bir diziden liste elemanları render et.",
    explanation:
      "Bir diziyi `forEach` veya `map` ile gezip her eleman için bir `<li>` oluşturup listeye ekleyebilirsin.\nBöylece veriye göre dinamik HTML üretmiş olursun.",
    example: `const gorevler = ["Ekmek al", "Kod yaz"];\ngorevler.forEach((g) => {\n  const li = document.createElement("li");\n  li.textContent = g;\n  list.appendChild(li);\n});`,
    hints: [
      "['Ekmek al', 'Kod yaz', 'Uyu'] gibi bir dizi oluştur.",
      "forEach ile her eleman için bir li oluştur.",
      "gorevler.forEach((g) => { const li = document.createElement('li'); li.textContent = g; document.getElementById('list').appendChild(li); });",
    ],
    challenge: "3 elemanlı bir görev dizisi oluştur ve forEach ile her birini 'list' elementine <li> olarak ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: dizideki görevleri list'e ekle\n` },
    ],
    checks: [
      { type: "dom", selector: "#list li", label: "en az 3 li var", count: 3 },
    ],
  },
  {
    id: "js-118",
    level: 118,
    language: "javascript",
    title: "Filtreli liste",
    description: "filter ile diziyi süzüp sonucu render et.",
    explanation:
      "`filter` bir dizideki şartı sağlayan elemanları yeni bir dizide toplar.\nBu sonucu ekrana `<li>` elemanları olarak yazdırarak filtrelenmiş bir liste gösterebilirsin.",
    example: `const nums = [1, 2, 3, 4, 5];\nconst ciftler = nums.filter((n) => n % 2 === 0);\nciftler.forEach((n) => {\n  const li = document.createElement("li");\n  li.textContent = n;\n  list.appendChild(li);\n});`,
    hints: [
      "[1, 2, 3, 4, 5, 6] dizisini oluştur.",
      "filter ile sadece çift sayıları al.",
      "Sonucu forEach ile 'list' elementine li olarak ekle (2, 4, 6).",
    ],
    challenge: "[1,2,3,4,5,6] dizisinden filter ile çift sayıları seçip 'list' elementine <li> olarak ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: filter ile çift sayıları list'e ekle\n` },
    ],
    checks: [
      { type: "dom", selector: "#list li", label: "en az 3 li var", count: 3 },
      { type: "regex", value: "\\.filter\\s*\\(", label: "filter kullanıldı" },
    ],
  },
  {
    id: "js-119",
    level: 119,
    language: "javascript",
    title: "Tema değiştirici",
    description: "classList.toggle ile karanlık temayı aç/kapat.",
    explanation:
      "`classList.toggle('sinif')` bir sınıf varsa kaldırır, yoksa ekler.\nBunu `document.body` üzerinde kullanarak tüm sayfanın temasını değiştirebilirsin.",
    example: `btn.addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});`,
    hints: [
      "btn'e click dinleyicisi ekle.",
      "İçinde document.body.classList.toggle kullan.",
      "btn.addEventListener('click', () => { document.body.classList.toggle('dark'); });",
    ],
    challenge: "'btn'e tıklanınca document.body üzerinde 'dark' sınıfını toggle eden bir dinleyici ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: body'de dark sınıfını toggle et\n` },
    ],
    checks: [
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
      { type: "regex", value: "classList\\.toggle\\(\\s*['\"]dark['\"]", label: "dark sınıfı toggle ediliyor" },
    ],
  },
  {
    id: "js-120",
    level: 120,
    language: "javascript",
    title: "Final boss: mini uygulama",
    description: "Sayaç, filtreleme ve tema değiştirmeyi birleştir.",
    explanation:
      "Bu son derste öğrendiğin her şeyi birleştiriyorsun: tıklamayla artan bir sayaç, filtrelenmiş bir liste ve tema değiştirici.\nHer parçayı ayrı ayrı yazıp birbirine bağla.",
    example: `let count = 0;\nbtn.addEventListener("click", () => {\n  count++;\n  info.textContent = count;\n});\ndocument.body.classList.toggle("dark");`,
    hints: [
      "info elementinin başlangıç metnini '0' yap.",
      "btn'e tıklanınca hem count artsın hem de body'de 'dark' toggle olsun.",
      "[10,15,20,25] dizisinden filter ile 15'ten büyükleri al ve list'e li olarak ekle (20, 25).",
    ],
    challenge: "info başlangıçta '0' olsun; btn'e tıklanınca count artıp info'ya yazılsın ve body'de 'dark' toggle edilsin; ayrıca [10,15,20,25] dizisinden 15'ten büyükleri filter ile 'list'e ekle.",
    files: [
      { name: "index.html", readonly: true, content: HTML },
      { name: "style.css", readonly: true, content: CSS },
      { name: "script.js", content: `// TODO: sayaç + tema + filtreleme birleştir\n` },
    ],
    checks: [
      { type: "dom", selector: "#info", label: "info başlangıçta 0", text: "0" },
      { type: "regex", value: "addEventListener\\(\\s*['\"]click['\"]", label: "click dinleyicisi eklendi" },
      { type: "regex", value: "classList\\.toggle\\(\\s*['\"]dark['\"]", label: "dark sınıfı toggle ediliyor" },
      { type: "dom", selector: "#list li", label: "en az 2 li var", count: 2 },
    ],
  },
];
