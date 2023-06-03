const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;
const [N, M] = input[0].split(" ").map(Number);
const dist = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(INF));
let answer = { vertix: -1, min: INF };

for (let i = 1; i <= M; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  dist[u][v] = 1;
  dist[v][u] = 1;
}

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

for (let i = 1; i <= N; i++) {
  const sum = dist[i].slice(1).reduce((acc, cur) => acc + cur, 0);

  if (answer.min > sum) {
    answer.vertix = i;
    answer.min = sum;
  }
}

console.log(answer.vertix);
