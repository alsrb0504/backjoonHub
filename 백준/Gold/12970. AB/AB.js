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
// A가 앞에오는 경우를 가정하고 모든 'A' 와 'B'의 개수 조합을 파악
// N = 5
// ABBBB : 4
// AABBB : 6 (최대 가능한 수)
// AAABB : 6 (최대 가능한 수)
// AAAAB : 4
for (let i = 1; i < N; i++) {
  const a = i;
  const b = N - i;
  const cnt = a * b;

  result.push([a, b, cnt]);

  max = max < cnt ? cnt : max;
}

// 예외 조건
// 최대로 가능한 (A, B) 쌍의 수보다 K가 큰 경우 -1 출력
if (max < K) {
  console.log(-1);
  return;
}

// 예외 조건
// K === 0 일 경우, BB..BA
if (K === 0) {
  let str = "";
  for (let i = 0; i < N - 1; i++) {
    str += "B";
  }
  str += "A";

  console.log(str);
  return;
}

// 이상적인 'A'와 'B'의 개수 조합을 선택
// 처음으로 cnt > K 을 만족하는 경우 선택
for (let i = 0; i < result.length; i++) {
  const [a, b, cnt] = result[i];

  // 따로 조합을 만들지 않아도 바로 구할 수 있는 경우.
  if (cnt === K) {
    let answer = "";
    for (let i = 0; i < a; i++) answer += "A";
    for (let i = 0; i < b; i++) answer += "B";

    console.log(answer);
    return;
  }

  // K를 만족하는 조합을 만들기 위해.
  if (cnt > K) {
    makeString(a, b, K);
    break;
  }
}

// K를 만족하는 조합을 만들기 위한 함수.
function makeString(aCnt, bCnt, totalCnt) {
  let rest = totalCnt;
  let str = "";

  while (rest >= 0 && bCnt !== 0) {
    // 현재 'A' 뒤에 올 수 있는 'B'의 개수에 따라
    // 'A', 'B' 중 어느 것을 현재 선택할지 결정.
    if (rest >= bCnt) {
      str += "A";
      rest -= bCnt;
    } else {
      str += "B";
      bCnt--;
    }

    // 나머지 처리
    // 뒤에 'B'를 붙여줌.
    if (rest === 0 && bCnt > 0) {
      for (let i = 0; i < bCnt; i++) {
        str += "B";
      }
      bCnt = 0;
    }
  }

  console.log(str);
}