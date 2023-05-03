const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = [];
const SIZE = 65;

const dp = Array.from({ length: SIZE }, () => new Array(10).fill(0n));
for (let i = 0; i < 10; i++) dp[1][i] = 1n;

for (let i = 2; i < SIZE; i++) {
  for (let j = 0; j < 10; j++) {
    const prev = dp[i - 1][j];

    for (let k = j; k < 10; k++) {
      dp[i][k] += prev;
    }
  }
}

for (let i = 0; i < N; i++) {
  const num = Number(input[i + 1]);
  const sum = dp[num].reduce((acc, cur) => acc + cur, 0n);
  answer.push(sum);
}

console.log(answer.join("\n"));
