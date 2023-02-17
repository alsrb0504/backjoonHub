const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, P] = input[0].split(" ").map(Number);
const stacks = Array.from({ length: N + 1 }, () => []);
let answer = N;

for (let i = 1; i <= N; i++) {
  const [line, fret] = input[i].split(" ").map(Number);

  if (stacks[line].length) {
    while (stacks[line].length && stacks[line].at(-1) > fret) {
      stacks[line].pop();
      answer++;
    }
  }

  if (stacks[line].length && stacks[line].at(-1) === fret) {
    answer--;
  } else {
    stacks[line].push(fret);
  }
}

console.log(answer);
