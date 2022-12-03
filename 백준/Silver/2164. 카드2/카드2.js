const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const q = [];

for (let i = 1; i <= N; i++) {
  q.push(i);
}

let idx = 0;
let cnt = 0;
while (cnt < N - 1) {
  idx++;
  const back = q[idx++];
  q.push(back);

  cnt++;
}

console.table(q[q.length - 1]);
