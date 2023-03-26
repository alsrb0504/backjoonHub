const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const FAIL = "IMPOSSIBLE";
const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(solution(i * 2 + 1));
}

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[line]);
  const nums = input[line + 1].split(" ").map(Number).reverse();

  const used = new Array(N + 1).fill(false);
  const result = [];

  for (let num of nums) {
    let cnt = 0;
    let idx = 1;

    for (idx = 1; idx <= N && cnt < num; idx++) {
      if (!used[idx]) cnt++;
    }

    if (cnt === num) {
      let isPossible = false;

      for (; idx <= N; idx++) {
        if (!used[idx]) {
          used[idx] = true;
          isPossible = true;
          break;
        }
      }

      if (isPossible) result.push(idx);
      else return FAIL;
    } else {
      return FAIL;
    }
  }

  return result.reverse().join(" ");
}
