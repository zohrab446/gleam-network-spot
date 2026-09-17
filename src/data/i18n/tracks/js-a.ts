import type { TrackTranslations } from "../types";

export const JS_A_EN: TrackTranslations = {
  "js-71": {
    title: "Your first step into JavaScript",
    description: "Link the script.js file to the HTML and log to the console.",
    explanation:
      "The `<script>` tag is used to connect JavaScript code to an HTML page. The `src` attribute specifies which file will be run.\nThe `console.log()` function prints text to the browser's developer console. It's one of the tools you'll use most while coding.",
    example: `console.log("Hello");\nconsole.log(42);`,
    hints: [
      "Add a `<script>` tag right before the `</body>` tag.",
      "Set the tag's `src` attribute to \"script.js\".",
      `<script src="script.js"></script> and inside script.js: console.log("Hello, CodeQuest!");`,
    ],
    challenge: "Link script.js at the end of index.html's body, and run console.log(\"Hello, CodeQuest!\") inside script.js.",
    checks: ["script.js linked to the HTML", "Console shows 'Hello, CodeQuest!'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>CodeQuest</h1>\n    <!-- TODO: link script.js here -->\n  </body>\n</html>`,
      "script.js": `// TODO: use console.log to print "Hello, CodeQuest!"`,
    },
  },
  "js-72": {
    title: "let and const",
    description: "Learn how to declare variables.",
    explanation:
      "With `let` you declare a variable whose value can change later. With `const` you declare a variable whose value can never change.\nBoth are declared once and then used.",
    example: `let age = 15;\nconst name = "Ali";\nage = 16;\nconsole.log(name, age);`,
    hints: [
      "Declare one `let` variable and one `const` variable.",
      "Print both of them with console.log.",
      `let score = 10; const title = "Oyuncu"; console.log(title, score);`,
    ],
    challenge: "Declare let score = 10 and const title = \"Oyuncu\", and print both with console.log.",
    checks: ["let score declared", "const title declared", "Output contains 'Oyuncu'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Player Panel</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare score (let) and title (const), print with console.log`,
    },
  },
  "js-73": {
    title: "Data types and typeof",
    description: "Use number, string, boolean and typeof.",
    explanation:
      "Commonly used types in JavaScript: `number`, `string`, `boolean` (true/false).\n`typeof` returns the type of a value as a string, for example `typeof 5` -> \"number\".",
    example: `let x = 5;\nconsole.log(typeof x);\nconsole.log(typeof "hello");`,
    hints: [
      "Declare three variables of different types: a number, a string, a boolean.",
      "Print the type of each one using typeof.",
      `let n = 5; let s = "hi"; let b = true; console.log(typeof n, typeof s, typeof b);`,
    ],
    challenge: "Declare n=5, s=\"hi\", b=true, and print typeof n, typeof s, typeof b with console.log.",
    checks: ["typeof n used", "Output contains 'number'", "Output contains 'boolean'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Data Types</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare n, s, b variables and print with typeof`,
    },
  },
  "js-74": {
    title: "Arithmetic operators",
    description: "Perform addition, multiplication and modulo operations.",
    explanation:
      "`+ - * /` are the basic arithmetic operators. `%` (modulo) returns the remainder of a division, for example `10 % 3` -> 1.\nYou can use these operators with numbers or variables.",
    example: `let a = 10;\nlet b = 3;\nconsole.log(a + b);\nconsole.log(a % b);`,
    hints: [
      "Declare a = 12, b = 5.",
      "Print the sum and the modulo (%) result in separate console.log calls.",
      `let a = 12; let b = 5; console.log(a + b); console.log(a % b);`,
    ],
    challenge: "Declare a=12, b=5; print a+b and a%b on separate lines with console.log.",
    checks: ["Output contains the sum (17)", "Output contains the modulo result (2)"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Calculator</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare a, b; print the sum and the modulo result`,
    },
  },
  "js-75": {
    title: "Template literals",
    description: "Embed variables inside text using backticks.",
    explanation:
      "Strings written with backticks (\\`) are called template literals. You can embed variables inside the text using \\${variable}.\nThis is more readable than concatenating strings with (+).",
    example: "let name = \"Ayşe\";\nlet age = 14;\nconsole.log(`Hello ${name}, you are ${age} years old.`);",
    hints: [
      "Declare the name and age variables.",
      "Use \\${name} and \\${age} inside a backtick string.",
      "let name = \"Zeynep\"; let age = 16; console.log(`Merhaba ${name}, ${age} yaşındasın.`);",
    ],
    challenge: "Declare name=\"Zeynep\", age=16; print the output \"Merhaba Zeynep, 16 yaşındasın.\" using a template literal.",
    checks: ["\\${name} used inside a template literal", "Output is correct"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Introduction</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare name, age and print with a template literal`,
    },
  },
  "js-76": {
    title: "Comparison operators",
    description: "Compare values with ===, !== and greater/less than.",
    explanation:
      "`===` checks whether two values are equal in both type and value (strict equality). `!==` checks that they are not equal.\n`>` `<` `>=` `<=` are used to compare numbers. The result is always `true` or `false`.",
    example: `console.log(5 === 5);\nconsole.log(5 === "5");\nconsole.log(7 > 3);`,
    hints: [
      "Declare a=8, b=8, and print the result of a === b.",
      "Also print the result of a > 10.",
      `let a = 8; let b = 8; console.log(a === b); console.log(a > 10);`,
    ],
    challenge: "Declare a=8, b=8; print the results of a === b and a > 10 with console.log.",
    checks: ["=== used", "Output contains true", "Output contains false"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Comparison</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare a, b; print a===b and a>10`,
    },
  },
  "js-77": {
    title: "Logical operators",
    description: "Use &&, || and !.",
    explanation:
      "`&&` (and) returns true only if both conditions are true. `||` (or) returns true if at least one condition is true. `!` negates a value.\nThese operators are usually used in conditional expressions.",
    example: `let isAdult = true;\nlet hasTicket = false;\nconsole.log(isAdult && hasTicket);\nconsole.log(isAdult || hasTicket);`,
    hints: [
      "Declare two booleans named sunny and warm.",
      "Print the results of && and || in separate console.log calls.",
      `let sunny = true; let warm = false; console.log(sunny && warm); console.log(sunny || warm);`,
    ],
    challenge: "Declare sunny=true, warm=false; print the results of sunny && warm and sunny || warm with console.log.",
    checks: ["&& used", "|| used", "Output contains false", "Output contains true"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Weather</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare sunny, warm; print the && and || results`,
    },
  },
  "js-78": {
    title: "if / else",
    description: "Write a conditional block of code.",
    explanation:
      "`if` runs the code inside it when a condition is true. `else` specifies alternative code that runs when the condition is false.\nYou can check multiple conditions in sequence with `else if`.",
    example: `let score = 45;\nif (score >= 50) {\n  console.log("Geçti");\n} else {\n  console.log("Kaldı");\n}`,
    hints: [
      "Set the score variable to 70.",
      "In the if (score >= 50) block print \"Geçti\", and in the else block print \"Kaldı\".",
      `let score = 70; if (score >= 50) { console.log("Geçti"); } else { console.log("Kaldı"); }`,
    ],
    challenge: "Declare score=70; if score>=50 print \"Geçti\", otherwise print \"Kaldı\".",
    checks: ["if used", "else used", "Output contains 'Geçti'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Grade Check</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare score; print Geçti/Kaldı with if/else`,
    },
  },
  "js-79": {
    title: "Ternary operator",
    description: "Write a condition on a single line.",
    explanation:
      "The ternary operator (`condition ? ifTrue : ifFalse`) lets you write an if/else on a single line.\nThe result can be assigned directly to a variable or printed.",
    example: `let age = 20;\nlet status = age >= 18 ? "Yetişkin" : "Çocuk";\nconsole.log(status);`,
    hints: [
      "Set the age variable to 15.",
      "Use a ternary to check age >= 18 and assign the result to status.",
      `let age = 15; let status = age >= 18 ? "Yetişkin" : "Çocuk"; console.log(status);`,
    ],
    challenge: "Declare age=15; assign \"Yetişkin\" or \"Çocuk\" to status using a ternary operator and print it with console.log.",
    checks: ["Ternary operator used", "Output contains 'Çocuk'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Age Check</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare age; build status with a ternary and print it`,
    },
  },
  "js-80": {
    title: "switch-case",
    description: "Handle multiple conditions with switch.",
    explanation:
      "`switch` lets you run different blocks of code depending on the different values of a variable. Each case is marked with `case`.\n`break` prevents falling through to the next case once one finishes. `default` runs when no case matches.",
    example: `let day = 3;\nswitch (day) {\n  case 1:\n    console.log("Pazartesi");\n    break;\n  default:\n    console.log("Diğer gün");\n}`,
    hints: [
      "Set the fruit variable to \"muz\".",
      "Inside switch (fruit) add \"elma\", \"muz\" cases and a default, using break in each.",
      `let fruit = "muz"; switch (fruit) { case "elma": console.log("Kırmızı"); break; case "muz": console.log("Sarı"); break; default: console.log("Bilinmiyor"); }`,
    ],
    challenge: "Declare fruit=\"muz\"; with switch, map \"elma\"->\"Kırmızı\", \"muz\"->\"Sarı\", default->\"Bilinmiyor\" and print it.",
    checks: ["switch used", "break used", "Output contains 'Sarı'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Fruit Color</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare fruit; print its color using switch-case`,
    },
  },
  "js-81": {
    title: "Defining functions",
    description: "Write reusable code with function.",
    explanation:
      "The `function` keyword lets you define a function that can perform an operation over and over. Parameters are specified in parentheses.\n`return` sends back the function's result.",
    example: `function square(n) {\n  return n * n;\n}\nconsole.log(square(4));`,
    hints: [
      "Define a function named add that takes two parameters.",
      "Use return to return the result of a+b.",
      `function add(a, b) { return a + b; } console.log(add(3, 5));`,
    ],
    challenge: "Define a function add(a, b) that returns a+b. Print the result of calling add(3, 5) with console.log.",
    checks: ["function add defined", "return used", "Output contains 8"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Addition Function</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: define the add function and print the add(3, 5) call`,
    },
  },
  "js-82": {
    title: "Arrow function",
    description: "Write a short function using arrow syntax.",
    explanation:
      "An arrow function is a way to define a short function without writing `function`, like `(parameters) => { ... }`.\nFor one-line functions you can even skip `{}` and `return`: `(a, b) => a + b`.",
    example: `const multiply = (a, b) => a * b;\nconsole.log(multiply(3, 4));`,
    hints: [
      "Define an arrow function named square that takes one parameter.",
      "Declare it with const and return n*n on a single line.",
      `const square = (n) => n * n; console.log(square(6));`,
    ],
    challenge: "Define an arrow function named square (returning n*n), and print the result of square(6) with console.log.",
    checks: ["Arrow function (=>) used", "Output contains 36"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Squaring</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: define the square arrow function and print square(6)`,
    },
  },
  "js-83": {
    title: "for loop",
    description: "Repeat an action with for.",
    explanation:
      "The `for` loop is used to repeat something a specific number of times: `for (start; condition; step) { ... }`.\nFor example `for (let i = 0; i < 5; i++)` runs 5 times, from 0 to 4.",
    example: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
    hints: [
      "Write a for loop that counts from 1 to 5.",
      "Print each number with console.log inside the loop.",
      `for (let i = 1; i <= 5; i++) { console.log(i); }`,
    ],
    challenge: "Use a for loop to print every number from 1 to 5 (inclusive) on separate lines with console.log.",
    checks: ["for loop used", "Output contains 5", "Output contains 1"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Counter</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: print numbers from 1 to 5 using a for loop`,
    },
  },
  "js-84": {
    title: "while loop",
    description: "Repeat while a condition is true.",
    explanation:
      "The `while` loop keeps running a block of code as long as the condition is true.\nTo avoid an infinite loop, don't forget to change something inside the loop that affects the condition (e.g. incrementing a counter).",
    example: `let i = 0;\nwhile (i < 3) {\n  console.log(i);\n  i++;\n}`,
    hints: [
      "Set count to 0 and loop while count < 4.",
      "Print count inside the loop and increase it with count++.",
      `let count = 0; while (count < 4) { console.log(count); count++; }`,
    ],
    challenge: "Declare count=0; with a while loop, print count and increment it by one while count < 4.",
    checks: ["while loop used", "Output contains 3", "Output contains 0"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Countdown</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: print count from 0 to 3 using a while loop`,
    },
  },
  "js-85": {
    title: "Creating and accessing arrays",
    description: "Create an array and access an element by index.",
    explanation:
      "An array is created with square brackets: `let arr = [1, 2, 3]`. Elements are accessed by index (starting at 0): `arr[0]`.\n`arr.length` gives the number of elements in the array.",
    example: `let colors = ["kırmızı", "mavi"];\nconsole.log(colors[0]);\nconsole.log(colors.length);`,
    hints: [
      "Create an array named fruits with 3 elements.",
      "Print the first element and the array's length with console.log.",
      `let fruits = ["elma", "muz", "çilek"]; console.log(fruits[0]); console.log(fruits.length);`,
    ],
    challenge: "Declare fruits = [\"elma\", \"muz\", \"çilek\"]; print fruits[0] and fruits.length with console.log.",
    checks: ["Array declared", "Output contains 'elma'", "Output contains 3 (the length)"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Fruit Basket</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare the fruits array, print the first element and its length`,
    },
  },
  "js-86": {
    title: "push / pop / shift / unshift",
    description: "Array methods for adding and removing elements.",
    explanation:
      "`push` adds an element to the end of an array, `pop` removes one from the end. `unshift` adds to the front, `shift` removes from the front.\nThese methods mutate the array directly.",
    example: `let arr = [1, 2];\narr.push(3);\narr.unshift(0);\nconsole.log(arr);`,
    hints: [
      "Declare the array nums = [2, 3].",
      "Apply push(4) and unshift(1), then print the array.",
      `let nums = [2, 3]; nums.push(4); nums.unshift(1); console.log(nums);`,
    ],
    challenge: "Declare nums=[2, 3]; apply push(4) and unshift(1), then print the array with console.log (result should be [1,2,3,4]).",
    checks: ["push used", "unshift used", "Output contains the array elements"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Array Operations</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: apply push and unshift to nums, and print it`,
    },
  },
  "js-87": {
    title: "forEach",
    description: "Run an action for every element of an array.",
    explanation:
      "`forEach` runs a function for every element of an array. This function receives each element in turn as a parameter.\nIt's an easy way to iterate over an array without building a loop.",
    example: `let nums = [1, 2, 3];\nnums.forEach((n) => console.log(n * 2));`,
    hints: [
      "Create the names array with 3 names.",
      "Use forEach to print each name with console.log.",
      `let names = ["Ali", "Ayşe", "Mert"]; names.forEach((name) => console.log(name));`,
    ],
    challenge: "Declare names=[\"Ali\", \"Ayşe\", \"Mert\"]; use forEach to print each name on its own line with console.log.",
    checks: ["forEach used", "Output contains 'Ayşe'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Name List</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: print the names array using forEach`,
    },
  },
  "js-88": {
    title: "map",
    description: "Create a transformed copy of an array.",
    explanation:
      "`map` applies an operation to each element of an array and returns a new array. The original array is unchanged.\nFor example, it's used to get a new array where every number is doubled.",
    example: `let nums = [1, 2, 3];\nlet doubled = nums.map((n) => n * 2);\nconsole.log(doubled);`,
    hints: [
      "Declare the array nums = [1, 2, 3, 4].",
      "Use map to create a new array with the square of each element.",
      `let nums = [1, 2, 3, 4]; let squares = nums.map((n) => n * n); console.log(squares);`,
    ],
    challenge: "Declare nums=[1, 2, 3, 4]; use map to square each element into the squares array, and print it with console.log.",
    checks: ["map used", "Output contains 16"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Squares</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: build the squares of nums using map and print them`,
    },
  },
  "js-89": {
    title: "filter",
    description: "Select the elements that match a condition.",
    explanation:
      "`filter` returns a new array containing only the elements of an array that match a given condition.\nThe condition function returns true/false for each element; only the true ones end up in the new array.",
    example: `let nums = [1, 2, 3, 4, 5];\nlet evens = nums.filter((n) => n % 2 === 0);\nconsole.log(evens);`,
    hints: [
      "Declare the array nums = [3, 8, 12, 5, 20].",
      "Use filter to select the elements greater than 10.",
      `let nums = [3, 8, 12, 5, 20]; let big = nums.filter((n) => n > 10); console.log(big);`,
    ],
    challenge: "Declare nums=[3, 8, 12, 5, 20]; use filter to put elements greater than 10 into the big array, and print it with console.log.",
    checks: ["filter used", "Output contains 12", "Output contains 20"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Big Numbers</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: select the elements of nums greater than 10 with filter and print them`,
    },
  },
  "js-90": {
    title: "Creating and accessing objects",
    description: "Define an object and access its properties.",
    explanation:
      "An object is created with curly braces: `{ key: value }`. Properties are accessed with a dot (`obj.key`) or square brackets (`obj[\"key\"]`).\nObjects are used to keep related data together.",
    example: `let person = { name: "Ali", age: 20 };\nconsole.log(person.name);\nconsole.log(person["age"]);`,
    hints: [
      "Create an object named student with name and grade properties.",
      "Print both properties with console.log.",
      `let student = { name: "Cem", grade: 9 }; console.log(student.name); console.log(student.grade);`,
    ],
    challenge: "Declare student = { name: \"Cem\", grade: 9 }; print student.name and student.grade with console.log.",
    checks: ["Object declared", "Output contains 'Cem'", "Output contains 9"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1>Student Card</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: declare the student object, print name and grade`,
    },
  },
  "js-91": {
    title: "getElementById + textContent",
    description: "Select an element from the DOM and change its content.",
    explanation:
      "`document.getElementById(\"id\")` selects a specific element on the page by its id. You can change that element's text with `textContent`.\nThis is the most basic way JavaScript updates a page live.",
    example: `let title = document.getElementById("title");\ntitle.textContent = "Yeni Başlık";`,
    hints: [
      "Select the element with id \"baslik\" using getElementById.",
      "Change the textContent of the element you selected.",
      `document.getElementById("baslik").textContent = "Hoş geldin!";`,
    ],
    challenge: "Set the textContent of the element with id \"baslik\" to \"Hoş geldin!\".",
    checks: ["'baslik' selected with getElementById", "Title became 'Hoş geldin!'"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <h1 id="baslik">Title</h1>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: change the textContent of the element with id "baslik"`,
    },
  },
  "js-92": {
    title: "querySelector / querySelectorAll",
    description: "Find element(s) using a CSS selector.",
    explanation:
      "`querySelector` returns the first element that matches a CSS selector. `querySelectorAll` returns all matching elements as a list.\nSelectors are written just like in CSS: `.class`, `#id`, `tag`.",
    example: `let first = document.querySelector(".kart");\nlet all = document.querySelectorAll(".kart");\nconsole.log(all.length);`,
    hints: [
      "Select all .kart elements with querySelectorAll.",
      "Change the textContent of the first .kart element with querySelector.",
      `document.querySelector(".kart").textContent = "İlk Kart"; console.log(document.querySelectorAll(".kart").length);`,
    ],
    challenge: "Use querySelector to set the textContent of the first .kart element to \"İlk Kart\", and print querySelectorAll(\".kart\").length with console.log.",
    checks: ["querySelectorAll used", "First card's text changed", "Output contains 3 (the card count)"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <div class="kart">Card 1</div>\n    <div class="kart">Card 2</div>\n    <div class="kart">Card 3</div>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: change the first .kart with querySelector, print the count with querySelectorAll`,
    },
  },
  "js-93": {
    title: "innerHTML",
    description: "Add HTML code inside an element.",
    explanation:
      "Unlike textContent, `innerHTML` lets you write HTML tags inside an element's content.\nFor example, you can add bold text with a `<strong>` tag inside a div.",
    example: `let box = document.getElementById("box");\nbox.innerHTML = "<strong>Önemli!</strong>";`,
    hints: [
      "Select the element with id \"kutu\".",
      "Add a <b> tag inside it with innerHTML.",
      `document.getElementById("kutu").innerHTML = "<b>Merhaba!</b>";`,
    ],
    challenge: "Set the innerHTML of the element with id \"kutu\" to \"<b>Merhaba!</b>\".",
    checks: ["innerHTML used", "Box contains <b>Merhaba!</b>"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <div id="kutu"></div>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: change the innerHTML of the element with id "kutu"`,
    },
  },
  "js-94": {
    title: "Inline styles (element.style)",
    description: "Change CSS styles with JavaScript.",
    explanation:
      "`element.style.property` lets you change an element's CSS property directly from JavaScript.\nProperty names are written in camelCase instead of using dashes like in CSS, for example `background-color` -> `backgroundColor`.",
    example: `let box = document.getElementById("box");\nbox.style.color = "red";\nbox.style.backgroundColor = "yellow";`,
    hints: [
      "Select the element with id \"kutu2\".",
      "Set style.backgroundColor to \"indigo\" and style.color to \"white\".",
      `let el = document.getElementById("kutu2"); el.style.backgroundColor = "indigo"; el.style.color = "white";`,
    ],
    challenge: "Set the background color of the element with id \"kutu2\" to \"indigo\" and its text color to \"white\" (using element.style).",
    checks: ["element.style used", "Background is indigo", "Text color is white"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <div id="kutu2">Colorful box</div>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: change kutu2's background and text color with style`,
    },
  },
  "js-95": {
    title: "classList: add / remove / toggle",
    description: "Manage an element's CSS classes.",
    explanation:
      "`element.classList.add(\"class\")` adds a class, `.remove(\"class\")` removes it, `.toggle(\"class\")` removes it if present or adds it if not.\nThis is a clean way to manage styling through CSS classes instead of changing styles directly.",
    example: `let box = document.getElementById("box");\nbox.classList.add("aktif");\nbox.classList.remove("gizli");`,
    hints: [
      "Select the element with id \"kutu3\".",
      "Remove the \"gizli\" class with classList.remove and add the \"aktif\" class with classList.add.",
      `let el = document.getElementById("kutu3"); el.classList.remove("gizli"); el.classList.add("aktif");`,
    ],
    challenge: "Remove the \"gizli\" class from the element with id \"kutu3\" and add the \"aktif\" class (using classList).",
    checks: ["classList.remove used", "classList.add used", "kutu3 has the 'aktif' class"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <div id="kutu3" class="gizli">Box</div>\n\n    <script src="script.js"></script>\n  </body>\n</html>`,
      "script.js": `// TODO: remove the "gizli" class from kutu3, add the "aktif" class`,
    },
  },
};
