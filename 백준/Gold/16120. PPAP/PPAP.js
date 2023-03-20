const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

let ppap = input[0];
const stack = [];

for (let ch of ppap) {
  if (stack.length < 4) {
    stack.push(ch);
  } else {
    if (stack.slice(stack.length - 3).join("") + ch === "PPAP") {
      stack.pop();
      stack.pop();
      stack.pop();
      stack.push("P");
    } else {
      stack.push(ch);
    }
  }
}

if (
  (stack.length === 4 && stack.join("") === "PPAP") ||
  (stack.length === 1 && stack[0] === "P")
)
  console.log("PPAP");
else console.log("NP");
