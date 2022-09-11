const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [C, P] = input[0].split(" ").map(Number);
const heights = input[1].split(" ").map(Number);

let answer = 0;

switch (P) {
  case 1: {
    // 1. 2가지 경우 존재
    // 1-1. 세로 1*4
    answer += C;

    // 1-2. 가로 4*1
    for (let i = 0; i < C - 3; i++) {
      const h0 = heights[i];
      const h1 = heights[i + 1];
      const h2 = heights[i + 2];
      const h3 = heights[i + 3];

      if (h0 === h1 && h0 === h2 && h0 === h3) answer++;
    }
    break;
  }
  case 2: {
    // 2. 1가지 경우 2*2
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, 0, 0)) answer++;
    }
    break;
  }
  case 3: {
    // 3. 2가지 경우
    // 3-1. 가로
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 0, -1)) answer++;
    }

    // 3-2. 세로
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, 1)) answer++;
    }
    break;
  }
  case 4: {
    // 4. 2가지 경우
    // 4-1. 가로
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 1, 1)) answer++;
    }

    // 4-2. 세로
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, -1)) answer++;
    }
    break;
  }
  case 5: {
    // 5. 4가지 경우
    // 5-1. 위
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 0, 0)) answer++;
    }

    // 5-2. 우
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, -1)) answer++;
    }

    // 5-1. 아래
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 1, 0)) answer++;
    }

    // 5-2. 왼
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, 1)) answer++;
    }
    break;
  }
  case 6: {
    // 6. 4가지 경우
    // 6-1. 기본
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 0, 0)) answer++;
    }

    // 6-2. 90
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, 0)) answer++;
    }

    // 6-1. 180
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, -1, -1)) answer++;
    }

    // 6-2. 270
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, 2)) answer++;
    }
    break;
  }
  case 7: {
    // 7. 4가지 경우
    // 7-1. 기본
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 0, 0)) answer++;
    }

    // 7-2. 90
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, -2)) answer++;
    }

    // 7-1. 180
    for (let i = 0; i < C - 2; i++) {
      if (checkThree(i, 0, 1)) answer++;
    }

    // 7-2. 270
    for (let i = 0; i < C - 1; i++) {
      if (checkTwo(i, 0)) answer++;
    }
    break;
  }
  default:
    break;
}

function checkTwo(idx, n1) {
  const h0 = heights[idx];
  const h1 = heights[idx + 1];

  if (h0 === h1 + n1) return true;
  return false;
}

function checkThree(idx, n1, n2) {
  const h0 = heights[idx];
  const h1 = heights[idx + 1];
  const h2 = heights[idx + 2];

  if (h0 === h1 + n1 && h0 === h2 + n2) return true;
  return false;
}

console.log(answer);