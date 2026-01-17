// function getHighestIndex(arr) {
//   const max = [...arr].sort((a, b) => b - a)[0];
//   return arr.indexOf(max);
// }

// console.log(getHighestIndex([5, 21, 12, 21, 8])); 

// H - task 

// function getPositive(arr: number[]) {
//   let result = "";

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > 0) {
//       result += arr[i];
//     }
//   }

//   return result;
// }

// console.log(getPositive([1, -4, 2]));

// H2 - task

// function getDigits(str: string): string {
//   let result = "";

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] >= "0" && str[i] <= "9") {
//       result += str[i];
//     }
//   }

//   return result;
// }


// console.log(getDigits("m14i1t"));

/*
=====================================
 Loyiha Standartlari
=====================================

1) Log yozish (Logging)
  HTTP so‘rovlar uchun morgan ishlatiladi
  console.log faqat developmentda ishlatiladi
  Production kodda console.log bo‘lmasligi kerak

2) Nomlash qoidalari (Naming Conventions)
  O‘zgaruvchi, funksiya, metod → camelCase
  Class, enum, interface → PascalCase
  Papkalar → kebab-case
  Constantlar → UPPER_SNAKE_CASE
  Fayllar → kebab-case.ts

3) Arxitektura
  controllers → faqat request/response
  services → biznes mantiq
  models/schema → ma’lumotlar bazasi qatlami
  libs → umumiy utilitalar (errors, config, logger)

4) Xatolar bilan ishlash (Error Handling)
  Har doim custom Errors class tashlanadi (throw)
  Oddiy (raw) error qaytarilmaydi
  Status code uchun HttpCode enum ishlatiladi
  Xabarlar uchun Message enum ishlatiladi

5) Import qoidalari
  src ichida absolute importlar afzal
  Ishlatilmaydigan importlar bo‘lmasin
  Import tartibi: node → libs → local

6) Kod yozish qoidalari
  Har bir funksiya bitta vazifaga ega bo‘lsin
  Magic number va magic string ishlatilmasin
  Early return afzal
  Faqat async/await (then/catch ishlatilmaydi)

*/


