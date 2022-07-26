const readFileSyncAddress = '/dev/stdin';
let input = require("fs").readFileSync(readFileSyncAddress).toString();

const n = Number(input);
const board = Array.from({ length: n }, () => new Array(n).fill(0));
let count = 0;

// 헷갈리지 않도록 cnt와 y 두개로 관리
function dfs(cnt, y) {
  if (cnt === n) {
    count++;
    return;
  }

  for (let i = 0; i < n; i++) {
    if (board[y][i] > 0) continue;

    // 방문처리
    // 직선
    for (let j = y; j < n; j++) {
      board[j][i]++;
    }

    // 대각선
    // 확인 후, 왼쪽, 오른쪽
    for (let j = 1; j < n - y; j++) {
      // 왼쪽 대각선
      const ny1 = y + j;
      const nx1 = i - j;

      // 오른쪽 대각선
      const ny2 = y + j;
      const nx2 = i + j;

      if (checkPos(ny1, nx1)) board[ny1][nx1]++;
      if (checkPos(ny2, nx2)) board[ny2][nx2]++;
    }

    dfs(cnt + 1, y + 1);

    // 방문처리 해제
    // 직선
    for (let j = y; j < n; j++) {
      board[j][i]--;
    }

    // 대각선
    // 확인 후, 왼쪽, 오른쪽
    for (let j = 1; j < n - y; j++) {
      // 왼쪽 대각선
      const ny1 = y + j;
      const nx1 = i - j;

      // 오른쪽 대각선
      const ny2 = y + j;
      const nx2 = i + j;

      if (checkPos(ny1, nx1)) board[ny1][nx1]--;
      if (checkPos(ny2, nx2)) board[ny2][nx2]--;
    }
  }
}

function checkPos(y, x) {
  if (y >= 0 && y < n && x >= 0 && x < n) return true;
  return false;
}

dfs(0, 0);
console.log(count);