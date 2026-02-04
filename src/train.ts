// Task G
// function getHighestIndex(arr: Array<number>) {
//   let max = arr[0];
//   let index = 0;

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > max) {
//       max = arr[i];
//       index = i;
//     }
//   }

//   return index;
// }
// const result = getHighestIndex([10, 5, 50, 3, 49, 80, 99, 8]);
// console.log(result); 


// Task H

// function getPositive(arr: Array<number>) {
//   let result = "";
//      for( let i = 0; i < arr.length; i ++) {
//          if (arr[i] > 0){
//             result += arr[i];
//          }
  
//      }
//      return result;
// }
// console.log(getPositive([1, -4, 2])); 

// GetNegative

// function getNegative (arr: Array<number>) {
//   let result = "";
//      for( let i = 0; i < arr.length; i ++) {
//          if (arr[i] < 0){
//             result += arr[i];
//          }
  
//      }
//      return result;
// }
// console.log(getNegative([1,-8, 9, -10, 3, -5, -4, 2])); 


// Task H2


// function getDigits ( type: number[] ) {
//   let result = "";
//      for( let i = 0; i < type.length; i ++) {
//          if (type[i] >= 0 && type[i] <= 9){
//             result += type[i];
//          }
//      }
//      return result;
// }
// console.log(getDigits   ( "m1k2j3n4b5v6c7x8z9". split("").map(Number) ));



// function getDigits(str: string): string {
//   let result = "";

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] >= "0" && str[i] <= "9") {
//       result += str[i];
//     }
//   }

//   return result;
// }

// console.log(getDigits("m14i1t")); // "141"
// console.log(getDigits("m1k2j3n4b5v6c7x8z9")); // "123456789"
// console.log(getDigits("abc")); // ""

/* Project Standards:
-- Logging standards
-- Naming standards 
      camelCase for variables, methods and functions,
      PascalCase for classes and interfaces,
      Kebab-case for file and folder names,
      SNAKE_CASE for constants  LIKE SOME_CONSTANT
-- Error handling standards
        
-- Code structure and organization  
       */


/**
 * 
 *  Most used Different API types:
 * Traditional API
 * Rest. API
 * GraphQL API
 * gRPC API
 */



//Task I
// function majorityElement(arr: number[]): number | null {
//   const count: Record<number, number> = {};
//   let maxCount = 0;
//   let result: number | null = null;

//   for (const num of arr) {
//     count[num] = (count[num] ?? 0) + 1;

//     if (count[num] > maxCount) {
//       maxCount = count[num];
//       result = num;
//     }
//   }

//   return result;
// }

// console.log(majorityElement([1, 2, 3, 4, 5, 4, 3, 4])); 


// Task K
// function countVowels(str: string): number {
//   const vowels = "aeiouAEIOU";
//   let count = 0;

//   for (const char of str) {
//     if (vowels.includes(char)) {
//       count++;
//     }
//   }

//   return count;
// }

// console.log(countVowels("string")); 
// console.log(countVowels("I came from Uzbekistan!")); 


// Task L

// function reverseSentence(sentence: string): string {
//   return sentence
//     .split(" ")
//     .map(word => word.split("").reverse().join(""))
//     .join(" ");
// }


// console.log(reverseSentence("I am MIT36 students"));

//Task M

// type SquareNumber = {
//   number: number;
//   square: number;
// };

// function getSquareNumbers(arr: number[]): SquareNumber[] {
//   return arr.map((num) => {
//     return {
//       number: num,
//       square: num * num,
//     };
//   });
// }

// const result = getSquareNumbers([1, 2, 3]);
// console.log(result);

// Task N

function palindromCheck(str: string): boolean {
  const reversed: string = str.split("").reverse().join("");
  return str === reversed;
}

// tekshirish
console.log(palindromCheck("dad")); // true
console.log(palindromCheck("son")); // false