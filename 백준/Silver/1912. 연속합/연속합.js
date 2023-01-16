const readFileSyncAddress = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncAddress).toString().split('\n');

let N = Number(input[0]);
let DP = input[1].split(' ').map(Number);

for(let i = 1; i < N; i++) {
  let cur = DP[i];
  let acc = DP[i - 1] + cur;

  if(cur < acc) {
    DP[i] = acc;
  } else {
    DP[i] = cur;
  }
}

console.log(Math.max(...DP));