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

// tree 정보 입력 받음
input.slice(1, 1 + N).forEach((el) => {
  const nums = el.split(" ").map(Number);
  // -1 제거
  nums.pop();
  // 첫 번째 값이 현재 노드 (제거)
  const node = nums.shift();

  // 더 작은 값을 먼저 방문할 수 있도록 정렬
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    tree[node].push(nums[i]);
  }
});

// 값 카운트 변수 : 왼쪽 오른쪽 값을 하나씩 쓰기 위함
let cur = 1;
// 방문 처리용 배열 : dfs에서 부모 노드로 돌아가지 않도록 하기 위함
const visited = new Array(N + 1).fill(false);

// 루트부터 탐색 시작
dfs(root);

// 결과 출력
console.log(
  answer
    .slice(1)
    .map((el) => el.join(" "))
    .join("\n")
);

// dfs
// 먼저 현재값으로 왼쪽 값을 할당
// 이후, 자식들을 깊이 탐색한 후, 오른쪽 값을 할당
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