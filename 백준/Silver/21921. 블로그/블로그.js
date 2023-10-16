const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, X] = input[0].split(" ").map(Number);
const records = input[1].split(" ").map(Number);
const sum = new Array(N);
sum[0] = records[0];

const answer = {
  max: -1,
  cnt: 0,
};

for (let i = 1; i < N; i++) {
  sum[i] = sum[i - 1] + records[i];
}

if (sum[N - 1] === 0) {
  console.log("SAD");
  return;
}

sum.unshift(0);

for (let i = X; i <= N; i++) {
  const curr = sum[i] - sum[i - X];

  if (answer.max < curr) {
    answer.max = curr;
    answer.cnt = 1;
  } else if (answer.max === curr) {
    answer.cnt++;
  }
}

console.log(`${answer.max}\n${answer.cnt}`);
