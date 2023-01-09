const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

function solution(line) {
  const [N, M] = input[2 * line + 1].split(" ").map(Number);
  const nums = input[2 * line + 2]
    .split(" ")
    .map((el, idx) => [Number(el), idx]);
  let cnt = 0;

  while (true) {
    const [curr_val, curr_idx] = nums.shift();

    let isPossible = true;

    for (let i = 0; i < nums.length; i++) {
      if (curr_val < nums[i][0]) {
        nums.push([curr_val, curr_idx]);
        isPossible = false;
        break;
      }
    }

    if (!isPossible) continue;

    cnt++;
    if (curr_idx === M) break;
  }

  return cnt;
}