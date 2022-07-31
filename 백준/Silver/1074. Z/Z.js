const { exit } = require("process");

const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split(" ");

const [N, r, c] = input;
let cnt = 0;

const endY = Number(r);
const endX = Number(c);

solution(0, 0, Math.pow(2, N), 0);

function solution(y, x, length, accCnt) {
  if (y === endY && x === endX) {
    console.log(accCnt);
    exit(0);
  }

  // 4등분 하고 순서대로 하면 되내
  if (length === 2) {
    let endFlag = false;

    // console.log(y, x, length);
    // console.log(y, x);
    // console.log(y, x + 1);
    // console.log(y + 1, x);
    // console.log(y + 1, x + 1);
    let finalCnt = accCnt;

    if (y === endY && x === endX) {
      endFlag = true;
    } else if (y === endY && x + 1 === endX) {
      endFlag = true;
      finalCnt = accCnt + 1;
    } else if (y + 1 === endY && x === endX) {
      endFlag = true;
      finalCnt = accCnt + 2;
    } else if (y + 1 === endY && x + 1 === endX) {
      endFlag = true;
      finalCnt = accCnt + 3;
    }

    if (endFlag) {
      console.log(finalCnt);
      exit(0);
    }

    // cnt += 4;
    return;
  }

  let half = length / 2;

  // console.log(y, x, length, half, accCnt);
  //
  if (endY < y + half && endX < x + half) {
    // console.log(1);
    solution(y, x, half, accCnt);
  }
  if (endY < y + half && endX >= x + half) {
    // console.log(2);

    solution(y, x + half, half, accCnt + half * half);
  } else if (endY >= y + half && endX < x + half) {
    // console.log(3);

    solution(y + half, x, half, accCnt + half * half * 2);
  } else {
    // console.log(4);

    solution(y + half, x + half, half, accCnt + half * half * 3);
  }
}
