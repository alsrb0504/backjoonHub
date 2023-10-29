const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
let answer = Infinity;

binarySearch();

console.log(answer);

function binarySearch() {
  let left = 1;
  // let right = 100000;
  let right = 10000000000;

  let mid = Math.floor((left + right) / 2);

  while (left <= right) {
    mid = Math.floor((left + right) / 2);

    const resultCnt = checkCount(mid);

    if (resultCnt > M) {
      left = mid + 1;
    } else {
      answer = Math.min(answer, mid);
      right = mid - 1;
    }
  }
}

function checkCount(std) {
  let cnt = 0;
  let currSave = 0;

  for (const price of data) {
    if (currSave < price) {
      // 예외 처리
      if (std < price) return 10000000001;

      cnt++;
      currSave = std - price;
    } else {
      currSave -= price;
    }
  }

  return cnt;
}
