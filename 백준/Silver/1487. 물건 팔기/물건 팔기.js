const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const items = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const prices = new Set();
let answer = Infinity;
let max = 0;

items.sort((a, b) => a[0] - b[0]);
items.forEach((price) => {
  prices.add(price[0]);
});

for (let price of prices) {
  let total = 0;

  for (let item of items) {
    const [maxBuyPrice, delFee] = item;

    if (maxBuyPrice >= price && price - delFee > 0) {
      total += price - delFee;
    }
  }

  if (total > max) {
    max = total;
    answer = price;
  }
}

console.log(answer !== Infinity ? answer : 0);
