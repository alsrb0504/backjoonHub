const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M, K, X] = input[0].split(" ").map(Number);
const g = Array.from({ length: N + 1 }, () => []);

input.slice(1, 1 + M).forEach((info) => {
  const [u, v] = info.split(" ").map(Number);
  g[u].push(v);
});

console.log(bfs(X));

function bfs(start) {
  const visited = new Array(N).fill(false);
  const q = [[start, 0]];
  const answer = [];
  visited[start] = true;

  while (q.length) {
    const [curr, count] = q.shift();

    for (let next of g[curr]) {
      if (visited[next]) continue;

      if (count + 1 === K) {
        answer.push(next);
        visited[next] = true;
      } else {
        q.push([next, count + 1]);
        visited[next] = true;
      }
    }
  }

  return answer.length === 0 ? -1 : answer.sort((a, b) => a - b).join("\n");
}
