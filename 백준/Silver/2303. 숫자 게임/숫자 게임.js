const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const test = Number(input[0]);
const answer = { index: 0, max: -1 };
const data = input
  .slice(1, 1 + test)
  .map((line) => line.split(" ").map(Number));

for (let i = 0; i < test; i++) {
  solution(i);
}

console.log(answer.index);

function solution(idx) {
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      for (let k = j + 1; k < 5; k++) {
        const tmp = (data[idx][i] + data[idx][j] + data[idx][k]) % 10;

        if (answer.max <= tmp) {
          answer.max = tmp;
          answer.index = idx + 1;
        }
      }
    }
  }
}
