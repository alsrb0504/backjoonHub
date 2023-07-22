const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str = input[0].trimEnd();
const TC = Number(input[1]);
const answer = [];

for (let i = 0; i < TC; i++) {
  answer.push(solution(2 + i));
}

console.log(answer.join("\n"));

function solution(line) {
  let [ch, left, right] = input[line].split(" ");
  left = Number(left);
  right = Number(right);

  let count = 0;

  for (let i = left; i <= right; i++) {
    if (str[i] === ch) count++;
  }

  return count;
}
