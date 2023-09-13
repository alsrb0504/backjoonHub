const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const queries = input.slice(3, 3 + M).map((el) => el.split(" ").map(Number));
const sum = new Array(N).fill(arr[0]);
const answer = [];

for (let i = 1; i < N; i++) {
  sum[i] = sum[i - 1] + arr[i];
}

sum.unshift(0);

queries.forEach((query) => {
  const [l, r] = query.map((el) => el);

  answer.push(sum[r] - sum[l - 1]);
});

console.log(answer.join("\n"));
