const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let [W, H] = input[0].split(" ").map(Number);
const [C, R] = [W, H];
const N = Number(input[1]);

// if (N > W * H) {
//   console.log(0);
//   return;
// }

const map = Array.from({ length: H }, () => new Array(W).fill(0));

const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let dirCnt = 0;
let [y, x] = [H, 0];
let cnt = 1;
W--;

while (cnt <= R * C) {
  if (dirCnt % 2 === 0) {
    for (let i = 0; i < H; i++) {
      [y, x] = [y + dir[dirCnt][0], x + dir[dirCnt][1]];

      map[y][x] = cnt++;
    }

    H--;
  } else {
    for (let i = 0; i < W; i++) {
      [y, x] = [y + dir[dirCnt][0], x + dir[dirCnt][1]];
      map[y][x] = cnt++;
    }

    W--;
  }

  dirCnt = (dirCnt + 1) % 4;
}

const answer = [];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === N) {
      answer.push(j + 1);
      answer.push(R - i);
    }
  }
}

if (answer.length) console.log(answer.join(" "));
else console.log(0);
