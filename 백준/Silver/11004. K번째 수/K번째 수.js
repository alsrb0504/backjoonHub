let input = require('fs').readFileSync('/dev/stdin').toString().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
nums.sort((a, b) => a - b);

console.log(nums[k - 1]);