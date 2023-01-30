const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

// 시계방향
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
const dx = [0, 1, 1, 1, 0, -1, -1, -1];

const [N, M, K] = input[0].split(" ").map(Number);

const update = [
  new Array(N + 2).fill(0),
  ...input
    .slice(1, 1 + N)
    .map((el) => ("0 " + el + " 0").split(" ").map(Number)),
  new Array(N + 2).fill(0),
];

const map = Array.from({ length: N + 2 }, () => new Array(N + 2).fill(0));
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    map[i][j] = 5;
  }
}

let trees = input
  .slice(1 + N, 2 + N + M)
  .map((el) => (el + " 0").split(" ").map(Number));

trees.sort((a, b) => a[2] - b[2]);

for (let i = 0; i < K; i++) {
  // 봄
  for (let j = trees.length - 1; j >= 0; j--) {
    const [y, x, age] = trees[j];

    if (map[y][x] >= age) {
      map[y][x] -= age;
      trees[j][2]++;
    } else {
      trees[j][3] = -1;
    }
  }

  // 여름
  trees = trees.filter((el) => {
    if (el[3] === 0) return true;
    else {
      const [y, x, age] = el;

      map[y][x] += Math.floor(age / 2);
      return false;
    }
  });

  // 가을
  trees.forEach((el) => {
    const [y, x, age, _] = el;

    if (age % 5 === 0) {
      for (let i = 0; i < 8; i++) {
        const [ny, nx] = [y + dy[i], x + dx[i]];

        if (ny < 1 || nx < 1 || ny > N || nx > N) continue;
        trees.push([ny, nx, 1, 0]);
      }
    }
  });

  // 겨울
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      map[i][j] += update[i][j];
    }
  }
}

console.log(trees.length);
