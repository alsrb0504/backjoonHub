const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str1 = ["1", ...input[0].trimEnd().split("")];
const str2 = ["2", ...input[1].split("")];

const str1_length = str1.length;
const str2_length = str2.length;

const dp = Array.from({ length: str1_length }, () =>
  new Array(str2_length).fill(0)
);

for (let i = 1; i < str1_length; i++) {
  for (let j = 1; j < str2_length; j++) {
    if (str1[i] === str2[j]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
    }
  }
}

console.log(dp[str1_length - 1][str2_length - 1]);
