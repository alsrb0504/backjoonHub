const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M, H] = input[0].split(" ").map(Number);
const ladder = Array.from({ length: H }, () => new Array(N).fill(false));

const empty = [];
let answer = 0;

for (let i = 1; i <= M; i++) {
  const [pos, floor] = input[i].split(" ").map((el) => Number(el) - 1);

  ladder[pos][floor] = true;
}

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N - 1; j++) {
    if (!ladder[i][j]) empty.push([i, j]);
  }
}

let isPossible = false;

while (answer < 4) {
  isPossible = false;

  dfs(0, answer);

  if (isPossible) {
    console.log(answer);
    return;
  }

  answer++;
}

console.log(-1);

function dfs(cnt, max) {
  if (isPossible) return;
  //
  if (cnt === max) {
    isPossible = checkCondition();
    return;
  }

  for (let i = 0; i < empty.length; i++) {
    const [y, x] = empty[i];

    if (ladder[y][x]) continue;

    // 양 옆에 이미 사다리가 있는지 확인
    if (x - 1 >= 0 && ladder[y][x - 1]) continue;
    if (x + 1 < N - 1 && ladder[y][x + 1]) continue;

    ladder[y][x] = true;
    dfs(cnt + 1, max);
    ladder[y][x] = false;
  }
}

function checkCondition() {
  for (let i = 0; i < N; i++) {
    let cur = i;

    for (let j = 0; j < H; j++) {
      // 다음으로 이동
      if (ladder[j][cur]) {
        cur++;
      }
      // 이전으로 이동
      else if (cur - 1 >= 0 && ladder[j][cur - 1]) {
        cur--;
      }
    }

    if (cur !== i) return false;
  }

  return true;
}
