const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const N = Number(input[0]);
const MaxLength = 4 * (N - 1) + 1;
const answer = Array.from({ length: MaxLength }, () =>
  new Array(MaxLength).fill(" ")
);

printStar(0, N - 1);

console.table(answer.map((line) => line.join("")).join("\n"));

function printStar(depth, lastDepth) {
  const start = { y: 2 * depth, x: 2 * depth };
  const end = { y: MaxLength - 2 * depth, x: MaxLength - 2 * depth };

  for (let i = start.y; i < end.y; i++) {
    answer[i][start.x] = "*";
    answer[i][end.x - 1] = "*";
  }

  for (let j = start.x; j < end.x; j++) {
    answer[start.y][j] = "*";
    answer[end.y - 1][j] = "*";
  }

  if (depth === lastDepth) return;
  printStar(depth + 1, lastDepth);
}
