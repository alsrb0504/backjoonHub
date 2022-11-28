const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const stores = input[1].split(" ").map(Number);

let answer = 0;
let cur = 0;

for (let i = 0; i < N; i++) {
  const store = stores[i];

  if (store === cur) {
    answer++;
    cur = (cur + 1) % 3;
  }
}

console.log(answer);