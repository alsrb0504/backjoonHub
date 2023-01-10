const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const tc = Number(input[0]);
const answer = [];
let line = 1;

for (let i = 0; i < tc; i++) {
  answer.push(solution(line));
}

console.log(answer.join("\n"));

function solution(idx) {
  const [sx, sy, ex, ey] = input[idx].split(" ").map(Number);
  const N = Number(input[idx + 1]);
  const planets = input
    .slice(idx + 2, idx + 2 + N)
    .map((el) => el.trimEnd().split(" ").map(Number));

  let cnt = 0;

  planets.forEach((el) => {
    [x, y, r] = el;

    const start_dist = Math.sqrt(Math.pow(sx - x, 2) + Math.pow(sy - y, 2));
    const end_dist = Math.sqrt(Math.pow(ex - x, 2) + Math.pow(ey - y, 2));

    if (start_dist < r && end_dist > r) cnt++;
    if (start_dist > r && end_dist < r) cnt++;
  });

  line += N + 2;
  return cnt;
}
