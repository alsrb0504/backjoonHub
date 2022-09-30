const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

// 미리 맵을 구현.
const map = Array.from({ length: 102 }, () => new Array(102).fill("."));

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const MAX = Number.MAX_SAFE_INTEGER;

function solution(curline) {
  const [h, w] = input[curline].split(" ").map(Number);

  input.slice(curline + 1, curline + h + 1).map((line, yIdx) => {
    line
      .trimEnd()
      .split("")
      .map((el, xIdx) => {
        map[yIdx + 1][xIdx + 1] = el;
        map[yIdx + 1][xIdx + 2] = ".";
     });
  });

  for (let i = 0; i < w + 2; i++) {
    map[h + 1][i] = ".";
  }

  const prisoner = [];

  // visited 배열을 3차원으로 하지 않고 각각 분리 및 BFS함수도 각각 만듦.
  // 다 동일한 로직
  const visitedOne = Array.from({ length: h + 2 }, () =>
    new Array(w + 2).fill(MAX)
  );

  const visitedTwo = Array.from({ length: h + 2 }, () =>
    new Array(w + 2).fill(MAX)
  );

  const visitedZero = Array.from({ length: h + 2 }, () =>
    new Array(w + 2).fill(MAX)
  );

  // 죄수들 위치 찾기.
  for (let i = 1; i <= h; i++) {
    for (let j = 1; j <= w; j++) {
      if (map[i][j] === "$") prisoner.push([i, j]);
    }
  }

  function prisonerOneBfs(sy, sx) {
    visitedOne[sy][sx] = 0;
    const deq = [[sy, sx, 0]];

    while (deq.length) {
      const [y, x, cnt] = deq.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny > h + 1 || nx < 0 || nx > w + 1) continue;

        if (map[ny][nx] === "*") continue;

        // 방문 확인
        if (visitedOne[ny][nx] <= cnt) continue;

        if (map[ny][nx] === "#") {
          if (visitedOne[ny][nx] === cnt + 1) continue;

          visitedOne[ny][nx] = cnt + 1;
          deq.push([ny, nx, cnt + 1]);
        } else {
          deq.unshift([ny, nx, cnt]);
          visitedOne[ny][nx] = cnt;
        }
      }
    }
  }

  function prisonerTwoBfs(sy, sx) {
    visitedTwo[sy][sx] = 0;
    const deq = [[sy, sx, 0]];

    while (deq.length) {
      const [y, x, cnt] = deq.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny > h + 1 || nx < 0 || nx > w + 1) continue;

        if (map[ny][nx] === "*") continue;

        // 방문 확인
        if (visitedTwo[ny][nx] <= cnt) continue;

        if (map[ny][nx] === "#") {
          if (visitedTwo[ny][nx] === cnt + 1) continue;

          visitedTwo[ny][nx] = cnt + 1;
          deq.push([ny, nx, cnt + 1]);
        } else {
          deq.unshift([ny, nx, cnt]);
          visitedTwo[ny][nx] = cnt;
        }
      }
    }
  }

  function thirdBfs() {
    visitedZero[0][0] = 0;
    const deq = [[0, 0, 0]];

    while (deq.length) {
      const [y, x, cnt] = deq.shift();

      for (let i = 0; i < 4; i++) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || ny > h + 1 || nx < 0 || nx > w + 1) continue;
        if (map[ny][nx] === "*") continue;

        // 방문 확인
        if (visitedZero[ny][nx] <= cnt) continue;

        if (map[ny][nx] === "#") {
          if (visitedZero[ny][nx] === cnt + 1) continue;

          visitedZero[ny][nx] = cnt + 1;
          deq.push([ny, nx, cnt + 1]);
        } else {
          deq.unshift([ny, nx, cnt]);
          visitedZero[ny][nx] = cnt;
        }
      }
    }
  }

  prisonerOneBfs(prisoner[0][0], prisoner[0][1]);

  prisonerTwoBfs(prisoner[1][0], prisoner[1][1]);

  thirdBfs();

  let min = MAX;

  for (let i = 1; i <= h; i++) {
    for (let j = 1; j <= w; j++) {
      if (map[i][j] === "*") continue;

      let sum = visitedOne[i][j] + visitedTwo[i][j] + visitedZero[i][j];

      if (map[i][j] === "#") {
        sum -= 2;
      }

      min = Math.min(min, sum);
    }
  }

  return min;
}

const testCnt = Number(input[0]);
let answer = "";
let lineCnt = 1;

for (let t = 0; t < testCnt; t++) {
  const [curLineCnt, _] = input[lineCnt].split(" ").map(Number);

  answer += solution(lineCnt) + "\n";
  lineCnt += curLineCnt + 1;
}

console.log(answer.trimEnd());