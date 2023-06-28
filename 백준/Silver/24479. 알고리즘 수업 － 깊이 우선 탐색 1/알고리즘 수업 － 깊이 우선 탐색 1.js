const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M, R] = input[0].split(" ").map(Number);
const g = Array.from({ length: N + 1 }, () => []);
const visited = new Array(N + 1).fill(0);
let count = 1;

input.slice(1, 1 + M).forEach((info) => {
  const [u, v] = info.split(" ").map(Number);

  g[u].push(v);
  g[v].push(u);
});

for (let i = 1; i <= N; i++) {
  g[i].sort((a, b) => a - b);
}

dfs(R);

console.log(visited.slice(1).join("\n"));

function dfs(curr) {
  visited[curr] = count++;

  for (let next of g[curr]) {
    if (visited[next] > 0) continue;
    dfs(next);
  }
}
