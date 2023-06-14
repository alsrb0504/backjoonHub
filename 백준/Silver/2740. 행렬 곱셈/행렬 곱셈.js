const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [aN, aM] = input[0].split(" ").map(Number);

const A = input.slice(1, 1 + aN).map((el) => el.split(" ").map(Number));

const [bN, bM] = input[1 + aN].split(" ").map(Number);

const B = input
  .slice(2 + aN, 2 + aN + bN)
  .map((el) => el.split(" ").map(Number));

const answer = Array.from({ length: aN }, () => new Array(bM).fill(0));

for (let i = 0; i < aN; i++) {
  for (let j = 0; j < bM; j++) {
    for (let k = 0; k < aM; k++) {
      answer[i][j] += A[i][k] * B[k][j];
    }
  }
}

console.log(answer.map((el) => el.join(" ")).join("\n"));
