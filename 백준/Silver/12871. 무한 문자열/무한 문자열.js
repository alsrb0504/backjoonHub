const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str1 = input[0].trimEnd();
const str2 = input[1].trimEnd();
let answer = false;

if (str1.length > str2.length) {
  answer = solution(str1, str2);
} else {
  answer = solution(str2, str1);
}

console.log(answer ? 1 : 0);

function solution(big, small) {
  const longBig = big + big;

  for (let i = 0; i < big.length * 2; i++) {
    const idx = i % small.length;

    if (longBig[i] !== small[idx]) return false;
  }

  return true;
}