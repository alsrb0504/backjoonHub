const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const operation = {
  "+": 0,
  "-": 0,
  "*": 1,
  "/": 1,
};

const formula = input[0].trimEnd().split("");
const size = formula.length;
// console.table(formula);

const nums = [];
const opers = []; // {top_oper: +, top_pri: 0}

for (let i = 0; i < size; i++) {
  const cur = formula[i];

  if (cur === "(") {
    opers.push("(");
  } else if (cur === ")") {
    while (opers[opers.length - 1] !== "(") {
      const top_oper = opers.pop();
      const calc = top_oper + nums.pop() + nums.pop();
      nums.push(calc);
    }

    opers.pop();
  }
  // operation
  else if (cur === "+" || cur === "-" || cur === "*" || cur === "/") {
    if (opers.length === 0 || opers[opers.length - 1] === "(") {
      opers.push(cur);
      continue;
    }

    let top_oper = opers[opers.length - 1];

    if (operation[top_oper] < operation[cur]) {
      opers.push(cur);
    } else {
      while (opers.length && operation[top_oper] >= operation[cur]) {
        const calc = opers.pop() + nums.pop() + nums.pop();
        nums.push(calc);

        top_oper = opers[opers.length - 1];
      }

      opers.push(cur);
    }
  }
  // number
  else {
    nums.push(cur);
  }

  // console.log(`cur = ${cur}`);
  // console.table(opers);
  // console.table(nums);
  // console.log();
}

// console.log("===============end==============");

// console.table(opers);
// console.table(nums);

while (opers.length) {
  const top_oper = opers.pop();
  const n1 = nums.pop();
  const n2 = nums.pop();

  // console.log(`top_oper = ${top_oper}`);
  // console.log(`n1 = ${n1}, n2 = ${n2}`);

  const calc = top_oper + n1 + n2;

  nums.push(calc);
}

// console.table(opers);
// console.table(nums);

console.log(nums[0].split("").reverse().join(""));
