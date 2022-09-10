const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = [];
const cctvs = [];
const visited = Array.from({ length: N }, () => new Array(M).fill(0));

let answer = 64;

for (let i = 1; i <= N; i++) {
  map.push(input[i].trimEnd().split(" "));
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] !== "6" && map[i][j] !== "0") {
      // [ cctv 개수, 번호, Y, X ]
      cctvs.push([Number(map[i][j]), i, j]);
    }

    // 방문배열 벽 처리.
    if (map[i][j] === "6") {
      visited[i][j] = -1;
    }
  }
}

dfs(0);

console.log(answer);

function dfs(cnt) {
  if (cnt === cctvs.length) {
    let sum = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (visited[i][j] === 0 && map[i][j] === "0") sum++;
      }
    }

    answer = Math.min(answer, sum);
    return;
  }

  const [cctv, y, x] = cctvs[cnt];

  switch (cctv) {
    case 1: {
      // 상하좌우 처리하고 다음 cctv 호출.
      // 위쪽으로 방문처리
      visitTop(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);

      // 아래쪽으로 방문처리
      visitBottom(y, x);
      dfs(cnt + 1);
      unVisitBottom(y, x);

      // 오른쪽으로 방문처리
      visitRight(y, x);
      dfs(cnt + 1);
      unVisitRight(y, x);

      // 왼쪽으로 방문처리
      visitLeft(y, x);
      dfs(cnt + 1);
      unVisitLeft(y, x);

      break;
    }
    case 2: {
      // 상하, 자와 2가지 경우

      // 상하
      visitTop(y, x);
      visitBottom(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);
      unVisitBottom(y, x);

      // 좌우로 방문처리
      visitRight(y, x);
      visitLeft(y, x);
      dfs(cnt + 1);
      unVisitLeft(y, x);
      unVisitRight(y, x);

      break;
    }
    case 3: {
      // 4가지 경우
      // 1. 상우로 방문처리
      visitTop(y, x);
      visitRight(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);
      unVisitRight(y, x);

      // 2. 우하
      visitRight(y, x);
      visitBottom(y, x);
      dfs(cnt + 1);
      unVisitRight(y, x);
      unVisitBottom(y, x);

      // 3, 하좌
      visitBottom(y, x);
      visitLeft(y, x);
      dfs(cnt + 1);
      unVisitBottom(y, x);
      unVisitLeft(y, x);

      // 4. 좌상
      visitTop(y, x);
      visitLeft(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);
      unVisitLeft(y, x);

      break;
    }
    case 4: {
      // 중심을 기준으로 4가지
      // 1. 상
      visitLeft(y, x);
      visitTop(y, x);
      visitRight(y, x);
      dfs(cnt + 1);
      unVisitLeft(y, x);
      unVisitTop(y, x);
      unVisitRight(y, x);

      // 2. 우
      visitTop(y, x);
      visitRight(y, x);
      visitBottom(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);
      unVisitRight(y, x);
      unVisitBottom(y, x);

      // 3. 하
      visitLeft(y, x);
      visitBottom(y, x);
      visitRight(y, x);
      dfs(cnt + 1);
      unVisitLeft(y, x);
      unVisitBottom(y, x);
      unVisitRight(y, x);

      // 4. 좌
      visitTop(y, x);
      visitLeft(y, x);
      visitBottom(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);
      unVisitLeft(y, x);
      unVisitBottom(y, x);
      break;
    }
    case 5: {
      // 상하좌우
      visitTop(y, x);
      visitRight(y, x);
      visitLeft(y, x);
      visitBottom(y, x);
      dfs(cnt + 1);
      unVisitTop(y, x);
      unVisitLeft(y, x);
      unVisitRight(y, x);
      unVisitBottom(y, x);
      break;
    }
    default:
      break;
  }
}

function visitTop(y, x) {
  for (let i = y - 1; i >= 0; i--) {
    if (map[i][x] === "6") break;
    visited[i][x]++;
  }
}

function unVisitTop(y, x) {
  for (let i = y - 1; i >= 0; i--) {
    if (map[i][x] === "6") break;

    visited[i][x]--;
  }
}

function visitBottom(y, x) {
  for (let i = y + 1; i < N; i++) {
    if (map[i][x] === "6") break;
    visited[i][x]++;
  }
}

function unVisitBottom(y, x) {
  for (let i = y + 1; i < N; i++) {
    if (map[i][x] === "6") break;
    visited[i][x]--;
  }
}

function visitRight(y, x) {
  for (let i = x + 1; i < M; i++) {
    if (map[y][i] === "6") break;
    visited[y][i]++;
  }
}

function unVisitRight(y, x) {
  for (let i = x + 1; i < M; i++) {
    if (map[y][i] === "6") break;
    visited[y][i]--;
  }
}
function visitLeft(y, x) {
  for (let i = x - 1; i >= 0; i--) {
    if (map[y][i] === "6") break;
    visited[y][i]++;
  }
}

function unVisitLeft(y, x) {
  for (let i = x - 1; i >= 0; i--) {
    if (map[y][i] === "6") break;
    visited[y][i]--;
  }
}
