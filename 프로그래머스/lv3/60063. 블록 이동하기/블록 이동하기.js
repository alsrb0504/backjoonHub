function solution(board) {
  let answer = 0;

  // 좌, 우, 상, 하
  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];
  const reverse = {
    0: 1,
    1: 0,
    2: 3,
    3: 2,
  };

  const size = board[0].length;
  const visited = Array.from(
    { length: size },
    () => Array.from({ length: size }, () => new Array(4).fill(999)) // 999 => infinity
  );
  visited[0][0][1] = 0;
  visited[0][1][0] = 0;

  bfs();

  function bfs() {
    // [fir, sec, cnt, fir에 sec가 있는 방향]
    const q = [[[0, 0], [0, 1], 0, 1]];

    while (q.length) {
      const [fir, sec, cnt, dir] = q.shift();
      const [fy, fx] = fir;
      const [sy, sx] = sec;

      const y_diff = fy - sy;

      // 상하좌우 확인
      for (let i = 0; i < 4; i++) {
        const [nfy, nfx] = [fy + dy[i], fx + dx[i]];
        const [nsy, nsx] = [sy + dy[i], sx + dx[i]];

        if (!CheckBoundary(nfy, nfx) || !CheckBoundary(nsy, nsx)) continue;
        if (visited[nfy][nfx][dir] <= cnt + 1) continue;

        visited[nfy][nfx][dir] = cnt + 1;
        visited[nsy][nsx][reverse[dir]] = cnt + 1;

        q.push([[nfy, nfx], [nsy, nsx], cnt + 1, dir]);
      }

      // 가로로 놓여있는거지
      if (y_diff === 0) {
        // fir 기준 회전
        // 위로 회전
        let uy = fy - 1;

        if (
          CheckOneBoundary(uy) &&
          board[uy][fx] !== 1 &&
          board[uy][sx] !== 1 &&
          // visited[fy][fx][2] > cnt
          visited[fy][fx][2] > cnt + 1
        ) {
          visited[fy][fx][2] = cnt + 1;
          // 추가
          visited[uy][fx][reverse[2]] = cnt + 1;

          q.push([[fy, fx], [uy, fx], cnt + 1, 2]);
        }

        // 아래로 회전
        let dy = fy + 1;

        if (
          CheckOneBoundary(dy) &&
          board[dy][fx] !== 1 &&
          board[dy][sx] !== 1 &&
          // visited[fy][fx][3] > cnt
          visited[fy][fx][3] > cnt + 1
        ) {
          visited[fy][fx][3] = cnt + 1;
          // 추가
          visited[dy][fx][reverse[3]] = cnt + 1;

          q.push([[fy, fx], [dy, fx], cnt + 1, 3]);
        }

        // sec 기준 회전
        // 위로 회전
        uy = sy - 1;

        if (
          CheckOneBoundary(uy) &&
          board[uy][fx] !== 1 &&
          board[uy][sx] !== 1 &&
          // visited[sy][sx][2] > cnt
          visited[sy][sx][2] > cnt + 1
        ) {
          visited[sy][sx][2] = cnt + 1;
          // 추가
          visited[uy][sx][reverse[2]] = cnt + 1;
          q.push([[sy, sx], [uy, sx], cnt + 1, 2]);
        }

        // 아래로 회전
        dy = sy + 1;

        if (
          CheckOneBoundary(dy) &&
          board[dy][fx] !== 1 &&
          board[dy][sx] !== 1 &&
          // visited[sy][sx][3] > cnt
          visited[sy][sx][3] > cnt + 1
        ) {
          visited[sy][sx][3] = cnt + 1;
          // 추가
          visited[dy][sx][reverse[3]] = cnt + 1;
          q.push([[sy, sx], [dy, sx], cnt + 1, 3]);
        }
      }
      // 세로로 놓여있는 경우
      else {
        // fir 기준 회전
        let lx = fx - 1;

        if (
          CheckOneBoundary(lx) &&
          board[fy][lx] !== 1 &&
          board[sy][lx] !== 1 &&
          // visited[fy][lx][0] > cnt
          // visited[fy][lx][0] > cnt + 1
          visited[fy][fx][0] > cnt + 1
        ) {
          visited[fy][fx][0] = cnt + 1;

          // visited[fy][lx][0] = cnt + 1;

          q.push([[fy, fx], [fy, lx], cnt + 1, 0]);
        }

        let rx = fx + 1;

        if (
          CheckOneBoundary(rx) &&
          board[fy][rx] !== 1 &&
          board[sy][rx] !== 1 &&
          // visited[fy][rx][1] > cnt
          // visited[fy][rx][1] > cnt + 1
          visited[fy][fx][1] > cnt + 1
        ) {
          visited[fy][fx][1] = cnt + 1;

          // visited[fy][rx][1] = cnt + 1;

          q.push([[fy, fx], [fy, rx], cnt + 1, 1]);
        }

        lx = sx - 1;

        if (
          CheckOneBoundary(lx) &&
          board[fy][lx] !== 1 &&
          board[sy][lx] !== 1 &&
          // visited[sy][lx][0] > cnt
          // visited[sy][lx][0] > cnt + 1
          visited[sy][sx][0] > cnt + 1
        ) {
          visited[sy][sx][0] = cnt + 1;

          // visited[sy][lx][0] = cnt + 1;
          q.push([[sy, sx], [sy, lx], cnt + 1, 0]);
        }

        rx = sx + 1;

        if (
          CheckOneBoundary(rx) &&
          board[fy][rx] !== 1 &&
          board[sy][rx] !== 1 &&
          // visited[sy][rx][1] > cnt
          // visited[sy][rx][1] > cnt + 1
          visited[sy][sx][1] > cnt + 1
        ) {
          visited[sy][sx][1] = cnt + 1;

          // visited[sy][rx][1] = cnt + 1;
          q.push([[sy, sx], [sy, rx], cnt + 1, 1]);
        }
      }
    }
  }

  // console.table(board);
  // console.table(visited);

  // console.log(visited[0][2]);
  // console.log(visited[1][2]);
  // console.log(visited[2][2]);
  // console.log(visited[3][2]);
  // console.log(visited[4][2]);

  // console.log(visited[size - 1][size - 1]);

  return Math.min(...visited[size - 1][size - 1]);

  function CheckOneBoundary(val) {
    if (val < 0 || val >= size) return false;
    return true;
  }

  function CheckBoundary(y, x) {
    if (y < 0 || x < 0 || y >= size || x >= size) return false;
    if (board[y][x] === 1) return false;
    return true;
  }
}