import type { TrackTranslations } from "../types";

export const JAVA_B_EN: TrackTranslations = {
  "java-296": {
    title: "Getter/setter",
    description: "Make fields private and access them via getter/setter.",
    explanation:
      "In object-oriented programming, we make fields `private` and provide controlled access from the outside through `getX()` and `setX()` methods.\nThis is called encapsulation.",
    example: `class Person {\n  private int age;\n  public int getAge() { return age; }\n  public void setAge(int a) { age = a; }\n}`,
    hints: [
      "Define a private String name field in the Person class.",
      "Write getName() and setName(String n) methods.",
      "public String getName() { return name; } / public void setName(String n) { name = n; }",
    ],
    challenge:
      "Add a private String name field to the Person class, write getName/setName. In main, create a Person, call setName(\"Ada\"), and print it with System.out.println(p.getName());.",
    files: {
      "Main.java": `class Person {\n  private String name;\n  // TODO: add getName and setName\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person();\n    p.setName("Ada");\n    System.out.println(p.getName());\n  }\n}`,
    },
    checks: ["Output contains 'Ada'", "getName method exists", "setName method exists"],
  },
  "java-297": {
    title: "Static field and method",
    description: "Shared data and methods that belong to the class.",
    explanation:
      "A `static` field or method belongs to the class itself, not an object; all objects share it.\nIt is called with the class name, like `ClassName.method()`.",
    example: `class Counter {\n  static int total = 0;\n  static void increase() { total++; }\n}\nCounter.increase();\nSystem.out.println(Counter.total);`,
    hints: [
      "Define static int total = 0 in the Counter class.",
      "Write a static void increase() method that does total++.",
      "In main, call Counter.increase() twice, then System.out.println(Counter.total);",
    ],
    challenge:
      "Add static int total = 0 and static void increase() (which does total++) to the Counter class. In main, call increase() twice and print Counter.total.",
    files: {
      "Main.java": `class Counter {\n  // TODO: add static int total and static void increase()\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Counter.increase();\n    Counter.increase();\n    System.out.println(Counter.total);\n  }\n}`,
    },
    checks: ["Output is exactly 2", "static int total exists", "static increase method exists"],
  },
  "java-298": {
    title: "final",
    description: "Immutable variables and final classes.",
    explanation:
      "Once a value is assigned to a `final` variable, it is set once and cannot be changed afterward.\n`static final` is usually used together for constants.",
    example: `final int MAX = 100;\nSystem.out.println(MAX);`,
    hints: [
      "Define static final int MAX_SPEED = 200;.",
      "Don't try to change MAX_SPEED's value, just print it.",
      "System.out.println(MAX_SPEED);",
    ],
    challenge: "Define static final int MAX_SPEED = 200; inside main and print it.",
    files: {
      "Main.java": `public class Main {\n  // TODO: add static final int MAX_SPEED = 200;\n  public static void main(String[] args) {\n    System.out.println(MAX_SPEED);\n  }\n}`,
    },
    checks: ["Output is 200", "final constant is defined"],
  },
  "java-299": {
    title: "package/import (java.util)",
    description: "Import a class from the java.util package.",
    explanation:
      "In Java, `import` is used to bring in a package so you can use its ready-made classes.\nThe `java.util` package contains useful classes like ArrayList, HashMap, Scanner.",
    example: `import java.util.ArrayList;\n\nArrayList<String> list = new ArrayList<>();\nlist.add("hi");`,
    hints: [
      "Write import java.util.ArrayList; at the top of the file.",
      "Create an ArrayList<Integer> nums = new ArrayList<>();.",
      "nums.add(5); nums.add(10); System.out.println(nums.size());",
    ],
    challenge:
      "Import java.util.ArrayList. Create an ArrayList for Integer, add 5 and 10, and print its size (size()).",
    files: {
      "Main.java": `// TODO: import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: create ArrayList<Integer>, add 5 and 10\n  }\n}`,
    },
    checks: ["ArrayList is imported", "size 2 is printed"],
  },
  "java-300": {
    title: "toString() override",
    description: "Customize the text representation of an object.",
    explanation:
      "By overriding `toString()`, you can show meaningful text when you print your object with `println`.\nOtherwise, Java prints the default class name and hash code.",
    example: `class Point {\n  int x, y;\n  public String toString() { return "(" + x + "," + y + ")"; }\n}`,
    hints: [
      "Add a title field and a constructor to the Book class.",
      "Override the public String toString() method.",
      'Return "Book: " + title;.',
    ],
    challenge:
      "Add a String title field and a Book(String title) constructor to the Book class. Override toString() to return \"Book: \" + title. In main, create a Book and print it with println.",
    files: {
      "Main.java": `class Book {\n  String title;\n  public Book(String title) {\n    this.title = title;\n  }\n  // TODO: override toString()\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Book b = new Book("Java 101");\n    System.out.println(b);\n  }\n}`,
    },
    checks: ["toString output is correct", "toString is overridden"],
  },
  "java-301": {
    title: "extends",
    description: "Derive from a class through inheritance.",
    explanation:
      "The `extends` keyword lets a class inherit the fields and methods of another class.\nThe subclass can access all public/protected members of the superclass.",
    example: `class Animal {\n  String sound = "...";\n}\nclass Dog extends Animal {\n}`,
    hints: [
      "Let Animal have a String name field.",
      "Define it as class Dog extends Animal { }.",
      "In main, create a Dog object, access the name field and print it.",
    ],
    challenge:
      "Define a String name field in the Animal class. Make the Dog class extend Animal. In main, create a Dog object, assign name = \"Rex\", and print it.",
    files: {
      "Main.java": `class Animal {\n  String name;\n}\n\n// TODO: make Dog extend Animal\nclass Dog {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog d = new Dog();\n    d.name = "Rex";\n    System.out.println(d.name);\n  }\n}`,
    },
    checks: ["Output is Rex", "Dog extends Animal"],
  },
  "java-302": {
    title: "super",
    description: "Access the superclass's constructor and methods.",
    explanation:
      "The `super` keyword is used from a subclass to call the superclass's constructor or methods.\n`super(...)` must be the first statement in the constructor.",
    example: `class Animal {\n  Animal(String s) { System.out.println(s); }\n}\nclass Cat extends Animal {\n  Cat() { super("meow"); }\n}`,
    hints: [
      "Add a constructor to the Animal class that sets the name field.",
      "Call super(name) in the Dog class's constructor.",
      "Write Dog(String name) { super(name); }.",
    ],
    challenge:
      "Add the constructor Animal(String name) to the Animal class (this.name = name). Let Dog extend Animal, and in Dog(String name)'s constructor call super(name). In main, create new Dog(\"Rex\") and print its name field.",
    files: {
      "Main.java": `class Animal {\n  String name;\n  // TODO: add Animal(String name) constructor\n}\n\nclass Dog extends Animal {\n  // TODO: add Dog(String name) constructor, call super(name)\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog d = new Dog("Rex");\n    System.out.println(d.name);\n  }\n}`,
    },
    checks: ["Output is Rex", "super(name) is called"],
  },
  "java-303": {
    title: "@Override",
    description: "Redefine a superclass method by overriding it.",
    explanation:
      "The `@Override` annotation states that a method overrides one from the superclass and helps catch mistakes early.\nThe method signature (name, parameters) must match.",
    example: `class Animal {\n  void speak() { System.out.println("..."); }\n}\nclass Cat extends Animal {\n  @Override\n  void speak() { System.out.println("Meow"); }\n}`,
    hints: [
      "Define a void speak() method in the Animal class.",
      "Override the same-signature speak() method in the Dog class with @Override.",
      'Print "Woof" inside Dog.speak().',
    ],
    challenge:
      "Let void speak() in the Animal class print \"...\". Make Dog extend Animal and override speak() with @Override to print \"Woof\". In main, call speak() on a Dog object.",
    files: {
      "Main.java": `class Animal {\n  void speak() {\n    System.out.println("...");\n  }\n}\n\nclass Dog extends Animal {\n  // TODO: override speak() with @Override, print "Woof"\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog d = new Dog();\n    d.speak();\n  }\n}`,
    },
    checks: ["Output is Woof", "@Override is used"],
  },
  "java-304": {
    title: "Polymorphism",
    description: "Subclass behavior through a superclass reference.",
    explanation:
      "Polymorphism means a superclass reference calls the subclass's overridden method at runtime.\nThis lets you handle objects of different types through the same interface.",
    example: `Animal a = new Dog();\na.speak(); // Dog's speak() method runs`,
    hints: [
      "Let Animal have a speak() method, and let Dog and Cat override it.",
      "Use a superclass reference like Animal a = new Dog();.",
      "The call a.speak(); runs Dog's method.",
    ],
    challenge:
      "Define void speak() (printing \"...\") in the Animal class. Let Dog and Cat classes extend Animal and override speak() as \"Woof\" and \"Meow\" respectively. In main, write Animal a = new Dog(); a.speak();.",
    files: {
      "Main.java": `class Animal {\n  void speak() {\n    System.out.println("...");\n  }\n}\n\nclass Dog extends Animal {\n  @Override\n  void speak() {\n    System.out.println("Woof");\n  }\n}\n\nclass Cat extends Animal {\n  @Override\n  void speak() {\n    System.out.println("Meow");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: Animal a = new Dog(); a.speak();\n  }\n}`,
    },
    checks: ["Output is Woof", "A superclass reference is used"],
  },
  "java-305": {
    title: "Abstract class",
    description: "Define an abstract class and abstract method.",
    explanation:
      "An `abstract class` cannot be instantiated directly; it can contain `abstract` methods.\nSubclasses must implement these abstract methods.",
    example: `abstract class Shape {\n  abstract double area();\n}\nclass Circle extends Shape {\n  double r;\n  double area() { return 3.14 * r * r; }\n}`,
    hints: [
      "Define abstract class Shape { abstract double area(); }.",
      "Make Square extend Shape and implement area() (side*side).",
      "In main: Square s = new Square(4); System.out.println(s.area());",
    ],
    challenge:
      "Define abstract double area(); inside abstract class Shape. Add a double side field and constructor to the Square class extending Shape, and implement area() as side*side. In main, create Square(4) and print area().",
    files: {
      "Main.java": `abstract class Shape {\n  abstract double area();\n}\n\nclass Square extends Shape {\n  double side;\n  public Square(double side) {\n    this.side = side;\n  }\n  // TODO: implement area() method\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Square s = new Square(4);\n    System.out.println(s.area());\n  }\n}`,
    },
    checks: ["Output is 16.0", "Shape is an abstract class", "area() is an abstract method"],
  },
  "java-306": {
    title: "interface / implements",
    description: "Define and implement an interface.",
    explanation:
      "An `interface` defines a contract that classes must fulfill; its methods have no body (except default/static).\nA class implements an interface with `implements` and must realize all of its methods.",
    example: `interface Greetable {\n  void greet();\n}\nclass Person implements Greetable {\n  public void greet() { System.out.println("Hi"); }\n}`,
    hints: [
      "Define interface Movable { void move(); }.",
      "Write class Car implements Movable { } and implement the move() method.",
      'Inside move(), write System.out.println("Car is moving");.',
    ],
    challenge:
      "Define void move(); inside interface Movable. Let the Car class implement Movable, with move() printing \"Car is moving\". In main, call move() on a Car object.",
    files: {
      "Main.java": `interface Movable {\n  void move();\n}\n\n// TODO: define Car class to implement Movable\nclass Car {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Car c = new Car();\n    c.move();\n  }\n}`,
    },
    checks: ["Output is correct", "Car implements Movable"],
  },
  "java-307": {
    title: "Multiple interfaces",
    description: "A class implements multiple interfaces.",
    explanation:
      "In Java, a class cannot use multiple inheritance, but it can `implement` several interfaces at once by separating them with commas.\nThis way, different behavior contracts are combined in a single class.",
    example: `interface A { void a(); }\ninterface B { void b(); }\nclass C implements A, B {\n  public void a() {}\n  public void b() {}\n}`,
    hints: [
      "Define interface Flyable { void fly(); } and interface Swimmable { void swim(); }.",
      "Write class Duck implements Flyable, Swimmable { }.",
      "Implement fly() and swim() methods and print the related texts.",
    ],
    challenge:
      "Define interfaces Flyable (fly()) and Swimmable (swim()). Let the Duck class implement both; fly() prints \"Flying\", swim() prints \"Swimming\". In main, call both.",
    files: {
      "Main.java": `interface Flyable {\n  void fly();\n}\n\ninterface Swimmable {\n  void swim();\n}\n\n// TODO: write Duck class to implement Flyable and Swimmable\nclass Duck {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Duck d = new Duck();\n    d.fly();\n    d.swim();\n  }\n}`,
    },
    checks: ["Output order is correct", "Duck implements both interfaces"],
  },
  "java-308": {
    title: "instanceof",
    description: "Check the type of an object.",
    explanation:
      "The `instanceof` operator checks whether an object is of a certain class or interface type.\nIt is usually used as a safety check before downcasting.",
    example: `Object o = "hello";\nif (o instanceof String) {\n  System.out.println("String!");\n}`,
    hints: [
      "Define Animal a = new Dog();.",
      "Write the condition if (a instanceof Dog).",
      'If true, print System.out.println("It is a Dog");.',
    ],
    challenge:
      "The Animal class and the Dog class extending it are already defined. In main, create Animal a = new Dog();, check whether it's a Dog using instanceof, and print \"It is a Dog\" if true.",
    files: {
      "Main.java": `class Animal {\n}\n\nclass Dog extends Animal {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal a = new Dog();\n    // TODO: check with instanceof and print\n  }\n}`,
    },
    checks: ["Output is correct", "instanceof is used"],
  },
  "java-309": {
    title: "try/catch/finally",
    description: "Catch and handle exceptions.",
    explanation:
      "Code that may fail is run in the `try` block, `catch` catches the error, and `finally` always runs.\nThe program doesn't crash on error and continues in a controlled way.",
    example: `try {\n  int x = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println("Error: " + e.getMessage());\n} finally {\n  System.out.println("Done");\n}`,
    hints: [
      "Perform the 10/0 operation in the try block.",
      "Catch it with catch (ArithmeticException e) and print a message.",
      'In the finally block, write System.out.println("Done");.',
    ],
    challenge:
      "Perform the division 10/0 in a try block, catch ArithmeticException and print \"Error occurred\", and print \"Done\" in the finally block.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: add try/catch/finally\n    int x = 10 / 0;\n  }\n}`,
    },
    checks: ["Output order is correct", "ArithmeticException is caught", "finally block exists"],
  },
  "java-310": {
    title: "Custom exception (throw new)",
    description: "Create and throw your own exception class.",
    explanation:
      "To define your own error type, you write a class that extends `Exception`.\nThis error is thrown with `throw new MyException(...)` and caught with `catch`.",
    example: `class MyException extends Exception {\n  MyException(String m) { super(m); }\n}\nthrow new MyException("Error!");`,
    hints: [
      "Define class InvalidAgeException extends Exception { InvalidAgeException(String m) { super(m); } }.",
      "In the checkAge method, if age is negative, do throw new InvalidAgeException(\"Negative age\");.",
      "In main, call it inside try/catch and print e.getMessage() in the catch block.",
    ],
    challenge:
      "Define the InvalidAgeException class (extends Exception). The checkAge(int age) method should do throw new InvalidAgeException(\"Negative age\"); when age < 0 (with throws Exception). In main, call checkAge(-5), catch it with try/catch, and print e.getMessage().",
    files: {
      "Main.java": `// TODO: make InvalidAgeException extend Exception\nclass InvalidAgeException {\n}\n\nclass Validator {\n  static void checkAge(int age) throws Exception {\n    if (age < 0) {\n      // TODO: throw new InvalidAgeException("Negative age");\n    }\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      Validator.checkAge(-5);\n    } catch (Exception e) {\n      System.out.println(e.getMessage());\n    }\n  }\n}`,
    },
    checks: ["Output is correct", "Custom exception extends Exception", "Exception is thrown"],
  },
  "java-311": {
    title: "Wrapper classes / autoboxing",
    description: "Convert primitive types into objects.",
    explanation:
      "Wrapper classes like `Integer`, `Double`, `Boolean` wrap primitive types into objects.\nWith autoboxing, an `int` automatically converts to `Integer`; `unboxing` is the reverse.",
    example: `Integer x = 5; // autoboxing\nint y = x;      // unboxing\nSystem.out.println(x + y);`,
    hints: [
      "Define Integer boxed = 42; (autoboxing).",
      "Convert it back with int unboxed = boxed; (unboxing).",
      "Print the sum of the two with System.out.println.",
    ],
    challenge: "Define Integer boxed = 42;, do int unboxed = boxed;, and print the sum boxed + unboxed.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: add Integer boxed = 42; and int unboxed = boxed;\n    // TODO: print their sum\n  }\n}`,
    },
    checks: ["Output is 84", "Autoboxing is used"],
  },
  "java-312": {
    title: "ArrayList",
    description: "Use a dynamically sized list.",
    explanation:
      "`ArrayList` is an array whose size grows automatically; it comes from the `java.util` package.\nYou add and read elements with methods like `add`, `get`, `size`.",
    example: `ArrayList<String> names = new ArrayList<>();\nnames.add("Ali");\nSystem.out.println(names.get(0));`,
    hints: [
      "Add import java.util.ArrayList;.",
      "Create ArrayList<String> fruits, add \"Apple\", \"Banana\".",
      "Print all of them with a for loop or with System.out.println(fruits);.",
    ],
    challenge:
      "Create ArrayList<String> fruits, add \"Apple\" and \"Banana\" in order, and print it with System.out.println(fruits);.",
    files: {
      "Main.java": `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: create ArrayList<String> fruits, add elements, print it\n  }\n}`,
    },
    checks: ["Output is correct", "ArrayList<String> is used"],
  },
  "java-313": {
    title: "LinkedList",
    description: "Use the linked list data structure.",
    explanation:
      "`LinkedList` is a list that keeps elements as linked nodes; adding/removing at the start/end is fast.\nIt implements the `List` interface and shares similar methods with `ArrayList`.",
    example: `LinkedList<Integer> nums = new LinkedList<>();\nnums.addFirst(1);\nnums.addLast(2);\nSystem.out.println(nums);`,
    hints: [
      "Add import java.util.LinkedList;.",
      "Create LinkedList<Integer> nums, call addFirst(2), addLast(3).",
      "Print [2, 3] with System.out.println(nums);.",
    ],
    challenge:
      "Create LinkedList<Integer> nums, call addFirst(2) then addLast(3), and print it with System.out.println(nums);.",
    files: {
      "Main.java": `import java.util.LinkedList;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: create LinkedList<Integer> nums, use addFirst/addLast, print it\n  }\n}`,
    },
    checks: ["Output is correct", "LinkedList<Integer> is used", "addFirst is used"],
  },
  "java-314": {
    title: "HashSet",
    description: "A collection with unique elements.",
    explanation:
      "`HashSet` is an unordered collection that keeps each element only once; repeated `add` calls are ignored.\nYou can check membership with `contains`.",
    example: `HashSet<String> set = new HashSet<>();\nset.add("a");\nset.add("a");\nSystem.out.println(set.size());`,
    hints: [
      "Add import java.util.HashSet;.",
      "Create HashSet<String> colors, add \"red\" twice and \"blue\" once.",
      "Print set.size() and set.contains(\"red\") results.",
    ],
    challenge:
      "Create HashSet<String> colors, add \"red\", add \"red\" again, add \"blue\". Print colors.size() (duplicates aren't counted), then print colors.contains(\"red\").",
    files: {
      "Main.java": `import java.util.HashSet;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: create HashSet<String> colors, add red/blue, print size and contains\n  }\n}`,
    },
    checks: ["size and contains are correct", "HashSet<String> is used"],
  },
  "java-315": {
    title: "HashMap",
    description: "Store key-value pairs.",
    explanation:
      "`HashMap` is a collection where each key maps to a value.\nYou add with `put` and read the value by key with `get`.",
    example: `HashMap<String, Integer> ages = new HashMap<>();\nages.put("Ali", 20);\nSystem.out.println(ages.get("Ali"));`,
    hints: [
      "Add import java.util.HashMap;.",
      'Create HashMap<String, Integer> scores, put "Ali" -> 90, "Ada" -> 85.',
      'Print the result of scores.get("Ali") with System.out.println.',
    ],
    challenge:
      "Create HashMap<String, Integer> scores, add (put) \"Ali\" -> 90 and \"Ada\" -> 85. Print scores.get(\"Ali\").",
    files: {
      "Main.java": `import java.util.HashMap;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: create HashMap<String, Integer> scores, add with put, print with get\n  }\n}`,
    },
    checks: ["Output is 90", "HashMap<String, Integer> is used", "put method is used"],
  },
  "java-316": {
    title: "Collections.sort / Comparable",
    description: "Sort lists, implement Comparable.",
    explanation:
      "`Collections.sort(list)` sorts a list into natural order; for custom classes you implement `Comparable<T>` and write `compareTo`.\nThis way you can sort your own objects too.",
    example: `class Item implements Comparable<Item> {\n  int value;\n  public int compareTo(Item o) { return Integer.compare(value, o.value); }\n}`,
    hints: [
      "Add import java.util.ArrayList; and import java.util.Collections;.",
      "Create ArrayList<Integer> nums, add 5, 1, 3.",
      "Call Collections.sort(nums); and print it with System.out.println(nums);.",
    ],
    challenge:
      "Create ArrayList<Integer> nums, add 5, 1, 3 in order. Sort it with Collections.sort(nums); and print it (expected [1, 3, 5]).",
    files: {
      "Main.java": `import java.util.ArrayList;\nimport java.util.Collections;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: create nums, add 5,1,3, sort with Collections.sort, print it\n  }\n}`,
    },
    checks: ["Sorted output is correct", "Collections.sort is used"],
  },
  "java-317": {
    title: "Lambda expressions",
    description: "Write short functional interface implementations.",
    explanation:
      "A lambda expression, in the form `(parameters) -> body`, lets you implement a functional interface concisely.\nIt's often used with single-method interfaces like `Runnable`, `Comparator`.",
    example: `Runnable r = () -> System.out.println("Hi");\nr.run();`,
    hints: [
      "Define Runnable r = () -> System.out.println(\"Hello Lambda\");.",
      "Run it with r.run();.",
      "Lambda syntax: (parameters) -> { ... }",
    ],
    challenge: "Implement the Runnable interface with a lambda that prints \"Hello Lambda\" when run. Then call r.run();.",
    files: {
      "Main.java": `public class Main {\n  public static void main(String[] args) {\n    // TODO: add Runnable r = () -> ...; and r.run();\n  }\n}`,
    },
    checks: ["Output is correct", "Lambda operator is used"],
  },
  "java-318": {
    title: "Stream filter/map",
    description: "Process collections with streams.",
    explanation:
      "`stream()` opens a collection to functional operations; `filter` filters elements, `map` transforms each element.\nThese operations are chained together for readable data-processing code.",
    example: `list.stream()\n  .filter(x -> x > 2)\n  .map(x -> x * 2)\n  .forEach(System.out::println);`,
    hints: [
      "Add import java.util.Arrays; and import java.util.List;.",
      "Create List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);.",
      "Write nums.stream().filter(x -> x % 2 == 0).map(x -> x * 10).forEach(System.out::println);.",
    ],
    challenge:
      "Create List<Integer> nums = Arrays.asList(1,2,3,4,5);. Using stream(), filter the even numbers, multiply each by 10, and print with forEach(System.out::println) (expected 20 and 40 on separate lines).",
    files: {
      "Main.java": `import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\n    // TODO: write a stream().filter().map().forEach() chain\n  }\n}`,
    },
    checks: ["Output is correct", "stream() is used", "filter is used"],
  },
  "java-319": {
    title: "collect(Collectors.toList())",
    description: "Collect a stream result back into a list.",
    explanation:
      "`collect(Collectors.toList())` converts the result of a stream operation back into a `List`.\nThis lets you store and use the result after filtering/transforming.",
    example: `List<Integer> result = nums.stream()\n  .filter(x -> x > 1)\n  .collect(Collectors.toList());`,
    hints: [
      "Add import java.util.stream.Collectors;.",
      "Create List<Integer> nums = Arrays.asList(1,2,3,4,5);.",
      "Assign the result of nums.stream().filter(x -> x > 2).collect(Collectors.toList()) to a variable and print it.",
    ],
    challenge:
      "Create List<Integer> nums = Arrays.asList(1,2,3,4,5);. Using stream().filter(x -> x > 2).collect(Collectors.toList()), collect the numbers greater than 3 into a new list and print it with System.out.println (expected [3, 4, 5]).",
    files: {
      "Main.java": `import java.util.Arrays;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\n    // TODO: use filter + collect(Collectors.toList()), print it\n  }\n}`,
    },
    checks: ["Output is correct", "collect(Collectors.toList()) is used"],
  },
  "java-320": {
    title: "Final project: bank account management system",
    description: "Deposit/withdraw money with the Account class, throw an error on insufficient balance.",
    explanation:
      "In this final project you'll combine what you've learned about classes, encapsulation, and exceptions.\nThe `Account` class holds a balance; a custom exception is thrown when withdrawing with an insufficient balance.",
    example: `class Account {\n  private double balance;\n  void deposit(double amount) { balance += amount; }\n}`,
    hints: [
      "Make the InsufficientFundsException class extend Exception.",
      "In the Account class, write private double balance, deposit(double) and withdraw(double) (throws Exception) methods; in withdraw, if amount > balance, throw new InsufficientFundsException(\"Insufficient funds\");.",
      "In main, create an Account, call deposit(100), withdraw(150), print e.getMessage() in try/catch; then print getBalance().",
    ],
    challenge:
      "Define InsufficientFundsException (extends Exception). In the Account class, write private double balance, getBalance(), deposit(double amount) (balance += amount), and withdraw(double amount) throws Exception (throw InsufficientFundsException if amount > balance, otherwise balance -= amount). In main, create an Account, deposit(100), call withdraw(150) and print the error via try/catch, then print getBalance().",
    files: {
      "Main.java": `// TODO: make InsufficientFundsException extend Exception\nclass InsufficientFundsException {\n  InsufficientFundsException(String m) {\n  }\n}\n\nclass Account {\n  private double balance = 0;\n\n  public double getBalance() {\n    return balance;\n  }\n\n  public void deposit(double amount) {\n    balance += amount;\n  }\n\n  // TODO: write the withdraw(double amount) throws Exception method\n  public void withdraw(double amount) throws Exception {\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Account acc = new Account();\n    acc.deposit(100);\n    try {\n      acc.withdraw(150);\n    } catch (Exception e) {\n      System.out.println(e.getMessage());\n    }\n    System.out.println(acc.getBalance());\n  }\n}`,
    },
    checks: [
      "Output order and values are correct",
      "Custom exception extends Exception",
      "Exception is thrown",
      "withdraw method has throws Exception",
    ],
  },
};
