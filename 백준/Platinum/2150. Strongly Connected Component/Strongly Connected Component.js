const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);
const path = input.slice(1, 1 + E).map((line) => line.split(" ").map(Number));

const path_arr = Array.from({ length: V + 1 }, () => []);

const finished = new Array(V + 1).fill(false);
const d = new Array(V + 1).fill(0);
let id = 0;

const SCC = [];
const stack = [];

function dfs(start) {
  d[start] = ++id; // 노드마다 고유의 번호 할당
  stack.push(start); // 스택에 자기 자신 삽입.

  let parent = d[start];

  for (let i = 0; i < path_arr[start].length; i++) {
    const next = path_arr[start][i];

    // 방문하지 않은 이웃
    if (d[next] === 0) parent = Math.min(parent, dfs(next));
    // 처리중인 이웃
    else if (!finished[next]) parent = Math.min(parent, d[next]);
  }

  if (parent === d[start]) {
    const result = [];

    // 부모노드가 자신인 경우
    while (true) {
      const top = stack.pop();
      result.push(top);
      finished[top] = true;
      if (top === start) break;
    }

    SCC.push(result);
  }

  return parent;
}

for (let i = 0; i < E; i++) {
  const [s, d] = path[i];

  path_arr[s].push(d);
}

for (let i = 1; i <= V; i++) {
  if (d[i] === 0) dfs(i);
}

const answer = [];

SCC.forEach((path) => {
  path.sort((a, b) => a - b);
  path.push(-1);
  answer.push(path.join(" "));
});

console.log(
  SCC.length +
    "\n" +
    answer
      .sort((a, b) => {
        const a_first = a.split(" ").map(Number)[0];
        const b_first = b.split(" ").map(Number)[0];

        return a_first - b_first;
      })
      .join("\n")
      .trimEnd()
);
