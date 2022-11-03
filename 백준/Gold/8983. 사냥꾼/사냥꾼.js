const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M, L] = input[0].split(" ").map(Number);

const shoots = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const targets = input
  .slice(2, 2 + M)
  .map((line) => line.split(" ").map(Number));

let answer = 0;

function binarySearch(y, x) {
  const left = x + y - L;
  const right = x - y + L;

  let start = 0;
  let end = N - 1;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (left <= shoots[mid] && shoots[mid] <= right) {
      answer++;
      break;
    }

    if (shoots[mid] < left) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
}

targets.forEach((pos) => {
  const [x, y] = pos;

  binarySearch(y, x);
});

console.log(answer);