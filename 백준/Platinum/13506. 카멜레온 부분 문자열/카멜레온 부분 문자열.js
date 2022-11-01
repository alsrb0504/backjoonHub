const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str = input[0].trimEnd();
const strLength = str.length;

const pi = makePattern(str);

let len = pi[strLength - 1];

let answer = "";

while (len > 0 && answer === "") {
  for (let i = 1; i < strLength - 1; i++) {
    if (pi[i] === len) {
      answer = str.slice(i - len + 1, i + 1);

      break;
    }
  }

  len = pi[len - 1];
}

console.log(answer === "" ? -1 : answer);

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
