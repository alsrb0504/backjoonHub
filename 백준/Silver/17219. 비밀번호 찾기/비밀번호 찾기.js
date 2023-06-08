const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [N, _] = input[0].split(" ").map(Number);
const map = new Map();
const answer = [];

input.slice(1, 1 + N).forEach((info) => {
  const [key, val] = info.trimEnd().split(" ");

  map.set(key, val);
});

input.slice(N + 1).forEach((site) => {
  answer.push(map.get(site.trimEnd()));
});

console.log(answer.join("\n"));
