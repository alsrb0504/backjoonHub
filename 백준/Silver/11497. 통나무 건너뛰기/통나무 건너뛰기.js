const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(2 * i + 1));
}

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[line]);
  const nums = input[line + 1]
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

  const result = new Array(N).fill(0);

  const mid = Math.floor(N / 2);
  let right = mid + 1;
  let left = mid;
  let isLeftTurn = true;

  if (N % 2 === 0) {
    left = mid - 1;
    right = left + 1;
  }

  nums.forEach((num) => {
    if (isLeftTurn) {
      result[left--] = num;
    } else {
      result[right++] = num;
    }

    isLeftTurn = !isLeftTurn;
  });

  let max = 0;
  for (let i = 1; i < N; i++) {
    max = Math.max(max, Math.abs(result[i] - result[i - 1]));
  }

  return max;
}
