const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const [H, W, T] = input[0].split(" ").map(Number);
let map = input.slice(1, 1 + H).map((el) => el.split(" ").map(Number));

// let next = Array.from({ length: H }, () => new Array(W).fill(0));

// console.table(map);

const cleaner = [];

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (map[i][j] === -1) cleaner.push(i);

    if (cleaner.length === 2) break;
  }
}

for (let k = 0; k < T; k++) {
  let next = Array.from({ length: H }, () => new Array(W).fill(0));
  const s1 = cleaner[0];
  const s2 = cleaner[1];
  next[s1][0] = -1;
  next[s2][0] = -1;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (map[y][x] >= 5) {
        let cnt = 0;

        for (let i = 0; i < 4; i++) {
          const [ny, nx] = [y + dy[i], x + dx[i]];

          if (ny < 0 || nx < 0 || ny === H || nx === W) continue;
          if (map[ny][nx] === -1) continue;

          cnt++;
          next[ny][nx] += Math.floor(map[y][x] / 5);
        }

        next[y][x] += map[y][x] - Math.floor(map[y][x] / 5) * cnt;
      } else {
        if (map[y][x] !== -1) next[y][x] += map[y][x];
      }
    }
  }

  // const s1 = cleaner[0];
  // const s2 = cleaner[1];

  // next[s1][0] = -1;
  // next[s2][0] = -1;

  // let tmp = next[s1][W - 1];

  let prev = next[s1][1];
  next[s1][1] = 0;

  for (let x = 2; x < W; x++) {
    let tmp = next[s1][x];
    next[s1][x] = prev;
    prev = tmp;
  }

  for (let y = s1 - 1; y >= 0; y--) {
    let tmp = next[y][W - 1];
    next[y][W - 1] = prev;
    prev = tmp;
  }

  for (let x = W - 2; x >= 0; x--) {
    let tmp = next[0][x];
    next[0][x] = prev;
    prev = tmp;
  }

  for (let y = 1; y < s1; y++) {
    let tmp = next[y][0];
    next[y][0] = prev;
    prev = tmp;
  }

  prev = next[s2][1];
  next[s2][1] = 0;

  for (let x = 2; x < W; x++) {
    let tmp = next[s2][x];
    next[s2][x] = prev;
    prev = tmp;
  }

  for (let y = s2 + 1; y < H; y++) {
    let tmp = next[y][W - 1];
    next[y][W - 1] = prev;
    prev = tmp;
  }

  for (let x = W - 2; x >= 0; x--) {
    let tmp = next[H - 1][x];
    next[H - 1][x] = prev;
    prev = tmp;
  }

  for (let y = H - 2; y > s2; y--) {
    let tmp = next[y][0];
    next[y][0] = prev;
    prev = tmp;
  }

  // console.log(prev);

  // console.table(next);
  map = next;
}

// console.table(map);

let sum = 0;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    sum += map[y][x];
  }
}

console.log(sum + 2);
