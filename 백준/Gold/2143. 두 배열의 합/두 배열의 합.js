const readFileSyncAddress = '/dev/stdin';
let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const T = Number(input[0]);
const A = input[2].split(" ").map(Number);
const B = input[4].split(" ").map(Number);

const Amap = new Map();
const Bmap = new Map();

let answer = 0;

function addAMap(num) {
  if (Amap.get(num)) Amap.set(num, Amap.get(num) + 1);
  else Amap.set(num, 1);
}

function addBMap(num) {
  if (Bmap.get(num)) Bmap.set(num, Bmap.get(num) + 1);
  else Bmap.set(num, 1);
}

for (let i = 0; i < A.length; i++) {
  let acc = 0;

  for (let j = i; j < A.length; j++) {
    acc += A[j];

    addAMap(acc);
  }
}

for (let i = 0; i < B.length; i++) {
  let acc = 0;

  for (let j = i; j < B.length; j++) {
    acc += B[j];
    addBMap(acc);
  }
}

[...Amap.keys()].forEach((aVal) => {
  const diff = T - aVal;

  if (Bmap.get(diff)) {
    answer += Amap.get(aVal) * Bmap.get(diff);
  }
});

console.log(answer);