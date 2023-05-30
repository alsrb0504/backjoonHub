const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
let deq = [...new Array(N).keys()];
let answer = 0;

for (let i = 0; i < N; i++) deq[i]++;

for (let num of nums) {
  const size = deq.length;
  const front = deq.findIndex((el) => el === num);
  const rear = size - front - 1;

  if (front <= rear) {
    deq = [...deq.slice(front + 1), ...deq.slice(0, front)];
    answer += front;
  } else {
    deq = [...deq.slice(front + 1), ...deq.slice(0, front)];
    answer += rear + 1;
  }
}

console.log(answer);