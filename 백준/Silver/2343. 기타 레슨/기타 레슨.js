const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [_, M] = input[0].split(" ").map(Number);
const times = input[1].split(" ").map(Number);

const sum = times.reduce((acc, cur) => {
  return acc + cur;
}, 0);

let answer = 0;
let start = 0;
let end = sum;

let mid = 0;

while (start <= end) {
  // const mid = Math.floor((start + end) / 2);
  mid = Math.floor((start + end) / 2);

  let cnt = 0;
  let checkSum = 0;

  times.forEach((time) => {
    if (checkSum + time < mid) {
      checkSum += time;
    } else {
      cnt++;

      // 현재 블루레이 사이즈(mid) 보다 큰 강의가 있다면
      // 무조건 크기를 늘려야 함.
      if (time > mid) {
        cnt = Infinity;
      }

      checkSum = time;
    }
  });

  if (cnt >= M) {
    if (cnt !== Infinity) {
      answer = Math.max(answer, mid);
    }
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer === 0 ? mid : answer);