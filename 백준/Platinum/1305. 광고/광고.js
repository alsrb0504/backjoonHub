const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str = input[1].trimEnd();

function makeTable(pattern) {
  const patternSize = pattern.length;
  const table = new Array(patternSize).fill(0);
  let j = 0;

  for (let i = 1; i < patternSize; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = table[j - 1];
    }

    if (pattern[i] === pattern[j]) {
      table[i] = ++j;
    }
  }

  return patternSize - table[patternSize - 1];
}

console.log(makeTable(str));