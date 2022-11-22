const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const INF = Infinity;
const N = Number(input[0]);
const M = Number(input[1]);
const path = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(INF));

input.slice(2, 2 + M).forEach((line) => {
  const [start, dest, cost] = line.split(" ").map(Number);

  path[start][dest] = path[start][dest] > cost ? cost : path[start][dest];
});

for (let i = 1; i <= N; i++) {
  path[i][i] = 0;
}

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (path[i][k] + path[k][j] < path[i][j]) {
        path[i][j] = path[i][k] + path[k][j];
      }
    }
  }
}

let answer = "";

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    if (path[i][j] === INF) path[i][j] = 0;
  }
}

for (let i = 1; i <= N; i++) {
  answer += path[i].slice(1).join(" ") + "\n";
}

console.log(answer.trimEnd());