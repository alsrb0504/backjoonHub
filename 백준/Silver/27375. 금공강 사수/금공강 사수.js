const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const visited = Array.from({ length: 6 }, () => new Array(11).fill(false));
const arr = input.slice(1, 1 + n).map((el) => el.split(" ").map(Number));

let answer = 0;

const stack = [];

dfs(0, 0);

function dfs(idx, acc) {
  if (acc === k) {
    answer++;
    return;
  }

  for (let i = idx; i < n; i++) {
    const [w, s, e] = arr[i];

    if (w === 5) continue;

    const tmp = e - s + 1;
    let isPossible = true;

    for (let j = s; j <= e; j++) {
      if (visited[w][j]) {
        isPossible = false;
        break;
      }
    }

    // 중복되는 수업 있는 경우 백트래킹
    if (!isPossible || acc + tmp > k) continue;

    for (let j = s; j <= e; j++) visited[w][j] = true;

    stack.push(arr[i]);

    dfs(i + 1, acc + tmp);

    for (let j = s; j <= e; j++) visited[w][j] = false;

    stack.pop();
  }
}

console.log(answer);
