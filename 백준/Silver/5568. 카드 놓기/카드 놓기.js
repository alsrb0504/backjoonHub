const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const k = Number(input[1]);
const cards = input.slice(2, 2 + N).map(Number);
const answerSet = new Set();

const dfsStack = [];
const visited = new Array(N).fill(false);

for (let i = 0; i < N; i++) {
  visited[i] = true;
  dfs(0);
  visited[i] = false;
}

console.log(answerSet.size);

function dfs(cnt) {
  if (cnt === k) {
    answerSet.add(dfsStack.join(""));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    dfsStack.push(cards[i]);
    visited[i] = true;
    dfs(cnt + 1);
    visited[i] = false;
    dfsStack.pop();
  }
}
