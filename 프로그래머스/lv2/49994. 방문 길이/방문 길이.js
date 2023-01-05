function solution(dirs) {
  const move = {
    U: {
      dy: -1,
      dx: 0,
      path: 0,
      counter: 1,
    },
    D: {
      dy: 1,
      dx: 0,
      path: 1,
      counter: 0,
    },
    L: {
      dy: 0,
      dx: -1,
      path: 2,
      counter: 3,
    },
    R: {
      dy: 0,
      dx: 1,
      path: 3,
      counter: 2,
    },
  };
  const visited = Array.from({ length: 11 }, () =>
    Array.from({ length: 11 }, () => new Array(4).fill(false))
  );

  let [cy, cx] = [5, 5];
  let cnt = 0;
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const { dy, dx, path, counter } = move[dir];
    const [ny, nx] = [cy + dy, cx + dx];

    if (ny < 0 || nx < 0 || ny > 10 || nx > 10) continue;

    // 처음 간 길이라면 cnt 중가
    if (!visited[cy][cx][path]) cnt++;

    visited[cy][cx][path] = true;
    visited[ny][nx][counter] = true;
    [cy, cx] = [ny, nx];
  }

  return cnt;
}
