const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = new Map();
const set = new Set();
let answer = Infinity;

function insertMap(a, b) {
  if (map.has(a)) {
    map.get(a).push(b);
  } else {
    map.set(a, [b]);
  }
}

for (let i = 1; i <= M; i++) {
  const [n1, n2] = input[i].split(" ").map(Number);

  insertMap(n1, n2);
  insertMap(n2, n1);

  set.add(n1);
  set.add(n2);
}

const nums = [...set];
const stack = [];

for (let i = 0; i < nums.length; i++) {
  dfs(1, nums[i], map.get(nums[i]).length, nums[i]);
}

function dfs(cnt, cur, acc, start) {
  if (cnt === 3) {
    const lastArr = map.get(cur);

    if (lastArr.findIndex((v) => v === start) !== -1) {
      answer = Math.min(answer, acc - 6);
    }

    return;
  }

  const arr = map.get(cur);

  if (arr.length < 2) return;

  arr.forEach((v) => {
    if (v !== start) {
      const length = map.get(v).length;
      dfs(cnt + 1, v, acc + length, start);
    }
  });
}

console.log(answer === Infinity ? -1 : answer);
