const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

let line = 1;

for (let i = 0; i < tc; i++) {
  answer.push(solution());
}

console.log(answer.join("\n"));

function solution() {
  const [v, e] = input[line].split(" ").map(Number);

  const visited = new Array(v + 1).fill(0);
  const graph = Array.from({ length: v + 1 }, () => []);
  input.slice(line + 1, line + e + 1).forEach((el) => {
    const [s, e] = el.split(" ").map(Number);
    graph[s].push(e);
    graph[e].push(s);
  });

  let cur_color = 1;
  let isPossible = true;

  for (let i = 1; i <= v; i++) {
    if (visited[i] !== 0) continue;

    cur_color = colorChange(cur_color);
    visited[i] = cur_color;
    dfs(i, cur_color);
  }

  function dfs(start, color) {
    // cur_color = cur_color === 1 ? -1 : 1;
    cur_color = color;

    for (let i = 0; i < graph[start].length; i++) {
      const curr = graph[start][i];

      // 방문
      if (visited[curr] === 0) {
        const changed_color = colorChange(color);
        visited[curr] = changed_color;
        dfs(curr, changed_color);
      } else if (visited[curr] === color) {
        isPossible = false;
        return;
      } else if (visited[curr] !== color) {
        continue;
      }
    }
  }
  line += e + 1;

  return isPossible ? "YES" : "NO";
}

function colorChange(num) {
  return num === 1 ? -1 : 1;
}