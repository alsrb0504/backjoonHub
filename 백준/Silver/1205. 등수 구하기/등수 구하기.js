const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K, P] = input[0].split(" ").map(Number);

if (N === 0) {
  console.log(1);
  return;
}

const nums = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => b - a);

let isPossible = true;

// 1. 새로운 점수가 마지막 점수보다 높다면
if (nums.at(-1) < K) {
  nums.push(K);
  nums.sort((a, b) => b - a);
}
// 2. 마지막 점수와 같다면
else if (nums.at(-1) === K) {
  if (N < P) {
    nums.push(K);
    nums.sort((a, b) => b - a);
  } else {
    isPossible = false;
  }
}
// 3. 마지막 점수보다 작다면
else {
  if (N < P) {
    nums.push(K);
    nums.sort((a, b) => b - a);
  } else {
    isPossible = false;
  }
}

let answer = 0;
let isDuplicate = false;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] > K) answer++;
  else if (nums[i] >= K) {
    if (!isDuplicate) {
      isDuplicate = true;
      answer++;
    }
  }
}

if (isPossible) console.log(answer);
else console.log(-1);
