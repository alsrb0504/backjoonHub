const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const arr = Array.from({ length: 101 }, () => new Array(101).fill(""));
let answer = 0;

input.slice(0, 4).forEach((line) => {
  const [x1, y1, x2, y2] = line.split(" ").map(Number);

  for (let i = y1; i < y2; i++) {
    for (let j = x1; j < x2; j++) {
      arr[i][j] = true;
    }
  }
});

for (let i = 1; i <= 100; i++) {
  for (let j = 1; j <= 100; j++) {
    if (arr[i][j]) answer++;
  }
}

console.log(answer);
