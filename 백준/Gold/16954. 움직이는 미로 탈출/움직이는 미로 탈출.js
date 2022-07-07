const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const map = input.map((v) => v.trimEnd().split(""));
// 9가지 이동 가능 경로.
const dy = [0, 0, 1, 0, -1, -1, 1, 1, -1];
const dx = [0, -1, 0, 1, 0, 1, 1, -1, -1];

// n초 뒤 벽의 이동 상황을 나타낼 3차원 배열 생성.
const copyMap = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => [])
);

// 해당 칸의 n초 뒤 모습을 저장.
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    for (let k = 0; k < 8; k++) {
      if (i - k < 0) {
        copyMap[i][j].push(".");
      } else {
        copyMap[i][j].push(map[i - k][j]);
      }
    }
  }
}

function bfs() {
  const q = [[7, 0, 0]];

  let cnt = 0;

  while (q.length) {
    const [y, x, t] = q.shift();

    // 종료조건 8초까지 버팀.
    if (t === 8) {
      return 1;
    }

    let upFlag = true;

    for (let i = y; i > -1; i--) {
      if (map[i][x] === "#") {
        upFlag = false;
        break;
      }
    }

    if (upFlag) {
      return 1;
    }

    for (let i = 0; i < 9; i++) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      // 범위 벗어남.
      if (ny < 0 || ny > 7 || nx < 0 || nx > 7) continue;

      if (copyMap[ny][nx][t] === "#") continue;

      // 이동하려는 칸이 다음 초에 벽.
      if (copyMap[ny][nx][t + 1] === "#") continue;


      q.push([ny, nx, t + 1]);
    }
  }

  return 0;
}

console.log(bfs());
