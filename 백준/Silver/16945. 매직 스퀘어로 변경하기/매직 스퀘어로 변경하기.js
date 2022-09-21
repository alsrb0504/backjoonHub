const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const std = [];

for (let i = 0; i < 3; i++) {
  const [n1, n2, n3] = input[i].split(" ");

  std.push(n1);
  std.push(n2);
  std.push(n3);
}

const visited = new Array(10).fill(false);
const num = [];

let answer = Infinity;

function dfs(cnt) {
  if (cnt === 9) {
    //
    if (isMagicSquare()) calcDiff();
    return;
  }

  for (let i = 1; i < 10; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    num.push(i);
    dfs(cnt + 1);
    num.pop();
    visited[i] = false;
  }
}

function isMagicSquare() {
  const preSum = num[0] + num[1] + num[2];

  // 0 1 2
  // 3 4 5
  // 6 7 8

  if (preSum !== num[3] + num[4] + num[5]) return false;
  if (preSum !== num[6] + num[7] + num[8]) return false;

  if (preSum !== num[0] + num[3] + num[6]) return false;
  if (preSum !== num[1] + num[4] + num[7]) return false;
  if (preSum !== num[2] + num[5] + num[8]) return false;

  if (preSum !== num[0] + num[4] + num[8]) return false;
  if (preSum !== num[2] + num[4] + num[6]) return false;

  return true;
}

function calcDiff() {
  let diff = 0;

  for (let i = 0; i < 9; i++) {
    diff += Math.abs(std[i] - num[i]);
  }

  answer = Math.min(answer, diff);
}

dfs(0);
console.log(answer);
