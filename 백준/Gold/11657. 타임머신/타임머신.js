const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const INF = Infinity;
const [N, M] = input[0].split(" ").map(Number);
const edges = input.slice(1, 1 + M).map((el) => el.split(" ").map(Number));
const dist = new Array(N + 1).fill(INF);

const negative_cycle = bf(1);

if (negative_cycle) {
  console.log(-1);
  return;
}

dist.shift();
dist.shift();

const answer = dist.map((el) => {
  if (el === INF) return -1;
  return el;
});

console.log(answer.join("\n"));

function bf(start) {
  dist[start] = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const [cur, next, cost] = edges[j];

      if (dist[cur] != INF && dist[next] > dist[cur] + cost) {
        dist[next] = dist[cur] + cost;

        if (i === N - 1) {
          return true;
        }
      }
    }
  }

  return false;
}
