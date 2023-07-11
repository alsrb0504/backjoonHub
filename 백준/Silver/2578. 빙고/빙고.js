const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const bingo = input.slice(0, 5).map((line) => line.split(" ").map(Number));
const check = Array.from({ length: 5 }, () => new Array(5).fill(false));
const posMap = new Map();
const order = [];
let answer = 0;

input.slice(5, 10).map((line) =>
  line
    .split(" ")
    .map(Number)
    .forEach((el) => {
      order.push(el);
    })
);

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    const curr = bingo[i][j];
    posMap.set(curr, [i, j]);
  }
}

for (let i = 0; i < 25; i++) {
  const curr = order[i];
  const [y, x] = posMap.get(curr);

  check[y][x] = true;

  answer++;
  if (isBingo()) break;
}

console.log(answer);

function isBingo() {
  let count = 0;

  if (check[0][0] && check[0][1] && check[0][2] && check[0][3] && check[0][4])
    count++;
  if (check[1][0] && check[1][1] && check[1][2] && check[1][3] && check[1][4])
    count++;
  if (check[2][0] && check[2][1] && check[2][2] && check[2][3] && check[2][4])
    count++;
  if (check[3][0] && check[3][1] && check[3][2] && check[3][3] && check[3][4])
    count++;
  if (check[4][0] && check[4][1] && check[4][2] && check[4][3] && check[4][4])
    count++;

  if (check[0][0] && check[1][0] && check[2][0] && check[3][0] && check[4][0])
    count++;
  if (check[0][1] && check[1][1] && check[2][1] && check[3][1] && check[4][1])
    count++;
  if (check[0][2] && check[1][2] && check[2][2] && check[3][2] && check[4][2])
    count++;
  if (check[0][3] && check[1][3] && check[2][3] && check[3][3] && check[4][3])
    count++;
  if (check[0][4] && check[1][4] && check[2][4] && check[3][4] && check[4][4])
    count++;

  if (check[0][0] && check[1][1] && check[2][2] && check[3][3] && check[4][4])
    count++;
  if (check[0][4] && check[1][3] && check[2][2] && check[3][1] && check[4][0])
    count++;

  return count >= 3;
}
