const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const lis = [nums[0]];

for (let i = 1; i < N; i++) {
  const curr = nums[i];

  let left = 0;
  let right = lis.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (curr < lis[mid]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  if (right === lis.length) lis.push(curr);
  else lis[right] = curr;
}

console.log(lis.length);