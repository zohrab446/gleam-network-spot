import type { TrackTranslations } from "../types";

export const HTML_EN: TrackTranslations = {
  "html-1": {
    title: "HTML skeleton",
    description: "Build the basic structure of every HTML page.",
    explanation:
      "Every HTML page starts with `<!DOCTYPE html>`; this tells the browser the type of the document.\n`<html>` wraps the whole page, and contains `<head>` (invisible info) and `<body>` (visible content).\n`<title>` is the title shown in the browser tab, and it's written inside `<head>`.",
    example: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Sample Page</title>\n  </head>\n  <body>\n    Hello\n  </body>\n</html>`,
    hints: [
      "Start the file with <!DOCTYPE html>.",
      "Add head and body inside the html tag.",
      "Write <title>CodeQuest</title> inside head.",
    ],
    challenge: "Create an HTML skeleton: DOCTYPE, html, head (with title 'CodeQuest'), and an empty body.",
    files: {
      "index.html": `<!-- TODO: add DOCTYPE, html, head, title and body -->\n`,
    },
    checks: ["<title> tag exists", "<body> tag exists"],
  },
  "html-2": {
    title: "Heading hierarchy",
    description: "Use heading tags from h1 to h6.",
    explanation:
      "Headings range from `<h1>` (largest/most important) to `<h6>` (smallest).\nA page usually has a single `<h1>`, and `<h2>`, `<h3>` are used for subheadings.",
    example: `<h1>Main Heading</h1>\n<h2>Subheading</h2>\n<h3>Smaller Heading</h3>`,
    hints: [
      "Add an h1 tag inside body.",
      "Add an h2 below the h1.",
      "<h1>Merhaba</h1><h2>Alt Başlık</h2>",
    ],
    challenge: "Add an <h1> with text 'Merhaba' and an <h2> with text 'Alt Başlık' inside body.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Başlıklar</title>\n  </head>\n  <body>\n    <!-- TODO: add h1 and h2 -->\n  </body>\n</html>`,
    },
    checks: ["<h1> contains 'Merhaba'", "<h2> contains 'Alt Başlık'"],
  },
  "html-3": {
    title: "Paragraph and emphasis",
    description: "Learn paragraph and text-formatting tags.",
    explanation:
      "The `<p>` tag represents a paragraph.\n`<strong>` shows text as bold and marks it as important, while `<em>` shows text in italics to indicate emphasis.",
    example: `<p>This is an <strong>important</strong> and <em>emphasized</em> paragraph.</p>`,
    hints: [
      "Add a <p> tag inside body.",
      "Bold a word inside it using <strong>.",
      "<p>Bu <strong>güçlü</strong> bir cümledir.</p>",
    ],
    challenge: "Add a <p> tag with the word 'güçlü' emphasized using <strong>.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Paragraf</title>\n  </head>\n  <body>\n    <!-- TODO: add p and strong -->\n  </body>\n</html>`,
    },
    checks: ["<p> tag exists", "<strong> contains 'güçlü'"],
  },
  "html-4": {
    title: "Add a link",
    description: "Link to another page with <a href>.",
    explanation:
      "The `<a>` tag creates a link. The `href` attribute specifies the address the link goes to.\nFor example `<a href=\"https://example.com\">Git</a>` takes you to example.com when clicked.",
    example: `<a href="https://codequest.dev">Go to CodeQuest</a>`,
    hints: [
      "Add an <a> tag inside body.",
      "Write an address in the href attribute.",
      '<a href="https://example.com">Örnek</a>',
    ],
    challenge: "Add an <a> tag with href value 'https://example.com' and text 'Örnek'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Bağlantı</title>\n  </head>\n  <body>\n    <!-- TODO: add a tag -->\n  </body>\n</html>`,
    },
    checks: ["<a> contains 'Örnek'", "href is correct"],
  },
  "html-5": {
    title: "Add an image",
    description: "Show an image with the <img> tag.",
    explanation:
      "The `<img>` tag shows an image and has no closing tag.\n`src` specifies the image's address, and `alt` specifies the description shown if the image fails to load. `alt` is important for accessibility.",
    example: `<img src="https://placehold.co/200x120" alt="Örnek görsel">`,
    hints: [
      "Add an <img> tag inside body.",
      "Write the given address in the src attribute.",
      '<img src="https://placehold.co/200x120" alt="kedi">',
    ],
    challenge: "Add an <img> with src 'https://placehold.co/200x120' and alt 'kedi'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Görsel</title>\n  </head>\n  <body>\n    <!-- TODO: add img -->\n  </body>\n</html>`,
    },
    checks: ["<img> src is correct", "<img> alt is correct"],
  },
  "html-6": {
    title: "Unordered list",
    description: "Make a bullet list with <ul> and <li>.",
    explanation:
      "`<ul>` creates an unordered (bulleted) list.\nEach item is written with the `<li>` tag. A `<ul>` should have at least one `<li>`.",
    example: `<ul>\n  <li>Elma</li>\n  <li>Armut</li>\n</ul>`,
    hints: [
      "Add a <ul> inside body.",
      "Add two <li> items inside it.",
      "<ul><li>Kalem</li><li>Defter</li></ul>",
    ],
    challenge: "Create a <ul> list with items 'Kalem' and 'Defter'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Liste</title>\n  </head>\n  <body>\n    <!-- TODO: add ul and li -->\n  </body>\n</html>`,
    },
    checks: ["At least 2 <li> exist", "List contains 'Kalem'"],
  },
  "html-7": {
    title: "Ordered list",
    description: "Create a numbered list with <ol>.",
    explanation:
      "`<ol>` creates an ordered (numbered) list; the browser automatically numbers 1, 2, 3.\n`<li>` tags are used inside it, just like `<ul>`.",
    example: `<ol>\n  <li>Uyan</li>\n  <li>Kahvaltı yap</li>\n</ol>`,
    hints: [
      "Add an <ol> inside body.",
      "Add <li> items for three steps in order.",
      "<ol><li>Başla</li><li>Devam et</li><li>Bitir</li></ol>",
    ],
    challenge: "Create an <ol> list with items 'Başla', 'Devam et', 'Bitir'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Sıralı Liste</title>\n  </head>\n  <body>\n    <!-- TODO: add ol and li -->\n  </body>\n</html>`,
    },
    checks: ["3 <li> items exist", "List contains 'Bitir'"],
  },
  "html-8": {
    title: "Description list",
    description: "Make a term-description list with <dl>, <dt> and <dd>.",
    explanation:
      "`<dl>` creates a description list; used for terms and descriptions.\n`<dt>` represents the term, and `<dd>` represents that term's description.",
    example: `<dl>\n  <dt>HTML</dt>\n  <dd>Web sayfası yapı dili</dd>\n</dl>`,
    hints: [
      "Add <dl> inside body.",
      "Add one <dt> and one <dd> inside it.",
      "<dl><dt>CSS</dt><dd>Stil dili</dd></dl>",
    ],
    challenge: "Create a <dl> list with term 'CSS' and description 'Stil dili'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Açıklama Listesi</title>\n  </head>\n  <body>\n    <!-- TODO: add dl, dt, dd -->\n  </body>\n</html>`,
    },
    checks: ["<dt> contains 'CSS'", "<dd> contains 'Stil dili'"],
  },
  "html-9": {
    title: "Simple table",
    description: "Create a table with <table>, <tr>, <td>.",
    explanation:
      "`<table>` creates a table. `<tr>` represents a row, and `<td>` represents a cell in that row.\nA table can have multiple `<tr>` rows, and each row can have multiple `<td>` cells.",
    example: `<table>\n  <tr>\n    <td>1</td>\n    <td>2</td>\n  </tr>\n</table>`,
    hints: [
      "Add <table> inside body.",
      "Add a <tr> with 2 cells inside it.",
      "<table><tr><td>Ad</td><td>Yaş</td></tr></table>",
    ],
    challenge: "Create a single-row <table> containing cells 'Ad' and 'Yaş'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Tablo</title>\n  </head>\n  <body>\n    <!-- TODO: add table, tr, td -->\n  </body>\n</html>`,
    },
    checks: ["2 <td> exist", "Table contains 'Ad'"],
  },
  "html-10": {
    title: "Table sections",
    description: "Structure a table with <thead>, <tbody> and <th>.",
    explanation:
      "`<thead>` marks the table's header section, and `<tbody>` marks the body (data) section.\n`<th>` is a header cell, usually shown bold; it's used inside `<thead>`.",
    example: `<table>\n  <thead>\n    <tr><th>Ad</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Ali</td></tr>\n  </tbody>\n</table>`,
    hints: [
      "Add thead and tbody inside table.",
      "Add a tr with th inside thead, and a tr with td inside tbody.",
      "<thead><tr><th>Ad</th></tr></thead><tbody><tr><td>Ali</td></tr></tbody>",
    ],
    challenge: "Create a table with a <th> 'Ad' inside thead, and a <td> 'Ali' inside tbody.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Tablo Bölümleri</title>\n  </head>\n  <body>\n    <table>\n      <!-- TODO: add thead and tbody -->\n    </table>\n  </body>\n</html>`,
    },
    checks: ["<th> contains 'Ad'", "<td> contains 'Ali'"],
  },
  "html-11": {
    title: "Form and text input",
    description: "Create a <form> and a text input field.",
    explanation:
      "`<form>` is used to collect data from the user.\nA single-line text input is created inside it with `<input type=\"text\">`.",
    example: `<form>\n  <input type="text">\n</form>`,
    hints: [
      "Add <form> inside body.",
      "Add an input with type='text' inside it.",
      '<form><input type="text"></form>',
    ],
    challenge: "Create a <form> containing an <input> with type value 'text'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Form</title>\n  </head>\n  <body>\n    <!-- TODO: add form and input -->\n  </body>\n</html>`,
    },
    checks: ["<form> tag exists", "input with type='text' exists"],
  },
  "html-12": {
    title: "Linking a label",
    description: "Match a label with an input using <label for>.",
    explanation:
      "`<label>` describes a form element. The `for` attribute must match the `id` of the associated `<input>`.\nThis way, clicking the label focuses the related input.",
    example: `<label for="isim">İsim:</label>\n<input type="text" id="isim">`,
    hints: [
      "Add id='isim' to the input.",
      "Set the label's for attribute to the same value.",
      '<label for="isim">İsim:</label><input type="text" id="isim">',
    ],
    challenge: "Add an input with id value 'isim' and a <label> with for value 'isim'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Etiket</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: add label and input -->\n    </form>\n  </body>\n</html>`,
    },
    checks: ["id='isim' exists", "for='isim' exists"],
  },
  "html-13": {
    title: "Password and email inputs",
    description: "Use type='password' and type='email' inputs.",
    explanation:
      "`<input type=\"password\">` hides the entered characters.\n`<input type=\"email\">` lets the browser validate the email format.",
    example: `<input type="email">\n<input type="password">`,
    hints: [
      "Add an input with type='email' inside form.",
      "Then add another input with type='password'.",
      '<input type="email"><input type="password">',
    ],
    challenge: "Add a type='email' and a type='password' input inside form.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Girişler</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: add email and password input -->\n    </form>\n  </body>\n</html>`,
    },
    checks: ["email input exists", "password input exists"],
  },
  "html-14": {
    title: "Checkbox and radio",
    description: "Add a checkbox and a radio button.",
    explanation:
      "`<input type=\"checkbox\">` is used for independent on/off options.\n`<input type=\"radio\">` allows only one option to be selected among those sharing the same `name` value.",
    example: `<input type="checkbox" name="kabul">\n<input type="radio" name="renk">`,
    hints: [
      "Add a type='checkbox' input inside form.",
      "Add another type='radio' input inside form.",
      '<input type="checkbox"><input type="radio">',
    ],
    challenge: "Add a type='checkbox' and a type='radio' input inside form.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Checkbox/Radio</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: add checkbox and radio -->\n    </form>\n  </body>\n</html>`,
    },
    checks: ["checkbox exists", "radio exists"],
  },
  "html-15": {
    title: "Select box and submit button",
    description: "Use <select><option> and <button type='submit'>.",
    explanation:
      "`<select>` creates a dropdown selection list; each option inside it is defined with `<option>`.\n`<button type=\"submit\">` is a button used to submit the form.",
    example: `<select>\n  <option>Kırmızı</option>\n  <option>Mavi</option>\n</select>\n<button type="submit">Gönder</button>`,
    hints: [
      "Add a <select> inside form, with two <option>s inside it.",
      "After the select, add a button with type='submit'.",
      '<select><option>A</option><option>B</option></select><button type="submit">Gönder</button>',
    ],
    challenge: "Add a <select> with 2 <option>s and a <button> with type='submit'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Seçim</title>\n  </head>\n  <body>\n    <form>\n      <!-- TODO: add select, option, button -->\n    </form>\n  </body>\n</html>`,
    },
    checks: ["At least 2 <option> exist", "submit button exists"],
  },
  "html-16": {
    title: "Semantic header and nav",
    description: "Build the top of the page with <header> and <nav>.",
    explanation:
      "Semantic tags indicate the meaning of the page. `<header>` usually contains the top of the page, the logo, and the title.\n`<nav>` holds the site's internal links (the menu).",
    example: `<header>\n  <nav>\n    <a href="#">Ana Sayfa</a>\n  </nav>\n</header>`,
    hints: [
      "Add <header> inside body.",
      "Add a <nav> and an <a> inside header.",
      '<header><nav><a href="#">Ana Sayfa</a></nav></header>',
    ],
    challenge: "Create a <header> containing a <nav> with an <a> whose text is 'Ana Sayfa'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Header</title>\n  </head>\n  <body>\n    <!-- TODO: add header and nav -->\n  </body>\n</html>`,
    },
    checks: ["nav exists inside header", "'Ana Sayfa' link exists inside nav"],
  },
  "html-17": {
    title: "main, article, section",
    description: "Group page content with semantic tags.",
    explanation:
      "`<main>` wraps the page's main content and there should be only one per page.\n`<article>` represents an independent piece of content (like a blog post), while `<section>` represents a section grouping related content together.",
    example: `<main>\n  <article>\n    <section>İçerik</section>\n  </article>\n</main>`,
    hints: [
      "Add <main> inside body.",
      "Add an <article> inside main, and a <section> inside that.",
      "<main><article><section>Yazı</section></article></main>",
    ],
    challenge: "Create a <main> containing an <article>, and inside it a <section> with text 'Yazı'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Main</title>\n  </head>\n  <body>\n    <!-- TODO: add main, article, section -->\n  </body>\n</html>`,
    },
    checks: ["article exists inside main", "section containing 'Yazı' exists"],
  },
  "html-18": {
    title: "aside and footer",
    description: "Create side content and the page bottom with semantic tags.",
    explanation:
      "`<aside>` contains side information loosely related to the main content (e.g. related links).\n`<footer>` is the bottom of the page; it usually holds copyright or contact info.",
    example: `<aside>İlgili bağlantılar</aside>\n<footer>© 2024 CodeQuest</footer>`,
    hints: [
      "Add <aside> inside body.",
      "Also add <footer> inside body.",
      "<aside>Notlar</aside><footer>© 2024</footer>",
    ],
    challenge: "Add an <aside> with text 'Notlar' and a <footer> containing the text '© 2024'.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Aside/Footer</title>\n  </head>\n  <body>\n    <!-- TODO: add aside and footer -->\n  </body>\n</html>`,
    },
    checks: ["<aside> contains 'Notlar'", "<footer> contains '© 2024'"],
  },
  "html-19": {
    title: "Linking external CSS",
    description: "Link the style.css file with a <link> tag.",
    explanation:
      "Keeping CSS rules in a separate file keeps pages organized.\nThe `<link rel=\"stylesheet\" href=\"style.css\">` tag is written inside `<head>` to link an external CSS file to the page.",
    example: `<head>\n  <link rel="stylesheet" href="style.css">\n</head>`,
    hints: [
      "Add a <link> tag inside head.",
      "Set the rel attribute to 'stylesheet'.",
      '<link rel="stylesheet" href="style.css">',
    ],
    challenge: "Add a <link rel='stylesheet'> inside head with href value 'style.css', so the box appears blue.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>CSS Bağlama</title>\n    <!-- TODO: add link tag -->\n  </head>\n  <body>\n    <div class="kutu">Kutu</div>\n  </body>\n</html>`,
    },
    checks: ["style.css is linked", "Box appears blue"],
  },
  "html-20": {
    title: "Linking external JS",
    description: "Link the script.js file with <script src>.",
    explanation:
      "You can keep JavaScript code in a separate file and link it to HTML.\nThe `<script src=\"script.js\"></script>` tag is usually written at the end of `<body>`, and makes the file run.",
    example: `<body>\n  <div id="mesaj"></div>\n  <script src="script.js"></script>\n</body>`,
    hints: [
      "Add a div with id='mesaj' inside body.",
      "Add a <script> tag at the end of body.",
      '<script src="script.js"></script>',
    ],
    challenge: "Add a <div> with id value 'mesaj', and add <script src='script.js'></script> at the end of body to run the script.",
    files: {
      "index.html": `<!DOCTYPE html>\n<html>\n  <head>\n    <title>JS Bağlama</title>\n  </head>\n  <body>\n    <div id="mesaj"></div>\n    <!-- TODO: add script tag -->\n  </body>\n</html>`,
    },
    checks: ["script.js is linked", "#mesaj contains 'Merhaba JS!'"],
  },
};
