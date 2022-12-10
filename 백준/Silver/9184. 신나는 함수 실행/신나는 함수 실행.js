const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const dp = Array.from({ length: 21 }, () =>
  Array.from({ length: 21 }, () => new Array(21).fill(1))
);

for (let i = 1; i < 21; i++) {
  for (let j = 1; j < 21; j++) {
    for (let k = 1; k < 21; k++) {
      if (i < j && j < k) {
        dp[i][j][k] = dp[i][j][k - 1] + dp[i][j - 1][k - 1] - dp[i][j - 1][k];
      } else {
        dp[i][j][k] =
          dp[i - 1][j][k] +
          dp[i - 1][j - 1][k] +
          dp[i - 1][j][k - 1] -
          dp[i - 1][j - 1][k - 1];
      }
    }
  }
}

const answer = [];

input.forEach((line) => {
  const [a, b, c] = line.split(" ").map(Number);

  if (a === -1 && b === -1 && c === -1) {
    console.log(answer.join("\n").trimEnd());
  }

  if (a <= 0 || b <= 0 || c <= 0) {
    answer.push(`w(${a}, ${b}, ${c}) = 1`);
  } else if (a > 20 || b > 20 || c > 20) {
    answer.push(`w(${a}, ${b}, ${c}) = ${dp[20][20][20]}`);
  } else {
    answer.push(`w(${a}, ${b}, ${c}) = ${dp[a][b][c]}`);
  }
});
