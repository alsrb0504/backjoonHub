const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const MAX = 1100001;
const isPrime = new Array(MAX).fill(false);
isPrime[0] = true;
isPrime[1] = true;

for (let i = 2; i < MAX; i++) {
  if (isPrime[i]) continue;
  for (let j = i * 2; j < MAX; j += i) {
    isPrime[j] = true;
  }
}

const primes = [];

isPrime.forEach((el, idx) => {
  if (!el) primes.push(idx);
});

for (let i = 0; i < primes.length; i++) {
  const curr = primes[i];

  if (curr < N) continue;

  if (isPalendrom(curr)) {
    console.log(curr);
    break;
  }
}

function isPalendrom(num) {
  const nums = String(num).split("");
  let lt = 0;
  let rt = nums.length - 1;

  if (nums.length % 2 === 0) {
    // 짝수
    while (lt < rt) {
      if (nums[lt++] !== nums[rt--]) return false;
    }
  } else {
    // 홀수
    while (lt !== rt) {
      if (nums[lt++] !== nums[rt--]) return false;
    }
  }

  return true;
}
