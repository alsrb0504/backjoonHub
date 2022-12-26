const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const tc = Number(input[2]);
const answer = [];

const dp = Array.from({ length: N }, () => new Array(N).fill(false));

for (let i = 0; i < N; i++) {
  const stack = [nums[i]];
  const std = nums[i];
  dp[i][i] = true;

  for (let j = i + 1; j < N; j++) {
    let src = 0;
    let dst = j - i;

    stack.push(nums[j]);

    // 시작과 끝이 다르면 X.
    if (std !== nums[j]) continue;

    let isPossible = true;

    // 투 포인터
    while (src <= dst && isPossible) {
      if (stack[src] !== stack[dst]) {
        isPossible = false;
        break;
      }

      src++;
      dst--;
    }

    if (isPossible) dp[i][j] = true;
  }
}

input.slice(3, 3 + tc).forEach((el) => {
  const [src, dst] = el.split(" ").map(Number);
  if (dp[src - 1][dst - 1]) answer.push(1);
  else answer.push(0);
});

console.log(answer.join("\n"));