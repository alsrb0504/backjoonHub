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
  answer.push(solution(line));
}

console.log(answer.join("\n"));

function solution(l) {
  const [N, K] = input[l].split(" ").map(Number);
  line += K + 3;

  const build = input[l + 1].split(" ").map(Number);
  build.unshift(-1);

  const acc = [...build];

  const target = Number(input[line - 1]);

  const prev_cnt = new Array(N + 1).fill(0);

  const graph = Array.from({ length: N + 1 }, () => []);

  input.slice(l + 2, l + 2 + K).forEach((el) => {
    const [prev, next] = el.split(" ").map(Number);

    graph[prev].push(next);

    prev_cnt[next]++;
  });

  const q = [];

  for (let i = 1; i <= N; i++) {
    if (prev_cnt[i] === 0) q.push(i);
  }

  while (q.length) {
    const curr = q.shift();

    for (let i = 0; i < graph[curr].length; i++) {
      const next = graph[curr][i];

      if (acc[next] < acc[curr] + build[next]) {
        acc[next] = acc[curr] + build[next];
      }

      prev_cnt[next]--;
      if (prev_cnt[next] === 0) q.push(next);
    }
  }

  return acc[target];
}
