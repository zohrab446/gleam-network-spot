import type { TrackTranslations } from "../types";

export const PYTHON_A_EN: TrackTranslations = {
  "python-171": {
    title: "Hello Python",
    description: "Print text to the screen with print().",
    explanation:
      "In Python, the `print()` function is used to display something on the screen.\nYou put the text you want to write inside parentheses, between quotation marks.",
    hints: [
      "Use the print() function.",
      "Write the text inside double quotes.",
      `print("Merhaba, CodeQuest!")`,
    ],
    challenge: `Print "Merhaba, CodeQuest!" to the screen.`,
    files: {
      "main.py": `# TODO: print "Merhaba, CodeQuest!" with print()\n`,
    },
    checks: ["Output contains 'Merhaba, CodeQuest!'"],
  },
  "python-172": {
    title: "Comment lines",
    description: "Add notes to your code with #.",
    explanation:
      "In Python, everything after a `#` symbol is considered a comment and is not executed.\nComments are used to explain code and don't affect the program's output.",
    hints: [
      "Add a comment line with the # symbol.",
      "A comment line doesn't affect the print() call.",
      `# Bu satır çalışmaz\nprint("Selam")`,
    ],
    challenge: `Add a comment line (any content) and then print "Selam".`,
    files: {
      "main.py": `# TODO: write a comment line\n# TODO: print "Selam" with print()\n`,
    },
    checks: ["There is a comment line", "Output contains 'Selam'"],
  },
  "python-173": {
    title: "Variables and dynamic types",
    description: "Define a variable and learn its type with type().",
    explanation:
      "In Python, you don't need to specify a type when defining a variable; the type is determined automatically as soon as you assign a value.\nThe `type()` function shows the type of a variable.",
    hints: [
      "Create a variable named name and assign a name to it.",
      "Print its type with type(name).",
      `name = "Ada"\nprint(name)\nprint(type(name))`,
    ],
    challenge: `Assign a name (string) to the variable name, then print name and type(name).`,
    files: {
      "main.py": `# TODO: create the name variable\n# TODO: print name and type(name)\n`,
    },
    checks: ["The name variable is defined", "type() output shows str"],
  },
  "python-174": {
    title: "f-strings",
    description: "Embed variables inside text with an f-string.",
    explanation:
      "An f-string lets you put an `f` before a string and embed values in the text by writing `{variable}` inside it.\nThis is a more readable way than concatenating strings.",
    hints: [
      "Assign a number to a variable named age.",
      "Create a text using an f-string.",
      `age = 15\nprint(f"Yaşım {age}")`,
    ],
    challenge: `Assign a number to the variable age and use an f-string to produce an output like "Yaşım 15".`,
    files: {
      "main.py": `age = 15\n# TODO: print "Yaşım <age>" using an f-string\n`,
    },
    checks: ["An f-string is used", "Output contains 'Yaşım 15'"],
  },
  "python-175": {
    title: "Getting input with input()",
    description: "Read data from the user with input().",
    explanation:
      "The `input()` function reads a line of text from the user and returns it as a string.\nThe text you put inside the parentheses is shown to the user as a prompt.",
    hints: [
      "Read a name with input().",
      "Assign the value you read to a variable.",
      `name = input()\nprint(f"Merhaba {name}")`,
    ],
    challenge: `Input: "Ali". Read a name with input() and print "Merhaba Ali".`,
    files: {
      "main.py": `# TODO: read a name with input()\n# TODO: print "Merhaba <name>"\n`,
    },
    checks: ["input() is used", "Output contains 'Merhaba Ali'"],
  },
  "python-176": {
    title: "Type conversions",
    description: "Convert types with int(), str(), float().",
    explanation:
      "`input()` always returns a string, so you need to convert it with `int()` or `float()` to do numeric operations.\n`str()` converts a number into text.",
    hints: [
      "Convert the value you read with input() into a number using int().",
      "Add 1 to the number and print the result.",
      `age = int(input())\nprint(age + 1)`,
    ],
    challenge: `Input: "17". Read it with input(), convert it to a number with int(), and print the result after adding 1 (18).`,
    files: {
      "main.py": `# TODO: read with input(), convert with int()\n# TODO: add 1 and print\n`,
    },
    checks: ["int() is used", "Output contains 18"],
  },
  "python-177": {
    title: "Arithmetic: // and **",
    description: "Integer division and exponentiation.",
    explanation:
      "The `//` operator gives the integer part of a division (floor division).\nThe `**` operator is used for exponentiation, for example `2 ** 3` equals eight.",
    hints: [
      "Print the result of 17 // 4 using the // operator.",
      "Print the result of 2 ** 5 using the ** operator.",
      `print(17 // 4)\nprint(2 ** 5)`,
    ],
    challenge: `Print the results of 17 // 4 (result 4) and 2 ** 5 (result 32) on separate lines.`,
    files: {
      "main.py": `# TODO: print 17 // 4\n# TODO: print 2 ** 5\n`,
    },
    checks: [
      "The // operator is used",
      "The ** operator is used",
      "Output contains 4",
      "Output contains 32",
    ],
  },
  "python-178": {
    title: "Comparison and logical operators",
    description: "Build conditions with ==, >, and, or.",
    explanation:
      "Comparison operators (`==`, `!=`, `>`, `<`) return a True/False result.\nYou can combine multiple conditions with `and` and `or`.",
    hints: [
      "Assign a number to a variable named age.",
      "Combine two comparisons using the and operator.",
      `age = 20\nprint(age >= 18 and age <= 65)`,
    ],
    challenge: `Assign 20 to the variable age and print the result (True) of the expression age >= 18 and age <= 65.`,
    files: {
      "main.py": `age = 20\n# TODO: print the condition using and\n`,
    },
    checks: ["The and operator is used", "Output contains True"],
  },
  "python-179": {
    title: "if / elif / else",
    description: "Write conditional branching.",
    explanation:
      "`if` runs when a condition is true, `elif` is for additional conditions, and `else` runs if none of them are true.\nIn Python, blocks are defined by indentation (4 spaces).",
    hints: [
      "Assign a number to a variable named n.",
      "Use if/elif/else to distinguish positive, negative, and zero cases.",
      `n = 0\nif n > 0:\n    print("pozitif")\nelif n < 0:\n    print("negatif")\nelse:\n    print("sıfır")`,
    ],
    challenge: `Assign 0 to n. Print "pozitif" if n is positive, "negatif" if negative, "sıfır" if zero (use if/elif/else).`,
    files: {
      "main.py": `n = 0\n# TODO: write if/elif/else\n`,
    },
    checks: ["elif is used", "Output is exactly 'sıfır'"],
  },
  "python-180": {
    title: "One-line conditional",
    description: "Write a conditional expression (ternary).",
    explanation:
      "In Python, you can write a one-line conditional expression in the form `value1 if condition else value2`.\nThis is handy for short if/else cases.",
    hints: [
      "Create a numeric variable named n.",
      "Use a one-line if/else with the condition n % 2 == 0.",
      `n = 7\nresult = "çift" if n % 2 == 0 else "tek"\nprint(result)`,
    ],
    challenge: `Assign 7 to n. Using a one-line conditional, create a variable result that is "çift" if n is even and "tek" if odd, then print it.`,
    files: {
      "main.py": `n = 7\n# TODO: create result with a one-line if/else, then print it\n`,
    },
    checks: ["A one-line if/else is used", "Output contains 'tek'"],
  },
  "python-181": {
    title: "Lists and indexing",
    description: "Create a list and access an element by index.",
    explanation:
      "A list is an ordered collection of data defined with square brackets `[]`.\nElements are accessed by index number like `list[0]`, and indexing starts at 0.",
    hints: [
      "Create a list named fruits.",
      "Access the first element of the list with fruits[0].",
      `fruits = ["elma", "armut", "muz"]\nprint(fruits[1])`,
    ],
    challenge: `Add 3 fruits to the fruits list. Print the second element (index 1).`,
    files: {
      "main.py": `fruits = ["elma", "armut", "muz"]\n# TODO: print fruits[1]\n`,
    },
    checks: ["Indexing is used", "Output contains 'armut'"],
  },
  "python-182": {
    title: "Slicing",
    description: "Get a sub-list with list slicing.",
    explanation:
      "Slicing (`list[start:end]`) takes elements from a given range; `end` is not included.\nIf start or end is left empty, it takes from the beginning/to the end of the list.",
    hints: [
      "Define the nums list.",
      "Take a slice using nums[1:4].",
      `nums = [1, 2, 3, 4, 5]\nprint(nums[1:4])`,
    ],
    challenge: `Create the list nums = [1, 2, 3, 4, 5] and print the slice nums[1:4] ([2, 3, 4]).`,
    files: {
      "main.py": `nums = [1, 2, 3, 4, 5]\n# TODO: print nums[1:4]\n`,
    },
    checks: ["Slicing is used", "Output contains [2, 3, 4]"],
  },
  "python-183": {
    title: "append / pop / insert / remove",
    description: "Add and remove list elements.",
    explanation:
      "`append()` adds an element to the end of a list, `pop()` removes the last element, `insert(i, x)` inserts at a specific position, and `remove(x)` removes by value.\nThese methods modify the list in place.",
    hints: [
      "Add an element to the nums list with append().",
      "Remove an element with remove().",
      `nums = [1, 2, 3]\nnums.append(4)\nnums.remove(2)\nprint(nums)`,
    ],
    challenge: `Add 4 to the list nums = [1, 2, 3] with append(), remove 2 with remove(), then print the result ([1, 3, 4]).`,
    files: {
      "main.py": `nums = [1, 2, 3]\n# TODO: append(4) and remove(2), then print\n`,
    },
    checks: [
      "append() is used",
      "remove() is used",
      "Output contains [1, 3, 4]",
    ],
  },
  "python-184": {
    title: "Tuple",
    description: "Unchangeable ordered data: tuple.",
    explanation:
      "A tuple is a collection defined with parentheses `()` that cannot be changed once created.\nIts elements are accessed by index, just like lists.",
    hints: [
      "Create a tuple named point containing two numbers.",
      "Print point[0] and point[1].",
      `point = (3, 4)\nprint(point[0])\nprint(point[1])`,
    ],
    challenge: `Create the tuple point = (3, 4) and print its two elements on separate lines.`,
    files: {
      "main.py": `point = (3, 4)\n# TODO: print point[0] and point[1]\n`,
    },
    checks: [
      "A tuple is defined",
      "Output contains 3",
      "Output contains 4",
    ],
  },
  "python-185": {
    title: "Set",
    description: "A collection of unique elements: set.",
    explanation:
      "A set is an unordered collection that automatically eliminates duplicate elements.\nIt is defined with curly braces `{}`, and elements are added with `add()`.",
    hints: [
      "Give a list nums containing repeated numbers, then make it unique with set().",
      "Print the number of elements with len().",
      `nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(len(unique))`,
    ],
    challenge: `Convert the list nums = [1, 2, 2, 3, 3, 3] to a set() and print the number of unique elements (3).`,
    files: {
      "main.py": `nums = [1, 2, 2, 3, 3, 3]\n# TODO: convert to set(), print with len()\n`,
    },
    checks: ["set() is used", "Output is exactly 3"],
  },
  "python-186": {
    title: "Dictionary",
    description: "Store data as key-value pairs.",
    explanation:
      "A dictionary stores data in the form `{key: value}`.\nA value is accessed like `dictionary[\"key\"]`.",
    hints: [
      "Create a dictionary named person with name and age keys.",
      "Access a value with person[\"name\"].",
      `person = {"name": "Ada", "age": 15}\nprint(person["age"])`,
    ],
    challenge: `Create the dictionary person = {"name": "Ada", "age": 15} and print the value of person["age"].`,
    files: {
      "main.py": `person = {"name": "Ada", "age": 15}\n# TODO: print person["age"]\n`,
    },
    checks: ["A dictionary value is accessed", "Output contains 15"],
  },
  "python-187": {
    title: "keys / values / items / get",
    description: "Methods for iterating over a dictionary.",
    explanation:
      "`.keys()` gives all keys, `.values()` gives all values, and `.items()` gives both as pairs.\n`.get(key, default)` returns a default value instead of an error if the key doesn't exist.",
    hints: [
      "Define the person dictionary.",
      "Use .get() to provide a default value for a missing key.",
      `person = {"name": "Ada"}\nprint(person.get("age", 0))`,
    ],
    challenge: `Create the dictionary person = {"name": "Ada"} and print a missing key "age" with a default value of 0 using person.get("age", 0).`,
    files: {
      "main.py": `person = {"name": "Ada"}\n# TODO: read "age" with get(), default 0\n`,
    },
    checks: ["get() is used", "Output is exactly 0"],
  },
  "python-188": {
    title: "Nested data structures",
    description: "A list of dictionaries, or a dictionary of lists.",
    explanation:
      "Data structures can be nested: an element of a list can be a dictionary.\nFor nested access, you use square brackets one after another.",
    hints: [
      "Create a list named people that contains dictionaries.",
      "Access the second person's name with people[1][\"name\"].",
      `people = [{"name": "Ada"}, {"name": "Ali"}]\nprint(people[1]["name"])`,
    ],
    challenge: `Create the list people = [{"name": "Ada"}, {"name": "Ali"}] and print the second person's name.`,
    files: {
      "main.py": `people = [{"name": "Ada"}, {"name": "Ali"}]\n# TODO: print the second person's name\n`,
    },
    checks: ["Nested access is used", "Output contains 'Ali'"],
  },
  "python-189": {
    title: "len / min / max / sum",
    description: "Analyze a list with built-in functions.",
    explanation:
      "`len()` gives the number of elements, `min()`/`max()` give the smallest/largest value, and `sum()` gives the total.\nThese functions work directly on lists.",
    hints: [
      "Define the nums list.",
      "Use the max() and sum() functions.",
      `nums = [3, 1, 4, 1, 5]\nprint(max(nums))\nprint(sum(nums))`,
    ],
    challenge: `Print the max() value and sum() total of the list nums = [3, 1, 4, 1, 5] on separate lines.`,
    files: {
      "main.py": `nums = [3, 1, 4, 1, 5]\n# TODO: print max(nums) and sum(nums)\n`,
    },
    checks: [
      "max() is used",
      "sum() is used",
      "Output contains 5",
      "Output contains 14",
    ],
  },
  "python-190": {
    title: "in / not in",
    description: "Check whether an item is in a collection.",
    explanation:
      "The `in` operator checks whether a value exists in a list, string, or dictionary and returns True/False.\n`not in` checks for the opposite.",
    hints: [
      "Define the fruits list.",
      "Check whether an element is in the list with the in operator.",
      `fruits = ["elma", "armut"]\nprint("muz" not in fruits)`,
    ],
    challenge: `Create the list fruits = ["elma", "armut"] and print the result (True) of the expression "muz" not in fruits.`,
    files: {
      "main.py": `fruits = ["elma", "armut"]\n# TODO: print "muz" not in fruits\n`,
    },
    checks: ["not in is used", "Output contains True"],
  },
  "python-191": {
    title: "for loop",
    description: "Loop over a list.",
    explanation:
      "A `for` loop runs sequentially over every element of a collection (list, string, etc.).\nSyntax: `for element in collection:`.",
    hints: [
      "Define a list of numbers named nums.",
      "Print each number with a for loop.",
      `nums = [1, 2, 3]\nfor n in nums:\n    print(n)`,
    ],
    challenge: `Iterate over the list nums = [1, 2, 3] with a for loop and print each number on its own line.`,
    files: {
      "main.py": `nums = [1, 2, 3]\n# TODO: print each number with a for loop\n`,
    },
    checks: ["A for loop is used", "Output is exactly 1, 2, 3 line by line"],
  },
  "python-192": {
    title: "range()",
    description: "Loop over a specific range of numbers.",
    explanation:
      "`range(n)` generates numbers from 0 to n-1, and `range(a, b)` generates numbers from a to b-1.\nIt's commonly used together with a for loop.",
    hints: [
      "Generate numbers from 1 to 5 with range(1, 6).",
      "Print each number with a for loop.",
      `for i in range(1, 6):\n    print(i)`,
    ],
    challenge: `Use range(1, 6) to print the numbers from 1 to 5 on separate lines.`,
    files: {
      "main.py": `# TODO: build a loop with range(1, 6), print each number\n`,
    },
    checks: ["range() is used", "Output is 1 through 5"],
  },
  "python-193": {
    title: "while loop",
    description: "Repeat as long as a condition holds.",
    explanation:
      "A `while` loop repeatedly runs its block as long as the condition is True.\nThere must be something inside that changes the condition so the loop doesn't run forever.",
    hints: [
      "Create a counter variable named n, starting at 0.",
      "Build a loop with the condition while n < 5.",
      `n = 0\nwhile n < 5:\n    print(n)\n    n += 1`,
    ],
    challenge: `Starting from n = 0, print n while n < 5 using a while loop, incrementing n by 1 each time.`,
    files: {
      "main.py": `n = 0\n# TODO: while n < 5 loop, print n, increment n\n`,
    },
    checks: ["A while loop is used", "Output is 0 through 4"],
  },
  "python-194": {
    title: "break / continue",
    description: "Control loop flow.",
    explanation:
      "`break` stops the loop entirely, while `continue` skips the current step and moves to the next iteration.\nThey are usually used together with a condition.",
    hints: [
      "Build a loop with range(10).",
      "Skip even numbers with continue, and stop the loop with break when it reaches 6.",
      `for i in range(10):\n    if i == 6:\n        break\n    if i % 2 == 0:\n        continue\n    print(i)`,
    ],
    challenge: `Build a loop with range(10): skip even numbers with continue, and stop the loop with break when the number reaches 6. You should only print the odd numbers (1, 3, 5).`,
    files: {
      "main.py": `# TODO: range(10) loop, use continue and break\n`,
    },
    checks: [
      "break is used",
      "continue is used",
      "Output is only 1, 3, 5",
    ],
  },
  "python-195": {
    title: "enumerate()",
    description: "Get both the index and the value in a loop.",
    explanation:
      "`enumerate()` gives you both the index and the element itself at the same time while iterating over a collection.\nSyntax: `for i, value in enumerate(collection):`.",
    hints: [
      "Define a list named fruits.",
      "Get both the index and the element with enumerate().",
      `fruits = ["elma", "armut", "muz"]\nfor i, fruit in enumerate(fruits):\n    print(i, fruit)`,
    ],
    challenge: `Iterate over the list fruits = ["elma", "armut", "muz"] with enumerate() and print each line in the format "index element" (e.g. "0 elma").`,
    files: {
      "main.py": `fruits = ["elma", "armut", "muz"]\n# TODO: iterate with enumerate(), print "index element"\n`,
    },
    checks: [
      "enumerate() is used",
      "Output matches the indexes and elements",
    ],
  },
};
