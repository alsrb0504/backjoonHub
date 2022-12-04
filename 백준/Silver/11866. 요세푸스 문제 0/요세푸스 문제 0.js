const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

let idx = -1; // 0
let cnt = 0;

const answer = [];
const q = [];
for (let i = 0; i < N; i++) q.push(i);


while (cnt < N) {
  let pass_cnt = 0;

  while (pass_cnt < K) {
    idx++;
    pass_cnt++;

    if (pass_cnt !== K) q.push(q[idx]);
  }

  answer.push(q[idx] + 1);

  cnt++;
}

console.log(`<${answer.join(", ")}>`);
