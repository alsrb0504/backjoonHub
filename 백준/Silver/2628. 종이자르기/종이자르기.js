const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [W, H] = input[0].split(" ").map(Number);
const N = Number(input[1]);

const data = input.slice(2, 2 + N).map((line) => line.split(" ").map(Number));
const y = [];
const x = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  if (data[i][0] === 0) {
    y.push(data[i][1]);
  } else {
    x.push(data[i][1]);
  }
}

y.sort((a, b) => a - b);
x.sort((a, b) => a - b);

y.unshift(0);
y.push(H);

x.unshift(0);
x.push(W);

for (let i = 0; i < y.length - 1; i++) {
  const currY = y[i];
  const nextY = y[i + 1];

  for (let j = 0; j < x.length - 1; j++) {
    const currX = x[j];
    const nextX = x[j + 1];

    const calc = (nextY - currY) * (nextX - currX);
    answer = Math.max(answer, calc);
  }
}

console.log(answer);
