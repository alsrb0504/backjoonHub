const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const str = input[1].trim();
let answer = 0;

for (let i = 0; i < str.length - 3; i++) {
  if (
    str[i] === "p" &&
    str[i + 1] === "P" &&
    str[i + 2] === "A" &&
    str[i + 3] === "p"
  ) {
    answer++;
    i += 3;
  }
}

console.log(answer);
