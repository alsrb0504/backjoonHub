const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const lines = input
  .slice(1, 1 + N)
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => b[0] - a[0]);

const MAX = 502;

// [연결 목적지, 갯수]
const dp = Array.from({ length: MAX }, () => [-1, 0]);

lines.forEach((el) => {
  const [src, dst] = el;
  dp[src][0] = dst;
  dp[src][1] = 1;
});

for (let i = MAX - 2; i > 0; i--) {
  // 선이 없다면
  if (dp[i][0] === -1) {
    [dp[i][0], dp[i][1]] = [dp[i + 1][0], dp[i + 1][1]];
  }
  // 선이 있다면
  else {
    let j = i + 1;
    while (j < MAX && dp[j][0] !== -1) {
      if (dp[i][0] < dp[j][0]) {
        dp[i][1] = dp[i][1] < dp[j][1] + 1 ? dp[j][1] + 1 : dp[i][1];
      }

      j++;
    }
  }
}

let max_lines = 0;
for (let i = 1; i < MAX; i++) {
  max_lines = max_lines < dp[i][1] ? dp[i][1] : max_lines;
}

console.log(lines.length - max_lines);
