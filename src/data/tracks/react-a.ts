import type { Lesson } from "../types";

const INDEX_HTML = `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <title>React App</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="App.jsx"></script>
  </body>
</html>`;

const STYLE_CSS = `body {\n  font-family: sans-serif;\n  padding: 16px;\n}`;

export const REACT_A: Lesson[] = [
  {
    id: "react-121",
    level: 121,
    language: "react",
    title: "İlk bileşen ve JSX",
    description: "Bir React bileşeni yaz ve JSX ile ekrana yazı bas.",
    explanation:
      "React'te arayüzü küçük parçalara, yani bileşenlere bölersin. Bir bileşen, büyük harfle başlayan bir fonksiyondur ve JSX denen HTML'e benzeyen bir kod döndürür.\nJSX aslında JavaScript'tir; tarayıcı çalıştırmadan önce Babel onu normal JS'e çevirir.",
    example: `function Hello() {\n  return <h1>Merhaba React</h1>;\n}`,
    hints: [
      "App adında bir fonksiyon bileşeni tanımla.",
      "return içinde bir JSX elemanı döndür, örneğin <h1>.",
      "function App() { return <h1>Merhaba CodeQuest</h1>; }",
    ],
    challenge: "App bileşeni oluştur ve <h1> içinde 'Merhaba CodeQuest' yazsın.",
    files: [
      {
        name: "App.jsx",
        content: `function App() {\n  // TODO: <h1>Merhaba CodeQuest</h1> döndür\n  return null;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "h1", label: "h1 etiketi var", count: 1 },
      { type: "dom", selector: "h1", label: "Metin doğru", text: "Merhaba CodeQuest" },
    ],
  },
  {
    id: "react-122",
    level: 122,
    language: "react",
    title: "JSX içinde JS ifadesi {}",
    description: "Süslü parantezle JSX içine JavaScript değeri göm.",
    explanation:
      "JSX içinde `{}` kullanarak herhangi bir JavaScript ifadesini yerleştirebilirsin: değişken, toplama işlemi, fonksiyon çağrısı vb.\nBu sayede statik yazı yerine dinamik değerler gösterebilirsin.",
    example: `const name = "Ada";\nfunction App() {\n  return <p>Merhaba {name}</p>;\n}`,
    hints: [
      "Bileşen içinde bir değişken tanımla, örneğin const score = 10.",
      "JSX içinde {score} yazarak değişkeni göster.",
      "return <p>Puan: {score}</p>;",
    ],
    challenge: "score adında bir değişken (değeri 10) tanımla ve <p>Puan: {score}</p> şeklinde göster.",
    files: [
      {
        name: "App.jsx",
        content: `function App() {\n  const score = 10;\n  // TODO: <p>Puan: {score}</p> döndür\n  return <p>Puan: ?</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "p etiketi var", count: 1 },
      { type: "dom", selector: "p", label: "Puan 10 yazıyor", text: "Puan: 10" },
    ],
  },
  {
    id: "react-123",
    level: 123,
    language: "react",
    title: "className",
    description: "JSX'te CSS sınıfı vermek için className kullan.",
    explanation:
      "HTML'de `class` kullanılır ama JSX'te bu kelime JavaScript'te ayrılmış olduğu için `className` kullanılır.\nDeğeri normal bir string gibi verilir: `className=\"kutu\"`.",
    example: `function App() {\n  return <div className="kutu">İçerik</div>;\n}`,
    hints: [
      "div elemanına className ekle.",
      "Değer olarak \"kart\" stringini kullan.",
      "return <div className=\"kart\">Merhaba</div>;",
    ],
    challenge: "className değeri \"kart\" olan bir <div> döndür, içinde 'Merhaba' yazsın.",
    files: [
      {
        name: "App.jsx",
        content: `function App() {\n  // TODO: className="kart" olan div döndür\n  return <div>Merhaba</div>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: ".kart", label: ".kart sınıfı var", count: 1 },
      { type: "dom", selector: ".kart", label: "Metin doğru", text: "Merhaba" },
    ],
  },
  {
    id: "react-124",
    level: 124,
    language: "react",
    title: "İç içe bileşenler",
    description: "Bir bileşeni başka bir bileşenin içinde kullan.",
    explanation:
      "Bileşenler birbirinin içinde kullanılabilir; böylece küçük parçalardan büyük arayüzler kurulur.\nBir bileşeni JSX etiketi gibi çağırırsın: `<Baslik />`.",
    example: `function Baslik() {\n  return <h2>Başlık</h2>;\n}\nfunction App() {\n  return (\n    <div>\n      <Baslik />\n    </div>\n  );\n}`,
    hints: [
      "Baslik adında ayrı bir fonksiyon bileşeni yaz.",
      "App içinde <Baslik /> etiketini kullan.",
      "function Baslik() { return <h2>Hoş geldin</h2>; } sonra App içine <Baslik /> koy.",
    ],
    challenge: "Baslik bileşeni yaz (<h2>Hoş geldin</h2> döndürsün) ve App içinde kullan.",
    files: [
      {
        name: "App.jsx",
        content: `function Baslik() {\n  // TODO: <h2>Hoş geldin</h2> döndür\n  return null;\n}\n\nfunction App() {\n  return (\n    <div>\n      {/* TODO: Baslik bileşenini kullan */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "h2", label: "h2 var", count: 1 },
      { type: "dom", selector: "h2", label: "Metin doğru", text: "Hoş geldin" },
      { type: "regex", value: "<Baslik\\s*/>", label: "Baslik bileşeni kullanıldı" },
    ],
  },
  {
    id: "react-125",
    level: 125,
    language: "react",
    title: "props aktarımı",
    description: "Bir bileşene props ile veri gönder.",
    explanation:
      "Props, bileşene dışarıdan veri aktarmanın yoludur; HTML özniteliği gibi yazılır: `<Kart baslik=\"Merhaba\" />`.\nBileşen fonksiyonu bu değerlere `props` parametresiyle erişir: `props.baslik`.",
    example: `function Kart(props) {\n  return <p>{props.baslik}</p>;\n}\nfunction App() {\n  return <Kart baslik="Selam" />;\n}`,
    hints: [
      "Kart bileşenine props parametresi ekle.",
      "App içinde <Kart baslik=\"Merhaba Prop\" /> yaz.",
      "function Kart(props) { return <p>{props.baslik}</p>; }",
    ],
    challenge: "Kart bileşeni props.baslik'i <p> içinde göstersin; App bunu baslik=\"Merhaba Prop\" ile çağırsın.",
    files: [
      {
        name: "App.jsx",
        content: `function Kart(props) {\n  // TODO: props.baslik'i <p> içinde göster\n  return <p></p>;\n}\n\nfunction App() {\n  return <Kart baslik="Merhaba Prop" />;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "p var", count: 1 },
      { type: "dom", selector: "p", label: "Prop metni gösteriliyor", text: "Merhaba Prop" },
    ],
  },
  {
    id: "react-126",
    level: 126,
    language: "react",
    title: "props destructuring",
    description: "Props'u parametrede { } ile aç.",
    explanation:
      "`props.baslik` yerine parametreyi doğrudan `{ baslik }` şeklinde yazarak destructuring yapabilirsin.\nBu, kodu daha kısa ve okunaklı yapar.",
    example: `function Kart({ baslik }) {\n  return <p>{baslik}</p>;\n}`,
    hints: [
      "Kart fonksiyonunun parametresini { baslik } yap.",
      "Artık props.baslik yerine sadece baslik kullan.",
      "function Kart({ baslik }) { return <p>{baslik}</p>; }",
    ],
    challenge: "Kart bileşenini { baslik } destructuring ile yaz, App baslik=\"Destructured\" versin.",
    files: [
      {
        name: "App.jsx",
        content: `function Kart(props) {\n  // TODO: parametreyi { baslik } şeklinde yaz\n  return <p>{props.baslik}</p>;\n}\n\nfunction App() {\n  return <Kart baslik="Destructured" />;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "Metin doğru", text: "Destructured" },
      { type: "regex", value: "function\\s+Kart\\s*\\(\\s*\\{\\s*baslik\\s*\\}\\s*\\)", label: "Destructuring kullanıldı" },
    ],
  },
  {
    id: "react-127",
    level: 127,
    language: "react",
    title: "default props / children",
    description: "Varsayılan prop değeri ver ve children kullan.",
    explanation:
      "Bir prop gönderilmezse varsayılan değer kullanmak için parametrede `= değer` yazılır: `{ baslik = \"Varsayılan\" }`.\n`children` özel bir prop'tur; bileşenin açılış-kapanış etiketleri arasındaki içeriği taşır.",
    example: `function Kutu({ children }) {\n  return <div className="kutu">{children}</div>;\n}\nfunction App() {\n  return <Kutu>İçerik</Kutu>;\n}`,
    hints: [
      "Kutu bileşenine children parametresini al.",
      "children'ı div içinde göster.",
      "function Kutu({ children }) { return <div className=\"kutu\">{children}</div>; } App: <Kutu>Merhaba Children</Kutu>",
    ],
    challenge: "Kutu bileşeni children'ı .kutu div'i içinde göstersin; App <Kutu>Merhaba Children</Kutu> kullansın.",
    files: [
      {
        name: "App.jsx",
        content: `function Kutu({ children }) {\n  // TODO: children'ı className="kutu" olan div içinde göster\n  return <div className="kutu"></div>;\n}\n\nfunction App() {\n  return <Kutu>Merhaba Children</Kutu>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: ".kutu", label: ".kutu var", count: 1 },
      { type: "dom", selector: ".kutu", label: "children gösteriliyor", text: "Merhaba Children" },
    ],
  },
  {
    id: "react-128",
    level: 128,
    language: "react",
    title: "Koşullu render (&&, ternary)",
    description: "Bir koşula göre farklı JSX göster.",
    explanation:
      "JSX içinde `condition && <p>...</p>` yazarsan, condition doğruysa eleman gösterilir, değilse hiçbir şey render edilmez.\nİki farklı seçenek arasında karar vermek için ternary (`? :`) kullanılır: `condition ? <A /> : <B />`.",
    example: `function App() {\n  const isVar = true;\n  return <div>{isVar ? <p>Var</p> : <p>Yok</p>}</div>;\n}`,
    hints: [
      "isLoggedIn adında bir değişken tanımla (true yap).",
      "Ternary ile isLoggedIn true ise <p>Hoş geldin</p>, değilse <p>Giriş yap</p> göster.",
      "return <div>{isLoggedIn ? <p>Hoş geldin</p> : <p>Giriş yap</p>}</div>;",
    ],
    challenge: "isLoggedIn = true olsun; ternary ile true ise 'Hoş geldin', false ise 'Giriş yap' göster.",
    files: [
      {
        name: "App.jsx",
        content: `function App() {\n  const isLoggedIn = true;\n  // TODO: ternary ile <p>Hoş geldin</p> veya <p>Giriş yap</p> döndür\n  return <div></div>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "p var", count: 1 },
      { type: "dom", selector: "p", label: "Doğru metin", text: "Hoş geldin" },
      { type: "regex", value: "isLoggedIn\\s*\\?", label: "Ternary kullanıldı" },
    ],
  },
  {
    id: "react-129",
    level: 129,
    language: "react",
    title: "map ile liste ve key",
    description: "Diziyi map ile JSX listesine çevir, key ver.",
    explanation:
      "Bir diziyi ekranda göstermek için `.map()` kullanılır; her eleman bir JSX döndürür.\nReact'in listeyi doğru güncelleyebilmesi için her elemana benzersiz bir `key` prop'u vermek gerekir.",
    example: `const items = ["elma", "armut"];\nfunction App() {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item}>{item}</li>\n      ))}\n    </ul>\n  );\n}`,
    hints: [
      "fruits dizisini map ile dolaş.",
      "Her <li>'ye key prop'u ekle (örn. key={fruit}).",
      "{fruits.map((fruit) => <li key={fruit}>{fruit}</li>)}",
    ],
    challenge: "fruits = ['elma','armut','muz'] dizisini <ul><li key={...}> ile listele.",
    files: [
      {
        name: "App.jsx",
        content: `function App() {\n  const fruits = ["elma", "armut", "muz"];\n  return (\n    <ul>\n      {/* TODO: fruits.map ile <li key={...}> oluştur */}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", label: "3 li elemanı var", count: 3 },
      { type: "dom", selector: "li", label: "elma yazıyor", text: "elma" },
      { type: "regex", value: "key=", label: "key prop'u kullanıldı" },
    ],
  },
  {
    id: "react-130",
    level: 130,
    language: "react",
    title: "Fragment",
    description: "Tek üst eleman olmadan birden fazla eleman döndür.",
    explanation:
      "Bir bileşen tek bir kök eleman döndürmelidir. Gereksiz bir `<div>` eklememek için `<>...</>` (Fragment) kullanılır.\nFragment DOM'a ekstra bir eleman eklemez, sadece JSX kurallarını sağlar.",
    example: `function App() {\n  return (\n    <>\n      <h1>Başlık</h1>\n      <p>Metin</p>\n    </>\n  );\n}`,
    hints: [
      "İki eleman döndürmek için Fragment kullan: <>...</>",
      "İçine bir <h1> ve bir <p> koy.",
      "return (<><h1>Ana Başlık</h1><p>Alt metin</p></>);",
    ],
    challenge: "Fragment (<>) kullanarak bir <h1>Ana Başlık</h1> ve <p>Alt metin</p> birlikte döndür.",
    files: [
      {
        name: "App.jsx",
        content: `function App() {\n  // TODO: <> </> Fragment ile h1 ve p döndür\n  return <h1>Ana Başlık</h1>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "h1", label: "h1 var", count: 1 },
      { type: "dom", selector: "p", label: "p var", count: 1 },
      { type: "regex", value: "<>[\\s\\S]*</>", label: "Fragment kullanıldı" },
    ],
  },
  {
    id: "react-131",
    level: 131,
    language: "react",
    title: "useState",
    description: "useState ile bileşene state ekle.",
    explanation:
      "`useState` bir bileşene hafıza (state) kazandırır. `const [deger, setDeger] = useState(baslangic);` şeklinde kullanılır.\nBaşta useState'i `const { useState } = React;` ile içeri almalısın.",
    example: `const { useState } = React;\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <p>{count}</p>;\n}`,
    hints: [
      "Dosyanın başında const { useState } = React; ekle.",
      "count state'ini useState(0) ile oluştur.",
      "const [count, setCount] = useState(0); return <p>{count}</p>;",
    ],
    challenge: "useState(0) ile count state'i oluştur, <p>{count}</p> ile göster.",
    files: [
      {
        name: "App.jsx",
        content: `// TODO: const { useState } = React; ekle\n\nfunction App() {\n  // TODO: count state'i oluştur (useState(0))\n  return <p>0</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "0 gösteriliyor", text: "0" },
      { type: "regex", value: "useState\\(", label: "useState kullanıldı" },
    ],
  },
  {
    id: "react-132",
    level: 132,
    language: "react",
    title: "Tıklamayla state güncelleme",
    description: "Bir butona tıklayınca state'i değiştir.",
    explanation:
      "Butonlara `onClick` prop'u ile bir fonksiyon verilir; bu fonksiyon tıklandığında çalışır.\nState değiştirici fonksiyonu (`setCount`) çağırarak sayacı artırabilirsin: `onClick={() => setCount(count + 1)}`.",
    example: `function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>{count}</button>\n  );\n}`,
    hints: [
      "button elemanına onClick ekle.",
      "onClick içinde setCount(count + 1) çağır.",
      "<button onClick={() => setCount(count + 1)}>Artır</button>",
    ],
    challenge: "count state'i oluştur; bir <button onClick={...}> ile tıklandığında count'u 1 artır.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>{count}</p>\n      {/* TODO: onClick ile count'u artıran buton ekle */}\n      <button>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "button", label: "button var", count: 1 },
      { type: "regex", value: "onClick=\\{", label: "onClick kullanıldı" },
      { type: "regex", value: "setCount\\(", label: "setCount çağrılıyor" },
    ],
  },
  {
    id: "react-133",
    level: 133,
    language: "react",
    title: "Boolean state / modal",
    description: "Boolean state ile bir öğeyi göster/gizle.",
    explanation:
      "State bir boolean da olabilir: `useState(false)`. Bunu `&&` ile birleştirerek bir öğeyi koşullu gösterebilirsin.\nButon tıklandığında `setOpen(!open)` ile değeri tersine çevirebilirsin.",
    example: `const [open, setOpen] = useState(false);\nreturn (\n  <div>\n    <button onClick={() => setOpen(!open)}>Aç/Kapat</button>\n    {open && <p>Görünür!</p>}\n  </div>\n);`,
    hints: [
      "open state'ini useState(false) ile oluştur.",
      "Bir button ekle, onClick ile setOpen(!open) çağır.",
      "{open && <p className=\"modal\">Merhaba Modal</p>}",
    ],
    challenge: "open state'i (false) oluştur; buton tıklanınca tersine çevir; open true iken className=\"modal\" olan <p>Merhaba Modal</p> göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>Aç/Kapat</button>\n      {/* TODO: open true ise <p className="modal">Merhaba Modal</p> göster */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "button", label: "button var", count: 1 },
      { type: "regex", value: "setOpen\\(", label: "setOpen kullanıldı" },
      { type: "regex", value: "open\\s*&&", label: "Koşullu render ile modal gösteriliyor" },
    ],
  },
  {
    id: "react-134",
    level: 134,
    language: "react",
    title: "Controlled input",
    description: "Input değerini state ile kontrol et.",
    explanation:
      "Bir input'un değerini state'ten okuyup `onChange` ile güncellersen, buna \"controlled input\" denir.\n`value={text}` ve `onChange={(e) => setText(e.target.value)}` birlikte kullanılır.",
    example: `const [text, setText] = useState("");\nreturn <input value={text} onChange={(e) => setText(e.target.value)} />;`,
    hints: [
      "text state'ini useState(\"\") ile oluştur.",
      "input'a value={text} ver.",
      "input'a onChange={(e) => setText(e.target.value)} ekle ve altında <p>{text}</p> göster.",
    ],
    challenge: "text state'i oluştur; input'u controlled yap (value + onChange) ve altında <p>{text}</p> göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [text, setText] = useState("");\n  return (\n    <div>\n      {/* TODO: value={text} ve onChange ile controlled input yap */}\n      <input />\n      <p>{text}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "input", label: "input var", count: 1 },
      { type: "regex", value: "onChange=\\{", label: "onChange kullanıldı" },
      { type: "regex", value: "value=\\{text\\}", label: "value={text} kullanıldı" },
    ],
  },
  {
    id: "react-135",
    level: 135,
    language: "react",
    title: "Çoklu input + form submit",
    description: "Form ile birden fazla input yönet, submit'i yakala.",
    explanation:
      "Bir `<form>` gönderildiğinde `onSubmit` çalışır. Sayfanın yenilenmesini engellemek için `e.preventDefault()` çağrılır.\nBirden çok input için ayrı state'ler veya bir obje state kullanılabilir.",
    example: `function App() {\n  const [name, setName] = useState("");\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log(name);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <button type="submit">Gönder</button>\n    </form>\n  );\n}`,
    hints: [
      "name state'ini oluştur ve input'u controlled yap.",
      "form'a onSubmit ekle, fonksiyon içinde e.preventDefault() çağır.",
      "Submit sonrası setSent(true) yaparak <p>Gönderildi</p> göster.",
    ],
    challenge: "name state'i olan controlled input ve form oluştur; onSubmit'te preventDefault çağrılıp sent state'i true yapılsın, true iken <p>Gönderildi</p> gösterilsin.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [name, setName] = useState("");\n  const [sent, setSent] = useState(false);\n\n  function handleSubmit(e) {\n    // TODO: e.preventDefault() çağır ve setSent(true) yap\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <button type="submit">Gönder</button>\n      {sent && <p>Gönderildi</p>}\n    </form>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "regex", value: "onSubmit=\\{", label: "onSubmit kullanıldı" },
      { type: "regex", value: "preventDefault\\(", label: "preventDefault çağrıldı" },
      { type: "regex", value: "setSent\\(\\s*true\\s*\\)", label: "sent state'i true yapılıyor" },
    ],
  },
  {
    id: "react-136",
    level: 136,
    language: "react",
    title: "Obje state güncelleme (spread)",
    description: "Obje state'i spread operatörüyle güncelle.",
    explanation:
      "State bir obje olduğunda, sadece bir alanı değiştirmek istesen bile tüm objeyi yeniden oluşturmalısın.\nSpread operatörü (`...`) eski değerleri kopyalar: `setUser({ ...user, name: \"Yeni\" })`.",
    example: `const [user, setUser] = useState({ name: "Ali", age: 20 });\nfunction updateName() {\n  setUser({ ...user, name: "Veli" });\n}`,
    hints: [
      "user state'ini { name: 'Ali', age: 20 } ile oluştur.",
      "Bir butona onClick ekle, içinde setUser({ ...user, age: user.age + 1 }) çağır.",
      "<p>{user.name} - {user.age}</p> ile göster.",
    ],
    challenge: "user = {name:'Ali', age:20} state'i yap; buton tıklanınca spread ile age'i 1 artır; <p> ile name ve age'i göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [user, setUser] = useState({ name: "Ali", age: 20 });\n\n  function handleClick() {\n    // TODO: setUser({ ...user, age: user.age + 1 }) çağır\n  }\n\n  return (\n    <div>\n      <p>{user.name} - {user.age}</p>\n      <button onClick={handleClick}>Yaşlan</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "user gösteriliyor", text: "Ali" },
      { type: "regex", value: "\\.\\.\\.user", label: "Spread operatörü kullanıldı" },
      { type: "regex", value: "setUser\\(", label: "setUser çağrılıyor" },
    ],
  },
  {
    id: "react-137",
    level: 137,
    language: "react",
    title: "Diziye eleman ekleme",
    description: "State dizisine spread ile yeni eleman ekle.",
    explanation:
      "Diziler de state olabilir. Yeni eleman eklerken diziyi doğrudan değiştirmek yerine (`push`), spread ile yeni bir dizi oluşturmalısın: `setItems([...items, yeni])`.\nBu, React'in değişikliği fark etmesi için gereklidir.",
    example: `const [items, setItems] = useState(["a"]);\nfunction addItem() {\n  setItems([...items, "b"]);\n}`,
    hints: [
      "items state'ini [\"elma\"] ile başlat.",
      "Bir buton ekle, onClick ile setItems([...items, \"armut\"]) çağır.",
      "items.map ile <li key={item}>{item}</li> listele.",
    ],
    challenge: "items = ['elma'] state'i oluştur; butona tıklayınca 'armut' ekle (spread ile); listeyi <li key={...}> ile göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState(["elma"]);\n\n  function addItem() {\n    // TODO: setItems([...items, "armut"]) çağır\n  }\n\n  return (\n    <div>\n      <button onClick={addItem}>Ekle</button>\n      <ul>\n        {items.map((item) => (\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", label: "elma listede", text: "elma" },
      { type: "regex", value: "\\.\\.\\.items", label: "Spread ile dizi güncellendi" },
      { type: "regex", value: "setItems\\(", label: "setItems çağrılıyor" },
    ],
  },
  {
    id: "react-138",
    level: 138,
    language: "react",
    title: "filter ile silme",
    description: "Dizi state'inden filter ile eleman çıkar.",
    explanation:
      "Bir öğeyi listeden silmek için `.filter()` kullanılır; koşula uymayanlar elenir ve yeni bir dizi elde edilir.\nÖrneğin `setItems(items.filter((item) => item !== hedef))` hedef dışındaki her şeyi tutar.",
    example: `function removeItem(target) {\n  setItems(items.filter((item) => item !== target));\n}`,
    hints: [
      "items state'ini ['elma','armut'] ile başlat.",
      "Her <li> yanına bir sil butonu koy, onClick ile filter çağır.",
      "onClick={() => setItems(items.filter((i) => i !== item))}",
    ],
    challenge: "items = ['elma','armut'] listesinde her elemanın yanına bir 'Sil' butonu koy; tıklanınca filter ile o elemanı çıkar.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState(["elma", "armut"]);\n\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item}>\n          {item}\n          {/* TODO: Sil butonu ekle, onClick ile filter çağır */}\n          <button>Sil</button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", label: "2 eleman var", count: 2 },
      { type: "regex", value: "\\.filter\\(", label: "filter kullanıldı" },
      { type: "regex", value: "setItems\\(", label: "setItems çağrılıyor" },
    ],
  },
  {
    id: "react-139",
    level: 139,
    language: "react",
    title: "prev => prev + 1",
    description: "Fonksiyonel state güncellemesi kullan.",
    explanation:
      "Yeni state, eski state'e bağlıysa `setCount(prev => prev + 1)` şeklinde fonksiyon vermek daha güvenlidir.\nBöylece React her zaman en güncel değeri kullanır, özellikle art arda güncellemelerde önemlidir.",
    example: `function App() {\n  const [count, setCount] = useState(0);\n  function addTwice() {\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n  }\n  return <button onClick={addTwice}>{count}</button>;\n}`,
    hints: [
      "count state'ini oluştur.",
      "Bir fonksiyon içinde setCount'u iki kez, prev => prev + 1 şeklinde çağır.",
      "function addTwice() { setCount((prev) => prev + 1); setCount((prev) => prev + 1); }",
    ],
    challenge: "count state'i oluştur; addTwice fonksiyonu setCount(prev => prev + 1)'i iki kez çağırsın; butonla tetikle.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  function addTwice() {\n    // TODO: setCount((prev) => prev + 1) iki kez çağır\n  }\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={addTwice}>+2</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "button", label: "button var", count: 1 },
      { type: "regex", value: "setCount\\(\\s*\\(?prev\\)?\\s*=>\\s*prev\\s*\\+\\s*1\\s*\\)", label: "Fonksiyonel güncelleme kullanıldı" },
    ],
  },
  {
    id: "react-140",
    level: 140,
    language: "react",
    title: "Lifting State Up",
    description: "State'i ortak ata bileşene taşı.",
    explanation:
      "İki kardeş bileşenin aynı veriyi paylaşması gerekiyorsa, state'i onların ortak ebeveynine taşırsın; buna \"lifting state up\" denir.\nEbeveyn, state'i ve onu değiştiren fonksiyonu props olarak çocuklara aktarır.",
    example: `function Child({ count, onAdd }) {\n  return <button onClick={onAdd}>{count}</button>;\n}\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onAdd={() => setCount(count + 1)} />;\n}`,
    hints: [
      "count state'ini App bileşeninde tut.",
      "Display bileşenine count'u prop olarak ver.",
      "Buttons bileşenine onAdd fonksiyonunu prop olarak ver: <Buttons onAdd={() => setCount(count + 1)} />",
    ],
    challenge: "App'te count state'i tut; Display bileşeni count'u props ile gösterir, Buttons bileşeni onAdd prop'uyla gelen fonksiyonu tıklamada çağırır.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction Display({ count }) {\n  return <p>{count}</p>;\n}\n\nfunction Buttons({ onAdd }) {\n  return <button onClick={onAdd}>Artır</button>;\n}\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      {/* TODO: Display'e count, Buttons'a onAdd prop olarak ver */}\n      <Display count={0} />\n      <Buttons onAdd={() => {}} />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "regex", value: "<Display\\s+count=\\{count\\}", label: "Display'e count aktarılıyor" },
      { type: "regex", value: "<Buttons\\s+onAdd=\\{", label: "Buttons'a onAdd aktarılıyor" },
      { type: "regex", value: "setCount\\(", label: "setCount kullanıldı" },
    ],
  },
  {
    id: "react-141",
    level: 141,
    language: "react",
    title: "useEffect []",
    description: "Bileşen ilk render olduğunda kod çalıştır.",
    explanation:
      "`useEffect(fn, [])` içindeki fonksiyon, bileşen ekrana ilk geldiğinde bir kez çalışır.\nİkinci parametre olan boş dizi `[]`, effect'in sadece bir kere çalışmasını sağlar.",
    example: `const { useEffect } = React;\nuseEffect(() => {\n  console.log("mount oldu");\n}, []);`,
    hints: [
      "Dosyanın başında const { useState, useEffect } = React; ekle.",
      "useEffect içinde setMessage(\"Yüklendi\") çağır, ikinci parametre [] olsun.",
      "useEffect(() => { setMessage(\"Yüklendi\"); }, []);",
    ],
    challenge: "message state'i (\"\") oluştur; useEffect ile ilk render'da message'ı 'Yüklendi' yap ve <p> ile göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useEffect } = React;\n\nfunction App() {\n  const [message, setMessage] = useState("");\n\n  // TODO: useEffect(() => { setMessage("Yüklendi"); }, []);\n\n  return <p>{message}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "Yüklendi yazıyor", text: "Yüklendi" },
      { type: "regex", value: "useEffect\\(\\s*\\(\\)\\s*=>\\s*\\{[\\s\\S]*?\\}\\s*,\\s*\\[\\]\\s*\\)", label: "useEffect boş dizi ile kullanıldı" },
    ],
  },
  {
    id: "react-142",
    level: 142,
    language: "react",
    title: "State değişince effect",
    description: "Bağımlılık dizisiyle belirli state değişince effect çalıştır.",
    explanation:
      "`useEffect(fn, [deger])` yazarsan, fn sadece `deger` değiştiğinde tekrar çalışır.\nBu, belirli bir state veya prop değiştiğinde bir işlem yapmak istediğinde kullanışlıdır.",
    example: `useEffect(() => {\n  console.log("count değişti:", count);\n}, [count]);`,
    hints: [
      "count state'ini oluştur, bir buton ile artır.",
      "useEffect ekle, bağımlılık dizisine [count] yaz.",
      "useEffect(() => { setMessage(\"count: \" + count); }, [count]);",
    ],
    challenge: "count state'i ve artırma butonu yap; useEffect [count] bağımlılığıyla message state'ini 'count: X' yapsın; message'ı göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useEffect } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  const [message, setMessage] = useState("");\n\n  // TODO: useEffect(() => { setMessage("count: " + count); }, [count]);\n\n  return (\n    <div>\n      <p>{message}</p>\n      <button onClick={() => setCount(count + 1)}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "count: 0 yazıyor", text: "count: 0" },
      { type: "regex", value: "useEffect\\([\\s\\S]*?,\\s*\\[count\\]\\s*\\)", label: "useEffect [count] bağımlılığıyla kullanıldı" },
    ],
  },
  {
    id: "react-143",
    level: 143,
    language: "react",
    title: "Cleanup fonksiyonu",
    description: "useEffect'ten bir temizleme fonksiyonu döndür.",
    explanation:
      "useEffect içinde bir fonksiyon `return` edilirse, bileşen kaldırılırken veya effect tekrar çalışmadan önce bu fonksiyon çalışır. Buna \"cleanup\" denir.\nÖrneğin bir zamanlayıcıyı (`setInterval`) durdurmak için kullanılır: `return () => clearInterval(id);`.",
    example: `useEffect(() => {\n  const id = setInterval(() => console.log("tik"), 1000);\n  return () => clearInterval(id);\n}, []);`,
    hints: [
      "useEffect içinde bir setInterval başlat.",
      "useEffect'in sonunda bir cleanup fonksiyonu return et.",
      "return () => clearInterval(id); ile interval'ı temizle.",
    ],
    challenge: "useEffect ile bir interval başlat (setSeconds ile artır) ve cleanup fonksiyonunda clearInterval çağır.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useEffect } = React;\n\nfunction App() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setSeconds((prev) => prev + 1);\n    }, 1000);\n    // TODO: return () => clearInterval(id);\n  }, []);\n\n  return <p>{seconds}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "p var", count: 1 },
      { type: "regex", value: "return\\s*\\(\\)\\s*=>\\s*clearInterval\\(", label: "Cleanup fonksiyonu clearInterval çağırıyor" },
      { type: "regex", value: "setInterval\\(", label: "setInterval kullanıldı" },
    ],
  },
  {
    id: "react-144",
    level: 144,
    language: "react",
    title: "Mock API (setTimeout + Promise)",
    description: "Sahte bir API çağrısını Promise ile simüle et.",
    explanation:
      "Gerçek bir sunucu olmadan API davranışını taklit etmek için `setTimeout` içinde bir `Promise` çözülebilir (resolve).\nBu sahte istek, useEffect içinde çağrılıp gelen veriyle state güncellenebilir.",
    example: `function fetchData() {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve("veri"), 300);\n  });\n}`,
    hints: [
      "fetchData fonksiyonu bir Promise döndürsün, setTimeout içinde resolve(\"Merhaba API\") çağrılsın.",
      "useEffect içinde fetchData().then(data => setData(data)) çağır.",
      "setTimeout süresi 300ms gibi kısa olsun ki test hızlı geçsin.",
    ],
    challenge: "fetchData fonksiyonu 300ms sonra 'Merhaba API' ile resolve olan bir Promise döndürsün; useEffect içinde çağırıp data state'ini güncelle ve göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useEffect } = React;\n\nfunction fetchData() {\n  // TODO: 300ms sonra "Merhaba API" ile resolve eden Promise döndür\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(""), 300);\n  });\n}\n\nfunction App() {\n  const [data, setData] = useState("");\n\n  useEffect(() => {\n    fetchData().then((result) => setData(result));\n  }, []);\n\n  return <p>{data}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "Merhaba API yazıyor (500ms içinde)", text: "Merhaba API" },
      { type: "regex", value: "new Promise\\(", label: "Promise kullanıldı" },
      { type: "regex", value: "resolve\\(", label: "resolve çağrılıyor" },
    ],
  },
  {
    id: "react-145",
    level: 145,
    language: "react",
    title: "Loading / error render",
    description: "Yükleniyor ve hata durumlarını ayrı göster.",
    explanation:
      "Gerçek uygulamalarda veri gelene kadar \"Yükleniyor...\" gösterilir; hata olursa hata mesajı gösterilir.\nBunun için genelde `loading` ve `error` gibi ayrı state'ler tutulur ve koşullu render ile ekrana yansıtılır.",
    example: `if (loading) return <p>Yükleniyor...</p>;\nif (error) return <p>Hata oluştu</p>;\nreturn <p>{data}</p>;`,
    hints: [
      "loading state'ini true ile başlat, veri gelince false yap.",
      "if (loading) return <p>Yükleniyor...</p>; şeklinde erken dönüş yap.",
      "Veri geldikten sonra setLoading(false) çağır ve <p>{data}</p> göster.",
    ],
    challenge: "loading state'i (true) oluştur; useEffect ile 300ms sonra data'yı set edip loading'i false yap; loading true iken 'Yükleniyor...' göster, false olunca data'yı göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useEffect } = React;\n\nfunction App() {\n  const [loading, setLoading] = useState(true);\n  const [data, setData] = useState("");\n\n  useEffect(() => {\n    setTimeout(() => {\n      setData("Merhaba Veri");\n      // TODO: setLoading(false) çağır\n    }, 300);\n  }, []);\n\n  // TODO: loading true ise <p>Yükleniyor...</p> döndür\n  return <p>{data}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", label: "Sonunda 'Merhaba Veri' gösteriliyor (500ms içinde)", text: "Merhaba Veri" },
      { type: "regex", value: "setLoading\\(\\s*false\\s*\\)", label: "loading false yapılıyor" },
      { type: "regex", value: "if\\s*\\(\\s*loading\\s*\\)", label: "loading durumu kontrol ediliyor" },
    ],
  },
];
