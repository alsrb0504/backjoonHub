const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [S, E] = input[M + 1].split(" ").map(Number);

// N개의 섬과 M개의 다리.
// map
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

// console.log(map);
// console.log(max);

// 이분탐색
let answer = 0;
let start = 1;
let end = max;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);

  // 이동 가능한지 테스트.
  // 한 번 방문한 다리는 다시 이용 불가능 처리....
  // 경로 탐색에 BFS??
  // 근데 다리가 여러개...

  // console.log(`mid=${mid}, ${bfs(mid)}`);

  if (bfs(mid)) {
    answer = Math.max(answer, mid);
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);

// 단순 bfs로는 안 됨.
// 점 방문으로 끝나는 것이 아닌
// 다리 사용 여부 판단.
function bfs(curCost) {
  const visited = new Array(N + 1).fill(false);

  const q = [S];
  visited[S] = true;

  while (q.length > 0) {
    const cur = q.shift();
    // 방문처리를 큐에 삽입할 떄
    // visited[cur] = true;
    const bridges = map.get(cur);

    // console.log(`cur=${cur}, bridges=`);

    // console.log(bridges);

    // console.log("\n");

    for (let i = 0; i < bridges.length; i++) {
      const [next, cost] = bridges[i];
      if (visited[next]) continue;
      if (cost < curCost) continue;

      if (next === E) return true;

      visited[next] = true;
      q.push(next);
    }
  }

  return false;
}