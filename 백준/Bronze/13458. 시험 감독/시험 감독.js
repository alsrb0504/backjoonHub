const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const [B, C] = input[2].split(" ").map(Number);
let answer = N;

nums.forEach((el) => {
  if (el <= B) return;

  let rest = el - B;
  answer += Math.ceil(rest / C);
});

console.log(answer);