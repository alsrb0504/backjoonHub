const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const TC = Number(input[0]);
const nums = input.slice(1, 1 + TC).map(Number);
const answer = [];

for (let i = 0; i < TC; i++) {
  //
  answer.push(solution(nums[i]));
  answer.push("");
}

console.log(answer.join("\n"));

function solution(N) {
  let result = [];
  const stack = ["1"];

  dfs(1, 1);

  function dfs(cnt, acc) {
    if (cnt === N) {
      if (eval(stack.map((el) => el.trim()).join("")) === 0) {
        result.push(stack.join(""));
      }

      return;
    }

    stack.push(`+${cnt + 1}`);
    dfs(cnt + 1, acc + cnt);
    stack.pop();

    stack.push(`-${cnt + 1}`);
    dfs(cnt + 1, acc - cnt);
    stack.pop();

    stack.push(` ${cnt + 1}`);
    dfs(cnt + 1, acc * 10 + cnt);
    stack.pop();
  }

  return result.sort().join("\n");
}