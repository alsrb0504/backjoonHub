const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const [A, B, C, D, E, F] = input[1].split(" ").map(BigInt);
const bigNums = [A, B, C, D, E, F];

// 예외 : N = 1.
if (N === 1) {
  const nums = input[1].split(" ").map(Number);
  const max = Math.max(...nums);

  const sum = nums.reduce((acc, cur) => acc + cur, 0);

  console.log(sum - max);
  return;
}

let one_min = 51n;
let two_min = 101n;
let three_min = 151n;

for (let i = 0; i < 6; i++) {
  one_min = one_min > bigNums[i] ? bigNums[i] : one_min;
}

for (let i = 0; i < 6; i++) {
  for (let j = i + 1; j < 6; j++) {
    // 예외 : 3가지
    if ((i === 0 && j === 5) || (i === 1 && j === 4) || (i === 2 && j === 3))
      continue;

    let two_sum = bigNums[i] + bigNums[j];

    two_min = two_min > two_sum ? two_sum : two_min;
  }
}

for (let i = 0; i < 4; i++) {
  for (let j = i + 1; j < 5; j++) {
    for (let k = j + 1; k < 6; k++) {
      if (i === 0 && k === 5) continue;
      if ((i === 1 || j === 1) && (j === 4 || k === 4)) continue;
      if ((i === 2 || j === 2 || k === 2) && (j === 3 || k === 3)) continue;

      let three_sum = bigNums[i] + bigNums[j] + bigNums[k];

      three_min = three_min > three_sum ? three_sum : three_min;
    }
  }
}

const answer =
  three_min * 4n +
  two_min * BigInt(4 * (N - 1) + 4 * (N - 2)) +
  one_min * BigInt((N - 2) * (N - 2) + 4 * ((N - 2) * (N - 1)));

console.log(answer.toString());