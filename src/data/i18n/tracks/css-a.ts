import type { TrackTranslations } from "../types";

export const CSS_A_EN: TrackTranslations = {
  "css-21": {
    title: "Connect to style.css",
    description: "Link the HTML to a style.css file and write your first CSS rule.",
    explanation:
      "To link a CSS file to an HTML page, add a `<link rel=\"stylesheet\" href=\"style.css\">` tag inside `<head>`.\nThat way, the rules inside style.css get applied to the page. In our first rule, we'll use the `body` selector to set the page's background color.",
    example: `<head>\n  <link rel="stylesheet" href="style.css" />\n</head>`,
    hints: [
      "Add a <link> tag inside the <head> tag.",
      "The link tag should have rel=\"stylesheet\" and href=\"style.css\".",
      "<link rel=\"stylesheet\" href=\"style.css\" /> and in style.css: body { background-color: #f1f5f9; }",
    ],
    challenge:
      "Add the <link> tag that connects style.css to the <head> section of index.html. Then in style.css, use the body selector to set background-color: #f1f5f9.",
    checks: ["style.css linked to HTML", "body background color set"],
    files: {
      "index.html": `<!DOCTYPE html>\n<html lang="tr">\n  <head>\n    <meta charset="UTF-8" />\n    <!-- TODO: link style.css here -->\n  </head>\n  <body>\n    <h1>Merhaba CSS</h1>\n  </body>\n</html>`,
      "style.css": `/* TODO: write your first rule for body */`,
    },
  },
  "css-22": {
    title: "Element selector",
    description: "Select by tag name to style all p elements.",
    explanation:
      "The simplest CSS selector is the element (tag) selector. When you write `p { ... }`, those rules apply to every `<p>` tag on the page.\nIn the same way, any tag name like `h1` or `div` can be used as a selector.",
    example: `h1 {\n  color: navy;\n}`,
    hints: [
      "Write p as the selector.",
      "Add the color and font-size properties inside it.",
      "p { color: rgb(30, 41, 59); font-size: 18px; }",
    ],
    challenge: "Set the text color of all <p> elements to rgb(30, 41, 59) and set font-size to 18px.",
    checks: ["p text color set", "Font size is 18px"],
    files: {
      "style.css": `/* TODO: add a p selector */`,
    },
  },
  "css-23": {
    title: "Let colors speak",
    description: "Color elements using color and background-color.",
    explanation:
      "In CSS, `color` sets an element's text color, and `background-color` sets its background.\nYou can write colors by name (red), hex (#6366f1), or with rgb().",
    example: `p {\n  color: white;\n  background-color: #6366f1;\n}`,
    hints: [
      "Use the .kart class as the selector.",
      "Write the background-color property for the background.",
      ".kart { background-color: #6366f1; color: white; }",
    ],
    challenge: "Set the .kart class's background to #6366f1 (indigo) and its text color to white.",
    checks: ["Background is indigo", "Text color is white"],
    files: {
      "style.css": `.kart {\n  padding: 16px;\n  /* TODO: add colors */\n}`,
    },
  },
  "css-24": {
    title: "Class selector",
    description: "Use the class selector that starts with a dot.",
    explanation:
      "If you give an HTML element `class=\"name\"`, you can select it in CSS by writing `.name { ... }`.\nClass selectors let you style all elements with the same class at once.",
    example: `.uyari {\n  color: red;\n}`,
    hints: [
      "There is an element in the HTML with class=\"vurgu\".",
      "Write the .vurgu selector in CSS.",
      ".vurgu { font-weight: bold; background-color: rgb(254, 240, 138); }",
    ],
    challenge: "Add font-weight: bold and background-color: rgb(254, 240, 138) to the .vurgu class.",
    checks: ["Bold text", "Background is yellow"],
    files: {
      "style.css": `/* TODO: style the .vurgu class */`,
    },
  },
  "css-25": {
    title: "id selector",
    description: "Use the id selector that starts with #.",
    explanation:
      "If you give an HTML element `id=\"name\"`, you can select it in CSS by writing `#name { ... }`.\nIds are unique to a single element on the page, which makes them more specific than classes.",
    example: `#header {\n  background-color: black;\n}`,
    hints: [
      "There is an element in the HTML with id=\"logo\".",
      "Write the #logo selector in CSS.",
      "#logo { font-size: 24px; color: rgb(220, 38, 38); }",
    ],
    challenge: "Set the #logo element's font-size to 24px and color to rgb(220, 38, 38).",
    checks: ["Font size is 24px", "Text color is red"],
    files: {
      "style.css": `/* TODO: style the #logo selector */`,
    },
  },
  "css-26": {
    title: "Font family and size",
    description: "Style text with font-size and font-family.",
    explanation:
      "`font-size` sets the size of the text, while `font-family` determines which typeface is used.\nMultiple font names are separated by commas; the browser uses the first one it finds.",
    example: `p {\n  font-size: 18px;\n  font-family: Arial, sans-serif;\n}`,
    hints: [
      "Select the .baslik class.",
      "Add font-size and font-family.",
      ".baslik { font-size: 32px; font-family: Arial, sans-serif; }",
    ],
    challenge: "Set the .baslik class's font-size to 32px and font-family to Arial, sans-serif.",
    checks: ["Font size is 32px", "Font family is Arial"],
    files: {
      "style.css": `/* TODO: style .baslik */`,
    },
  },
  "css-27": {
    title: "Bold, italic, and underline",
    description: "Use the font-weight, font-style, and text-decoration properties.",
    explanation:
      "`font-weight` sets how bold the text is (normal, bold, 700, etc.), `font-style` controls whether it's slanted (italic), and `text-decoration` controls decorations like underlines.\nThese three properties are often used together.",
    example: `a {\n  font-weight: bold;\n  font-style: italic;\n  text-decoration: underline;\n}`,
    hints: [
      "Select the .not class.",
      "Add font-style: italic and text-decoration: underline.",
      ".not { font-style: italic; text-decoration: underline; }",
    ],
    challenge: "Make the .not class's text italic and underline it (underline).",
    checks: ["Text is italic", "Has underline"],
    files: {
      "style.css": `/* TODO: style .not */`,
    },
  },
  "css-28": {
    title: "Alignment and line height",
    description: "Adjust text with text-align and line-height.",
    explanation:
      "`text-align` sets the horizontal alignment of text (left, center, right).\n`line-height` sets the vertical spacing between lines, making text more readable.",
    example: `p {\n  text-align: center;\n  line-height: 1.5;\n}`,
    hints: [
      "Select the .metin class.",
      "Add text-align: center.",
      ".metin { text-align: center; line-height: 1.8; }",
    ],
    challenge: "Center the .metin class horizontally (text-align: center) and set line-height to 1.8.",
    checks: ["Text is centered", "Line height is 1.8"],
    files: {
      "style.css": `/* TODO: style .metin */`,
    },
  },
  "css-29": {
    title: "Grouping and nested selectors",
    description: "Group multiple selectors with a comma, select nested elements.",
    explanation:
      "To apply the same style to multiple selectors, group them with a comma: `h1, h2 { ... }`.\nTo select an element nested inside another, use a space: `.kart p` only selects p elements inside .kart.",
    example: `h1, h2 {\n  color: navy;\n}\n\n.kart p {\n  color: gray;\n}`,
    hints: [
      "Combine h1, h2 into one selector in a single rule.",
      "Target only the paragraph inside the card with the .kart p selector.",
      "h1, h2 { color: rgb(30, 64, 175); } .kart p { color: rgb(107, 114, 128); }",
    ],
    challenge: "Group h1 and h2 and set color: rgb(30, 64, 175). Also, using the .kart p selector, set the color of only the p inside .kart to rgb(107, 114, 128).",
    checks: ["h1 color set", "h2 color set", "Color of p inside card set"],
    files: {
      "style.css": `/* TODO: add grouping and nested selector */`,
    },
  },
  "css-30": {
    title: "Box model: padding",
    description: "Use padding to add space between content and edge.",
    explanation:
      "Every HTML element is thought of as a box. `padding` is the space between an element's content and its border.\nTo give the same value to all sides, a single number is enough: `padding: 20px;`.",
    example: `.kutu {\n  padding: 20px;\n}`,
    hints: [
      "Select the .kutu class.",
      "Add the padding and background-color properties.",
      ".kutu { padding: 20px; background-color: rgb(226, 232, 240); }",
    ],
    challenge: "Add padding: 20px and background-color: rgb(226, 232, 240) to the .kutu class.",
    checks: ["Padding is 20px", "Background color set"],
    files: {
      "style.css": `.kutu {\n  /* TODO: add padding and background */\n}`,
    },
  },
  "css-31": {
    title: "Outer spacing with margin",
    description: "Use margin to add space outside an element.",
    explanation:
      "`margin` is the outer space between an element's border and other elements.\n`padding` creates space inside, `margin` creates space outside. Together they form the box model.",
    example: `.kutu {\n  margin: 30px;\n}`,
    hints: [
      "Select the .kutu class.",
      "Add the margin and background-color properties.",
      ".kutu { margin: 30px; background-color: rgb(203, 213, 225); }",
    ],
    challenge: "Add margin: 30px and background-color: rgb(203, 213, 225) to the .kutu class.",
    checks: ["Margin is 30px", "Background color set"],
    files: {
      "style.css": `.kutu {\n  /* TODO: add margin and background */\n}`,
    },
  },
  "css-32": {
    title: "Border and rounded corners",
    description: "Add a border with border and border-radius.",
    explanation:
      "`border` draws a line around an element; thickness, style, and color are written in that order: `border: 2px solid black;`.\n`border-radius` rounds the corners; larger values give a circle effect.",
    example: `.kutu {\n  border: 2px solid black;\n  border-radius: 8px;\n}`,
    hints: [
      "Select the .kutu class.",
      "Add border and border-radius.",
      ".kutu { border: 3px solid rgb(99, 102, 241); border-radius: 12px; }",
    ],
    challenge: "Add border: 3px solid rgb(99, 102, 241) and border-radius: 12px to the .kutu class.",
    checks: ["Border width is 3px", "Border color is indigo", "Corners are rounded"],
    files: {
      "style.css": `.kutu {\n  padding: 16px;\n  /* TODO: add border */\n}`,
    },
  },
  "css-33": {
    title: "Width and height",
    description: "Set an element's size with width and height.",
    explanation:
      "`width` fixes an element's width, and `height` fixes its height, using units like pixels.\nSetting sizes lets you control how much space elements take up on the page.",
    example: `.kutu {\n  width: 200px;\n  height: 100px;\n}`,
    hints: [
      "Select the .kutu class.",
      "Add width and height.",
      ".kutu { width: 200px; height: 100px; }",
    ],
    challenge: "Give the .kutu class width: 200px and height: 100px.",
    checks: ["Width is 200px", "Height is 100px"],
    files: {
      "style.css": `.kutu {\n  background-color: #94a3b8;\n  /* TODO: add size */\n}`,
    },
  },
  "css-34": {
    title: "box-sizing: border-box",
    description: "Include padding and border in the total width.",
    explanation:
      "Normally, `width` is only the content's width; when padding and border are added, the box looks bigger.\nWith `box-sizing: border-box`, padding and border are included within the width/height you specify, making sizes predictable.",
    example: `.kutu {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 20px;\n}`,
    hints: [
      "Select the .kutu class.",
      "Set the box-sizing property to border-box.",
      ".kutu { box-sizing: border-box; width: 200px; padding: 20px; }",
    ],
    challenge: "Add box-sizing: border-box, width: 200px, and padding: 20px to the .kutu class.",
    checks: ["box-sizing is border-box", "Width is 200px"],
    files: {
      "style.css": `.kutu {\n  background-color: #a5b4fc;\n  /* TODO: add box-sizing and size */\n}`,
    },
  },
  "css-35": {
    title: "display: block, inline, inline-block",
    description: "Change the flow behavior of elements with the display property.",
    explanation:
      "`display: block` makes an element take its own line; `inline` only takes as much space as its content and width/height have no effect; `inline-block` sits side by side like inline but width/height can be set.\nThis property is fundamental to layout design.",
    example: `span {\n  display: inline-block;\n  width: 100px;\n}`,
    hints: [
      "Select the .etiket class.",
      "Set display: inline-block.",
      ".etiket { display: inline-block; width: 120px; }",
    ],
    challenge: "Give the .etiket class display: inline-block and width: 120px.",
    checks: ["display is inline-block", "Width is 120px"],
    files: {
      "style.css": `/* TODO: style .etiket */`,
    },
  },
  "css-36": {
    title: "Visibility: display: none and visibility",
    description: "Learn two ways to hide elements.",
    explanation:
      "`display: none` removes an element from the page entirely; it takes up no space.\n`visibility: hidden` makes the element invisible, but its spot remains empty. The two are used in different scenarios.",
    example: `.gizli {\n  display: none;\n}`,
    hints: [
      "Select the .gizli class and set display: none.",
      "Select the .saydam class and set visibility: hidden.",
      ".gizli { display: none; } .saydam { visibility: hidden; }",
    ],
    challenge: "Add display: none to the .gizli class. Add visibility: hidden to the .saydam class.",
    checks: ["Element is hidden", "Element is invisible but still takes up space"],
    files: {
      "style.css": `/* TODO: hide the .gizli and .saydam classes */`,
    },
  },
  "css-37": {
    title: "Pseudo-class: :hover and :first-child",
    description: "Give special styles for mouse hover and the first element.",
    explanation:
      "The `:hover` pseudo-class defines the style applied when the mouse is over an element.\n`:first-child` targets the first element within a group. Both are added to the end of a selector.",
    example: `button:hover {\n  background-color: darkblue;\n}\n\nli:first-child {\n  font-weight: bold;\n}`,
    hints: [
      "Write the button:hover selector.",
      "Write the li:first-child selector in a separate rule.",
      "button:hover { background-color: rgb(30, 64, 175); } li:first-child { font-weight: bold; }",
    ],
    challenge: "Write background-color: rgb(30, 64, 175) for button:hover. Set font-weight: bold for li:first-child.",
    checks: ["button:hover rule exists", "First li is bold"],
    files: {
      "style.css": `/* TODO: add hover and first-child */`,
    },
  },
  "css-38": {
    title: "Pseudo-class: :nth-child",
    description: "Select elements at specific positions with nth-child.",
    explanation:
      "`:nth-child(n)` selects an element at a specific position in a group. `:nth-child(2)` selects the second element, `:nth-child(odd)` selects the odd-numbered ones.\nIt's often used in lists to color rows differently (zebra effect).",
    example: `li:nth-child(2) {\n  color: red;\n}`,
    hints: [
      "Write the li:nth-child(2) and li:nth-child(3) selectors.",
      "Add a color property to both.",
      "li:nth-child(2) { color: rgb(220, 38, 38); } li:nth-child(3) { color: rgb(21, 128, 61); }",
    ],
    challenge: "Set the second li element's text color to rgb(220, 38, 38), and the third li element's text color to rgb(21, 128, 61).",
    checks: ["Second li is red", "Third li is green"],
    files: {
      "style.css": `/* TODO: add nth-child */`,
    },
  },
  "css-39": {
    title: "Pseudo-element: ::before and ::after",
    description: "Add content before or after an element with content.",
    explanation:
      "The `::before` and `::after` pseudo-elements insert virtual content before or after an element's content.\nThis content is specified with the `content` property and must always be set, even if empty: `content: \"\";`.",
    example: `.kart::before {\n  content: "★ ";\n}`,
    hints: [
      "Use the .kart::before and .kart::after selectors.",
      "Give both a content property.",
      ".kart::before { content: \"🔥 \"; } .kart::after { content: \" ✅\"; }",
    ],
    challenge: "Add content: \"🔥 \" before the .kart element with ::before, and content: \" ✅\" after it with ::after.",
    checks: ["::before content defined", "::after content defined"],
    files: {
      "style.css": `/* TODO: add ::before and ::after */`,
    },
  },
  "css-40": {
    title: "Attribute selector",
    description: "Select an element based on a specific HTML attribute.",
    explanation:
      "An attribute selector selects elements based on whether they have a specific attribute.\n`[type=\"text\"]` only selects elements whose type attribute is \"text\".",
    example: `input[type="text"] {\n  border: 1px solid gray;\n}`,
    hints: [
      "Write the input[type=\"text\"] selector.",
      "Add a border property.",
      "input[type=\"text\"] { border: 2px solid rgb(59, 130, 246); }",
    ],
    challenge: "Using the input[type=\"text\"] selector, add border: 2px solid rgb(59, 130, 246) only to the text-type input.",
    checks: ["Text input border is 2px", "Text input border is blue"],
    files: {
      "style.css": `/* TODO: add attribute selector */`,
    },
  },
  "css-41": {
    title: "Background image and gradient",
    description: "Use a gradient instead of a plain color with background-image.",
    explanation:
      "`background-image` normally shows an image file, but with the `linear-gradient()` function you can also create color transitions.\n`linear-gradient(to right, red, blue)` creates a background that transitions from red to blue, left to right.",
    example: `.kutu {\n  background-image: linear-gradient(to right, red, blue);\n}`,
    hints: [
      "Select the .kutu class.",
      "Give background-image a linear-gradient(), and also add height.",
      ".kutu { background-image: linear-gradient(to right, #6366f1, #ec4899); height: 100px; }",
    ],
    challenge: "Add background-image: linear-gradient(to right, #6366f1, #ec4899) and height: 100px to the .kutu class.",
    checks: ["linear-gradient used", "Height is 100px"],
    files: {
      "style.css": `.kutu {\n  /* TODO: add gradient and height */\n}`,
    },
  },
  "css-42": {
    title: "opacity and rgba",
    description: "Use opacity and rgba() for transparency.",
    explanation:
      "`opacity` sets the transparency of an entire element (including its content) between 0 and 1.\n`rgba(r, g, b, a)`, on the other hand, only sets the transparency of the color itself; the content isn't affected. The `a` value ranges from 0 (invisible) to 1 (opaque).",
    example: `.kutu {\n  background-color: rgba(99, 102, 241, 0.5);\n  opacity: 0.9;\n}`,
    hints: [
      "Select the .kutu class.",
      "Use rgba() for background-color.",
      ".kutu { background-color: rgba(99, 102, 241, 0.5); opacity: 0.9; }",
    ],
    challenge: "Add background-color: rgba(99, 102, 241, 0.5) and opacity: 0.9 to the .kutu class.",
    checks: ["Background is semi-transparent", "Opacity is 0.9"],
    files: {
      "style.css": `.kutu {\n  padding: 16px;\n  /* TODO: add rgba and opacity */\n}`,
    },
  },
  "css-43": {
    title: "box-shadow",
    description: "Add shadows to elements.",
    explanation:
      "`box-shadow` adds a shadow around an element. Order: horizontal offset, vertical offset, blur, color.\nFor example, `box-shadow: 0 4px 8px rgba(0,0,0,0.3);` gives the element a subtle shadow below it.",
    example: `.kart {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n}`,
    hints: [
      "Select the .kart class.",
      "Add box-shadow and background-color properties.",
      ".kart { box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); background-color: white; }",
    ],
    challenge: "Add box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) and background-color: white to the .kart class.",
    checks: ["Shadow exists", "Background is white"],
    files: {
      "style.css": `.kart {\n  padding: 20px;\n  /* TODO: add box-shadow and background */\n}`,
    },
  },
  "css-44": {
    title: "overflow and text-overflow",
    description: "Control overflowing content.",
    explanation:
      "`overflow: hidden` hides content that overflows a box's size.\n`text-overflow: ellipsis`, when used with `white-space: nowrap`, adds \"...\" at the end of overflowing text.",
    example: `.kutu {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}`,
    hints: [
      "Select the .kutu class and use a small width value.",
      "Add overflow: hidden and white-space: nowrap.",
      ".kutu { width: 120px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }",
    ],
    challenge: "Add width: 120px, overflow: hidden, white-space: nowrap, and text-overflow: ellipsis to the .kutu class.",
    checks: ["overflow is hidden", "text-overflow is ellipsis"],
    files: {
      "style.css": `/* TODO: add overflow settings */`,
    },
  },
  "css-45": {
    title: "Unit types: px, %, em, rem, vh/vw",
    description: "Get to know and use different CSS units.",
    explanation:
      "`px` is a fixed pixel unit. `%` gives a ratio relative to the parent element. `em` is relative to the parent's font size, while `rem` is relative to the root (html) element's font size.\n`vh`/`vw` are percentages of the viewport height/width; useful for full-screen sections.",
    example: `.kutu {\n  width: 50%;\n  font-size: 1.5rem;\n  height: 20vh;\n}`,
    hints: [
      "Select the .kutu class.",
      "Use the % unit for width and the rem unit for font-size.",
      ".kutu { width: 50%; font-size: 1.5rem; height: 20vh; }",
    ],
    challenge: "Add width: 50%, font-size: 1.5rem, and height: 20vh to the .kutu class.",
    checks: ["Width is 50 percent", "Font size is 1.5rem"],
    files: {
      "style.css": `/* TODO: size using different units */`,
    },
  },
};
