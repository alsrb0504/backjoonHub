const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  const n = Number(input[line]);

  answer.push(solution(line + 1, n) ? "YES" : "NO");
  line += 1 + n;
}

console.log(answer.join("\n"));

function solution(line, N) {
  const nums = input
    .slice(line, line + N)
    .map((el) =>
      el
        .trimEnd()
        .split("")
        .map((ch) => String.fromCharCode(65 + Number(ch)))
        .join("")
    )
    .sort();

  for (let i = 1; i < nums.length; i++) {
    const prev = nums[i - 1];
    const curr = nums[i];

    const prev_size = prev.length;
    const curr_size = curr.length;

    if (prev_size >= curr_size) continue;

    if (prev === curr.slice(0, prev_size)) {
      return false;
    }
  }

  return true;
}