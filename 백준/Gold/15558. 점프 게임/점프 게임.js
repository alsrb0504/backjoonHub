const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

function makeKey(y, x, t) {
  return `${y}-${x}-${t}`;
}

const [N, K] = input[0].split(" ").map(Number);
const visited = new Set();

const path = [];
path.push(input[1].trimEnd().split("").map(Number));
path.push(input[2].trimEnd().split("").map(Number));
path[0].unshift(-1);
path[1].unshift(-1);

const q = [{ currX: 1, currY: 0, currT: 0 }];

while (q.length) {
  const { currX, currY, currT } = q.shift();

  const nextX = currX + 1; // 다음칸
  const backX = currX - 1; // 이전칸
  const crossX = currX + K; // 건너편으로 이동할 칸
  const blockX = currT + 1; // 앞으로 없어질 칸

  if (nextX > N || crossX > N) {
    console.log(1);
    return;
  }

  // 앞으로 한 칸 이동 가능
  // 조건 : (다음칸이 1이고 다음초에 사라질 칸이 아니면서 현재 사라진 칸도 아님)
  if (path[currY][nextX] === 1 && blockX !== nextX && nextX !== currT) {
    const key = makeKey(currY, nextX, currT + 1);

    if (!visited.has(key)) {
      visited.add(key);
      q.push({ currX: nextX, currY, currT: currT + 1 });
    }
  }

  // 뒤로 한 칸 이동 가능
  if (path[currY][backX] === 1 && blockX !== backX && backX !== currT) {
    const key = makeKey(currY, backX, currT + 1);

    if (!visited.has(key)) {
      visited.add(key);
      q.push({ currX: backX, currY, currT: currT + 1 });
    }
  }

  // 대각선 건너 이동 가능
  // 앞으로 한 칸 이동 가능
  if (blockX !== crossX) {
    const nextCrossY = currY === 1 ? 0 : 1;

    if (crossX <= N && path[nextCrossY][crossX] === 1) {
      if (crossX !== blockX && crossX !== currT) {
        const key = makeKey(nextCrossY, crossX, currT + 1);

        if (!visited.has(key)) {
          visited.add(key);
          q.push({ currX: crossX, currY: nextCrossY, currT: currT + 1 });
        }
      }
    }
  }
}

console.log(0);
