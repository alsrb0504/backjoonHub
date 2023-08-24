const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const data = input.slice(1, 1 + N).map((line) => line.trimEnd());
const ENTER = "ENTER";
let answer = 0;
let set = new Set();

for (const log of data) {
  if (log === ENTER) {
    set = new Set();
  } else {
    if (set.has(log)) continue;

    set.add(log);
    answer++;
  }
}

console.log(answer);
