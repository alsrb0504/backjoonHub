const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(2 * i + 1));
}

console.log(answer.join("\n"));

function solution(line) {
  const N = Number(input[line]);
  const dir = input[line + 1].split(" ").map(Number);
  const next = new Array(N + 1).fill(0);
  const visited = new Array(N + 1).fill(false);
  let count = 0;

  dir.forEach((node, idx) => {
    next[idx + 1] = node;
  });

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;

    dfs(i);
    count++;
  }

  return count;

  function dfs(node) {
    if (visited[node]) return;

    visited[node] = true;
    dfs(next[node]);
  }
}
