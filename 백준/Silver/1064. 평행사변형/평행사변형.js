const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [x1, y1, x2, y2, x3, y3] = input[0].split(" ").map(Number);
const nums = input[0].split(" ").map(Number);
const lines = [];

if (validateGradient(...nums)) {
  console.log(-1);
  return;
}

lines.push(calcDist(x1, y1, x2, y2));
lines.push(calcDist(x1, y1, x3, y3));
lines.push(calcDist(x2, y2, x3, y3));
lines.sort((a, b) => a - b);

const max = lines[2] * 2 + lines[1] * 2;
const min = lines[0] * 2 + lines[1] * 2;

console.log(max - min);

function calcDist(x1, y1, x2, y2) {
  return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);
}

function validateGradient(x1, y1, x2, y2, x3, y3) {
  if (x1 === x2 && x2 === x3) return true;
  if (y1 === y2 && y2 === y3) return true;

  return (x1 - x2) * (y2 - y3) === (y1 - y2) * (x2 - x3);
}
