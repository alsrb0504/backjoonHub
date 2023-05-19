const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const answer = [];
const cond = ["a", "e", "i", "o", "u", "I", "E", "A", "O", "U"];

let idx = 0;
while (true) {
  const str = input[idx].trimEnd();
  idx++;

  if (str === "#") break;

  let cnt = 0;

  for (let i = 0; i < str.length; i++) {
    if (cond.includes(str[i])) cnt++;
  }

  answer.push(cnt);
}

console.log(answer.join("\n"));
