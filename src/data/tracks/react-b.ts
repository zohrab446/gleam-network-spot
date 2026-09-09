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

const STYLE_CSS = `body {
  font-family: sans-serif;
  padding: 16px;
}`;

export const REACT_B: Lesson[] = [
  {
    id: "react-146",
    level: 146,
    language: "react",
    title: "localStorage senkronizasyonu",
    description: "useEffect ile state'i localStorage'a kaydet.",
    explanation:
      "Bir state'i sayfa yenilense bile korumak için `localStorage` kullanabilirsin.\nuseEffect içinde `localStorage.setItem` ile her değişiklikte kaydedersin, `useState`'in başlangıç değerinde de `localStorage.getItem` ile okursun.",
    example: `const [name, setName] = useState(() => localStorage.getItem("name") || "");\nuseEffect(() => {\n  localStorage.setItem("name", name);\n}, [name]);`,
    hints: [
      "useState'in başlangıç değerini bir fonksiyon yaparak localStorage'dan oku.",
      "useEffect ile name değiştiğinde localStorage.setItem('note', note) çağır.",
      "const [note, setNote] = useState(() => localStorage.getItem('note') || ''); useEffect(() => { localStorage.setItem('note', note); }, [note]);",
    ],
    challenge:
      "'note' adında bir state oluştur, başlangıç değerini localStorage'dan oku. Bir input ile state'i güncelle ve useEffect ile her değişiklikte localStorage'a kaydet. Sayfada input'un value'sunu göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useEffect } = React;\n\nfunction App() {\n  // TODO: note state'ini localStorage'dan başlat\n  const [note, setNote] = useState("");\n\n  // TODO: useEffect ile note'u localStorage'a kaydet\n\n  return (\n    <div>\n      <input value={note} onChange={(e) => setNote(e.target.value)} />\n      <p>Not: {note}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Not:", label: "Not metni gösteriliyor" },
      { type: "regex", value: "localStorage\\.getItem\\(", label: "localStorage.getItem kullanılmış" },
      { type: "regex", value: "localStorage\\.setItem\\(", label: "localStorage.setItem kullanılmış" },
      { type: "regex", value: "useEffect\\(", label: "useEffect kullanılmış" },
    ],
  },
  {
    id: "react-147",
    level: 147,
    language: "react",
    title: "useRef ile focus",
    description: "useRef ile bir input'a otomatik odaklan.",
    explanation:
      "`useRef` bir DOM elemanına doğrudan erişmeni sağlar.\nRef'i `<input ref={inputRef} />` gibi bağlarsın, sonra `inputRef.current.focus()` ile o elemana odaklanabilirsin.",
    example: `const inputRef = useRef(null);\nuseEffect(() => {\n  inputRef.current.focus();\n}, []);\nreturn <input ref={inputRef} />;`,
    hints: [
      "useRef(null) ile bir ref oluştur.",
      "input elemanına ref={inputRef} ekle.",
      "useEffect(() => { inputRef.current.focus(); }, []); ile sayfa açılınca odaklan.",
    ],
    challenge:
      "Bir input oluştur, useRef ile referansını al ve useEffect (boş bağımlılık dizisi) içinde sayfa yüklendiğinde inputa otomatik focus ver. Ayrıca 'Ad girin' başlıklı bir h2 göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useRef, useEffect } = React;\n\nfunction App() {\n  // TODO: inputRef oluştur ve mount olunca focus ver\n\n  return (\n    <div>\n      <h2>Ad girin</h2>\n      <input type="text" />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "h2", text: "Ad girin", label: "Başlık gösteriliyor" },
      { type: "dom", selector: "input", count: 1, label: "input elemanı var" },
      { type: "regex", value: "useRef\\(", label: "useRef kullanılmış" },
      { type: "regex", value: "\\.current\\.focus\\(\\)", label: "focus() çağrılmış" },
    ],
  },
  {
    id: "react-148",
    level: 148,
    language: "react",
    title: "Re-render tetiklemeyen useRef",
    description: "useRef ile render'ı tetiklemeden değer sakla.",
    explanation:
      "`useRef` sadece DOM elemanları için değil, render'ı tetiklemeden bir değeri hatırlamak için de kullanılır.\nÖrneğin bir tıklama sayacını useRef ile tutarsan, değeri değişse bile bileşen yeniden render olmaz.",
    example: `const renderCount = useRef(0);\nrenderCount.current += 1;\nconsole.log(renderCount.current);`,
    hints: [
      "useRef(0) ile bir sayaç oluştur, state kullanma.",
      "Her buton tıklamasında clickCount.current değerini artır.",
      "const clickCount = useRef(0); const handleClick = () => { clickCount.current += 1; setMsg('Tıklama: ' + clickCount.current); };",
    ],
    challenge:
      "useRef ile 'clickCount' adında render tetiklemeyen bir sayaç oluştur. Butona her tıklamada clickCount.current'i artır ve ekrandaki bir p etiketine (ayrı bir state kullanarak) güncel değeri yaz.",
    files: [
      {
        name: "App.jsx",
        content: `const { useRef, useState } = React;\n\nfunction App() {\n  const clickCount = useRef(0);\n  const [msg, setMsg] = useState("Tıklama: 0");\n\n  const handleClick = () => {\n    // TODO: clickCount.current değerini artır ve msg'i güncelle\n  };\n\n  return (\n    <div>\n      <button onClick={handleClick}>Tıkla</button>\n      <p>{msg}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Tıklama:", label: "Sayaç metni gösteriliyor" },
      { type: "regex", value: "useRef\\(", label: "useRef kullanılmış" },
      { type: "regex", value: "clickCount\\.current", label: "clickCount.current kullanılmış" },
    ],
  },
  {
    id: "react-149",
    level: 149,
    language: "react",
    title: "Custom hook temeli (useCounter)",
    description: "Kendi hook'unu yaz: useCounter.",
    explanation:
      "Tekrar eden state mantığını bir fonksiyona çıkarıp isim başına `use` koyarsan buna custom hook denir.\nBu, kodu birden fazla bileşende tekrar kullanmanı sağlar.",
    example: `function useCounter(start = 0) {\n  const [count, setCount] = useState(start);\n  const increment = () => setCount((c) => c + 1);\n  return { count, increment };\n}`,
    hints: [
      "App bileşeninin dışında function useCounter(start) tanımla.",
      "İçinde useState kullan ve { count, increment } döndür.",
      "function useCounter(start = 0) { const [count, setCount] = useState(start); const increment = () => setCount((c) => c + 1); return { count, increment }; }",
    ],
    challenge:
      "useCounter adında, başlangıç değeri alan bir custom hook yaz. Hook { count, increment } döndürsün. App içinde bu hook'u kullan, count'u göster ve butonla artır.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\n// TODO: useCounter custom hook'unu yaz\n\nfunction App() {\n  const { count, increment } = useCounter(0);\n\n  return (\n    <div>\n      <p>Sayaç: {count}</p>\n      <button onClick={increment}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Sayaç: 0", label: "Başlangıç sayaç 0" },
      { type: "regex", value: "function\\s+useCounter\\(", label: "useCounter fonksiyonu tanımlı" },
      { type: "regex", value: "return\\s*\\{\\s*count", label: "hook count döndürüyor" },
    ],
  },
  {
    id: "react-150",
    level: 150,
    language: "react",
    title: "Mini proje: To-Do List",
    description: "State ve liste render ile basit bir yapılacaklar listesi.",
    explanation:
      "Şimdiye kadar öğrendiklerini birleştirerek küçük bir to-do listesi yapacaksın.\nBir input ile yeni görev eklenir, görevler bir dizi state'inde tutulur ve `.map` ile listelenir.",
    example: `const [todos, setTodos] = useState([]);\nconst addTodo = (text) => setTodos([...todos, text]);\n{todos.map((t, i) => <li key={i}>{t}</li>)}`,
    hints: [
      "todos state'ini boş dizi ile başlat.",
      "Input değerini ayrı bir state (text) ile tut, butona basınca todos'a ekle.",
      "const addTodo = () => { setTodos([...todos, text]); setText(''); };",
    ],
    challenge:
      "todos adında dizi state'i ve text adında input state'i oluştur. 'Ekle' butonuna basınca text'i todos'a ekle ve input'u temizle. Görevleri <ul><li key=...> ile listele.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState("");\n\n  const addTodo = () => {\n    // TODO: text'i todos'a ekle, text'i temizle\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <button onClick={addTodo}>Ekle</button>\n      <ul>\n        {todos.map((t, i) => (\n          <li key={i}>{t}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "input", count: 1, label: "input var" },
      { type: "dom", selector: "button", text: "Ekle", label: "Ekle butonu var" },
      { type: "regex", value: "key=\\{", label: "key kullanılmış" },
      { type: "regex", value: "\\.map\\(", label: "map ile listeleme yapılmış" },
    ],
  },
  {
    id: "react-151",
    level: 151,
    language: "react",
    title: "useMemo",
    description: "Pahalı hesaplamayı useMemo ile önbelleğe al.",
    explanation:
      "`useMemo`, bir hesaplamanın sonucunu bağımlılıklar değişmediği sürece yeniden hesaplamadan saklar.\nBu, performans için özellikle büyük listelerde veya karmaşık hesaplamalarda faydalıdır.",
    example: `const total = useMemo(() => {\n  return items.reduce((a, b) => a + b, 0);\n}, [items]);`,
    hints: [
      "useMemo'nun ilk parametresi bir fonksiyon, ikincisi bağımlılık dizisidir.",
      "num'un karesini useMemo ile hesapla, bağımlılık [num] olsun.",
      "const square = useMemo(() => num * num, [num]);",
    ],
    challenge:
      "num adında bir number state oluştur (başlangıç 4). useMemo ile num'un karesini hesapla ve 'Kare: <değer>' şeklinde göster. Bir buton ile num'u artır.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useMemo } = React;\n\nfunction App() {\n  const [num, setNum] = useState(4);\n\n  // TODO: useMemo ile square hesapla\n  const square = num * num;\n\n  return (\n    <div>\n      <p>Kare: {square}</p>\n      <button onClick={() => setNum(num + 1)}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Kare: 16", label: "Başlangıç karesi doğru" },
      { type: "regex", value: "useMemo\\(", label: "useMemo kullanılmış" },
    ],
  },
  {
    id: "react-152",
    level: 152,
    language: "react",
    title: "useCallback",
    description: "Fonksiyonu useCallback ile önbelleğe al.",
    explanation:
      "`useCallback`, bir fonksiyonu bağımlılıklar değişmediği sürece yeniden oluşturmadan saklar.\nBu genellikle `React.memo` ile sarılmış alt bileşenlere prop olarak fonksiyon geçerken kullanılır, gereksiz yeniden render'ları önler.",
    example: `const handleClick = useCallback(() => {\n  setCount((c) => c + 1);\n}, []);`,
    hints: [
      "useCallback'in ilk parametresi fonksiyon, ikincisi bağımlılık dizisidir.",
      "handleClick fonksiyonunu useCallback ile sar, bağımlılık dizisi boş olsun.",
      "const handleClick = useCallback(() => setCount((c) => c + 1), []);",
    ],
    challenge:
      "count adında state oluştur (0). handleClick fonksiyonunu useCallback ile tanımla (boş bağımlılık dizisi) ve count'u artırsın. Butona bağla ve count'u göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState, useCallback } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  // TODO: handleClick'i useCallback ile tanımla\n  const handleClick = () => setCount(count + 1);\n\n  return (\n    <div>\n      <p>Sayaç: {count}</p>\n      <button onClick={handleClick}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Sayaç: 0", label: "Başlangıç sayaç 0" },
      { type: "regex", value: "useCallback\\(", label: "useCallback kullanılmış" },
    ],
  },
  {
    id: "react-153",
    level: 153,
    language: "react",
    title: "React.memo",
    description: "Bir bileşeni memo ile gereksiz render'lardan koru.",
    explanation:
      "`React.memo`, bir bileşeni sarmalayarak props değişmediği sürece yeniden render edilmesini engeller.\nBu, özellikle büyük listelerde performansı artırır.",
    example: `const Item = React.memo(function Item({ text }) {\n  return <li>{text}</li>;\n});`,
    hints: [
      "Item bileşenini React.memo(...) ile sar.",
      "memo, bir fonksiyon bileşeni parametre olarak alır ve yenisini döndürür.",
      "const Item = memo(function Item({ text }) { return <li>{text}</li>; });",
    ],
    challenge:
      "Item adında bir bileşen oluştur ve memo ile sar. Item, text prop'unu <li> içinde göstersin. App içinde bir isim listesini Item bileşenleriyle render et.",
    files: [
      {
        name: "App.jsx",
        content: `const { memo } = React;\n\n// TODO: Item bileşenini memo ile oluştur\nfunction Item({ text }) {\n  return <li>{text}</li>;\n}\n\nfunction App() {\n  const names = ["Ali", "Veli", "Ayşe"];\n  return (\n    <ul>\n      {names.map((n, i) => (\n        <Item key={i} text={n} />\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", count: 3, label: "3 liste öğesi var" },
      { type: "dom", selector: "li", text: "Ali", label: "Ali gösteriliyor" },
      { type: "regex", value: "React\\.memo\\(|memo\\(", label: "memo kullanılmış" },
    ],
  },
  {
    id: "react-154",
    level: 154,
    language: "react",
    title: "useReducer temelleri",
    description: "useState yerine useReducer ile state yönet.",
    explanation:
      "`useReducer`, karmaşık state mantığı için `useState`'e alternatiftir.\nBir `reducer` fonksiyonu (state, action) alır ve yeni state döndürür; `dispatch` ile action gönderirsin.",
    example: `function reducer(state, action) {\n  if (action.type === "increment") return state + 1;\n  return state;\n}\nconst [count, dispatch] = useReducer(reducer, 0);`,
    hints: [
      "reducer fonksiyonunu App dışında tanımla, action.type'a göre switch/if kullan.",
      "useReducer(reducer, 0) ile [count, dispatch] al.",
      "dispatch({ type: 'increment' }) ile butonu bağla.",
    ],
    challenge:
      "reducer fonksiyonu yaz: 'increment' action'ında state'i 1 artırsın, 'decrement' action'ında 1 azaltsın. useReducer ile count state'i oluştur (başlangıç 0). İki buton ile artır/azalt, count'u göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useReducer } = React;\n\n// TODO: reducer fonksiyonunu yaz\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction App() {\n  const [count, dispatch] = useReducer(reducer, 0);\n\n  return (\n    <div>\n      <p>Sayaç: {count}</p>\n      <button onClick={() => dispatch({ type: "increment" })}>+</button>\n      <button onClick={() => dispatch({ type: "decrement" })}>-</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Sayaç: 0", label: "Başlangıç sayaç 0" },
      { type: "regex", value: "useReducer\\(", label: "useReducer kullanılmış" },
      { type: "regex", value: "increment", label: "increment action'ı kullanılmış" },
    ],
  },
  {
    id: "react-155",
    level: 155,
    language: "react",
    title: "Karmaşık form + useReducer",
    description: "Birden fazla form alanını useReducer ile yönet.",
    explanation:
      "Birden fazla input alanı olan formlarda tüm state'i tek bir reducer ile yönetmek kodu sadeleştirir.\nreducer, gelen action'ın `field` ve `value`'suna göre state nesnesini günceller.",
    example: `function reducer(state, action) {\n  return { ...state, [action.field]: action.value };\n}\nconst [form, dispatch] = useReducer(reducer, { name: "", age: "" });`,
    hints: [
      "reducer, { ...state, [action.field]: action.value } döndürsün.",
      "useReducer(reducer, { name: '', email: '' }) ile başlat.",
      "onChange={(e) => dispatch({ field: 'name', value: e.target.value })}",
    ],
    challenge:
      "reducer ile { name: '', email: '' } başlangıç state'ine sahip bir form yönet. İki input (name, email) oluştur, her biri dispatch ile ilgili alanı güncellesin. Girilen name ve email'i ekranda göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useReducer } = React;\n\n// TODO: reducer fonksiyonunu yaz\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction App() {\n  const [form, dispatch] = useReducer(reducer, { name: "", email: "" });\n\n  return (\n    <div>\n      <input\n        placeholder="İsim"\n        value={form.name}\n        onChange={(e) => dispatch({ field: "name", value: e.target.value })}\n      />\n      <input\n        placeholder="Email"\n        value={form.email}\n        onChange={(e) => dispatch({ field: "email", value: e.target.value })}\n      />\n      <p>İsim: {form.name}, Email: {form.email}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "İsim:", label: "İsim gösteriliyor" },
      { type: "regex", value: "useReducer\\(", label: "useReducer kullanılmış" },
      { type: "regex", value: "action\\.field", label: "action.field kullanılmış" },
    ],
  },
  {
    id: "react-156",
    level: 156,
    language: "react",
    title: "createContext",
    description: "Context oluşturarak veri paylaşımına başla.",
    explanation:
      "`createContext`, bileşen ağacında prop geçmeden veri paylaşmanı sağlayan bir Context nesnesi oluşturur.\nBu ders sadece context'i oluşturmayı, sonraki derste Provider ile sağlamayı öğreneceksin.",
    example: `const ThemeContext = createContext("light");`,
    hints: [
      "createContext fonksiyonunu App dışında çağır.",
      "Varsayılan değer olarak bir string ver, örn. 'light'.",
      "const ThemeContext = createContext('light');",
    ],
    challenge:
      "'ThemeContext' adında, varsayılan değeri 'light' olan bir context oluştur (App bileşeni dışında). App içinde 'Context hazır' yazan bir p göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { createContext } = React;\n\n// TODO: ThemeContext'i oluştur\n\nfunction App() {\n  return (\n    <div>\n      <p>Context hazır</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Context hazır", label: "Metin gösteriliyor" },
      { type: "regex", value: "createContext\\(", label: "createContext kullanılmış" },
    ],
  },
  {
    id: "react-157",
    level: 157,
    language: "react",
    title: "Provider",
    description: "Context.Provider ile değer sağla.",
    explanation:
      "Bir context oluşturduktan sonra, `<Context.Provider value={...}>` ile alt bileşenlere bu değeri sağlayabilirsin.\nProvider içindeki tüm bileşenler bu değere erişebilir.",
    example: `<ThemeContext.Provider value="dark">\n  <Child />\n</ThemeContext.Provider>`,
    hints: [
      "ThemeContext.Provider ile App içeriğini sar.",
      "value prop'una 'dark' değerini ver.",
      "<ThemeContext.Provider value='dark'><Child /></ThemeContext.Provider>",
    ],
    challenge:
      "ThemeContext oluştur. App içinde ThemeContext.Provider ile value='dark' vererek bir Child bileşenini sar. Child, 'Tema: sağlandı' yazan bir p göstersin (henüz context okumana gerek yok).",
    files: [
      {
        name: "App.jsx",
        content: `const { createContext } = React;\n\nconst ThemeContext = createContext("light");\n\nfunction Child() {\n  return <p>Tema: sağlandı</p>;\n}\n\nfunction App() {\n  // TODO: ThemeContext.Provider ile Child'ı sar, value="dark" ver\n  return <Child />;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Tema: sağlandı", label: "Child render ediliyor" },
      { type: "regex", value: "createContext\\(", label: "createContext kullanılmış" },
      { type: "regex", value: "\\.Provider", label: "Provider kullanılmış" },
    ],
  },
  {
    id: "react-158",
    level: 158,
    language: "react",
    title: "useContext",
    description: "Provider'dan sağlanan değeri useContext ile oku.",
    explanation:
      "`useContext(Context)`, en yakın Provider'dan sağlanan değeri okumanı sağlar.\nBöylece prop geçirmeden derin bileşenlerde bile context değerine erişebilirsin.",
    example: `const theme = useContext(ThemeContext);\nreturn <p>Tema: {theme}</p>;`,
    hints: [
      "Child içinde useContext(ThemeContext) çağır.",
      "Dönen değeri bir değişkene ata ve p içinde göster.",
      "const theme = useContext(ThemeContext); return <p>Tema: {theme}</p>;",
    ],
    challenge:
      "ThemeContext oluştur, App'te Provider ile value='dark' ver. Child bileşeninde useContext ile bu değeri oku ve 'Tema: dark' şeklinde göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { createContext, useContext } = React;\n\nconst ThemeContext = createContext("light");\n\nfunction Child() {\n  // TODO: useContext ile theme'i oku ve göster\n  return <p>Tema: ?</p>;\n}\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Tema: dark", label: "Context değeri okundu" },
      { type: "regex", value: "useContext\\(", label: "useContext kullanılmış" },
    ],
  },
  {
    id: "react-159",
    level: 159,
    language: "react",
    title: "Tema Context'i",
    description: "Context ile açık/koyu tema değiştirme.",
    explanation:
      "Context, state ile birlikte kullanılınca dinamik hale gelir.\nProvider'ın value'suna bir state ve onu değiştiren fonksiyonu birlikte verirsen, herhangi bir alt bileşen temayı değiştirebilir.",
    example: `const [theme, setTheme] = useState("light");\n<ThemeContext.Provider value={{ theme, setTheme }}>\n  <Child />\n</ThemeContext.Provider>`,
    hints: [
      "Provider'ın value'suna { theme, setTheme } nesnesini ver.",
      "Child içinde useContext ile { theme, setTheme } al, butonla setTheme çağır.",
      "onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}",
    ],
    challenge:
      "theme state'i (başlangıç 'light') oluştur. ThemeContext.Provider'a { theme, setTheme } geçir. Child bileşeninde useContext ile bunu al, 'Tema: light' göster ve butonla temayı 'dark' ile 'light' arasında değiştir.",
    files: [
      {
        name: "App.jsx",
        content: `const { createContext, useContext, useState } = React;\n\nconst ThemeContext = createContext(null);\n\nfunction Child() {\n  // TODO: useContext ile theme ve setTheme'i al\n  return (\n    <div>\n      <p>Tema: light</p>\n      <button>Değiştir</button>\n    </div>\n  );\n}\n\nfunction App() {\n  const [theme, setTheme] = useState("light");\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Tema: light", label: "Başlangıç teması gösteriliyor" },
      { type: "regex", value: "useContext\\(", label: "useContext kullanılmış" },
      { type: "regex", value: "setTheme\\(", label: "setTheme çağrılıyor" },
    ],
  },
  {
    id: "react-160",
    level: 160,
    language: "react",
    title: "Bileşen ayrıştırma",
    description: "Bir arayüzü birden fazla küçük bileşene ayır.",
    explanation:
      "Büyük bir bileşeni okunabilir tutmak için küçük parçalara bölmek iyi bir alışkanlıktır.\nHer bileşen tek bir işten sorumlu olmalı; App bu küçük bileşenleri bir araya getirir.",
    example: `function Header() {\n  return <h1>Başlık</h1>;\n}\nfunction Footer() {\n  return <footer>Alt bilgi</footer>;\n}\nfunction App() {\n  return (\n    <div>\n      <Header />\n      <Footer />\n    </div>\n  );\n}`,
    hints: [
      "Header, Content ve Footer adında üç ayrı bileşen tanımla.",
      "Her biri kendi JSX'ini döndürsün (h1, p, footer gibi).",
      "App içinde <Header /><Content /><Footer /> şeklinde birleştir.",
    ],
    challenge:
      "Header (h1 içinde 'Sitem'), Content (p içinde 'İçerik burada') ve Footer (footer içinde '© 2024') adında üç bileşen oluştur. App bunların hepsini render etsin.",
    files: [
      {
        name: "App.jsx",
        content: `// TODO: Header, Content, Footer bileşenlerini oluştur\n\nfunction App() {\n  return (\n    <div>\n      {/* TODO: bileşenleri kullan */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "h1", text: "Sitem", label: "Header gösteriliyor" },
      { type: "dom", selector: "p", text: "İçerik burada", label: "Content gösteriliyor" },
      { type: "dom", selector: "footer", text: "© 2024", label: "Footer gösteriliyor" },
    ],
  },
  {
    id: "react-161",
    level: 161,
    language: "react",
    title: "Tabs bileşeni",
    description: "State ile seçili sekmeyi değiştir.",
    explanation:
      "Bir Tabs bileşeni, aktif sekmeyi bir state ile takip eder.\nSekme butonuna tıklanınca state güncellenir ve sadece o sekmenin içeriği gösterilir.",
    example: `const [active, setActive] = useState("a");\n{active === "a" && <p>A içeriği</p>}\n<button onClick={() => setActive("a")}>A</button>`,
    hints: [
      "active adında bir state tanımla, başlangıç 'home' olsun.",
      "İki buton ile setActive('home') ve setActive('about') çağır.",
      "active === 'home' ? <p>Ana sayfa</p> : <p>Hakkında</p>",
    ],
    challenge:
      "active state'i (başlangıç 'home') oluştur. 'Home' ve 'About' adında iki buton koy. active 'home' ise 'Ana sayfa', 'about' ise 'Hakkında' yazan bir p göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [active, setActive] = useState("home");\n\n  return (\n    <div>\n      <button onClick={() => setActive("home")}>Home</button>\n      <button onClick={() => setActive("about")}>About</button>\n      {/* TODO: active'e göre içerik göster */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Ana sayfa", label: "Varsayılan sekme gösteriliyor" },
      { type: "dom", selector: "button", count: 2, label: "İki sekme butonu var" },
      { type: "regex", value: "setActive\\(", label: "setActive kullanılmış" },
    ],
  },
  {
    id: "react-162",
    level: 162,
    language: "react",
    title: "Accordion",
    description: "Tıklanınca açılıp kapanan bir panel yap.",
    explanation:
      "Accordion, tıklandığında içeriğini gösterip gizleyen bir bileşendir.\nBir boolean state (`open`) ile içeriğin görünürlüğünü kontrol edersin.",
    example: `const [open, setOpen] = useState(false);\n<button onClick={() => setOpen(!open)}>Aç/Kapa</button>\n{open && <p>Gizli içerik</p>}`,
    hints: [
      "open adında boolean state tanımla, başlangıç false.",
      "Butona tıklanınca setOpen(!open) çağır.",
      "{open && <p>Detaylar burada</p>}",
    ],
    challenge:
      "open state'i (başlangıç false) oluştur. 'Detaylar' butonuna tıklanınca open'ı tersine çevir. open true ise 'Detaylar burada' yazan bir p göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>Detaylar</button>\n      {/* TODO: open true ise içeriği göster */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "button", text: "Detaylar", label: "Buton var" },
      { type: "regex", value: "setOpen\\(", label: "setOpen kullanılmış" },
      { type: "regex", value: "open\\s*&&", label: "Koşullu render kullanılmış" },
    ],
  },
  {
    id: "react-163",
    level: 163,
    language: "react",
    title: "Dinamik filtreleme/arama",
    description: "Bir liste üzerinde arama kutusuyla filtreleme yap.",
    explanation:
      "Bir arama kutusuna yazılan metne göre listeyi filtrelemek çok yaygın bir kullanım örneğidir.\n`.filter()` ile diziyi input'taki metne göre daraltabilirsin.",
    example: `const filtered = items.filter((i) =>\n  i.toLowerCase().includes(query.toLowerCase())\n);`,
    hints: [
      "query adında bir state tanımla, input'a bağla.",
      "items dizisini query'ye göre .filter() ile daralt.",
      "const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));",
    ],
    challenge:
      "items = ['Elma', 'Armut', 'Kiraz', 'Muz'] dizisi ver. query state'i ile bir arama input'u oluştur. Sadece query'yi içeren öğeleri <ul><li> ile listele.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const items = ["Elma", "Armut", "Kiraz", "Muz"];\n  const [query, setQuery] = useState("");\n\n  // TODO: filtered dizisini oluştur\n  const filtered = items;\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <ul>\n        {filtered.map((i) => (\n          <li key={i}>{i}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", count: 4, label: "Başlangıçta 4 öğe var" },
      { type: "regex", value: "\\.filter\\(", label: "filter kullanılmış" },
    ],
  },
  {
    id: "react-164",
    level: 164,
    language: "react",
    title: "Pagination",
    description: "Bir listeyi sayfalara böl.",
    explanation:
      "Pagination, uzun bir listeyi sayfalara bölerek göstermeni sağlar.\nBir `page` state'i ile hangi sayfada olduğunu takip eder, dizinin ilgili dilimini `.slice()` ile alırsın.",
    example: `const pageSize = 2;\nconst start = (page - 1) * pageSize;\nconst pageItems = items.slice(start, start + pageSize);`,
    hints: [
      "page state'i (başlangıç 1) tanımla.",
      "pageSize=2 ile start hesapla ve items.slice(start, start+pageSize) yap.",
      "<button onClick={() => setPage(page + 1)}>Sonraki</button>",
    ],
    challenge:
      "items = [1,2,3,4,5,6] dizisi ver. page state'i (başlangıç 1) ile pageSize=2 kullanarak her sayfada 2 öğe göster. 'Sonraki' butonuyla page'i artır. Öğeleri <li> ile listele.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const items = [1, 2, 3, 4, 5, 6];\n  const [page, setPage] = useState(1);\n  const pageSize = 2;\n\n  // TODO: start hesapla ve pageItems oluştur\n  const pageItems = items.slice(0, pageSize);\n\n  return (\n    <div>\n      <ul>\n        {pageItems.map((i) => (\n          <li key={i}>{i}</li>\n        ))}\n      </ul>\n      <button onClick={() => setPage(page + 1)}>Sonraki</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", count: 2, label: "Sayfa başına 2 öğe" },
      { type: "regex", value: "\\.slice\\(", label: "slice kullanılmış" },
    ],
  },
  {
    id: "react-165",
    level: 165,
    language: "react",
    title: "Form validation",
    description: "Formu göndermeden önce doğrula.",
    explanation:
      "Form validasyonu, kullanıcıdan gelen verinin geçerli olup olmadığını kontrol etmektir.\nBir hata mesajı state'inde tutup, koşula göre kullanıcıya gösterebilirsin.",
    example: `if (email === "") {\n  setError("Email boş olamaz");\n} else {\n  setError("");\n}`,
    hints: [
      "error adında bir state tanımla, başlangıç boş string.",
      "Gönder butonuna tıklanınca email boşsa error'u ayarla.",
      "const handleSubmit = () => { if (email === '') setError('Email boş olamaz'); else setError(''); };",
    ],
    challenge:
      "email state'i ve error state'i oluştur. Bir input ve 'Gönder' butonu koy. Gönder'e basınca email boşsa error'a 'Email boş olamaz' yaz, doluysa error'u temizle. error varsa bir p ile göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [email, setEmail] = useState("");\n  const [error, setError] = useState("");\n\n  const handleSubmit = () => {\n    // TODO: email boşsa error'u ayarla, doluysa temizle\n  };\n\n  return (\n    <div>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button onClick={handleSubmit}>Gönder</button>\n      {error && <p>{error}</p>}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "button", text: "Gönder", label: "Gönder butonu var" },
      { type: "regex", value: "setError\\(", label: "setError kullanılmış" },
    ],
  },
  {
    id: "react-166",
    level: 166,
    language: "react",
    title: "Sepet bileşeni",
    description: "Ürünleri sepete ekleyen bir bileşen yap.",
    explanation:
      "Bir e-ticaret sepeti, seçilen ürünleri bir dizi state'inde tutar.\nHer ürün için 'Sepete Ekle' butonu, o ürünü sepet dizisine ekler.",
    example: `const [cart, setCart] = useState([]);\nconst addToCart = (product) => setCart([...cart, product]);`,
    hints: [
      "cart adında dizi state'i tanımla (boş).",
      "Her ürün için 'Sepete Ekle' butonuna onClick={() => addToCart(p)} ekle.",
      "const addToCart = (p) => setCart([...cart, p]);",
    ],
    challenge:
      "products = ['Kitap', 'Kalem', 'Defter'] dizisi ver. Her ürün için 'Sepete Ekle' butonu göster. Tıklanınca cart dizisine eklensin. Sepetteki ürün sayısını 'Sepet: N' şeklinde göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const products = ["Kitap", "Kalem", "Defter"];\n  const [cart, setCart] = useState([]);\n\n  const addToCart = (p) => {\n    // TODO: cart'a p'yi ekle\n  };\n\n  return (\n    <div>\n      {products.map((p) => (\n        <button key={p} onClick={() => addToCart(p)}>\n          Sepete Ekle: {p}\n        </button>\n      ))}\n      <p>Sepet: {cart.length}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Sepet: 0", label: "Başlangıç sepeti boş" },
      { type: "dom", selector: "button", count: 3, label: "3 ürün butonu var" },
      { type: "regex", value: "setCart\\(", label: "setCart kullanılmış" },
    ],
  },
  {
    id: "react-167",
    level: 167,
    language: "react",
    title: "Sepet toplamı hesaplama",
    description: "Sepetteki ürünlerin toplam fiyatını hesapla.",
    explanation:
      "Bir dizideki nesnelerin bir alanını toplamak için `.reduce()` kullanılır.\nSepet toplamını `useMemo` ile hesaplarsan gereksiz yeniden hesaplamayı önlersin.",
    example: `const total = useMemo(\n  () => cart.reduce((sum, item) => sum + item.price, 0),\n  [cart]\n);`,
    hints: [
      "cart, {name, price} nesnelerinden oluşan bir dizi olsun.",
      "total'i useMemo ile cart.reduce(...) kullanarak hesapla.",
      "const total = useMemo(() => cart.reduce((s, i) => s + i.price, 0), [cart]);",
    ],
    challenge:
      "cart = [{name:'Kitap', price:50}, {name:'Kalem', price:10}] dizisi ver. useMemo ile toplam fiyatı hesapla ve 'Toplam: 60' şeklinde göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useMemo } = React;\n\nfunction App() {\n  const cart = [\n    { name: "Kitap", price: 50 },\n    { name: "Kalem", price: 10 },\n  ];\n\n  // TODO: useMemo ile total hesapla\n  const total = 0;\n\n  return (\n    <div>\n      <p>Toplam: {total}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "p", text: "Toplam: 60", label: "Toplam doğru hesaplandı" },
      { type: "regex", value: "useMemo\\(", label: "useMemo kullanılmış" },
      { type: "regex", value: "\\.reduce\\(", label: "reduce kullanılmış" },
    ],
  },
  {
    id: "react-168",
    level: 168,
    language: "react",
    title: "Toast/bildirim",
    description: "Geçici bir bildirim mesajı göster.",
    explanation:
      "Toast bildirimleri kullanıcıya kısa süreliğine bilgi vermek için kullanılır.\nBir state ile mesajı gösterip, `setTimeout` içinde state'i temizleyerek belli bir süre sonra gizleyebilirsin.",
    example: `const showToast = () => {\n  setMessage("Kaydedildi!");\n  setTimeout(() => setMessage(""), 2000);\n};`,
    hints: [
      "message state'i (başlangıç boş) tanımla.",
      "Butona tıklanınca message'ı ayarla ve setTimeout ile 2 saniye sonra temizle.",
      "const showToast = () => { setMessage('Kaydedildi!'); setTimeout(() => setMessage(''), 2000); };",
    ],
    challenge:
      "message state'i oluştur. 'Kaydet' butonuna tıklanınca message'a 'Kaydedildi!' yaz ve setTimeout ile 2 saniye sonra temizle. message doluysa bir p ile göster.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [message, setMessage] = useState("");\n\n  const showToast = () => {\n    // TODO: mesajı göster, 2 saniye sonra temizle\n  };\n\n  return (\n    <div>\n      <button onClick={showToast}>Kaydet</button>\n      {message && <p>{message}</p>}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "button", text: "Kaydet", label: "Kaydet butonu var" },
      { type: "regex", value: "setTimeout\\(", label: "setTimeout kullanılmış" },
      { type: "regex", value: "setMessage\\(", label: "setMessage kullanılmış" },
    ],
  },
  {
    id: "react-169",
    level: 169,
    language: "react",
    title: "Sonsuz kaydırma simülasyonu",
    description: "'Daha fazla yükle' butonuyla listeye öğe ekle.",
    explanation:
      "Sonsuz kaydırma genelde bir buton veya scroll olayıyla ek veri yükler.\nBurada basitçe bir 'Daha fazla yükle' butonuyla görünen öğe sayısını artıracaksın.",
    example: `const [visibleCount, setVisibleCount] = useState(3);\n<button onClick={() => setVisibleCount(visibleCount + 3)}>Daha fazla yükle</button>`,
    hints: [
      "visibleCount state'i (başlangıç 2) tanımla.",
      "items.slice(0, visibleCount) ile görünen öğeleri al.",
      "<button onClick={() => setVisibleCount(visibleCount + 2)}>Daha fazla yükle</button>",
    ],
    challenge:
      "items = [1,2,3,4,5,6] dizisi ver. visibleCount state'i (başlangıç 2) ile ilk visibleCount kadar öğeyi <li> ile listele. 'Daha fazla yükle' butonuna basınca visibleCount'u 2 artır.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const items = [1, 2, 3, 4, 5, 6];\n  const [visibleCount, setVisibleCount] = useState(2);\n\n  // TODO: visibleItems oluştur\n  const visibleItems = items.slice(0, visibleCount);\n\n  return (\n    <div>\n      <ul>\n        {visibleItems.map((i) => (\n          <li key={i}>{i}</li>\n        ))}\n      </ul>\n      <button onClick={() => setVisibleCount(visibleCount + 2)}>\n        Daha fazla yükle\n      </button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "li", count: 2, label: "Başlangıçta 2 öğe var" },
      { type: "dom", selector: "button", text: "Daha fazla yükle", label: "Buton var" },
      { type: "regex", value: "setVisibleCount\\(", label: "setVisibleCount kullanılmış" },
    ],
  },
  {
    id: "react-170",
    level: 170,
    language: "react",
    title: "Final: CRUD mini dashboard",
    description: "Ekle, listele ve sil işlemlerini birleştiren mini bir uygulama.",
    explanation:
      "Bu final dersinde öğrendiğin her şeyi birleştireceksin: state, liste render, ekleme ve silme.\nBir görev listesi üzerinde ekleme ve silme (CRUD'un C ve D'si) işlemlerini yapacaksın.",
    example: `const removeItem = (id) => setItems(items.filter((i) => i.id !== id));\nconst addItem = (text) => setItems([...items, { id: Date.now(), text }]);`,
    hints: [
      "items dizisini {id, text} nesneleri olarak tut.",
      "addItem, yeni bir {id: Date.now(), text} nesnesi eklesin.",
      "removeItem(id), items.filter((i) => i.id !== id) ile o öğeyi çıkarsın.",
    ],
    challenge:
      "items state'i (boş dizi, {id, text} nesneleri) oluştur. Input ve 'Ekle' butonu ile yeni görev ekle (id: Date.now()). Her görev yanında 'Sil' butonu olsun, tıklanınca o görev listeden çıksın. Görevleri <li key={item.id}> ile listele.",
    files: [
      {
        name: "App.jsx",
        content: `const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState([]);\n  const [text, setText] = useState("");\n\n  const addItem = () => {\n    // TODO: yeni {id, text} nesnesini items'a ekle, text'i temizle\n  };\n\n  const removeItem = (id) => {\n    // TODO: id'si eşleşen öğeyi çıkar\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <button onClick={addItem}>Ekle</button>\n      <ul>\n        {items.map((item) => (\n          <li key={item.id}>\n            {item.text}\n            <button onClick={() => removeItem(item.id)}>Sil</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
      },
      { name: "index.html", readonly: true, content: INDEX_HTML },
      { name: "style.css", readonly: true, content: STYLE_CSS },
    ],
    checks: [
      { type: "dom", selector: "input", count: 1, label: "input var" },
      { type: "dom", selector: "button", text: "Ekle", label: "Ekle butonu var" },
      { type: "regex", value: "\\.filter\\(", label: "filter ile silme yapılmış" },
      { type: "regex", value: "Date\\.now\\(\\)", label: "Date.now() ile id üretilmiş" },
    ],
  },
];
