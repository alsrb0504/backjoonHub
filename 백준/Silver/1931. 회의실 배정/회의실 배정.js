const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let N = Number(input.shift());

const confers = [];

for (let i = 0; i < N; i++) {
  confers.push(input[i].split(" ").map(Number));
}

confers.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  } else {
    return a[1] - b[1];
  }
});

let cur = confers[0][1];
let cnt = 1;

for (let i = 1; i < N; i++) {
  if (cur > confers[i][0]) continue;

  cur = confers[i][1];
  cnt++;
}

console.log(cnt);