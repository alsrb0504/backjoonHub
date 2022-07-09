const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());

const map = input.map((v) => v.split(" ").map(Number));

// console.table(map);

const dy = [-1, 0, 0, 1];
const dx = [0, -1, 1, 0];

const eats = new Array(7).fill(0);

console.log(bfs());

function bfs() {
  // 시작 위치 찾기.
  let cur = [];
  let lv = 2;
  let dist = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) {
        cur = [i, j];
        map[i][j] = 0;
      }
    }
  }

  while (true) {
    const q = [];
    const visited = Array.from({ length: N }, () => new Array(N).fill(false));

    let movCnt = 0;

    // [y, x, 이동거리]
    q.push([...cur, 0]);

    const smallq = [];

    // 실질적인 BFS
    while (q.length) {
      // 이동거리가 필요하지 레벨이 필요한 게 아님.
      const [y, x, cnt] = q.shift();

      // 먹이 발견
      if (map[y][x] < lv && map[y][x] !== 0) {
        // map[y][x] = 0;

        // eats[lv]++;

        // if (eats[lv] === lv) {
        //   // 레벨 업
        //   lv++;
        // }
        // cur = [y, x];
        // movCnt = cnt;

        // break;

        smallq.push([y, x, cnt]);
      }

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        // 범위 체크
        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;

        // 물고기 레벨 체크
        if (map[ny][nx] > lv) continue;

        // 방문 체크
        if (visited[ny][nx]) continue;

        q.push([ny, nx, cnt + 1]);
        visited[ny][nx] = true;
      }
    }

    if (smallq.length) {
      smallq.sort((a, b) => {
        // return a[2] - b[2] && a[0] - b[0] && [1] - b[1];
        if (a[2] !== b[2]) {
          return a[2] - b[2];
        } else {
          if (a[0] !== b[0]) {
            return a[0] - b[0];
          } else {
            return a[1] - b[1];
          }
        }
      });

      // feed
      const [fy, fx, fCnt] = smallq[0];

      map[fy][fx] = 0;

      eats[lv]++;
      if (eats[lv] === lv) {
        //   // 레벨 업
        lv++;
      }
      cur = [fy, fx];
      movCnt = fCnt;
    }

    // 변동이 없는 경우.
    if (movCnt === 0) {
      return dist;
    }

    dist += movCnt;
  }
}
