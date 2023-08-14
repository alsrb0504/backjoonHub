const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
let answer = 1;

for (let i = 2; i < N; i++) {
  const quotient = Math.floor(N / i);

  let isPossible = true;
  let sum = quotient;

  for (let j = 1; j < i; j++) {
    // 좌측
    if (j % 2 === 0) {
      const prev = quotient - Math.floor(j / 2);

      if (prev <= 0) {
        isPossible = false;
        break;
      }

      sum += prev;
    }
    // 우측
    else {
      sum += quotient + Math.ceil(j / 2);
    }
  }

  if (!isPossible || sum !== N) continue;

  answer++;
}

console.log(answer);
