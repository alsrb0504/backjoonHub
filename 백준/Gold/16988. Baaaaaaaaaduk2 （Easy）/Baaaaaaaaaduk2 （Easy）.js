const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));

const group = Array.from({ length: N }, () => new Array(M).fill(0));
// [groupNum, groupCnt, startY, startX]
const groupStack = [];
let groupNum = 0;
let answer = 0;

let visited = [];

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

function bfs(y, x) {
  let groupCnt = 1;

  groupNum++;
  const q = [[y, x]];
  group[y][x] = groupNum;

  while (q.length) {
    const [cy, cx] = q.shift();

    for (let i = 0; i < 4; i++) {
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
      if (board[ny][nx] !== 2 || group[ny][nx] !== 0) continue;

      group[ny][nx] = groupNum;

      q.push([ny, nx]);
      groupCnt++;
    }
  }

  groupStack.push([groupNum, groupCnt, y, x]);
}

// 그냥 이 상황에서 BFS를 돌리고
function testbfs() {
  let sum = 0;

  const visited = Array.from({ length: N }, () => new Array(M).fill(false));

  const q = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 2) q.push([i, j]);
    }
  }

  while (q.length) {
    const [cy, cx] = q.shift();
    if (visited[(cy, cx)]) continue;
    visited[cy][cx] = true;

    for (let i = 0; i < 4; i++) {
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      // 이게 아닌데;;
      if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (board[ny][nx] === 0) return false;
        if (board[ny][nx] === 1) continue;
        if (visited[ny][nx]) continue;

        q.push([ny, nx]);
        visited[ny][nx] = true;
      }
    }
  }
}

function checkKill() {
  let sum = 0;

  for (let i = 0; i < groupStack.length; i++) {
    const [gn, gc, gy, gx] = groupStack[i];

    // visited[gy][gx] = true;
    visited = Array.from({ length: N }, () => new Array(M).fill(false));
    visited[gy][gx] = true;
    if (groupBFS(gy, gx)) sum += gc;

    // visited[gy][gx] = false;
  }

  answer = Math.max(answer, sum);
}

function groupDFS(cnt, y, x) {
  let isPossible = false;

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
      // if (board[ny][nx] === 0) return;
      if (board[ny][nx] === 0) {
        isPossible;
      }

      if (board[ny][nx] === 1) continue;
      if (visited[ny][nx]) continue;
    }
  }
}

function groupBFS(y, x) {
  const visited = Array.from({ length: N }, () => new Array(M).fill(false));
  visited[y][x] = true;

  const q = [[y, x]];

  while (q.length) {
    const [cy, cx] = q.shift();

    for (let i = 0; i < 4; i++) {
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (board[ny][nx] === 0) return false;
        if (board[ny][nx] === 1) continue;
        if (visited[ny][nx]) continue;

        q.push([ny, nx]);
        visited[ny][nx] = true;
      }
    }
  }

  return true;
}

// 그룹 찾기 BFS?
// 그룹이 필요 없나?
// 그냥 2개 두고 상하좌우 빈칸 있는지만 확인하면 되려나?

// 그룹에서 DFS해서 갈 곳이 없고 0이 아니면 그 그룹을 카운트

function solution() {
  const emptys = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 0) {
        let isClose = false;

        // for (let k = 0; k < 4; k++) {
        //   const ny = i + dy[k];
        //   const nx = j + dx[k];

        //   if (ny >= 0 && ny < N && nx >= 0 && nx < M && board[ny][nx] === 2) {
        //     isClose = true;
        //   }
        // }

        // if (isClose) emptys.push([i, j]);

        emptys.push([i, j]);
      }
    }
  }

  // console.log(emptys);
  // console.log("hi");

  for (let i = 0; i < emptys.length; i++) {
    for (let j = i + 1; j < emptys.length; j++) {
      let acc = 0;

      const [fy, fx] = emptys[i];
      const [sy, sx] = emptys[j];

      board[fy][fx] = 1;
      board[sy][sx] = 1;
      // checkKill();
      // testbfs();

      // console.table(board);

      visited = Array.from({ length: N }, () => new Array(M).fill(false));
      enemy.forEach((pos) => {
        const [y, x] = pos;

        acc += enemyBfs(y, x);

        // console.log(acc);
      });

      board[fy][fx] = 0;
      board[sy][sx] = 0;

      answer = Math.max(answer, acc);
    }
  }
}

function enemyBfs(y, x) {
  if (visited[y][x]) return 0;

  // console.log(`y = ${y}, x = ${x}`);

  const q = [[y, x]];
  let [cy, cx] = [y, x];
  visited[cy][cx] = true;
  let cnt = 1;

  let flag = false;

  while (q.length) {
    [cy, cx] = q.shift();

    for (let i = 0; i < 4; i++) {
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      if (ny >= 0 && ny < N && nx >= 0 && nx < M) {
        if (board[ny][nx] === 0) {
          flag = true;
          continue;
        }

        if (board[ny][nx] === 1 || visited[ny][nx]) continue;

        if (board[ny][nx] === 2) {
          visited[ny][nx] = true;
          q.push([ny, nx]);

          cnt++;
        }
      }
    }
  }

  if (flag) return 0;

  // console.log(`cnt = ${cnt}`);
  return cnt;
}

const enemy = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // if (board[i][j] === 2 && group[i][j] === 0) bfs(i, j);
    if (board[i][j] === 2) {
      enemy.push([i, j]);
    }
  }
}

solution();
console.log(answer);