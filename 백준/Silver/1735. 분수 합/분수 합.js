const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [aChild, aParent] = input[0].split(" ").map(Number);
const [bChild, bParent] = input[1].split(" ").map(Number);

let answerChild = aChild * bParent + bChild * aParent;
let answerParent = aParent * bParent;
const gcdResult = gcd(answerChild, answerParent);

console.log(`${answerChild / gcdResult} ${answerParent / gcdResult}`);

function gcd(n1, n2) {
  // 큰 값
  let a = Math.max(n1, n2);
  // 작은 값
  let b = Math.min(n1, n2);

  while (b !== 0) {
    const tmp = a % b;
    a = b;
    b = tmp;
  }

  return a;
}
