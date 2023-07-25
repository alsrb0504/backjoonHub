const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const answer = new Array(N).fill(-1);

nums.forEach((num, idx) => {
  let count = 0;
  let answerIdx = 0;

  for (let i = 0; i < N; i++) {
    if (answer[i] === -1) {
      if (count >= num) {
        break;
      }

      count++;
      answerIdx++;
    } else {
      answerIdx++;
    }
  }

  answer[answerIdx] = idx + 1;
});

console.log(answer.join(" "));
