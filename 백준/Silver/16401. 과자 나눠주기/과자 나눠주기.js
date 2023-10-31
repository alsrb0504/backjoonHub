const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const candies = input[1].split(" ").map(Number);
const max = Math.max(...candies);
let answer = 0;

let lt = 0;
let rt = max;
let mid = Math.floor((lt + rt) / 2);

while (lt <= rt) {
  mid = Math.floor((lt + rt) / 2);

  let count = 0;

  for (const candy of candies) {
    count += Math.floor(candy / mid);
  }

  if (count < N) {
    rt = mid - 1;
  } else {
    answer = Math.max(answer, mid);
    lt = mid + 1;
  }
}

console.log(answer);
