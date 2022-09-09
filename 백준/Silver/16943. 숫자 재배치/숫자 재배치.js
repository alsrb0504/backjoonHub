const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);

const nums = A.toString().split("").map(Number);
const visited = new Array(nums.length).fill(false);
const stack = [];
let answer = -1;

dfs(0);

function dfs(cnt) {
  if (cnt === nums.length) {
    if (stack[0] === 0) return;

    const num = Number(stack.join(""));

    if (num < B) {
      answer = Math.max(answer, num);
    }

    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    stack.push(nums[i]);

    dfs(cnt + 1);

    visited[i] = false;
    stack.pop();
  }
}

dfs(0);
console.log(answer);