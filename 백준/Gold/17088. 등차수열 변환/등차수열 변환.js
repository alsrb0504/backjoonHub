const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

let answer = Infinity;

if (N === 1) {
  console.log(0);
  return;
}

for (let i = -1; i < 2; i++) {
  for (let j = -1; j < 2; j++) {
    let startCnt = 0;
    const diff = nums[1] + j - (nums[0] + i);
    if (i !== 0) startCnt++;
    if (j !== 0) startCnt++;

    solution(startCnt, nums[1] + j, 2, diff);
  }
}

console.log(answer === Infinity ? -1 : answer);

function solution(cnt, prev, idx, diff) {
  if (idx === nums.length) {
    answer = Math.min(answer, cnt);
    return;
  }

  const next = nums[idx];

  for (let i = -1; i < 2; i++) {
    const nextNum = next + i;
    const nextDiff = nextNum - prev;

    if (diff === nextDiff) {
      if (i !== 0) {
        solution(cnt + 1, nextNum, idx + 1, diff);
      } else {
        solution(cnt, nextNum, idx + 1, diff);
      }
    }
  }
}
