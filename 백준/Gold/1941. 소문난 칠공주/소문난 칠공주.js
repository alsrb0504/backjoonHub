const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];
const map = input.slice(0, 5).map((el) => el.trimEnd().split(""));
const answer = new Set();

const stack = [];
const visited = Array.from({ length: 5 }, () => new Array(5).fill(false));

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (map[i][j] === "S") {
      visited[i][j] = true;
      stack.push([i, j]);

      dfs(i, j, 1, 1);

      visited[i][j] = false;
      stack.pop();
    }
  }
}

console.log(answer.size);

function dfs(y, x, cnt, som_cnt) {
  if (cnt === 7) {
    if (som_cnt > 3) {
      const keys = [];

      stack.forEach((el) => {
        const [cy, cx] = el;

        keys.push(Number(`${cy}${cx}`));
      });

      keys.sort((a, b) => a - b);
      answer.add(keys.join(" "));
    }

    return;
  }

  stack.forEach((el) => {
    const [cy, cx] = el;

    for (let i = 0; i < 4; i++) {
      const [ny, nx] = [cy + dy[i], cx + dx[i]];

      if (ny < 0 || nx < 0 || ny >= 5 || nx >= 5 || visited[ny][nx]) continue;

      stack.push([ny, nx]);
      visited[ny][nx] = true;

      if (map[ny][nx] === "Y") {
        dfs(ny, nx, cnt + 1, som_cnt);
      } else {
        dfs(ny, nx, cnt + 1, som_cnt + 1);
      }

      visited[ny][nx] = false;
      stack.pop();
    }
  });
}
