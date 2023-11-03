const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const num = BigInt(input[0]);
let left = 1n;
let right = num;
let mid = 1n;

while (left <= right) {
  mid = (left + right) / 2n;

  const pow = mid * mid;

  if (pow < num) {
    left = mid + 1n;
  } else {
    right = mid - 1n;
  }
}

if (num === 0n) {
  console.log(0);
} else {
  console.log(mid * mid >= num ? mid.toString() : (mid + 1n).toString());
}
