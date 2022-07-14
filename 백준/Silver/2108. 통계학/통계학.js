const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());

const map = new Map();
const arr = [];
let sum = 0;

for (let i = 0; i < N; i++) {
  const num = Number(input[i]);

  if (map.has(num)) {
    map.set(num, map.get(num) + 1);
  } else {
    map.set(num, 1);
  }

  arr.push(num);
  sum += num;
}

arr.sort((a, b) => a - b);

let most = 0;
// let mostNum = 0;
// 최빈값
let mode = [];

map.forEach((val, key) => {
  if (most < val) {
    most = val;
    // mostNum = key;
    mode = [key];
  } else if (most === val) {
    mode.push(key);
  }
});

mode.sort((a, b) => a - b);
console.log(Math.round(sum / N) === 0 ? 0 : Math.round(sum / N));
console.table(arr[Math.floor(N / 2)]);
console.log(mode.length === 1 ? mode[0] : mode[1]);
console.log(arr[arr.length - 1] - arr[0]);
