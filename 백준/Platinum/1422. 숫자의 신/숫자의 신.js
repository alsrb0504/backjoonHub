const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const [K, N] = input[0].split(" ").map(Number);
const nums = input
  .slice(1, 1 + K)
  .map(Number)
  .sort((a, b) => b - a);

const max = Math.max(...nums);
const answer = [];

nums.sort((a, b) => {
  let a_str = a.toString();
  let b_str = b.toString();

  if (a_str === b_str) {
    return b - a;
  } else {
    const ab = BigInt(a_str + b_str);
    const ba = BigInt(b_str + a_str);

    if (ab > ba) {
      return a - b;
    } else {
      return b - a;
    }
  }
});

const rest = N - K;
let rest_cnt = 0;

for (let i = 0, idx = 0; i < N; i++) {
  const cur = nums[i];

  if (nums[i] === max && rest_cnt < rest) {
    answer.push(max);
    i--;
    rest_cnt++;
  } else {
    answer.push(cur);
  }
}

console.log(answer.join(""));