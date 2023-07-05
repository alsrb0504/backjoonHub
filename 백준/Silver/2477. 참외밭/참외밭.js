const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const dirMap = new Map();

const info = input.slice(1, 1 + 6).map((el) => {
  return el.split(" ").map(Number);
});

// 빠르게 작은 부분을 찾기 위해
info.push(info[0]);
info.push(info[1]);

let minLength = [];

for (let i = 0; i < 6; i++) {
  const [dir, val] = info[i];

  if (dir === info[i + 2][0]) {
    minLength.push(info[i + 1][1]);
  }

  if (dirMap.has(dir)) {
    dirMap.set(dir, [...dirMap.get(dir), val]);
  } else {
    dirMap.set(dir, [val]);
  }
}

const arr = [...dirMap];
arr.sort((a, b) => a[0] - b[0]);

const maxWidth = Math.max.apply(null, [...arr[0][1], ...arr[1][1]]);
const maxHeight = Math.max.apply(null, [...arr[2][1], ...arr[3][1]]);

console.log((maxWidth * maxHeight - minLength[0] * minLength[1]) * N);
