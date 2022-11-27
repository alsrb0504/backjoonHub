const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const n1 = input[1].trimEnd().split("");
const n2 = input[2].trimEnd().split("");

// // 예외처리
// if (N === 0 || M === 0) {
//   console.log(0);
//   return;
// }

const result_one = oneCalc();
const result_zero = zeroCalc();

// console.log(`result_one = ${result_one}, result_zero = ${result_zero}`);

console.log(
  result_one > result_zero ? result_zero.toString() : result_one.toString()
);

function oneCalc() {
  // 1인 경우
  const n1_pos = [];
  const n2_pos = [];
  let n1_cnt = 0n;
  let n2_cnt = 0n;

  n1.forEach((c, idx) => {
    if (c === "1") n1_pos.push(idx);
  });
  n2.forEach((c, idx) => {
    if (c === "1") n2_pos.push(idx);
  });

  for (let i = 0; i < M; i++) {
    const n1_idx = n1_pos[i];
    const n2_idx = n2_pos[i];

    // const mid = Math.floor((n1_idx + n2_idx) / 2);
    const n1n2 = n1_idx + n2_idx;
    const mid = Math.floor(n1n2 / 2);

    // console.log(`n1_idx = ${n1_idx}, n2_idx = ${n2_idx}`);
    // console.log(`mid = ${mid}`);
    // console.log(`Math.abs(n1_idx - mid) = ${Math.abs(n1_idx - mid)}`);
    // console.log(`Math.abs(n2_idx - mid) = ${Math.abs(n2_idx - mid)}`);

    // console.log();

    // MID가 짝수일 경우는 상관이 없는데
    // 홀수일 경우가 다르네

    const n1_dif = BigInt(Math.abs(n1_idx - mid));
    const n2_dif = BigInt(Math.abs(n2_idx - mid));

    // if (mid % 2 === 0) {
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

  // console.log("one");
  // console.log(sum.toString());
  return sum;
}

function zeroCalc() {
  // 1인 경우
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

    const n1n2 = n1_idx + n2_idx;
    const mid = Math.floor(n1n2 / 2);

    // console.log(`n1_idx = ${n1_idx}, n2_idx = ${n2_idx}`);
    // console.log(`mid = ${mid}`);
    // console.log(`Math.abs(n1_idx - mid) = ${Math.abs(n1_idx - mid)}`);
    // console.log(`Math.abs(n2_idx - mid) = ${Math.abs(n2_idx - mid)}`);

    // console.log();

    const n1_dif = BigInt(Math.abs(n1_idx - mid));
    const n2_dif = BigInt(Math.abs(n2_idx - mid));

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

  // console.log("zero");
  // console.log(sum.toString());
  return sum;
}