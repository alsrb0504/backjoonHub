const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const g = Array.from({ length: N + 1 }, () => []);
const visited = new Set();
visited.add(1);

input.slice(2, 2 + M).forEach((line) => {
  const [u, v] = line.trimEnd().split(" ").map(Number);
  g[u].push(v);
  g[v].push(u);
});

dfs(1, 0);

visited.delete(1);
console.log(visited.size);

function dfs(curr, count) {
  if (count === 2) {
    return;
  }

  for (let next of g[curr]) {
    visited.add(next);
    dfs(next, count + 1);
  }
}
