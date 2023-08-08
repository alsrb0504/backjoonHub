const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const data = input[1].split(" ").map(Number);
const dataNum = input[2].split(" ").map(Number);
const M = Number(input[3]);
const pushData = input[4].split(" ").map(Number);
const queueStack = [];

data.forEach((num, idx) => {
  if (num === 0) {
    queueStack.push(dataNum[idx]);
  }
});

const newQueueStack = [...queueStack.reverse(), ...pushData];

console.log(newQueueStack.slice(0, M).join(" "));
