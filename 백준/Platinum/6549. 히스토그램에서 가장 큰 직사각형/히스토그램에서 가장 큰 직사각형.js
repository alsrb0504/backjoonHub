const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

function solution(n) {
  const N = Number(input[n].split(" ")[0]);
  const hs = input[n]
    .split(" ")
    .map(BigInt)
    .filter((_, idx) => idx !== 0);

  // [idx, height]
  const st = [];

  let answer = 0;

  for (let idx = 0; idx < N; idx++) {
    const curHei = hs[idx];

    while (st.length && st[st.length - 1][1] > curHei) {
      const [_, topHei] = st.pop();
      let wid = 0;

      if (st.length === 0) {
        wid = BigInt(idx);
      } else {
        const peekIdx = st[st.length - 1][0];
        wid = BigInt(idx - peekIdx - 1);
      }

      const calc = wid * topHei;
      answer = answer > calc ? answer : calc;
    }

    st.push([idx, curHei]);
  }

  while (st.length > 0) {
    const [topIdx, topHei] = st.pop();

    let wid = 0;

    // 마지막 경우 : 가장 높이가 낮은 사각형의 경우
    // 전체 길이 * H
    if (st.length === 0) {
      wid = BigInt(N);
    } else {
      const peekIdx = st[st.length - 1][0];
      wid = BigInt(N - peekIdx - 1);
    }

    const calc = wid * topHei;
    answer = answer > calc ? answer : calc;
  }

  return answer.toString();
}

let result = "";
let line = 0;
while (true) {
  const flag = Number(input[line][0]);

  if (flag === 0) break;

  result += solution(line++) + "\n";
}

console.log(result.trimEnd());
