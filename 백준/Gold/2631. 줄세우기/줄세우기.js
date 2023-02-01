const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1, 1 + N).map(Number);
const lis = [arr[0]];

for (let i = 1; i < N; i++) {
  let [left, right] = [0, lis.length];

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (lis[mid] < arr[i]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  if (lis.length === right) {
    lis.push(arr[i]);
  } else {
    lis[right] = arr[i];
  }
}

console.log(N - lis.length);
