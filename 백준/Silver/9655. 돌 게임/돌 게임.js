const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

let N = Number(input[0]);
let turn = false;

while (N > 0) {
  if (N >= 3) {
    N -= 3;
  } else {
    N -= 1;
  }
  turn = turn ? false : true;
}

console.log(turn ? "SK" : "CY");
