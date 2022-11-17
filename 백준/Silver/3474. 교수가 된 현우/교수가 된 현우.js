const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const nums = input.slice(1, 1 + N).map(Number);

const fives = [];
let cnt = 1;

while (true) {
  const pow = Math.pow(5, cnt);

  if (pow > 1000000000) break;

  cnt++;
  fives.push(pow);
}

const answer = [];

for (let i = 0; i < N; i++) {
  const cur = nums[i];
  let result = 0;
  let idx = 0;
  let std = fives[idx];

  while (cur >= std) {
    result += Math.floor(cur / std);

    std = fives[++idx];
  }

  answer.push(result);
}

console.log(answer.join("\n").trimEnd());