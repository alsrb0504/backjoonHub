const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const answer = [];
const N = Number(input[0]);

for (let i = 1; i <= N; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

function solution(line) {
  const [M, N, X, Y] = input[line].split(" ").map(Number);

  if (X === Y) return X;
  let min = Infinity;
  let cnt = X;

  while (cnt <= N * M) {
    cnt += M;
    const rest = cnt % N === 0 ? N : cnt % N;

    if (rest === Y) {
      min = cnt;
      break;
    }
  }

  cnt = Y;

  while (cnt <= N * M) {
    cnt += N;
    const rest = cnt % M === 0 ? M : cnt % M;

    if (rest === X) {
      return Math.min(cnt, min);
    }
  }

  return -1;
}