const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, L] = input[0].split(" ").map(Number);
const data = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));

data.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  else return a[0] - b[0];
});

data.sort((a, b) => a[0] - b[0]);

let idx = 0;
let answer = 0;

data.forEach((pos) => {
  const [S, E] = pos;

  if (idx < S) {
    const width = E - S;
    const needs = Math.ceil(width / L);
    answer += needs;

    idx = S;
    idx += needs * L;
  } else if (idx < E) {
    const width = E - idx;

    const needs = Math.ceil(width / L);
    answer += needs;
    idx += needs * L;
  }
});

console.log(answer);