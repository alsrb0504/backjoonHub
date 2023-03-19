function solution(N) {
  let answer = 0;

  const map = Array.from({ length: N }, () => new Array(N).fill(0));
  // const visited = new Array(N).fill(false);

  // for (let i = 0; i < N; i++) {
  dfs(0, 0, 0);
  // }

  return answer;

  function dfs(cnt, y, x) {
    if (cnt === N) {
      answer++;
      // console.table(map);

      // console.table(map);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (map[y][i] > 0) continue;

      // 세로 한 줄 방문
      for (let j = 0; j < N; j++) {
        // map[j][i] = true;
        map[j][i]++;
      }

      // 가로 한 줄 방문
      for (let j = 0; j < N; j++) {
        // map[y][j] = true;
        map[y][j]++;
      }

      // 오른쪽 대각 아래 방문
      for (let ny = y + 1, nx = i + 1; ny < N && nx < N; ny++, nx++) {
        // map[ny][nx] = true;
        map[ny][nx]++;
      }

      // 왼쪽 대각 아래 방문
      for (let ny = y + 1, nx = i - 1; ny < N && nx >= 0; ny++, nx--) {
        // map[ny][nx] = true;
        map[ny][nx]++;
      }

      // 왼쪽 대각 위 방문
      for (let ny = y - 1, nx = i - 1; ny >= 0 && nx >= 0; ny--, nx--) {
        // map[ny][nx] = true;
        map[ny][nx]++;
      }

      // 오른쪽 대각 위 방문
      for (let ny = y - 1, nx = i + 1; ny >= 0 && nx < N; ny--, nx++) {
        // map[ny][nx] = true;
        map[ny][nx]++;
      }

      dfs(cnt + 1, y + 1, i);

      // 세로 한 줄 방문
      for (let j = 0; j < N; j++) {
        // map[j][i] = false;
        map[j][i]--;
      }

      // 가로 한 줄 방문
      for (let j = 0; j < N; j++) {
        // map[y][j] = false;
        map[y][j]--;
      }

      for (let ny = y + 1, nx = i + 1; ny < N && nx < N; ny++, nx++) {
        // map[ny][nx] = false;
        map[ny][nx]--;
      }

      for (let ny = y + 1, nx = i - 1; ny < N && nx >= 0; ny++, nx--) {
        // map[ny][nx] = false;
        map[ny][nx]--;
      }

      for (let ny = y - 1, nx = i - 1; ny >= 0 && nx >= 0; ny--, nx--) {
        // map[ny][nx] = false;
        map[ny][nx]--;
      }

      for (let ny = y - 1, nx = i + 1; ny >= 0 && nx < N; ny--, nx++) {
        // map[ny][nx] = false;
        map[ny][nx]--;
      }
    }
  }

  return answer;
}
