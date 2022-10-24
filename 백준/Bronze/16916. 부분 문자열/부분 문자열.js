const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const base = input[0].trimEnd();
const sub = input[1].trimEnd();
let answer = 0;

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

  return table;
}

function kmp(parent, pattern) {
  const table = makeTable(pattern);
  const parentSize = parent.length;
  const patternSize = pattern.length;

  let isPossible = false;
  let j = 0;

  for (let i = 0; i < parentSize; i++) {
    if (isPossible) break;

    while (j > 0 && parent[i] !== pattern[j]) {
      j = table[j - 1];
    }
    if (parent[i] === pattern[j]) {
      if (j === patternSize - 1) {
        isPossible = true;
        j = table[j];
      } else {
        j++;
      }
    }
  }

  return isPossible ? 1 : 0;
}

console.log(kmp(base, sub));