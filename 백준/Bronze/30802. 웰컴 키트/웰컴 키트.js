const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("\n");

const N = +input[0];
const sizes = input[1].split(" ").map(Number);
const [T, P] = input[2].split(" ").map(Number);

const tAnswer = sizes.reduce((acc, curr) => acc + Math.ceil(curr / T), 0);
const pAnswer = Math.floor(N / P);
const pRest = N % P;

console.log(tAnswer + "\n" + pAnswer + " " + pRest);
