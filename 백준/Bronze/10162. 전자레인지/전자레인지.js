const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const timers = [300, 60, 10];
let N = Number(input[0]);

let answer = [];

timers.forEach((t) => {
  if (N >= t) {
    const cnt = Math.floor(N / t);
    N -= cnt * t;
    answer.push(cnt);
  } else {
    answer.push(0);
  }
});

if (N === 0) console.log(answer.join(" "));
else console.log(-1);