const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str1 = input[0].trimEnd().split("");
const str2 = input[1].trimEnd().split("");
const dp = Array.from({ length: str1.length }, () =>
  new Array(str2.length).fill(0)
);
let answer = 0;

for (let i = 0; i < str2.length; i++) {
  if (str1[0] === str2[i]) dp[0][i] = 1;
}

for (let i = 1; i < str1.length; i++) {
  for (let j = 0; j < str2.length; j++) {
    const curr = str1[i];

    if (curr === str2[j]) {
      if (j === 0) dp[i][j] = 1;
      else dp[i][j] = dp[i - 1][j - 1] + 1;

      answer = Math.max(answer, dp[i][j]);
    }
  }
}

console.log(answer);