const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const g = Array.from({ length: N + 1 }, () => []);
const inDegree = new Array(N + 1).fill(0);
const result = new Array(N + 1).fill(0);
const answer = [];

input.slice(1, 1 + M).forEach((line) => {
  const [u, v] = line.split(" ").map(Number);
  g[u].push(v);

  inDegree[v]++;
});

const q = [];

for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) q.push(i);
}

for (let i = 1; i <= N; i++) {
  const curr = q.shift();
  result[i] = curr;

  for (const next of g[curr]) {
    if (--inDegree[next] === 0) {
      q.push(next);
    }
  }
}

console.log(result.slice(1).join(" "));

