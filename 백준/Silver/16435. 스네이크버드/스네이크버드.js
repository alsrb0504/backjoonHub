const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const fruits = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let length = M;

fruits.every((fruit) => {
  if (fruit <= length) {
    length++;
    return true;
  } else {
    return false;
  }
});

console.log(length);
