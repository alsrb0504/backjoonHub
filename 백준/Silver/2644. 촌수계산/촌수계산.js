const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const [start, end] = input[1].split(" ").map(Number);
const K = Number(input[2]);
const g = Array.from({ length: N + 1 }, () => []);

input.slice(3, 3 + K).forEach((el) => {
  const [parent, child] = el.split(" ").map(Number);

  g[parent].push(child);
  g[child].push(parent);
});

const visited = new Array(N + 1).fill(false);
visited[start] = true;

const q = [[start, 0]];

while (q.length) {
  const [cur, cnt] = q.shift();

  for (let next of g[cur]) {
    if (visited[next]) continue;

    if (next === end) {
      console.log(cnt + 1);
      return;
    }

    visited[next] = true;
    q.push([next, cnt + 1]);
  }
}

console.log(-1);