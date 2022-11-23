const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const coins = [500, 100, 50, 10, 5, 1];
const N = Number(input[0]);

let rest = 1000 - N;
let answer = 0;

coins.forEach((coin) => {
  if (rest >= coin) {
    const needed = Math.floor(rest / coin);
    rest -= needed * coin;
    answer += needed;
  }
});

console.log(answer);
