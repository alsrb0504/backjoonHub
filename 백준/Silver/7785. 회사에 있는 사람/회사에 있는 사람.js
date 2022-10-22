const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);
const set = new Set();

for (let i = 1; i <= N; i++) {
  const [name, state] = input[i].trimEnd().split(" ");

  if (state === "enter") set.add(name);
  else set.delete(name);
}

console.table([...set].sort().reverse().join("\n").trimEnd());