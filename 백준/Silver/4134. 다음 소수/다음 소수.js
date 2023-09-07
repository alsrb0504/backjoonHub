const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input.slice(1, 1 + N).map(Number);
const answer = [];

nums.forEach((num) => {
  answer.push(solution(num));
});

console.log(answer.join("\n"));

function solution(num) {
  if (num < 2) return 2;

  while (true) {
    let isDivided = false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        num++;
        isDivided = true;
        break;
      }
    }

    if (!isDivided) break;
  }

  return num;
}
