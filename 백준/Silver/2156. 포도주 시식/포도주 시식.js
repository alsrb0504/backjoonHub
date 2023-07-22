const readFileSyncAddress = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncAddress).toString().split('\n').map(Number);

const testCase = input[0];
let DP = new Array(testCase + 1).fill(0);
DP[1] = input[1];
DP[2] = input[1] + input[2];

for(let i = 3; i <= testCase; i++) {
  DP[i] = Math.max(DP[i - 1], (DP[i - 3] + input[i - 1] + input[i]), (DP[i - 2] + input[i]));
}

console.log(Math.max(...DP));