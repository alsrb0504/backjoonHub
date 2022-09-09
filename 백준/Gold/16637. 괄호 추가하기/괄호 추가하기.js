const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const opers = [];
const nums = [];
let answer = -Infinity;

input[1].split("").forEach((el) => {
  if (0 <= Number(el) && Number(el) <= 9) {
    nums.push(Number(el));
  } else {
    // [ 연산자, 괄효 여부]
    opers.push([el, false]);
  }
});

dfs(0, 0);

function dfs(cnt, start) {
  calc();

  for (let i = start; i < opers.length; i++) {
    if (i > 0 && opers[i - 1][1]) continue;

    opers[i][1] = true;
    dfs(cnt + 1, i + 1);
    opers[i][1] = false;
  }
}

function calc() {
  let numsCnt = nums.length - 1;
  let operCnt = opers.length - 1;

  const stack = [nums[numsCnt]];
  numsCnt--;

  while (operCnt >= 0) {
    const [oper, isSelected] = opers[operCnt];
    operCnt--;

    if (isSelected) {
      const post = stack.pop();
      const pre = nums[numsCnt--];
      const tmp = eval(`${pre} ${oper} ${post}`);
      stack.push(tmp);
    } else {
      stack.push(oper);
      stack.push(nums[numsCnt--]);
    }
  }

  let result = stack.pop();

  while (stack.length) {
    const oper = stack.pop();
    const post = stack.pop();
    result = eval(`${result} ${oper} ${post}`);
  }
    
  answer = Math.max(answer, result);
}

console.log(answer);