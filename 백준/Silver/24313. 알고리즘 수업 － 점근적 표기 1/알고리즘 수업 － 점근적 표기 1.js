const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [a1, a0] = input[0].split(" ").map(Number);
const c = Number(input[1]);
const n0 = Number(input[2]);

if (a1 * n0 + a0 <= c * n0 && a1 <= c) console.log(1);
else console.log(0);
