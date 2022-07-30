const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = input.shift();
let map = [];
const cntMap = new Map();
cntMap.set(-1, 0);
cntMap.set(0, 0);
cntMap.set(1, 0);

for (let i = 0; i < N; i++) {
  map[i] = [];

  input[i]
    .split(" ")
    .map(Number)
    .forEach((val) => map[i].push(val));
}

function solution(arr) {
  if (arr.length === 1) {
    cntMap.set(arr[0], cntMap.get(arr[0]) + 1);
  }

  const splitCnt = Math.floor(arr.length / 3);

  for (let i = 0; i < 3; i++) {
    // const splitCnt = split;

    for (let j = 0; j < 3; j++) {
      const splitArr = [];

      const yStart = splitCnt * i;
      const yEnd = splitCnt * (i + 1);
      const xStart = splitCnt * j;
      const xEnd = splitCnt * (j + 1);

      let col = 0;

      for (let y = yStart; y < yEnd; y++) {
        splitArr[col] = [];

        for (let x = xStart; x < xEnd; x++) {
          splitArr[col].push(arr[y][x]);
        }

        col++;
      }

      if (checkArr(splitArr, splitCnt)) {
        const val = splitArr[0][0];
        cntMap.set(val, cntMap.get(val) + 1);
      } else {
        solution(splitArr);
      }
    }
  }
}

function checkArr(arr, length) {
  const val = arr[0][0];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (val !== arr[i][j]) {
        return false;
      }
    }
  }

  return true;
}

if (checkArr(map, map.length)) {
  const val = map[0][0];
  cntMap.set(val, cntMap.get(val) + 1);
} else {
  solution(map);
}

let result = "";

cntMap.forEach((val) => (result += val + "\n"));

console.log(result.trimEnd());