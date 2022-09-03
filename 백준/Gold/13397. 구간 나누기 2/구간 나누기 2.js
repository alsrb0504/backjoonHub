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

  let max = nums[0];
  let min = nums[0];
  let cnt = 1; // 1?

  nums.forEach((v) => {
    let isChange = false;

    if (v < min) {
      const diff = max - v;

      if (diff > mid) {
        isChange = true;
      }

      min = v;
    } else if (v > max) {
      const diff = v - min;

      if (diff > mid) {
        isChange = true;
      }

      max = v;
    }

    if (isChange) {
      cnt++;
      max = v;
      min = v;
    }
  });

  if (cnt <= M) {
    answer = Math.min(answer, mid);
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(answer);