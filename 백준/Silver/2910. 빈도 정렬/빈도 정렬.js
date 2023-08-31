const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

const countMap = new Map();
const orderMap = new Map();
const answer = [];

for (let i = 0; i < N; i++) {
  const curr = nums[i];

  if (countMap.has(curr)) {
    countMap.set(curr, countMap.get(curr) + 1);
  } else {
    countMap.set(curr, 1);
    orderMap.set(curr, i);
  }
}

const counts = [...countMap];

counts.sort((a, b) => {
  if (a[1] !== b[1]) {
    return b[1] - a[1];
  }

  const orderA = orderMap.get(a[0]);
  const orderB = orderMap.get(b[0]);

  return orderA - orderB;
});

for (const [num, count] of counts) {
  for (let i = 0; i < count; i++) {
    answer.push(num);
  }
}

console.log(answer.join(" "));
