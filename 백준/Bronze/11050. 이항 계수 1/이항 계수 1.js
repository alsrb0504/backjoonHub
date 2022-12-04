const readFileSyncAddress = "/dev/stdin";
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [N, R] = input[0].split(" ").map(Number);

const top = fact(N);
const bottom = fact(R) * fact(N - R);

console.log(Math.floor(top / bottom));

function fact(num) {
  let sum = 1;

  while (num > 1) {
    sum *= num;
    num--;
  }

  return sum;
}
