const { exit } = require("process");
const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split(" ");

const [N, r, c] = input;
const endY = Number(r);
const endX = Number(c);

solution(0, 0, Math.pow(2, N), 0);

function solution(y, x, length, accCnt) {
  // 예외 처리 : 현재 위치가 정확히 찾는 위치일 경우
  if (y === endY && x === endX) {
    console.log(accCnt);
    exit(0);
  }

  if (length === 2) {
    let endFlag = false;
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

    // 종료 조건 : 찾았다면 종료.
    if (endFlag) {
      console.log(finalCnt);
      exit(0);
    }

    return;
  }

  let half = length / 2;

  if (endY < y + half && endX < x + half) {
    solution(y, x, half, accCnt);
  }
  if (endY < y + half && endX >= x + half) {
    const nextCnt = accCnt + half * half;
    solution(y, x + half, half, nextCnt);
  } else if (endY >= y + half && endX < x + half) {
    const nextCnt = accCnt + half * half * 2;
    solution(y + half, x, half, nextCnt);
  } else {
    const nextCnt = accCnt + half * half * 3;
    solution(y + half, x + half, half, nextCnt);
  }
}
