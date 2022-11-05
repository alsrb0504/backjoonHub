const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const n = Number(input[0]);
const num = input[1].trim().split(" ").map(Number);
const oper = input[2].trim().split(" ").map(Number);
const oper_cnt = oper.length;
let min = Infinity;
let max = -Infinity;

const operObj = {
  0: (num1, num2) => num1 + num2,
  1: (num1, num2) => num1 - num2,
  2: (num1, num2) => num1 * num2,
  3: (num1, num2) => {
    const value = num1 / num2;
    return value < 0 ? Math.ceil(value) : Math.floor(value);
  },
};

function dfs(cnt, acc) {
  if (cnt === n - 1) {
    min = Math.min(min, acc);
    max = Math.max(max, acc);
    return;
  }

  for (let i = 0; i < oper_cnt; i++) {
    if (oper[i] === 0) continue;

    oper[i]--;

    let value = operObj[i](acc, num[cnt + 1]);

    dfs(cnt + 1, value);

    oper[i]++;
  }
}

dfs(0, num[0]);

console.log(max + "\n" + min);
