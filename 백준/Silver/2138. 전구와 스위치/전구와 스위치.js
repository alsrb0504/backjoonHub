const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());

let start = input[0].trimEnd().split("").map(Number);
const dest = input[1].trimEnd().split("").map(Number);

let flipCnt = 1;
let noFlipCnt = 0;

const firstFlip = [...start];
const firstNoFlip = [...start];

firstFlip[0] = firstFlip[0] === 0 ? 1 : 0;
firstFlip[1] = firstFlip[1] === 0 ? 1 : 0;

for (let i = 1; i < N; i++) {
  if (firstFlip[i - 1] !== dest[i - 1]) {
    firstFlip[i - 1] = firstFlip[i - 1] === 0 ? 1 : 0;
    firstFlip[i] = firstFlip[i] === 0 ? 1 : 0;
    firstFlip[i + 1] = firstFlip[i + 1] === 0 ? 1 : 0;

    flipCnt++;
  }

  if (firstNoFlip[i - 1] !== dest[i - 1]) {
    firstNoFlip[i - 1] = firstNoFlip[i - 1] === 0 ? 1 : 0;
    firstNoFlip[i] = firstNoFlip[i] === 0 ? 1 : 0;
    firstNoFlip[i + 1] = firstNoFlip[i + 1] === 0 ? 1 : 0;

    noFlipCnt++;
  }
}

let flipCk = true;
let noFlikCk = true;

for (let i = 0; i < N; i++) {
  if (firstFlip[i] !== dest[i]) {
    flipCk = false;
  }

  if (firstNoFlip[i] !== dest[i]) {
    noFlikCk = false;
  }
}

if (!flipCk && !noFlikCk) {
  console.log(-1);
} else if (flipCk && !noFlikCk) {
  console.log(flipCnt);
} else if (!flipCk && noFlikCk) {
  console.log(noFlipCnt);
} else {
  console.log(Math.min(flipCnt, noFlipCnt));
}