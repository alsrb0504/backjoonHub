const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1, 0, 0];
const dx = [-1, 1, 0, 0, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

const [w, h, n] = input[0].split(" ").map(Number);

const tomatos = [];

for (let i = 0; i < n; i++) {
  tomatos.push(
    input.slice(1 + h * i, 1 + h * i + h).map((el) => el.split(" ").map(Number))
  );
}

const visited = Array.from({ length: n }, () =>
  Array.from({ length: h }, () => new Array(w).fill(Infinity))
);

const tomato_stack = [];

for (let z = 0; z < n; z++) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (tomatos[z][y][x] === 1) {
        tomato_stack.push([z, y, x]);
        visited[z][y][x] = 0;
      }
    }
  }
}

tomato_stack.forEach((el) => {
  const [z, y, x] = el;

  bfs(y, x, z);
});

let answer = 0;

for (let z = 0; z < n; z++) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (tomatos[z][y][x] !== -1) {
        if (visited[z][y][x] === Infinity) {
          console.log(-1);
          return;
        } else {
          answer = Math.max(answer, visited[z][y][x]);
        }
      }
    }
  }
}

console.log(answer);

function bfs(sy, sx, sz) {
  const q = [[sy, sx, sz, 0]];

  while (q.length) {
    const [y, x, z, cnt] = q.shift();

    for (let i = 0; i < 6; i++) {
      const [ny, nx, nz] = [y + dy[i], x + dx[i], z + dz[i]];

      if (
        ny < 0 ||
        nx < 0 ||
        nz < 0 ||
        ny >= h ||
        nx >= w ||
        nz >= n ||
        tomatos[nz][ny][nx] !== 0
      )
        continue;

      if (visited[nz][ny][nx] > cnt + 1) {
        visited[nz][ny][nx] = cnt + 1;
        q.push([ny, nx, nz, cnt + 1]);
      }
    }
  }
}
