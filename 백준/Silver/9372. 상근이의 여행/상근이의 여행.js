const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const TC = Number(input[0]);
const answer = [];
let lc = 1;

for (let i = 0; i < TC; i++) {
  const [result, next] = solution(lc);

  lc += next + 1;
  answer.push(result);
}

console.table(answer.join("\n"));

function solution(line) {
  const [N, M] = input[line].split(" ").map(Number);
  const board = Array.from({ length: N }, () => new Array(N).fill(false));
  const visited = new Array(N).fill(false);

  input.slice(line + 1, line + 1 + M).forEach((el) => {
    const [s, e] = el.split(" ").map((n) => Number(n) - 1);
    board[s][e] = true;
    board[e][s] = true;
  });

  return [bfs(), M];

  function bfs() {
    const q = [0];
    let cnt = 0;
    visited[0] = true;

    while (q.length) {
      const curr = q.shift();

      for (let i = 0; i < N; i++) {
        if (!visited[i] && board[curr][i]) {
          visited[i] = true;
          q.push(i);
          cnt++;
        }
      }
    }

    return cnt;
  }
}