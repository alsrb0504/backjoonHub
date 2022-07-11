const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let [N, dest] = input.shift().split(" ").map(Number);
const coins = [];
let cnt = 0;

for (let i = 0; i < N; i++) {
  coins.push(Number(input[i]));
}

for (let i = N - 1; i > -1; i--) {
  if (dest < coins[i]) continue;

  const needs = Math.floor(dest / coins[i]);
  dest -= needs * coins[i];
  cnt += needs;
}

console.log(cnt);