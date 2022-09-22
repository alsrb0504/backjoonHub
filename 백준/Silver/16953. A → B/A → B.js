const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);
let answer = Infinity;

function dfs(cnt, cur) {
  if (cur > B) return;

  if (cur === B) {
    answer = Math.min(answer, cnt + 1);
    return;
  }

  dfs(cnt + 1, cur * 2);
  dfs(cnt + 1, cur * 10 + 1);
}

dfs(0, A);

console.log(answer === Infinity ? -1 : answer);