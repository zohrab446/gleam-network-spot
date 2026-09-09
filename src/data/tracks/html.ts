import type { Lesson } from "../types";

export const HTML_LESSONS: Lesson[] = [
  {
    id: "html-1",
    level: 1,
    language: "html",
    title: "HTML iskeleti",
    description: "Her HTML sayfasının temel yapısını oluştur.",
    explanation:
      "Her HTML sayfası `<!DOCTYPE html>` ile başlar; bu tarayıcıya belgenin türünü söyler.\n`<html>` tüm sayfayı sarar, içinde `<head>` (görünmeyen bilgiler) ve `<body>` (görünen içerik) bulunur.\n`<title>` sekmede görünen başlıktır ve `<head>` içine yazılır.",
    example: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Örnek Sayfa</title>\n  </head>\n  <body>\n    Merhaba\n  </body>\n</html>`,
    hints: [
      "Dosyayı <!DOCTYPE html> ile başlat.",
      "html etiketinin içine head ve body ekle.",
      "<title>CodeQuest</title> satırını head içine yaz.",
    ],
    challenge: "Bir HTML iskeleti oluştur: DOCTYPE, html, head (içinde title 'CodeQuest' olan), ve boş bir body.",
    files: [
      {
        name: "index.html",
        content: `<!-- TODO: DOCTYPE, html, head, title ve body ekle -->\n`,
      },
    ],
    checks: [
      { type: "dom", selector: "title", label: "<title> etiketi var", text: "CodeQuest" },
      { type: "dom", selector: "body", label: "<body> etiketi var", count: 1 },
    ],
  },
  {
    id: "html-2",
    level: 2,
    language: "html",
    title: "Başlık hiyerarşisi",
    description: "h1'den h6'ya kadar başlık etiketlerini kullan.",
    explanation:
      "Başlıklar `<h1>` (en büyük/önemli) ile `<h6>` (en küçük) arasında sıralanır.\nBir sayfada genelde tek bir `<h1>` bulunur, alt başlıklar için `<h2>`, `<h3>` kullanılır.",
    example: `<h1>Ana Başlık</h1>\n<h2>Alt Başlık</h2>\n<h3>Daha Küçük Başlık</h3>`,
    hints: [
      "body içine h1 etiketi ekle.",
      "h1'in altına bir de h2 ekle.",
      "<h1>Merhaba</h1><h2>Alt Başlık</h2>",
    ],
    challenge: "body içine metni 'Merhaba' olan bir <h1> ve metni 'Alt Başlık' olan bir <h2> ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Başlıklar</title>\n  </head>\n  <body>\n    <!-- TODO: h1 ve h2 ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "h1", label: "<h1> 'Merhaba' içeriyor", text: "Merhaba" },
      { type: "dom", selector: "h2", label: "<h2> 'Alt Başlık' içeriyor", text: "Alt Başlık" },
    ],
  },
  {
    id: "html-3",
    level: 3,
    language: "html",
    title: "Paragraf ve vurgu",
    description: "Paragraf ve metin biçimlendirme etiketlerini öğren.",
    explanation:
      "`<p>` etiketi bir paragrafı temsil eder.\n`<strong>` metni kalın gösterir ve önemli olduğunu belirtir, `<em>` ise vurguyu belirtmek için metni italik gösterir.",
    example: `<p>Bu bir <strong>önemli</strong> ve <em>vurgulu</em> paragraftır.</p>`,
    hints: [
      "body içine bir <p> etiketi ekle.",
      "İçinde <strong> ile bir kelimeyi kalınlaştır.",
      "<p>Bu <strong>güçlü</strong> bir cümledir.</p>",
    ],
    challenge: "İçinde 'güçlü' kelimesi <strong> ile vurgulanmış bir <p> etiketi ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Paragraf</title>\n  </head>\n  <body>\n    <!-- TODO: p ve strong ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "p", label: "<p> etiketi var", count: 1 },
      { type: "dom", selector: "p strong", label: "<strong> 'güçlü' içeriyor", text: "güçlü" },
    ],
  },
  {
    id: "html-4",
    level: 4,
    language: "html",
    title: "Bağlantı ekle",
    description: "<a href> ile başka bir sayfaya bağlantı ver.",
    explanation:
      "`<a>` etiketi bağlantı (link) oluşturur. `href` özelliği bağlantının gittiği adresi belirtir.\nÖrneğin `<a href=\"https://example.com\">Git</a>` tıklanınca example.com'a götürür.",
    example: `<a href="https://codequest.dev">CodeQuest'e Git</a>`,
    hints: [
      "body içine bir <a> etiketi ekle.",
      "href özelliğine bir adres yaz.",
      '<a href="https://example.com">Örnek</a>',
    ],
    challenge: "href değeri 'https://example.com' olan ve metni 'Örnek' olan bir <a> etiketi ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Bağlantı</title>\n  </head>\n  <body>\n    <!-- TODO: a etiketi ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "a", label: "<a> etiketi 'Örnek' içeriyor", text: "Örnek" },
      { type: "dom", selector: "a", label: "href doğru", attr: "href", attrValue: "https://example.com" },
    ],
  },
  {
    id: "html-5",
    level: 5,
    language: "html",
    title: "Görsel ekle",
    description: "<img> etiketi ile bir resim göster.",
    explanation:
      "`<img>` etiketi bir görsel gösterir ve kapanış etiketi yoktur.\n`src` görselin adresini, `alt` ise görsel yüklenmezse gösterilecek açıklamayı belirtir. `alt` erişilebilirlik için önemlidir.",
    example: `<img src="https://placehold.co/200x120" alt="Örnek görsel">`,
    hints: [
      "body içine <img> etiketi ekle.",
      "src özelliğine verilen adresi yaz.",
      '<img src="https://placehold.co/200x120" alt="kedi">',
    ],
    challenge: "src değeri 'https://placehold.co/200x120', alt değeri 'kedi' olan bir <img> ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Görsel</title>\n  </head>\n  <body>\n    <!-- TODO: img ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "img", label: "<img> src doğru", attr: "src", attrValue: "https://placehold.co/200x120" },
      { type: "dom", selector: "img", label: "<img> alt doğru", attr: "alt", attrValue: "kedi" },
    ],
  },
  {
    id: "html-6",
    level: 6,
    language: "html",
    title: "Sırasız liste",
    description: "<ul> ve <li> ile madde listesi yap.",
    explanation:
      "`<ul>` sırasız (madde işaretli) bir liste oluşturur.\nHer madde `<li>` etiketiyle yazılır. `<ul>` içinde en az bir `<li>` olmalıdır.",
    example: `<ul>\n  <li>Elma</li>\n  <li>Armut</li>\n</ul>`,
    hints: [
      "body içine bir <ul> ekle.",
      "İçine iki tane <li> ekle.",
      "<ul><li>Kalem</li><li>Defter</li></ul>",
    ],
    challenge: "İçinde 'Kalem' ve 'Defter' maddeleri olan bir <ul> listesi oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Liste</title>\n  </head>\n  <body>\n    <!-- TODO: ul ve li ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "ul li", label: "En az 2 <li> var", count: 2 },
      { type: "dom", selector: "ul", label: "Liste 'Kalem' içeriyor", text: "Kalem" },
    ],
  },
  {
    id: "html-7",
    level: 7,
    language: "html",
    title: "Sıralı liste",
    description: "<ol> ile numaralı liste oluştur.",
    explanation:
      "`<ol>` sıralı (numaralandırılmış) bir liste oluşturur; tarayıcı otomatik olarak 1, 2, 3 diye numaralar.\nİçinde yine `<li>` etiketleri kullanılır, tıpkı `<ul>` gibi.",
    example: `<ol>\n  <li>Uyan</li>\n  <li>Kahvaltı yap</li>\n</ol>`,
    hints: [
      "body içine bir <ol> ekle.",
      "İçine sırayla üç adım için <li> ekle.",
      "<ol><li>Başla</li><li>Devam et</li><li>Bitir</li></ol>",
    ],
    challenge: "İçinde 'Başla', 'Devam et', 'Bitir' maddeleri olan bir <ol> listesi oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Sıralı Liste</title>\n  </head>\n  <body>\n    <!-- TODO: ol ve li ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "ol li", label: "3 tane <li> var", count: 3 },
      { type: "dom", selector: "ol", label: "Liste 'Bitir' içeriyor", text: "Bitir" },
    ],
  },
  {
    id: "html-8",
    level: 8,
    language: "html",
    title: "Açıklama listesi",
    description: "<dl>, <dt> ve <dd> ile terim-açıklama listesi yap.",
    explanation:
      "`<dl>` bir açıklama listesi oluşturur; terimler ve açıklamalar için kullanılır.\n`<dt>` terimi, `<dd>` ise o terimin açıklamasını temsil eder.",
    example: `<dl>\n  <dt>HTML</dt>\n  <dd>Web sayfası yapı dili</dd>\n</dl>`,
    hints: [
      "body içine <dl> ekle.",
      "İçine bir <dt> ve bir <dd> ekle.",
      "<dl><dt>CSS</dt><dd>Stil dili</dd></dl>",
    ],
    challenge: "Terimi 'CSS', açıklaması 'Stil dili' olan bir <dl> listesi oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Açıklama Listesi</title>\n  </head>\n  <body>\n    <!-- TODO: dl, dt, dd ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "dl dt", label: "<dt> 'CSS' içeriyor", text: "CSS" },
      { type: "dom", selector: "dl dd", label: "<dd> 'Stil dili' içeriyor", text: "Stil dili" },
    ],
  },
  {
    id: "html-9",
    level: 9,
    language: "html",
    title: "Basit tablo",
    description: "<table>, <tr>, <td> ile tablo oluştur.",
    explanation:
      "`<table>` bir tablo oluşturur. `<tr>` bir satırı, `<td>` ise o satırdaki bir hücreyi temsil eder.\nBir tabloda birden fazla `<tr>` ve her satırda birden fazla `<td>` olabilir.",
    example: `<table>\n  <tr>\n    <td>1</td>\n    <td>2</td>\n  </tr>\n</table>`,
    hints: [
      "body içine <table> ekle.",
      "İçine 2 hücreli bir <tr> ekle.",
      "<table><tr><td>Ad</td><td>Yaş</td></tr></table>",
    ],
    challenge: "İçinde 'Ad' ve 'Yaş' hücreleri olan tek satırlı bir <table> oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Tablo</title>\n  </head>\n  <body>\n    <!-- TODO: table, tr, td ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "table td", label: "2 <td> var", count: 2 },
      { type: "dom", selector: "table", label: "Tablo 'Ad' içeriyor", text: "Ad" },
    ],
  },
  {
    id: "html-10",
    level: 10,
    language: "html",
    title: "Tablo bölümleri",
    description: "<thead>, <tbody> ve <th> ile tabloyu düzenle.",
    explanation:
      "`<thead>` tablonun başlık bölümünü, `<tbody>` ise gövde (veri) bölümünü belirtir.\n`<th>` başlık hücresidir ve genelde kalın gösterilir; `<thead>` içinde kullanılır.",
    example: `<table>\n  <thead>\n    <tr><th>Ad</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Ali</td></tr>\n  </tbody>\n</table>`,
    hints: [
      "table içine thead ve tbody ekle.",
      "thead içine th olan bir tr, tbody içine td olan bir tr ekle.",
      "<thead><tr><th>Ad</th></tr></thead><tbody><tr><td>Ali</td></tr></tbody>",
    ],
    challenge: "thead içinde 'Ad' başlıklı <th>, tbody içinde 'Ali' değerli <td> olan bir tablo oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Tablo Bölümleri</title>\n  </head>\n  <body>\n    <table>\n      <!-- TODO: thead ve tbody ekle -->\n    </table>\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "thead th", label: "<th> 'Ad' içeriyor", text: "Ad" },
      { type: "dom", selector: "tbody td", label: "<td> 'Ali' içeriyor", text: "Ali" },
    ],
  },
  {
    id: "html-11",
    level: 11,
    language: "html",
    title: "Form ve metin girişi",
    description: "<form> ve metin input alanı oluştur.",
    explanation:
      "`<form>` kullanıcıdan veri toplamak için kullanılır.\nİçinde `<input type=\"text\">` ile tek satırlık bir metin girişi oluşturulur.",
    example: `<form>\n  <input type="text">\n</form>`,
    hints: [
      "body içine <form> ekle.",
      "İçine type='text' olan bir input ekle.",
      '<form><input type="text"></form>',
    ],
    challenge: "İçinde type değeri 'text' olan bir <input> bulunan bir <form> oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Form</title>\n  </head>\n  <body>\n    <!-- TODO: form ve input ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "form", label: "<form> etiketi var", count: 1 },
      { type: "dom", selector: "form input", label: "type='text' input var", attr: "type", attrValue: "text" },
    ],
  },
  {
    id: "html-12",
    level: 12,
    language: "html",
    title: "Etiket bağlama",
    description: "<label for> ile input'u etiketle eşleştir.",
    explanation:
      "`<label>` bir form elemanını açıklar. `for` özelliği, ilişkili olduğu `<input>`'un `id`'siyle eşleşmelidir.\nBu sayede kullanıcı etikete tıkladığında ilgili input'a odaklanır.",
    example: `<label for="isim">İsim:</label>\n<input type="text" id="isim">`,
    hints: [
      "input'a id='isim' ekle.",
      "label'ın for özelliğini aynı değere ayarla.",
      '<label for="isim">İsim:</label><input type="text" id="isim">',
    ],
    challenge: "id değeri 'isim' olan bir input ve for değeri 'isim' olan bir <label> ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Etiket</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: label ve input ekle -->\n    </form>\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "input", label: "id='isim' var", attr: "id", attrValue: "isim" },
      { type: "dom", selector: "label", label: "for='isim' var", attr: "for", attrValue: "isim" },
    ],
  },
  {
    id: "html-13",
    level: 13,
    language: "html",
    title: "Şifre ve e-posta girişleri",
    description: "type='password' ve type='email' inputları kullan.",
    explanation:
      "`<input type=\"password\">` girilen karakterleri gizler.\n`<input type=\"email\">` ise tarayıcının e-posta formatını doğrulamasını sağlar.",
    example: `<input type="email">\n<input type="password">`,
    hints: [
      "form içine type='email' olan bir input ekle.",
      "Sonra type='password' olan bir input daha ekle.",
      '<input type="email"><input type="password">',
    ],
    challenge: "form içine bir type='email' ve bir type='password' input ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Girişler</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: email ve password input ekle -->\n    </form>\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "input[type='email']", label: "email input var", count: 1 },
      { type: "dom", selector: "input[type='password']", label: "password input var", count: 1 },
    ],
  },
  {
    id: "html-14",
    level: 14,
    language: "html",
    title: "Checkbox ve radio",
    description: "Onay kutusu ve seçenek düğmesi ekle.",
    explanation:
      "`<input type=\"checkbox\">` bağımsız açık/kapalı seçenekler için kullanılır.\n`<input type=\"radio\">` ise aynı `name` değerine sahip seçeneklerden yalnızca birinin seçilmesini sağlar.",
    example: `<input type="checkbox" name="kabul">\n<input type="radio" name="renk">`,
    hints: [
      "form içine type='checkbox' bir input ekle.",
      "form içine type='radio' bir input daha ekle.",
      '<input type="checkbox"><input type="radio">',
    ],
    challenge: "form içine bir type='checkbox' ve bir type='radio' input ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Checkbox/Radio</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: checkbox ve radio ekle -->\n    </form>\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "input[type='checkbox']", label: "checkbox var", count: 1 },
      { type: "dom", selector: "input[type='radio']", label: "radio var", count: 1 },
    ],
  },
  {
    id: "html-15",
    level: 15,
    language: "html",
    title: "Seçim kutusu ve gönder düğmesi",
    description: "<select><option> ve <button type='submit'> kullan.",
    explanation:
      "`<select>` açılır bir seçim listesi oluşturur; içindeki her seçenek `<option>` ile tanımlanır.\n`<button type=\"submit\">` formu göndermek için kullanılan bir düğmedir.",
    example: `<select>\n  <option>Kırmızı</option>\n  <option>Mavi</option>\n</select>\n<button type="submit">Gönder</button>`,
    hints: [
      "form içine bir <select> ekle, içine iki <option>.",
      "select'ten sonra type='submit' bir button ekle.",
      '<select><option>A</option><option>B</option></select><button type="submit">Gönder</button>',
    ],
    challenge: "İçinde 2 <option> olan bir <select> ve type='submit' olan bir <button> ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Seçim</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: select, option, button ekle -->\n    </form>\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "select option", label: "En az 2 <option> var", count: 2 },
      { type: "dom", selector: "button[type='submit']", label: "submit button var", count: 1 },
    ],
  },
  {
    id: "html-16",
    level: 16,
    language: "html",
    title: "Semantik header ve nav",
    description: "<header> ve <nav> ile sayfa üstünü kur.",
    explanation:
      "Semantik etiketler sayfanın anlamını belirtir. `<header>` genelde sayfanın üst kısmını, logo ve başlığı içerir.\n`<nav>` ise site içi bağlantıları (menüyü) barındırır.",
    example: `<header>\n  <nav>\n    <a href="#">Ana Sayfa</a>\n  </nav>\n</header>`,
    hints: [
      "body içine <header> ekle.",
      "header içine <nav> ve bir <a> ekle.",
      '<header><nav><a href="#">Ana Sayfa</a></nav></header>',
    ],
    challenge: "İçinde bir <nav> ve içinde 'Ana Sayfa' metinli <a> bulunan bir <header> oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Header</title>\n  </head>\n  <body>\n    <!-- TODO: header ve nav ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "header nav", label: "header içinde nav var", count: 1 },
      { type: "dom", selector: "header nav a", label: "nav içinde 'Ana Sayfa' linki var", text: "Ana Sayfa" },
    ],
  },
  {
    id: "html-17",
    level: 17,
    language: "html",
    title: "main, article, section",
    description: "Sayfa içeriğini semantik etiketlerle grupla.",
    explanation:
      "`<main>` sayfanın ana içeriğini sarar ve sayfada tek bir tane olmalıdır.\n`<article>` bağımsız bir içerik parçasını (blog yazısı gibi), `<section>` ise ilgili içerikleri bir arada gruplayan bir bölümü temsil eder.",
    example: `<main>\n  <article>\n    <section>İçerik</section>\n  </article>\n</main>`,
    hints: [
      "body içine <main> ekle.",
      "main içine bir <article>, onun içine bir <section> ekle.",
      "<main><article><section>Yazı</section></article></main>",
    ],
    challenge: "İçinde <article>, onun içinde 'Yazı' metinli <section> olan bir <main> oluştur.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Main</title>\n  </head>\n  <body>\n    <!-- TODO: main, article, section ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "main article", label: "main içinde article var", count: 1 },
      { type: "dom", selector: "main article section", label: "'Yazı' içeren section var", text: "Yazı" },
    ],
  },
  {
    id: "html-18",
    level: 18,
    language: "html",
    title: "aside ve footer",
    description: "Yan içerik ve sayfa altını semantik etiketlerle oluştur.",
    explanation:
      "`<aside>` ana içerikle dolaylı ilişkili yan bilgileri (örneğin ilgili bağlantılar) içerir.\n`<footer>` sayfanın alt kısmıdır; genelde telif hakkı veya iletişim bilgisi barındırır.",
    example: `<aside>İlgili bağlantılar</aside>\n<footer>© 2024 CodeQuest</footer>`,
    hints: [
      "body içine <aside> ekle.",
      "body içine ayrıca <footer> ekle.",
      "<aside>Notlar</aside><footer>© 2024</footer>",
    ],
    challenge: "'Notlar' metinli bir <aside> ve '© 2024' metnini içeren bir <footer> ekle.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Aside/Footer</title>\n  </head>\n  <body>\n    <!-- TODO: aside ve footer ekle -->\n  </body>\n</html>`,
      },
    ],
    checks: [
      { type: "dom", selector: "aside", label: "<aside> 'Notlar' içeriyor", text: "Notlar" },
      { type: "dom", selector: "footer", label: "<footer> '© 2024' içeriyor", text: "© 2024" },
    ],
  },
  {
    id: "html-19",
    level: 19,
    language: "html",
    title: "Harici CSS bağlama",
    description: "<link> etiketiyle style.css dosyasını bağla.",
    explanation:
      "CSS kurallarını ayrı bir dosyada tutmak sayfaları düzenli tutar.\n`<link rel=\"stylesheet\" href=\"style.css\">` etiketi `<head>` içine yazılarak dış bir CSS dosyası sayfaya bağlanır.",
    example: `<head>\n  <link rel="stylesheet" href="style.css">\n</head>`,
    hints: [
      "head içine bir <link> etiketi ekle.",
      "rel özelliğine 'stylesheet' yaz.",
      '<link rel="stylesheet" href="style.css">',
    ],
    challenge: "head içine href değeri 'style.css' olan bir <link rel='stylesheet'> ekle, böylece kutu mavi görünsün.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>CSS Bağlama</title>\n    <!-- TODO: link etiketi ekle -->\n  </head>\n  <body>\n    <div class="kutu">Kutu</div>\n  </body>\n</html>`,
      },
      {
        name: "style.css",
        readonly: true,
        content: `.kutu {\n  background-color: blue;\n  color: white;\n  padding: 12px;\n}`,
      },
    ],
    checks: [
      { type: "dom", selector: "link[rel='stylesheet']", label: "style.css bağlandı", attr: "href", attrValue: "style.css" },
      { type: "style", selector: ".kutu", property: "background-color", value: "rgb(0, 0, 255)", label: "Kutu mavi görünüyor" },
    ],
  },
  {
    id: "html-20",
    level: 20,
    language: "html",
    title: "Harici JS bağlama",
    description: "<script src> ile script.js dosyasını bağla.",
    explanation:
      "JavaScript kodunu ayrı bir dosyada tutup HTML'e bağlayabilirsin.\n`<script src=\"script.js\"></script>` etiketi genelde `<body>` sonuna yazılır ve dosyanın çalışmasını sağlar.",
    example: `<body>\n  <div id="mesaj"></div>\n  <script src="script.js"></script>\n</body>`,
    hints: [
      "body içine id='mesaj' olan bir div ekle.",
      "body sonuna bir <script> etiketi ekle.",
      '<script src="script.js"></script>',
    ],
    challenge: "id değeri 'mesaj' olan bir <div> ekle ve body sonuna <script src='script.js'></script> ekleyerek script'i çalıştır.",
    files: [
      {
        name: "index.html",
        content: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>JS Bağlama</title>\n  </head>\n  <body>\n    <div id="mesaj"></div>\n    <!-- TODO: script etiketi ekle -->\n  </body>\n</html>`,
      },
      {
        name: "script.js",
        readonly: true,
        content: `document.getElementById("mesaj").textContent = "Merhaba JS!";`,
      },
    ],
    checks: [
      { type: "dom", selector: "script", label: "script.js bağlandı", attr: "src", attrValue: "script.js" },
      { type: "dom", selector: "#mesaj", label: "#mesaj içinde 'Merhaba JS!' yazıyor", text: "Merhaba JS!" },
    ],
  },
];
