function solution(maps) {
  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];

  const HEIGHT = maps.length;
  const WIDE = maps[0].length;
  const INF = Infinity;

  let [sy, sx, lx, ly, ey, ex] = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDE; j++) {
      if (maps[i][j] === "S") [sy, sx] = [i, j];
      if (maps[i][j] === "L") [lx, ly] = [i, j];
      if (maps[i][j] === "E") [ey, ex] = [i, j];
    }
  }

  const toLever = bfs(sy, sx, lx, ly);
  if (toLever === INF) return -1;

  const toEnd = bfs(lx, ly, ey, ex);
  return toEnd !== INF ? toLever + toEnd : -1;

  function bfs(startY, startX, endY, endX) {
    const visited = Array.from({ length: HEIGHT }, () =>
      new Array(WIDE).fill(false)
    );
    const q = [[startY, startX, 0]];
    visited[startY][startX] = true;

    while (q.length) {
      const [y, x, cnt] = q.shift();

      for (let i = 0; i < 4; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (
          ny < 0 ||
          nx < 0 ||
          ny >= HEIGHT ||
          nx >= WIDE ||
          visited[ny][nx] ||
          maps[ny][nx] === "X"
        )
          continue;

        // 종료
        if (ny === endY && nx === endX) return cnt + 1;

        visited[ny][nx] = true;
        q.push([ny, nx, cnt + 1]);
      }
    }

    return INF;
  }
}

