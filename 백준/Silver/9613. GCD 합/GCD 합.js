const readFileSyncAddress = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncAddress).toString().trim('').split('\n');

const testCase = Number(input[0]);
let result = "";

for(let i = 1; i <= testCase; i++) {
  solution(input[i].split(' ').map(el => Number(el)));
}

function solution(data) {
  let count = data.shift();
  data.sort((a, b) => a - b);
  
  let gcds = [];
  
  for(let i = 0; i < count - 1; i++) {
    for(let j = i + 1; j < count; j++) {
      let a = data[i];
      let b = data[j];

      // gcd
      while(b !== 0) {
        let temp = a % b;
        a = b;
        b = temp;
      }
      gcds.push(a);
    }
  }
  result += gcds.reduce((acc, cur) => acc + cur) + '\n';
}
console.log(result.trimEnd());