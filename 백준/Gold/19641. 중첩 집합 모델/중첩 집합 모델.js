const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const tree = Array.from({ length: N + 1 }, () => []);
const root = Number(input[N + 1]);
const answer = Array.from({ length: N + 1 }, () => new Array(3).fill(0));

input.slice(1, 1 + N).forEach((el) => {
  const nums = el.split(" ").map(Number);
  // -1 제거
  nums.pop();
  // 첫 번째 값이 노드
  const node = nums.shift();
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    tree[node].push(nums[i]);
  }
});

let cur = 1;
const visited = new Array(N + 1).fill(false);

function dfs(idx) {
  const left = cur++;
  visited[idx] = true;

  for (let child of tree[idx]) {
    if (visited[child]) continue;
    dfs(child);
  }

  const right = cur++;

  answer[idx][0] = idx;
  answer[idx][1] = left;
  answer[idx][2] = right;
}

dfs(root);

console.log(
  answer
    .slice(1)
    .map((el) => el.join(" "))
    .join("\n")
);