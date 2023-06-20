const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const map = new Map();

for (let i = 1; i <= N; i++) {
  const item = input[i].trimEnd();

  map.set(item, map.get(item) ? map.get(item) + 1 : 1);
}

const result = [...map].sort((a, b) => {
  if (a[1] === b[1]) {
    return a > b ? 1 : -1;
  }
  return b[1] - a[1];
});
console.log(result[0][0]);