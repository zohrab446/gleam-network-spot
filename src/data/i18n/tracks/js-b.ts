import type { TrackTranslations } from "../types";

export const JS_B_EN: TrackTranslations = {
  "js-96": {
    title: "Read and write attributes",
    description: "Manage HTML attributes with setAttribute and getAttribute.",
    explanation:
      "`setAttribute(name, value)` adds or changes an attribute on an element.\n`getAttribute(name)` reads the current value. For example, you can change an image's `src` or a link's `href` this way.",
    example: `const el = document.getElementById("box");\nel.setAttribute("data-status", "active");\nconsole.log(el.getAttribute("data-status"));`,
    hints: [
      "Select the element with id 'title' using document.getElementById.",
      "Use setAttribute to give the 'data-seviye' attribute the value '96'.",
      "const el = document.getElementById('title'); el.setAttribute('data-seviye', '96');",
    ],
    challenge: "Add the 'data-seviye' attribute with value '96' to the element with id 'title'.",
    files: {
      "script.js": `// TODO: add data-seviye="96" to the title element\n`,
    },
    checks: ["data-seviye attribute exists"],
  },
  "js-97": {
    title: "Create a new element",
    description: "Add an element to the page with createElement and appendChild.",
    explanation:
      "`document.createElement('tag')` creates a new HTML element but it is not added to the page yet.\n`parent.appendChild(el)` adds this element to a parent element and makes it visible.",
    example: `const li = document.createElement("li");\nli.textContent = "New item";\ndocument.getElementById("list").appendChild(li);`,
    hints: [
      "Create a new list item with createElement('li').",
      "Set its content to 'Merhaba' with textContent.",
      "const li = document.createElement('li'); li.textContent = 'Merhaba'; document.getElementById('list').appendChild(li);",
    ],
    challenge: "Add an <li> containing the text 'Merhaba' to the ul with id 'list'.",
    files: {
      "script.js": `// TODO: add a new li to list\n`,
    },
    checks: ["li was added"],
  },
  "js-98": {
    title: "Click listener",
    description: "Catch the click event with addEventListener.",
    explanation:
      "`element.addEventListener('click', function)` runs the function when that element is clicked.\nA mouse click can't be simulated in the sandboxed environment, so we check that your code is written correctly.",
    example: `const btn = document.getElementById("btn");\nbtn.addEventListener("click", () => {\n  console.log("clicked");\n});`,
    hints: [
      "Select the button with id 'btn'.",
      "Use addEventListener with the 'click' event.",
      "document.getElementById('btn').addEventListener('click', () => { console.log('tıklandı'); });",
    ],
    challenge: "Add a click listener to the 'btn' button that logs a message to the console.",
    files: {
      "script.js": `// TODO: add a click listener to btn\n`,
    },
    checks: ["click listener added"],
  },
  "js-99": {
    title: "Counter task",
    description: "Build a counter that increases on click.",
    explanation:
      "You can keep a number in a variable, increment it on every click, and print it to the screen.\nUse `textContent` to update the element's content with the current number.",
    example: `let sayac = 0;\nbtn.addEventListener("click", () => {\n  sayac++;\n  info.textContent = sayac;\n});`,
    hints: [
      "Create a variable 'let count = 0;'.",
      "Add a click listener to btn and increment count.",
      "Update info.textContent with count on every click; when the page loads, info's text should be '0'.",
    ],
    challenge: "The 'info' element's initial text should be '0'; when 'btn' is clicked, count should increase and be written into 'info'.",
    files: {
      "script.js": `let count = 0;\n// TODO: set the initial value of the info element and add a click listener\n`,
    },
    checks: ["click listener added", "info starts at 0"],
  },
  "js-100": {
    title: "Keyboard event",
    description: "Catch key presses with the keydown event.",
    explanation:
      "`addEventListener('keydown', function)` runs when a key is pressed.\nThe event object's `key` property tells you which key was pressed.",
    example: `document.addEventListener("keydown", (e) => {\n  console.log(e.key);\n});`,
    hints: [
      "Add a listener on document.",
      "Use 'keydown' as the event name.",
      "document.addEventListener('keydown', (e) => { console.log(e.key); });",
    ],
    challenge: "Add a keydown listener to document that logs the pressed key to the console.",
    files: {
      "script.js": `// TODO: add a keydown listener\n`,
    },
    checks: ["keydown listener added"],
  },
  "js-101": {
    title: "Prevent the default",
    description: "Stop the browser's default behavior with preventDefault().",
    explanation:
      "Some events (form submit, link click) have a default browser behavior.\n`event.preventDefault()` stops that behavior, for example preventing the page from reloading.",
    example: `form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  console.log("submission stopped");\n});`,
    hints: [
      "Add a click listener to btn.",
      "The listener function should take an event parameter (e.g. e).",
      "btn.addEventListener('click', (e) => { e.preventDefault(); });",
    ],
    challenge: "Add a click listener to the 'btn' element and call e.preventDefault() inside it.",
    files: {
      "script.js": `// TODO: use preventDefault inside the click listener\n`,
    },
    checks: ["click listener added", "preventDefault called"],
  },
  "js-102": {
    title: "Text box event",
    description: "Catch changes in a text box with the input event.",
    explanation:
      "`addEventListener('input', function)` runs every time an input element's value changes.\n`event.target.value` gives you the currently typed text.",
    example: `txt.addEventListener("input", (e) => {\n  console.log(e.target.value);\n});`,
    hints: [
      "Select the input with id 'txt'.",
      "Use 'input' as the event name.",
      "document.getElementById('txt').addEventListener('input', (e) => { console.log(e.target.value); });",
    ],
    challenge: "Add an input listener to the 'txt' input that logs the typed value to the console.",
    files: {
      "script.js": `// TODO: add an input listener\n`,
    },
    checks: ["input listener added"],
  },
  "js-103": {
    title: "Open/close a modal",
    description: "Show/hide a modal with classList.",
    explanation:
      "`classList.remove('hidden')` can remove a class and show the element.\n`classList.add('hidden')` hides it again. You can combine these two with a button click.",
    example: `btn.addEventListener("click", () => {\n  modal.classList.remove("hidden");\n});`,
    hints: [
      "Select the element with id 'modal'.",
      "Add a click listener to btn.",
      "btn.addEventListener('click', () => { document.getElementById('modal').classList.remove('hidden'); });",
    ],
    challenge: "Add a listener that removes the 'hidden' class from 'modal' when 'btn' is clicked.",
    files: {
      "script.js": `// TODO: show modal on click\n`,
    },
    checks: ["click listener added", "hidden class is being removed"],
  },
  "js-104": {
    title: "Stop the event",
    description: "Prevent an event from bubbling up to a parent element with stopPropagation.",
    explanation:
      "When you click an element, the event also bubbles up to its parent elements (bubbling).\n`event.stopPropagation()` stops that bubbling, so only the clicked element reacts.",
    example: `box.addEventListener("click", (e) => {\n  e.stopPropagation();\n});`,
    hints: [
      "Add a click listener to the element with id 'box'.",
      "Give the listener function an event parameter.",
      "box.addEventListener('click', (e) => { e.stopPropagation(); });",
    ],
    challenge: "Add a click listener to the 'box' element and call e.stopPropagation() inside it.",
    files: {
      "script.js": `// TODO: add a click listener to box, use stopPropagation\n`,
    },
    checks: ["click listener added", "stopPropagation called"],
  },
  "js-105": {
    title: "On mouse over",
    description: "Track the mouse with mouseover and mouseout events.",
    explanation:
      "`mouseover` fires when the mouse enters an element.\n`mouseout` fires when the mouse leaves the element. They're usually used together.",
    example: `box.addEventListener("mouseover", () => {\n  box.classList.add("active");\n});\nbox.addEventListener("mouseout", () => {\n  box.classList.remove("active");\n});`,
    hints: [
      "Add a mouseover listener to box.",
      "Also add a mouseout listener to box.",
      "box.addEventListener('mouseover', () => {...}); box.addEventListener('mouseout', () => {...});",
    ],
    challenge: "Add both mouseover and mouseout listeners to the 'box' element.",
    files: {
      "script.js": `// TODO: add mouseover and mouseout listeners\n`,
    },
    checks: ["mouseover listener added", "mouseout listener added"],
  },
  "js-106": {
    title: "Run with a delay",
    description: "Run code after a certain amount of time with setTimeout.",
    explanation:
      "`setTimeout(function, ms)` runs the function once after the given number of milliseconds.\nThis lets you make code run after a small delay instead of immediately.",
    example: `setTimeout(() => {\n  console.log("after 500ms");\n}, 500);`,
    hints: [
      "Use the setTimeout function.",
      "Give it a function that logs console.log('Merhaba').",
      "setTimeout(() => { console.log('Merhaba'); }, 300);",
    ],
    challenge: "Use setTimeout to log 'Merhaba' to the console after 300ms.",
    files: {
      "script.js": `// TODO: use setTimeout to print 'Merhaba' after 300ms\n`,
    },
    checks: ["Output contains 'Merhaba'"],
  },
  "js-107": {
    title: "Run repeatedly",
    description: "Manage a repeating task with setInterval and clearInterval.",
    explanation:
      "`setInterval(function, ms)` runs the function repeatedly every ms milliseconds.\n`clearInterval(id)` stops that repetition. You must stop it with a counter to avoid an infinite loop.",
    example: `let i = 0;\nconst id = setInterval(() => {\n  i++;\n  console.log(i);\n  if (i >= 3) clearInterval(id);\n}, 100);`,
    hints: [
      "Use a counter variable and setInterval.",
      "Log the counter value to the console on every tick.",
      "When the counter reaches 3, stop it with clearInterval(id); the interval should be 100ms.",
    ],
    challenge: "Write a setInterval that counts every 100ms, stops when it reaches 3, and logs the count at each step.",
    files: {
      "script.js": `// TODO: count to 3 with setInterval and stop\n`,
    },
    checks: ["Output contains 3", "clearInterval called"],
  },
  "js-108": {
    title: "Search an array",
    description: "Search an array with find, some, and includes.",
    explanation:
      "`find` returns the first element that satisfies a condition. `some` checks whether at least one element satisfies a condition (true/false).\n`includes` checks whether a value exists in the array.",
    example: `const nums = [1, 2, 3, 4];\nconsole.log(nums.find((n) => n > 2));\nconsole.log(nums.includes(4));`,
    hints: [
      "Create a number array, e.g. [3, 7, 10, 15].",
      "Use find to get the first number greater than 10 and print it.",
      "console.log([3, 7, 10, 15].find((n) => n > 10));",
    ],
    challenge: "Use find on [3, 7, 10, 15] to get the first number greater than 10 and log it (should be 15).",
    files: {
      "script.js": `// TODO: use find to print the first number greater than 10\n`,
    },
    checks: ["Output contains 15", "find used"],
  },
  "js-109": {
    title: "Sum up an array",
    description: "Reduce an array to a single value with reduce.",
    explanation:
      "`reduce((total, element) => ..., initial)` walks through the array and produces a single result.\nIt's often used for accumulating operations like sums or products.",
    example: `const nums = [1, 2, 3];\nconst total = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(total);`,
    hints: [
      "Create the array [1, 2, 3, 4].",
      "Calculate the sum with reduce, starting from 0.",
      "console.log([1, 2, 3, 4].reduce((acc, n) => acc + n, 0));",
    ],
    challenge: "Calculate the sum of [1, 2, 3, 4] with reduce and log it (should be 10).",
    files: {
      "script.js": `// TODO: calculate the sum with reduce\n`,
    },
    checks: ["Output contains 10", "reduce used"],
  },
  "js-110": {
    title: "Break into parts",
    description: "Extract values from arrays and objects with destructuring.",
    explanation:
      "`const [a, b] = array;` assigns the array's elements to separate variables.\n`const {name} = object;` assigns a property of the object to a variable. The code becomes shorter and more readable.",
    example: `const person = { name: "Ali", age: 20 };\nconst { name, age } = person;\nconsole.log(name, age);`,
    hints: [
      "Create an object: { isim: 'Zeynep', yas: 17 }.",
      "Extract the isim and yas variables with destructuring.",
      "const { isim, yas } = { isim: 'Zeynep', yas: 17 }; console.log(isim, yas);",
    ],
    challenge: "Extract isim and yas from { isim: 'Zeynep', yas: 17 } with destructuring, and log both to the console.",
    files: {
      "script.js": `// TODO: use destructuring\n`,
    },
    checks: ["Output contains Zeynep", "Output contains 17"],
  },
  "js-111": {
    title: "Spread and gather",
    description: "Build/gather arrays with spread and rest operators.",
    explanation:
      "`...` 'spreads' an array's elements, used to create a new array.\nIn a function parameter, it 'gathers' the remaining arguments into an array (rest).",
    example: `const a = [1, 2];\nconst b = [...a, 3, 4];\nconsole.log(b);\nfunction sum(...nums) {\n  return nums.reduce((s, n) => s + n, 0);\n}`,
    hints: [
      "Expand [1, 2] into [1, 2, 3] with spread.",
      "Log the new array with console.log.",
      "const a = [1, 2]; const b = [...a, 3]; console.log(b);",
    ],
    challenge: "Expand [1, 2] with the spread operator and add 3 at the end, then log the result.",
    files: {
      "script.js": `// TODO: use the spread operator\n`,
    },
    checks: ["spread operator used", "Output contains 3"],
  },
  "js-112": {
    title: "Store in the browser",
    description: "Persist data with localStorage.",
    explanation:
      "`localStorage.setItem('key', value)` stores data in the browser.\n`localStorage.getItem('key')` reads that value back. Values are always stored as text (string).",
    example: `localStorage.setItem("name", "Ali");\nconsole.log(localStorage.getItem("name"));`,
    hints: [
      "Save the value 'CodeQuest' under the key 'kullanici' with setItem.",
      "Read that value back with getItem.",
      "localStorage.setItem('kullanici', 'CodeQuest'); console.log(localStorage.getItem('kullanici'));",
    ],
    challenge: "Save the value 'CodeQuest' under the key 'kullanici', then read it with getItem and log it to the console.",
    files: {
      "script.js": `// TODO: use localStorage\n`,
    },
    checks: ["setItem used", "Output contains CodeQuest"],
  },
  "js-113": {
    title: "Convert an object to text",
    description: "Convert data with JSON.stringify and JSON.parse.",
    explanation:
      "`JSON.stringify(object)` converts an object to text (string), used to store or send it.\n`JSON.parse(text)` converts that text back into an object.",
    example: `const obj = { a: 1 };\nconst str = JSON.stringify(obj);\nconst back = JSON.parse(str);\nconsole.log(back.a);`,
    hints: [
      "Convert the object { isim: 'Ali' } to text with stringify.",
      "Convert that text back to an object with parse.",
      "const str = JSON.stringify({ isim: 'Ali' }); console.log(JSON.parse(str).isim);",
    ],
    challenge: "Convert { isim: 'Ali' } to text with JSON.stringify, then convert it back with JSON.parse and log isim to the console.",
    files: {
      "script.js": `// TODO: use JSON.stringify and JSON.parse\n`,
    },
    checks: ["stringify used", "parse used", "Output contains Ali"],
  },
  "js-114": {
    title: "Make a promise",
    description: "Represent an asynchronous operation with Promise.",
    explanation:
      "A `Promise` represents an operation that will complete in the future. `resolve(value)` signals success.\n`.then(function)` runs when the promise completes and receives the result.",
    example: `const p = new Promise((resolve) => {\n  resolve("done");\n});\np.then((result) => console.log(result));`,
    hints: [
      "Create a promise with new Promise.",
      "Inside it, call resolve('Bitti') after 200ms using setTimeout.",
      "new Promise((resolve) => setTimeout(() => resolve('Bitti'), 200)).then((s) => console.log(s));",
    ],
    challenge: "Create a Promise that resolves with 'Bitti' after 200ms, and log the result with then.",
    files: {
      "script.js": `// TODO: create a Promise and print the result with then\n`,
    },
    checks: ["Promise created", "Output contains Bitti"],
  },
  "js-115": {
    title: "Work by waiting",
    description: "Get a promise's result more readably with async/await.",
    explanation:
      "`async` lets you use `await` inside a function.\n`await promise` waits until the promise completes and returns the result directly, so you don't need to write `.then`.",
    example: `async function run() {\n  const result = await Promise.resolve("ready");\n  console.log(result);\n}\nrun();`,
    hints: [
      "Define an async function.",
      "Inside it, use await to get the result of Promise.resolve('Hazır').",
      "async function run() { const s = await Promise.resolve('Hazır'); console.log(s); } run();",
    ],
    challenge: "Write an async function that uses await to get the value of Promise.resolve('Hazır') and logs it.",
    files: {
      "script.js": `// TODO: use async/await\n`,
    },
    checks: ["async function used", "await used", "Output contains Hazır"],
  },
  "js-116": {
    title: "Catch the error",
    description: "Handle errors safely with try/catch.",
    explanation:
      "A `try { ... }` block lets your program keep running if an error occurs inside it.\nA `catch (error) { ... }` block catches that error so you can handle it.",
    example: `try {\n  throw new Error("something went wrong");\n} catch (e) {\n  console.log(e.message);\n}`,
    hints: [
      "Call throw new Error('Hata!') inside a try block.",
      "Catch e.message in the catch block.",
      "try { throw new Error('Hata!'); } catch (e) { console.log(e.message); }",
    ],
    challenge: "Using try/catch, throw an Error with message 'Hata!' and log the message inside catch.",
    files: {
      "script.js": `// TODO: use try/catch\n`,
    },
    checks: ["try/catch used", "Output contains Hata!"],
  },
  "js-117": {
    title: "Mini to-do list",
    description: "Render list items from an array.",
    explanation:
      "You can loop through an array with `forEach` or `map`, creating an `<li>` for each element and adding it to a list.\nThis way you generate dynamic HTML based on data.",
    example: `const tasks = ["Buy bread", "Write code"];\ntasks.forEach((t) => {\n  const li = document.createElement("li");\n  li.textContent = t;\n  list.appendChild(li);\n});`,
    hints: [
      "Create an array like ['Ekmek al', 'Kod yaz', 'Uyu'].",
      "Create an li for each element with forEach.",
      "gorevler.forEach((g) => { const li = document.createElement('li'); li.textContent = g; document.getElementById('list').appendChild(li); });",
    ],
    challenge: "Create an array of 3 tasks and use forEach to add each one to the 'list' element as an <li>.",
    files: {
      "script.js": `// TODO: add the tasks from the array to list\n`,
    },
    checks: ["at least 3 li elements exist"],
  },
  "js-118": {
    title: "Filtered list",
    description: "Filter an array with filter and render the result.",
    explanation:
      "`filter` collects the elements of an array that satisfy a condition into a new array.\nYou can display this result on screen as `<li>` elements to show a filtered list.",
    example: `const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter((n) => n % 2 === 0);\nevens.forEach((n) => {\n  const li = document.createElement("li");\n  li.textContent = n;\n  list.appendChild(li);\n});`,
    hints: [
      "Create the array [1, 2, 3, 4, 5, 6].",
      "Use filter to keep only the even numbers.",
      "Add the result to the 'list' element with forEach as li elements (2, 4, 6).",
    ],
    challenge: "Use filter to select the even numbers from [1,2,3,4,5,6] and add them to the 'list' element as <li>.",
    files: {
      "script.js": `// TODO: add the even numbers to list using filter\n`,
    },
    checks: ["at least 3 li elements exist", "filter used"],
  },
  "js-119": {
    title: "Theme switcher",
    description: "Toggle dark theme with classList.toggle.",
    explanation:
      "`classList.toggle('class')` removes a class if it exists, or adds it if it doesn't.\nYou can use this on `document.body` to change the theme of the whole page.",
    example: `btn.addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});`,
    hints: [
      "Add a click listener to btn.",
      "Use document.body.classList.toggle inside it.",
      "btn.addEventListener('click', () => { document.body.classList.toggle('dark'); });",
    ],
    challenge: "Add a listener that toggles the 'dark' class on document.body when 'btn' is clicked.",
    files: {
      "script.js": `// TODO: toggle the dark class on body\n`,
    },
    checks: ["click listener added", "dark class is being toggled"],
  },
  "js-120": {
    title: "Final boss: mini app",
    description: "Combine a counter, filtering, and theme switching.",
    explanation:
      "In this final lesson you combine everything you've learned: a counter that increases on click, a filtered list, and a theme switcher.\nWrite each piece separately and connect them together.",
    example: `let count = 0;\nbtn.addEventListener("click", () => {\n  count++;\n  info.textContent = count;\n});\ndocument.body.classList.toggle("dark");`,
    hints: [
      "Set the info element's initial text to '0'.",
      "When btn is clicked, both count should increase and 'dark' should be toggled on body.",
      "From the array [10,15,20,25], use filter to get the numbers greater than 15 and add them to list as li (20, 25).",
    ],
    challenge: "info should start at '0'; clicking btn should increase count and write it into info, and toggle 'dark' on body; also, filter [10,15,20,25] for numbers greater than 15 and add them to 'list'.",
    files: {
      "script.js": `// TODO: combine counter + theme + filtering\n`,
    },
    checks: ["info starts at 0", "click listener added", "dark class is being toggled", "at least 2 li elements exist"],
  },
};
