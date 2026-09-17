import type { TrackTranslations } from "../types";

export const CPP_A_EN: TrackTranslations = {
  "cpp-221": {
    title: "Your first C++ program",
    description: "Write the program's entry point using #include <iostream> and int main().",
    explanation:
      "Every C++ program starts with the `main()` function. To print text to the screen, you need to `#include` the `<iostream>` library.\nAt the end of the function, `return 0;` indicates that the program finished successfully.",
    example: `#include <iostream>\n\nint main() {\n    std::cout << "Merhaba";\n    return 0;\n}`,
    hints: [
      "Add #include <iostream> at the top of the file.",
      "Inside the int main() { ... } body, write std::cout << \"CodeQuest\";",
      "Don't forget to put return 0; at the end.",
    ],
    challenge: "Write a C++ program that prints \"CodeQuest\" to the screen (with a main function and return 0).",
    checks: ["iostream is included", "Output contains 'CodeQuest'"],
    files: {
      "main.cpp": `// TODO: add #include <iostream>\n\nint main() {\n    // TODO: print CodeQuest\n    return 0;\n}`,
    },
  },
  "cpp-222": {
    title: "cout and endl",
    description: "Print multiple lines with std::cout and move to a new line with std::endl.",
    explanation:
      "The `std::cout <<` operator sends data to the screen; you can chain multiple `<<` operators together.\n`std::endl` moves to a new line (`\\n` does the same thing).",
    example: `std::cout << "Bir" << std::endl;\nstd::cout << "Iki" << std::endl;`,
    hints: [
      "Use two separate std::cout lines.",
      "Add std::endl at the end of each line.",
      "std::cout << \"Merhaba\" << std::endl; std::cout << \"Dunya\" << std::endl;",
    ],
    challenge: "Print \"Merhaba\" and \"Dunya\" on two separate lines (using std::endl).",
    checks: ["std::endl is used", "Output is exactly two lines"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    // TODO: print two lines\n    return 0;\n}`,
    },
  },
  "cpp-223": {
    title: "Basic types",
    description: "Define and print int, double, char, bool variables.",
    explanation:
      "In C++, every variable must have a type: `int` is a whole number, `double` is a decimal number, `char` is a single character, `bool` holds true/false.\nWhen defining a variable, you write its type before it: `int yas = 17;`.",
    example: `int yas = 17;\ndouble boy = 1.75;\nchar harf = 'A';\nbool aktif = true;\nstd::cout << yas << " " << boy;`,
    hints: [
      "Define four variables of different types: int, double, char, bool.",
      "Print each of them on a separate line with std::cout.",
      "int yas = 17; double boy = 1.75; char harf = 'C'; bool ok = true;",
    ],
    challenge: "Define one variable each of type int (17), double (1.75), char ('C'), and bool (true), and print each on a separate line.",
    checks: ["int variable is defined", "double variable is defined", "char variable is defined", "bool variable is defined"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    // TODO: define and print 4 variables of different types\n    return 0;\n}`,
    },
  },
  "cpp-224": {
    title: "Read input with std::cin",
    description: "Read a number from the user with std::cin and use it.",
    explanation:
      "The `std::cin >>` operator reads data from the keyboard (or input stream).\nThe value that is read is assigned to a variable, and then can be used like a normal variable.",
    example: `int sayi;\nstd::cin >> sayi;\nstd::cout << "Girilen: " << sayi;`,
    hints: [
      "Define an int variable.",
      "Read a value into this variable with std::cin >>.",
      "int yas; std::cin >> yas; std::cout << \"Yas: \" << yas;",
    ],
    challenge: "Read an integer from the user (yas) and print it after the text \"Yas: \". Input: 17",
    checks: ["Reading is done with std::cin", "Output contains 'Yas: 17'"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int yas;\n    // TODO: read with std::cin and print\n    return 0;\n}`,
    },
  },
  "cpp-225": {
    title: "Define a constant with const",
    description: "Define a value that cannot be changed using the const keyword.",
    explanation:
      "A variable defined with `const` is assigned a value once and can never be changed afterwards.\nConstants are usually written in uppercase, which makes the code's meaning clearer (e.g. PI, MAX_SKOR).",
    example: `const int MAX_SKOR = 100;\nstd::cout << MAX_SKOR;`,
    hints: [
      "Define a constant using const int.",
      "Name the constant PI and, since its value is 3.14, use const double instead.",
      "const double PI = 3.14; std::cout << PI;",
    ],
    challenge: "Define const double PI = 3.14; and print it.",
    checks: ["const double PI is defined", "Output contains 3.14"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    // TODO: define const double PI and print it\n    return 0;\n}`,
    },
  },
  "cpp-226": {
    title: "Arithmetic and assignment operators",
    description: "Do calculations with operators like +, -, *, /, +=.",
    explanation:
      "In C++, `+ - * /` perform basic arithmetic operations. Assignment operators like `+=`, `-=`, `*=` update a variable by operating on itself.\nFor example, `x += 5;` is the same as `x = x + 5;`.",
    example: `int x = 10;\nx += 5;\nstd::cout << x;`,
    hints: [
      "Define an int variable, for example skor = 10.",
      "Add 5 to skor using the += operator.",
      "int skor = 10; skor += 5; std::cout << skor;",
    ],
    challenge: "Start an int variable named skor at 10, add 5 with +=, and print the result (should be 15).",
    checks: ["+= operator is used", "Output is 15"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int skor = 10;\n    // TODO: skor += 5;\n    std::cout << skor;\n    return 0;\n}`,
    },
  },
  "cpp-227": {
    title: "Converting with static_cast",
    description: "Convert one type to another with static_cast<T>.",
    explanation:
      "An expression like `static_cast<double>(x)` converts the variable `x` to type `double`.\nThis is useful, for example, when you want to get the decimal result of dividing two integers.",
    example: `int a = 7, b = 2;\ndouble sonuc = static_cast<double>(a) / b;\nstd::cout << sonuc;`,
    hints: [
      "Define two ints: a = 7, b = 2.",
      "Convert a to double with static_cast<double>, then divide by b.",
      "double sonuc = static_cast<double>(a) / b; std::cout << sonuc;",
    ],
    challenge: "Define int variables a=7, b=2, compute a/b as a decimal using static_cast<double>, and print it (3.5).",
    checks: ["static_cast is used", "Output contains 3.5"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int a = 7, b = 2;\n    // TODO: perform a double division with static_cast\n    return 0;\n}`,
    },
  },
  "cpp-228": {
    title: "Using std::string",
    description: "Store and combine text using std::string.",
    explanation:
      "`std::string` is a type that holds text data, and comes from the `<string>` library.\nYou can concatenate two strings with `+` (concatenation).",
    example: `#include <string>\nstd::string ad = "Ali";\nstd::string mesaj = "Merhaba " + ad;\nstd::cout << mesaj;`,
    hints: [
      "Add #include <string>.",
      "Define a std::string variable ad (\"Ayşe\").",
      "std::string mesaj = \"Merhaba \" + ad; std::cout << mesaj;",
    ],
    challenge: "Add #include <string>, define a std::string ad = \"Ayşe\", build a message reading \"Merhaba Ayşe\" and print it.",
    checks: ["string is included", "Output contains 'Merhaba Ayşe'"],
    files: {
      "main.cpp": `#include <iostream>\n// TODO: add #include <string>\n\nint main() {\n    // TODO: concatenate strings and print\n    return 0;\n}`,
    },
  },
  "cpp-229": {
    title: "if / else if / else",
    description: "Produce different outputs using conditional statements.",
    explanation:
      "`if` runs when a condition is true, `else if` tries another condition, and `else` runs if none of them are true.\nComparison operators like `>`, `<`, `==` let you write conditions.",
    example: `int not_ = 75;\nif (not_ >= 90) std::cout << "AA";\nelse if (not_ >= 60) std::cout << "BB";\nelse std::cout << "FF";`,
    hints: [
      "Define int puan = 45;",
      "Build an if (puan >= 50) ... else ... structure.",
      "if (puan >= 50) std::cout << \"Gecti\"; else std::cout << \"Kaldi\";",
    ],
    challenge: "Define puan = 45, use if/else to print \"Gecti\" for 50 and above, otherwise \"Kaldi\" (for 45 it should print \"Kaldi\").",
    checks: ["else is used", "Output is 'Kaldi'"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int puan = 45;\n    // TODO: write if/else\n    return 0;\n}`,
    },
  },
  "cpp-230": {
    title: "switch-case",
    description: "Handle multiple options with switch-case.",
    explanation:
      "`switch` branches into different `case` blocks based on a variable's value.\nDon't forget to put `break;` at the end of each case, otherwise it falls through to the cases below (fall-through).",
    example: `int gun = 3;\nswitch (gun) {\n    case 1: std::cout << "Pazartesi"; break;\n    case 2: std::cout << "Sali"; break;\n    default: std::cout << "Bilinmiyor";\n}`,
    hints: [
      "Define int gun = 3;",
      "Inside switch(gun), print \"Carsamba\" for case 3.",
      "switch (gun) { case 3: std::cout << \"Carsamba\"; break; default: std::cout << \"?\"; }",
    ],
    challenge: "Define gun = 3, use switch-case to print \"Carsamba\" for case 3, and \"?\" for default.",
    checks: ["switch is used", "case 3 exists", "Output is 'Carsamba'"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int gun = 3;\n    // TODO: write switch-case\n    return 0;\n}`,
    },
  },
  "cpp-231": {
    title: "for loop",
    description: "Print numbers repeatedly using a for loop.",
    explanation:
      "The `for (start; condition; increment)` loop repeats a set number of times.\nFor example, `for (int i = 0; i < 5; i++)` runs 5 times, from 0 to 4.",
    example: `for (int i = 1; i <= 3; i++) {\n    std::cout << i << " ";\n}`,
    hints: [
      "Build the structure for (int i = 1; i <= 5; i++).",
      "Inside the loop, write std::cout << i << std::endl;",
      "for (int i = 1; i <= 5; i++) { std::cout << i << std::endl; }",
    ],
    challenge: "Print the numbers from 1 to 5 using a for loop, each on its own line.",
    checks: ["for loop is used", "Output is 1 through 5"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    // TODO: print 1-5 using a for loop\n    return 0;\n}`,
    },
  },
  "cpp-232": {
    title: "while / do-while",
    description: "Repeat as long as a condition holds, using a while loop.",
    explanation:
      "`while (condition)` repeats the loop as long as the condition is true.\n`do { } while(condition);`, on the other hand, checks the condition after running the block at least once.",
    example: `int i = 0;\nwhile (i < 3) {\n    std::cout << i << " ";\n    i++;\n}`,
    hints: [
      "Define int sayac = 0;",
      "Build a while (sayac < 3) loop, print inside and do sayac++.",
      "int sayac = 0; while (sayac < 3) { std::cout << sayac << std::endl; sayac++; }",
    ],
    challenge: "Start sayac at 0, use a while loop to print its value and increment it while sayac is less than 3 (lines 0,1,2).",
    checks: ["while is used", "Output is 0,1,2"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int sayac = 0;\n    // TODO: write a while loop\n    return 0;\n}`,
    },
  },
  "cpp-233": {
    title: "Classic arrays",
    description: "Define an int array and print its elements with a loop.",
    explanation:
      "A fixed-size array is defined like `int sayilar[5] = {1,2,3,4,5};`.\nElements are accessed by index as `sayilar[i]`, and you can iterate over all elements with a loop.",
    example: `int sayilar[3] = {10, 20, 30};\nfor (int i = 0; i < 3; i++) {\n    std::cout << sayilar[i] << " ";\n}`,
    hints: [
      "Define int dizi[5] = {1,2,3,4,5};",
      "Use a for loop from 0 to 4 to print dizi[i].",
      "for (int i = 0; i < 5; i++) std::cout << dizi[i] << std::endl;",
    ],
    challenge: "Define int dizi[5] = {1,2,3,4,5}; and print every element on a separate line using a for loop.",
    checks: ["dizi[i] access is used", "All elements are printed in order"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int dizi[5] = {1, 2, 3, 4, 5};\n    // TODO: print with a for loop\n    return 0;\n}`,
    },
  },
  "cpp-234": {
    title: "Multi-dimensional arrays",
    description: "Define a 2D array (matrix) and traverse it with a nested loop.",
    explanation:
      "A multi-dimensional array like `int matris[2][2] = {{1,2},{3,4}};` consists of rows and columns.\nAccessing an element needs two indices: `matris[i][j]`, and it's usually traversed with a nested for loop.",
    example: `int m[2][2] = {{1,2},{3,4}};\nfor (int i = 0; i < 2; i++)\n    for (int j = 0; j < 2; j++)\n        std::cout << m[i][j] << " ";`,
    hints: [
      "Define int matris[2][2] = {{1,2},{3,4}};",
      "Build two nested for loops (i for rows, j for columns).",
      "for (int i=0;i<2;i++) for (int j=0;j<2;j++) std::cout << matris[i][j] << std::endl;",
    ],
    challenge: "Define matris[2][2] = {{1,2},{3,4}} and print all elements row by row using nested for loops (order: 1,2,3,4).",
    checks: ["matris[i][j] access is used", "All elements are printed in order"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int matris[2][2] = {{1, 2}, {3, 4}};\n    // TODO: print with nested for loops\n    return 0;\n}`,
    },
  },
  "cpp-235": {
    title: "Function prototype and body",
    description: "Define your own function and call it from main.",
    explanation:
      "A function is defined with a return type, a name, and parameters: `int topla(int a, int b) { return a + b; }`.\nYou call the function from `main` by its name with arguments in parentheses.",
    example: `int kare(int x) {\n    return x * x;\n}\n\nint main() {\n    std::cout << kare(4);\n    return 0;\n}`,
    hints: [
      "Define the function int topla(int a, int b) { return a + b; } above main.",
      "Call it from main as topla(3, 4).",
      "std::cout << topla(3, 4); // inside main",
    ],
    challenge: "Define a function topla(int a, int b) (returning a+b), call topla(3,4) inside main, and print the result (7).",
    checks: ["topla function is defined", "Output is 7"],
    files: {
      "main.cpp": `#include <iostream>\n\n// TODO: define int topla(int a, int b)\n\nint main() {\n    // TODO: call topla(3, 4) and print it\n    return 0;\n}`,
    },
  },
  "cpp-236": {
    title: "Pass by value",
    description: "Send a copy of a value to a function; the original stays unchanged.",
    explanation:
      "When giving a normal parameter to a function (pass by value), a copy of the argument is sent.\nEven if you change the parameter inside the function, the original variable on the caller's side is not affected.",
    example: `void artir(int x) {\n    x = x + 1;\n}\n\nint main() {\n    int sayi = 5;\n    artir(sayi);\n    std::cout << sayi; // 5, degismedi\n}`,
    hints: [
      "Define a function void artir(int x), and inside it do x = x + 1.",
      "In main, define sayi = 5 and call artir(sayi).",
      "std::cout << sayi; // still 5, because of pass by value",
    ],
    challenge: "Write void artir(int x) (increment x by 1), define sayi=5 in main, call artir(sayi), and print sayi (should stay 5, unchanged).",
    checks: ["artir function passes by value", "Output is 5 (unchanged)"],
    files: {
      "main.cpp": `#include <iostream>\n\n// TODO: define void artir(int x)\n\nint main() {\n    int sayi = 5;\n    // TODO: call artir(sayi) and print sayi\n    return 0;\n}`,
    },
  },
  "cpp-237": {
    title: "Pass by reference (&)",
    description: "Change the original value by passing a parameter by reference.",
    explanation:
      "If you put `&` next to the parameter type (`int &x`), the function works with the original variable itself.\nThis way, a change made inside the function also changes the variable on the caller's side.",
    example: `void artir(int &x) {\n    x = x + 1;\n}\n\nint main() {\n    int sayi = 5;\n    artir(sayi);\n    std::cout << sayi; // 6\n}`,
    hints: [
      "Use a reference parameter like void artir(int &x).",
      "Inside it, do x = x + 1;",
      "In main: sayi=5, artir(sayi), std::cout << sayi; // should be 6",
    ],
    challenge: "Write void artir(int &x) (increment x by 1), define sayi=5 in main, call artir(sayi), and print sayi (should become 6, changed).",
    checks: ["reference parameter (&) is used", "Output is 6 (changed)"],
    files: {
      "main.cpp": `#include <iostream>\n\n// TODO: define void artir(int &x)\n\nint main() {\n    int sayi = 5;\n    // TODO: call artir(sayi) and print sayi\n    return 0;\n}`,
    },
  },
  "cpp-238": {
    title: "const reference parameter",
    description: "Safely pass large data to a function without copying, using const &.",
    explanation:
      "A parameter like `const std::string &metin` takes the data without copying it (efficient), but prevents it from being modified inside the function (safe).\nThis is the most common way to pass large objects (like string, vector) to a function.",
    example: `void yazdir(const std::string &metin) {\n    std::cout << metin;\n}\n\nint main() {\n    yazdir("Merhaba");\n}`,
    hints: [
      "Add #include <string>.",
      "Define void yazdir(const std::string &metin), and inside it do std::cout << metin;",
      "Call yazdir(\"CodeQuest\"); inside main.",
    ],
    challenge: "Write void yazdir(const std::string &metin), call yazdir(\"CodeQuest\"); inside main and print it to the screen.",
    checks: ["const & parameter is used", "Output contains 'CodeQuest'"],
    files: {
      "main.cpp": `#include <iostream>\n#include <string>\n\n// TODO: define void yazdir(const std::string &metin)\n\nint main() {\n    // TODO: call yazdir(\"CodeQuest\")\n    return 0;\n}`,
    },
  },
  "cpp-239": {
    title: "Function overloading",
    description: "Define two functions with the same name but different parameters.",
    explanation:
      "In C++, you can define multiple functions with the same name, as long as their parameter lists differ (overloading).\nThe compiler decides which function to use by looking at the call.",
    example: `int topla(int a, int b) { return a + b; }\ndouble topla(double a, double b) { return a + b; }\n\nint main() {\n    std::cout << topla(2, 3) << " " << topla(2.5, 1.5);\n}`,
    hints: [
      "Define the function int topla(int a, int b).",
      "Also define double topla(double a, double b) with the same name.",
      "In main, call topla(2, 3) and topla(2.5, 1.5), and print both.",
    ],
    challenge: "Write two overloaded functions, topla(int,int) and topla(double,double), call topla(2,3) and topla(2.5,1.5) in main and print them (5 and 4).",
    checks: ["int topla overload exists", "double topla overload exists", "Output contains 5", "Output contains 4"],
    files: {
      "main.cpp": `#include <iostream>\n\n// TODO: define two overloaded topla functions\n\nint main() {\n    // TODO: call both topla versions and print them\n    return 0;\n}`,
    },
  },
  "cpp-240": {
    title: "Recursive function (factorial)",
    description: "Calculate a factorial with a function that calls itself.",
    explanation:
      "A function can call itself; this is called recursion.\nEvery recursive function must have a base case, otherwise it goes into an infinite loop.",
    example: `int faktoriyel(int n) {\n    if (n <= 1) return 1;\n    return n * faktoriyel(n - 1);\n}`,
    hints: [
      "Base case: return 1 if n <= 1.",
      "General case: return n * faktoriyel(n-1).",
      "int faktoriyel(int n) { if (n <= 1) return 1; return n * faktoriyel(n - 1); }",
    ],
    challenge: "Write faktoriyel(int n) recursively, call faktoriyel(5) in main and print it (120).",
    checks: ["function calls itself", "Output is 120"],
    files: {
      "main.cpp": `#include <iostream>\n\n// TODO: recursive faktoriyel function\n\nint main() {\n    std::cout << faktoriyel(5);\n    return 0;\n}`,
    },
  },
  "cpp-241": {
    title: "The address-of operator &",
    description: "Get a variable's memory address with the & operator.",
    explanation:
      "The expression `&degisken` gives the memory address of that variable (a pointer type).\nThe address value itself may differ each time you run the program, so it's usually just assigned to a pointer, without testing the printed numeric value.",
    example: `int x = 5;\nint *p = &x;\nstd::cout << "x'in adresi bir pointer'da tutuldu";`,
    hints: [
      "Define int x = 42;",
      "Assign its address to a pointer with int *p = &x;",
      "Confirm this with std::cout << \"Adres alindi\"; without printing the address value.",
    ],
    challenge: "Define int x = 42;, assign its address to pointer int *p using the & operator, then print \"Adres alindi\".",
    checks: ["address is taken with &", "Output contains 'Adres alindi'"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int x = 42;\n    // TODO: do int *p = &x; and print \"Adres alindi\"\n    return 0;\n}`,
    },
  },
  "cpp-242": {
    title: "Pointers and dereferencing",
    description: "Access (dereference) and change a value through a pointer.",
    explanation:
      "To access the value a pointer points to, you put `*` in front of it; this is called dereferencing.\nWriting `*p = 10;` sets the value of the variable p points to, to 10.",
    example: `int x = 5;\nint *p = &x;\n*p = 10;\nstd::cout << x; // 10`,
    hints: [
      "Define int x = 5; and int *p = &x;",
      "Change the value of x through p with *p = 99;",
      "std::cout << x; // should now be 99",
    ],
    challenge: "Define x=5, bind pointer p to x, change x with *p=99, and print x (99).",
    checks: ["*p is dereferenced and changed", "Output is 99"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int x = 5;\n    int *p = &x;\n    // TODO: do *p = 99;\n    std::cout << x;\n    return 0;\n}`,
    },
  },
  "cpp-243": {
    title: "nullptr",
    description: "Initialize a pointer as empty with nullptr and check it.",
    explanation:
      "Pointers that don't yet point to an address should be initialized with `nullptr` (older code also uses `NULL`).\nBefore using a pointer, you can check whether it's empty with `if (p == nullptr)`.",
    example: `int *p = nullptr;\nif (p == nullptr) {\n    std::cout << "Bos pointer";\n}`,
    hints: [
      "Define an empty pointer with int *p = nullptr;",
      "Write the condition if (p == nullptr).",
      "if (p == nullptr) std::cout << \"Bos pointer\";",
    ],
    challenge: "Define int *p = nullptr;, check with if (p == nullptr), and print \"Bos pointer\" if true.",
    checks: ["nullptr is used", "Output contains 'Bos pointer'"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    // TODO: define int *p = nullptr; and check it\n    return 0;\n}`,
    },
  },
  "cpp-244": {
    title: "Pointer arithmetic",
    description: "Traverse an array using pointer arithmetic.",
    explanation:
      "The name of an array actually behaves like a pointer to its first element.\nThe expression `p + 1` gives the address of the next element, and you can reach that element with `*(p + i)`.",
    example: `int dizi[3] = {10, 20, 30};\nint *p = dizi;\nstd::cout << *(p + 1); // 20`,
    hints: [
      "Define int dizi[3] = {10,20,30};",
      "Bind the pointer to the array with int *p = dizi;",
      "for (int i = 0; i < 3; i++) std::cout << *(p + i) << std::endl;",
    ],
    challenge: "Define dizi[3] = {10,20,30}, bind pointer p to the array, and print all elements on separate lines in a loop using *(p+i).",
    checks: ["pointer arithmetic is used", "Output is 10,20,30"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    int dizi[3] = {10, 20, 30};\n    int *p = dizi;\n    // TODO: print in a loop using *(p + i)\n    return 0;\n}`,
    },
  },
  "cpp-245": {
    title: "new and delete",
    description: "Allocate dynamic memory with new, and free it with delete.",
    explanation:
      "`new int(5)` dynamically allocates memory on the heap and returns a pointer to that address.\nOnce you're done using it, you need to free this memory with `delete p;`, otherwise you get a memory leak.",
    example: `int *p = new int(5);\nstd::cout << *p;\ndelete p;`,
    hints: [
      "Allocate dynamic memory with int *p = new int(42);",
      "Print the value with *p.",
      "Once done, free the memory with delete p;",
    ],
    challenge: "Allocate dynamic memory for an int (42) with new, print the value, then free the memory with delete.",
    checks: ["memory is allocated with new", "memory is freed with delete", "Output is 42"],
    files: {
      "main.cpp": `#include <iostream>\n\nint main() {\n    // TODO: allocate memory with new, print it, free it with delete\n    return 0;\n}`,
    },
  },
};
