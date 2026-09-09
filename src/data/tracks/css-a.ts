import type { Lesson } from "../types";

const HTML_LINKED = `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    __BODY__
  </body>
</html>`;

function html(body: string): string {
  return HTML_LINKED.replace("__BODY__", body);
}

export const CSS_A: Lesson[] = [
  {
    id: "css-21",
    level: 21,
    language: "css",
    title: "style.css'e bağlan",
    description: "HTML'i style.css dosyasına bağla ve ilk CSS kuralını yaz.",
    explanation:
      "CSS dosyasını bir HTML sayfasına bağlamak için `<head>` içine `<link rel=\"stylesheet\" href=\"style.css\">` etiketi eklenir.\nBöylece style.css içindeki kurallar sayfaya uygulanır. İlk kuralımızda `body` seçicisiyle sayfanın arka plan rengini ayarlayacağız.",
    example: `<head>\n  <link rel="stylesheet" href="style.css" />\n</head>`,
    hints: [
      "<head> etiketinin içine bir <link> etiketi ekle.",
      "link etiketinde rel=\"stylesheet\" ve href=\"style.css\" olmalı.",
      "<link rel=\"stylesheet\" href=\"style.css\" /> ve style.css'te body { background-color: #f1f5f9; }",
    ],
    challenge:
      "index.html'in <head> kısmına style.css'i bağlayan <link> etiketini ekle. Sonra style.css'te body seçicisiyle background-color: #f1f5f9 yap.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <!-- TODO: style.css'i buraya bağla -->\n  </head>\n  <body>\n    <h1>Merhaba CSS</h1>\n  </body>\n</html>`,
      },
      {
        name: "style.css",
        content: `/* TODO: body için ilk kuralını yaz */`,
      },
    ],
    checks: [
      { type: "regex", file: "index.html", value: "<link[^>]+href=[\"']style\\.css[\"']", label: "style.css HTML'e bağlandı" },
      { type: "style", selector: "body", property: "background-color", value: "rgb(241, 245, 249)", label: "body arka planı ayarlı" },
    ],
  },
  {
    id: "css-22",
    level: 22,
    language: "css",
    title: "Eleman seçicisi",
    description: "Etiket adıyla seçim yaparak tüm p elemanlarını biçimlendir.",
    explanation:
      "En basit CSS seçicisi eleman (etiket) seçicisidir. `p { ... }` yazdığında sayfadaki tüm `<p>` etiketlerine o kurallar uygulanır.\nAynı şekilde `h1`, `div` gibi her etiket adı bir seçici olarak kullanılabilir.",
    example: `h1 {\n  color: navy;\n}`,
    hints: [
      "Seçici olarak p yaz.",
      "İçine color ve font-size özelliklerini ekle.",
      "p { color: rgb(30, 41, 59); font-size: 18px; }",
    ],
    challenge: "Tüm <p> elemanlarının yazı rengini rgb(30, 41, 59) yap ve font-size değerini 18px yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<h1>Başlık</h1>\n    <p>Bir paragraf.</p>`) },
      { name: "style.css", content: `/* TODO: p seçicisi ekle */` },
    ],
    checks: [
      { type: "style", selector: "p", property: "color", value: "rgb(30, 41, 59)", label: "p yazı rengi ayarlı" },
      { type: "style", selector: "p", property: "font-size", value: "18px", label: "Font boyutu 18px" },
    ],
  },
  {
    id: "css-23",
    level: 23,
    language: "css",
    title: "Renkleri konuştur",
    description: "color ve background-color ile öğeleri boya.",
    explanation:
      "CSS'te bir öğenin yazı rengini `color`, arka planını `background-color` belirler.\nRenkleri isimle (red), hex (#6366f1) veya rgb() ile yazabilirsin.",
    example: `p {\n  color: white;\n  background-color: #6366f1;\n}`,
    hints: [
      "Seçici olarak .kart sınıfını kullan.",
      "Arka plan için background-color özelliğini yaz.",
      ".kart { background-color: #6366f1; color: white; }",
    ],
    challenge: ".kart sınıfının arka planını #6366f1 (indigo), yazı rengini white yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kart">Merhaba CSS</div>`) },
      { name: "style.css", content: `.kart {\n  padding: 16px;\n  /* TODO: renkleri ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kart", property: "background-color", value: "rgb(99, 102, 241)", label: "Arka plan indigo" },
      { type: "style", selector: ".kart", property: "color", value: "rgb(255, 255, 255)", label: "Yazı rengi beyaz" },
    ],
  },
  {
    id: "css-24",
    level: 24,
    language: "css",
    title: "Sınıf seçicisi",
    description: "Nokta ile başlayan sınıf seçicisini kullan.",
    explanation:
      "Bir HTML elemanına `class=\"isim\"` verirsen, CSS'te `.isim { ... }` yazarak onu seçebilirsin.\nSınıf seçicileri, aynı sınıftaki tüm elemanları aynı anda biçimlendirmeye yarar.",
    example: `.uyari {\n  color: red;\n}`,
    hints: [
      "HTML'de class=\"vurgu\" olan eleman var.",
      "CSS'te .vurgu seçicisini yaz.",
      ".vurgu { font-weight: bold; background-color: rgb(254, 240, 138); }",
    ],
    challenge: ".vurgu sınıfına font-weight: bold ve background-color: rgb(254, 240, 138) ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<p>Normal yazı.</p>\n    <p class="vurgu">Önemli yazı.</p>`) },
      { name: "style.css", content: `/* TODO: .vurgu sınıfını biçimlendir */` },
    ],
    checks: [
      { type: "style", selector: ".vurgu", property: "font-weight", value: "700", label: "Kalın yazı" },
      { type: "style", selector: ".vurgu", property: "background-color", value: "rgb(254, 240, 138)", label: "Arka plan sarı" },
    ],
  },
  {
    id: "css-25",
    level: 25,
    language: "css",
    title: "id seçicisi",
    description: "# ile başlayan id seçicisini kullan.",
    explanation:
      "Bir HTML elemanına `id=\"isim\"` verirsen, CSS'te `#isim { ... }` yazarak onu seçebilirsin.\nid'ler sayfada tek bir elemana özeldir, bu yüzden sınıflardan daha spesifiktir.",
    example: `#header {\n  background-color: black;\n}`,
    hints: [
      "HTML'de id=\"logo\" olan eleman var.",
      "CSS'te #logo seçicisini yaz.",
      "#logo { font-size: 24px; color: rgb(220, 38, 38); }",
    ],
    challenge: "#logo elemanının font-size değerini 24px, color değerini rgb(220, 38, 38) yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div id="logo">CodeQuest</div>`) },
      { name: "style.css", content: `/* TODO: #logo seçicisini biçimlendir */` },
    ],
    checks: [
      { type: "style", selector: "#logo", property: "font-size", value: "24px", label: "Font boyutu 24px" },
      { type: "style", selector: "#logo", property: "color", value: "rgb(220, 38, 38)", label: "Yazı rengi kırmızı" },
    ],
  },
  {
    id: "css-26",
    level: 26,
    language: "css",
    title: "Yazı tipi ve boyutu",
    description: "font-size ve font-family ile yazıyı biçimlendir.",
    explanation:
      "`font-size` yazının boyutunu, `font-family` ise hangi yazı tipinin kullanılacağını belirler.\nBirden fazla font adı virgülle yazılır; tarayıcı ilk bulduğunu kullanır.",
    example: `p {\n  font-size: 18px;\n  font-family: Arial, sans-serif;\n}`,
    hints: [
      ".baslik sınıfını seç.",
      "font-size ve font-family ekle.",
      ".baslik { font-size: 32px; font-family: Arial, sans-serif; }",
    ],
    challenge: ".baslik sınıfının font-size değerini 32px, font-family değerini Arial, sans-serif yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<h1 class="baslik">CodeQuest'e Hoş Geldin</h1>`) },
      { name: "style.css", content: `/* TODO: .baslik biçimlendir */` },
    ],
    checks: [
      { type: "style", selector: ".baslik", property: "font-size", value: "32px", label: "Font boyutu 32px" },
      { type: "style", selector: ".baslik", property: "font-family", value: "Arial, sans-serif", label: "Font ailesi Arial" },
    ],
  },
  {
    id: "css-27",
    level: 27,
    language: "css",
    title: "Kalınlık, eğiklik ve altı çizili",
    description: "font-weight, font-style, text-decoration özelliklerini kullan.",
    explanation:
      "`font-weight` yazının kalınlığını (normal, bold, 700 gibi), `font-style` eğik olup olmadığını (italic), `text-decoration` ise alt çizgi gibi süslemeleri belirler.\nBu üç özellik genellikle birlikte kullanılır.",
    example: `a {\n  font-weight: bold;\n  font-style: italic;\n  text-decoration: underline;\n}`,
    hints: [
      ".not sınıfını seç.",
      "font-style: italic ve text-decoration: underline ekle.",
      ".not { font-style: italic; text-decoration: underline; }",
    ],
    challenge: ".not sınıfının yazısını italic yap ve altını çiz (underline).",
    files: [
      { name: "index.html", readonly: true, content: html(`<p class="not">Bu bir nottur.</p>`) },
      { name: "style.css", content: `/* TODO: .not biçimlendir */` },
    ],
    checks: [
      { type: "style", selector: ".not", property: "font-style", value: "italic", label: "Yazı eğik" },
      { type: "style", selector: ".not", property: "text-decoration", value: "underline", label: "Alt çizgi var" },
    ],
  },
  {
    id: "css-28",
    level: 28,
    language: "css",
    title: "Hizalama ve satır aralığı",
    description: "text-align ve line-height ile metni düzenle.",
    explanation:
      "`text-align` metnin yatay hizasını (left, center, right) belirler.\n`line-height` ise satırlar arasındaki dikey boşluğu ayarlayarak metni daha okunabilir yapar.",
    example: `p {\n  text-align: center;\n  line-height: 1.5;\n}`,
    hints: [
      ".metin sınıfını seç.",
      "text-align: center ekle.",
      ".metin { text-align: center; line-height: 1.8; }",
    ],
    challenge: ".metin sınıfını yatayda ortala (text-align: center) ve line-height değerini 1.8 yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<p class="metin">Uzun bir paragraf metni burada.</p>`) },
      { name: "style.css", content: `/* TODO: .metin biçimlendir */` },
    ],
    checks: [
      { type: "style", selector: ".metin", property: "text-align", value: "center", label: "Metin ortalı" },
      { type: "style", selector: ".metin", property: "line-height", value: "28.8px", label: "Satır aralığı 1.8" },
    ],
  },
  {
    id: "css-29",
    level: 29,
    language: "css",
    title: "Gruplama ve iç içe seçiciler",
    description: "Birden çok seçiciyi virgülle grupla, iç içe elemanları seç.",
    explanation:
      "Aynı stili birden fazla seçiciye uygulamak için virgülle grupla: `h1, h2 { ... }`.\nBir elemanın içindeki başka elemanı seçmek için boşluk kullan: `.kart p` sadece .kart içindeki p'leri seçer.",
    example: `h1, h2 {\n  color: navy;\n}\n\n.kart p {\n  color: gray;\n}`,
    hints: [
      "h1, h2 seçicisini bir kuralda birleştir.",
      ".kart p seçicisiyle sadece kart içindeki paragrafı hedefle.",
      "h1, h2 { color: rgb(30, 64, 175); } .kart p { color: rgb(107, 114, 128); }",
    ],
    challenge: "h1 ve h2'yi gruplayarak color: rgb(30, 64, 175) yap. Ayrıca .kart p seçicisiyle sadece .kart içindeki p'nin rengini rgb(107, 114, 128) yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<h1>Başlık 1</h1>\n    <h2>Başlık 2</h2>\n    <div class="kart">\n      <p>Kart içi paragraf</p>\n    </div>\n    <p>Dışarıdaki paragraf</p>`) },
      { name: "style.css", content: `/* TODO: gruplama ve iç içe seçici ekle */` },
    ],
    checks: [
      { type: "style", selector: "h1", property: "color", value: "rgb(30, 64, 175)", label: "h1 rengi ayarlı" },
      { type: "style", selector: "h2", property: "color", value: "rgb(30, 64, 175)", label: "h2 rengi ayarlı" },
      { type: "style", selector: ".kart p", property: "color", value: "rgb(107, 114, 128)", label: "Kart içi p rengi ayarlı" },
    ],
  },
  {
    id: "css-30",
    level: 30,
    language: "css",
    title: "Box model: padding",
    description: "padding ile içerik ile kenar arasına boşluk koy.",
    explanation:
      "Her HTML elemanı bir kutu (box) gibi düşünülür. `padding`, elemanın içeriği ile kenarlığı arasındaki boşluktur.\nTüm kenarlara aynı değeri vermek için tek sayı yazman yeterli: `padding: 20px;`.",
    example: `.kutu {\n  padding: 20px;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "padding ve background-color özelliklerini ekle.",
      ".kutu { padding: 20px; background-color: rgb(226, 232, 240); }",
    ],
    challenge: ".kutu sınıfına padding: 20px ve background-color: rgb(226, 232, 240) ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">İçerik</div>`) },
      { name: "style.css", content: `.kutu {\n  /* TODO: padding ve arka plan ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "padding", value: "20px", label: "Padding 20px" },
      { type: "style", selector: ".kutu", property: "background-color", value: "rgb(226, 232, 240)", label: "Arka plan rengi ayarlı" },
    ],
  },
  {
    id: "css-31",
    level: 31,
    language: "css",
    title: "margin ile dış boşluk",
    description: "margin ile elemanın dışına boşluk koy.",
    explanation:
      "`margin`, bir elemanın kenarlığı ile diğer elemanlar arasındaki dış boşluktur.\n`padding` içeride, `margin` dışarıda boşluk yaratır. Bu ikisi birlikte box model'i oluşturur.",
    example: `.kutu {\n  margin: 30px;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "margin ve background-color özelliklerini ekle.",
      ".kutu { margin: 30px; background-color: rgb(203, 213, 225); }",
    ],
    challenge: ".kutu sınıfına margin: 30px ve background-color: rgb(203, 213, 225) ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Kutu</div>`) },
      { name: "style.css", content: `.kutu {\n  /* TODO: margin ve arka plan ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "margin", value: "30px", label: "Margin 30px" },
      { type: "style", selector: ".kutu", property: "background-color", value: "rgb(203, 213, 225)", label: "Arka plan rengi ayarlı" },
    ],
  },
  {
    id: "css-32",
    level: 32,
    language: "css",
    title: "Kenarlık ve köşe yuvarlama",
    description: "border ve border-radius ile kenarlık ekle.",
    explanation:
      "`border` bir elemanın etrafına çizgi çizer; kalınlık, stil ve renk sırasıyla yazılır: `border: 2px solid black;`.\n`border-radius` ise köşeleri yuvarlar, büyük değerler daire efekti verir.",
    example: `.kutu {\n  border: 2px solid black;\n  border-radius: 8px;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "border ve border-radius ekle.",
      ".kutu { border: 3px solid rgb(99, 102, 241); border-radius: 12px; }",
    ],
    challenge: ".kutu sınıfına border: 3px solid rgb(99, 102, 241) ve border-radius: 12px ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Kutu</div>`) },
      { name: "style.css", content: `.kutu {\n  padding: 16px;\n  /* TODO: border ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "border-width", value: "3px", label: "Kenarlık kalınlığı 3px" },
      { type: "style", selector: ".kutu", property: "border-color", value: "rgb(99, 102, 241)", label: "Kenarlık rengi indigo" },
      { type: "style", selector: ".kutu", property: "border-radius", value: "12px", label: "Köşeler yuvarlak" },
    ],
  },
  {
    id: "css-33",
    level: 33,
    language: "css",
    title: "Genişlik ve yükseklik",
    description: "width ve height ile elemanın boyutunu belirle.",
    explanation:
      "`width` bir elemanın genişliğini, `height` ise yüksekliğini piksel gibi birimlerle sabitler.\nBoyutları belirlemek, elemanların sayfada ne kadar yer kaplayacağını kontrol etmeni sağlar.",
    example: `.kutu {\n  width: 200px;\n  height: 100px;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "width ve height ekle.",
      ".kutu { width: 200px; height: 100px; }",
    ],
    challenge: ".kutu sınıfına width: 200px ve height: 100px ver.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Kutu</div>`) },
      { name: "style.css", content: `.kutu {\n  background-color: #94a3b8;\n  /* TODO: boyut ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "width", value: "200px", label: "Genişlik 200px" },
      { type: "style", selector: ".kutu", property: "height", value: "100px", label: "Yükseklik 100px" },
    ],
  },
  {
    id: "css-34",
    level: 34,
    language: "css",
    title: "box-sizing: border-box",
    description: "Padding ve border'ı toplam genişliğe dahil et.",
    explanation:
      "Normalde `width` yalnızca içeriğin genişliğidir; padding ve border eklendiğinde kutu daha büyük görünür.\n`box-sizing: border-box` ile padding ve border, belirttiğin width/height'ın içine dahil edilir, boyutlar tahmin edilebilir olur.",
    example: `.kutu {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 20px;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "box-sizing özelliğini border-box yap.",
      ".kutu { box-sizing: border-box; width: 200px; padding: 20px; }",
    ],
    challenge: ".kutu sınıfına box-sizing: border-box, width: 200px ve padding: 20px ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Kutu</div>`) },
      { name: "style.css", content: `.kutu {\n  background-color: #a5b4fc;\n  /* TODO: box-sizing ve boyut ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "box-sizing", value: "border-box", label: "box-sizing border-box" },
      { type: "style", selector: ".kutu", property: "width", value: "200px", label: "Genişlik 200px" },
    ],
  },
  {
    id: "css-35",
    level: 35,
    language: "css",
    title: "display: block, inline, inline-block",
    description: "display özelliğiyle elemanların akış davranışını değiştir.",
    explanation:
      "`display: block` eleman kendi satırını kaplar; `inline` sadece içeriği kadar yer kaplar ve width/height etkisizdir; `inline-block` ise inline gibi yan yana durur ama width/height ayarlanabilir.\nBu özellik, düzen tasarımının temelidir.",
    example: `span {\n  display: inline-block;\n  width: 100px;\n}`,
    hints: [
      ".etiket sınıfını seç.",
      "display: inline-block yap.",
      ".etiket { display: inline-block; width: 120px; }",
    ],
    challenge: ".etiket sınıfına display: inline-block ve width: 120px ver.",
    files: [
      { name: "index.html", readonly: true, content: html(`<span class="etiket">Etiket</span>`) },
      { name: "style.css", content: `/* TODO: .etiket biçimlendir */` },
    ],
    checks: [
      { type: "style", selector: ".etiket", property: "display", value: "inline-block", label: "display inline-block" },
      { type: "style", selector: ".etiket", property: "width", value: "120px", label: "Genişlik 120px" },
    ],
  },
  {
    id: "css-36",
    level: 36,
    language: "css",
    title: "Görünürlük: display: none ve visibility",
    description: "Elemanları gizlemenin iki yolunu öğren.",
    explanation:
      "`display: none` elemanı tamamen sayfadan kaldırır, yer kaplamaz.\n`visibility: hidden` ise elemanı görünmez yapar ama yeri boş olarak kalır. İkisi farklı senaryolarda kullanılır.",
    example: `.gizli {\n  display: none;\n}`,
    hints: [
      ".gizli sınıfını seç, display: none yap.",
      ".saydam sınıfını seç, visibility: hidden yap.",
      ".gizli { display: none; } .saydam { visibility: hidden; }",
    ],
    challenge: ".gizli sınıfına display: none ekle. .saydam sınıfına ise visibility: hidden ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<p>Görünen yazı</p>\n    <p class="gizli">Görünmeyen yazı</p>\n    <p class="saydam">Yer kaplayan görünmez yazı</p>`) },
      { name: "style.css", content: `/* TODO: .gizli ve .saydam sınıflarını gizle */` },
    ],
    checks: [
      { type: "style", selector: ".gizli", property: "display", value: "none", label: "Eleman gizli" },
      { type: "style", selector: ".saydam", property: "visibility", value: "hidden", label: "Eleman görünmez ama yer kaplıyor" },
    ],
  },
  {
    id: "css-37",
    level: 37,
    language: "css",
    title: "Pseudo-class: :hover ve :first-child",
    description: "Fare üzerine gelince ve ilk eleman için özel stil ver.",
    explanation:
      "`:hover` pseudo-class'ı, fare bir elemanın üzerine geldiğinde uygulanacak stili tanımlar.\n`:first-child` ise bir grup içindeki ilk elemanı hedefler. İkisi de seçicinin sonuna eklenir.",
    example: `button:hover {\n  background-color: darkblue;\n}\n\nli:first-child {\n  font-weight: bold;\n}`,
    hints: [
      "button:hover seçicisini yaz.",
      "li:first-child seçicisini ayrı bir kuralda yaz.",
      "button:hover { background-color: rgb(30, 64, 175); } li:first-child { font-weight: bold; }",
    ],
    challenge: "button:hover için background-color: rgb(30, 64, 175) yaz. li:first-child için font-weight: bold yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<button>Tıkla</button>\n    <ul>\n      <li>Birinci</li>\n      <li>İkinci</li>\n    </ul>`) },
      { name: "style.css", content: `/* TODO: hover ve first-child ekle */` },
    ],
    checks: [
      { type: "regex", value: "button\\s*:hover\\s*\\{[^}]*background-color\\s*:\\s*(rgb\\(30,\\s*64,\\s*175\\)|#1e40af)", label: "button:hover kuralı var" },
      { type: "style", selector: "li:first-child", property: "font-weight", value: "700", label: "İlk li kalın" },
    ],
  },
  {
    id: "css-38",
    level: 38,
    language: "css",
    title: "Pseudo-class: :nth-child",
    description: "nth-child ile belirli sıradaki elemanları seç.",
    explanation:
      "`:nth-child(n)` bir grupta belirli sıradaki elemanı seçer. `:nth-child(2)` ikinci elemanı, `:nth-child(odd)` tek sıradakileri seçer.\nListelerde satırları farklı renklendirmek (zebra efekti) için sık kullanılır.",
    example: `li:nth-child(2) {\n  color: red;\n}`,
    hints: [
      "li:nth-child(2) ve li:nth-child(3) seçicilerini yaz.",
      "Her ikisine de color özelliği ekle.",
      "li:nth-child(2) { color: rgb(220, 38, 38); } li:nth-child(3) { color: rgb(21, 128, 61); }",
    ],
    challenge: "Listedeki ikinci li elemanının yazı rengini rgb(220, 38, 38), üçüncü li elemanının yazı rengini rgb(21, 128, 61) yap.",
    files: [
      { name: "index.html", readonly: true, content: html(`<ul>\n      <li>Birinci</li>\n      <li>İkinci</li>\n      <li>Üçüncü</li>\n    </ul>`) },
      { name: "style.css", content: `/* TODO: nth-child ekle */` },
    ],
    checks: [
      { type: "style", selector: "li:nth-child(2)", property: "color", value: "rgb(220, 38, 38)", label: "İkinci li kırmızı" },
      { type: "style", selector: "li:nth-child(3)", property: "color", value: "rgb(21, 128, 61)", label: "Üçüncü li yeşil" },
    ],
  },
  {
    id: "css-39",
    level: 39,
    language: "css",
    title: "Pseudo-element: ::before ve ::after",
    description: "content ile elemandan önce veya sonra içerik ekle.",
    explanation:
      "`::before` ve `::after` pseudo-element'leri, bir elemanın içeriğinden önce veya sonra sanal bir içerik ekler.\nBu içerik `content` özelliğiyle belirtilir ve mutlaka yazılmalıdır, boş bile olsa `content: \"\";`.",
    example: `.kart::before {\n  content: "★ ";\n}`,
    hints: [
      ".kart::before ve .kart::after seçicilerini kullan.",
      "Her ikisine de content özelliği ver.",
      ".kart::before { content: \"🔥 \"; } .kart::after { content: \" ✅\"; }",
    ],
    challenge: ".kart elemanının önüne ::before ile content: \"🔥 \" ekle, sonuna ::after ile content: \" ✅\" ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kart">Popüler ürün</div>`) },
      { name: "style.css", content: `/* TODO: ::before ve ::after ekle */` },
    ],
    checks: [
      { type: "regex", value: "\\.kart::before\\s*\\{[^}]*content\\s*:\\s*[\"'].*[\"']", label: "::before content tanımlı" },
      { type: "regex", value: "\\.kart::after\\s*\\{[^}]*content\\s*:\\s*[\"'].*[\"']", label: "::after content tanımlı" },
    ],
  },
  {
    id: "css-40",
    level: 40,
    language: "css",
    title: "Öznitelik seçicisi",
    description: "Belirli bir HTML özniteliğine göre eleman seç.",
    explanation:
      "Öznitelik seçicisi, bir elemanın belirli bir özniteliğe (attribute) sahip olup olmadığına göre seçim yapar.\n`[type=\"text\"]` yalnızca type özniteliği \"text\" olan elemanları seçer.",
    example: `input[type="text"] {\n  border: 1px solid gray;\n}`,
    hints: [
      "input[type=\"text\"] seçicisini yaz.",
      "border özelliği ekle.",
      "input[type=\"text\"] { border: 2px solid rgb(59, 130, 246); }",
    ],
    challenge: "input[type=\"text\"] seçicisiyle sadece text tipindeki input'a border: 2px solid rgb(59, 130, 246) ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<input type="text" placeholder="Ad" />\n    <input type="checkbox" />`) },
      { name: "style.css", content: `/* TODO: öznitelik seçicisi ekle */` },
    ],
    checks: [
      { type: "style", selector: "input[type=\"text\"]", property: "border-width", value: "2px", label: "Text input kenarlığı 2px" },
      { type: "style", selector: "input[type=\"text\"]", property: "border-color", value: "rgb(59, 130, 246)", label: "Text input kenarlığı mavi" },
    ],
  },
  {
    id: "css-41",
    level: 41,
    language: "css",
    title: "Arka plan resmi ve gradient",
    description: "background-image ile düz renk yerine gradient kullan.",
    explanation:
      "`background-image` normalde bir resim dosyası gösterir, ama `linear-gradient()` fonksiyonuyla renk geçişleri de oluşturabilirsin.\n`linear-gradient(to right, kırmızı, mavi)` soldan sağa kırmızıdan maviye geçen bir arka plan yapar.",
    example: `.kutu {\n  background-image: linear-gradient(to right, red, blue);\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "background-image özelliğine linear-gradient() ver, ayrıca height ekle.",
      ".kutu { background-image: linear-gradient(to right, #6366f1, #ec4899); height: 100px; }",
    ],
    challenge: ".kutu sınıfına background-image: linear-gradient(to right, #6366f1, #ec4899) ve height: 100px ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Gradient kutu</div>`) },
      { name: "style.css", content: `.kutu {\n  /* TODO: gradient ve yükseklik ekle */\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.kutu\\s*\\{[^}]*linear-gradient\\(", label: "linear-gradient kullanıldı" },
      { type: "style", selector: ".kutu", property: "height", value: "100px", label: "Yükseklik 100px" },
    ],
  },
  {
    id: "css-42",
    level: 42,
    language: "css",
    title: "opacity ve rgba",
    description: "Şeffaflık için opacity ve rgba() kullan.",
    explanation:
      "`opacity` bir elemanın tamamının (içeriği dahil) şeffaflığını 0 ile 1 arasında ayarlar.\n`rgba(r, g, b, a)` ise sadece rengin şeffaflığını ayarlar, içerik etkilenmez. `a` değeri 0 (görünmez) ile 1 (opak) arasındadır.",
    example: `.kutu {\n  background-color: rgba(99, 102, 241, 0.5);\n  opacity: 0.9;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "background-color için rgba() kullan.",
      ".kutu { background-color: rgba(99, 102, 241, 0.5); opacity: 0.9; }",
    ],
    challenge: ".kutu sınıfına background-color: rgba(99, 102, 241, 0.5) ve opacity: 0.9 ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Yarı saydam</div>`) },
      { name: "style.css", content: `.kutu {\n  padding: 16px;\n  /* TODO: rgba ve opacity ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "background-color", value: "rgba(99, 102, 241, 0.5)", label: "Arka plan yarı saydam" },
      { type: "style", selector: ".kutu", property: "opacity", value: "0.9", label: "Opacity 0.9" },
    ],
  },
  {
    id: "css-43",
    level: 43,
    language: "css",
    title: "box-shadow",
    description: "Elemanlara gölge ekle.",
    explanation:
      "`box-shadow` bir elemanın etrafına gölge ekler. Sıralama: yatay kayma, dikey kayma, bulanıklık, renk.\nÖrneğin `box-shadow: 0 4px 8px rgba(0,0,0,0.3);` elemana hafif bir alt gölge verir.",
    example: `.kart {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n}`,
    hints: [
      ".kart sınıfını seç.",
      "box-shadow ve background-color özelliklerini ekle.",
      ".kart { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); background-color: white; }",
    ],
    challenge: ".kart sınıfına box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) ve background-color: white ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kart">Gölgeli kart</div>`) },
      { name: "style.css", content: `.kart {\n  padding: 20px;\n  /* TODO: box-shadow ve arka plan ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kart", property: "box-shadow", value: "rgba(0, 0, 0, 0.3) 0px 4px 8px 0px", label: "Gölge var" },
      { type: "style", selector: ".kart", property: "background-color", value: "rgb(255, 255, 255)", label: "Arka plan beyaz" },
    ],
  },
  {
    id: "css-44",
    level: 44,
    language: "css",
    title: "overflow ve text-overflow",
    description: "Taşan içeriği kontrol et.",
    explanation:
      "`overflow: hidden` bir kutunun boyutundan taşan içeriği gizler.\n`text-overflow: ellipsis`, `white-space: nowrap` ile birlikte kullanıldığında taşan metnin sonuna \"...\" ekler.",
    example: `.kutu {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}`,
    hints: [
      ".kutu sınıfını seç, width küçük bir değer olsun.",
      "overflow: hidden ve white-space: nowrap ekle.",
      ".kutu { width: 120px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }",
    ],
    challenge: ".kutu sınıfına width: 120px, overflow: hidden, white-space: nowrap ve text-overflow: ellipsis ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Bu çok uzun bir metin ve sığmayacak</div>`) },
      { name: "style.css", content: `/* TODO: overflow ayarlarını ekle */` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "overflow", value: "hidden", label: "overflow hidden" },
      { type: "style", selector: ".kutu", property: "text-overflow", value: "ellipsis", label: "text-overflow ellipsis" },
    ],
  },
  {
    id: "css-45",
    level: 45,
    language: "css",
    title: "Birim türleri: px, %, em, rem, vh/vw",
    description: "Farklı CSS birimlerini tanı ve kullan.",
    explanation:
      "`px` sabit piksel birimidir. `%` üst elemana göre oran verir. `em` ebeveynin font boyutuna, `rem` ise kök (html) elemanın font boyutuna görecelidir.\n`vh`/`vw` ekran yüksekliği/genişliğinin yüzdesidir; tam ekran bölümleri için kullanışlıdır.",
    example: `.kutu {\n  width: 50%;\n  font-size: 1.5rem;\n  height: 20vh;\n}`,
    hints: [
      ".kutu sınıfını seç.",
      "width için % birimini, font-size için rem birimini kullan.",
      ".kutu { width: 50%; font-size: 1.5rem; height: 20vh; }",
    ],
    challenge: ".kutu sınıfına width: 50%, font-size: 1.5rem ve height: 20vh ekle.",
    files: [
      { name: "index.html", readonly: true, content: html(`<div class="kutu">Farklı birimler</div>`) },
      { name: "style.css", content: `/* TODO: farklı birimlerle boyutlandır */` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "width", value: "50%", label: "Genişlik yüzde 50" },
      { type: "style", selector: ".kutu", property: "font-size", value: "24px", label: "Font boyutu 1.5rem" },
    ],
  },
];
