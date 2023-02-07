const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [t, w] = input[0].split(" ").map(Number);

const nums = input.slice(1, 1 + t).map(Number);
const trees = [];

if (nums[0] === 2) trees.push(0);

let prev = nums[0];
let cnt = 1;

for (let i = 1; i < t; i++) {
  if (prev === nums[i]) cnt++;
  else {
    trees.push(cnt);
    cnt = 1;
    prev = nums[i];
  }
}
trees.push(cnt);

const dp = Array.from({ length: w + 1 }, () => new Array(trees.length).fill(0));

let acc = 0;
for (let i = 0; i < trees.length; i += 2) {
  acc += trees[i];
  dp[0][i] = acc;
}

for (let i = 0; i < w; i++) {
  for (let j = i + 1; j < trees.length; j++) {
    if (i % 2 === 0) {
      if (j % 2 === 1)
        if (j - 2 >= 0) {
          dp[i + 1][j] = Math.max(
            dp[i][j - 1] + trees[j],
            dp[i + 1][j - 2] + trees[j]
          );
        } else {
          dp[i + 1][j] = dp[i][j - 1] + trees[j];
        }
    } else {
      if (j % 2 === 0) {
        if (j - 2 >= 0) {
          dp[i + 1][j] = Math.max(
            dp[i][j - 1] + trees[j],
            dp[i + 1][j - 2] + trees[j]
          );
        } else {
          dp[i + 1][j] = dp[i][j - 1] + trees[j];
        }
      }
    }
  }
}

for (let i = 0; i <= w; i++) {
  dp[i][trees.length - 1] = Math.max(...dp[i]);
}

let answer = 0;

for (let i = 0; i <= w; i++) answer = Math.max(answer, dp[i][trees.length - 1]);

console.log(answer);
