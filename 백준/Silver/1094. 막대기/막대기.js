const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const sticks = [0, 1, 2, 4, 8, 16, 32, 64, 128];
let n = Number(input[0]);
let answer = 0;

while (n > 0) {
  for (let i = 0; i < sticks.length; i++) {
    const stick = sticks[i];

    if (n < stick) {
      n -= sticks[i - 1];
      answer++;
      break;
    }
  }
}

console.log(answer);
