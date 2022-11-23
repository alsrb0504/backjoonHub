const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

let cnt = 0;
let line = 1;

while (cnt < tc) {
  const N = Number(input[line++]);

  const person = input
    .slice(line, line + N)
    .map((info) => info.split(" ").map(Number));

  answer.push(solution(person, N));

  line += N;
  cnt++;
}

console.log(answer.join("\n").trimEnd());

function solution(arr, n) {
  arr.sort((a, b) => a[0] - b[0]);
  const first = arr[0];

  const filtered = arr.filter((el) => el[1] <= first[1]);

  filtered.sort((a, b) => a[1] - b[1]);

  let cnt = 1;
  let prev = filtered[0][0];

  for (let i = 1; i < filtered.length; i++) {
    if (prev > filtered[i][0]) {
      prev = filtered[i][0];
      cnt++;
    }
  }

  return cnt;
}
