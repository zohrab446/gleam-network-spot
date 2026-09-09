import type { Lesson } from "../types";

export const JAVA_B: Lesson[] = [
  {
    id: "java-296",
    level: 296,
    language: "java",
    title: "Getter/setter",
    description: "Alanları private yapıp getter/setter ile eriş.",
    explanation:
      "Nesne yönelimli programlamada alanları (field) `private` yapıp dışarıya `getX()` ve `setX()` metotlarıyla kontrollü erişim sağlarız.\nBuna kapsülleme (encapsulation) denir.",
    example: `class Person {\n  private int age;\n  public int getAge() { return age; }\n  public void setAge(int a) { age = a; }\n}`,
    hints: [
      "Person sınıfında private String name alanı tanımla.",
      "getName() ve setName(String n) metotlarını yaz.",
      "public String getName() { return name; } / public void setName(String n) { name = n; }",
    ],
    challenge:
      "Person sınıfına private String name alanı ekle, getName/setName yaz. Main'de bir Person oluştur, setName(\"Ada\") çağır, System.out.println(p.getName()); ile yazdır.",
    files: [
      {
        name: "Main.java",
        content: `class Person {\n  private String name;\n  // TODO: getName ve setName ekle\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Person p = new Person();\n    p.setName("Ada");\n    System.out.println(p.getName());\n  }\n}`,
      },
    ],
    checks: [
      { type: "output", value: "Ada", label: "Çıktıda 'Ada' var" },
      { type: "regex", value: "public\\s+String\\s+getName", label: "getName metodu var" },
      { type: "regex", value: "public\\s+void\\s+setName", label: "setName metodu var" },
    ],
  },
  {
    id: "java-297",
    level: 297,
    language: "java",
    title: "Static değişken ve metot",
    description: "Sınıfa ait ortak veri ve metotlar.",
    explanation:
      "`static` bir alan veya metot nesneye değil sınıfın kendisine aittir; tüm nesneler onu paylaşır.\nSınıf adıyla `ClassName.method()` şeklinde çağrılır.",
    example: `class Counter {\n  static int total = 0;\n  static void increase() { total++; }\n}\nCounter.increase();\nSystem.out.println(Counter.total);`,
    hints: [
      "Counter sınıfında static int total = 0 tanımla.",
      "static void increase() metodunu yazıp total++ yap.",
      "Main'de Counter.increase() iki kez çağır, System.out.println(Counter.total);",
    ],
    challenge:
      "Counter sınıfına static int total = 0 ve static void increase() (total++ yapan) ekle. Main'de increase() metodunu 2 kez çağırıp Counter.total değerini yazdır.",
    files: [
      {
        name: "Main.java",
        content: `class Counter {\n  // TODO: static int total ve static void increase() ekle\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Counter.increase();\n    Counter.increase();\n    System.out.println(Counter.total);\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "2", label: "Çıktı tam olarak 2" },
      { type: "regex", value: "static\\s+int\\s+total", label: "static int total var" },
      { type: "regex", value: "static\\s+void\\s+increase", label: "static increase metodu var" },
    ],
  },
  {
    id: "java-298",
    level: 298,
    language: "java",
    title: "final",
    description: "Değişmez değişkenler ve final sınıflar.",
    explanation:
      "`final` bir değişkene atandığında değeri bir kez atanır ve sonra değiştirilemez.\nSabitler için genelde `static final` birlikte kullanılır.",
    example: `final int MAX = 100;\nSystem.out.println(MAX);`,
    hints: [
      "static final int MAX_SPEED = 200; tanımla.",
      "MAX_SPEED değerini değiştirmeye çalışma, sadece yazdır.",
      "System.out.println(MAX_SPEED);",
    ],
    challenge: "Main içinde static final int MAX_SPEED = 200; tanımla ve yazdır.",
    files: [
      {
        name: "Main.java",
        content: `public class Main {\n  // TODO: static final int MAX_SPEED = 200; ekle\n  public static void main(String[] args) {\n    System.out.println(MAX_SPEED);\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "200", label: "Çıktı 200" },
      { type: "regex", value: "static\\s+final\\s+int\\s+MAX_SPEED", label: "final sabit tanımlı" },
    ],
  },
  {
    id: "java-299",
    level: 299,
    language: "java",
    title: "package/import (java.util)",
    description: "java.util paketinden sınıf içe aktar.",
    explanation:
      "Java'da hazır sınıfları kullanmak için `import` ile paket içe aktarılır.\n`java.util` paketi ArrayList, HashMap, Scanner gibi yararlı sınıflar içerir.",
    example: `import java.util.ArrayList;\n\nArrayList<String> list = new ArrayList<>();\nlist.add("hi");`,
    hints: [
      "Dosyanın en üstüne import java.util.ArrayList; yaz.",
      "ArrayList<Integer> nums = new ArrayList<>(); oluştur.",
      "nums.add(5); nums.add(10); System.out.println(nums.size());",
    ],
    challenge:
      "java.util.ArrayList import et. Integer için bir ArrayList oluştur, 5 ve 10 ekle, boyutunu (size()) yazdır.",
    files: [
      {
        name: "Main.java",
        content: `// TODO: import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: ArrayList<Integer> oluştur, 5 ve 10 ekle\n  }\n}`,
      },
    ],
    checks: [
      { type: "regex", value: "import\\s+java\\.util\\.ArrayList;", label: "ArrayList import edilmiş" },
      { type: "output-exact", value: "2", label: "size 2 yazdırılmış" },
    ],
  },
  {
    id: "java-300",
    level: 300,
    language: "java",
    title: "toString() override",
    description: "Nesnenin metin gösterimini özelleştir.",
    explanation:
      "`toString()` metodunu override ederek nesneni `println` ile yazdırdığında anlamlı bir metin gösterebilirsin.\nAksi halde Java varsayılan olarak sınıf adı ve hash kodu yazar.",
    example: `class Point {\n  int x, y;\n  public String toString() { return "(" + x + "," + y + ")"; }\n}`,
    hints: [
      "Book sınıfına title alanı ve constructor ekle.",
      "public String toString() metodunu override et.",
      'return "Book: " + title; şeklinde döndür.',
    ],
    challenge:
      "Book sınıfına String title alanı ve Book(String title) constructor ekle. toString()'i override ederek \"Book: \" + title döndür. Main'de bir Book oluşturup println ile yazdır.",
    files: [
      {
        name: "Main.java",
        content: `class Book {\n  String title;\n  public Book(String title) {\n    this.title = title;\n  }\n  // TODO: toString() override et\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Book b = new Book("Java 101");\n    System.out.println(b);\n  }\n}`,
      },
    ],
    checks: [
      { type: "output", value: "Book: Java 101", label: "toString çıktısı doğru" },
      { type: "regex", value: "@Override[\\s\\S]*toString", label: "toString override edilmiş" },
    ],
  },
  {
    id: "java-301",
    level: 301,
    language: "java",
    title: "extends",
    description: "Kalıtım ile bir sınıftan türet.",
    explanation:
      "`extends` anahtar kelimesi ile bir sınıf başka bir sınıfın alanlarını ve metotlarını miras alır.\nAlt sınıf (subclass) üst sınıfın (superclass) tüm public/protected üyelerine erişebilir.",
    example: `class Animal {\n  String sound = "...";\n}\nclass Dog extends Animal {\n}`,
    hints: [
      "Animal sınıfında String name alanı olsun.",
      "class Dog extends Animal { } şeklinde tanımla.",
      "Main'de Dog nesnesi oluştur, name alanına eriş ve yazdır.",
    ],
    challenge:
      "Animal sınıfında String name alanı tanımla. Dog sınıfını Animal'dan extends et. Main'de Dog nesnesi oluştur, name = \"Rex\" ata ve yazdır.",
    files: [
      {
        name: "Main.java",
        content: `class Animal {\n  String name;\n}\n\n// TODO: Dog sınıfını Animal'dan extends et\nclass Dog {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog d = new Dog();\n    d.name = "Rex";\n    System.out.println(d.name);\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Rex", label: "Çıktı Rex" },
      { type: "regex", value: "class\\s+Dog\\s+extends\\s+Animal", label: "Dog, Animal'dan extends ediyor" },
    ],
  },
  {
    id: "java-302",
    level: 302,
    language: "java",
    title: "super",
    description: "Üst sınıfın constructor ve metotlarına eriş.",
    explanation:
      "`super` anahtar kelimesi, alt sınıftan üst sınıfın constructor'ını veya metotlarını çağırmak için kullanılır.\n`super(...)` constructor'ın ilk satırında olmalıdır.",
    example: `class Animal {\n  Animal(String s) { System.out.println(s); }\n}\nclass Cat extends Animal {\n  Cat() { super("meow"); }\n}`,
    hints: [
      "Animal sınıfına bir constructor ekle, name alanını ata.",
      "Dog sınıfının constructor'ında super(name) çağır.",
      "Dog(String name) { super(name); } şeklinde yaz.",
    ],
    challenge:
      "Animal sınıfına Animal(String name) constructor'ı ekle (this.name = name). Dog extends Animal olsun, Dog(String name) constructor'ında super(name) çağır. Main'de new Dog(\"Rex\") oluşturup name alanını yazdır.",
    files: [
      {
        name: "Main.java",
        content: `class Animal {\n  String name;\n  // TODO: Animal(String name) constructor ekle\n}\n\nclass Dog extends Animal {\n  // TODO: Dog(String name) constructor ekle, super(name) çağır\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog d = new Dog("Rex");\n    System.out.println(d.name);\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Rex", label: "Çıktı Rex" },
      { type: "regex", value: "super\\(name\\)", label: "super(name) çağrılmış" },
    ],
  },
  {
    id: "java-303",
    level: 303,
    language: "java",
    title: "@Override",
    description: "Üst sınıf metodunu ezerek yeniden tanımla.",
    explanation:
      "`@Override` anotasyonu, bir metodun üst sınıftaki bir metodu ezdiğini (override) belirtir ve hataları erken yakalamaya yardım eder.\nMetot imzası (isim, parametreler) aynı olmalıdır.",
    example: `class Animal {\n  void speak() { System.out.println("..."); }\n}\nclass Cat extends Animal {\n  @Override\n  void speak() { System.out.println("Meow"); }\n}`,
    hints: [
      "Animal sınıfında void speak() metodu tanımla.",
      "Dog sınıfında aynı imzalı speak() metodunu @Override ile ez.",
      'Dog.speak() içinde System.out.println("Woof"); yaz.',
    ],
    challenge:
      "Animal sınıfında void speak() metodu \"...\" yazdırsın. Dog extends Animal olsun ve speak() metodunu @Override ile \"Woof\" yazacak şekilde ez. Main'de Dog nesnesiyle speak() çağır.",
    files: [
      {
        name: "Main.java",
        content: `class Animal {\n  void speak() {\n    System.out.println("...");\n  }\n}\n\nclass Dog extends Animal {\n  // TODO: speak() metodunu @Override ile ez, "Woof" yazdır\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Dog d = new Dog();\n    d.speak();\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Woof", label: "Çıktı Woof" },
      { type: "regex", value: "@Override", label: "@Override kullanılmış" },
    ],
  },
  {
    id: "java-304",
    level: 304,
    language: "java",
    title: "Polimorfizm",
    description: "Üst sınıf referansıyla alt sınıf davranışı.",
    explanation:
      "Polimorfizm, bir üst sınıf referansının çalışma zamanında alt sınıfın override edilmiş metodunu çağırmasıdır.\nBu sayede farklı türdeki nesneleri aynı arayüzle işleyebilirsin.",
    example: `Animal a = new Dog();\na.speak(); // Dog'un speak() metodu çalışır`,
    hints: [
      "Animal sınıfında speak() metodu olsun, Dog ve Cat bunu override etsin.",
      "Animal a = new Dog(); şeklinde üst sınıf referansı kullan.",
      "a.speak(); çağrısı Dog'un metodunu çalıştırır.",
    ],
    challenge:
      "Animal sınıfında void speak() (\"...\" yazdıran) tanımla. Dog ve Cat sınıfları Animal'dan extends edip speak()'i sırasıyla \"Woof\" ve \"Meow\" olarak override etsin. Main'de Animal a = new Dog(); a.speak(); yaz.",
    files: [
      {
        name: "Main.java",
        content: `class Animal {\n  void speak() {\n    System.out.println("...");\n  }\n}\n\nclass Dog extends Animal {\n  @Override\n  void speak() {\n    System.out.println("Woof");\n  }\n}\n\nclass Cat extends Animal {\n  @Override\n  void speak() {\n    System.out.println("Meow");\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: Animal a = new Dog(); a.speak();\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Woof", label: "Çıktı Woof" },
      { type: "regex", value: "Animal\\s+a\\s*=\\s*new\\s+Dog\\(\\)", label: "Üst sınıf referansı kullanılmış" },
    ],
  },
  {
    id: "java-305",
    level: 305,
    language: "java",
    title: "Abstract class",
    description: "Soyut sınıf ve soyut metot tanımla.",
    explanation:
      "`abstract class` doğrudan nesnesi oluşturulamayan bir sınıftır; içinde `abstract` metotlar tanımlanabilir.\nAlt sınıflar bu soyut metotları mutlaka implement etmelidir.",
    example: `abstract class Shape {\n  abstract double area();\n}\nclass Circle extends Shape {\n  double r;\n  double area() { return 3.14 * r * r; }\n}`,
    hints: [
      "abstract class Shape { abstract double area(); } tanımla.",
      "Square extends Shape yap, area() metodunu implement et (side*side).",
      "Main'de Square s = new Square(4); System.out.println(s.area());",
    ],
    challenge:
      "abstract class Shape içinde abstract double area(); tanımla. Square extends Shape sınıfına double side alanı ve constructor ekle, area()'yı side*side olarak implement et. Main'de Square(4) oluşturup area() yazdır.",
    files: [
      {
        name: "Main.java",
        content: `abstract class Shape {\n  abstract double area();\n}\n\nclass Square extends Shape {\n  double side;\n  public Square(double side) {\n    this.side = side;\n  }\n  // TODO: area() metodunu implement et\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Square s = new Square(4);\n    System.out.println(s.area());\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "16.0", label: "Çıktı 16.0" },
      { type: "regex", value: "abstract\\s+class\\s+Shape", label: "Shape abstract class" },
      { type: "regex", value: "abstract\\s+double\\s+area", label: "area() abstract metot" },
    ],
  },
  {
    id: "java-306",
    level: 306,
    language: "java",
    title: "interface / implements",
    description: "Arayüz tanımla ve uygula.",
    explanation:
      "`interface`, sınıfların uygulaması gereken bir sözleşme tanımlar; metotların gövdesi yoktur (varsayılan/statik hariç).\nBir sınıf `implements` ile bir arayüzü uygular ve tüm metotlarını gerçeklemelidir.",
    example: `interface Greetable {\n  void greet();\n}\nclass Person implements Greetable {\n  public void greet() { System.out.println("Hi"); }\n}`,
    hints: [
      "interface Movable { void move(); } tanımla.",
      "class Car implements Movable { } yaz, move() metodunu implement et.",
      'move() içinde System.out.println("Car is moving"); yaz.',
    ],
    challenge:
      "interface Movable içinde void move(); tanımla. Car sınıfı Movable'ı implements etsin ve move() metodu \"Car is moving\" yazsın. Main'de Car nesnesiyle move() çağır.",
    files: [
      {
        name: "Main.java",
        content: `interface Movable {\n  void move();\n}\n\n// TODO: Car sınıfını Movable'ı implements edecek şekilde tanımla\nclass Car {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Car c = new Car();\n    c.move();\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Car is moving", label: "Çıktı doğru" },
      { type: "regex", value: "class\\s+Car\\s+implements\\s+Movable", label: "Car, Movable'ı implements ediyor" },
    ],
  },
  {
    id: "java-307",
    level: 307,
    language: "java",
    title: "Çoklu arayüz",
    description: "Bir sınıf birden fazla arayüz uygular.",
    explanation:
      "Java'da bir sınıf çoklu kalıtım yapamaz ama virgülle ayırarak birden fazla arayüzü aynı anda `implements` edebilir.\nBöylece farklı davranış sözleşmeleri tek sınıfta birleşir.",
    example: `interface A { void a(); }\ninterface B { void b(); }\nclass C implements A, B {\n  public void a() {}\n  public void b() {}\n}`,
    hints: [
      "interface Flyable { void fly(); } ve interface Swimmable { void swim(); } tanımla.",
      "class Duck implements Flyable, Swimmable { } yaz.",
      "fly() ve swim() metotlarını implement edip ilgili metinleri yazdır.",
    ],
    challenge:
      "Flyable (fly()) ve Swimmable (swim()) arayüzlerini tanımla. Duck sınıfı ikisini de implements etsin; fly() \"Flying\", swim() \"Swimming\" yazdırsın. Main'de her ikisini de çağır.",
    files: [
      {
        name: "Main.java",
        content: `interface Flyable {\n  void fly();\n}\n\ninterface Swimmable {\n  void swim();\n}\n\n// TODO: Duck sınıfını Flyable ve Swimmable implements edecek şekilde yaz\nclass Duck {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Duck d = new Duck();\n    d.fly();\n    d.swim();\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Flying\nSwimming", label: "Çıktı sırası doğru" },
      { type: "regex", value: "class\\s+Duck\\s+implements\\s+Flyable\\s*,\\s*Swimmable", label: "Duck iki arayüzü de implements ediyor" },
    ],
  },
  {
    id: "java-308",
    level: 308,
    language: "java",
    title: "instanceof",
    description: "Nesnenin tipini kontrol et.",
    explanation:
      "`instanceof` operatörü bir nesnenin belirli bir sınıf veya arayüz türünde olup olmadığını kontrol eder.\nGenelde downcast yapmadan önce güvenlik kontrolü olarak kullanılır.",
    example: `Object o = "hello";\nif (o instanceof String) {\n  System.out.println("String!");\n}`,
    hints: [
      "Animal a = new Dog(); tanımla.",
      "if (a instanceof Dog) koşulunu yaz.",
      'true ise System.out.println("It is a Dog"); yazdır.',
    ],
    challenge:
      "Animal sınıfı ve ondan extends eden Dog sınıfı zaten tanımlı. Main'de Animal a = new Dog(); oluştur, instanceof ile Dog olup olmadığını kontrol et ve doğruysa \"It is a Dog\" yazdır.",
    files: [
      {
        name: "Main.java",
        content: `class Animal {\n}\n\nclass Dog extends Animal {\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Animal a = new Dog();\n    // TODO: instanceof ile kontrol et ve yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "It is a Dog", label: "Çıktı doğru" },
      { type: "regex", value: "instanceof\\s+Dog", label: "instanceof kullanılmış" },
    ],
  },
  {
    id: "java-309",
    level: 309,
    language: "java",
    title: "try/catch/finally",
    description: "İstisnaları yakala ve işle.",
    explanation:
      "`try` bloğunda hata olabilecek kod çalıştırılır, `catch` hatayı yakalar, `finally` her durumda çalışır.\nHatalı durumda program çökmez, kontrollü şekilde devam eder.",
    example: `try {\n  int x = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println("Error: " + e.getMessage());\n} finally {\n  System.out.println("Done");\n}`,
    hints: [
      "try bloğunda 10/0 işlemini yap.",
      "catch (ArithmeticException e) ile yakala ve mesaj yazdır.",
      'finally bloğunda System.out.println("Done"); yaz.',
    ],
    challenge:
      "try içinde 10/0 böl işlemini yap, ArithmeticException yakala ve \"Error occurred\" yazdır, finally bloğunda \"Done\" yazdır.",
    files: [
      {
        name: "Main.java",
        content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: try/catch/finally ekle\n    int x = 10 / 0;\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Error occurred\nDone", label: "Çıktı sırası doğru" },
      { type: "regex", value: "catch\\s*\\(\\s*ArithmeticException", label: "ArithmeticException yakalanmış" },
      { type: "regex", value: "finally\\s*\\{", label: "finally bloğu var" },
    ],
  },
  {
    id: "java-310",
    level: 310,
    language: "java",
    title: "Custom exception (throw new)",
    description: "Kendi istisna sınıfını oluştur ve fırlat.",
    explanation:
      "Kendi hata türünü tanımlamak için `Exception`'dan extends eden bir sınıf yazılır.\n`throw new MyException(...)` ile bu hata fırlatılır ve `catch` ile yakalanır.",
    example: `class MyException extends Exception {\n  MyException(String m) { super(m); }\n}\nthrow new MyException("Hata!");`,
    hints: [
      "class InvalidAgeException extends Exception { InvalidAgeException(String m) { super(m); } } tanımla.",
      "checkAge metodunda yaş negatifse throw new InvalidAgeException(\"Negative age\"); yap.",
      "Main'de try/catch ile çağır, catch bloğunda e.getMessage() yazdır.",
    ],
    challenge:
      "InvalidAgeException sınıfını (extends Exception) tanımla. checkAge(int age) metodu age < 0 ise throw new InvalidAgeException(\"Negative age\"); yapsın (throws Exception ile). Main'de checkAge(-5) çağır, try/catch ile yakala, e.getMessage() yazdır.",
    files: [
      {
        name: "Main.java",
        content: `// TODO: InvalidAgeException sınıfını Exception'dan extends et\nclass InvalidAgeException {\n}\n\nclass Validator {\n  static void checkAge(int age) throws Exception {\n    if (age < 0) {\n      // TODO: throw new InvalidAgeException("Negative age");\n    }\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    try {\n      Validator.checkAge(-5);\n    } catch (Exception e) {\n      System.out.println(e.getMessage());\n    }\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Negative age", label: "Çıktı doğru" },
      { type: "regex", value: "class\\s+InvalidAgeException\\s+extends\\s+Exception", label: "Custom exception Exception'dan extends ediyor" },
      { type: "regex", value: "throw\\s+new\\s+InvalidAgeException", label: "Exception fırlatılmış" },
    ],
  },
  {
    id: "java-311",
    level: 311,
    language: "java",
    title: "Wrapper classes / autoboxing",
    description: "İlkel tipleri nesneye çevir.",
    explanation:
      "`Integer`, `Double`, `Boolean` gibi wrapper sınıflar ilkel tipleri nesneye sarar.\nAutoboxing sayesinde `int` otomatik olarak `Integer`'a dönüşür, `unboxing` ile tersi olur.",
    example: `Integer x = 5; // autoboxing\nint y = x;      // unboxing\nSystem.out.println(x + y);`,
    hints: [
      "Integer boxed = 42; şeklinde tanımla (autoboxing).",
      "int unboxed = boxed; ile geri çevir (unboxing).",
      "İkisinin toplamını System.out.println ile yazdır.",
    ],
    challenge: "Integer boxed = 42; tanımla, int unboxed = boxed; yap, boxed + unboxed toplamını yazdır.",
    files: [
      {
        name: "Main.java",
        content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Integer boxed = 42; ve int unboxed = boxed; ekle\n    // TODO: toplamlarını yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "84", label: "Çıktı 84" },
      { type: "regex", value: "Integer\\s+boxed\\s*=\\s*42", label: "Autoboxing kullanılmış" },
    ],
  },
  {
    id: "java-312",
    level: 312,
    language: "java",
    title: "ArrayList",
    description: "Dinamik boyutlu liste kullan.",
    explanation:
      "`ArrayList`, boyutu otomatik büyüyen dizidir; `java.util` paketinden gelir.\n`add`, `get`, `size` gibi metotlarla eleman ekler ve okursun.",
    example: `ArrayList<String> names = new ArrayList<>();\nnames.add("Ali");\nSystem.out.println(names.get(0));`,
    hints: [
      "import java.util.ArrayList; ekle.",
      "ArrayList<String> fruits oluştur, \"Apple\", \"Banana\" ekle.",
      "for döngüsüyle veya System.out.println(fruits); ile hepsini yazdır.",
    ],
    challenge:
      "ArrayList<String> fruits oluştur, sırayla \"Apple\" ve \"Banana\" ekle, System.out.println(fruits); ile yazdır.",
    files: [
      {
        name: "Main.java",
        content: `import java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: ArrayList<String> fruits oluştur, ekle, yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "[Apple, Banana]", label: "Çıktı doğru" },
      { type: "regex", value: "ArrayList<String>", label: "ArrayList<String> kullanılmış" },
    ],
  },
  {
    id: "java-313",
    level: 313,
    language: "java",
    title: "LinkedList",
    description: "Bağlı liste veri yapısını kullan.",
    explanation:
      "`LinkedList`, elemanları düğümler halinde bağlı tutan bir listedir; başa/sona ekleme çıkarma işlemleri hızlıdır.\n`List` arayüzünü uygular, `ArrayList` ile benzer metotları paylaşır.",
    example: `LinkedList<Integer> nums = new LinkedList<>();\nnums.addFirst(1);\nnums.addLast(2);\nSystem.out.println(nums);`,
    hints: [
      "import java.util.LinkedList; ekle.",
      "LinkedList<Integer> nums oluştur, addFirst(2), addLast(3) çağır.",
      "System.out.println(nums); ile [2, 3] yazdır.",
    ],
    challenge:
      "LinkedList<Integer> nums oluştur, addFirst(2) sonra addLast(3) çağır, System.out.println(nums); ile yazdır.",
    files: [
      {
        name: "Main.java",
        content: `import java.util.LinkedList;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: LinkedList<Integer> nums oluştur, addFirst/addLast kullan, yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "[2, 3]", label: "Çıktı doğru" },
      { type: "regex", value: "LinkedList<Integer>", label: "LinkedList<Integer> kullanılmış" },
      { type: "regex", value: "addFirst\\(", label: "addFirst kullanılmış" },
    ],
  },
  {
    id: "java-314",
    level: 314,
    language: "java",
    title: "HashSet",
    description: "Tekrarsız eleman koleksiyonu.",
    explanation:
      "`HashSet`, aynı elemanı bir kez tutan sırasız bir koleksiyondur; tekrar eden `add` çağrıları göz ardı edilir.\nİçinde eleman olup olmadığını `contains` ile kontrol edebilirsin.",
    example: `HashSet<String> set = new HashSet<>();\nset.add("a");\nset.add("a");\nSystem.out.println(set.size());`,
    hints: [
      "import java.util.HashSet; ekle.",
      "HashSet<String> colors oluştur, \"red\" iki kez, \"blue\" bir kez ekle.",
      "set.size() ve set.contains(\"red\") sonuçlarını yazdır.",
    ],
    challenge:
      "HashSet<String> colors oluştur, \"red\" ekle, \"red\" tekrar ekle, \"blue\" ekle. colors.size() değerini yazdır (tekrarlar sayılmaz), sonra colors.contains(\"red\") sonucunu yazdır.",
    files: [
      {
        name: "Main.java",
        content: `import java.util.HashSet;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: HashSet<String> colors oluştur, red/blue ekle, size ve contains yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "2\ntrue", label: "size ve contains doğru" },
      { type: "regex", value: "HashSet<String>", label: "HashSet<String> kullanılmış" },
    ],
  },
  {
    id: "java-315",
    level: 315,
    language: "java",
    title: "HashMap",
    description: "Anahtar-değer eşleşmeleri sakla.",
    explanation:
      "`HashMap`, her anahtarın (key) bir değere (value) eşlendiği bir koleksiyondur.\n`put` ile ekler, `get` ile anahtara göre değeri okursun.",
    example: `HashMap<String, Integer> ages = new HashMap<>();\nages.put("Ali", 20);\nSystem.out.println(ages.get("Ali"));`,
    hints: [
      "import java.util.HashMap; ekle.",
      'HashMap<String, Integer> scores oluştur, "Ali" -> 90, "Ada" -> 85 koy.',
      'scores.get("Ali") sonucunu System.out.println ile yazdır.',
    ],
    challenge:
      "HashMap<String, Integer> scores oluştur, \"Ali\" -> 90 ve \"Ada\" -> 85 ekle (put). scores.get(\"Ali\") değerini yazdır.",
    files: [
      {
        name: "Main.java",
        content: `import java.util.HashMap;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: HashMap<String, Integer> scores oluştur, put ile ekle, get ile yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "90", label: "Çıktı 90" },
      { type: "regex", value: "HashMap<String,\\s*Integer>", label: "HashMap<String, Integer> kullanılmış" },
      { type: "regex", value: "\\.put\\(", label: "put metodu kullanılmış" },
    ],
  },
  {
    id: "java-316",
    level: 316,
    language: "java",
    title: "Collections.sort / Comparable",
    description: "Listeleri sırala, Comparable uygula.",
    explanation:
      "`Collections.sort(list)` bir listeyi doğal sıraya göre sıralar; özel sınıflar için `Comparable<T>` uygulanıp `compareTo` yazılır.\nBöylece kendi nesnelerini de sıralayabilirsin.",
    example: `class Item implements Comparable<Item> {\n  int value;\n  public int compareTo(Item o) { return Integer.compare(value, o.value); }\n}`,
    hints: [
      "import java.util.ArrayList; ve import java.util.Collections; ekle.",
      "ArrayList<Integer> nums oluştur, 5, 1, 3 ekle.",
      "Collections.sort(nums); çağırıp System.out.println(nums); ile yazdır.",
    ],
    challenge:
      "ArrayList<Integer> nums oluştur, sırayla 5, 1, 3 ekle. Collections.sort(nums); ile sırala ve yazdır (beklenen [1, 3, 5]).",
    files: [
      {
        name: "Main.java",
        content: `import java.util.ArrayList;\nimport java.util.Collections;\n\npublic class Main {\n  public static void main(String[] args) {\n    // TODO: nums oluştur, 5,1,3 ekle, Collections.sort ile sırala, yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "[1, 3, 5]", label: "Sıralı çıktı doğru" },
      { type: "regex", value: "Collections\\.sort\\(", label: "Collections.sort kullanılmış" },
    ],
  },
  {
    id: "java-317",
    level: 317,
    language: "java",
    title: "Lambda ifadeleri",
    description: "Kısa fonksiyonel arayüz uygulamaları yaz.",
    explanation:
      "Lambda ifadesi `(parametreler) -> gövde` biçiminde, fonksiyonel bir arayüzü kısaca uygulamanı sağlar.\nÖrneğin `Runnable`, `Comparator` gibi tek metotlu arayüzlerde sık kullanılır.",
    example: `Runnable r = () -> System.out.println("Hi");\nr.run();`,
    hints: [
      "Runnable r = () -> System.out.println(\"Hello Lambda\"); tanımla.",
      "r.run(); ile çalıştır.",
      "Lambda söz dizimi: (parametreler) -> { ... }",
    ],
    challenge: "Runnable arayüzünü lambda ile uygula, çalıştırıldığında \"Hello Lambda\" yazdırsın. Sonra r.run(); çağır.",
    files: [
      {
        name: "Main.java",
        content: `public class Main {\n  public static void main(String[] args) {\n    // TODO: Runnable r = () -> ...; ve r.run(); ekle\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Hello Lambda", label: "Çıktı doğru" },
      { type: "regex", value: "->", label: "Lambda operatörü kullanılmış" },
    ],
  },
  {
    id: "java-318",
    level: 318,
    language: "java",
    title: "Stream filter/map",
    description: "Koleksiyonları stream ile işle.",
    explanation:
      "`stream()` bir koleksiyonu fonksiyonel işlemlere açar; `filter` elemanları süzer, `map` her elemanı dönüştürür.\nBu işlemler zincirlenerek okunabilir veri işleme kodu yazılır.",
    example: `list.stream()\n  .filter(x -> x > 2)\n  .map(x -> x * 2)\n  .forEach(System.out::println);`,
    hints: [
      "import java.util.Arrays; ve import java.util.List; ekle.",
      "List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5); oluştur.",
      "nums.stream().filter(x -> x % 2 == 0).map(x -> x * 10).forEach(System.out::println); yaz.",
    ],
    challenge:
      "List<Integer> nums = Arrays.asList(1,2,3,4,5); oluştur. stream() ile çift sayıları filtrele, her birini 10 ile çarp ve forEach(System.out::println) ile yazdır (beklenen 20 ve 40, ayrı satırlarda).",
    files: [
      {
        name: "Main.java",
        content: `import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\n    // TODO: stream().filter().map().forEach() zinciri yaz\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "20\n40", label: "Çıktı doğru" },
      { type: "regex", value: "\\.stream\\(\\)", label: "stream() kullanılmış" },
      { type: "regex", value: "\\.filter\\(", label: "filter kullanılmış" },
    ],
  },
  {
    id: "java-319",
    level: 319,
    language: "java",
    title: "collect(Collectors.toList())",
    description: "Stream sonucunu tekrar listeye topla.",
    explanation:
      "`collect(Collectors.toList())`, bir stream işleminin sonucunu tekrar bir `List`'e dönüştürür.\nBöylece filtreleme/dönüştürme sonrası sonucu saklayıp kullanabilirsin.",
    example: `List<Integer> result = nums.stream()\n  .filter(x -> x > 1)\n  .collect(Collectors.toList());`,
    hints: [
      "import java.util.stream.Collectors; ekle.",
      "List<Integer> nums = Arrays.asList(1,2,3,4,5); oluştur.",
      "nums.stream().filter(x -> x > 2).collect(Collectors.toList()) sonucunu bir değişkene atayıp yazdır.",
    ],
    challenge:
      "List<Integer> nums = Arrays.asList(1,2,3,4,5); oluştur. stream().filter(x -> x > 2).collect(Collectors.toList()) ile 3'ten büyükleri yeni bir listeye topla ve System.out.println ile yazdır (beklenen [3, 4, 5]).",
    files: [
      {
        name: "Main.java",
        content: `import java.util.Arrays;\nimport java.util.List;\nimport java.util.stream.Collectors;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\n    // TODO: filter + collect(Collectors.toList()) kullan, yazdır\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "[3, 4, 5]", label: "Çıktı doğru" },
      { type: "regex", value: "collect\\(Collectors\\.toList\\(\\)\\)", label: "collect(Collectors.toList()) kullanılmış" },
    ],
  },
  {
    id: "java-320",
    level: 320,
    language: "java",
    title: "Final: banka hesap yönetimi sistemi",
    description: "Account sınıfıyla para yatır/çek, yetersiz bakiyede hata fırlat.",
    explanation:
      "Bu final projede öğrendiğin sınıf, kapsülleme, exception konularını birleştireceksin.\n`Account` sınıfı bakiyeyi tutar; para çekerken bakiye yetersizse özel bir istisna fırlatılır.",
    example: `class Account {\n  private double balance;\n  void deposit(double amount) { balance += amount; }\n}`,
    hints: [
      "InsufficientFundsException sınıfını Exception'dan extends et.",
      "Account sınıfında private double balance, deposit(double) ve withdraw(double) (throws Exception) metotlarını yaz; withdraw'da amount > balance ise throw new InsufficientFundsException(\"Insufficient funds\");",
      "Main'de Account oluştur, deposit(100), withdraw(150) çağır, try/catch ile e.getMessage() yazdır; sonra getBalance() yazdır.",
    ],
    challenge:
      "InsufficientFundsException (extends Exception) tanımla. Account sınıfında private double balance, getBalance(), deposit(double amount) (balance += amount) ve withdraw(double amount) throws Exception (amount > balance ise InsufficientFundsException fırlat, aksi halde balance -= amount) metotlarını yaz. Main'de bir Account oluştur, deposit(100) yap, withdraw(150) çağırıp try/catch ile hatayı yazdır, ardından getBalance() değerini yazdır.",
    files: [
      {
        name: "Main.java",
        content: `// TODO: InsufficientFundsException sınıfını Exception'dan extends et\nclass InsufficientFundsException {\n  InsufficientFundsException(String m) {\n  }\n}\n\nclass Account {\n  private double balance = 0;\n\n  public double getBalance() {\n    return balance;\n  }\n\n  public void deposit(double amount) {\n    balance += amount;\n  }\n\n  // TODO: withdraw(double amount) throws Exception metodunu yaz\n  public void withdraw(double amount) throws Exception {\n  }\n}\n\npublic class Main {\n  public static void main(String[] args) {\n    Account acc = new Account();\n    acc.deposit(100);\n    try {\n      acc.withdraw(150);\n    } catch (Exception e) {\n      System.out.println(e.getMessage());\n    }\n    System.out.println(acc.getBalance());\n  }\n}`,
      },
    ],
    checks: [
      { type: "output-exact", value: "Insufficient funds\n100.0", label: "Çıktı sırası ve değerler doğru" },
      { type: "regex", value: "class\\s+InsufficientFundsException\\s+extends\\s+Exception", label: "Custom exception Exception'dan extends ediyor" },
      { type: "regex", value: "throw\\s+new\\s+InsufficientFundsException", label: "Exception fırlatılmış" },
      { type: "regex", value: "withdraw\\s*\\(\\s*double\\s+amount\\s*\\)\\s*throws\\s+Exception", label: "withdraw metodu throws Exception" },
    ],
  },
];
