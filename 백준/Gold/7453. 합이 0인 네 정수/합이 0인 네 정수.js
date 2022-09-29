const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

const a = [];
const b = [];
const c = [];
const d = [];

const lMap = new Map();

let answer = 0;

for (let i = 1; i <= N; i++) {
  const [n1, n2, n3, n4] = input[i].split(" ").map(Number);
  a.push(n1);
  b.push(n2);
  c.push(n3);
  d.push(n4);
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const sum = a[i] + b[j];

    const cur = lMap.get(sum);

    lMap.set(sum, cur === undefined ? 1 : cur + 1);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const sum = c[i] + d[j];

    const find = lMap.get(-1 * sum);

    if (find) {
      answer += find;
    }
  }
}

console.log(answer);