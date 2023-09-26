const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const N = Number(input[0]);
const cows = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
let answer = 0;

cows.sort((a, b) => a[0] - b[0]);

for (const [start, delay] of cows) {
  if (answer <= start) {
    answer = start + delay;
  } else {
    answer += delay;
  }
}

console.log(answer);
