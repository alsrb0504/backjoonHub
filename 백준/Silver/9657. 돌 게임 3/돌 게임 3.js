const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);

if (N % 7 === 2 || N % 7 === 0) console.log("CY");
else console.log("SK");
