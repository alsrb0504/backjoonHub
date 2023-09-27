const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const INF = Infinity;

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((el) => el.split(""));
let max = 0;

let dist = Array.from({ length: N }, () => new Array(N).fill(INF));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "Y") dist[i][j] = 1;
  }
  dist[i][i] = 0;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < N; k++) {
      if (dist[i][j] > dist[i][k] + dist[k][j]) {
        dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  let cnt = 0;
  for (let j = 0; j < N; j++) {
    if (dist[i][j] <= 2 && dist[i][j] !== 0) cnt++;
  }

  max = Math.max(max, cnt);
}

console.log(max);
