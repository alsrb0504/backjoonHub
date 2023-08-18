const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, P] = input[0].split(" ").map(Number);
let length = P;
let answer = [];

while (length <= 100) {
  const mid = Math.floor(N / length);
  const nums = [mid];

  let sum = mid;
  let isPossible = true;

  for (let i = 1; i < length; i++) {
    const tmp = Math.ceil(i / 2);

    if (sum > N || (i % 2 === 0 && mid - tmp < 0)) {
      isPossible = false;
      break;
    }

    // +
    if (i % 2 === 1) {
      const plus = mid + tmp;
      sum += plus;
      nums.push(plus);
    } else {
      const minus = mid - tmp;
      sum += minus;
      nums.push(minus);
    }
  }

  if (isPossible && sum === N) {
    answer = [...nums];
    break;
  }

  length++;
}

console.log(answer.length === 0 ? -1 : answer.sort((a, b) => a - b).join(" "));
