const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const FAIL = "sad";
const SUCCESS = "happy";
const TC = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < TC; i++) {
  const N = Number(input[line]);

  answer.push(solution(line));

  line += N + 3;
}

console.log(answer.join("\n"));

function solution(l) {
  const N = Number(input[l]);

  const [startX, startY] = input[l + 1].split(" ").map(Number);

  const spots = input
    .slice(l + 2, l + 3 + N)
    .map((el) => el.split(" ").map(Number));

  const [endX, endY] = input[l + 2 + N].split(" ").map(Number);
  const visited = new Array(N + 1).fill(false);

  const q = [[startX, startY]];

  while (q.length) {
    const [currX, currY] = q.shift();

    for (let i = 0; i < N + 1; i++) {
      if (visited[i]) continue;

      const [nextX, nextY] = spots[i];
      const diff = Math.abs(nextY - currY) + Math.abs(nextX - currX);

      if (diff > 1000) continue;

      // 종료
      if (nextY === endY && nextX === endX) return SUCCESS;

      visited[i] = true;
      q.push([nextX, nextY]);
    }
  }

  return FAIL;
}
