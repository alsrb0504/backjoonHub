const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

function solution(line) {
  const nums = line.split(" ").map(Number);
  const H = nums[0];
  const accMap = Array.from({ length: H }, () => []);

  let curHeight = 0;
  let cnt = 0;
  let result = -Infinity;

  let lineAcc = 0;
  for (let i = 1; i <= nums.length && curHeight < H; i++) {
    lineAcc += nums[i];
    accMap[curHeight].push(lineAcc);
    cnt++;

    if (cnt === (curHeight + 1) * 2 - 1) {
      curHeight++;
      cnt = 0;
      lineAcc = 0;
    }
  }

  // console.table(accMap);

  // for (let i = 1; i <= H; i++) {
  //   result = Math.max(result, getUpTri(i));
  //   result = Math.max(result, getDownTri(i));
  // }

  getDownTri();
  getUpTri();

  // console.log(result);
  return result;

  function getDownTri() {
    // 삼각형의 꼭짓점을 먼저 찾고
    for (let i = H - 1; i > 0; i--) {
      for (let j = 1; j < accMap[i].length; j += 2) {
        // console.log(`[y, x] = [${i}, ${j}]`);

        let preSum = 0;

        for (let k = i; k > 0; k--) {
          //
          // console.log(`다음 높이 = ${k}`);

          // let start = j - (i - k) * 2;
          let start = j - (i - k) * 2;

          if (start < 0) continue;
          if (j >= accMap[k].length) continue;

          // console.log(`start = ${start}`);

          // preSum += accMap[k][j] - accMap[k][start];
          preSum += accMap[k][j] - accMap[k][start - 1];

          // console.log(`preSum = ${preSum}`);
          result = Math.max(result, preSum);
        }

        // console.log();
      }
    }
  }

  function getUpTri() {
    // 삼각형의 꼭짓점을 먼저 찾고
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < accMap[i].length; j += 2) {
        // console.log(`[y, x] = [${i}, ${j}]`);

        let preSum = 0;

        for (let k = i; k < H; k++) {
          //
          // console.log(`다음 높이 = ${k}`);

          preSum += accMap[k][j + (k - i) * 2];

          if (j > 0) {
            preSum -= accMap[k][j - 1];
          }

          // console.log(`preSum = ${preSum}`);

          result = Math.max(result, preSum);
        }

        // console.log();
      }
    }
  }
}

let answer = "";
let idx = 0;
while (input[idx][0] !== "0") {
  answer += `${idx + 1}. ${solution(input[idx])}\n`;
  idx++;
}

console.log(answer.trimEnd());