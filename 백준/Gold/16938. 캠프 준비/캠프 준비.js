const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, L, R, X] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
const visited = new Array(N).fill(false);
const stack = [];
let answer = 0;

// 조합
function dfs(start, cnt) {
  if (cnt === N) {
    return;
  }

  for (let i = start; i < N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    stack.push(nums[i]);

    if (isPossible()) answer++;

    dfs(i + 1, cnt + 1);

    visited[i] = false;
    stack.pop();
  }
}

function isPossible() {
  if (stack.length < 2) return false;

  const sum = stack.reduce((acc, cur) => acc + cur, 0);
  const max = Math.max.apply(null, stack);
  const min = Math.min.apply(null, stack);

  if (sum < L || sum > R) return false;
  if (max - min < X) return false;

  return true;
}

dfs(0, 0);

console.log(answer);