const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const expression = input[1].split("");
const nums = [];
const opers = [];

let answer = -Infinity;

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
};

expression.forEach((c) => {
  if (c === "+" || c === "-" || c === "*") opers.push(c);
  else nums.push(Number(c));
});

const checkOpers = new Array(opers.length).fill(false);

solution(0);

function solution(start) {
  makeExp();

  for (let i = start; i < opers.length; i++) {
    if (i > 0 && checkOpers[i - 1]) continue;
    checkOpers[i] = true;
    solution(i + 1);
    checkOpers[i] = false;
  }
}

function makeExp() {
  let newExp = [];

  let cnt = 0;
  let moveCnt = 0;

  if (checkOpers[0]) {
    newExp.push("(");
    expression.slice(0, 3).forEach((c) => newExp.push(c));
    newExp.push(")");
  } else {
    expression.slice(0, 3).forEach((c) => newExp.push(c));
  }

  for (let i = 1; i < opers.length; i++) {
    if (checkOpers[i]) {
      const last = newExp.pop();
      newExp.push("(");
      newExp.push(last);
      newExp.push(expression[i * 2 + 1]);
      newExp.push(expression[i * 2 + 2]);
      newExp.push(")");
    } else {
      newExp.push(expression[i * 2 + 1]);
      newExp.push(expression[i * 2 + 2]);
    }
  }

  answer = Math.max(answer, eval(newExp.join("")));

  calc(newExp);
}

function calc(exp) {
  const removeBrackets = [];

  const splitNums = [];

  const splitOpers = [];

  for (let i = 0; i < exp.length; ) {
    if (exp[i] === "(") {
      const sub = exp.slice(i + 1, i + 4);
      const [pre, oper, post] = sub.join("").split("");
      const calced = operations[oper](Number(pre), Number(post));
      splitNums.push(Number(calced));
      i += 5;
    } else {
      if (exp[i] !== "*" && exp[i] !== "+" && exp[i] !== "-") {
        splitNums.push(Number(exp[i]));
      } else {
        splitOpers.push(exp[i]);
      }
      i++;
    }
  }

  const afterNums = [splitNums[0]];
  const afterOpers = [];

  for (let i = 0; i < splitOpers.length; i++) {
    if (splitOpers[i] === "*") {
      const post = afterNums.pop();
      const multiple = post * splitNums[i + 1];
      afterNums.push(multiple);
    } else {
      afterNums.push(splitNums[i + 1]);
      afterOpers.push(splitOpers[i]);
    }
  }

  let result = afterNums[0];

  for (let i = 0; i < afterOpers.length; i++) {
    const oper = afterOpers[i];
    const post = afterNums[i + 1];
    result = operations[oper](result, post);
  }

  answer = Math.max(answer, result);
}

console.log(answer);
