const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const set = new Set();
const map = [];
const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

for (let i = 0; i < 5; i++) {
  map.push(input[i].trimEnd().split(" "));
}

function solution(cnt, y, x, nums) {
  if (cnt === 6) {
    set.add(nums);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || ny > 4 || nx < 0 || nx > 4) continue;

    solution(cnt + 1, ny, nx, nums + map[ny][nx]);
  }
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    solution(1, i, j, map[i][j]);
  }
}

console.log(set.size);