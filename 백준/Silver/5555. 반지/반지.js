const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const std = input[0];
const N = Number(input[1]);
let answer = 0;

for (let i = 0; i < N; i++) {
  const str = input[i + 2] + input[i + 2];
  if (str.includes(std)) answer++;
}

console.log(answer);
