import type { TrackTranslations } from "../types";

export const JAVA_A_EN: TrackTranslations = {
  "java-271": {
    title: "Hello Java",
    description: "First Java program with public class Main and the main method.",
    explanation:
      "Every Java program is written inside a class. We define `public class Main` with the same name as the file.\nThe program starts from the `public static void main(String[] args)` method. We're using Java 15.",
    example: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Merhaba");\n  }\n}`,
    hints: [
      "Write the public class Main { } block.",
      "Add the public static void main(String[] args) { } method inside it.",
      'Inside main, write System.out.println("Merhaba Java");',
    ],
    challenge: 'Create the Main class and the main method, print "Merhaba Java" to the screen.',
    files: {
      "Main.java": `// TODO: define public class Main and write the main method\n`,
    },
    checks: [
      "public class Main exists",
      "main method is correct",
      "Output contains 'Merhaba Java'",
    ],
  },
  "java-272": {
    title: "println and printf",
    description: "Printing with System.out.println and System.out.printf.",
    explanation:
      "`System.out.println` prints a line and moves to the next line. `System.out.printf` prints using format specifiers like `%d`, `%s`, `%f`.\nYou can add a line break inside printf with `%n`.",
    example: `System.out.println("Skor:");\nSystem.out.printf("%d puan%n", 10);`,
    hints: [
      "Print a title on the first line with println.",
      "Print an integer on the second line with printf.",
      'System.out.printf("Yas: %d%n", 15);',
    ],
    challenge: 'Print "Bilgiler:" with println, then produce the output "Yas: 15" with printf.',
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: use println and printf\n  }\n}`,
    },
    checks: [
      "printf is used",
      "Output contains 'Bilgiler:'",
      "Output contains 'Yas: 15'",
    ],
  },
  "java-273": {
    title: "Primitive types",
    description: "Defining variables with int, double, boolean, and char types.",
    explanation:
      "Every variable in Java has a type: `int` for whole numbers, `double` for decimal numbers, `boolean` for true/false, `char` for a single character.\nVariables are defined as `type name = value;`.",
    example: `int age = 16;\ndouble price = 9.99;\nboolean active = true;\nchar grade = 'A';`,
    hints: [
      "Define one variable each of type int, double, boolean, and char.",
      "Print each variable with System.out.println.",
      "Continue like: int age = 20; System.out.println(age);",
    ],
    challenge: "Define int age = 20, double height = 1.75, boolean isStudent = true, char grade = 'B' and print them all.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: define and print 4 primitive-type variables\n  }\n}`,
    },
    checks: [
      "int age = 20 exists",
      "double height exists",
      "boolean isStudent exists",
      "char grade exists",
    ],
  },
  "java-274": {
    title: "The String class",
    description: "The length() and toUpperCase() methods.",
    explanation:
      "`String` is a text class. `.length()` returns the number of characters, `.toUpperCase()` returns the uppercase version.\nString methods return a new value, they don't change the original.",
    example: `String name = "ali";\nSystem.out.println(name.length());\nSystem.out.println(name.toUpperCase());`,
    hints: [
      'Define String name = "codequest";',
      "Print its length with .length().",
      "Print its uppercase version with .toUpperCase().",
    ],
    challenge: 'Print the length and the uppercase version of the string "codequest".',
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    String name = "codequest";\n    // TODO: print length and toUpperCase\n  }\n}`,
    },
    checks: [
      "length() is used",
      "toUpperCase() is used",
      "Length 9 is printed",
      "Uppercase version is printed",
    ],
  },
  "java-275": {
    title: "Reading input with Scanner",
    description: "Reading data from the keyboard with the Scanner class.",
    explanation:
      "The `Scanner` class lets us read user input from `System.in`. It requires `import java.util.Scanner;`.\n`.nextLine()` reads a line of text, `.nextInt()` reads an integer.",
    example: `import java.util.Scanner;\nScanner sc = new Scanner(System.in);\nString name = sc.nextLine();`,
    hints: [
      "Add import java.util.Scanner; to the top of the file.",
      "Create an object with Scanner sc = new Scanner(System.in);",
      'Read with String name = sc.nextLine(); then print "Merhaba " + name.',
    ],
    challenge: "Read a name with Scanner and print \"Merhaba <name>\".",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: read a name with Scanner and greet\n  }\n}`,
    },
    checks: [
      "Scanner is imported",
      "Scanner object is created",
      "Output contains 'Merhaba Ayşe'",
    ],
  },
  "java-276": {
    title: "Arithmetic and assignment operators",
    description: "Operators like +, -, *, /, %, +=, -=.",
    explanation:
      "Arithmetic operators `+ - * / %` perform operations on numbers. Assignment operators `+= -= *= /=` combine an operation with assignment.\nFor example `x += 5;` means `x = x + 5;`.",
    example: `int x = 10;\nx += 5;\nSystem.out.println(x % 3);`,
    hints: [
      "Define int total = 20;",
      "Increase it with total += 10;",
      "Print System.out.println(total); and System.out.println(total % 7);",
    ],
    challenge: "Apply +=10 to total=20, then print total and total%7.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    int total = 20;\n    // TODO: use += and print\n  }\n}`,
    },
    checks: [
      "+= is used",
      "30 is printed",
      "Remainder 2 is printed",
    ],
  },
  "java-277": {
    title: "Casting (type conversion)",
    description: "Type conversion between int and double.",
    explanation:
      "When going from a larger type to a smaller type (double -> int), explicit conversion `(int)` is required; this is called casting.\nGoing from smaller to larger (int -> double) happens automatically.",
    example: `double d = 9.7;\nint i = (int) d;\nSystem.out.println(i);`,
    hints: [
      "Define double price = 12.9;",
      "Convert it to int with (int).",
      "int intPrice = (int) price; System.out.println(intPrice);",
    ],
    challenge: "Convert price=12.9 with (int) and print the result (12).",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    double price = 12.9;\n    // TODO: cast to int and print\n  }\n}`,
    },
    checks: [
      "(int) casting is done",
      "Output is exactly 12",
    ],
  },
  "java-278": {
    title: "if-else",
    description: "Conditional branching.",
    explanation:
      "`if` runs a block if a condition is true, `else` runs when it's false. Multiple conditions can be chained with `else if`.\nConditions are written with comparison operators like `>`, `<`, `==`, `>=`.",
    example: `int score = 70;\nif (score >= 50) {\n  System.out.println("Gecti");\n} else {\n  System.out.println("Kaldi");\n}`,
    hints: [
      "Define int score = 40;",
      "Check with if (score >= 50).",
      'In the else block write System.out.println("Kaldi");',
    ],
    challenge: "Check whether score=40 is above or below 50, print the result as 'Gecti' or 'Kaldi'.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    int score = 40;\n    // TODO: write if-else\n  }\n}`,
    },
    checks: [
      "if condition is correct",
      "else block exists",
      "Output contains 'Kaldi'",
    ],
  },
  "java-279": {
    title: "switch (classic and expression)",
    description: "switch-case and Java 15 switch expression.",
    explanation:
      "A classic `switch` requires a `break` at the end of each case. In Java 15, a `switch` expression lets you write `case X -> ...` and return a value directly.\nThis new form is shorter and less error-prone.",
    example: `int day = 3;\nString name = switch (day) {\n  case 1 -> "Pazartesi";\n  case 3 -> "Carsamba";\n  default -> "Bilinmiyor";\n};\nSystem.out.println(name);`,
    hints: [
      "Define int day = 5;",
      "Use a switch expression to return a day name for day (case 5 -> \"Cuma\").",
      "String name = switch (day) { case 5 -> \"Cuma\"; default -> \"Bilinmiyor\"; }; then print it.",
    ],
    challenge: "For day=5, use a switch expression to assign the value \"Cuma\" to a variable and print it.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    int day = 5;\n    // TODO: use a switch expression\n  }\n}`,
    },
    checks: [
      "switch is used",
      "expression (->) form is used",
      "Output contains 'Cuma'",
    ],
  },
  "java-280": {
    title: "String comparison: .equals()",
    description: "Comparing strings with .equals() instead of ==.",
    explanation:
      "When comparing strings, `.equals()` should be used instead of `==`; because `==` compares references, not content.\n`.equals()` checks whether the characters of two strings are the same.",
    example: `String a = "java";\nif (a.equals("java")) {\n  System.out.println("Ayni");\n}`,
    hints: [
      'Define String password = "1234";',
      'Compare it with .equals("1234").',
      'if (password.equals("1234")) { System.out.println("Dogru"); }',
    ],
    challenge: 'Compare password="1234" with "1234" using .equals() and print "Dogru".',
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    String password = "1234";\n    // TODO: compare with .equals\n  }\n}`,
    },
    checks: [
      ".equals() is used",
      "Output contains 'Dogru'",
    ],
  },
  "java-281": {
    title: "for and while loops",
    description: "Repeated operations with for and while.",
    explanation:
      "A `for` loop is ideal for a fixed number of repetitions: `for (int i = 0; i < n; i++)`. `while` runs as long as a condition is true.\nBoth repeatedly run a block.",
    example: `for (int i = 1; i <= 3; i++) {\n  System.out.println(i);\n}\nint j = 0;\nwhile (j < 2) {\n  j++;\n}`,
    hints: [
      "Write a for (int i = 1; i <= 5; i++) loop.",
      "Print the value of i at each step.",
      "Add the line System.out.println(i); inside the loop.",
    ],
    challenge: "Print the numbers from 1 to 5 using a for loop.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: print 1-5 with a for loop\n  }\n}`,
    },
    checks: [
      "for loop exists",
      "1 to 5 printed line by line",
    ],
  },
  "java-282": {
    title: "for-each loop",
    description: "Traversing array/collection elements with for-each.",
    explanation:
      "A `for-each` loop visits every element of an array in order: `for (int x : arr)`. There's no need to track an index.\nIt's more readable and lets you work directly with the elements.",
    example: `int[] nums = {1, 2, 3};\nfor (int n : nums) {\n  System.out.println(n);\n}`,
    hints: [
      "Define int[] nums = {10, 20, 30};",
      "Visit each element with for (int n : nums).",
      "Write System.out.println(n); inside the loop.",
    ],
    challenge: "Print the array nums = {10, 20, 30} line by line using for-each.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    int[] nums = {10, 20, 30};\n    // TODO: use for-each\n  }\n}`,
    },
    checks: [
      "for-each loop exists",
      "Elements printed in order",
    ],
  },
  "java-283": {
    title: "Arrays",
    description: "Defining an array and accessing it by index.",
    explanation:
      "An array holds multiple values of the same type: `int[] arr = {1, 2, 3};`. Elements are accessed by index, like `arr[0]`.\nIndexes start at 0.",
    example: `String[] fruits = {"elma", "armut"};\nSystem.out.println(fruits[0]);`,
    hints: [
      'Define String[] colors = {"red", "green", "blue"};',
      "Access the second element with colors[1].",
      "Write System.out.println(colors[1]);",
    ],
    challenge: 'Print the second element (green) from colors = {"red", "green", "blue"}.',
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    String[] colors = {"red", "green", "blue"};\n    // TODO: print the second element\n  }\n}`,
    },
    checks: [
      "colors[1] is used",
      "Output is exactly green",
    ],
  },
  "java-284": {
    title: "Arrays.toString and Arrays.sort",
    description: "Helper methods from java.util.Arrays.",
    explanation:
      "`Arrays.toString(arr)` converts an array to readable text. `Arrays.sort(arr)` sorts an array in place from smallest to largest.\nUsing these methods requires `import java.util.Arrays;`.",
    example: `import java.util.Arrays;\nint[] nums = {3, 1, 2};\nArrays.sort(nums);\nSystem.out.println(Arrays.toString(nums));`,
    hints: [
      "Add import java.util.Arrays;",
      "Define int[] nums = {5, 2, 8, 1};",
      "Call Arrays.sort(nums); then print Arrays.toString(nums).",
    ],
    challenge: "Sort the array nums = {5, 2, 8, 1} and print it with Arrays.toString.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    int[] nums = {5, 2, 8, 1};\n    // TODO: use sort and toString\n  }\n}`,
    },
    checks: [
      "Arrays is imported",
      "Arrays.sort is used",
      "Sorted array is printed",
    ],
  },
  "java-285": {
    title: "Static methods",
    description: "Defining a method with the static keyword.",
    explanation:
      "`static` methods belong to the class and can be called without creating an object. The `main` method is static too.\nAnother static method can be called as `Main.methodName()` or simply `methodName()`.",
    example: `static int square(int x) {\n  return x * x;\n}\n// calling: square(4)`,
    hints: [
      "Define a static int square(int x) method outside main.",
      "Write return x * x; inside it.",
      "Call System.out.println(square(5)); inside main.",
    ],
    challenge: "Write a static method called square(int x) that returns x*x; call square(5) inside main and print it.",
    files: {
      "Main.java": `public class Main {\n  // TODO: add static int square(int x) method\n\n  public static void main(String[] args) {\n    // TODO: call square(5) and print\n  }\n}`,
    },
    checks: [
      "static square method is defined",
      "Output is 25",
    ],
  },
  "java-286": {
    title: "Parameters and scope",
    description: "Method parameters and variable visibility.",
    explanation:
      "A method can take multiple parameters: `static int add(int a, int b)`. Parameters are valid only inside that method (scope).\nA variable defined outside a method cannot be accessed from inside it.",
    example: `static int add(int a, int b) {\n  return a + b;\n}\nSystem.out.println(add(2, 3));`,
    hints: [
      "Define a static int add(int a, int b) method.",
      "Write return a + b;",
      "Call System.out.println(add(4, 6)); inside main.",
    ],
    challenge: "Write a method add(int a, int b) that takes two parameters, print the result of add(4, 6) (10) inside main.",
    files: {
      "Main.java": `public class Main {\n  // TODO: write static int add(int a, int b)\n\n  public static void main(String[] args) {\n    // TODO: call add(4, 6)\n  }\n}`,
    },
    checks: [
      "add method has two parameters",
      "Output is 10",
    ],
  },
  "java-287": {
    title: "Method overloading",
    description: "Multiple methods with the same name but different parameters.",
    explanation:
      "Multiple methods with the same name can be defined with different parameter counts or types; this is called overloading.\nJava picks the correct method based on the arguments given at the call site.",
    example: `static int sum(int a, int b) { return a + b; }\nstatic double sum(double a, double b) { return a + b; }`,
    hints: [
      "Define a static int sum(int a, int b) method.",
      "Add another static double sum(double a, double b) method with the same name.",
      "Call and print both inside main: sum(2,3) and sum(2.5, 1.5)",
    ],
    challenge: "Write two overloaded methods, sum(int,int) and sum(double,double), call both and print them.",
    files: {
      "Main.java": `public class Main {\n  // TODO: overload the sum methods\n\n  public static void main(String[] args) {\n    // TODO: call two different sum methods\n  }\n}`,
    },
    checks: [
      "int overload exists",
      "double overload exists",
      "int total printed",
      "double total printed",
    ],
  },
  "java-288": {
    title: "Varargs",
    description: "Methods that take a variable number of arguments.",
    explanation:
      "A parameter defined with `...` (varargs) lets you pass any number of arguments to a method. Inside the method it behaves like an array.\nExample: `static int sum(int... nums)`.",
    example: `static int sum(int... nums) {\n  int total = 0;\n  for (int n : nums) total += n;\n  return total;\n}`,
    hints: [
      "Define a static int sum(int... nums) method.",
      "Sum the values inside nums with a for-each loop.",
      "Call sum(1, 2, 3, 4) inside main and print it.",
    ],
    challenge: "Write a sum(int... nums) method using varargs, print the result of sum(1,2,3,4) (10).",
    files: {
      "Main.java": `public class Main {\n  // TODO: write static int sum(int... nums)\n\n  public static void main(String[] args) {\n    // TODO: call sum(1, 2, 3, 4)\n  }\n}`,
    },
    checks: [
      "varargs (int...) is used",
      "Output is 10",
    ],
  },
  "java-289": {
    title: "The Math class",
    description: "Methods like Math.max, Math.pow, Math.sqrt.",
    explanation:
      "The `Math` class provides ready-made math operations: `Math.max(a,b)` gives the larger value, `Math.pow(a,b)` gives the power, `Math.sqrt(a)` gives the square root.\nThese methods are static, called directly as `Math.method()`.",
    example: `System.out.println(Math.max(3, 7));\nSystem.out.println(Math.sqrt(16));`,
    hints: [
      "Raise a power with Math.pow(2, 5).",
      "Take a square root with Math.sqrt(81).",
      "Print both with System.out.println.",
    ],
    challenge: "Print the results of Math.pow(2, 5) and Math.sqrt(81).",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: use Math.pow and Math.sqrt\n  }\n}`,
    },
    checks: [
      "Math.pow is used",
      "Math.sqrt is used",
      "2^5 is printed",
      "sqrt(81) is printed",
    ],
  },
  "java-290": {
    title: "Recursion",
    description: "Computing factorial with functions that call themselves.",
    explanation:
      "A method calling itself is called recursion. Every recursive method must have a base case, otherwise it loops forever.\nFactorial: `n! = n * (n-1)!`, base case `0! = 1`.",
    example: `static int factorial(int n) {\n  if (n == 0) return 1;\n  return n * factorial(n - 1);\n}`,
    hints: [
      "Define a static int factorial(int n) method.",
      "Base case: if n == 0, return 1.",
      "Recurse with return n * factorial(n - 1); call factorial(5) in main.",
    ],
    challenge: "Write a recursive factorial(int n) method, print the result of factorial(5) (120).",
    files: {
      "Main.java": `public class Main {\n  // TODO: write static int factorial(int n)\n\n  public static void main(String[] args) {\n    // TODO: call factorial(5)\n  }\n}`,
    },
    checks: [
      "recursive call exists",
      "Output is 120",
    ],
  },
  "java-291": {
    title: "Class and instance",
    description: "Defining your own class and creating an object.",
    explanation:
      "With `class` you define your own data type. With the `new` keyword you create an instance of that class.\nOther, non-public classes besides Main can also be defined in the same file.",
    example: `class Dog {\n  String name;\n}\nDog d = new Dog();\nd.name = "Karabas";`,
    hints: [
      "Define class Dog { String name; } outside Main.",
      "Create an object inside main with Dog d = new Dog();",
      'Assign d.name = "Karabas"; then print System.out.println(d.name);',
    ],
    challenge: "Define a Dog class (with a String name field), create an object, assign the name field, and print it.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: create a Dog object and set name\n  }\n}\n\n// TODO: define class Dog\n`,
    },
    checks: [
      "Dog class is defined",
      "Dog object is created",
      "Output contains 'Karabas'",
    ],
  },
  "java-292": {
    title: "Fields and methods",
    description: "Defining fields and behavior inside a class.",
    explanation:
      "A class's fields define its data, its methods define its behavior. Methods can directly access the class's fields.\nFor example a `Car` class might have a `speed` field and a `printSpeed()` method.",
    example: `class Car {\n  int speed;\n  void printSpeed() {\n    System.out.println(speed);\n  }\n}`,
    hints: [
      "Define class Car { int speed; }.",
      "Add the method void printSpeed() { System.out.println(speed); } to Car.",
      "Inside main: Car c = new Car(); c.speed = 120; c.printSpeed();",
    ],
    challenge: "Write a Car class (int speed, printSpeed method); set speed=120 and print it with printSpeed().",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: create a Car object, set speed, call printSpeed\n  }\n}\n\n// TODO: define class Car (speed field + printSpeed method)\n`,
    },
    checks: [
      "Car class is defined",
      "printSpeed method exists",
      "Output is 120",
    ],
  },
  "java-293": {
    title: "Constructor and this",
    description: "The constructor that runs when an object is created.",
    explanation:
      "A constructor is a special method with the same name as the class, and it runs automatically when an object is created with `new`.\nThe `this` keyword refers to the class's own field when a parameter name clashes with a field name.",
    example: `class Person {\n  String name;\n  Person(String name) {\n    this.name = name;\n  }\n}\nPerson p = new Person("Ali");`,
    hints: [
      "Define class Person { String name; }.",
      "Add the constructor Person(String name) { this.name = name; }.",
      'Inside main: Person p = new Person("Ali"); System.out.println(p.name);',
    ],
    challenge: "Add a constructor to the Person class (this.name = name), create an object with \"Ali\" and print its name.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: create a Person object and print it\n  }\n}\n\n// TODO: define class Person (with a constructor)\n`,
    },
    checks: [
      "this.name = name is used",
      "created with Person(\"Ali\")",
      "Output contains 'Ali'",
    ],
  },
  "java-294": {
    title: "Constructor overloading",
    description: "Defining multiple constructors in one class.",
    explanation:
      "A class can have multiple constructors with different parameter lists; this is called constructor overloading.\nThe empty constructor can give default values, while the parameterized one can assign a custom value.",
    example: `class Box {\n  int size;\n  Box() { size = 1; }\n  Box(int size) { this.size = size; }\n}`,
    hints: [
      "Define class Box { int size; }.",
      "Add two constructors: Box() { size = 1; } and Box(int size) { this.size = size; }.",
      "Inside main: Box b1 = new Box(); Box b2 = new Box(5); print both sizes.",
    ],
    challenge: "Add a parameterless and a parameterized constructor to the Box class; create two objects and print their size values.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: create two Box objects and print their size\n  }\n}\n\n// TODO: define class Box (two constructors)\n`,
    },
    checks: [
      "parameterless constructor exists",
      "parameterized constructor exists",
      "Default size is printed",
      "Custom size is printed",
    ],
  },
  "java-295": {
    title: "Encapsulation",
    description: "Hiding data with private fields and getter methods.",
    explanation:
      "Encapsulation means making a class's fields `private` to block direct outside access, and instead exposing getter/setter methods.\nThis allows the data to be changed in a controlled way.",
    example: `class Account {\n  private double balance;\n  public double getBalance() { return balance; }\n  public void setBalance(double b) { balance = b; }\n}`,
    hints: [
      "Define class Account { private double balance; }.",
      "Add the methods public double getBalance() and public void setBalance(double b).",
      "Inside main: Account a = new Account(); a.setBalance(100); System.out.println(a.getBalance());",
    ],
    challenge: "Add a private balance field and getter/setter to the Account class; set 100 and print it with getBalance.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: create an Account object, call setBalance(100), print getBalance\n  }\n}\n\n// TODO: define class Account (private balance + getter/setter)\n`,
    },
    checks: [
      "balance field is private",
      "getBalance method exists",
      "setBalance method exists",
      "Output is 100.0",
    ],
  },
};
