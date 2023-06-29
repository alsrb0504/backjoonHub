const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [a, b] = input[0].split(" ");
const diff = b.length - a.length;
let min = Infinity;

for (let i = 0; i <= diff; i++) {
  let count = 0;

  for (let j = 0; j < a.length; j++) {
    if (a[j] !== b[j + i]) count++;
  }

  min = Math.min(min, count);
}

console.log(min);
