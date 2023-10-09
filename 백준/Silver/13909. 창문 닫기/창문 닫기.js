const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const N = Number(input[0]);
let answer = 0;
let num = 1;

while (true) {
  if (num ** 2 <= N) answer++;
  else break;

  num++;
}

console.log(answer);
