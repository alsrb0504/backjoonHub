const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const eggs = input
  .slice(1, 1 + N)
  .map((line) => line.trim().split(" ").map(Number));

// 예외
if (N === 1) {
  console.log(0);
  return;
}

const breaked = new Array(N).fill(false);
let answer = 0;

dfs(0);

console.log(answer);

function dfs(handed) {
  // 종료 조건 1 : 마지막 계란을 들고 있었던 경우
  if (handed >= N) {
    checkCnt();
    return;
  }

  // 종료 조건 2 : 깰 것이 없는 경우
  let isPossible = false;
  for (let i = 0; i < N; i++) {
    if (i === handed) continue;
    if (!breaked[i]) {
      isPossible = true;
      break;
    }
  }

  if (!isPossible) {
    checkCnt();
    return;
  }

  for (let i = 0; i < N; i++) {
    if (handed === i) continue;
    if (breaked[i]) continue;

    const target = i;

    // 달걀끼리 친다.
    eggs[handed][0] -= eggs[target][1];
    eggs[target][0] -= eggs[handed][1];

    // 깨짐.
    if (eggs[handed][0] <= 0) breaked[handed] = true;
    if (eggs[target][0] <= 0) breaked[target] = true;

    let next = handed + 1;
    while (next < N) {
      if (!breaked[next]) {
        break;
      }

      next++;
    }

    dfs(next);

    // 복구
    eggs[handed][0] += eggs[target][1];
    eggs[target][0] += eggs[handed][1];

    // 깨짐 복구.
    breaked[handed] = false;
    breaked[target] = false;
  }
}

function checkCnt() {
  let cnt = 0;

  breaked.forEach((result) => {
    if (result) cnt++;
  });

  answer = Math.max(answer, cnt);
}
