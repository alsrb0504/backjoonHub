const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const arr = [];
let answer = 0;

for (let n of nums) {
  if (!arr.includes(n)) {
    answer++;
    arr.push(n - 1);
  } else {
    const idx = arr.findIndex((val) => n === val);
    arr[idx]--;
  }
}

console.log(answer);