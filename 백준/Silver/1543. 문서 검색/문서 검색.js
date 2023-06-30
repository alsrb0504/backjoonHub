const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let a = input[0];
const b = input[1];
const bSize = b.length;
const reg = RegExp(`${b}`);
let answer = 0;

while (a.match(reg)) {
  answer++;

  const findIndex = a.match(reg).index;
  a = a.slice(findIndex + bSize);
}

console.log(answer);
