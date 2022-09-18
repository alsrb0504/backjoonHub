const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const days = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

let sum = 0;

for (let i = 0; i < N - 1; i++) {
  sum += months[i];
}

sum += M;

console.log(days[sum % 7]);
