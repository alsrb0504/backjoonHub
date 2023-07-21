const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const answer = [];

for (const data of input) {
  const N = Number(data);

  answer.push(solution(N));
}

console.log(answer.join("\n"));

function solution(N) {
  let answer = 0;
  let count = 0;

  while (true) {
    count += 1;
    answer = answer * 10 + 1;
    answer %= N;

    if (answer === 0) {
      return count;
    }
  }
}
