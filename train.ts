// G - task

function getHighestIndex(arr) {
  const max = [...arr].sort((a, b) => b - a)[0];
  return arr.indexOf(max);
}

console.log(getHighestIndex([5, 21, 12, 21, 8])); 