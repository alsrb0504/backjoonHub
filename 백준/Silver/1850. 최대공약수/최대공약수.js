const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [A, B] = input[0].split(" ").map(BigInt);

const GCD = A > B ? gcd(A, B) : gcd(B, A);

console.log("1".repeat(Number(GCD)));

function gcd(a, b) {
  return b === 0n ? a : gcd(b, a % b);
}
