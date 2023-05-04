const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const alphas = [
  3, 2, 1, 2, 3, 3, 2, 3, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1,
];

const name1 = input[0].trimEnd();
const name2 = input[1].trimEnd();
const SIZE = name1.length;
const dp = Array.from({ length: SIZE * 2 - 1 }, () =>
  new Array(SIZE * 2).fill(0)
);

for (let i = 0; i < SIZE; i++) {
  dp[0][i * 2] = alphas[name1[i].charCodeAt() - 65];
  dp[0][i * 2 + 1] = alphas[name2[i].charCodeAt() - 65];
}

for (let i = 1, curr = SIZE * 2 - 1; i < SIZE * 2 - 1; i++) {
  //
  for (let j = 0; j < curr; j++) {
    //
    dp[i][j] = (dp[i - 1][j] + dp[i - 1][j + 1]) % 10;
  }

  curr--;
  dp[i];
}

console.log(dp.at(-1).slice(0, 2).join(""));