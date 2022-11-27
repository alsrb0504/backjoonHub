const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, _] = input[0].split(" ").map(Number);
const n1 = input[1].trimEnd().split("");
const n2 = input[2].trimEnd().split("");

function solution() {
  const n1_pos = [];
  const n2_pos = [];
  let n1_cnt = 0n;
  let n2_cnt = 0n;

  n1.forEach((c, idx) => {
    if (c === "0") n1_pos.push(idx);
  });
  n2.forEach((c, idx) => {
    if (c === "0") n2_pos.push(idx);
  });

  for (let i = 0; i < N; i++) {
    const n1_idx = n1_pos[i];
    const n2_idx = n2_pos[i];

    // n1 + n2 의 합이 홀수/짝수인지에 따라 +1 값을 작은 부분에 처리해줘야 함.
    const n1n2 = n1_idx + n2_idx;
    const mid = Math.floor(n1n2 / 2);

    const n1_dif = BigInt(Math.abs(n1_idx - mid));
    const n2_dif = BigInt(Math.abs(n2_idx - mid));

    // 홀/짝 구분
    if (n1n2 % 2 === 0) {
      n1_cnt += n1_dif;
      n2_cnt += n2_dif;
    } else {
      const gt = n1_dif > n2_dif ? n1_dif : n2_dif;
      const ls = n1_dif > n2_dif ? n2_dif : n1_dif;

      if (n1_cnt < n2_cnt) {
        n1_cnt += gt;
        n2_cnt += ls;
      } else {
        n1_cnt += ls;
        n2_cnt += gt;
      }
    }
  }

  const sum = n1_cnt * n1_cnt + n2_cnt * n2_cnt;
  return sum;
}

console.log(solution().toString());
