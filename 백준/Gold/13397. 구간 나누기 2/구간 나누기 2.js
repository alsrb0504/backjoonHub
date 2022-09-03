const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [_, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);

let answer = Infinity;
let start = 0;
let end = Math.max.apply(_, nums);

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  // console.log(`start=${start}, mid=${mid}, end=${end}`);

  let max = 0;
  let min = 0;

  let cnt = 1; // 1?
  let tmp = [];

  nums.forEach((v) => {
    if (tmp.length === 0) {
      tmp.push(v);
      max = v;
      min = v;
    } else {
      if (v < min) {
        const diff = max - v;

        if (diff > mid) {
          cnt++;
          min = v;
          max = v;
        }

        min = v;
      } else if (v > max) {
        const diff = v - min;

        if (diff > mid) {
          cnt++;
          max = v;
          min = v;
        }

        max = v;
      }
    }
  });

  // console.log(`cnt = ${cnt}`);

  if (cnt <= M) {
    answer = Math.min(answer, mid);
    end = mid - 1;
  } else {
    start = mid + 1;
  }

  // console.log(`answer = ${answer}`);
}

console.log(answer);