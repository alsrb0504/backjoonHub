const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const A = input[0].trimEnd();
const B = input[1].trimEnd();
const spread = B + B.slice(0, B.length - 1);

function makePattern(pattern) {
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

  return table;
}

function kmp(parent, pattern) {
  const table = makePattern(pattern);
  const parentSize = parent.length;
  const patternSize = pattern.length;
  let j = 0;
  let cnt = 0;

  for (let i = 0; i < parentSize; i++) {
    while (j > 0 && parent[i] !== pattern[j]) {
      j = table[j - 1];
    }

    if (parent[i] === pattern[j]) {
      if (j === patternSize - 1) {
        cnt++;
        j = table[j];
      } else {
        j++;
      }
    }
  }
  return cnt;
}

console.log(kmp(spread, A));
