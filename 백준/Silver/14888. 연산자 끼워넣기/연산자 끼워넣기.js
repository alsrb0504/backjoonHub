const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const n = Number(input[0]);
const num = input[1].trim().split(" ").map(Number);
const operData = input[2].trim().split(" ").map(Number);
const oper = [];

operData.forEach((el, idx) => {
  let ch;

  switch (idx) {
    case 0:
      ch = "+";
      break;
    case 1:
      ch = "-";
      break;
    case 2:
      ch = "*";
      break;
    case 3:
      ch = "/";
      break;
    default:
      break;
  }

  for (let i = 0; i < el; i++) {
    oper.push(ch);
  }
});

let max = -Infinity;
let min = Infinity;

const visited = new Array(n - 1).fill(false);

let result = num[0];

function dfs(cnt) {
  if (cnt === n - 1) {
    if (result > max) max = result;
    if (result < min) min = result;
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    let prev_result = result;

    let value;

    switch (oper[i]) {
      case "+":
        value = result + num[cnt + 1];
        break;
      case "-":
        value = result - num[cnt + 1];
        break;
      case "*":
        value = result * num[cnt + 1];
        break;
      case "/":
        value = result / num[cnt + 1];
        break;
      default:
        break;
    }

    if (value > 0) {
      result = Math.floor(value);
    } else {
      result = Math.ceil(value);
    }

    dfs(cnt + 1);

    visited[i] = false;
    result = prev_result;
  }
}

dfs(0);

console.log(max + "\n" + min);