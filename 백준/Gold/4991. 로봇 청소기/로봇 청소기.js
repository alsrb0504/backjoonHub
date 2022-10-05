const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

// 상하좌우
const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

let curLine = 0;
let result = "";

while (true) {
  const [w, h] = input[curLine].split(" ").map(Number);
  if (w === 0) break;

  result += solution(w, h, curLine + 1) + "\n";

  curLine += h + 1;
}

console.log(result.trimEnd());

function solution(w, h, startLine) {
  const map = input
    .slice(startLine, startLine + h)
    .map((line) => line.trimEnd().split(""));

  const dirtys = [];
  let [sy, sx] = [0, 0];
  let answer = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (map[i][j] === "o") [sy, sx] = [i, j];
      if (map[i][j] === "*") dirtys.push([i, j]);
    }
  }

  const dist = Array.from({ length: dirtys.length + 1 }, () =>
    new Array(dirtys.length + 1).fill(-1)
  );

  const dfsStack = [];
  const dfsVisited = new Array(dirtys.length).fill(false);
  dfsVisited[0] = true;

  dirtys.unshift([sy, sx]);

  for (let i = 0; i < dirtys.length; i++) {
    bfs(i);
  }

  dfs(1);

  return answer !== Number.MAX_SAFE_INTEGER ? answer : -1;

  function bfs(num) {
    // [y, x, moveCnt]
    const [cy, cx] = dirtys[num];
    const q = [[cy, cx, 0]];

    const visited = Array.from({ length: h }, () => new Array(w).fill(false));
    visited[cy][cx] = true;

    dist[num][num] = 0;

    while (q.length) {
      const [y, x, moveCnt] = q.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;
        if (map[ny][nx] === "x") continue;
        if (visited[ny][nx]) continue;

        // 청소할 곳
        if (map[ny][nx] === "*") {
          visited[ny][nx] = true;

          const dirtyIdx = findDitryIndex(ny, nx);

          dist[num][dirtyIdx] = moveCnt + 1;
          dist[dirtyIdx][num] = moveCnt + 1;

          q.push([ny, nx, moveCnt + 1]);
        }
        // 빈 칸
        else {
          visited[ny][nx] = true;
          q.push([ny, nx, moveCnt + 1]);
        }
      }
    }
  }

  function findDitryIndex(ny, nx) {
    for (let i = 0; i < dirtys.length; i++) {
      const [y, x] = dirtys[i];
      if (y === ny && x === nx) return i;
    }
  }

  function calcDist() {
    let prev = 0;
    let sum = 0;

    for (let i = 0; i < dfsStack.length; i++) {
      if (dist[prev][dfsStack[i]] === -1) return [false, -1];

      sum += dist[prev][dfsStack[i]];

      prev = dfsStack[i];
    }

    return [true, sum];
  }

  function dfs(cnt) {
    if (cnt === dirtys.length) {
      const [isPossible, total] = calcDist();

      if (isPossible) answer = Math.min(answer, total);
      return;
    }

    for (let i = 1; i < dirtys.length; i++) {
      if (dfsVisited[i]) continue;

      dfsVisited[i] = true;
      dfsStack.push(i);
      dfs(cnt + 1);
      dfsStack.pop();
      dfsVisited[i] = false;
    }
  }
}
