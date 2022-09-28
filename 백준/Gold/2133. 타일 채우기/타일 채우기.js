const readFileSyncAddress = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncAddress).toString();

const n = Number(input);
const DP = new Array(n + 1).fill(0);
DP[0] = 1, DP[2] = 3;

for(let i = 4; i <=n; i += 2) {
  DP[i] += DP[i-2] * DP[2];

  for(let j = i - 4; j >= 0; j -=2 ) {
    DP[i] += DP[j] * 2;
  }
}

console.log(DP[n]);