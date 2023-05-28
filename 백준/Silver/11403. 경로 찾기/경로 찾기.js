const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
const answer = [];

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1 || (map[i][k] === 1 && map[k][j] === 1))
        map[i][j] = 1;
    }
  }
}

map.forEach((line) => {
  answer.push(line.join(" "));
});

console.log(answer.join("\n"));