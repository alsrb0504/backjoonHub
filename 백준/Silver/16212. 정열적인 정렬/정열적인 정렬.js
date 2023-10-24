const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const data = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

console.log(data.join(" "));
