const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
let answer = 0;

const center = Math.floor(N / 2);
const leftArr = nums.slice(0, center);
const rightArr = nums.slice(center);

// console.table(leftArr);
// console.table(rightArr);

const ltMap = new Map();
const rtMap = new Map();

const visited = new Array(Math.max(center + 1)).fill(false);

function dfs(arr, start, acc, cond) {
  if (cond === "left") {
    if (ltMap.get(acc)) ltMap.set(acc, ltMap.get(acc) + 1);
    else ltMap.set(acc, 1);
  } else if (cond === "right") {
    if (rtMap.get(acc)) rtMap.set(acc, rtMap.get(acc) + 1);
    else rtMap.set(acc, 1);
  }

  for (let i = start; i < arr.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    acc += arr[i];
    dfs(arr, i + 1, acc, cond);
    acc -= arr[i];

    visited[i] = false;
  }
}

dfs(leftArr, 0, 0, "left");
dfs(rightArr, 0, 0, "right");

const ltKeys = [...ltMap.keys()].sort((a, b) => a - b);
const rtKeys = [...rtMap.keys()].sort((a, b) => a - b);

// console.table(ltMap);
// console.table(rtMap);
// console.table(ltKeys);
// console.table(rtKeys);

let lt = 0;
let rt = rtKeys.length - 1;

while (lt < ltKeys.length && rt >= 0) {
  const ltVal = ltKeys[lt];
  const rtVal = rtKeys[rt];

  const sum = ltVal + rtVal;

  if (sum === S) {
    answer += ltMap.get(ltVal) * rtMap.get(rtVal);

    lt++;
    rt--;
  } else if (sum < S) {
    lt++;
  } else if (sum > S) {
    rt--;
  }
}

console.log(S === 0 ? answer - 1 : answer);