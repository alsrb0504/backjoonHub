const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, length, max_weight] = input[0].split(" ").map(Number);
const trucks = input[1].split(" ").map(Number);
const q = new Array(length).fill(0);

let answer = 0;
let curr_w = 0;

for (let i = 0; i < N; i++) {
  const truck = trucks[i];

  curr_w -= q.shift();

  if (curr_w + truck <= max_weight) {
    q.push(truck);
    curr_w += truck;
  } else {
    i--;
    q.push(0);
  }

  answer++;
}

answer += length;

console.log(answer);