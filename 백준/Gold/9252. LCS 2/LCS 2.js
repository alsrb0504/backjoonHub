const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str1 = [0, ...input[0].trimEnd().split("")];
const str2 = [0, ...input[1].trimEnd().split("")];
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
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

let lcs = [];
let j = str2_length - 1;

for (let i = str1_length - 1; i > 0; i--) {
  for (; j > 0; j--) {
    // 왼쪽보다 크면
    if (dp[i][j - 1] < dp[i][j]) {
      lcs.push(str2[j]);
      j--;
      break;
    }

    // 같으면 위로 이동.
    if (dp[i][j - 1] === dp[i - 1][j]) {
      break;
    }
  }
}

let answer = `${dp[str1_length - 1][str2_length - 1]}\n${lcs
  .reverse()
  .join("")}`;
console.log(answer);
