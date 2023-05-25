const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const map = input
  .slice(1, 1 + N)
  .map((el) => el.trimEnd().split("").map(Number));

map.forEach((el) => {
  el.unshift(-1);
});

map.unshift(-1);

const answer = [];

solution(1, 1, N, N, N);

console.log(answer.join(""));

function solution(y1, x1, y2, x2, size) {
  let isSame = true;
  let fir = map[y1][x1];

  for (let i = y1; i <= y2; i++) {
    for (let j = x1; j <= x2; j++) {
      if (fir !== map[i][j]) {
        isSame = false;
        break;
      }
    }
  }

  if (isSame) {
    answer.push(fir);
    return fir;
  }

  const half = size / 2;
  const half_x = x1 + half - 1;
  const half_y = y1 + half - 1;

  answer.push("(");

  if (size > 2) {
    solution(y1, x1, half_y, half_x, half);
    solution(y1, half_x + 1, half_y, x2, half);
    solution(half_y + 1, x1, y2, half_x, half);
    solution(half_y + 1, half_x + 1, y2, x2, half);
  } else {
    answer.push(map[y1][x1]);
    answer.push(map[y1][x2]);
    answer.push(map[y2][x1]);
    answer.push(map[y2][x2]);
  }

  answer.push(")");
}
