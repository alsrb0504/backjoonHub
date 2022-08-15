let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const testCase = Number(input[0]);
let result = "";

for(let i = 1; i <= testCase; i++) {

  let m = input[i].split(' ').map(word => word.trim().split('').reverse().join(''));

  result += m.join(' ') + '\n';

}

console.log(result.trim());