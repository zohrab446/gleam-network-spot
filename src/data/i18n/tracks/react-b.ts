import type { TrackTranslations } from "../types";

export const REACT_B_EN: TrackTranslations = {
  "react-146": {
    title: "localStorage synchronization",
    description: "Save state to localStorage with useEffect.",
    explanation:
      "You can use `localStorage` to keep a state value even after the page is refreshed.\nInside useEffect you save it on every change with `localStorage.setItem`, and you read it back with `localStorage.getItem` in useState's initial value.",
    hints: [
      "Make useState's initial value a function that reads from localStorage.",
      "Use useEffect to call localStorage.setItem('note', note) whenever name changes.",
      "const [note, setNote] = useState(() => localStorage.getItem('note') || ''); useEffect(() => { localStorage.setItem('note', note); }, [note]);",
    ],
    challenge:
      "Create a state called 'note', reading its initial value from localStorage. Update the state with an input and save it to localStorage on every change with useEffect. Show the input's value on the page.",
    files: {
      "App.jsx": `const { useState, useEffect } = React;\n\nfunction App() {\n  // TODO: initialize the note state from localStorage\n  const [note, setNote] = useState("");\n\n  // TODO: save note to localStorage with useEffect\n\n  return (\n    <div>\n      <input value={note} onChange={(e) => setNote(e.target.value)} />\n      <p>Not: {note}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "'Not:' text is shown",
      "localStorage.getItem is used",
      "localStorage.setItem is used",
      "useEffect is used",
    ],
  },
  "react-147": {
    title: "Focusing with useRef",
    description: "Automatically focus an input with useRef.",
    explanation:
      "`useRef` lets you access a DOM element directly.\nYou attach the ref like `<input ref={inputRef} />`, then you can focus that element with `inputRef.current.focus()`.",
    hints: [
      "Create a ref with useRef(null).",
      "Add ref={inputRef} to the input element.",
      "useEffect(() => { inputRef.current.focus(); }, []); to focus when the page opens.",
    ],
    challenge:
      "Create an input, get its reference with useRef, and inside useEffect (empty dependency array) automatically focus the input when the page loads. Also show an h2 with the title 'Ad girin'.",
    files: {
      "App.jsx": `const { useRef, useEffect } = React;\n\nfunction App() {\n  // TODO: create inputRef and focus it on mount\n\n  return (\n    <div>\n      <h2>Ad girin</h2>\n      <input type="text" />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Title is shown",
      "input element exists",
      "useRef is used",
      "focus() is called",
    ],
  },
  "react-148": {
    title: "useRef that does not trigger a re-render",
    description: "Store a value with useRef without triggering a render.",
    explanation:
      "`useRef` isn't just for DOM elements — it can also remember a value without triggering a re-render.\nFor example, if you keep a click counter with useRef, the component won't re-render even though the value changes.",
    hints: [
      "Create a counter with useRef(0) instead of state.",
      "Increase clickCount.current on every button click.",
      "const clickCount = useRef(0); const handleClick = () => { clickCount.current += 1; setMsg('Tıklama: ' + clickCount.current); };",
    ],
    challenge:
      "Create a re-render-free counter called 'clickCount' with useRef. On each button click increase clickCount.current and write the current value to a p tag on screen (using a separate state).",
    files: {
      "App.jsx": `const { useRef, useState } = React;\n\nfunction App() {\n  const clickCount = useRef(0);\n  const [msg, setMsg] = useState("Tıklama: 0");\n\n  const handleClick = () => {\n    // TODO: increase clickCount.current and update msg\n  };\n\n  return (\n    <div>\n      <button onClick={handleClick}>Tıkla</button>\n      <p>{msg}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Counter text is shown",
      "useRef is used",
      "clickCount.current is used",
    ],
  },
  "react-149": {
    title: "Custom hook basics (useCounter)",
    description: "Write your own hook: useCounter.",
    explanation:
      "If you extract repeated state logic into a function and prefix its name with `use`, that's called a custom hook.\nThis lets you reuse the same logic across multiple components.",
    hints: [
      "Define function useCounter(start) outside the App component.",
      "Use useState inside it and return { count, increment }.",
      "function useCounter(start = 0) { const [count, setCount] = useState(start); const increment = () => setCount((c) => c + 1); return { count, increment }; }",
    ],
    challenge:
      "Write a custom hook called useCounter that takes a starting value. The hook should return { count, increment }. Use this hook inside App, show count and increase it with a button.",
    files: {
      "App.jsx": `const { useState } = React;\n\n// TODO: write the useCounter custom hook\n\nfunction App() {\n  const { count, increment } = useCounter(0);\n\n  return (\n    <div>\n      <p>Sayaç: {count}</p>\n      <button onClick={increment}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Initial counter is 0",
      "useCounter function is defined",
      "hook returns count",
    ],
  },
  "react-150": {
    title: "Mini project: To-Do List",
    description: "A simple to-do list combining state and list rendering.",
    explanation:
      "You'll combine what you've learned so far to build a small to-do list.\nA new task is added with an input, tasks are kept in an array state, and listed with `.map`.",
    hints: [
      "Initialize the todos state with an empty array.",
      "Keep the input value in a separate state (text), and add it to todos when the button is clicked.",
      "const addTodo = () => { setTodos([...todos, text]); setText(''); };",
    ],
    challenge:
      "Create an array state called todos and an input state called text. When the 'Ekle' button is clicked, add text to todos and clear the input. List the tasks with <ul><li key=...>.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [todos, setTodos] = useState([]);\n  const [text, setText] = useState("");\n\n  const addTodo = () => {\n    // TODO: add text to todos, clear text\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <button onClick={addTodo}>Ekle</button>\n      <ul>\n        {todos.map((t, i) => (\n          <li key={i}>{t}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "input exists",
      "'Ekle' button exists",
      "key is used",
      "listed with map",
    ],
  },
  "react-151": {
    title: "useMemo",
    description: "Cache an expensive calculation with useMemo.",
    explanation:
      "`useMemo` stores the result of a calculation and avoids recomputing it as long as its dependencies don't change.\nThis is especially useful for performance in large lists or complex calculations.",
    hints: [
      "useMemo's first argument is a function, the second is the dependency array.",
      "Compute the square of num with useMemo, with [num] as the dependency.",
      "const square = useMemo(() => num * num, [num]);",
    ],
    challenge:
      "Create a number state called num (starting at 4). Compute the square of num with useMemo and show it as 'Kare: <value>'. Increase num with a button.",
    files: {
      "App.jsx": `const { useState, useMemo } = React;\n\nfunction App() {\n  const [num, setNum] = useState(4);\n\n  // TODO: compute square with useMemo\n  const square = num * num;\n\n  return (\n    <div>\n      <p>Kare: {square}</p>\n      <button onClick={() => setNum(num + 1)}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Initial square is correct",
      "useMemo is used",
    ],
  },
  "react-152": {
    title: "useCallback",
    description: "Cache a function with useCallback.",
    explanation:
      "`useCallback` stores a function without recreating it as long as its dependencies don't change.\nThis is typically used when passing functions as props to child components wrapped with `React.memo`, avoiding unnecessary re-renders.",
    hints: [
      "useCallback's first argument is a function, the second is the dependency array.",
      "Wrap the handleClick function with useCallback, with an empty dependency array.",
      "const handleClick = useCallback(() => setCount((c) => c + 1), []);",
    ],
    challenge:
      "Create a state called count (0). Define the handleClick function with useCallback (empty dependency array) so it increases count. Bind it to a button and show count.",
    files: {
      "App.jsx": `const { useState, useCallback } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  // TODO: define handleClick with useCallback\n  const handleClick = () => setCount(count + 1);\n\n  return (\n    <div>\n      <p>Sayaç: {count}</p>\n      <button onClick={handleClick}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Initial counter is 0",
      "useCallback is used",
    ],
  },
  "react-153": {
    title: "React.memo",
    description: "Protect a component from unnecessary re-renders with memo.",
    explanation:
      "`React.memo` wraps a component so it isn't re-rendered as long as its props don't change.\nThis is especially useful for improving performance in large lists.",
    hints: [
      "Wrap the Item component with React.memo(...).",
      "memo takes a function component as an argument and returns a new one.",
      "const Item = memo(function Item({ text }) { return <li>{text}</li>; });",
    ],
    challenge:
      "Create a component called Item and wrap it with memo. Item should show the text prop inside a <li>. In App, render a list of names using Item components.",
    files: {
      "App.jsx": `const { memo } = React;\n\n// TODO: create the Item component with memo\nfunction Item({ text }) {\n  return <li>{text}</li>;\n}\n\nfunction App() {\n  const names = ["Ali", "Veli", "Ayşe"];\n  return (\n    <ul>\n      {names.map((n, i) => (\n        <Item key={i} text={n} />\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "3 list items exist",
      "'Ali' is shown",
      "memo is used",
    ],
  },
  "react-154": {
    title: "useReducer basics",
    description: "Manage state with useReducer instead of useState.",
    explanation:
      "`useReducer` is an alternative to `useState` for complex state logic.\nA `reducer` function takes (state, action) and returns the new state; you dispatch actions with `dispatch`.",
    hints: [
      "Define the reducer function outside App, using switch/if based on action.type.",
      "Get [count, dispatch] with useReducer(reducer, 0).",
      "Bind the button with dispatch({ type: 'increment' }).",
    ],
    challenge:
      "Write a reducer function: on the 'increment' action increase state by 1, on the 'decrement' action decrease it by 1. Create a count state with useReducer (starting at 0). Increase/decrease with two buttons and show count.",
    files: {
      "App.jsx": `const { useReducer } = React;\n\n// TODO: write the reducer function\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction App() {\n  const [count, dispatch] = useReducer(reducer, 0);\n\n  return (\n    <div>\n      <p>Sayaç: {count}</p>\n      <button onClick={() => dispatch({ type: "increment" })}>+</button>\n      <button onClick={() => dispatch({ type: "decrement" })}>-</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Initial counter is 0",
      "useReducer is used",
      "'increment' action is used",
    ],
  },
  "react-155": {
    title: "Complex form + useReducer",
    description: "Manage multiple form fields with useReducer.",
    explanation:
      "In forms with several input fields, managing all state with a single reducer simplifies the code.\nThe reducer updates the state object based on the incoming action's `field` and `value`.",
    hints: [
      "The reducer should return { ...state, [action.field]: action.value }.",
      "Start with useReducer(reducer, { name: '', email: '' }).",
      "onChange={(e) => dispatch({ field: 'name', value: e.target.value })}",
    ],
    challenge:
      "Manage a form with the initial state { name: '', email: '' } using a reducer. Create two inputs (name, email), each updating its own field via dispatch. Show the entered name and email on screen.",
    files: {
      "App.jsx": `const { useReducer } = React;\n\n// TODO: write the reducer function\nfunction reducer(state, action) {\n  return state;\n}\n\nfunction App() {\n  const [form, dispatch] = useReducer(reducer, { name: "", email: "" });\n\n  return (\n    <div>\n      <input\n        placeholder="İsim"\n        value={form.name}\n        onChange={(e) => dispatch({ field: "name", value: e.target.value })}\n      />\n      <input\n        placeholder="Email"\n        value={form.email}\n        onChange={(e) => dispatch({ field: "email", value: e.target.value })}\n      />\n      <p>İsim: {form.name}, Email: {form.email}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "'İsim:' is shown",
      "useReducer is used",
      "action.field is used",
    ],
  },
  "react-156": {
    title: "createContext",
    description: "Start sharing data by creating a context.",
    explanation:
      "`createContext` creates a Context object that lets you share data across the component tree without passing props.\nIn this lesson you'll only create the context; you'll learn to supply it with a Provider in the next lesson.",
    hints: [
      "Call createContext outside the App component.",
      "Give it a string as the default value, e.g. 'light'.",
      "const ThemeContext = createContext('light');",
    ],
    challenge:
      "Create a context called 'ThemeContext' with the default value 'light' (outside the App component). Show a p saying 'Context hazır' inside App.",
    files: {
      "App.jsx": `const { createContext } = React;\n\n// TODO: create ThemeContext\n\nfunction App() {\n  return (\n    <div>\n      <p>Context hazır</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Text is shown",
      "createContext is used",
    ],
  },
  "react-157": {
    title: "Provider",
    description: "Provide a value with Context.Provider.",
    explanation:
      "After creating a context, you can supply this value to child components with `<Context.Provider value={...}>`.\nAll components inside the Provider can access this value.",
    hints: [
      "Wrap App's content with ThemeContext.Provider.",
      "Give the value prop the value 'dark'.",
      "<ThemeContext.Provider value='dark'><Child /></ThemeContext.Provider>",
    ],
    challenge:
      "Create ThemeContext. Inside App, wrap a Child component with ThemeContext.Provider passing value='dark'. Child should show a p saying 'Tema: sağlandı' (you don't need to read the context yet).",
    files: {
      "App.jsx": `const { createContext } = React;\n\nconst ThemeContext = createContext("light");\n\nfunction Child() {\n  return <p>Tema: sağlandı</p>;\n}\n\nfunction App() {\n  // TODO: wrap Child with ThemeContext.Provider, value="dark"\n  return <Child />;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Child is rendered",
      "createContext is used",
      "Provider is used",
    ],
  },
  "react-158": {
    title: "useContext",
    description: "Read the value provided by a Provider with useContext.",
    explanation:
      "`useContext(Context)` lets you read the value supplied by the closest Provider.\nThis lets you access the context value even in deeply nested components, without passing props.",
    hints: [
      "Call useContext(ThemeContext) inside Child.",
      "Assign the returned value to a variable and show it inside a p.",
      "const theme = useContext(ThemeContext); return <p>Tema: {theme}</p>;",
    ],
    challenge:
      "Create ThemeContext, and in App provide value='dark' with the Provider. In the Child component, read this value with useContext and show it as 'Tema: dark'.",
    files: {
      "App.jsx": `const { createContext, useContext } = React;\n\nconst ThemeContext = createContext("light");\n\nfunction Child() {\n  // TODO: read theme with useContext and show it\n  return <p>Tema: ?</p>;\n}\n\nfunction App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Context value is read",
      "useContext is used",
    ],
  },
  "react-159": {
    title: "Theme context",
    description: "Toggle light/dark theme with context.",
    explanation:
      "Context becomes dynamic when combined with state.\nIf you pass a state and its setter together as the Provider's value, any child component can change the theme.",
    hints: [
      "Give the Provider's value the object { theme, setTheme }.",
      "Inside Child, get { theme, setTheme } with useContext, and call setTheme with a button.",
      "onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}",
    ],
    challenge:
      "Create a theme state (starting at 'light'). Pass { theme, setTheme } to ThemeContext.Provider. In the Child component, get this with useContext, show 'Tema: light', and toggle the theme between 'dark' and 'light' with a button.",
    files: {
      "App.jsx": `const { createContext, useContext, useState } = React;\n\nconst ThemeContext = createContext(null);\n\nfunction Child() {\n  // TODO: get theme and setTheme with useContext\n  return (\n    <div>\n      <p>Tema: light</p>\n      <button>Değiştir</button>\n    </div>\n  );\n}\n\nfunction App() {\n  const [theme, setTheme] = useState("light");\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Child />\n    </ThemeContext.Provider>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Initial theme is shown",
      "useContext is used",
      "setTheme is called",
    ],
  },
  "react-160": {
    title: "Component decomposition",
    description: "Split a UI into several small components.",
    explanation:
      "Splitting a large component into small parts is good practice for readability.\nEach component should be responsible for one thing; App combines these small components.",
    hints: [
      "Define three separate components named Header, Content and Footer.",
      "Each should return its own JSX (like h1, p, footer).",
      "Combine them inside App like <Header /><Content /><Footer />.",
    ],
    challenge:
      "Create three components: Header (an h1 with 'Sitem'), Content (a p with 'İçerik burada'), and Footer (a footer with '© 2024'). App should render all of them.",
    files: {
      "App.jsx": `// TODO: create the Header, Content, Footer components\n\nfunction App() {\n  return (\n    <div>\n      {/* TODO: use the components */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Header is shown",
      "Content is shown",
      "Footer is shown",
    ],
  },
  "react-161": {
    title: "Tabs component",
    description: "Switch the active tab with state.",
    explanation:
      "A Tabs component tracks the active tab with a state.\nWhen a tab button is clicked, the state is updated and only that tab's content is shown.",
    hints: [
      "Define a state called active, starting at 'home'.",
      "Use two buttons to call setActive('home') and setActive('about').",
      "active === 'home' ? <p>Ana sayfa</p> : <p>Hakkında</p>",
    ],
    challenge:
      "Create an active state (starting at 'home'). Add two buttons named 'Home' and 'About'. If active is 'home' show 'Ana sayfa', if it's 'about' show 'Hakkında' in a p.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [active, setActive] = useState("home");\n\n  return (\n    <div>\n      <button onClick={() => setActive("home")}>Home</button>\n      <button onClick={() => setActive("about")}>About</button>\n      {/* TODO: show content based on active */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Default tab is shown",
      "Two tab buttons exist",
      "setActive is used",
    ],
  },
  "react-162": {
    title: "Accordion",
    description: "Build a panel that opens/closes on click.",
    explanation:
      "An accordion is a component that shows/hides its content when clicked.\nYou control the content's visibility with a boolean state (`open`).",
    hints: [
      "Define a boolean state called open, starting at false.",
      "Call setOpen(!open) when the button is clicked.",
      "{open && <p>Detaylar burada</p>}",
    ],
    challenge:
      "Create an open state (starting at false). Toggle open when the 'Detaylar' button is clicked. If open is true, show a p saying 'Detaylar burada'.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [open, setOpen] = useState(false);\n\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>Detaylar</button>\n      {/* TODO: show content when open is true */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Button exists",
      "setOpen is used",
      "Conditional rendering is used",
    ],
  },
  "react-163": {
    title: "Dynamic filtering/search",
    description: "Filter a list with a search box.",
    explanation:
      "Filtering a list based on the text typed into a search box is a very common use case.\nYou can narrow an array with `.filter()` based on the input's text.",
    hints: [
      "Define a state called query and bind it to an input.",
      "Narrow the items array with .filter() based on query.",
      "const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));",
    ],
    challenge:
      "Provide the array items = ['Elma', 'Armut', 'Kiraz', 'Muz']. Create a search input with a query state. List only the items containing query with <ul><li>.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const items = ["Elma", "Armut", "Kiraz", "Muz"];\n  const [query, setQuery] = useState("");\n\n  // TODO: create the filtered array\n  const filtered = items;\n\n  return (\n    <div>\n      <input value={query} onChange={(e) => setQuery(e.target.value)} />\n      <ul>\n        {filtered.map((i) => (\n          <li key={i}>{i}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "4 items exist initially",
      "filter is used",
    ],
  },
  "react-164": {
    title: "Pagination",
    description: "Split a list into pages.",
    explanation:
      "Pagination lets you display a long list split across pages.\nYou track which page you're on with a `page` state, and get the relevant slice of the array with `.slice()`.",
    hints: [
      "Define a page state (starting at 1).",
      "Compute start with pageSize=2 and use items.slice(start, start+pageSize).",
      "<button onClick={() => setPage(page + 1)}>Sonraki</button>",
    ],
    challenge:
      "Provide the array items = [1,2,3,4,5,6]. Show 2 items per page using a page state (starting at 1) with pageSize=2. Increase page with the 'Sonraki' button. List the items with <li>.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const items = [1, 2, 3, 4, 5, 6];\n  const [page, setPage] = useState(1);\n  const pageSize = 2;\n\n  // TODO: compute start and create pageItems\n  const pageItems = items.slice(0, pageSize);\n\n  return (\n    <div>\n      <ul>\n        {pageItems.map((i) => (\n          <li key={i}>{i}</li>\n        ))}\n      </ul>\n      <button onClick={() => setPage(page + 1)}>Sonraki</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "2 items per page",
      "slice is used",
    ],
  },
  "react-165": {
    title: "Form validation",
    description: "Validate a form before submitting.",
    explanation:
      "Form validation means checking whether the data coming from the user is valid.\nYou can keep an error message in a state and show it to the user based on a condition.",
    hints: [
      "Define a state called error, starting as an empty string.",
      "When the submit button is clicked, set error if email is empty.",
      "const handleSubmit = () => { if (email === '') setError('Email boş olamaz'); else setError(''); };",
    ],
    challenge:
      "Create an email state and an error state. Add an input and a 'Gönder' button. When 'Gönder' is clicked, if email is empty set error to 'Email boş olamaz', otherwise clear error. Show error in a p if it exists.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [email, setEmail] = useState("");\n  const [error, setError] = useState("");\n\n  const handleSubmit = () => {\n    // TODO: set error if email is empty, clear it otherwise\n  };\n\n  return (\n    <div>\n      <input value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button onClick={handleSubmit}>Gönder</button>\n      {error && <p>{error}</p>}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "'Gönder' button exists",
      "setError is used",
    ],
  },
  "react-166": {
    title: "Cart component",
    description: "Build a component that adds products to a cart.",
    explanation:
      "An e-commerce cart keeps the selected products in an array state.\nA 'Sepete Ekle' button for each product adds that product to the cart array.",
    hints: [
      "Define an array state called cart (empty).",
      "Add onClick={() => addToCart(p)} to the 'Sepete Ekle' button for each product.",
      "const addToCart = (p) => setCart([...cart, p]);",
    ],
    challenge:
      "Provide the array products = ['Kitap', 'Kalem', 'Defter']. Show a 'Sepete Ekle' button for each product. Clicking it should add the item to the cart array. Show the number of items in the cart as 'Sepet: N'.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const products = ["Kitap", "Kalem", "Defter"];\n  const [cart, setCart] = useState([]);\n\n  const addToCart = (p) => {\n    // TODO: add p to cart\n  };\n\n  return (\n    <div>\n      {products.map((p) => (\n        <button key={p} onClick={() => addToCart(p)}>\n          Sepete Ekle: {p}\n        </button>\n      ))}\n      <p>Sepet: {cart.length}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Initial cart is empty",
      "3 product buttons exist",
      "setCart is used",
    ],
  },
  "react-167": {
    title: "Calculating the cart total",
    description: "Calculate the total price of items in the cart.",
    explanation:
      "`.reduce()` is used to sum a field across an array of objects.\nIf you compute the cart total with `useMemo`, you avoid unnecessary recomputation.",
    hints: [
      "Let cart be an array of {name, price} objects.",
      "Compute total with useMemo using cart.reduce(...).",
      "const total = useMemo(() => cart.reduce((s, i) => s + i.price, 0), [cart]);",
    ],
    challenge:
      "Provide the array cart = [{name:'Kitap', price:50}, {name:'Kalem', price:10}]. Compute the total price with useMemo and show it as 'Toplam: 60'.",
    files: {
      "App.jsx": `const { useMemo } = React;\n\nfunction App() {\n  const cart = [\n    { name: "Kitap", price: 50 },\n    { name: "Kalem", price: 10 },\n  ];\n\n  // TODO: compute total with useMemo\n  const total = 0;\n\n  return (\n    <div>\n      <p>Toplam: {total}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "Total is calculated correctly",
      "useMemo is used",
      "reduce is used",
    ],
  },
  "react-168": {
    title: "Toast/notification",
    description: "Show a temporary notification message.",
    explanation:
      "Toast notifications are used to briefly inform the user.\nYou can show a message in a state, then clear it after a delay inside `setTimeout` to hide it.",
    hints: [
      "Define a message state (starting empty).",
      "When the button is clicked, set message and clear it after 2 seconds with setTimeout.",
      "const showToast = () => { setMessage('Kaydedildi!'); setTimeout(() => setMessage(''), 2000); };",
    ],
    challenge:
      "Create a message state. When the 'Kaydet' button is clicked, set message to 'Kaydedildi!' and clear it after 2 seconds with setTimeout. Show message in a p if it's not empty.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [message, setMessage] = useState("");\n\n  const showToast = () => {\n    // TODO: show the message, clear it after 2 seconds\n  };\n\n  return (\n    <div>\n      <button onClick={showToast}>Kaydet</button>\n      {message && <p>{message}</p>}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "'Kaydet' button exists",
      "setTimeout is used",
      "setMessage is used",
    ],
  },
  "react-169": {
    title: "Infinite scroll simulation",
    description: "Add items to a list with a 'Daha fazla yükle' button.",
    explanation:
      "Infinite scroll typically loads more data via a button or a scroll event.\nHere you'll simply increase the number of visible items with a 'Daha fazla yükle' button.",
    hints: [
      "Define a visibleCount state (starting at 2).",
      "Get the visible items with items.slice(0, visibleCount).",
      "<button onClick={() => setVisibleCount(visibleCount + 2)}>Daha fazla yükle</button>",
    ],
    challenge:
      "Provide the array items = [1,2,3,4,5,6]. List the first visibleCount items with <li> using a visibleCount state (starting at 2). Increase visibleCount by 2 when the 'Daha fazla yükle' button is clicked.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const items = [1, 2, 3, 4, 5, 6];\n  const [visibleCount, setVisibleCount] = useState(2);\n\n  // TODO: create visibleItems\n  const visibleItems = items.slice(0, visibleCount);\n\n  return (\n    <div>\n      <ul>\n        {visibleItems.map((i) => (\n          <li key={i}>{i}</li>\n        ))}\n      </ul>\n      <button onClick={() => setVisibleCount(visibleCount + 2)}>\n        Daha fazla yükle\n      </button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "2 items exist initially",
      "Button exists",
      "setVisibleCount is used",
    ],
  },
  "react-170": {
    title: "Final: CRUD mini dashboard",
    description: "A mini app combining add, list, and delete operations.",
    explanation:
      "In this final lesson you'll combine everything you've learned: state, list rendering, adding and deleting.\nYou'll perform adding and deleting (the C and D of CRUD) on a task list.",
    hints: [
      "Keep the items array as {id, text} objects.",
      "addItem should add a new {id: Date.now(), text} object.",
      "removeItem(id) should remove that item with items.filter((i) => i.id !== id).",
    ],
    challenge:
      "Create an items state (empty array of {id, text} objects). Add a new task (id: Date.now()) using an input and an 'Ekle' button. Add a 'Sil' button next to each task; clicking it should remove that task from the list. List the tasks with <li key={item.id}>.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState([]);\n  const [text, setText] = useState("");\n\n  const addItem = () => {\n    // TODO: add the new {id, text} object to items, clear text\n  };\n\n  const removeItem = (id) => {\n    // TODO: remove the item whose id matches\n  };\n\n  return (\n    <div>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <button onClick={addItem}>Ekle</button>\n      <ul>\n        {items.map((item) => (\n          <li key={item.id}>\n            {item.text}\n            <button onClick={() => removeItem(item.id)}>Sil</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [
      "input exists",
      "'Ekle' button exists",
      "deletion is done with filter",
      "id is generated with Date.now()",
    ],
  },
};
