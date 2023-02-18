const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(BigInt);

let [min_idx, max_idx] = [0, N - 1];
let min = Infinity;

let [left, right] = [0, N - 1];

while (left < right) {
  const tmp = arr[left] + arr[right];
  const abs_tmp = tmp < 0n ? tmp * -1n : tmp;

  if (min > abs_tmp) {
    [min_idx, max_idx] = [left, right];
    min = abs_tmp;
  }

  if (tmp < 0n) {
    left++;
  } else {
    right--;
  }

}

console.log(arr[min_idx].toString(), arr[max_idx].toString());
