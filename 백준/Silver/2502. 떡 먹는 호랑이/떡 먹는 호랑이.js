const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [D, K] = input[0].split(" ").map(Number);

const pibo_1 = [1, 0];
const pibo_2 = [0, 1];

for (let i = 2; i < D; i++) {
  pibo_1[i] = pibo_1[i - 2] + pibo_1[i - 1];
  pibo_2[i] = pibo_2[i - 2] + pibo_2[i - 1];
}

const [X, Y] = [pibo_1.pop(), pibo_2.pop()];

let a = 1;

while (true) {
  const tmp = K - X * a;

  if (tmp % Y === 0) {
    console.log(`${a}\n${tmp / Y}`);
    break;
  }

  a++;
}