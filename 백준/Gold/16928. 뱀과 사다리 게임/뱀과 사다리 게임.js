const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

function bfs() {
  // 큐 원소 : [위치, cnt]
  const q = [[1, 0]];

  while (q.length !== 0) {
    const [pos, cnt] = q.shift();

    for (let i = 1; i < 7; i++) {
      dest = pos + i;

      if (board[dest] <= cnt + 1) continue;
      if (dest > 100) continue;

      // 사다리 이동
      if (up.has(dest)) {
        const upDest = up.get(dest);
        q.push([upDest, cnt + 1]);
        board[upDest] = cnt + 1;
      }
      // 뱀 이동
      else if (down.has(dest)) {
        const downDest = down.get(dest);
        q.push([downDest, cnt + 1]);
        board[dest] = cnt + 1;
      }
      // 그냥 주사위 이동.
      else {
        q.push([dest, cnt + 1]);
        board[dest] = cnt + 1;
      }
    }
  }
}

// BFS 의 방문 체크용 배열
const board = new Array(101).fill(999);
const up = new Map();
const down = new Map();

// 사다리와 뱀을 map으로 저장.
for (let i = 0; i < N; i++) {
  const [start, dest] = input[i + 1].split(" ").map(Number);
  up.set(start, dest);
}

for (let i = 0; i < M; i++) {
  const [start, dest] = input[i + N + 1].split(" ").map(Number);
  down.set(start, dest);
}

bfs();

console.log(board[100]);
