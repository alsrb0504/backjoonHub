const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const map = [];
for (let i = 1; i <= N; i++) {
  map.push(input[i].trimEnd().split(""));
}

const visited = Array.from({ length: N }, () => new Array(M).fill(false));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "*") visited[i][j] = true;
  }
}

const min = Math.min(N, M);
const maxSize = min % 2 === 0 ? min - 1 : min;
let size = maxSize;

let cnt = 0;
let result = [];

while (size >= 3) {
  const center = Math.floor(size / 2);
  for (let y = center; y < N - center; y++) {
    for (let x = center; x < M - center; x++) {

      let check = true;

      for (let i = y - center; i <= y + center; i++) {
        if (!visited[i][x]) {
          check = false;
          break;
        }
      }

      for (let i = x - center; i <= x + center; i++) {
        if (!visited[y][i]) {
          check = false;
          break;
        }
      }

      if (check) {
        cnt++;
        result.push([y, x, size]);
      }
    }
  }

  size -= 2;
}

let answer = cnt + "\n";

result.forEach((el) => {
  const [y, x, crossSize] = el;
  const center = Math.floor(crossSize / 2);

  for (let i = y - center; i <= y + center; i++) {
    visited[i][x] = false;
  }

  for (let i = x - center; i <= x + center; i++) {
    visited[y][i] = false;
  }
});

let possible = true;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j]) {
      possible = false;
    }
  }
}

if (possible) {
  result.forEach((el) => {
    const [y, x, crossSize] = el;
    answer += `${y + 1} ${x + 1} ${Math.floor(crossSize / 2)}\n`;
  });

  console.log(answer.trimEnd());
} else {
  console.log(-1);
}