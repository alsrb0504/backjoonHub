const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const items = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const stack = [];
let answer = Infinity;

for (let i = 1; i <= N; i++) {
  dfs(0, 0, i);
}

function dfs(idx, cnt, target) {
  if (cnt === target) {
    let mul = 1;
    let sum = 0;

    stack.forEach((num) => {
      mul *= items[num][0];
      sum += items[num][1];
    });

    answer = Math.min(Math.abs(mul - sum), answer);
    return;
  }

  for (let i = idx; i < N; i++) {
    stack.push(i);
    dfs(i + 1, cnt + 1, target);
    stack.pop();
  }
}

console.log(answer);
