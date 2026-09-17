import type { TrackTranslations } from "../types";

export const PYTHON_B_EN: TrackTranslations = {
  "python-196": {
    title: "Pair up with zip()",
    description: "Loop through two lists in parallel with zip().",
    explanation:
      "The `zip()` function pairs up multiple lists side by side and produces tuples.\nFor example, you can loop through a names list and an ages list together with `zip(names, ages)`.",
    hints: [
      "Use zip(a, b) inside a for loop.",
      "Take the loop variables as two names, like n and p.",
      'for n, p in zip(names, points):\\n    print(n, p)',
    ],
    challenge:
      "Pair up the lists names = ['Ali', 'Ayse', 'Deniz'] and points = [80, 90, 70] with zip() and print each line as 'name score'.",
    files: {
      "main.py": `names = ["Ali", "Ayse", "Deniz"]\npoints = [80, 90, 70]\n# TODO: pair them up with zip and print\n`,
    },
    checks: ["zip() was used", "Output contains 'Ali 80'", "Output contains 'Deniz 70'"],
  },
  "python-197": {
    title: "List comprehension",
    description: "Build a list in a single line.",
    explanation:
      "A list comprehension is a short way to build a list in a single line.\nIt is written as `[expression for x in list]` and is equivalent to a normal for loop.",
    hints: [
      "Write the expression and for inside square brackets.",
      "Use the expression n * 2.",
      "doubled = [n * 2 for n in numbers]",
    ],
    challenge:
      "Build the list doubled, containing double each number in numbers = [1, 2, 3, 4, 5], using a comprehension, then print(doubled).",
    files: {
      "main.py": `numbers = [1, 2, 3, 4, 5]\n# TODO: build the doubled list using a comprehension\n`,
    },
    checks: ["List comprehension was used", "Output is correct"],
  },
  "python-198": {
    title: "Conditional list comprehension",
    description: "Build a filtered list with if.",
    explanation:
      "You can add an `if` condition inside a list comprehension to only select the elements you want.\nIt is written as `[expression for x in list if condition]`.",
    hints: [
      "Add an if condition at the end of the comprehension.",
      "Use n % 2 == 0 to select even numbers.",
      "evens = [n for n in numbers if n % 2 == 0]",
    ],
    challenge:
      "Build a list evens containing only the even numbers from numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], then print(evens).",
    files: {
      "main.py": `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# TODO: build the evens list\n`,
    },
    checks: ["Conditional filter is present", "Output is correct"],
  },
  "python-199": {
    title: "Dict comprehension",
    description: "Build a dictionary in a single line.",
    explanation:
      "A dict comprehension builds dictionaries in a single line.\nIt is written as `{key: value for x in list}`.",
    hints: [
      "Use curly braces: {key: value for ...}.",
      "Let the key be n and the value be n * n.",
      "squares = {n: n * n for n in numbers}",
    ],
    challenge:
      "Build a dictionary squares mapping each number to its square from numbers = [1, 2, 3, 4] using a dict comprehension, then print(squares).",
    files: {
      "main.py": `numbers = [1, 2, 3, 4]\n# TODO: build the squares dictionary\n`,
    },
    checks: ["Dict comprehension was used", "Output is correct"],
  },
  "python-200": {
    title: "sorted() and key",
    description: "Sort a list by a custom criterion.",
    explanation:
      "The `sorted()` function returns a sorted version of a list. The `key` parameter lets you customize the sorting criterion.\nFor example, you can sort by string length with `key=len`.",
    hints: [
      "Use sorted(list, key=...).",
      "Sort by a dictionary key using a lambda.",
      "sorted(students, key=lambda s: s['score'])",
    ],
    challenge:
      "Sort students = [{'name': 'Ali', 'score': 70}, {'name': 'Ayse', 'score': 90}, {'name': 'Deniz', 'score': 60}] by score from smallest to largest, and print each name on a separate line.",
    files: {
      "main.py": `students = [\n    {"name": "Ali", "score": 70},\n    {"name": "Ayse", "score": 90},\n    {"name": "Deniz", "score": 60},\n]\n# TODO: sort by score and print the names\n`,
    },
    checks: ["sorted() was used with key", "Sorting is correct"],
  },
  "python-201": {
    title: "def / return",
    description: "Write your own function.",
    explanation:
      "A function is defined with `def`, and `return` sends a value back.\nFunctions let you gather repeated code in one place.",
    hints: [
      "Start with def function_name(parameter):.",
      "Return the sum inside with return.",
      "def add(a, b):\\n    return a + b",
    ],
    challenge:
      "Write a function add(a, b) that takes parameters a and b, return their sum, and call it with print(add(3, 5)).",
    files: {
      "main.py": `# TODO: define the add function\n\nprint(add(3, 5))\n`,
    },
    checks: ["add function is defined", "Output is 8"],
  },
  "python-202": {
    title: "Default arguments",
    description: "Give parameters a default value.",
    explanation:
      "Function parameters can be assigned a default value; if that parameter isn't provided at the call site, the default is used.\nIt is defined like `def greet(name, greeting=\"Merhaba\")`.",
    hints: [
      "Give the second parameter a default value with =.",
      "Let the default value of the greeting parameter be 'Merhaba'.",
      'def greet(name, greeting="Merhaba"):\\n    return f"{greeting}, {name}!"',
    ],
    challenge:
      "Write a greet function that takes name and a greeting parameter defaulting to 'Merhaba'. Call print(greet('Ali')) and print(greet('Ayse', 'Selam')).",
    files: {
      "main.py": `# TODO: define the greet function ('Merhaba' as the default greeting)\n\nprint(greet("Ali"))\nprint(greet("Ayse", "Selam"))\n`,
    },
    checks: ["Default value is defined", "Output is correct"],
  },
  "python-203": {
    title: "Positional/keyword arguments",
    description: "Call a function with keyword arguments.",
    explanation:
      "Functions can be called positionally, or with keyword arguments in the form `name=value`.\nKeyword arguments make order irrelevant and make code more readable.",
    hints: [
      "Call the function using name= and age=.",
      "Order doesn't matter, just write the names correctly.",
      'print(describe(age=15, city="Ankara", name="Deniz"))',
    ],
    challenge:
      "Write a function describe(name, age, city) that takes name, age, city parameters (it should return f\"{name}, {age}, {city}\") and call it with keyword arguments in a shuffled order: describe(age=15, city='Ankara', name='Deniz').",
    files: {
      "main.py": `# TODO: define the describe function\n\nprint(describe(age=15, city="Ankara", name="Deniz"))\n`,
    },
    checks: ["describe function is defined", "Output is correct"],
  },
  "python-204": {
    title: "*args",
    description: "Accept a variable number of arguments.",
    explanation:
      "`*args` lets you pass as many positional arguments as you like to a function; inside the function it arrives as a tuple.\nFor example, inside `def total(*args)` you can sum up the elements of the `args` tuple.",
    hints: [
      "Use *numbers as the parameter.",
      "Sum args using the sum() function.",
      "def total(*numbers):\\n    return sum(numbers)",
    ],
    challenge:
      "Write a total function that takes a variable number of arguments as *numbers, return their sum, and call print(total(1, 2, 3, 4)).",
    files: {
      "main.py": `# TODO: define the total function taking *numbers\n\nprint(total(1, 2, 3, 4))\n`,
    },
    checks: ["*args was used", "Output is 10"],
  },
  "python-205": {
    title: "**kwargs",
    description: "Accept a variable number of keyword arguments.",
    explanation:
      "`**kwargs` lets you pass as many keyword arguments as you like to a function; inside the function it arrives as a dictionary.\nIt can be traversed with `.items()` like a dictionary.",
    hints: [
      "Use **kwargs as the parameter.",
      "Traverse it with for key, value in kwargs.items():.",
      'def show(**kwargs):\\n    for k, v in kwargs.items():\\n        print(f"{k}: {v}")',
    ],
    challenge:
      "Write a show function taking **kwargs; it should print each key-value pair as 'key: value'. Call it with show(name='Ali', age=17).",
    files: {
      "main.py": `# TODO: define the show function taking **kwargs\n\nshow(name="Ali", age=17)\n`,
    },
    checks: ["**kwargs was used", "Output is correct"],
  },
  "python-206": {
    title: "lambda",
    description: "Write an anonymous function.",
    explanation:
      "`lambda` lets you create small, single-line, unnamed functions.\nIt is written as `lambda parameters: expression` and can be assigned to a variable or used directly.",
    hints: [
      "Write it as lambda x, y: ....",
      "Define a lambda that multiplies two numbers.",
      "multiply = lambda a, b: a * b",
    ],
    challenge:
      "Define a lambda named multiply that multiplies two numbers, then call print(multiply(4, 5)).",
    files: {
      "main.py": `# TODO: define the multiply lambda\n\nprint(multiply(4, 5))\n`,
    },
    checks: ["lambda was used", "Output is 20"],
  },
  "python-207": {
    title: "map/filter",
    description: "Transform a list with map and filter.",
    explanation:
      "`map(function, list)` applies the function to every element, and `filter(function, list)` keeps only the ones satisfying the condition.\nBoth need to be converted to a list with `list()`.",
    hints: [
      "Multiply each number by 2 with map, convert it to a list with list().",
      "Select even numbers with filter, convert it to a list with list().",
      "evens = list(filter(lambda n: n % 2 == 0, numbers))",
    ],
    challenge:
      "From numbers = [1, 2, 3, 4, 5, 6], build the list doubled (double of each number) using map and the list evens (even numbers) using filter, and print both.",
    files: {
      "main.py": `numbers = [1, 2, 3, 4, 5, 6]\n# TODO: build the doubled and evens lists\n`,
    },
    checks: ["map() was used", "filter() was used", "Output is correct"],
  },
  "python-208": {
    title: "Scope rules",
    description: "global and local variables.",
    explanation:
      "Variables defined inside a function are local; they can't escape the function.\nTo modify a global variable from inside a function, use the `global` keyword.",
    hints: [
      "Write global count inside the function.",
      "Increase it with count += 1.",
      "def increase():\\n    global count\\n    count += 1",
    ],
    challenge:
      "Define the global variable count = 0. Have the increase() function increase the global count by 1. Call increase() 3 times and print(count) (the result should be 3).",
    files: {
      "main.py": `count = 0\n\n# TODO: define the increase function (use global count)\n\nincrease()\nincrease()\nincrease()\nprint(count)\n`,
    },
    checks: ["global count was used", "Output is 3"],
  },
  "python-209": {
    title: "Module import",
    description: "Use the math and random modules.",
    explanation:
      "`import math` gives access to mathematical functions (like sqrt, pi).\n`import random` is used to generate random numbers; `random.seed(n)` lets you reproduce the same 'random' result again (making it testable).",
    hints: [
      "Add import math and import random.",
      "Call random.seed(42), then use random.randint(1, 100).",
      "Take the square root with math.sqrt(64).",
    ],
    challenge:
      "Import the math and random modules. Write print(math.sqrt(64)). Call random.seed(42) and write print(random.randint(1, 100)).",
    files: {
      "main.py": `# TODO: import math and random\n\n# TODO: print math.sqrt(64)\n\n# TODO: call random.seed(42) and print random.randint(1, 100)\n`,
    },
    checks: ["math was imported", "random was imported", "Output contains 8.0"],
  },
  "python-210": {
    title: "try/except/finally",
    description: "Catch and manage errors.",
    explanation:
      "Code that has a risk of failing is run inside a `try` block; if an error occurs, the `except` block takes over.\nThe `finally` block always runs, whether an error occurred or not.",
    hints: [
      "Put the division operation inside try.",
      "Add an except ZeroDivisionError: block.",
      "Print 'Islem tamamlandi' in the finally block.",
    ],
    challenge:
      "Perform 10 / 0 inside try, catch ZeroDivisionError and print 'Sifira bolme hatasi!', then print 'Islem tamamlandi' in the finally block.",
    files: {
      "main.py": `# TODO: write try/except/finally\n`,
    },
    checks: ["ZeroDivisionError was caught", "finally block is present", "Output is correct"],
  },
  "python-211": {
    title: "class and object",
    description: "Define your first class.",
    explanation:
      "The `class` keyword is used to define a new class. An object (instance) is created from a class with `ClassName()`.\nClasses let you keep data and behavior together.",
    hints: [
      "Start with class Student:, write pass inside.",
      "Create an object with Student().",
      "student = Student()\\nprint('Nesne olusturuldu')",
    ],
    challenge:
      "Define an empty class named Student (use pass). Create an object (student = Student()) and write print('Nesne olusturuldu').",
    files: {
      "main.py": `# TODO: define the Student class\n\n# TODO: create an object and print\n`,
    },
    checks: ["class is defined", "Output is correct"],
  },
  "python-212": {
    title: "__init__ and self",
    description: "Give an object initial values.",
    explanation:
      "The `__init__` method runs automatically when an object is created and sets up initial values.\nThe `self` parameter represents the object that is currently being created.",
    hints: [
      "Define __init__(self, name, age).",
      "Write self.name = name and self.age = age.",
      'def __init__(self, name, age):\\n    self.name = name\\n    self.age = age',
    ],
    challenge:
      "Add an __init__ method to the Student class that takes name and age (assign self.name, self.age). Create student = Student('Ali', 17), write print(student.name, student.age).",
    files: {
      "main.py": `class Student:\n    # TODO: add the __init__ method\n    pass\n\nstudent = Student("Ali", 17)\nprint(student.name, student.age)\n`,
    },
    checks: ["__init__ is defined", "Output is correct"],
  },
  "python-213": {
    title: "Method and attribute",
    description: "Add behavior to a class.",
    explanation:
      "Functions inside a class are called methods, and their first parameter is always `self`.\nMethods can perform operations using the object's attributes (like self.x).",
    hints: [
      "Define a method named greet, use self.",
      "Return a string inside the method using self.name.",
      'def greet(self):\\n    return f"Merhaba, ben {self.name}"',
    ],
    challenge:
      "Add an __init__ taking name and a greet(self) method to the Student class. greet should return 'Merhaba, ben {name}'. Create student = Student('Ayse'); write print(student.greet()).",
    files: {
      "main.py": `class Student:\n    def __init__(self, name):\n        self.name = name\n\n    # TODO: add the greet method\n\nstudent = Student("Ayse")\nprint(student.greet())\n`,
    },
    checks: ["greet method is defined", "Output is correct"],
  },
  "python-214": {
    title: "Inheritance",
    description: "Inherit from a class.",
    explanation:
      "A class can inherit properties and methods from another class: `class Child(Parent):`.\nThis lets you reuse common behavior without rewriting it.",
    hints: [
      "Inherit like class Student(Person):.",
      "Person's __init__ already sets name; Student doesn't need to add anything extra.",
      "student = Student('Ali')\\nprint(student.name)",
    ],
    challenge:
      "Assume the Person class is already defined with an __init__ taking name. Define a Student class that inherits from Person (without adding extra code). Create student = Student('Ali'), write print(student.name).",
    files: {
      "main.py": `class Person:\n    def __init__(self, name):\n        self.name = name\n\n# TODO: define the Student class inheriting from Person\n\nstudent = Student("Ali")\nprint(student.name)\n`,
    },
    checks: ["Student inherits from Person", "Output is correct"],
  },
  "python-215": {
    title: "Method overriding and super()",
    description: "Redefine an inherited method.",
    explanation:
      "A subclass can redefine a method from the parent class (override).\nWith `super()` you can access the parent class's method and extend it.",
    hints: [
      "Override __init__ in the Student class.",
      "Call Person's __init__ with super().__init__(name).",
      "def __init__(self, name, school):\\n    super().__init__(name)\\n    self.school = school",
    ],
    challenge:
      "Assume the Person class is already defined with an __init__ taking name. Write a Student class inheriting from Person; define __init__(self, name, school), call super().__init__(name), and assign self.school = school. Create student = Student('Ali', 'Lise'); write print(student.name, student.school).",
    files: {
      "main.py": `class Person:\n    def __init__(self, name):\n        self.name = name\n\n# TODO: define the Student class (use super())\n\nstudent = Student("Ali", "Lise")\nprint(student.name, student.school)\n`,
    },
    checks: ["super() was used", "Output is correct"],
  },
  "python-216": {
    title: "String methods",
    description: "upper, split, join, replace, strip.",
    explanation:
      "Strings have many built-in methods: `.upper()` converts to uppercase, `.split()` breaks into parts, `.join()` joins, `.replace()` replaces, `.strip()` removes whitespace.\nThese methods don't modify the original string, they return a new string.",
    hints: [
      "Remove leading/trailing whitespace with strip().",
      "Split by ',' with split(','), then join by putting '-' with join.",
      "'-'.join(word.strip().upper() for word in text.split(','))",
    ],
    challenge:
      "Clean the variable text = '  elma, armut, kivi  ' with strip(), split it by ',', apply strip+upper to each part and join with '-', then print it. The result should be 'ELMA-ARMUT-KIVI'.",
    files: {
      "main.py": `text = "  elma, armut, kivi  "\n# TODO: clean, split, convert to uppercase, join with '-' and print\n`,
    },
    checks: ["split() was used", "join() was used", "Output is correct"],
  },
  "python-217": {
    title: "Writing and reading files",
    description: "Write to and read from a file with with open().",
    explanation:
      "`with open(file, \"w\") as f:` opens a file in write mode, `f.write(...)` writes into it.\n`with open(file, \"r\") as f:` opens it in read mode; the file is automatically closed when the `with` block ends.",
    hints: [
      "First open the file in 'w' mode and write to it.",
      "Then reopen it in 'r' mode and read it with read().",
      'with open("notes.txt", "w") as f:\\n    f.write("Merhaba Dunya")',
    ],
    challenge:
      "Write 'Merhaba Dunya' to the file 'notes.txt' (using with open in 'w' mode), then reopen the same file in 'r' mode, read its content and print it.",
    files: {
      "main.py": `# TODO: write to notes.txt, then read and print it\n`,
    },
    checks: ["with open() was used", "write() was used", "Output is correct"],
  },
  "python-218": {
    title: "JSON",
    description: "Use json.dumps and json.loads.",
    explanation:
      "The `json` module converts between Python objects and JSON text.\n`json.dumps(obj)` converts a Python object into a JSON string, `json.loads(text)` converts a JSON string back into a Python object.",
    hints: [
      "Add import json.",
      "Convert the dictionary to a string with json.dumps().",
      'Get the value with json.loads(text)["age"].',
    ],
    challenge:
      "Import the json module. Convert data = {'name': 'Ali', 'age': 17} into the text variable with json.dumps and print it. Then convert it back to parsed with json.loads(text) and write print(parsed['age']).",
    files: {
      "main.py": `# TODO: import json\n\ndata = {"name": "Ali", "age": 17}\n# TODO: print it with dumps, convert it back with loads and print age\n`,
    },
    checks: ["json was imported", "json.dumps was used", "json.loads was used", "Output contains 17"],
  },
  "python-219": {
    title: "Regex",
    description: "Use re.findall and re.sub.",
    explanation:
      "The `re` module performs text search/replace using regular expressions (regex).\n`re.findall(pattern, text)` returns all matches of the pattern as a list, `re.sub(pattern, new, text)` replaces the matches.",
    hints: [
      "Add import re.",
      'Find numbers with the pattern r"\\d+".',
      're.sub(r"\\d+", "*", text) turns numbers into *.',
    ],
    challenge:
      "Import the re module. Find all the numbers in text = 'Ali 17, Ayse 16, Deniz 15' with re.findall and print them. Then replace the numbers with '*' using re.sub and print the result.",
    files: {
      "main.py": `# TODO: import re\n\ntext = "Ali 17, Ayse 16, Deniz 15"\n# TODO: find the numbers with findall and print them\n# TODO: turn the numbers into '*' with sub and print\n`,
    },
    checks: ["re was imported", "re.findall was used", "re.sub was used", "Output is correct"],
  },
  "python-220": {
    title: "Final: Student grade tracking class",
    description: "Write a class that calculates an average.",
    explanation:
      "You'll combine everything you've learned so far about classes, __init__, methods, and lists to write a real application.\nDesign a class that keeps track of a student's grades and calculates their average.",
    hints: [
      "Initialize self.grades = [] inside __init__(self, name).",
      "In add_grade(self, grade), do self.grades.append(grade).",
      "average(self) should return sum(self.grades) / len(self.grades).",
    ],
    challenge:
      "Write a Student class: __init__(self, name) sets name and an empty grades list; add_grade(self, grade) adds a grade; average(self) returns the average of the grades. Create student = Student('Ali'), add the grades 80, 90, 70, write print(student.average()) (the result should be 80.0).",
    files: {
      "main.py": `# TODO: define the Student class (__init__, add_grade, average)\n\nstudent = Student("Ali")\nstudent.add_grade(80)\nstudent.add_grade(90)\nstudent.add_grade(70)\nprint(student.average())\n`,
    },
    checks: ["class is defined", "__init__ is defined", "average method is defined", "Output is 80.0"],
  },
};
