const readFileSyncAddress = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncAddress).toString().split('\n');

let length = Number(input[0]);
let arr = input[1].split(' ').map(Number);
let DP = new Array(length).fill(1);

for(let i = 1; i < length; i++) {
  let cur = arr[i];
  let d = [0];

  for(let j = 0; j < i; j++) {
    if(arr[j] < cur) {
      d.push(DP[j]);
    }
  }
  DP[i] = Math.max.apply(null, d) + 1;
}

console.log(Math.max.apply(null, DP));