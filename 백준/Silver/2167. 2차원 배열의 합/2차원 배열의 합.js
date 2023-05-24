const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const arr = Array.from({ length: H }, () => new Array(W).fill(0));

input.slice(1, 1 + H).forEach((line, idx) => {
  const nums = line.split(" ").map(Number);

  for (let i = 0; i < W; i++) {
    arr[idx][i] = nums[i];
  }
});

const sum = Array.from({ length: H + 1 }, () => new Array(W + 1).fill(0));
sum[0][0] = arr[0][0];

const answer = [];

const K = Number(input[1 + H]);

input.slice(2 + H, 2 + H + K).forEach((el) => {
  const [x1, y1, x2, y2] = el.split(" ").map((el) => Number(el) - 1);

  answer.push(solution(x1, y1, x2, y2));
});

console.log(answer.join("\n"));

function solution(x1, y1, x2, y2) {
  let sum = 0;

  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      sum += arr[i][j];
    }
  }
  return sum;
}
