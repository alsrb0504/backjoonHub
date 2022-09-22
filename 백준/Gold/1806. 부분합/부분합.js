const { exit } = require("process");

const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const accNums = new Array(N).fill(0);

let acc = 0;
let answer = Infinity;

nums.forEach((n, idx) => {
  if (n >= S) {
    console.log(1);
    exit(0);
  }

  acc += n;
  accNums[idx] = acc;
});

for (let i = N - 1; i >= 0; i--) {
  const curAcc = accNums[i];

  if (curAcc >= S) {
    answer = Math.min(answer, i + 1);
  }

  // 누적합이 S 보다 작으면 탐색할 필요가 없음.
  if (curAcc < S) break;

  for (let j = i; j >= 0; j--) {
    const result = curAcc - accNums[j];

    if (result >= S) {
      const diff = i - j;
      answer = Math.min(answer, diff);
      break;
    }
  }
}

console.log(answer === Infinity ? 0 : answer);
