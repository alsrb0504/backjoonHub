const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const fives = Math.floor(N / 5);
let min = 100001;

for (let i = 0; i <= fives; i++) {
  const rest = N - 5 * i;

  if (rest % 2 === 1) continue;

  const need = i + rest / 2;

  min = min > need ? need : min;
}

console.log(min === 100001 ? -1 : min);