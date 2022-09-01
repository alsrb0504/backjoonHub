const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [S, E] = input[M + 1].split(" ").map(Number);

// N개의 섬과 M개의 다리.
// map 사용
// key : 섬번호
// value [ [dest, cost], [dest, cost] ... ]
const map = new Map();
let max = 0;

for (let i = 0; i < N; i++) {
  map.set(i + 1, []);
}

for (let i = 1; i <= M; i++) {
  const [start, dest, cost] = input[i].split(" ").map(Number);

  max = Math.max(max, cost);

  map.get(start).push([dest, cost]);
  map.get(dest).push([start, cost]);
}

function bfs(curCost) {
  const visited = new Array(N + 1).fill(false);

  const q = [S];
  visited[S] = true;

  while (q.length > 0) {
    const cur = q.shift();
    const bridges = map.get(cur);

    for (let i = 0; i < bridges.length; i++) {
      const [next, cost] = bridges[i];
      if (visited[next]) continue;
      if (cost < curCost) continue;

      // 경로 찾음.
      if (next === E) return true;

      visited[next] = true;
      q.push(next);
    }
  }

  return false;
}

// 이분탐색
let answer = 0;
let start = 1;
let end = max;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  // 이동 가능한지 테스트.
  // 한 번 방문한 다리는 다시 이용 불가능 처리....
  if (bfs(mid)) {
    answer = Math.max(answer, mid);
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);