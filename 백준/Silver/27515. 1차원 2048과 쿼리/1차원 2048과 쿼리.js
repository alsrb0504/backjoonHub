const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = [];

const SIZE = 64;
const exp = new Array(SIZE).fill(0);

for (let i = 1; i <= N; i++) {
  const oper = input[i][0];
  const num = BigInt(input[i].slice(1));

  if (oper === "+") {
    exp[GetExponent(num)]++;
  } else {
    exp[GetExponent(num)]--;
  }

  answer.push(CalcMax().toString());
}

console.log(answer.join("\n"));

function GetExponent(num) {
  let cnt = 0;

  while (num > 0n) {
    num = num / 2n;
    cnt++;
  }

  return cnt - 1;
}

function CalcMax() {
  const copyExp = [...exp];

  for (let i = 0; i < SIZE - 1; i++) {
    if (copyExp[i] >= 2) {
      copyExp[i + 1] += Math.floor(copyExp[i] / 2);
    }
  }

  for (let i = SIZE; i >= 0; i--) {
    if (copyExp[i] > 0) {
      return 2n ** BigInt(i);
    }
  }

  return 0n;
}
