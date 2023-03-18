const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = +input[0];
const lines = input[1].split(" ").map(Number);
const tree = Array.from({ length: 2 ** N }, () => [0, 0]);
const dp = Array.from({ length: 2 ** N }, () => [0, 0]);

lines.forEach((cost, idx) => {
  const position = Math.floor(idx / 2) + 1;

  if (idx % 2 === 0) {
    tree[position][0] = cost;
  } else {
    tree[position][1] = cost;
  }
});

for (let i = 2 ** (N - 1); i < 2 ** N; i++) {
  dp[i][0] = tree[i][0];
  dp[i][1] = tree[i][1];
}

for (let i = N; i >= 1; i--) {
  for (let j = 2 ** (i - 1); j < 2 ** i; j++) {
    const max = Math.max(dp[j][0], dp[j][1]);
    dp[j][0] = max;
    dp[j][1] = max;

    const parent = Math.floor(j / 2);

    if (j % 2 === 0) {
      dp[parent][0] = max + tree[parent][0];
    } else {
      dp[parent][1] = max + tree[parent][1];
    }
  }
}

let answer = 0;

for (let i = 0; i < N - 1; i++) {
  for (let j = 2 ** i; j < 2 ** (i + 1); j++) {
    answer += dp[j][0] - dp[j * 2][0];
    answer += dp[j][1] - dp[j * 2 + 1][0];
  }
}

for (let i = 2 ** (N - 1); i < 2 ** N; i++) {
  answer += dp[i][0] + dp[i][1];
}

console.log(answer);