const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;

const [N, M] = input[0].split(" ").map(Number);

const g = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(INF));
const answer = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(INF));
const checked = Array.from({ length: N + 1 }, () =>
  new Array(N + 1).fill(false)
);

input.slice(1, 1 + M).forEach((el) => {
  const [u, v, cost] = el.split(" ").map(Number);

  g[u][v] = cost;
  g[v][u] = cost;

  answer[u][v] = v;
  answer[v][u] = u;
});

for (let i = 1; i <= N; i++) g[i][i] = 0;

for (let k = 1; k <= N; k++) {
  // 출발 노드
  for (let i = 1; i <= N; i++) {
    // 도착 노드
    for (let j = 1; j <= N; j++) {
      if (g[i][j] > g[i][k] + g[k][j]) {
        g[i][j] = g[i][k] + g[k][j];

        answer[i][j] = k;
      }
    }
  }
}

// 재귀를 통해 최단 경로에서 가장 먼저 방문하는
// 노드를 찾아야 함
for (let i = 1; i <= N; i++) {
  // 도착 노드
  for (let j = 1; j <= N; j++) {
    if (answer[i][j] !== j && i !== j) {
      answer[i][j] = findFirst(i, answer[i][j]);
    }
  }
}

function findFirst(start, end) {
  if (answer[start][end] === end) return end;
  else return findFirst(start, answer[start][end]);
}

const result = [];
for (let i = 1; i <= N; i++) {
  answer[i][i] = "-";

  result.push(answer[i].slice(1).join(" "));
}

console.log(result.join("\n"));