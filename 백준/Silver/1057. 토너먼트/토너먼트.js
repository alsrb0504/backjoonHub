const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [_, a, b] = input[0].split(" ").map(Number);

let answer = 1;
let [big, small] = a < b ? [b, a] : [a, b];

while (true) {
  if (big - small === 1 && Math.floor(big / 2) - 1 === Math.floor(small / 2))
    break;

  answer++;

  big = Math.ceil(big / 2);
  small = Math.ceil(small / 2);
}

console.log(answer);
