const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);
const nums = A.toString().split("").map(Number);
const visited = new Array(nums.length).fill(false);
let answer = -1;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] !== 0) {
    visited[i] = true;
    dfs(1, nums[i]);
    visited[i] = false;
  }
}

function dfs(cnt, acc) {
  if (cnt === nums.length) {
    if (acc < B && answer < acc) answer = acc;
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    dfs(cnt + 1, acc * 10 + nums[i]);
    visited[i] = false;
  }
}

dfs(0);
console.log(answer);