const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input[0]);

if (200 <= N && N < 206) {
  console.log(1);
} else if (206 <= N && N < 218) {
  console.log(2);
} else if (218 <= N && N < 229) {
  console.log(3);
} else {
  console.log(4);
}
