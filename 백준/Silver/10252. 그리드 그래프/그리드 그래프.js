const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const tc = Number(input[0]);
const answer = [];

for (let i = 0; i < tc; i++) {
  answer.push(solution(i + 1));
}
console.log(answer.join("\n"));

function solution(line) {
  const [H, W] = input[line].split(" ").map(Number);
  const result = ["1"];

  if (H % 2 === 0) {
    let isReverse = false;

    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        if (isReverse) result.push(`(${i},${W - 1 - j})`);
        else result.push(`(${i},${j})`);
      }

      isReverse = !isReverse;
    }
  } else if (W % 2 === 0) {
    let isReverse = false;

    for (let i = 0; i < W; i++) {
      for (let j = 0; j < H; j++) {
        if (isReverse) result.push(`(${H - 1 - j},${i})`);
        else result.push(`(${j},${i})`);
      }

      isReverse = !isReverse;
    }
  }
  // 가로/세로 모두 홀수
  else {
    for (let i = 0; i < W; i++) {
      result.push(`(0,${i})`);
    }

    let isReverse = true;
    for (let i = W - 1; i >= 0; i--) {
      for (let j = 0; j < H - 1; j++) {
        if (isReverse) result.push(`(${H - 1 - j},${i})`);
        else result.push(`(${j + 1},${i})`);
      }

      isReverse = !isReverse;
    }
  }

  return result.join("\n");
}
