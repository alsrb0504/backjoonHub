const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str = input[0].trimEnd();
let answer = 0;

function makeTable(pattern) {
  const patternSize = pattern.length;
  const table = new Array(patternSize).fill(0);
  let j = 0;
  let max = 0;

  for (let i = 1; i < patternSize; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = table[j - 1];
    }

    if (pattern[i] === pattern[j]) {
      table[i] = ++j;
      max = Math.max(max, j);
    }
  }

  return max;
}

for (let i = 0; i < str.length; i++) {
  const tableMax = makeTable(str.slice(i));

  answer = Math.max(answer, tableMax);
}

console.log(answer);
