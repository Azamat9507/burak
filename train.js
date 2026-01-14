// G - task

// function getHighestIndex(arr) {
//   const max = [...arr].sort((a, b) => b - a)[0];
//   return arr.indexOf(max);
// }

// console.log(getHighestIndex([5, 21, 12, 21, 8])); 

// H - task 

function getPositive(arr) {
  let result = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      result += arr[i];
    }
  }

  return result;
}

console.log(getPositive([1, -4, 2]));