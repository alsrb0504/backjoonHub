const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const base = input[0].trimEnd("\n");
const sub = input[1].trimEnd("\n");

function makeTable(pattern) {
  const patternSize = pattern.length;
  const table = new Array(patternSize).fill(0);
  let j = 0;

  for (let i = 1; i < patternSize; i++) {
    while (j > 0 && pattern[j] !== pattern[i]) {
      j = table[j - 1];
    }

    if (pattern[j] === pattern[i]) {
      table[i] = ++j;
    }
  }

  return table;
}

function kmp(parent, pattern) {
  const table = makeTable(pattern);
  const patternSize = pattern.length;
  const parentSize = parent.length;

  let j = 0;

  const result = [];

  for (let i = 0; i < parentSize; i++) {
    while (j > 0 && parent[i] !== pattern[j]) {
      j = table[j - 1];
    }

    if (parent[i] === pattern[j]) {
      if (j === patternSize - 1) {
        result.push(i - patternSize + 2);
        // 일치하는 부분만큼 돌아가야 함.
        j = table[j];
      } else {
        j++;
      }
    }
  }
  return result.length + "\n" + result.join(" ");
}

console.log(kmp(base, sub));