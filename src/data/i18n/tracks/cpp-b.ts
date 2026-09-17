import type { TrackTranslations } from "../types";

export const CPP_B_EN: TrackTranslations = {
  "cpp-246": {
    title: "Dynamic arrays with new and delete",
    description: "Create a dynamic array with new[], and free the memory with delete[].",
    explanation:
      "`new int[n]` creates an array whose size is determined at runtime (on the heap instead of the stack).\nWhen you're done, you must free the memory with `delete[] arr;`, otherwise you get a memory leak.",
    example: "int n = 3;\nint* arr = new int[n];\narr[0] = 10;\nstd::cout << arr[0];\ndelete[] arr;",
    hints: [
      "Create a 5-element dynamic array with new int[5].",
      "Assign values to the array's elements using an index (arr[i]) and print them.",
      "int* arr = new int[3]; arr[0]=1; arr[1]=2; arr[2]=3; std::cout << arr[0]+arr[1]+arr[2]; delete[] arr;",
    ],
    challenge: "Create a dynamic array with new int[3], assign the values 1, 2, 3, print their sum (6), then free it with delete[].",
    files: {
      "main.cpp": "#include <iostream>\n\nint main() {\n    // TODO: create an array with new int[3], assign 1 2 3, print their sum, then delete[]\n    return 0;\n}",
    },
    checks: ["new int[] used", "delete[] used", "Output contains 6"],
  },
  "cpp-247": {
    title: "Defining a struct",
    description: "Use struct to define a new type that groups multiple fields together.",
    explanation:
      "A `struct` groups related data under a single type.\nIts members are accessed with the dot operator (`.`): `student.name`.",
    example: "struct Student {\n    std::string name;\n    int age;\n};\n\nStudent s;\ns.name = \"Ali\";\ns.age = 20;\nstd::cout << s.name;",
    hints: [
      "Define a struct like struct Point { int x; int y; };",
      "Create a variable of type Point and assign values to its x and y fields.",
      "struct Point { int x; int y; }; Point p; p.x = 3; p.y = 4; std::cout << p.x + p.y;",
    ],
    challenge: "Define a struct named Nokta (int x, int y). Assign x=3, y=4, print their sum (7).",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: struct Nokta { int x; int y; };\n\nint main() {\n    // TODO: create Nokta p, assign x=3 y=4, print the sum\n    return 0;\n}",
    },
    checks: ["struct Nokta is defined", "Output contains 7"],
  },
  "cpp-248": {
    title: "Array of structs",
    description: "Create an array from a struct type and iterate over it with a loop.",
    explanation:
      "Defining an array of a struct type works just like a normal array: `Student students[3];`.\nEach element is accessed as `students[i].field` and can be processed in a loop.",
    example: "struct Student { std::string name; int grade; };\nStudent list[2];\nlist[0].grade = 80;\nlist[1].grade = 90;\nfor (int i = 0; i < 2; i++) std::cout << list[i].grade << \" \";",
    hints: [
      "Define struct Ogrenci { std::string ad; int not_; };",
      "Create an array Ogrenci liste[3]; and assign values to the not_ fields using a for loop.",
      "for (int i = 0; i < 3; i++) { liste[i].not_ = (i+1)*10; std::cout << liste[i].not_ << \" \"; }",
    ],
    challenge: "Create a 3-element array of the Ogrenci struct (with an int not_ field), assign 10, 20, 30 to them in order, and print them with a for loop (\"10 20 30 \").",
    files: {
      "main.cpp": "#include <iostream>\n#include <string>\n\nstruct Ogrenci {\n    std::string ad;\n    int not_;\n};\n\nint main() {\n    // TODO: create Ogrenci liste[3], assign 10 20 30, print in a loop\n    return 0;\n}",
    },
    checks: ["3-element struct array", "for loop used", "Output contains '10 20 30'"],
  },
  "cpp-249": {
    title: "class basics",
    description: "Define a type with the class keyword that contains member variables and methods.",
    explanation:
      "`class` is similar to struct, but its members are `private` by default. Methods (functions) are written inside the class.\nThe `public:` label is used for access from outside.",
    example: "class Animal {\npublic:\n    std::string name;\n    void makeSound() {\n        std::cout << name << \" made a sound\";\n    }\n};\n\nAnimal a;\na.name = \"Cat\";\na.makeSound();",
    hints: [
      "Define a class like class Araba { public: ... };",
      "Add a public int hiz member inside it and a method that prints it.",
      "class Araba { public: int hiz; void bilgi() { std::cout << \"Hiz: \" << hiz; } };",
    ],
    challenge: "Define a class named Araba (with a public int hiz member and a bilgi() method that prints 'Hiz: <hiz>'). Assign hiz=120, call bilgi().",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Araba (public int hiz, void bilgi() method)\n\nint main() {\n    // TODO: create an Araba object, assign hiz=120, call bilgi()\n    return 0;\n}",
    },
    checks: ["class Araba is defined", "public label used", "Output contains 'Hiz: 120'"],
  },
  "cpp-250": {
    title: "Constructor",
    description: "Write a constructor with the same name as the class to assign values while creating the object.",
    explanation:
      "A constructor is a special function that has the same name as the class and runs automatically when an object is created.\nIt's used to assign initial values to members: `Nokta(int x, int y) { this->x = x; this->y = y; }`.",
    example: "class Nokta {\npublic:\n    int x, y;\n    Nokta(int a, int b) {\n        x = a;\n        y = b;\n    }\n};\nNokta p(3, 4);\nstd::cout << p.x;",
    hints: [
      "Define a parameterized function (constructor) with the same name as the class.",
      "Inside the constructor, assign the parameters to the member variables.",
      "class Kutu { public: int genislik; Kutu(int g) { genislik = g; } };  Kutu k(5); std::cout << k.genislik;",
    ],
    challenge: "Define a class named Kutu (public int genislik), set genislik with the Kutu(int g) constructor. Create Kutu k(7); and print genislik (7).",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Kutu, assign genislik via a constructor\n\nint main() {\n    // TODO: create Kutu k(7); and print genislik\n    return 0;\n}",
    },
    checks: ["Constructor is defined", "Output contains 7"],
  },
  "cpp-251": {
    title: "Getter / Setter",
    description: "Write getter and setter methods to access private member variables.",
    explanation:
      "`private` members cannot be accessed directly from outside the class, so getter methods like `getX()` and setter methods like `setX()` are used.\nThis approach allows the data to be changed in a controlled way (encapsulation).",
    example: "class Account {\nprivate:\n    int balance;\npublic:\n    void setBalance(int b) { balance = b; }\n    int getBalance() { return balance; }\n};\nAccount a;\na.setBalance(100);\nstd::cout << a.getBalance();",
    hints: [
      "Define a private int yas member.",
      "Write public setYas(int) and getYas() methods.",
      "class Kisi { private: int yas; public: void setYas(int y) { yas = y; } int getYas() { return yas; } };",
    ],
    challenge: "Define a class named Kisi with a private int yas member and public setYas(int) and getYas() methods. Set yas=25 and print it with getYas().",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Kisi (private int yas, setYas, getYas)\n\nint main() {\n    // TODO: create a Kisi object, set yas=25, print with getYas\n    return 0;\n}",
    },
    checks: ["private label used", "setYas method exists", "Output contains 25"],
  },
  "cpp-252": {
    title: "The this pointer",
    description: "Use this to refer to the current object and resolve name conflicts.",
    explanation:
      "`this` is a pointer that holds the address of the object it was called on.\nIf a parameter name is the same as a member variable, `this->isim = isim;` clarifies which one is meant.",
    example: "class Person {\npublic:\n    std::string name;\n    Person(std::string name) {\n        this->name = name;\n    }\n};\nPerson p(\"Ayse\");\nstd::cout << p.name;",
    hints: [
      "Give the constructor parameter the same name as the member variable (isim).",
      "Assign it as this->isim = isim;",
      "class Urun { public: std::string isim; Urun(std::string isim) { this->isim = isim; } };",
    ],
    challenge: "Define a class named Urun (public std::string isim), using this->isim = isim; in the Urun(std::string isim) constructor. Create Urun u(\"Kalem\"); and print isim.",
    files: {
      "main.cpp": "#include <iostream>\n#include <string>\n\n// TODO: define class Urun, assign isim using this\n\nint main() {\n    // TODO: create Urun u(\"Kalem\") and print isim\n    return 0;\n}",
    },
    checks: ["this->isim used", "Output contains 'Kalem'"],
  },
  "cpp-253": {
    title: "static member",
    description: "Use a static member variable to keep a value shared across all objects.",
    explanation:
      "A `static` member variable is shared by all objects of the class; each object doesn't get its own copy.\nIt must be defined once outside the class: `int Sayac::adet = 0;`.",
    example: "class Counter {\npublic:\n    static int count;\n    Counter() { count++; }\n};\nint Counter::count = 0;\nCounter a, b;\nstd::cout << Counter::count;",
    hints: [
      "Define static int adet; inside the class.",
      "Give it an initial value outside the class with int Sayac::adet = 0;",
      "Increment adet++; inside the constructor so each new object increases the counter.",
    ],
    challenge: "Define a class named Sayac with a static int adet member, incremented (adet++) whenever an object is created. Create 3 objects and print the value of Sayac::adet (3).",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Sayac (static int adet), adet++ in the constructor\n\nint main() {\n    // TODO: create 3 objects, print Sayac::adet\n    return 0;\n}",
    },
    checks: ["static int adet is defined", "static member accessed outside the class", "Output contains 3"],
  },
  "cpp-254": {
    title: "Inheritance",
    description: "Create a derived subclass from a class and inherit its members/methods.",
    explanation:
      "With inheritance, `class Kopek : public Hayvan` makes `Kopek` inherit all of `Hayvan`'s public members.\nThis lets shared behaviors be reused without rewriting them.",
    example: "class Animal {\npublic:\n    void eat() { std::cout << \"Eating\"; }\n};\nclass Dog : public Animal {\npublic:\n    void bark() { std::cout << \"Woof!\"; }\n};\nDog d;\nd.eat();\nd.bark();",
    hints: [
      "Define class Hayvan { public: void sesCikar() { ... } };",
      "Derive Kedi from Hayvan with class Kedi : public Hayvan { ... };",
      "Create a Kedi object and call both Hayvan's and Kedi's methods.",
    ],
    challenge: "Define a class named Hayvan (public void sesCikar() { std::cout << \"Ses\"; }). Define a class named Kedi that publicly derives from Hayvan (public void miyavla() { std::cout << \"Miyav\"; }). Create Kedi k; and call sesCikar() and miyavla().",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Hayvan (sesCikar), class Kedi : public Hayvan (miyavla)\n\nint main() {\n    // TODO: create Kedi k; call sesCikar() and miyavla()\n    return 0;\n}",
    },
    checks: ["Kedi derives publicly from Hayvan", "Output contains 'Ses'", "Output contains 'Miyav'"],
  },
  "cpp-255": {
    title: "virtual and polymorphism",
    description: "Use virtual functions so that subclasses can override the behavior.",
    explanation:
      "A method marked `virtual` can behave differently when `override`d in a subclass.\nWhen called through a base class pointer/reference, the correct method runs based on the actual object's type (dynamic dispatch).",
    example: "class Shape {\npublic:\n    virtual void draw() { std::cout << \"Shape\"; }\n};\nclass Circle : public Shape {\npublic:\n    void draw() override { std::cout << \"Circle\"; }\n};\nShape* s = new Circle();\ns->draw();",
    hints: [
      "Define virtual void ciz() { ... } in the base class.",
      "Write void ciz() override { ... } with the same signature in the subclass.",
      "Test polymorphism with Sekil* s = new Daire(); s->ciz();",
    ],
    challenge: "Define a class named Sekil (virtual void ciz() { std::cout << \"Sekil\"; }). Define a class named Daire deriving from Sekil (void ciz() override { std::cout << \"Daire\"; }). Call s->ciz(); via Sekil* s = new Daire(); (output should be 'Daire').",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: class Sekil (virtual ciz), class Daire : public Sekil (ciz override)\n\nint main() {\n    // TODO: Sekil* s = new Daire(); s->ciz();\n    return 0;\n}",
    },
    checks: ["virtual void ciz is defined", "override used", "Output contains 'Daire'"],
  },
  "cpp-256": {
    title: "Operator overloading",
    description: "Define operator+ so that two objects can be added together with +.",
    explanation:
      "Operators can be redefined (`overloaded`) for classes in C++. For example, thanks to `operator+`, two `Nokta` objects can be added with `+`.\nThis lets code read like a mathematical expression.",
    example: "class Nokta {\npublic:\n    int x;\n    Nokta operator+(const Nokta& b) {\n        Nokta sonuc;\n        sonuc.x = x + b.x;\n        return sonuc;\n    }\n};",
    hints: [
      "Define int x and int y members inside class Nokta.",
      "Write a Nokta operator+(const Nokta& b) method to add x and y together.",
      "Nokta a; a.x=1; a.y=2; Nokta b; b.x=3; b.y=4; Nokta c = a + b; std::cout << c.x << \" \" << c.y;",
    ],
    challenge: "Define a class named Nokta (int x, y), overload operator+ so two Nokta objects can be added. Create a=(1,2), b=(3,4), c=a+b, print c.x and c.y separated by a space (\"4 6\").",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Nokta, overload operator+\n\nint main() {\n    // TODO: create a, b of type Nokta, compute c = a + b, print c.x and c.y\n    return 0;\n}",
    },
    checks: ["operator+ is defined", "Output contains '4 6'"],
  },
  "cpp-257": {
    title: "friend function",
    description: "Use the friend keyword to give an outside function access to private members.",
    explanation:
      "A function marked `friend` can access the class's `private` members without being part of the class.\nIt's usually used when two classes, or a class and an external function, need tight cooperation.",
    example: "class Box {\nprivate:\n    int length;\npublic:\n    Box(int l) : length(l) {}\n    friend void show(Box b);\n};\nvoid show(Box b) {\n    std::cout << b.length;\n}",
    hints: [
      "Define a private int deger member and a constructor inside the class.",
      "Add the line friend void goster(Kutu k); to the class.",
      "Write the function void goster(Kutu k) { std::cout << k.deger; } outside the class and call it.",
    ],
    challenge: "Define a class named Kutu (private int deger, constructor Kutu(int d)). Add friend void goster(Kutu k); which should print k.deger. Create Kutu k(42); and call goster(k);.",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Kutu (private int deger), friend void goster(Kutu k);\n\nint main() {\n    // TODO: create Kutu k(42); call goster(k)\n    return 0;\n}",
    },
    checks: ["friend function is defined", "Output contains 42"],
  },
  "cpp-258": {
    title: "Destructor",
    description: "Write a destructor with ~ClassName() that runs when an object is destroyed.",
    explanation:
      "A destructor is called automatically when an object goes out of scope or is deleted with `delete`.\nIt's mainly used to clean up memory obtained with `new` or to print a closing message.",
    example: "class Resource {\npublic:\n    Resource() { std::cout << \"Created \"; }\n    ~Resource() { std::cout << \"Destroyed\"; }\n};\n{\n    Resource r;\n}",
    hints: [
      "Print one message in the constructor and another in the destructor (~ClassName()) inside the class.",
      "The destructor definition starts with ~ and takes no parameters.",
      "class Kayit { public: Kayit() { std::cout << \"Baslangic \"; } ~Kayit() { std::cout << \"Bitis\"; } }; { Kayit k; }",
    ],
    challenge: "Define a class named Kayit, print \"Baslangic \" in the constructor and \"Bitis\" in the destructor (~Kayit()). Open a block {} in main and create a Kayit object (so the destructor fires when the block ends).",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define class Kayit (constructor prints 'Baslangic ', destructor prints 'Bitis')\n\nint main() {\n    {\n        // TODO: create a Kayit object\n    }\n    return 0;\n}",
    },
    checks: ["Destructor is defined", "Output is exactly 'Baslangic Bitis'"],
  },
  "cpp-259": {
    title: "Template function",
    description: "Write a generic function that works with any type using template <typename T>.",
    explanation:
      "Thanks to `template <typename T>`, a function can be used for different types without rewriting it.\nThe compiler automatically determines `T` based on the type of the argument in the function call.",
    example: "template <typename T>\nT add(T a, T b) {\n    return a + b;\n}\nstd::cout << add(3, 4);\nstd::cout << add(1.5, 2.5);",
    hints: [
      "Generalize the function with the line template <typename T>.",
      "The function should take two parameters of type T and return the larger one.",
      "template <typename T> T maksimum(T a, T b) { return (a > b) ? a : b; } std::cout << maksimum(3, 7) << \" \" << maksimum(2.5, 1.5);",
    ],
    challenge: "Write a template function named maksimum (taking two parameters of type T, returning the larger one). Call maksimum(3, 7) and maksimum(2.5, 1.5) and print the results separated by a space (\"7 2.5\").",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: write the function template <typename T> T maksimum(T a, T b)\n\nint main() {\n    // TODO: print maksimum(3,7) and maksimum(2.5,1.5)\n    return 0;\n}",
    },
    checks: ["template <typename T> used", "Output contains '7 2.5'"],
  },
  "cpp-260": {
    title: "Template class",
    description: "Write a generic class that holds data of any type using template <typename T>.",
    explanation:
      "A template class lets you create objects of different types, like `Kutu<int>` or `Kutu<std::string>`.\n`template <typename T>` is added before the class definition, and `T` is used in member variable/method types.",
    example: "template <typename T>\nclass Box {\npublic:\n    T value;\n    Box(T v) : value(v) {}\n};\nBox<int> b(5);\nstd::cout << b.value;",
    hints: [
      "Define a class with template <typename T>, add a member of type T and a constructor.",
      "You can create objects of different types like Kutu<int> and Kutu<std::string>.",
      "template <typename T> class Kutu { public: T deger; Kutu(T d) : deger(d) {} };  Kutu<int> k(9); std::cout << k.deger;",
    ],
    challenge: "Define a template class named Kutu (with a T deger member and constructor Kutu(T d)). Create Kutu<int> k(9); and print k.deger (9).",
    files: {
      "main.cpp": "#include <iostream>\n\n// TODO: define template <typename T> class Kutu\n\nint main() {\n    // TODO: create Kutu<int> k(9); and print k.deger\n    return 0;\n}",
    },
    checks: ["template class Kutu is defined", "Output contains 9"],
  },
  "cpp-261": {
    title: "std::vector",
    description: "Use std::vector for an array whose size can change dynamically.",
    explanation:
      "`std::vector<T>` is the most commonly used dynamic array type in C++; elements are added with `push_back`, and the size is obtained with `size()`.\nYou need to include the `<vector>` header.",
    example: "#include <vector>\nstd::vector<int> numbers;\nnumbers.push_back(10);\nnumbers.push_back(20);\nstd::cout << numbers[0] << \" \" << numbers.size();",
    hints: [
      "Add #include <vector>.",
      "Define a vector with std::vector<int> and add elements with push_back.",
      "std::vector<int> v; v.push_back(1); v.push_back(2); v.push_back(3); for (int x : v) std::cout << x << \" \";",
    ],
    challenge: "Create a std::vector<int>, add 1, 2, 3 with push_back, print all of them with a range-for separated by spaces (\"1 2 3 \").",
    files: {
      "main.cpp": "#include <iostream>\n#include <vector>\n\nint main() {\n    // TODO: create a vector<int>, push_back 1 2 3, print in a loop\n    return 0;\n}",
    },
    checks: ["std::vector<int> used", "push_back used", "Output contains '1 2 3'"],
  },
  "cpp-262": {
    title: "std::string methods",
    description: "Use string methods like length(), substr(), and find().",
    explanation:
      "`std::string` offers many useful methods: `length()` gives the length, `substr(start, length)` gets a substring, and `find(x)` searches.\nThese are commonly used in text processing.",
    example: "std::string s = \"Hello World\";\nstd::cout << s.length() << std::endl;\nstd::cout << s.substr(0, 5) << std::endl;",
    hints: [
      "Define a std::string and print its length with length().",
      "Take the first 5 characters with substr(0, 5) and print them.",
      "std::string s = \"CodeQuest\"; std::cout << s.length() << std::endl; std::cout << s.substr(0, 4) << std::endl;",
    ],
    challenge: "Define s = \"CodeQuest\". First print s.length(), then print s.substr(0, 4) on a new line (output: \"9\\nCode\").",
    files: {
      "main.cpp": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string s = \"CodeQuest\";\n    // TODO: print length() and substr(0,4)\n    return 0;\n}",
    },
    checks: ["length() used", "substr() used", "Output is exactly '9\\nCode'"],
  },
  "cpp-263": {
    title: "std::map",
    description: "Use std::map to store key-value pairs.",
    explanation:
      "`std::map<K, V>` keeps key-value pairs sorted by key.\nUse `map[key] = value;` to add an element, and `map[key]` to access it. `<map>` must be included.",
    example: "#include <map>\nstd::map<std::string, int> ages;\nages[\"Ali\"] = 25;\nages[\"Ayse\"] = 30;\nstd::cout << ages[\"Ali\"];",
    hints: [
      "Add #include <map>.",
      "Define a std::map<std::string, int> and add at least two key-value pairs.",
      "std::map<std::string, int> m; m[\"a\"] = 1; m[\"b\"] = 2; std::cout << m[\"a\"] + m[\"b\"];",
    ],
    challenge: "Create a std::map<std::string, int>, add \"elma\"=3 and \"armut\"=5, print their sum (8).",
    files: {
      "main.cpp": "#include <iostream>\n#include <map>\n#include <string>\n\nint main() {\n    // TODO: create a map, add elma=3 armut=5, print their sum\n    return 0;\n}",
    },
    checks: ["std::map used", "Output contains 8"],
  },
  "cpp-264": {
    title: "std::set",
    description: "Use std::set, which holds unique, sorted elements.",
    explanation:
      "`std::set<T>` automatically sorts elements and doesn't store duplicates; inserting the same value again has no effect.\n`<set>` must be included, and `size()` gives the number of elements.",
    example: "#include <set>\nstd::set<int> s;\ns.insert(3);\ns.insert(1);\ns.insert(3);\nstd::cout << s.size();",
    hints: [
      "Add #include <set>.",
      "Define a std::set<int> and insert some numbers (including duplicates).",
      "std::set<int> s; s.insert(5); s.insert(5); s.insert(7); std::cout << s.size();",
    ],
    challenge: "Create a std::set<int>, insert 4, 4, 4, 9, print size() (should be 2 since duplicates aren't counted).",
    files: {
      "main.cpp": "#include <iostream>\n#include <set>\n\nint main() {\n    // TODO: create a set<int>, insert 4 4 4 9, print size()\n    return 0;\n}",
    },
    checks: ["std::set<int> used", "Output contains 2"],
  },
  "cpp-265": {
    title: "Using iterators",
    description: "Use an iterator with begin() and end() to walk through a container's elements.",
    explanation:
      "An iterator is a pointer-like object used to walk sequentially through the elements of a container (vector, set, map...).\nA loop is built with the condition `it != v.end()`, `*it` gives the current element, and `++it` moves to the next one.",
    example: "std::vector<int> v = {1, 2, 3};\nfor (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it << \" \";\n}",
    hints: [
      "Define a variable of type std::vector<int>::iterator.",
      "Initialize it with it = v.begin(), build a loop with it != v.end(), and advance with ++it.",
      "for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++it) std::cout << *it << \" \";",
    ],
    challenge: "Define std::vector<int> v = {5, 10, 15};. Using an iterator (begin()/end()), print the elements separated by spaces (\"5 10 15 \").",
    files: {
      "main.cpp": "#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> v = {5, 10, 15};\n    // TODO: walk through it with an iterator and print it\n    return 0;\n}",
    },
    checks: ["iterator type used", "begin() used", "Output contains '5 10 15'"],
  },
  "cpp-266": {
    title: "algorithm: sort and find",
    description: "Use the std::sort and std::find functions from the <algorithm> header.",
    explanation:
      "`std::sort(begin, end)` sorts a range from smallest to largest.\n`std::find(begin, end, value)` searches for a value and returns the iterator where it was found (or `end()`). Both are in `<algorithm>`.",
    example: "#include <algorithm>\nstd::vector<int> v = {3, 1, 2};\nstd::sort(v.begin(), v.end());\nfor (int x : v) std::cout << x << \" \";\nauto it = std::find(v.begin(), v.end(), 2);\nif (it != v.end()) std::cout << \"found\";",
    hints: [
      "Add #include <algorithm>.",
      "Sort the vector with std::sort(v.begin(), v.end());.",
      "Search with std::find(v.begin(), v.end(), value), compare the result with v.end().",
    ],
    challenge: "Define std::vector<int> v = {5, 1, 4, 2};. Sort it with std::sort and print it separated by spaces. Then search for 4 with std::find, and if found, print \"bulundu\" on a new line (output: \"1 2 4 5 \\nbulundu\").",
    files: {
      "main.cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> v = {5, 1, 4, 2};\n    // TODO: sort it with sort and print, then search for 4 with find\n    return 0;\n}",
    },
    checks: ["std::sort used", "std::find used", "Output is exactly '1 2 4 5\\nbulundu'"],
  },
  "cpp-267": {
    title: "Lambda expressions",
    description: "Define and use anonymous functions (lambdas).",
    explanation:
      "A lambda expression is a small, unnamed function written with the syntax `[]() { ... }`.\nTo capture variables, you can write `=` (by value) or `&` (by reference) inside `[]`; lambdas are often given as comparators to functions like `std::sort`.",
    example: "auto add = [](int a, int b) {\n    return a + b;\n};\nstd::cout << add(3, 4);",
    hints: [
      "Define a lambda variable with auto: auto name = [](parameters) { ... };",
      "Call the lambda like a normal function.",
      "auto carp = [](int a, int b) { return a * b; }; std::cout << carp(3, 4);",
    ],
    challenge: "Define a lambda named carp (taking two ints and returning their product). Call carp(3, 4) and print the result (12).",
    files: {
      "main.cpp": "#include <iostream>\n\nint main() {\n    // TODO: define a lambda named carp and print carp(3,4)\n    return 0;\n}",
    },
    checks: ["Lambda expression used", "Output contains 12"],
  },
  "cpp-268": {
    title: "std::stringstream",
    description: "Use std::stringstream to read/parse data from a string.",
    explanation:
      "`std::stringstream` lets you read a string as if it were a file/stream; it's in `<sstream>`.\nThe `>>` operator can be used to read space-separated parts, and it's also used to convert a number to a string.",
    example: "#include <sstream>\nstd::stringstream ss(\"10 20\");\nint a, b;\nss >> a >> b;\nstd::cout << a + b;",
    hints: [
      "Add #include <sstream>.",
      "Turn a string into a stream with std::stringstream ss(\"...\");.",
      "Read two values with ss >> a >> b;, then add them.",
    ],
    challenge: "Define std::stringstream ss(\"7 8\");, read into two int variables with ss >> a >> b;, print their sum (15).",
    files: {
      "main.cpp": "#include <iostream>\n#include <sstream>\n\nint main() {\n    std::stringstream ss(\"7 8\");\n    // TODO: read two ints and print their sum\n    return 0;\n}",
    },
    checks: ["std::stringstream used", "Output contains 15"],
  },
  "cpp-269": {
    title: "Exceptions: try / catch",
    description: "Throw an error with throw and catch it with try/catch.",
    explanation:
      "`throw` throws an error (exception); program flow jumps to the nearest suitable `catch` block.\nThe `try { ... } catch (...) { ... }` structure lets you handle errors in a way that prevents the program from crashing.",
    example: "try {\n    throw std::runtime_error(\"Error!\");\n} catch (const std::exception& e) {\n    std::cout << e.what();\n}",
    hints: [
      "Build a try { ... } catch (...) { ... } block.",
      "Inside it, throw std::runtime_error(\"message\"); based on some condition.",
      "Catch and print the error with catch (const std::exception& e) { std::cout << e.what(); }.",
    ],
    challenge: "For int sayi = 0;, in the try block, if sayi == 0, throw std::runtime_error(\"Sifira bolme\");, and in the catch block print the message with e.what().",
    files: {
      "main.cpp": "#include <iostream>\n#include <stdexcept>\n\nint main() {\n    int sayi = 0;\n    // TODO: throw an error if sayi==0 with try/catch and catch it\n    return 0;\n}",
    },
    checks: ["throw std::runtime_error used", "catch block exists", "Output contains 'Sifira bolme'"],
  },
  "cpp-270": {
    title: "Mini project: Student grade average",
    description: "Combine classes, vectors, and loops to calculate the average of a student's grades.",
    explanation:
      "In this mini project, an `Ogrenci` class, a `std::vector<int>` holding grades, and a method that calculates the average are used together.\nIn real applications, classes often bring several concepts together like this.",
    example: "class Ogrenci {\npublic:\n    std::vector<int> notlar;\n    double ortalama() {\n        double toplam = 0;\n        for (int n : notlar) toplam += n;\n        return toplam / notlar.size();\n    }\n};",
    hints: [
      "Define a std::vector<int> notlar; member inside class Ogrenci.",
      "In the ortalama() method, sum the grades in a loop and divide by notlar.size().",
      "Ogrenci o; o.notlar.push_back(80); o.notlar.push_back(90); o.notlar.push_back(70); std::cout << o.ortalama();",
    ],
    challenge: "Define a class named Ogrenci (with a std::vector<int> notlar member and a double ortalama() method). Add the grades 80, 90, 70 and print ortalama() (80).",
    files: {
      "main.cpp": "#include <iostream>\n#include <vector>\n\n// TODO: define class Ogrenci (vector<int> notlar, double ortalama())\n\nint main() {\n    // TODO: create Ogrenci o, add grades 80 90 70, print the average\n    return 0;\n}",
    },
    checks: ["class Ogrenci is defined", "notlar vector is defined", "Output contains 80"],
  },
};
