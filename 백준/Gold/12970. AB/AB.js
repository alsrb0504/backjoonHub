const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [N, K] = input;

const result = [];
let max = 0;
// 적어도 'A', 'B' 가 하나씩은 포함.
for (let i = 1; i < N; i++) {
  const a = i;
  const b = N - i;
  const cnt = a * b;

  result.push([a, b, cnt]);

  max = max < cnt ? cnt : max;
}

// 예외 조건
if (max < K) {
  console.log(-1);
  return;
}

// console.table(result);

if (K === 0) {
  let str = "";
  for (let i = 0; i < N - 1; i++) {
    str += "B";
  }
  str += "A";

  console.log(str);
  return;
}

for (let i = 0; i < result.length; i++) {
  const [a, b, cnt] = result[i];

  if (cnt === K) {
    let answer = "";

    for (let i = 0; i < a; i++) answer += "A";
    for (let i = 0; i < b; i++) answer += "B";
    console.log(answer);

    return;
  }

  // console.log(a, b, cnt);

  if (cnt > K) {
    // console.log("hi");

    makeString(a, b, K);

    break;
  }
}

function makeString(aCnt, bCnt, totalCnt) {
  let rest = totalCnt;

  let str = "";

  while (rest >= 0 && bCnt !== 0) {
    if (rest >= bCnt) {
      str += "A";
      rest -= bCnt;
    } else {
      str += "B";
      bCnt--;
    }

    if (rest === 0 && bCnt > 0) {
      for (let i = 0; i < bCnt; i++) {
        str += "B";
      }
      bCnt = 0;
    }
  }
  +console.log(str);
}