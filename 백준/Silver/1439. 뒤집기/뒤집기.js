const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const str = input[0].split("");
const start = str[0];
let flag = false;
let answer = 0;

for (let i = 1; i < str.length; i++) {
  if (str[i] !== start && !flag) {
    flag = true;
  }

  if (str[i] === start && flag) {
    flag = false;
    answer++;
  }
}

if (flag) answer++;

console.log(answer);
