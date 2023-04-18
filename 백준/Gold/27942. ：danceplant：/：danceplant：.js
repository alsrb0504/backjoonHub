const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const low_sum = Array.from({ length: N + 2 }, () => new Array(N + 2).fill(0));
const col_sum = Array.from({ length: N + 2 }, () => new Array(N + 2).fill(0));

for (let y = 0; y < N; y++) {
  for (let x = 1; x <= N; x++) {
    low_sum[y + 1][x] = low_sum[y + 1][x - 1] + map[y][x - 1];
  }
}

for (let x = 0; x < N; x++) {
  for (let y = 1; y <= N; y++) {
    col_sum[y][x + 1] = col_sum[y - 1][x + 1] + map[y - 1][x];
  }
}

const answer = [];
const half = N / 2;
let [sy, ey, sx, ex] = [half, half + 1, half, half + 1];

while (true) {
  const dir = [];

  const top = low_sum[sy - 1][ex] - low_sum[sy - 1][sx - 1];
  dir.push([top, "U", 1]);

  const bottom = low_sum[ey + 1][ex] - low_sum[ey + 1][sx - 1];
  dir.push([bottom, "D", 2]);

  const left = col_sum[ey][sx - 1] - col_sum[sy - 1][sx - 1];
  dir.push([left, "L", 3]);

  const right = col_sum[ey][ex + 1] - col_sum[sy - 1][ex + 1];
  dir.push([right, "R", 4]);

  dir.sort((a, b) => {
    if (b[0] === a[0]) return a[2] - b[2];
    return b[0] - a[0];
  });

  const [next_cost, next_dir] = dir[0];

  if (next_cost <= 0) break;

  answer.push(next_dir);

  if (next_dir === "U") {
    sy--;
  } else if (next_dir === "D") {
    ey++;
  } else if (next_dir === "L") {
    sx--;
  } else {
    ex++;
  }
}

let cost = 0;

for (let i = sy; i <= ey; i++) {
  cost += low_sum[i][ex] - low_sum[i][sx - 1];
}

console.log(cost + "\n" + answer.join(""));