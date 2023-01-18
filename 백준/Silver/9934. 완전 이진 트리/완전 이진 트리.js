const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const tree = Array.from({ length: N }, () => []);
const nums = input[1].split(" ").map(Number);
const answer = [];

function solution(arr, depth) {
  if (arr.length === 0) return;

  const mid = Math.floor(arr.length / 2);
  tree[depth].push(arr[mid]);

  solution(arr.slice(0, mid), depth + 1);
  solution(arr.slice(mid + 1), depth + 1);
}

solution(nums, 0);

tree.forEach((el) => {
  answer.push(el.join(" "));
});

console.log(answer.join("\n"));