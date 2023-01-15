const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const str = input[0].trimEnd().split("");
const fixed = input[1].split(" ").map(Number);

const Yacht = {
  1: (n1, n2) => {
    return YachtNum(1, n1, n2);
  },
  2: (n1, n2) => {
    return YachtNum(2, n1, n2);
  },
  3: (n1, n2) => {
    return YachtNum(3, n1, n2);
  },
  4: (n1, n2) => {
    return YachtNum(4, n1, n2);
  },
  5: (n1, n2) => {
    return YachtNum(5, n1, n2);
  },
  6: (n1, n2) => {
    return YachtNum(6, n1, n2);
  },
  // 7: 동일한 것 4개.
  7: (n1, n2) => {
    for (let i = 1; i <= 6; i++) {
      let cnt = 0;

      for (let j = 0; j < 3; j++) {
        if (fixed[j] === i) cnt++;
      }
      if (n1 === i) cnt++;
      if (n2 === i) cnt++;

      if (cnt >= 4) {
        return i * 4;
      }
    }

    return 0;
  },
  // 8: 풀 하우스.
  8: (n1, n2) => {
    for (let i = 1; i <= 6; i++) {
      let gt_cnt = 0;

      for (let k = 0; k < 3; k++) {
        if (fixed[k] === i) gt_cnt++;
      }

      if (n1 === i) gt_cnt++;
      if (n2 === i) gt_cnt++;

      if (gt_cnt !== 3) continue;

      // 2개짜리 찾기.
      for (let j = 1; j <= 6; j++) {
        if (i === j) continue;

        let lt_cnt = 0;

        for (let k = 0; k < 3; k++) {
          if (fixed[k] === j) lt_cnt++;
        }

        if (n1 === j) lt_cnt++;
        if (n2 === j) lt_cnt++;

        if (gt_cnt === 3 && lt_cnt === 2) {
          return i * 3 + j * 2;
        }
      }
    }

    return 0;
  },
  9: (n1, n2) => {
    const cards = [...fixed, n1, n2].sort((a, b) => a - b);

    if (
      cards[0] === 1 &&
      cards[1] === 2 &&
      cards[2] === 3 &&
      cards[3] === 4 &&
      cards[4] === 5
    )
      return 30;

    return 0;
  },
  10: (n1, n2) => {
    const cards = [...fixed, n1, n2].sort((a, b) => a - b);

    if (
      cards[0] === 2 &&
      cards[1] === 3 &&
      cards[2] === 4 &&
      cards[3] === 5 &&
      cards[4] === 6
    )
      return 30;

    return 0;
  },
  11: (n1, n2) => {
    if (
      fixed[0] === fixed[1] &&
      fixed[1] === fixed[2] &&
      fixed[2] === n1 &&
      n1 === n2
    )
      return 50;

    return 0;
  },
  12: (n1, n2) => {
    return n1 + n2 + fixed[0] + fixed[1] + fixed[2];
  },
};

function CheckNum(cond, num) {
  if (cond === num) return true;
  return false;
}

function YachtNum(cond, n1, n2) {
  let cnt = 0;

  for (let i = 0; i < 3; i++) {
    if (CheckNum(cond, fixed[i])) cnt++;
  }
  if (CheckNum(cond, n1)) cnt++;
  if (CheckNum(cond, n2)) cnt++;

  return cnt * cond;
}

let answer = 0;

for (let i = 0; i < 12; i++) {
  if (str[i] === "Y") {
    for (let x = 1; x <= 6; x++) {
      for (let y = 1; y <= 6; y++) {
        answer = Math.max(answer, Yacht[i + 1](x, y));
      }
    }
  }
}

console.log(answer);