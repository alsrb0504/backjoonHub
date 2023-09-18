const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const map = new Map();
const files = input.slice(1, 1 + N).map((el) => el.trimEnd());

for (const file of files) {
  const [_, key] = file.split(".");
  map.set(key, map.has(key) ? map.get(key) + 1 : 1);
}

const arr = [...map].sort((a, b) => (a > b ? 1 : -1));
const answer = [];

for (const [key, idx] of arr) {
  answer.push(`${key} ${idx}`);
}

console.log(answer.join("\n"));
