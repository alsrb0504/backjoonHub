const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let t1 = input[0].trimEnd().split("").map(Number);
let t2 = input[1].trimEnd().split("").map(Number);
let t3 = input[2].trimEnd().split("").map(Number);
let t4 = input[3].trimEnd().split("").map(Number);
const N = Number(input[4]);
let answer = 0;

input.slice(5, 5 + N).forEach((data) => {
  const [num, dir] = data.split(" ").map(Number);
  Solution(num, dir);
});

if (t1[0] === 1) answer += 1;
if (t2[0] === 1) answer += 2;
if (t3[0] === 1) answer += 4;
if (t4[0] === 1) answer += 8;

console.log(answer);

function Solution(pos, dir) {
  const rev_dir = dir === 1 ? -1 : 1;

  switch (pos) {
    case 1: {
      if (t1[2] !== t2[6]) {
        // 연쇄로 t2 돌림
        RotateChain(2, rev_dir, 1);
      }
      // t1 돌리고
      Rotate(t1, dir);
      break;
    }
    case 2: {
      if (t1[2] !== t2[6]) {
        // 연쇄로 t1 돌림
        Rotate(t1, rev_dir);
      }
      if (t2[2] !== t3[6]) {
        // 연쇄로 t3 돌림
        RotateChain(3, rev_dir, 2);
      }
      // t2 회전
      Rotate(t2, dir);
      break;
    }
    case 3: {
      if (t2[2] !== t3[6]) {
        // 연쇄로 t2 돌림
        RotateChain(2, rev_dir, 3);
      }
      if (t3[2] !== t4[6]) {
        // 연쇄로 t4 돌림
        Rotate(t4, rev_dir);
      }
      // t3 회전
      Rotate(t3, dir);
      break;
    }
    case 4: {
      if (t3[2] !== t4[6]) {
        // 연쇄로 t3 돌림
        RotateChain(3, rev_dir, 4);
      }
      // t4 회전
      Rotate(t4, dir);
      break;
    }
    default:
      break;
  }
}

function Rotate(t_arr, dir) {
  if (dir === -1) {
    const tmp = t_arr[0];
    for (let i = 0; i <= 6; i++) t_arr[i] = t_arr[i + 1];
    t_arr[7] = tmp;
  } else {
    const tmp = t_arr[7];
    for (let i = 7; i >= 1; i--) t_arr[i] = t_arr[i - 1];
    t_arr[0] = tmp;
  }
}

function RotateChain(pos, dir, prev) {
  const rev_dir = dir === 1 ? -1 : 1;

  if (pos === 2) {
    // 3에서 와서 1만 비교
    if (prev === 3) {
      if (t1[2] !== t2[6]) {
        Rotate(t1, rev_dir);
      }
    }

    if (prev === 1) {
      if (t2[2] !== t3[6]) {
        RotateChain(3, rev_dir, 2);
      }
    }

    Rotate(t2, dir);
  }

  if (pos === 3) {
    // 3에서 와서 1만 비교
    if (prev === 2) {
      if (t3[2] !== t4[6]) {
        Rotate(t4, rev_dir);
      }
    }

    if (prev === 4) {
      if (t2[2] !== t3[6]) {
        RotateChain(2, rev_dir, 3);
      }
    }

    Rotate(t3, dir);
  }
}
