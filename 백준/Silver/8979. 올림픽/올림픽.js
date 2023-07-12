const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, 1 + N).map((line) => line.split(" ").map(Number));

arr.sort((a, b) => {
  if (b[1] === a[1]) {
    if (b[2] === a[2]) {
      return b[3] - a[3];
    }
    return b[2] - a[2];
  }
  return b[1] - a[1];
});

let answer = 0;
let answer_idx = 0;
let answer_key = 0;

for (let i = 0; i < N; i++) {
  if (K === arr[i][0]) {
    answer_idx = i;
    answer_key = `${arr[i][1]}-${arr[i][2]}-${arr[i][3]}`;
    break;
  }
}

for (let i = 0; i < answer_idx; i++) {
  const key = `${arr[i][1]}-${arr[i][2]}-${arr[i][3]}`;

  if (key !== answer_key) answer++;
}

console.log(answer + 1);
