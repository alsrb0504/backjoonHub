const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M, start] = input[0].split(" ").map(Number);

const g = Array.from({ length: N + 1 }, () => []);
const visited = new Array(N + 1).fill(0);
const q = [start];
const answer = [];
let count = 2;

visited[start] = 1;

input.slice(1, 1 + M).forEach((line) => {
  const [u, v] = line.split(" ").map(Number);
  g[u].push(v);
  g[v].push(u);
});

for (let i = 1; i <= N; i++) {
  g[i].sort((a, b) => a - b);
}

while (q.length) {
  const curr = q.shift();

  for (const next of g[curr]) {
    if (visited[next] !== 0) continue;

    visited[next] = count++;
    q.push(next);
  }
}

for (let i = 1; i <= N; i++) {
  const curr = visited[i];
  answer.push(curr);
}

console.log(answer.join("\n"));
