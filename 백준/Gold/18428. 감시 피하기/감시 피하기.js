const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((el) => el.trimEnd().split(" "));

const teachers = [];
const spaces = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (map[y][x] === "T") teachers.push([y, x]);
    if (map[y][x] === "X") spaces.push([y, x]);
  }
}

console.log(dfs(0, 0) ? "YES" : "NO");

function isPossible() {
  for (let i = 0; i < teachers.length; i++) {
    const [startY, startX] = teachers[i];

    // 상하좌우 탐색
    for (let y = startY - 1; y >= 0; y--) {
      if (map[y][startX] === "O") break;
      if (map[y][startX] === "S") return false;
    }

    for (let y = startY + 1; y < N; y++) {
      if (map[y][startX] === "O") break;
      if (map[y][startX] === "S") return false;
    }

    for (let x = startX - 1; x >= 0; x--) {
      if (map[startY][x] === "O") break;
      if (map[startY][x] === "S") return false;
    }

    for (let x = startX + 1; x < N; x++) {
      if (map[startY][x] === "O") break;
      if (map[startY][x] === "S") return false;
    }
  }

  return true;
}

function dfs(cnt, start) {
  if (cnt === 3) {
    if (isPossible()) return true;

    return false;
  }

  for (let i = start; i < spaces.length; i++) {
    const [y, x] = spaces[i];
    map[y][x] = "O";
    if (dfs(cnt + 1, i + 1)) return true;
    map[y][x] = "X";
  }

  return false;
}