const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const nums = input[1].split(" ").map(Number);
const std = nums.shift();
const answer = [];

for (let num of nums) {
  const GCD = gcd(std, num);
  answer.push(`${std / GCD}/${num / GCD}`);
}

console.log(answer.join("\n"));

// 최대공약수 구하는 함수
// 리턴되는 a가 최대 공약수.
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