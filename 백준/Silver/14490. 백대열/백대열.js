const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const [a, b] = input[0].split(":");

const GCD = gcd(a, b);

console.log(`${a / GCD}:${b / GCD}`);

// 깔끔한 버전
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
