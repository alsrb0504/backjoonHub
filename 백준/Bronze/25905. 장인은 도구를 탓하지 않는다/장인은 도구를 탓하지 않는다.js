const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const p = input
  .slice(0, 10)
  .map(Number)
  .sort((a, b) => b - a);

let answer = 1;

for (let i = 0; i < 9; i++) {
  const per = p[i] / (i + 1);
  answer *= per;
}

console.log(answer * 10 ** 9);
