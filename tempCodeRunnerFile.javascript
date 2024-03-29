var x1 = { "name": "ahmet" };
x1.age = 25;

var x2 = x1;
x2.name = "mehmet";
x2.age = 30;

var x3 = {...x1, "name": "ali", ...x2};

console.log(x1.name);  // ahmet
console.log(x2.name);  // mehmet
console.log(x3.name); //hata
console.log(x1.age);  //hata
console.log(x3.age);  //hatta