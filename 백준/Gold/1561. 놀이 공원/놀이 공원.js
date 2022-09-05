const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

// 예외 : 아이들의 수가 놀이기구 수보다 작을 경우.
if (N < M) {
  console.log(N);
  return;
}

const max = Math.max.apply(null, nums);

let answer = 0;
let start = 0;
let end = max * N;

let minTime = Infinity;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  let cnt = M;

  nums.forEach((n) => {
    cnt += Math.floor(mid / n);
  });

  if (cnt >= N) {
    minTime = Math.min(minTime, mid);
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

let prevCnt = M;
nums.forEach((n) => {
  prevCnt += Math.floor((minTime - 1) / n);
});

for (let i = 0; i < M; i++) {
  if (minTime % nums[i] === 0) {
    prevCnt++;
  }

  if (prevCnt === N) {
    answer = i + 1;
    break;
  }
}

console.log(answer);