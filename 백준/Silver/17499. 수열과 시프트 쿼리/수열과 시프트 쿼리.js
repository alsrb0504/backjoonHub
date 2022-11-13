const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, Q] = input[0].split(" ").map(Number);
const sequence = input[1].split(" ").map(Number);
let idx = 0;

for (let i = 2; i < 2 + Q; i++) {
  const command = input[i].split(" ").map(Number);

  if (command[0] === 1) {
    const plusIdx = (idx + command[1] - 1) % N;
    sequence[plusIdx] += command[2];
  } else if (command[0] === 2) {
    idx = (idx + N - command[1]) % N;
  } else {
    idx = (idx + command[1]) % N;
  }

  // console.log(`idx = ${idx}`);

  // const answer = [];

  // for (let i = idx; i < N; i++) {
  //   answer.push(sequence[i]);
  // }

  // for (let i = 0; i < idx; i++) {
  //   answer.push(sequence[i]);
  // }

  // console.log(answer.join(" "));
}

// console.table(sequence);

const answer = [];

for (let i = idx; i < N; i++) {
  answer.push(sequence[i]);
}

for (let i = 0; i < idx; i++) {
  answer.push(sequence[i]);
}

console.log(answer.join(" "));
