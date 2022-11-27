const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const success = "Ta-da";
const fail = "Gave up";

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  const [cx, cy] = input[1 + i * 2].split(" ").map(Number);
  const mv_info = input[2 + i * 2].split(" ").map(Number);
  const mv_num = mv_info.shift();

  let min_unit = mv_info[0];

  for (let i = 1; i < mv_num; i++) {
    min_unit = gcd(min_unit, mv_info[i]);
  }

  if (solution(cx, min_unit) && solution(cy, min_unit)) {
    answer.push(success);
  } else answer.push(fail);
}

console.log(answer.join("\n").trimEnd());

function solution(target, unit) {
  if (target % unit === 0) return true;
  return false;
}

function gcd(n1, n2) {
  // 큰 값
  let a = Math.max(n1, n2);
  // 작은 값
  let b = Math.min(n1, n2);

  while (b !== 0) {
    const tmp = a % b;
    a = b;
    b = tmp;
  }

  return a;
}
