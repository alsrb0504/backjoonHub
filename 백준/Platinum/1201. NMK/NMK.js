const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split(" ");

const [N, M, K] = input.map(Number);

if (M + K - 1 > N || N > M * K) {
  console.log(-1);
  return;
}

const nums = [];
for (let i = 0; i < N; i++) {
  nums.push(i + 1);
}

const nmk = [];
const first = K;

const restGroup = M - 1;
let restNum = N - first;
let restCnt = restNum % restGroup;

let curIdx = first;

for (let i = first; i > 0; i--) {
  nmk.push(i);
}

// 9, 4
for (let i = 0; i < restGroup; i++) {
  let cnt = Math.floor(restNum / restGroup);

  if (restCnt > 0) {
    restCnt--;
    cnt++;
  }

  for (let j = curIdx + cnt; j > curIdx; j--) {
    nmk.push(j);
  }

  curIdx += cnt;
}

console.log(nmk.join(" "));