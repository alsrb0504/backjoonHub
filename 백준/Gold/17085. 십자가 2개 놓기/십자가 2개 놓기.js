const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((line) => line.trimEnd().split(""));
const visited = Array.from({ length: N }, () => new Array(M).fill(false));

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === ".") visited[i][j] = true;
  }
}

let max = Math.min(N, M);

solution(max);
console.log(answer);

function solution(max) {
  let curSize = Math.floor(max / 2);

  while (curSize >= 0) {
    for (let i = curSize; i < N - curSize; i++) {
      for (let j = curSize; j < M - curSize; j++) {
        if (findCross(i, j, curSize)) {
          checkCross(i, j, curSize);
          // 배열 형식으로 리턴받자.
          const result = findOne(curSize);

            result.forEach((val) => {
            const calced = (val * 4 + 1) * (curSize * 4 + 1);
            answer = Math.max(answer, calced);
          });

          unCheckCross(i, j, curSize);
        }
      }
    }
    curSize -= 1;
  }
}

function findOne(size) {
  // 하나 찾고
  // 찾았다면 하나더 찾는
  const set = new Set();

  while (size >= 0) {
    for (let i = size; i < N - size; i++) {
      for (let j = size; j < M - size; j++) {
        if (findCross(i, j, size)) {
          set.add(size);
        }
      }
    }

    size--;
  }

  return [...set];
}

function findCross(y, x, size) {
  for (let i = y - size; i <= y + size; i++) {
    if (map[i][x] === "." || visited[i][x]) return false;
  }

  for (let i = x - size; i <= x + size; i++) {
    if (map[y][i] === "." || visited[y][i]) return false;
  }

  return true;
}

function checkCross(y, x, size) {
  for (let i = y - size; i <= y + size; i++) {
    visited[i][x] = true;
  }

  for (let i = x - size; i <= x + size; i++) {
    visited[y][i] = true;
  }
}

function unCheckCross(y, x, size) {
  for (let i = y - size; i <= y + size; i++) {
    visited[i][x] = false;
  }

  for (let i = x - size; i <= x + size; i++) {
    visited[y][i] = false;
  }
}
