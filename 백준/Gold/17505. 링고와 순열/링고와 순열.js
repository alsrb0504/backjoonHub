const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const answer = [];
let max = Math.floor((N * (N - 1)) / 2);

if (max < K) {
  console.log(-1);
  return;
}

let rest = K;
let curr = N;

while (rest > 0 && curr > 0) {
  if (rest >= curr - 1) {
    answer.push(curr);
    curr--;
    rest -= curr;
  } else break;
}

if (rest > 0) {
  // 남은 숫자의 수는 1 ~ curr 까지
  // curr의 뒤에 rest의 숫자가 위치
  for (let i = 1; i < curr; i++) {
    if (curr - i === rest) {
      answer.push(curr);
    }
    answer.push(i);
  }
} else {
  for (let i = 1; i <= curr; i++) answer.push(i);
}

console.log(answer.join(" "));
