const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const MAX = 100001;
const answer = [];
const LOG = 17;

const graph = Array.from({ length: MAX }, () => []);
const parent = Array.from({ length: MAX }, () => new Array(LOG).fill(0));
const visited = new Array(MAX).fill(false);
const depthArr = new Array(MAX).fill(-1);

// 그래프 연결
input.slice(1, N).forEach((info) => {
  const [u, v] = info.split(" ").map(Number);

  graph[u].push(v);
  graph[v].push(u);
});

setParent();

const query = Number(input[N]);

input.slice(N + 1, N + 1 + query).forEach((info) => {
  const [a, b] = info.split(" ").map(Number);

  answer.push(LCA(a, b));
});

console.log(answer.join("\n"));

function dfs(node, depth) {
  visited[node] = true;
  depthArr[node] = depth;

  for (let next of graph[node]) {
    if (visited[next]) continue;

    parent[next][0] = node;
    dfs(next, depth + 1);
  }
}

// 전체 부모 관계를 설정하는 함수
function setParent() {
  dfs(1, 0);

  for (let j = 1; j < LOG; j++) {
    for (let i = 1; i <= N; i++) {
      parent[i][j] = parent[parent[i][j - 1]][j - 1];
    }
  }
}

function LCA(x, y) {
  // y의 깊이가 더 깊도록 설정
  if (depthArr[x] > depthArr[y]) [x, y] = [y, x];

  // 두 노드의 깊이를 동일하게 설정
  for (let i = LOG - 1; i >= 0; i--) {
    if (depthArr[y] - depthArr[x] >= 1 << i) {
      y = parent[y][i];
    }
  }

  // 부모가 같은 경우 반환
  if (x === y) return x;

  for (let i = LOG - 1; i >= 0; i--) {
    // 조상을 향해 거슬로 올라감
    if (parent[x][i] !== parent[y][i]) {
      x = parent[x][i];
      y = parent[y][i];
    }
  }

  return parent[x][0];
}
