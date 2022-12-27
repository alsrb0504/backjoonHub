const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [h, w] = input[0].split(" ").map(Number);
const board = input
  .slice(1, 1 + h)
  .map((el) => el.trimEnd().split("").map(Number));
const dp = Array.from({ length: h }, () => new Array(w).fill(0));

let answer = 0;

for (let i = 0; i < h; i++) {
  dp[i][w - 1] = board[i][w - 1];
}

for (let i = 0; i < w; i++) {
  dp[h - 1][i] = board[h - 1][i];
}

for (let i = h - 2; i >= 0; i--) {
  for (let j = w - 2; j >= 0; j--) {
    if (board[i][j] === 0) continue;

    const n1 = dp[i + 1][j];
    const n2 = dp[i + 1][j + 1];
    const n3 = dp[i][j + 1];

    if (n1 == 0 || n2 === 0 || n3 === 0) {
      dp[i][j] = 1;
      continue;
    }

    if (n1 === n2 && n2 === n3) {
      dp[i][j] = n1 + 1;
    } else {
      dp[i][j] = Math.min(n1, n2, n3) + 1;
    }
  }
}

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    answer = answer < dp[i][j] ? dp[i][j] : answer;
  }
}

console.log(answer * answer);