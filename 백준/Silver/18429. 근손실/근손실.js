const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const kits = input[1].split(" ").map(Number);
const visited = new Array(N).fill(false);
let answer = 0;

dfs(0, 0);

console.log(answer);

function dfs(count, curr) {
  if (count === N) {
    answer++;
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    if (curr + kits[i] - K < 0) continue;

    visited[i] = true;
    dfs(count + 1, curr + kits[i] - K);
    visited[i] = false;
  }
}
