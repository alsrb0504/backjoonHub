let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

// '/dev/stdin'
let num = [];

input[0].split(' ').forEach(el => {
  num.push(Number(el));
});
input[1].split(' ').forEach(el => {
  num.push(Number(el));
});
input[2].split(' ').forEach(el => {
  num.push(Number(el));
});

let x, y;

if(num[0] === num[2]) {
  x = num[4];
} else {
  if(num[0] === num[4]) {
    x = num[2];
  } else {
    x = num[0];
  }
}

if(num[1] === num[3]) {
  y = num[5];
} else {
  if(num[1] === num[5]) {
    y = num[3];
  } else {
    y = num[1];
  }
}

console.log(x, y);