const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const boxes = input[1].split(" ").map(Number);
const dp = Array.from({ length: N }, () => new Array(2).fill(0));
// [num, cnt]
dp[0] = [boxes[0], 1];

for (let i = 1; i < N; i++) {
  const curr_num = boxes[i];

  let max = 0;

  for (let j = 0; j < i; j++) {
    if (boxes[j] < curr_num && max < dp[j][1]) {
      max = dp[j][1];
    }
  }

  dp[i] = [curr_num, max + 1];
}

let answer = 0;
for (let i = 0; i < N; i++) {
  answer = answer < dp[i][1] ? dp[i][1] : answer;
}

console.log(answer);
