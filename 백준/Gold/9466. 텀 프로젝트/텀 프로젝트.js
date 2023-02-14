const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(solution(i * 2 + 1));
}

console.log(answer.join("\n"));

function solution(l) {
  const N = Number(input[l]);
  const nums = input[l + 1].split(" ").map(Number);

  const visited = new Array(N + 1).fill(false);
  const stack = [];

  const success_set = new Set();
  const fail_set = new Set();

  for (let i = 1; i <= N; i++) {
    const next = nums[i - 1];

    if (i === next) {
      success_set.add(i);
      continue;
    }

    if (success_set.has(i) || fail_set.has(i)) continue;

    dfs(i);
  }

  return fail_set.size;

  function dfs(curr) {
    const next = nums[curr - 1];

    if (visited[next]) {
      let isFind = false;

      for (let i = 0; i < stack.length; i++) {
        if (isFind) {
          success_set.add(stack[i]);
        } else {
          if (next === stack[i]) {
            success_set.add(stack[i]);
            isFind = true;
          } else {
            fail_set.add(stack[i]);
          }
        }
      }

      success_set.add(curr);
    } else if (success_set.has(next) || fail_set.has(next)) {
      for (let i = 0; i < stack.length; i++) {
        fail_set.add(stack[i]);
      }
      fail_set.add(curr);
    } else {
      stack.push(curr);
      visited[curr] = true;
      dfs(next);
      stack.pop();
      visited[curr] = false;
    }
  }
}
