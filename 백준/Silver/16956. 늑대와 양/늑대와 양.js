const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [y, x] = input[0].split(" ").map(Number);
const map = input.slice(1, y + 1).map((line) => line.trimEnd().split(""));

const dy = [0, 0, -1, 1];
const dx = [-1, 1, 0, 0];

const sheeps = [];

for (let i = 0; i < y; i++) {
  for (let j = 0; j < x; j++) {
    if (map[i][j] === "S") {
      sheeps.push([i, j]);
    }
  }
}

for (let i = 0; i < sheeps.length; i++) {
  const [cy, cx] = sheeps[i];

  for (let j = 0; j < 4; j++) {
    const ny = cy + dy[j];
    const nx = cx + dx[j];

    if (ny < 0 || ny >= y || nx < 0 || nx >= x) continue;

    if (map[ny][nx] === "W") {
      isPossible = false;
      console.log(0);
      return;
    }

    if (map[ny][nx] === ".") map[ny][nx] = "D";
  }
}

let answer = "1\n";

map.forEach((line) => {
  answer += line.join("") + "\n";
});

console.log(answer.trimEnd());
