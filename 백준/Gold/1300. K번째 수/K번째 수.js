const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const k = Number(input[1]);

let answer = Infinity;
let start = 1;
let end = k;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let cnt = 0;

  for (let i = 1; i <= N; i++) {
    if (i > mid) continue;

    let result = Math.floor(mid / i);

    // result의 결과가 행의 수 N을 넘어선다면 N으로 변경.
    result = result > N ? N : result;

    cnt += result;
  }

  if (cnt >= k) {
    answer = Math.min(answer, mid);
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(answer);