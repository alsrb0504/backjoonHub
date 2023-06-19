const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let [X, Y] = input[0].split(" ").map(Number);
const init = Math.floor((Y * 100) / X);

let answer = -1;

if (init >= 99) {
  console.log(-1);
  return;
}

binarySearch();
console.log(answer);

function binarySearch() {
  let start = 0;
  let end = 1e9;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    const result = Math.floor(((Y + mid) * 100) / (X + mid));

    if (result <= init) {
      start = mid + 1;
      answer = mid + 1;
    } else {
      end = mid - 1;
    }
  }
}
