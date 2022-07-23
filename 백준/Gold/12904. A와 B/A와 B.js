const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

let start = input[0].trimEnd();
let dest = input[1].split("");

for (let i = dest.length - 1; i >= 0; i--) {
  if (start === dest.join("")) {
    console.log(1);
    return;
  }

  const cur = dest.pop();

  if (cur === "A") {
    if (dest.length === start) {
    }
  } else {
    dest = dest.reverse();
  }
}
console.log(0);