const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(solution(i * 2 + 1));
}

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[line]);
  const prices = input[line + 1].split(" ").map(Number);
  let profit = 0;
  let currMaxPrice = 0;

  for (let i = N - 1; i >= 0; i--) {
    const price = prices[i];

    if (price > currMaxPrice) {
      currMaxPrice = price;
    } else {
      profit += currMaxPrice - price;
    }
  }

  return profit;
}
