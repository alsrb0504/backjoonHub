const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const cond = input[0].trimEnd().split("");
const cond_length = cond.length;
const b1 = input[1].trimEnd().split("");
const b2 = input[2].trimEnd().split("");
const b_length = b1.length;
let answer = 0n;

// console.log(b1);
// console.log(b2);

// [cnt, idx]
const dp1 = Array.from({ length: b_length }, () =>
  new Array(cond_length).fill(0)
);
const dp2 = Array.from({ length: b_length }, () =>
  new Array(cond_length).fill(0)
);

for (let i = 0; i < b_length; i++) {
  if (b1[i] === cond[0]) dp1[i][0] = 1;
  if (b2[i] === cond[0]) dp2[i][0] = 1;
}

for (let i = 1; i < b_length; i++) {
  const b1_ch = b1[i];

  for (let j = 1; j < cond_length; j++) {
    if (b1_ch === cond[j]) {
      let acc = 0;

      for (let k = 0; k < i; k++) {
        //
        acc += dp2[k][j - 1];
      }

      dp1[i][j] = acc;
    }
  }

  const b2_ch = b2[i];

  for (let j = 1; j < cond_length; j++) {
    if (b2_ch === cond[j]) {
      let acc = 0;

      for (let k = 0; k < i; k++) {
        //
        acc += dp1[k][j - 1];
      }

      dp2[i][j] = acc;
    }
  }
}

// console.table(dp1);
// console.table(dp2);

for (let i = 0; i < b_length; i++) {
  answer += BigInt(dp1[i][cond_length - 1]);
  answer += BigInt(dp2[i][cond_length - 1]);
}

console.log(answer.toString());
