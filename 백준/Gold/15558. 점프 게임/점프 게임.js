const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const path = [];

const visited = new Set();

path.push(input[1].trimEnd().split("").map(Number));
path.push(input[2].trimEnd().split("").map(Number));
path[0].unshift(-1);
path[1].unshift(-1);

// const q = new Queue();
// q.enqueue({ currX: 1, currY: 0, currT: 0 });
const q = [{ currX: 1, currY: 0, currT: 0 }];

while (q.length) {
  const { currX, currY, currT } = q.shift();

  // const { currX, currY, currT } = q.dequeue();

  // console.log(currX, currY, currT);

  const nextX = currX + 1;
  const backX = currX - 1;
  const crossX = currX + K;
  // const blockX = currT;
  const blockX = currT + 1; // 앞으로 없어질 칸

  // 앞으로 한 칸 이동 가능
  if (path[currY][nextX] === 1 && blockX !== nextX && nextX !== currT) {
    // 종료
    if (nextX > N) {
      console.log(1);
      return;
    }

    const key = makeKey(currY, nextX, currT + 1);

    if (!visited.has(key)) {
      visited.add(key);
      q.push({ currX: nextX, currY, currT: currT + 1 });
      // q.enqueue({ currX: nextX, currY, currT: currT + 1 });
    }
  }

  // 뒤로 한 칸 이동 가능
  if (path[currY][backX] === 1 && blockX !== backX && backX !== currT) {
    // q.push({ currX: backX, currY, currT: currT + 1 });

    const key = makeKey(currY, backX, currT + 1);

    if (!visited.has(key)) {
      visited.add(key);
      // q.enqueue({ currX: backX, currY, currT: currT + 1 });
      q.push({ currX: backX, currY, currT: currT + 1 });
    }
  }

  // 대각선 건너 이동 가능
  // 앞으로 한 칸 이동 가능
  if (blockX !== crossX) {
    const nextCrossY = currY === 1 ? 0 : 1;

    // 종료
    if (crossX > N) {
      console.log(1);

      return;
    }

    if (crossX <= N && path[nextCrossY][crossX] === 1) {
      if (crossX !== blockX && crossX !== currT) {
        const key = makeKey(nextCrossY, crossX, currT + 1);

        if (!visited.has(key)) {
          visited.add(key);
          q.push({ currX: crossX, currY: nextCrossY, currT: currT + 1 });
          // q.enqueue({ currX: crossX, currY: nextCrossY, currT: currT + 1 });
        }
      }
    }
  }
}

function makeKey(y, x, t) {
  return `${y}-${x}-${t}`;
}

console.log(0);
