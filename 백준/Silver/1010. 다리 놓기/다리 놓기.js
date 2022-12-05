const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const tc = Number(input[0]);
const data = input.slice(1, 1 + tc);
const answer = [];
const dp = new Array(31).fill(1n);

function conbmi(n, m) {
  return dp[n] / (dp[m] * dp[n - m]);
}

for (let i = 1; i <= 30; i++) {
  dp[i] = dp[i - 1] * BigInt(i);
}

data.forEach((line) => {
  const [M, N] = line.split(" ").map(Number);

  answer.push(conbmi(N, M));
});

console.log(answer.join("\n").trimEnd());
