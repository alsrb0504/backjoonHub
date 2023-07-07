const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const gradeTable = {
  "A+": 4.5,
  A0: 4,
  "B+": 3.5,
  B0: 3,
  "C+": 2.5,
  C0: 2,
  "D+": 1.5,
  D0: 1,
  F: 0,
  P: 0,
};

let totalScore = 0;
let totalCredit = 0;

for (let i = 0; i < 20; i++) {
  const [_, credit, score] = input[i].trimEnd().split(" ");

  if (score === "P") continue;

  totalScore += Number(credit) * gradeTable[score];
  totalCredit += Number(credit);
}

console.log(totalScore / totalCredit);
