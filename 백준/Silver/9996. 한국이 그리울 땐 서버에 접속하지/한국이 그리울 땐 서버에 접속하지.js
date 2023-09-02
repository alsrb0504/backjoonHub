const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const answer = [];
const N = Number(input[0]);
const strs = input[1].trimEnd().split("*");
const reg = RegExp(`^${strs[0]}[a-z]*${strs[1]}$`);

const pass = "DA";
const fail = "NE";

input.slice(2, 2 + N).forEach((line) => {
  answer.push(!!line.trimEnd().match(reg) ? pass : fail);
});

console.log(answer.join("\n"));
