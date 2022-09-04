const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const map = [];

for (let i = 1; i <= N; i++) {
  map.push(input[i].split(" ").map(Number));
}

let max = -1;
let min = 201;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    max = Math.max(max, map[i][j]);
    min = Math.min(min, map[i][j]);
  }
}

const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function bfs(mid) {
  // console.log(`mid = ${mid}`);

  // 탐색 범의 지정
  for (let i = 0; i + mid <= 200; i++) {
    let small = i;
    let big = i + mid;

    // 시작 숫자도 범위에 포함되어야 함.
    // if (map[0][0] < small || map[0][0] > big) return false;
    if (map[0][0] < small || map[0][0] > big) continue;

    // 방문처리 배열 생성 및 미리 갈 수 없는 길은 방문 처리.
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));

    for (let j = 0; j < N; j++) {
      for (let k = 0; k < N; k++) {
        if (map[j][k] < small || map[j][k] > big) visited[j][k] = true;
      }
    }

    // console.log(`small = ${small}, big=${big} `);
    // console.table(visited);

    // [y, x]
    const q = [[0, 0]];

    while (q.length) {
      let [y, x] = q.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
        if (visited[ny][nx]) continue;

        // const nv = map[ny][nx];

        if (ny === N - 1 && nx === N - 1) {
          // console.log("success", mid);
          // console.table(visited);

          return true;
        }

        visited[ny][nx] = true;
        q.push([ny, nx]);
      }
    }
  }

  // console.log("fail", mid);
  // console.table(visited);

  return false;
}

// 이분탐색 + BFS로 구현
// 문제는 BFS 탐색 원소마다 최대, 최소를 개별적으로 관리
let answer = 201;
let start = 0;
let end = max;

while (start <= end) {
  // console.log(`start=${start}, end=${end}`);
  const mid = Math.floor((start + end) / 2);

  if (bfs(mid)) {
    answer = Math.min(answer, mid);
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(answer);