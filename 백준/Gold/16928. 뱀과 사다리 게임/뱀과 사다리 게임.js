const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const up = new Map();
const down = new Map();

// key, value로 수정.
for (let i = 0; i < N; i++) {
  const [start, dest] = input[i + 1].split(" ").map(Number);
  up.set(start, dest);
}

for (let i = 0; i < M; i++) {
  const [start, dest] = input[i + N + 1].split(" ").map(Number);
  down.set(start, dest);
}

// 기본 이동 수는 1 ~ 6까지 6가지
// 이동하다가 사다리 만나면 이동 뱀은 건너뛰여야 함.
// BFS 이용
const board = new Array(101).fill(999);

bfs();

console.log(board[100]);

function bfs() {
  // 큐 원소 : [위치, cnt]
  const q = [[1, 0]];

  while (q.length !== 0) {
    const [pos, cnt] = q.shift();

    for (let i = 1; i < 7; i++) {
      dest = pos + i;

      if (board[dest] <= cnt + 1) continue;
      if (dest > 100) continue;

      if (up.has(dest)) {
        const upDest = up.get(dest);

        // if (board[upDest] < cnt + 1) continue;

        q.push([upDest, cnt + 1]);
        board[upDest] = cnt + 1;
      } else if (down.has(dest)) {
        const downDest = down.get(dest);

        q.push([downDest, cnt + 1]);
        board[dest] = cnt + 1;
      } else {
        q.push([dest, cnt + 1]);
        board[dest] = cnt + 1;
      }
    }
  }
}
