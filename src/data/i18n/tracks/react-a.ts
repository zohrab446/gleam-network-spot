import type { TrackTranslations } from "../types";

export const REACT_A_EN: TrackTranslations = {
  "react-121": {
    title: "First component and JSX",
    description: "Write a React component and print text on screen with JSX.",
    explanation:
      "In React, you split the UI into small pieces called components. A component is a function starting with a capital letter that returns HTML-like code called JSX.\nJSX is actually JavaScript; Babel converts it to plain JS before the browser runs it.",
    example: `function Hello() {\n  return <h1>Hello React</h1>;\n}`,
    hints: [
      "Define a function component called App.",
      "Return a JSX element inside return, e.g. <h1>.",
      "function App() { return <h1>Merhaba CodeQuest</h1>; }",
    ],
    challenge: "Create an App component and have it show 'Merhaba CodeQuest' inside an <h1>.",
    files: {
      "App.jsx": `function App() {\n  // TODO: return <h1>Merhaba CodeQuest</h1>\n  return null;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["h1 tag exists", "Text is correct"],
  },
  "react-122": {
    title: "JS expressions in JSX with {}",
    description: "Embed a JavaScript value inside JSX using curly braces.",
    explanation:
      "You can use `{}` inside JSX to place any JavaScript expression: a variable, an addition, a function call, etc.\nThis lets you show dynamic values instead of static text.",
    example: `const name = "Ada";\nfunction App() {\n  return <p>Hello {name}</p>;\n}`,
    hints: [
      "Define a variable inside the component, e.g. const score = 10.",
      "Show the variable in JSX by writing {score}.",
      "return <p>Puan: {score}</p>;",
    ],
    challenge: "Define a variable called score (value 10) and show it as <p>Puan: {score}</p>.",
    files: {
      "App.jsx": `function App() {\n  const score = 10;\n  // TODO: return <p>Puan: {score}</p>\n  return <p>Puan: ?</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["p tag exists", "Score 10 is shown"],
  },
  "react-123": {
    title: "className",
    description: "Use className to give a CSS class in JSX.",
    explanation:
      "In HTML you use `class`, but in JSX that word is reserved in JavaScript, so `className` is used instead.\nIts value is given like a normal string: `className=\"kutu\"`.",
    example: `function App() {\n  return <div className="kutu">Content</div>;\n}`,
    hints: [
      "Add className to a div element.",
      "Use the string \"kart\" as the value.",
      "return <div className=\"kart\">Merhaba</div>;",
    ],
    challenge: "Return a <div> with className \"kart\" containing the text 'Merhaba'.",
    files: {
      "App.jsx": `function App() {\n  // TODO: return a div with className="kart"\n  return <div>Merhaba</div>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [".kart class exists", "Text is correct"],
  },
  "react-124": {
    title: "Nested components",
    description: "Use one component inside another component.",
    explanation:
      "Components can be used inside one another; this lets you build bigger UIs from small pieces.\nYou call a component like a JSX tag: `<Baslik />`.",
    example: `function Baslik() {\n  return <h2>Title</h2>;\n}\nfunction App() {\n  return (\n    <div>\n      <Baslik />\n    </div>\n  );\n}`,
    hints: [
      "Write a separate function component called Baslik.",
      "Use the <Baslik /> tag inside App.",
      "function Baslik() { return <h2>Hoş geldin</h2>; } then place <Baslik /> inside App.",
    ],
    challenge: "Write a Baslik component (returning <h2>Hoş geldin</h2>) and use it inside App.",
    files: {
      "App.jsx": `function Baslik() {\n  // TODO: return <h2>Hoş geldin</h2>\n  return null;\n}\n\nfunction App() {\n  return (\n    <div>\n      {/* TODO: use the Baslik component */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["h2 exists", "Text is correct", "Baslik component is used"],
  },
  "react-125": {
    title: "Passing props",
    description: "Send data to a component with props.",
    explanation:
      "Props are how you pass data into a component from outside; they're written like an HTML attribute: `<Kart baslik=\"Merhaba\" />`.\nThe component function accesses these values via the `props` parameter: `props.baslik`.",
    example: `function Kart(props) {\n  return <p>{props.baslik}</p>;\n}\nfunction App() {\n  return <Kart baslik="Selam" />;\n}`,
    hints: [
      "Add a props parameter to the Kart component.",
      "In App write <Kart baslik=\"Merhaba Prop\" />.",
      "function Kart(props) { return <p>{props.baslik}</p>; }",
    ],
    challenge: "Kart component should show props.baslik inside a <p>; App should call it with baslik=\"Merhaba Prop\".",
    files: {
      "App.jsx": `function Kart(props) {\n  // TODO: show props.baslik inside <p>\n  return <p></p>;\n}\n\nfunction App() {\n  return <Kart baslik="Merhaba Prop" />;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["p exists", "Prop text is shown"],
  },
  "react-126": {
    title: "Props destructuring",
    description: "Destructure props in the parameter with { }.",
    explanation:
      "Instead of `props.baslik`, you can destructure the parameter directly as `{ baslik }`.\nThis makes the code shorter and more readable.",
    example: `function Kart({ baslik }) {\n  return <p>{baslik}</p>;\n}`,
    hints: [
      "Make Kart's parameter { baslik }.",
      "Use just baslik instead of props.baslik.",
      "function Kart({ baslik }) { return <p>{baslik}</p>; }",
    ],
    challenge: "Write the Kart component using { baslik } destructuring; App should pass baslik=\"Destructured\".",
    files: {
      "App.jsx": `function Kart(props) {\n  // TODO: write the parameter as { baslik }\n  return <p>{props.baslik}</p>;\n}\n\nfunction App() {\n  return <Kart baslik="Destructured" />;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["Text is correct", "Destructuring is used"],
  },
  "react-127": {
    title: "Default props / children",
    description: "Give a default prop value and use children.",
    explanation:
      "To use a default value when a prop isn't passed, write `= value` in the parameter: `{ baslik = \"Varsayılan\" }`.\n`children` is a special prop that carries the content between a component's opening and closing tags.",
    example: `function Kutu({ children }) {\n  return <div className="kutu">{children}</div>;\n}\nfunction App() {\n  return <Kutu>Content</Kutu>;\n}`,
    hints: [
      "Take a children parameter in the Kutu component.",
      "Show children inside the div.",
      "function Kutu({ children }) { return <div className=\"kutu\">{children}</div>; } App: <Kutu>Merhaba Children</Kutu>",
    ],
    challenge: "Kutu component should show children inside a .kutu div; App should use <Kutu>Merhaba Children</Kutu>.",
    files: {
      "App.jsx": `function Kutu({ children }) {\n  // TODO: show children inside a div with className="kutu"\n  return <div className="kutu"></div>;\n}\n\nfunction App() {\n  return <Kutu>Merhaba Children</Kutu>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: [".kutu exists", "children is shown"],
  },
  "react-128": {
    title: "Conditional rendering (&&, ternary)",
    description: "Show different JSX based on a condition.",
    explanation:
      "Writing `condition && <p>...</p>` in JSX shows the element if condition is true, and renders nothing otherwise.\nTo choose between two options, use a ternary (`? :`): `condition ? <A /> : <B />`.",
    example: `function App() {\n  const isVar = true;\n  return <div>{isVar ? <p>Var</p> : <p>Yok</p>}</div>;\n}`,
    hints: [
      "Define a variable called isLoggedIn (set it to true).",
      "Use a ternary to show <p>Hoş geldin</p> if isLoggedIn is true, otherwise <p>Giriş yap</p>.",
      "return <div>{isLoggedIn ? <p>Hoş geldin</p> : <p>Giriş yap</p>}</div>;",
    ],
    challenge: "Let isLoggedIn = true; use a ternary to show 'Hoş geldin' when true, 'Giriş yap' when false.",
    files: {
      "App.jsx": `function App() {\n  const isLoggedIn = true;\n  // TODO: return <p>Hoş geldin</p> or <p>Giriş yap</p> using a ternary\n  return <div></div>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["p exists", "Correct text", "Ternary is used"],
  },
  "react-129": {
    title: "Lists and key with map",
    description: "Turn an array into a JSX list with map, add a key.",
    explanation:
      "To show an array on screen, use `.map()`; each element returns a piece of JSX.\nSo React can update the list correctly, each element needs a unique `key` prop.",
    example: `const items = ["elma", "armut"];\nfunction App() {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item}>{item}</li>\n      ))}\n    </ul>\n  );\n}`,
    hints: [
      "Loop over the fruits array with map.",
      "Add a key prop to each <li> (e.g. key={fruit}).",
      "{fruits.map((fruit) => <li key={fruit}>{fruit}</li>)}",
    ],
    challenge: "List the array fruits = ['elma','armut','muz'] with <ul><li key={...}>.",
    files: {
      "App.jsx": `function App() {\n  const fruits = ["elma", "armut", "muz"];\n  return (\n    <ul>\n      {/* TODO: create <li key={...}> with fruits.map */}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["3 li elements exist", "'elma' is shown", "key prop is used"],
  },
  "react-130": {
    title: "Fragment",
    description: "Return multiple elements without a single wrapper element.",
    explanation:
      "A component must return a single root element. To avoid adding an unnecessary `<div>`, use `<>...</>` (Fragment).\nA Fragment doesn't add an extra element to the DOM, it just satisfies JSX rules.",
    example: `function App() {\n  return (\n    <>\n      <h1>Title</h1>\n      <p>Text</p>\n    </>\n  );\n}`,
    hints: [
      "Use a Fragment to return two elements: <>...</>",
      "Put an <h1> and a <p> inside it.",
      "return (<><h1>Ana Başlık</h1><p>Alt metin</p></>);",
    ],
    challenge: "Using a Fragment (<>), return <h1>Ana Başlık</h1> and <p>Alt metin</p> together.",
    files: {
      "App.jsx": `function App() {\n  // TODO: return h1 and p with a <> </> Fragment\n  return <h1>Ana Başlık</h1>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["h1 exists", "p exists", "Fragment is used"],
  },
  "react-131": {
    title: "useState",
    description: "Add state to a component with useState.",
    explanation:
      "`useState` gives a component memory (state). It's used like `const [deger, setDeger] = useState(baslangic);`.\nFirst you need to import useState with `const { useState } = React;`.",
    example: `const { useState } = React;\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <p>{count}</p>;\n}`,
    hints: [
      "Add const { useState } = React; at the top of the file.",
      "Create the count state with useState(0).",
      "const [count, setCount] = useState(0); return <p>{count}</p>;",
    ],
    challenge: "Create a count state with useState(0), show it with <p>{count}</p>.",
    files: {
      "App.jsx": `// TODO: add const { useState } = React;\n\nfunction App() {\n  // TODO: create the count state (useState(0))\n  return <p>0</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["0 is shown", "useState is used"],
  },
  "react-132": {
    title: "Updating state on click",
    description: "Change state when a button is clicked.",
    explanation:
      "Buttons are given a function via the `onClick` prop; this function runs on click.\nYou can call the state setter (`setCount`) to increase the counter: `onClick={() => setCount(count + 1)}`.",
    example: `function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>{count}</button>\n  );\n}`,
    hints: [
      "Add onClick to the button element.",
      "Call setCount(count + 1) inside onClick.",
      "<button onClick={() => setCount(count + 1)}>Artır</button>",
    ],
    challenge: "Create a count state; use a <button onClick={...}> to increase count by 1 when clicked.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>{count}</p>\n      {/* TODO: add a button that increases count with onClick */}\n      <button>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["button exists", "onClick is used", "setCount is called"],
  },
  "react-133": {
    title: "Boolean state / modal",
    description: "Show/hide an element with boolean state.",
    explanation:
      "State can also be a boolean: `useState(false)`. Combine it with `&&` to conditionally show an element.\nWhen a button is clicked, you can toggle the value with `setOpen(!open)`.",
    example: `const [open, setOpen] = useState(false);\nreturn (\n  <div>\n    <button onClick={() => setOpen(!open)}>Aç/Kapat</button>\n    {open && <p>Görünür!</p>}\n  </div>\n);`,
    hints: [
      "Create the open state with useState(false).",
      "Add a button, call setOpen(!open) with onClick.",
      "{open && <p className=\"modal\">Merhaba Modal</p>}",
    ],
    challenge: "Create an open state (false); toggle it when the button is clicked; show a <p>Merhaba Modal</p> with className=\"modal\" while open is true.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [open, setOpen] = useState(false);\n  return (\n    <div>\n      <button onClick={() => setOpen(!open)}>Aç/Kapat</button>\n      {/* TODO: show <p className="modal">Merhaba Modal</p> if open is true */}\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["button exists", "setOpen is used", "Modal is shown via conditional rendering"],
  },
  "react-134": {
    title: "Controlled input",
    description: "Control an input's value with state.",
    explanation:
      "If you read an input's value from state and update it with `onChange`, that's called a \"controlled input\".\n`value={text}` and `onChange={(e) => setText(e.target.value)}` are used together.",
    example: `const [text, setText] = useState("");\nreturn <input value={text} onChange={(e) => setText(e.target.value)} />;`,
    hints: [
      "Create the text state with useState(\"\").",
      "Give the input value={text}.",
      "Add onChange={(e) => setText(e.target.value)} to the input and show <p>{text}</p> below it.",
    ],
    challenge: "Create a text state; make the input controlled (value + onChange) and show <p>{text}</p> below it.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [text, setText] = useState("");\n  return (\n    <div>\n      {/* TODO: make the input controlled with value={text} and onChange */}\n      <input />\n      <p>{text}</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["input exists", "onChange is used", "value={text} is used"],
  },
  "react-135": {
    title: "Multiple inputs + form submit",
    description: "Manage multiple inputs with a form, capture submit.",
    explanation:
      "When a `<form>` is submitted, `onSubmit` runs. To prevent the page from reloading, `e.preventDefault()` is called.\nFor multiple inputs, you can use separate states or a single object state.",
    example: `function App() {\n  const [name, setName] = useState("");\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log(name);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <button type="submit">Gönder</button>\n    </form>\n  );\n}`,
    hints: [
      "Create the name state and make the input controlled.",
      "Add onSubmit to the form, call e.preventDefault() inside the function.",
      "After submit, set sent(true) to show <p>Gönderildi</p>.",
    ],
    challenge: "Create a controlled input with a name state and a form; onSubmit should call preventDefault and set the sent state to true; show <p>Gönderildi</p> while true.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [name, setName] = useState("");\n  const [sent, setSent] = useState(false);\n\n  function handleSubmit(e) {\n    // TODO: call e.preventDefault() and setSent(true)\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={name} onChange={(e) => setName(e.target.value)} />\n      <button type="submit">Gönder</button>\n      {sent && <p>Gönderildi</p>}\n    </form>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["onSubmit is used", "preventDefault is called", "sent state is set to true"],
  },
  "react-136": {
    title: "Updating object state (spread)",
    description: "Update an object state with the spread operator.",
    explanation:
      "When state is an object, you must recreate the whole object even if you only want to change one field.\nThe spread operator (`...`) copies the old values: `setUser({ ...user, name: \"Yeni\" })`.",
    example: `const [user, setUser] = useState({ name: "Ali", age: 20 });\nfunction updateName() {\n  setUser({ ...user, name: "Veli" });\n}`,
    hints: [
      "Create the user state as { name: 'Ali', age: 20 }.",
      "Add onClick to a button, call setUser({ ...user, age: user.age + 1 }) inside it.",
      "Show it with <p>{user.name} - {user.age}</p>.",
    ],
    challenge: "Create user = {name:'Ali', age:20} as state; increase age by 1 with spread when the button is clicked; show the name and age with <p>.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [user, setUser] = useState({ name: "Ali", age: 20 });\n\n  function handleClick() {\n    // TODO: call setUser({ ...user, age: user.age + 1 })\n  }\n\n  return (\n    <div>\n      <p>{user.name} - {user.age}</p>\n      <button onClick={handleClick}>Yaşlan</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["user is shown", "Spread operator is used", "setUser is called"],
  },
  "react-137": {
    title: "Adding an element to an array",
    description: "Add a new element to a state array with spread.",
    explanation:
      "Arrays can also be state. When adding a new element, instead of mutating the array directly (`push`), you should create a new array with spread: `setItems([...items, yeni])`.\nThis is required for React to notice the change.",
    example: `const [items, setItems] = useState(["a"]);\nfunction addItem() {\n  setItems([...items, "b"]);\n}`,
    hints: [
      "Start the items state as [\"elma\"].",
      "Add a button, call setItems([...items, \"armut\"]) with onClick.",
      "List with items.map as <li key={item}>{item}</li>.",
    ],
    challenge: "Create items = ['elma'] as state; add 'armut' (with spread) when the button is clicked; show the list with <li key={...}>.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState(["elma"]);\n\n  function addItem() {\n    // TODO: call setItems([...items, "armut"])\n  }\n\n  return (\n    <div>\n      <button onClick={addItem}>Ekle</button>\n      <ul>\n        {items.map((item) => (\n          <li key={item}>{item}</li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["'elma' is in the list", "Array updated with spread", "setItems is called"],
  },
  "react-138": {
    title: "Removing with filter",
    description: "Remove an element from a state array with filter.",
    explanation:
      "To remove an item from a list, use `.filter()`; items that don't match the condition are removed, producing a new array.\nFor example `setItems(items.filter((item) => item !== hedef))` keeps everything except the target.",
    example: `function removeItem(target) {\n  setItems(items.filter((item) => item !== target));\n}`,
    hints: [
      "Start the items state as ['elma','armut'].",
      "Put a delete button next to each <li>, call filter with onClick.",
      "onClick={() => setItems(items.filter((i) => i !== item))}",
    ],
    challenge: "In the list items = ['elma','armut'], put a 'Sil' button next to each element; when clicked, remove that element with filter.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [items, setItems] = useState(["elma", "armut"]);\n\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item}>\n          {item}\n          {/* TODO: add a Sil button, call filter with onClick */}\n          <button>Sil</button>\n        </li>\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["2 elements exist", "filter is used", "setItems is called"],
  },
  "react-139": {
    title: "prev => prev + 1",
    description: "Use a functional state update.",
    explanation:
      "If new state depends on old state, it's safer to pass a function like `setCount(prev => prev + 1)`.\nThis way React always uses the latest value, which matters especially with consecutive updates.",
    example: `function App() {\n  const [count, setCount] = useState(0);\n  function addTwice() {\n    setCount((prev) => prev + 1);\n    setCount((prev) => prev + 1);\n  }\n  return <button onClick={addTwice}>{count}</button>;\n}`,
    hints: [
      "Create the count state.",
      "Inside a function, call setCount twice as prev => prev + 1.",
      "function addTwice() { setCount((prev) => prev + 1); setCount((prev) => prev + 1); }",
    ],
    challenge: "Create the count state; the addTwice function should call setCount(prev => prev + 1) twice; trigger it with a button.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  function addTwice() {\n    // TODO: call setCount((prev) => prev + 1) twice\n  }\n\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={addTwice}>+2</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["button exists", "Functional update is used"],
  },
  "react-140": {
    title: "Lifting State Up",
    description: "Move state to a shared parent component.",
    explanation:
      "If two sibling components need to share the same data, you move the state to their common parent; this is called \"lifting state up\".\nThe parent passes the state and a function that changes it down to the children as props.",
    example: `function Child({ count, onAdd }) {\n  return <button onClick={onAdd}>{count}</button>;\n}\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <Child count={count} onAdd={() => setCount(count + 1)} />;\n}`,
    hints: [
      "Keep the count state in the App component.",
      "Give count to the Display component as a prop.",
      "Give the onAdd function to the Buttons component as a prop: <Buttons onAdd={() => setCount(count + 1)} />",
    ],
    challenge: "Keep a count state in App; the Display component shows count via props, the Buttons component calls the function received via the onAdd prop when clicked.",
    files: {
      "App.jsx": `const { useState } = React;\n\nfunction Display({ count }) {\n  return <p>{count}</p>;\n}\n\nfunction Buttons({ onAdd }) {\n  return <button onClick={onAdd}>Artır</button>;\n}\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      {/* TODO: pass count to Display, onAdd to Buttons as props */}\n      <Display count={0} />\n      <Buttons onAdd={() => {}} />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["count is passed to Display", "onAdd is passed to Buttons", "setCount is used"],
  },
  "react-141": {
    title: "useEffect []",
    description: "Run code when the component first renders.",
    explanation:
      "The function inside `useEffect(fn, [])` runs once when the component first appears on screen.\nThe empty array `[]` as the second parameter makes the effect run only once.",
    example: `const { useEffect } = React;\nuseEffect(() => {\n  console.log("mounted");\n}, []);`,
    hints: [
      "Add const { useState, useEffect } = React; at the top of the file.",
      "Call setMessage(\"Yüklendi\") inside useEffect, with [] as the second parameter.",
      "useEffect(() => { setMessage(\"Yüklendi\"); }, []);",
    ],
    challenge: "Create a message state (\"\"); use useEffect to set message to 'Yüklendi' on first render and show it with <p>.",
    files: {
      "App.jsx": `const { useState, useEffect } = React;\n\nfunction App() {\n  const [message, setMessage] = useState("");\n\n  // TODO: useEffect(() => { setMessage("Yüklendi"); }, []);\n\n  return <p>{message}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["'Yüklendi' is shown", "useEffect is used with an empty array"],
  },
  "react-142": {
    title: "Effect on state change",
    description: "Run an effect when a specific state changes, via the dependency array.",
    explanation:
      "If you write `useEffect(fn, [deger])`, fn re-runs only when `deger` changes.\nThis is useful when you want to do something whenever a specific state or prop changes.",
    example: `useEffect(() => {\n  console.log("count changed:", count);\n}, [count]);`,
    hints: [
      "Create the count state, increase it with a button.",
      "Add useEffect, put [count] as the dependency array.",
      "useEffect(() => { setMessage(\"count: \" + count); }, [count]);",
    ],
    challenge: "Create a count state and an increase button; useEffect with the [count] dependency should set the message state to 'count: X'; show message.",
    files: {
      "App.jsx": `const { useState, useEffect } = React;\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  const [message, setMessage] = useState("");\n\n  // TODO: useEffect(() => { setMessage("count: " + count); }, [count]);\n\n  return (\n    <div>\n      <p>{message}</p>\n      <button onClick={() => setCount(count + 1)}>Artır</button>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["'count: 0' is shown", "useEffect is used with the [count] dependency"],
  },
  "react-143": {
    title: "Cleanup function",
    description: "Return a cleanup function from useEffect.",
    explanation:
      "If a function is `return`ed inside useEffect, it runs when the component is removed or before the effect runs again. This is called \"cleanup\".\nIt's used, for example, to stop a timer (`setInterval`): `return () => clearInterval(id);`.",
    example: `useEffect(() => {\n  const id = setInterval(() => console.log("tick"), 1000);\n  return () => clearInterval(id);\n}, []);`,
    hints: [
      "Start a setInterval inside useEffect.",
      "Return a cleanup function at the end of useEffect.",
      "return () => clearInterval(id); to clean up the interval.",
    ],
    challenge: "Start an interval with useEffect (increase with setSeconds) and call clearInterval in the cleanup function.",
    files: {
      "App.jsx": `const { useState, useEffect } = React;\n\nfunction App() {\n  const [seconds, setSeconds] = useState(0);\n\n  useEffect(() => {\n    const id = setInterval(() => {\n      setSeconds((prev) => prev + 1);\n    }, 1000);\n    // TODO: return () => clearInterval(id);\n  }, []);\n\n  return <p>{seconds}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["p exists", "Cleanup function calls clearInterval", "setInterval is used"],
  },
  "react-144": {
    title: "Mock API (setTimeout + Promise)",
    description: "Simulate a fake API call with a Promise.",
    explanation:
      "Without a real server, you can mimic API behavior by resolving a `Promise` inside `setTimeout`.\nThis fake request can be called inside useEffect and update state with the returned data.",
    example: `function fetchData() {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve("data"), 300);\n  });\n}`,
    hints: [
      "fetchData should return a Promise; call resolve(\"Merhaba API\") inside setTimeout.",
      "Call fetchData().then(data => setData(data)) inside useEffect.",
      "Keep the setTimeout duration short, like 300ms, so the test passes quickly.",
    ],
    challenge: "fetchData should return a Promise that resolves with 'Merhaba API' after 300ms; call it inside useEffect, update the data state, and show it.",
    files: {
      "App.jsx": `const { useState, useEffect } = React;\n\nfunction fetchData() {\n  // TODO: return a Promise that resolves with "Merhaba API" after 300ms\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(""), 300);\n  });\n}\n\nfunction App() {\n  const [data, setData] = useState("");\n\n  useEffect(() => {\n    fetchData().then((result) => setData(result));\n  }, []);\n\n  return <p>{data}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["'Merhaba API' is shown (within 500ms)", "Promise is used", "resolve is called"],
  },
  "react-145": {
    title: "Loading / error render",
    description: "Show loading and error states separately.",
    explanation:
      "In real apps, \"Yükleniyor...\" is shown until data arrives; an error message is shown if something fails.\nSeparate states like `loading` and `error` are usually kept for this and reflected on screen via conditional rendering.",
    example: `if (loading) return <p>Yükleniyor...</p>;\nif (error) return <p>Hata oluştu</p>;\nreturn <p>{data}</p>;`,
    hints: [
      "Start the loading state as true, set it to false once data arrives.",
      "Do an early return like if (loading) return <p>Yükleniyor...</p>;",
      "After data arrives, call setLoading(false) and show <p>{data}</p>.",
    ],
    challenge: "Create a loading state (true); use useEffect to set data and set loading to false after 300ms; show 'Yükleniyor...' while loading is true, and data once it's false.",
    files: {
      "App.jsx": `const { useState, useEffect } = React;\n\nfunction App() {\n  const [loading, setLoading] = useState(true);\n  const [data, setData] = useState("");\n\n  useEffect(() => {\n    setTimeout(() => {\n      setData("Merhaba Veri");\n      // TODO: call setLoading(false)\n    }, 300);\n  }, []);\n\n  // TODO: if loading is true, return <p>Yükleniyor...</p>\n  return <p>{data}</p>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
    },
    checks: ["'Merhaba Veri' is eventually shown (within 500ms)", "loading is set to false", "loading state is checked"],
  },
};
