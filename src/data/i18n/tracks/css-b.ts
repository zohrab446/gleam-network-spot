import type { TrackTranslations } from "../types";

export const CSS_B_EN: TrackTranslations = {
  "css-46": {
    title: "position: relative",
    description: "Shift an element relative to its normal flow position.",
    explanation:
      "An element given `position: relative` can be shifted from its normal spot using `top`, `left`, `right`, `bottom`.\nThe element still takes up space in the flow, it just moves visually.",
    hints: [
      "Give the .etiket class a position property.",
      "Set position to relative and shift it with top.",
      ".etiket { position: relative; top: 12px; left: 8px; }",
    ],
    challenge: "Add position: relative, top: 12px and left: 8px to the .etiket class.",
    files: {
      "style.css": `.etiket {\n  background: #6366f1;\n  color: white;\n  padding: 8px;\n  /* TODO: add position */\n}`,
    },
    checks: ["position relative", "top 12px", "left 8px"],
  },
  "css-47": {
    title: "position: absolute",
    description: "Place an element relative to its nearest positioned ancestor.",
    explanation:
      "An element given `position: absolute` is removed from the normal flow and positioned relative to its nearest ancestor with `position: relative` (or absolute/fixed).\nIf there's no such ancestor, it positions relative to the page (body).",
    hints: [
      ".kapsayici is already relative, give .rozet absolute.",
      "Pin it to the corner with top and right values.",
      ".rozet { position: absolute; top: 4px; right: 4px; }",
    ],
    challenge: "Give the .rozet class position: absolute, top: 4px, right: 4px.",
    files: {
      "style.css": `.kapsayici {\n  position: relative;\n  width: 200px;\n  height: 100px;\n  background: #e5e7eb;\n}\n.rozet {\n  background: red;\n  color: white;\n  /* TODO: position it absolutely */\n}`,
    },
    checks: ["position absolute", "top 4px", "right 4px"],
  },
  "css-48": {
    title: "position: fixed / sticky",
    description: "Elements fixed to the screen and elements that stick while scrolling.",
    explanation:
      "`position: fixed` keeps an element locked in place on screen even when the page scrolls (e.g. a top navbar).\n`position: sticky` stays in flow normally, but sticks once it reaches a given point.",
    hints: [
      "Use fixed for .ustmenu, sticky for .yapiskan.",
      "Give both top: 0.",
      ".ustmenu { position: fixed; top: 0; } .yapiskan { position: sticky; top: 0; }",
    ],
    challenge: "Give .ustmenu position: fixed and .yapiskan position: sticky, and add top: 0 to both.",
    files: {
      "style.css": `.ustmenu {\n  background: #111827;\n  color: white;\n  /* TODO: fixed */\n}\n.yapiskan {\n  background: #fbbf24;\n  /* TODO: sticky */\n}`,
    },
    checks: [".ustmenu fixed", ".yapiskan sticky", "top: 0 used"],
  },
  "css-49": {
    title: "z-index",
    description: "Control the stacking order of positioned elements.",
    explanation:
      "When two elements overlap, `z-index` decides which one appears on top.\n`z-index` only works on elements whose `position` is not static (relative, absolute, fixed, sticky).",
    hints: [
      "Give .ust a position: relative so z-index takes effect.",
      "Make the z-index value bigger than .alt's.",
      ".ust { position: relative; z-index: 5; }",
    ],
    challenge: "Give .ust position: relative and z-index: 5 (this must be bigger than .alt's z-index: 1).",
    files: {
      "style.css": `.kapsayici { position: relative; }\n.alt {\n  position: absolute;\n  z-index: 1;\n  background: #ef4444;\n}\n.ust {\n  background: #22c55e;\n  /* TODO: relative + z-index */\n}`,
    },
    checks: [".ust relative", "z-index 5"],
  },
  "css-50": {
    title: "display: flex basics",
    description: "Introduction to flexbox: line elements up side by side.",
    explanation:
      "Giving a container `display: flex` automatically arranges its children side by side in a row.\nThis is the most common way to align cards, menus, and buttons.",
    hints: [
      "Add a display property to the .liste class.",
      "Set the value to flex.",
      ".liste { display: flex; }",
    ],
    challenge: "Give the .liste class display: flex.",
    files: {
      "style.css": `.liste {\n  /* TODO: make it flex */\n  background: #f3f4f6;\n}`,
    },
    checks: ["display flex"],
  },
  "css-51": {
    title: "flex-direction",
    description: "Set the direction of flex items.",
    explanation:
      "`flex-direction` determines the direction of items inside a flex container: `row` (side by side, default) or `column` (stacked).\nThere are also `row-reverse` and `column-reverse`.",
    hints: [
      ".kolon is already flex, add flex-direction.",
      "Set the value to column so items stack.",
      ".kolon { display: flex; flex-direction: column; }",
    ],
    challenge: "Add flex-direction: column to the .kolon class.",
    files: {
      "style.css": `.kolon {\n  display: flex;\n  /* TODO: make it column */\n}`,
    },
    checks: ["flex-direction column"],
  },
  "css-52": {
    title: "justify-content",
    description: "Align items along the main axis.",
    explanation:
      "`justify-content` aligns items in a flex container along the main axis (usually horizontal).\nCommon values: `center`, `space-between`, `space-around`, `flex-end`.",
    hints: [
      ".menu is already flex.",
      "Use justify-content to spread the items out with space between them.",
      ".menu { justify-content: space-between; }",
    ],
    challenge: "Add justify-content: space-between to the .menu class.",
    files: {
      "style.css": `.menu {\n  display: flex;\n  /* TODO: add justify-content */\n}`,
    },
    checks: ["justify-content space-between"],
  },
  "css-53": {
    title: "align-items",
    description: "Align items along the cross axis.",
    explanation:
      "`align-items` aligns items in a flex container along the cross axis (usually vertical).\nThe common value `center` centers content vertically.",
    hints: [
      ".kutu is already flex and has a height.",
      "Use align-items to center the content vertically.",
      ".kutu { align-items: center; }",
    ],
    challenge: "Add align-items: center to the .kutu class.",
    files: {
      "style.css": `.kutu {\n  display: flex;\n  height: 100px;\n  background: #e0e7ff;\n  /* TODO: add align-items */\n}`,
    },
    checks: ["align-items center"],
  },
  "css-54": {
    title: "gap",
    description: "Add space between flex items.",
    explanation:
      "The `gap` property adds equal spacing between flex (or grid) items, so you don't need margin.\nA single value applies to both row and column gaps.",
    hints: [
      ".kartlar is already flex.",
      "Use gap to add spacing between items.",
      ".kartlar { gap: 16px; }",
    ],
    challenge: "Add gap: 16px to the .kartlar class.",
    files: {
      "style.css": `.kartlar {\n  display: flex;\n  /* TODO: add gap */\n}`,
    },
    checks: ["gap 16px"],
  },
  "css-55": {
    title: "flex-wrap",
    description: "Let items that don't fit wrap to the next line.",
    explanation:
      "By default, flex items try to fit on a single line and shrink.\nWith `flex-wrap: wrap`, items that don't fit automatically move to the next line.",
    hints: [
      ".galeri is already flex.",
      "Set flex-wrap to wrap.",
      ".galeri { flex-wrap: wrap; }",
    ],
    challenge: "Add flex-wrap: wrap to the .galeri class.",
    files: {
      "style.css": `.galeri {\n  display: flex;\n  /* TODO: add wrap */\n}\n.galeri div {\n  width: 150px;\n  height: 100px;\n  background: #a5b4fc;\n}`,
    },
    checks: ["flex-wrap wrap"],
  },
  "css-56": {
    title: "flex: 1 / flex-grow",
    description: "Make an element grow to fill available space.",
    explanation:
      "`flex-grow` determines how much a flex item grows to fill empty space; `flex: 1` is shorthand for `flex-grow: 1`.\nThis makes the item fill all remaining space.",
    hints: [
      ".orta is inside a flex container.",
      "Set flex to 1 so it fills the remaining space.",
      ".orta { flex: 1; }",
    ],
    challenge: "Add flex: 1 to the .orta class.",
    files: {
      "style.css": `.satir {\n  display: flex;\n}\n.sol, .sag {\n  width: 50px;\n  background: #d1d5db;\n}\n.orta {\n  background: #93c5fd;\n  /* TODO: add flex: 1 */\n}`,
    },
    checks: ["flex-grow 1"],
  },
  "css-57": {
    title: "display: grid and grid-template-columns",
    description: "Create columns with grid layout.",
    explanation:
      "`display: grid` turns a container into a grid made of rows and columns.\n`grid-template-columns` lets you define how many columns there are and their widths.",
    hints: [
      "Give .izgara display: grid.",
      "Define 3 equal columns with grid-template-columns (e.g. 1fr 1fr 1fr).",
      ".izgara { display: grid; grid-template-columns: 1fr 1fr 1fr; }",
    ],
    challenge: "Add display: grid and grid-template-columns: 1fr 1fr 1fr to the .izgara class.",
    files: {
      "style.css": `.izgara {\n  /* TODO: grid and columns */\n}`,
    },
    checks: ["display grid", "3 equal columns defined"],
  },
  "css-58": {
    title: "grid gap and repeat()",
    description: "Shorten grid columns with repeat().",
    explanation:
      "`repeat(3, 1fr)` is a shortcut for writing `1fr 1fr 1fr`; it specifies a repeat count and a width.\nTo add space between grid items, `gap` is used again.",
    hints: [
      "Use repeat(4, 1fr) for grid-template-columns on .izgara.",
      "Use gap to add 10px spacing between items.",
      ".izgara { grid-template-columns: repeat(4, 1fr); gap: 10px; }",
    ],
    challenge: "Use grid-template-columns: repeat(4, 1fr) and gap: 10px on the .izgara class.",
    files: {
      "style.css": `.izgara {\n  display: grid;\n  /* TODO: repeat and gap */\n}`,
    },
    checks: ["repeat(4, 1fr) used", "gap 10px"],
  },
  "css-59": {
    title: "grid-column span",
    description: "Make an element span multiple columns.",
    explanation:
      "`grid-column: span 2` makes a grid item take up 2 columns of width instead of the usual 1.\nThis is used to make a highlighted card bigger.",
    hints: [
      ".oncikan is inside the grid, add grid-column.",
      "Use span 2 so it spans 2 columns.",
      ".oncikan { grid-column: span 2; }",
    ],
    challenge: "Add grid-column: span 2 to the .oncikan class.",
    files: {
      "style.css": `.izgara {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n}\n.oncikan {\n  background: #fde68a;\n  /* TODO: span 2 */\n}`,
    },
    checks: ["grid-column: span 2"],
  },
  "css-60": {
    title: "grid-template-areas",
    description: "Build a page layout by naming areas.",
    explanation:
      "With `grid-template-areas`, you can name grid cells and draw a text-based map (e.g. header, sidebar, content).\nEach item is assigned to an area using `grid-area`.",
    hints: [
      "Add grid-template-areas to .sayfa: header full-width on top, sidebar and content below.",
      "Give each child element its name with grid-area (header, sidebar, content).",
      '.sayfa { grid-template-areas: "header header" "sidebar content"; }',
    ],
    challenge: 'Define the "header header" / "sidebar content" layout on the .sayfa class with grid-template-areas, and set grid-area on the .baslik, .yan, .icerik elements.',
    files: {
      "style.css": `.sayfa {\n  display: grid;\n  grid-template-columns: 1fr 3fr;\n  /* TODO: grid-template-areas */\n}\n.baslik { /* TODO */ }\n.yan { /* TODO */ }\n.icerik { /* TODO */ }`,
    },
    checks: ["grid-template-areas correctly defined", ".baslik grid-area: header", ".yan grid-area: sidebar"],
  },
  "css-61": {
    title: "transition",
    description: "Smooth out changes.",
    explanation:
      "`transition` makes a CSS property change happen smoothly over time instead of instantly.\nFor example, you can smooth a color change on `:hover`.",
    hints: [
      "Add a transition property to the .buton class.",
      "Make the background property transition over 0.3 seconds.",
      ".buton { transition: background 0.3s; }",
    ],
    challenge: "Add transition: background 0.3s to the .buton class.",
    files: {
      "style.css": `.buton {\n  background: #6366f1;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  /* TODO: add transition */\n}\n.buton:hover {\n  background: #4338ca;\n}`,
    },
    checks: ["transition: background 0.3s"],
  },
  "css-62": {
    title: "transform: translate/rotate/scale",
    description: "Move, rotate, and scale elements.",
    explanation:
      "The `transform` property lets you move an element without disrupting the flow: `translate()` moves it, `rotate()` rotates it, `scale()` grows/shrinks it.\nYou can combine multiple ones separated by spaces.",
    hints: [
      "Add a transform property to the .kart class.",
      "Use rotate(5deg) and scale(1.05) together.",
      ".kart { transform: rotate(5deg) scale(1.05); }",
    ],
    challenge: "Add transform: rotate(5deg) scale(1.05) to the .kart class.",
    files: {
      "style.css": `.kart {\n  background: #34d399;\n  padding: 20px;\n  /* TODO: add transform */\n}`,
    },
    checks: ["transform correctly defined"],
  },
  "css-63": {
    title: "@keyframes and animation",
    description: "Define your own animation.",
    explanation:
      "`@keyframes` lets you define the steps of an animation (from/to or percentages).\nThen you apply that animation to an element with the `animation` property.",
    hints: [
      "Define an animation named 'buyu' with @keyframes (from scale(1), to scale(1.2)).",
      "Bind this animation to the .rozet class with the animation property.",
      "@keyframes buyu { from { transform: scale(1); } to { transform: scale(1.2); } } .rozet { animation: buyu 1s infinite; }",
    ],
    challenge: "Define an animation named buyu with @keyframes (from scale(1) - to scale(1.2)) and add animation: buyu 1s infinite to the .rozet class.",
    files: {
      "style.css": `/* TODO: define @keyframes buyu */\n.rozet {\n  display: inline-block;\n  /* TODO: add animation */\n}`,
    },
    checks: ["@keyframes buyu defined", "animation: buyu 1s infinite"],
  },
  "css-64": {
    title: "animation properties",
    description: "Set duration, repeat count, and timing curve.",
    explanation:
      "`animation-duration` sets the length, `animation-iteration-count` sets how many times it repeats, and `animation-timing-function` sets the easing curve.\nYou can write these individually or combine them with the `animation` shorthand.",
    hints: [
      "Define @keyframes don with transform: rotate(0deg) -> rotate(360deg).",
      "Add animation-name, animation-duration, animation-iteration-count, and animation-timing-function to the .cark class.",
      "animation-name: don; animation-duration: 2s; animation-iteration-count: infinite; animation-timing-function: linear;",
    ],
    challenge: "Define @keyframes don (from rotate(0deg), to rotate(360deg)) and add animation-name: don, animation-duration: 2s, animation-iteration-count: infinite, animation-timing-function: linear to the .cark class.",
    files: {
      "style.css": `/* TODO: @keyframes don */\n.cark {\n  display: inline-block;\n  font-size: 40px;\n  /* TODO: animation properties */\n}`,
    },
    checks: ["@keyframes don correct", "animation-duration 2s", "animation-iteration-count infinite", "animation-timing-function linear"],
  },
  "css-65": {
    title: "@media queries",
    description: "Change styles based on screen width.",
    explanation:
      "`@media` queries let you apply different CSS rules based on conditions like screen width.\nRules inside `@media (max-width: 600px) { ... }` only apply when the screen is 600px wide or narrower.",
    hints: [
      "Set a normal font-size for .baslik.",
      "Inside @media (max-width: 600px), define a smaller font-size for .baslik.",
      "@media (max-width: 600px) { .baslik { font-size: 16px; } }",
    ],
    challenge: "Make the .baslik class's normal font-size 24px; inside @media (max-width: 600px), change it to font-size: 16px.",
    files: {
      "style.css": `.baslik {\n  font-size: 24px;\n}\n/* TODO: shrink font-size inside @media (max-width: 600px) */`,
    },
    checks: ["font-size 24px normally", "font-size 16px inside @media"],
  },
  "css-66": {
    title: "Single-column mobile card",
    description: "Stack cards on a small screen.",
    explanation:
      "You can arrange cards side by side (row) on a wide screen, then use `@media` with `flex-direction: column` to stack them on a narrow screen.\nThis is one of the most basic responsive design tricks.",
    hints: [
      "Make .kartlar flex-direction: row on wide screens.",
      "Inside @media (max-width: 600px), define flex-direction: column for .kartlar.",
      "@media (max-width: 600px) { .kartlar { flex-direction: column; } }",
    ],
    challenge: "Make the .kartlar class flex-direction: row normally; inside @media (max-width: 600px), make it flex-direction: column.",
    files: {
      "style.css": `.kartlar {\n  display: flex;\n  flex-direction: row;\n}\n/* TODO: use @media to make it column on small screens */`,
    },
    checks: ["row normally", "flex-direction: column inside @media"],
  },
  "css-67": {
    title: "CSS variables",
    description: "Store repeated values in a variable.",
    explanation:
      "CSS variables are defined as `--name: value;` and used with `var(--name)`.\nYou can define a color once and use it in many places; when you want to change it, you only change it in one spot.",
    hints: [
      "Define a variable named --vurgu inside the .kutu class.",
      "Use var(--vurgu) in the background property.",
      ".kutu { --vurgu: #f43f5e; background: var(--vurgu); }",
    ],
    challenge: "Define the variable --vurgu: #f43f5e inside the .kutu class and use it with background: var(--vurgu).",
    files: {
      "style.css": `.kutu {\n  padding: 20px;\n  /* TODO: define and use the --vurgu variable */\n}`,
    },
    checks: ["--vurgu variable defined", "var(--vurgu) used"],
  },
  "css-68": {
    title: ":root and theme variables",
    description: "Define theme variables for the whole page.",
    explanation:
      "The `:root` selector represents the whole document; variables defined here can be used anywhere with `var()`.\nThis is the standard way to build a consistent theme (color palette, spacing).",
    hints: [
      "Define the --ana-renk and --arka-plan variables inside :root.",
      "Use these variables with var() in the .sayfa class.",
      ":root { --ana-renk: #6366f1; --arka-plan: #f9fafb; } .sayfa { color: var(--ana-renk); background: var(--arka-plan); }",
    ],
    challenge: "Define --ana-renk: #6366f1 and --arka-plan: #f9fafb inside :root; use color: var(--ana-renk) and background: var(--arka-plan) in the .sayfa class.",
    files: {
      "style.css": `/* TODO: define the variables inside :root */\n.sayfa {\n  padding: 20px;\n  /* TODO: use the variables */\n}`,
    },
    checks: ["variables defined inside :root", ".sayfa uses the variables"],
  },
  "css-69": {
    title: "Responsive image",
    description: "Fit images to their container.",
    explanation:
      "`max-width: 100%` prevents an image from overflowing its container; the image shrinks as the screen gets smaller.\n`object-fit: cover` makes the image fill the area without distorting its aspect ratio.",
    hints: [
      "Add max-width: 100% to .foto so it doesn't overflow.",
      "Keep height fixed, and use object-fit: cover to preserve the aspect ratio.",
      ".foto { max-width: 100%; height: 200px; object-fit: cover; }",
    ],
    challenge: "Add max-width: 100%, height: 200px, and object-fit: cover to the .foto class.",
    files: {
      "style.css": `.kapsayici {\n  width: 300px;\n}\n.foto {\n  /* TODO: responsive image */\n}`,
    },
    checks: ["max-width 100%", "height 200px", "object-fit cover"],
  },
  "css-70": {
    title: "Final: card component",
    description: "Combine what you've learned to design a real card.",
    explanation:
      "You'll combine flexbox, shadows, rounded corners, and transitions you've learned so far to build a real product card.\nThis is a component you'll encounter very often in real projects.",
    hints: [
      "Make .kart display: flex, flex-direction: column; add border-radius: 12px and a box-shadow.",
      "Add transition: transform 0.2s, and define transform: scale(1.03) inside :hover.",
      ".kart { display: flex; flex-direction: column; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; } .kart:hover { transform: scale(1.03); }",
    ],
    challenge: "Add display: flex, flex-direction: column, border-radius: 12px, box-shadow, and transition: transform 0.2s to the .kart class; define transform: scale(1.03) inside .kart:hover.",
    files: {
      "style.css": `.kart {\n  padding: 16px;\n  background: white;\n  /* TODO: flex + radius + shadow + transition */\n}\n/* TODO: .kart:hover */`,
    },
    checks: ["display flex", "flex-direction column", "border-radius 12px", ".kart:hover transform scale(1.03)"],
  },
};
