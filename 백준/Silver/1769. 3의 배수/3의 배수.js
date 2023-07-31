const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let nums = input[0].split("").map(Number);
let count = 0;

while (true) {
  const size = nums.length;

  if (size <= 1) break;

  const num = nums.reduce((acc, cur) => acc + cur, 0);
  nums = num.toString().split("").map(Number);
  count++;
}

const answer = Number(nums.join("")) % 3 === 0 ? "YES" : "NO";

console.log(count + "\n" + answer);
