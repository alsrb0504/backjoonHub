const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const rest = 1000000007n;
const base = [
  [1n, 1n],
  [1n, 0n],
];

let N = BigInt(input[0]);
let cur = 1n;
let curArr = [
  [1n, 1n],
  [1n, 0n],
];

const result = [];

while (cur !== N) {
  cur = cur * 2n;

  if (cur > N) {
    cur = cur / 2n;
    N = N - cur;
    cur = 1n;

    result.push(curArr);

    curArr = [
      [1n, 1n],
      [1n, 0n],
    ];
  } else {
    curArr = multiply(curArr, curArr);
  }
}

result.push(curArr);

function multiply(arr1, arr2) {
  const pos1 = (arr1[0][0] * arr2[0][0] + arr1[0][1] * arr2[1][0]) % rest;
  const pos2 = (arr1[0][0] * arr2[0][1] + arr1[0][1] * arr2[1][1]) % rest;
  const pos3 = (arr1[1][0] * arr2[0][0] + arr1[1][1] * arr2[1][0]) % rest;
  const pos4 = (arr1[1][0] * arr2[0][1] + arr1[1][1] * arr2[1][1]) % rest;

  return [
    [pos1, pos2],
    [pos3, pos4],
  ];
}

while (result.length > 1) {
  const arr1 = result.pop();
  const arr2 = result.pop();

  const mul = multiply(arr1, arr2);
  result.push(mul);
}

console.table(result[0][0][1].toString());