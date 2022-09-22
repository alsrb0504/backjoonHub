const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const nums = input[1].split(" ").map(Number);
const accNums = new Array(N).fill(0);

let acc = 0;
let answer = 0;

nums.forEach((n, idx) => {
  acc += n;
  accNums[idx] = acc;
});

for (let i = N - 1; i >= 0; i--) {
  const cur = accNums[i];

  if (cur === M) {
    answer++;
    continue;
  }

  for (let j = i - 1; j >= 0; j--) {
    const result = cur - accNums[j];

    if (result === M) {
      answer++;
      continue;
    } else if (result > M) {
      break;
    }
  }
}

console.log(answer);