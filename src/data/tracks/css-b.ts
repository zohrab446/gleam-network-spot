import type { Lesson } from "../types";

const htmlWrap = (body: string) =>
  `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n${body}\n  </body>\n</html>`;

export const CSS_B: Lesson[] = [
  {
    id: "css-46",
    level: 46,
    language: "css",
    title: "position: relative",
    description: "Bir öğeyi normal akışa göre kaydır.",
    explanation:
      "`position: relative` verdiğin bir öğe, kendi normal yerine göre `top`, `left`, `right`, `bottom` ile kaydırılabilir.\nÖğe hâlâ akışta yer kaplar, sadece görsel olarak kayar.",
    example: `.kutu {\n  position: relative;\n  top: 10px;\n  left: 20px;\n}`,
    hints: [
      ".etiket sınıfına position özelliği ver.",
      "position değerini relative yap ve top ile kaydır.",
      ".etiket { position: relative; top: 12px; left: 8px; }",
    ],
    challenge: ".etiket sınıfına position: relative, top: 12px ve left: 8px ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="etiket">Etiket</div>`) },
      { name: "style.css", content: `.etiket {\n  background: #6366f1;\n  color: white;\n  padding: 8px;\n  /* TODO: position ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".etiket", property: "position", value: "relative", label: "position relative" },
      { type: "style", selector: ".etiket", property: "top", value: "12px", label: "top 12px" },
      { type: "style", selector: ".etiket", property: "left", value: "8px", label: "left 8px" },
    ],
  },
  {
    id: "css-47",
    level: 47,
    language: "css",
    title: "position: absolute",
    description: "Bir öğeyi en yakın konumlu ataya göre yerleştir.",
    explanation:
      "`position: absolute` verilen öğe normal akıştan çıkar ve en yakın `position: relative` (ya da absolute/fixed) olan atasına göre konumlanır.\nAta yoksa sayfaya (body) göre konumlanır.",
    example: `.kapsayici {\n  position: relative;\n}\n.rozet {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n}`,
    hints: [
      ".kapsayici zaten relative, .rozet'e absolute ver.",
      "top ve right değerleriyle köşeye yasla.",
      ".rozet { position: absolute; top: 4px; right: 4px; }",
    ],
    challenge: ".rozet sınıfına position: absolute, top: 4px, right: 4px ver.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kapsayici">\n      Kart\n      <span class="rozet">Yeni</span>\n    </div>`) },
      { name: "style.css", content: `.kapsayici {\n  position: relative;\n  width: 200px;\n  height: 100px;\n  background: #e5e7eb;\n}\n.rozet {\n  background: red;\n  color: white;\n  /* TODO: absolute konumlandır */\n}` },
    ],
    checks: [
      { type: "style", selector: ".rozet", property: "position", value: "absolute", label: "position absolute" },
      { type: "style", selector: ".rozet", property: "top", value: "4px", label: "top 4px" },
      { type: "style", selector: ".rozet", property: "right", value: "4px", label: "right 4px" },
    ],
  },
  {
    id: "css-48",
    level: 48,
    language: "css",
    title: "position: fixed / sticky",
    description: "Ekrana sabitlenen ve kayarken yapışan öğeler.",
    explanation:
      "`position: fixed` bir öğeyi sayfa kaydırılsa bile ekranda sabit tutar (örn. üst menü).\n`position: sticky` ise öğe normalde akışta durur, belirli bir noktaya gelince yapışır.",
    example: `.ustmenu {\n  position: fixed;\n  top: 0;\n}\n.yapiskan {\n  position: sticky;\n  top: 0;\n}`,
    hints: [
      ".ustmenu için fixed, .yapiskan için sticky kullan.",
      "İkisine de top: 0 ver.",
      ".ustmenu { position: fixed; top: 0; } .yapiskan { position: sticky; top: 0; }",
    ],
    challenge: ".ustmenu sınıfına position: fixed, .yapiskan sınıfına position: sticky ver, ikisine de top: 0 ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="ustmenu">Menü</div>\n    <div class="yapiskan">Yapışkan Başlık</div>`) },
      { name: "style.css", content: `.ustmenu {\n  background: #111827;\n  color: white;\n  /* TODO: fixed */\n}\n.yapiskan {\n  background: #fbbf24;\n  /* TODO: sticky */\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.ustmenu\\s*\\{[^}]*position\\s*:\\s*fixed", label: ".ustmenu fixed" },
      { type: "regex", value: "\\.yapiskan\\s*\\{[^}]*position\\s*:\\s*sticky", label: ".yapiskan sticky" },
      { type: "regex", value: "top\\s*:\\s*0", label: "top: 0 kullanılmış" },
    ],
  },
  {
    id: "css-49",
    level: 49,
    language: "css",
    title: "z-index",
    description: "Konumlu öğelerin üst üste sıralamasını belirle.",
    explanation:
      "İki öğe üst üste bindiğinde hangisinin önde görüneceğini `z-index` belirler.\n`z-index` sadece `position` değeri static olmayan (relative, absolute, fixed, sticky) öğelerde çalışır.",
    example: `.on {\n  position: relative;\n  z-index: 10;\n}`,
    hints: [
      ".ust sınıfına position relative ver, z-index çalışsın.",
      "z-index değerini .alt'tan büyük yap.",
      ".ust { position: relative; z-index: 5; }",
    ],
    challenge: ".ust sınıfına position: relative ve z-index: 5 ver (bu değer .alt'ın z-index: 1 değerinden büyük olmalı).",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kapsayici">\n      <div class="alt">Alt</div>\n      <div class="ust">Üst</div>\n    </div>`) },
      { name: "style.css", content: `.kapsayici { position: relative; }\n.alt {\n  position: absolute;\n  z-index: 1;\n  background: #ef4444;\n}\n.ust {\n  background: #22c55e;\n  /* TODO: relative + z-index */\n}` },
    ],
    checks: [
      { type: "style", selector: ".ust", property: "position", value: "relative", label: ".ust relative" },
      { type: "style", selector: ".ust", property: "z-index", value: "5", label: "z-index 5" },
    ],
  },
  {
    id: "css-50",
    level: 50,
    language: "css",
    title: "display: flex temeli",
    description: "Flexbox'a giriş: öğeleri yan yana diz.",
    explanation:
      "`display: flex` verdiğin bir kapsayıcının çocukları otomatik olarak yan yana (satır halinde) dizilir.\nBu, kartları, menüleri ve butonları hizalamak için en çok kullanılan yöntemdir.",
    example: `.satir {\n  display: flex;\n}`,
    hints: [
      ".liste sınıfına display özelliği ekle.",
      "Değeri flex yap.",
      ".liste { display: flex; }",
    ],
    challenge: ".liste sınıfına display: flex ver.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="liste">\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n    </div>`) },
      { name: "style.css", content: `.liste {\n  /* TODO: flex yap */\n  background: #f3f4f6;\n}` },
    ],
    checks: [
      { type: "style", selector: ".liste", property: "display", value: "flex", label: "display flex" },
    ],
  },
  {
    id: "css-51",
    level: 51,
    language: "css",
    title: "flex-direction",
    description: "Flex öğelerinin yönünü belirle.",
    explanation:
      "`flex-direction` flex kapsayıcı içindeki öğelerin yönünü belirler: `row` (yan yana, varsayılan) veya `column` (alt alta).\nAyrıca `row-reverse` ve `column-reverse` da vardır.",
    example: `.dikey {\n  display: flex;\n  flex-direction: column;\n}`,
    hints: [
      ".kolon sınıfı zaten flex, flex-direction ekle.",
      "Değeri column yap, öğeler alt alta dizilsin.",
      ".kolon { display: flex; flex-direction: column; }",
    ],
    challenge: ".kolon sınıfına flex-direction: column ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kolon">\n      <div>1</div>\n      <div>2</div>\n    </div>`) },
      { name: "style.css", content: `.kolon {\n  display: flex;\n  /* TODO: column yap */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kolon", property: "flex-direction", value: "column", label: "flex-direction column" },
    ],
  },
  {
    id: "css-52",
    level: 52,
    language: "css",
    title: "justify-content",
    description: "Öğeleri ana eksende hizala.",
    explanation:
      "`justify-content`, flex kapsayıcıdaki öğeleri ana eksen (genelde yatay) boyunca hizalar.\nSık kullanılan değerler: `center`, `space-between`, `space-around`, `flex-end`.",
    example: `.satir {\n  display: flex;\n  justify-content: center;\n}`,
    hints: [
      ".menu sınıfı zaten flex.",
      "justify-content ile öğeleri araya boşluk koyarak dağıt.",
      ".menu { justify-content: space-between; }",
    ],
    challenge: ".menu sınıfına justify-content: space-between ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="menu">\n      <div>Ana Sayfa</div>\n      <div>Hakkımızda</div>\n      <div>İletişim</div>\n    </div>`) },
      { name: "style.css", content: `.menu {\n  display: flex;\n  /* TODO: justify-content ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".menu", property: "justify-content", value: "space-between", label: "justify-content space-between" },
    ],
  },
  {
    id: "css-53",
    level: 53,
    language: "css",
    title: "align-items",
    description: "Öğeleri çapraz eksende hizala.",
    explanation:
      "`align-items`, flex kapsayıcıdaki öğeleri çapraz eksen (genelde dikey) boyunca hizalar.\nSık kullanılan değer `center`, öğeleri dikeyde tam ortalar.",
    example: `.satir {\n  display: flex;\n  align-items: center;\n}`,
    hints: [
      ".kutu sınıfı zaten flex ve yüksekliği var.",
      "align-items ile içeriği dikeyde ortala.",
      ".kutu { align-items: center; }",
    ],
    challenge: ".kutu sınıfına align-items: center ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kutu">\n      <div>İçerik</div>\n    </div>`) },
      { name: "style.css", content: `.kutu {\n  display: flex;\n  height: 100px;\n  background: #e0e7ff;\n  /* TODO: align-items ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kutu", property: "align-items", value: "center", label: "align-items center" },
    ],
  },
  {
    id: "css-54",
    level: 54,
    language: "css",
    title: "gap",
    description: "Flex öğeleri arasına boşluk koy.",
    explanation:
      "`gap` özelliği flex (veya grid) öğeleri arasına eşit boşluk ekler; margin kullanmaya gerek kalmaz.\nTek bir değer verirsen hem satır hem sütun aralarına uygulanır.",
    example: `.satir {\n  display: flex;\n  gap: 16px;\n}`,
    hints: [
      ".kartlar sınıfı zaten flex.",
      "gap özelliği ile öğeler arasına boşluk koy.",
      ".kartlar { gap: 16px; }",
    ],
    challenge: ".kartlar sınıfına gap: 16px ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kartlar">\n      <div>Kart 1</div>\n      <div>Kart 2</div>\n    </div>`) },
      { name: "style.css", content: `.kartlar {\n  display: flex;\n  /* TODO: gap ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".kartlar", property: "gap", value: "16px", label: "gap 16px" },
    ],
  },
  {
    id: "css-55",
    level: 55,
    language: "css",
    title: "flex-wrap",
    description: "Sığmayan öğelerin alt satıra kaymasını sağla.",
    explanation:
      "Varsayılan olarak flex öğeleri tek satıra sığmaya çalışır ve küçülür.\n`flex-wrap: wrap` verirsen sığmayan öğeler otomatik olarak alt satıra geçer.",
    example: `.satir {\n  display: flex;\n  flex-wrap: wrap;\n}`,
    hints: [
      ".galeri sınıfı zaten flex.",
      "flex-wrap özelliğini wrap yap.",
      ".galeri { flex-wrap: wrap; }",
    ],
    challenge: ".galeri sınıfına flex-wrap: wrap ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="galeri">\n      <div>1</div><div>2</div><div>3</div><div>4</div>\n    </div>`) },
      { name: "style.css", content: `.galeri {\n  display: flex;\n  /* TODO: wrap ekle */\n}\n.galeri div {\n  width: 150px;\n  height: 100px;\n  background: #a5b4fc;\n}` },
    ],
    checks: [
      { type: "style", selector: ".galeri", property: "flex-wrap", value: "wrap", label: "flex-wrap wrap" },
    ],
  },
  {
    id: "css-56",
    level: 56,
    language: "css",
    title: "flex: 1 / flex-grow",
    description: "Bir öğenin boşluğu büyütmesini sağla.",
    explanation:
      "`flex-grow` bir flex öğesinin boş alanı ne kadar büyüteceğini belirler; `flex: 1` kısayolu `flex-grow: 1` demektir.\nBu sayede öğe kalan tüm boşluğu doldurur.",
    example: `.buyuyen {\n  flex: 1;\n}`,
    hints: [
      ".orta sınıfı flex kapsayıcı içinde.",
      "flex özelliğini 1 yap, kalan alanı doldursun.",
      ".orta { flex: 1; }",
    ],
    challenge: ".orta sınıfına flex: 1 ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="satir">\n      <div class="sol">Sol</div>\n      <div class="orta">Orta</div>\n      <div class="sag">Sağ</div>\n    </div>`) },
      { name: "style.css", content: `.satir {\n  display: flex;\n}\n.sol, .sag {\n  width: 50px;\n  background: #d1d5db;\n}\n.orta {\n  background: #93c5fd;\n  /* TODO: flex: 1 ekle */\n}` },
    ],
    checks: [
      { type: "style", selector: ".orta", property: "flex-grow", value: "1", label: "flex-grow 1" },
    ],
  },
  {
    id: "css-57",
    level: 57,
    language: "css",
    title: "display: grid ve grid-template-columns",
    description: "Grid düzeniyle sütunlar oluştur.",
    explanation:
      "`display: grid`, bir kapsayıcıyı satır ve sütunlardan oluşan bir ızgaraya çevirir.\n`grid-template-columns` ile kaç sütun olacağını ve genişliklerini belirlersin.",
    example: `.izgara {\n  display: grid;\n  grid-template-columns: 100px 100px 100px;\n}`,
    hints: [
      ".izgara sınıfına display: grid ver.",
      "grid-template-columns ile 3 eşit sütun tanımla (örn. 1fr 1fr 1fr).",
      ".izgara { display: grid; grid-template-columns: 1fr 1fr 1fr; }",
    ],
    challenge: ".izgara sınıfına display: grid ve grid-template-columns: 1fr 1fr 1fr ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="izgara">\n      <div>1</div><div>2</div><div>3</div>\n    </div>`) },
      { name: "style.css", content: `.izgara {\n  /* TODO: grid ve sütunlar */\n}` },
    ],
    checks: [
      { type: "style", selector: ".izgara", property: "display", value: "grid", label: "display grid" },
      { type: "regex", value: "grid-template-columns\\s*:\\s*1fr\\s+1fr\\s+1fr", label: "3 eşit sütun tanımlı" },
    ],
  },
  {
    id: "css-58",
    level: 58,
    language: "css",
    title: "grid gap ve repeat()",
    description: "Grid sütunlarını repeat() ile kısalt.",
    explanation:
      "`repeat(3, 1fr)`, `1fr 1fr 1fr` yazmanın kısa yoludur; tekrar sayısı ve genişliği belirtir.\nGrid öğeleri arasına boşluk koymak için yine `gap` kullanılır.",
    example: `.izgara {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}`,
    hints: [
      ".izgara sınıfına grid-template-columns için repeat(4, 1fr) kullan.",
      "gap ile öğeler arasına 10px boşluk koy.",
      ".izgara { grid-template-columns: repeat(4, 1fr); gap: 10px; }",
    ],
    challenge: ".izgara sınıfında grid-template-columns: repeat(4, 1fr) ve gap: 10px kullan.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="izgara">\n      <div>1</div><div>2</div><div>3</div><div>4</div>\n    </div>`) },
      { name: "style.css", content: `.izgara {\n  display: grid;\n  /* TODO: repeat ve gap */\n}` },
    ],
    checks: [
      { type: "regex", value: "grid-template-columns\\s*:\\s*repeat\\(\\s*4\\s*,\\s*1fr\\s*\\)", label: "repeat(4, 1fr) kullanılmış" },
      { type: "style", selector: ".izgara", property: "gap", value: "10px", label: "gap 10px" },
    ],
  },
  {
    id: "css-59",
    level: 59,
    language: "css",
    title: "grid-column span",
    description: "Bir öğenin birden fazla sütun kaplamasını sağla.",
    explanation:
      "`grid-column: span 2` ile bir grid öğesi normalde 1 sütun yerine 2 sütun genişliğinde yer kaplar.\nBu, öne çıkan bir kartı büyütmek için kullanılır.",
    example: `.buyuk {\n  grid-column: span 2;\n}`,
    hints: [
      ".oncikan öğesi grid içinde, grid-column ekle.",
      "span 2 kullanarak 2 sütun kaplasın.",
      ".oncikan { grid-column: span 2; }",
    ],
    challenge: ".oncikan sınıfına grid-column: span 2 ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="izgara">\n      <div class="oncikan">Öne Çıkan</div>\n      <div>2</div>\n      <div>3</div>\n    </div>`) },
      { name: "style.css", content: `.izgara {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n}\n.oncikan {\n  background: #fde68a;\n  /* TODO: span 2 */\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.oncikan\\s*\\{[^}]*grid-column\\s*:\\s*span\\s*2", label: "grid-column: span 2" },
    ],
  },
  {
    id: "css-60",
    level: 60,
    language: "css",
    title: "grid-template-areas",
    description: "Alanlara isim vererek sayfa düzeni kur.",
    explanation:
      "`grid-template-areas` ile grid hücrelerine isim verip metinsel bir harita çizebilirsin (örn. header, sidebar, content).\nHer öğeye `grid-area` ile hangi alanda olacağı söylenir.",
    example: `.sayfa {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar content";\n}\n.baslik { grid-area: header; }`,
    hints: [
      ".sayfa sınıfına grid-template-areas ekle: header üstte tam genişlik, altta sidebar ve content.",
      "Her alt öğeye grid-area ile ismini ver (header, sidebar, content).",
      '.sayfa { grid-template-areas: "header header" "sidebar content"; }',
    ],
    challenge: '.sayfa sınıfına grid-template-areas ile "header header" / "sidebar content" düzenini tanımla ve .baslik, .yan, .icerik öğelerine grid-area ver.',
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="sayfa">\n      <div class="baslik">Başlık</div>\n      <div class="yan">Yan Menü</div>\n      <div class="icerik">İçerik</div>\n    </div>`) },
      { name: "style.css", content: `.sayfa {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n  /* TODO: grid-template-areas */\n}\n.baslik { /* TODO */ }\n.yan { /* TODO */ }\n.icerik { /* TODO */ }` },
    ],
    checks: [
      { type: "regex", value: "grid-template-areas\\s*:\\s*\\n?\\s*[\"']header\\s+header[\"']\\s*\\n?\\s*[\"']sidebar\\s+content[\"']", label: "grid-template-areas doğru tanımlı" },
      { type: "regex", value: "\\.baslik\\s*\\{[^}]*grid-area\\s*:\\s*header", label: ".baslik grid-area: header" },
      { type: "regex", value: "\\.yan\\s*\\{[^}]*grid-area\\s*:\\s*sidebar", label: ".yan grid-area: sidebar" },
    ],
  },
  {
    id: "css-61",
    level: 61,
    language: "css",
    title: "transition",
    description: "Değişimleri yumuşat.",
    explanation:
      "`transition`, bir CSS özelliği değiştiğinde bu değişimin anlık değil, belirli bir sürede yumuşakça gerçekleşmesini sağlar.\nÖrneğin `:hover` ile renk değişirken bunu yumuşatabilirsin.",
    example: `.buton {\n  background: #6366f1;\n  transition: background 0.3s;\n}\n.buton:hover {\n  background: #4338ca;\n}`,
    hints: [
      ".buton sınıfına transition özelliği ekle.",
      "background özelliği 0.3 saniyede geçiş yapsın.",
      ".buton { transition: background 0.3s; }",
    ],
    challenge: ".buton sınıfına transition: background 0.3s ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <button class="buton">Tıkla</button>`) },
      { name: "style.css", content: `.buton {\n  background: #6366f1;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  /* TODO: transition ekle */\n}\n.buton:hover {\n  background: #4338ca;\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.buton\\s*\\{[^}]*transition\\s*:\\s*background\\s+0\\.3s", label: "transition: background 0.3s" },
    ],
  },
  {
    id: "css-62",
    level: 62,
    language: "css",
    title: "transform: translate/rotate/scale",
    description: "Öğeleri kaydır, döndür ve büyüt.",
    explanation:
      "`transform` özelliğiyle bir öğeyi akışı bozmadan hareket ettirebilirsin: `translate()` kaydırır, `rotate()` döndürür, `scale()` büyütür/küçültür.\nBirden fazlasını boşlukla ayırarak birlikte kullanabilirsin.",
    example: `.kutu {\n  transform: rotate(10deg) scale(1.1);\n}`,
    hints: [
      ".kart sınıfına transform özelliği ekle.",
      "rotate(5deg) ve scale(1.05) birlikte kullan.",
      ".kart { transform: rotate(5deg) scale(1.05); }",
    ],
    challenge: ".kart sınıfına transform: rotate(5deg) scale(1.05) ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kart">Kart</div>`) },
      { name: "style.css", content: `.kart {\n  background: #34d399;\n  padding: 20px;\n  /* TODO: transform ekle */\n}` },
    ],
    checks: [
      { type: "regex", value: "\\.kart\\s*\\{[^}]*transform\\s*:\\s*rotate\\(5deg\\)\\s*scale\\(1\\.05\\)", label: "transform doğru tanımlı" },
    ],
  },
  {
    id: "css-63",
    level: 63,
    language: "css",
    title: "@keyframes ve animation",
    description: "Kendi animasyonunu tanımla.",
    explanation:
      "`@keyframes` ile bir animasyonun adımlarını (from/to veya yüzdeler) tanımlarsın.\nSonra `animation` özelliğiyle bu animasyonu bir öğeye uygularsın.",
    example: `@keyframes yanip-son {\n  from { opacity: 1; }\n  to { opacity: 0; }\n}\n.uyari {\n  animation: yanip-son 1s infinite;\n}`,
    hints: [
      "@keyframes ile 'buyu' adında bir animasyon tanımla (from scale(1), to scale(1.2)).",
      ".rozet sınıfına animation özelliğiyle bu animasyonu bağla.",
      "@keyframes buyu { from { transform: scale(1); } to { transform: scale(1.2); } } .rozet { animation: buyu 1s infinite; }",
    ],
    challenge: "@keyframes buyu adında bir animasyon tanımla (from scale(1) - to scale(1.2)) ve .rozet sınıfına animation: buyu 1s infinite ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="rozet">★</div>`) },
      { name: "style.css", content: `/* TODO: @keyframes buyu tanımla */\n.rozet {\n  display: inline-block;\n  /* TODO: animation ekle */\n}` },
    ],
    checks: [
      { type: "regex", value: "@keyframes\\s+buyu\\s*\\{[^}]*from[^}]*\\}[^}]*to[^}]*\\}", label: "@keyframes buyu tanımlı" },
      { type: "regex", value: "\\.rozet\\s*\\{[^}]*animation\\s*:\\s*buyu\\s+1s\\s+infinite", label: "animation: buyu 1s infinite" },
    ],
  },
  {
    id: "css-64",
    level: 64,
    language: "css",
    title: "animation özellikleri",
    description: "Süre, tekrar ve hız eğrisini ayarla.",
    explanation:
      "`animation-duration` süreyi, `animation-iteration-count` kaç kez tekrarlanacağını, `animation-timing-function` hızlanma eğrisini belirler.\nBunları tek tek yazabilir ya da `animation` kısayoluyla birleştirebilirsin.",
    example: `.dogru {\n  animation-name: don;\n  animation-duration: 2s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}`,
    hints: [
      "@keyframes don ile transform: rotate(0deg) -> rotate(360deg) tanımla.",
      ".carkı sınıfına animation-name, animation-duration, animation-iteration-count ve animation-timing-function ekle.",
      "animation-name: don; animation-duration: 2s; animation-iteration-count: infinite; animation-timing-function: linear;",
    ],
    challenge: "@keyframes don tanımla (from rotate(0deg), to rotate(360deg)) ve .cark sınıfına animation-name: don, animation-duration: 2s, animation-iteration-count: infinite, animation-timing-function: linear ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="cark">⚙</div>`) },
      { name: "style.css", content: `/* TODO: @keyframes don */\n.cark {\n  display: inline-block;\n  font-size: 40px;\n  /* TODO: animation özellikleri */\n}` },
    ],
    checks: [
      { type: "regex", value: "@keyframes\\s+don\\s*\\{[^}]*from[^}]*rotate\\(0deg\\)[^}]*\\}[^}]*to[^}]*rotate\\(360deg\\)", label: "@keyframes don doğru" },
      { type: "regex", value: "animation-duration\\s*:\\s*2s", label: "animation-duration 2s" },
      { type: "regex", value: "animation-iteration-count\\s*:\\s*infinite", label: "animation-iteration-count infinite" },
      { type: "regex", value: "animation-timing-function\\s*:\\s*linear", label: "animation-timing-function linear" },
    ],
  },
  {
    id: "css-65",
    level: 65,
    language: "css",
    title: "@media sorguları",
    description: "Ekran genişliğine göre stil değiştir.",
    explanation:
      "`@media` sorguları, ekran genişliği gibi koşullara göre farklı CSS kuralları uygulamanı sağlar.\n`@media (max-width: 600px) { ... }` içindeki kurallar sadece ekran 600px veya daha darsa çalışır.",
    example: `.kutu {\n  background: blue;\n}\n@media (max-width: 600px) {\n  .kutu {\n    background: red;\n  }\n}`,
    hints: [
      ".baslik için normal font-size belirle.",
      "@media (max-width: 600px) içinde .baslik için daha küçük font-size tanımla.",
      "@media (max-width: 600px) { .baslik { font-size: 16px; } }",
    ],
    challenge: ".baslik sınıfının normal font-size'ı 24px olsun; @media (max-width: 600px) içinde font-size: 16px olarak değişsin.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <h1 class="baslik">Başlık</h1>`) },
      { name: "style.css", content: `.baslik {\n  font-size: 24px;\n}\n/* TODO: @media (max-width: 600px) içinde font-size küçült */` },
    ],
    checks: [
      { type: "style", selector: ".baslik", property: "font-size", value: "24px", label: "normalde font-size 24px" },
      { type: "regex", value: "@media\\s*\\([^)]*max-width\\s*:\\s*600px\\)\\s*\\{[^}]*\\.baslik\\s*\\{[^}]*font-size\\s*:\\s*16px", label: "@media içinde font-size 16px" },
    ],
  },
  {
    id: "css-66",
    level: 66,
    language: "css",
    title: "Mobil tek sütun kart",
    description: "Küçük ekranda kartları alt alta diz.",
    explanation:
      "Geniş ekranda kartları yan yana (row) dizip, dar ekranda `@media` ile `flex-direction: column` yaparak alt alta dizebilirsin.\nBu, responsive tasarımın en temel numaralarından biridir.",
    example: `.kartlar {\n  display: flex;\n  flex-direction: row;\n}\n@media (max-width: 600px) {\n  .kartlar {\n    flex-direction: column;\n  }\n}`,
    hints: [
      ".kartlar sınıfı geniş ekranda flex-direction: row olsun.",
      "@media (max-width: 600px) içinde .kartlar için flex-direction: column tanımla.",
      "@media (max-width: 600px) { .kartlar { flex-direction: column; } }",
    ],
    challenge: ".kartlar sınıfı normalde flex-direction: row olsun; @media (max-width: 600px) içinde flex-direction: column olsun.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kartlar">\n      <div>Kart 1</div>\n      <div>Kart 2</div>\n    </div>`) },
      { name: "style.css", content: `.kartlar {\n  display: flex;\n  flex-direction: row;\n}\n/* TODO: @media ile küçük ekranda column yap */` },
    ],
    checks: [
      { type: "style", selector: ".kartlar", property: "flex-direction", value: "row", label: "normalde row" },
      { type: "regex", value: "@media\\s*\\([^)]*max-width\\s*:\\s*600px\\)\\s*\\{[^}]*\\.kartlar\\s*\\{[^}]*flex-direction\\s*:\\s*column", label: "@media içinde flex-direction: column" },
    ],
  },
  {
    id: "css-67",
    level: 67,
    language: "css",
    title: "CSS değişkenleri",
    description: "Tekrar eden değerleri değişkende sakla.",
    explanation:
      "CSS değişkenleri `--isim: değer;` şeklinde tanımlanır ve `var(--isim)` ile kullanılır.\nBir rengi bir kere tanımlayıp birçok yerde kullanmanı sağlar; değiştirmek istediğinde tek yerden değiştirirsin.",
    example: `:root {\n  --ana-renk: #6366f1;\n}\n.buton {\n  background: var(--ana-renk);\n}`,
    hints: [
      ".kutu sınıfı içinde --vurgu adında bir değişken tanımla.",
      "background özelliğinde var(--vurgu) kullan.",
      ".kutu { --vurgu: #f43f5e; background: var(--vurgu); }",
    ],
    challenge: ".kutu sınıfı içinde --vurgu: #f43f5e değişkenini tanımla ve background: var(--vurgu) ile kullan.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kutu">Kutu</div>`) },
      { name: "style.css", content: `.kutu {\n  padding: 20px;\n  /* TODO: --vurgu değişkenini tanımla ve kullan */\n}` },
    ],
    checks: [
      { type: "regex", value: "--vurgu\\s*:\\s*#f43f5e", label: "--vurgu değişkeni tanımlı" },
      { type: "regex", value: "background(-color)?\\s*:\\s*var\\(\\s*--vurgu\\s*\\)", label: "var(--vurgu) kullanılmış" },
    ],
  },
  {
    id: "css-68",
    level: 68,
    language: "css",
    title: ":root ve tema değişkenleri",
    description: "Tüm sayfa için geçerli tema değişkenleri tanımla.",
    explanation:
      "`:root` seçicisi tüm belgeyi temsil eder; buraya tanımlanan değişkenler her yerde `var()` ile kullanılabilir.\nBu, tutarlı bir tema (renk paleti, boşluklar) oluşturmanın standart yoludur.",
    example: `:root {\n  --bg: #f9fafb;\n  --text: #111827;\n}\nbody {\n  background: var(--bg);\n  color: var(--text);\n}`,
    hints: [
      ":root içinde --ana-renk ve --arka-plan değişkenlerini tanımla.",
      ".sayfa sınıfında bu değişkenleri var() ile kullan.",
      ":root { --ana-renk: #6366f1; --arka-plan: #f9fafb; } .sayfa { color: var(--ana-renk); background: var(--arka-plan); }",
    ],
    challenge: ":root içinde --ana-renk: #6366f1 ve --arka-plan: #f9fafb tanımla; .sayfa sınıfında color: var(--ana-renk) ve background: var(--arka-plan) kullan.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="sayfa">Merhaba Tema</div>`) },
      { name: "style.css", content: `/* TODO: :root içinde değişkenleri tanımla */\n.sayfa {\n  padding: 20px;\n  /* TODO: değişkenleri kullan */\n}` },
    ],
    checks: [
      { type: "regex", value: ":root\\s*\\{[^}]*--ana-renk\\s*:\\s*#6366f1[^}]*--arka-plan\\s*:\\s*#f9fafb", label: ":root içinde değişkenler tanımlı" },
      { type: "regex", value: "\\.sayfa\\s*\\{[^}]*color\\s*:\\s*var\\(\\s*--ana-renk\\s*\\)[^}]*background(-color)?\\s*:\\s*var\\(\\s*--arka-plan\\s*\\)", label: ".sayfa değişkenleri kullanıyor" },
    ],
  },
  {
    id: "css-69",
    level: 69,
    language: "css",
    title: "Responsive görsel",
    description: "Görselleri kapsayıcıya sığdır.",
    explanation:
      "`max-width: 100%` bir görselin kapsayıcısından taşmasını engeller, ekran küçüldükçe görsel de küçülür.\n`object-fit: cover` ise görselin oranını bozmadan alanı doldurmasını sağlar.",
    example: `img {\n  max-width: 100%;\n  height: 200px;\n  object-fit: cover;\n}`,
    hints: [
      ".foto sınıfına max-width: 100% ekle, taşmasın.",
      "height sabit, object-fit: cover ile oranı koru.",
      ".foto { max-width: 100%; height: 200px; object-fit: cover; }",
    ],
    challenge: ".foto sınıfına max-width: 100%, height: 200px ve object-fit: cover ekle.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kapsayici">\n      <img class="foto" src="https://picsum.photos/600/400" alt="Örnek" />\n    </div>`) },
      { name: "style.css", content: `.kapsayici {\n  width: 300px;\n}\n.foto {\n  /* TODO: responsive görsel */\n}` },
    ],
    checks: [
      { type: "style", selector: ".foto", property: "max-width", value: "100%", label: "max-width 100%" },
      { type: "style", selector: ".foto", property: "height", value: "200px", label: "height 200px" },
      { type: "style", selector: ".foto", property: "object-fit", value: "cover", label: "object-fit cover" },
    ],
  },
  {
    id: "css-70",
    level: 70,
    language: "css",
    title: "Final: kart bileşeni",
    description: "Öğrendiklerini birleştirerek gerçek bir kart tasarla.",
    explanation:
      "Şimdiye kadar öğrendiğin flexbox, gölge, köşe yuvarlama ve geçişleri birleştirerek gerçek bir ürün kartı yapacaksın.\nBu, gerçek projelerde çok sık karşılaşacağın bir bileşendir.",
    example: `.kart {\n  display: flex;\n  flex-direction: column;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n  transition: transform 0.2s;\n}\n.kart:hover {\n  transform: scale(1.03);\n}`,
    hints: [
      ".kart sınıfını display: flex, flex-direction: column yap; border-radius: 12px ve box-shadow ekle.",
      "transition: transform 0.2s ekle, :hover içinde transform: scale(1.03) tanımla.",
      ".kart { display: flex; flex-direction: column; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; } .kart:hover { transform: scale(1.03); }",
    ],
    challenge: ".kart sınıfına display: flex, flex-direction: column, border-radius: 12px, box-shadow ve transition: transform 0.2s ekle; .kart:hover içinde transform: scale(1.03) tanımla.",
    files: [
      { name: "index.html", readonly: true, content: htmlWrap(`    <div class="kart">\n      <h3>Ürün Adı</h3>\n      <p>Kısa açıklama</p>\n    </div>`) },
      { name: "style.css", content: `.kart {\n  padding: 16px;\n  background: white;\n  /* TODO: flex + radius + shadow + transition */\n}\n/* TODO: .kart:hover */` },
    ],
    checks: [
      { type: "style", selector: ".kart", property: "display", value: "flex", label: "display flex" },
      { type: "style", selector: ".kart", property: "flex-direction", value: "column", label: "flex-direction column" },
      { type: "style", selector: ".kart", property: "border-radius", value: "12px", label: "border-radius 12px" },
      { type: "regex", value: "\\.kart:hover\\s*\\{[^}]*transform\\s*:\\s*scale\\(1\\.03\\)", label: ".kart:hover transform scale(1.03)" },
    ],
  },
];
