const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K, X] = input[0].split(" ").map(Number);
const cands = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const sum = cands.reduce((acc, cur) => acc + cur[0], 0);
const dp = Array.from({ length: N }, () =>
  Array.from({ length: K }, () => new Array(sum + 1).fill(false))
);
let answer = 0;

// 초기 설정
for (let i = 0; i < N; i++) {
  const curr = cands[i][0];
  dp[i][0][curr] = true;
}

for (let i = 1; i < N; i++) {
  for (let j = 0; j <= sum; j++) {
    if (dp[i - 1][0][j]) dp[i][0][j] = true;
  }
}

// i : 뽑은 횟수, j : ~번쨰 카드까지. t : ~sum까지.
for (let i = 1; i < K; i++) {
  for (let j = i; j < N; j++) {
    const curr = cands[j][0];

    for (let t = 0; t <= sum; t++) {
      if (j !== 0 && dp[j - 1][i][t]) dp[j][i][t] = true;

      if (dp[j - 1][i - 1][t]) {
        dp[j][i][t + curr] = true;
      }
    }
  }
}

const max = X * K;

for (let i = 0; i <= sum; i++) {
  if (dp[N - 1][K - 1][i]) {
    const tmp = i * (max - i);

    answer = answer < tmp ? tmp : answer;
  }
}

console.log(answer);