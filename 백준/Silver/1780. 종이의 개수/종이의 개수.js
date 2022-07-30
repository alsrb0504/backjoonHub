const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  // .trim()
  .split("\n");

const N = input.shift();
// 입력 종이를 위한 배열
let map = [];

// 결과를 저장할 map
const cntMap = new Map();
cntMap.set(-1, 0);
cntMap.set(0, 0);
cntMap.set(1, 0);

// 종이 정보 입력 받기
for (let i = 0; i < N; i++) {
  map[i] = [];

  input[i]
    .split(" ")
    .map(Number)
    .forEach((val) => map[i].push(val));
}

// 나누는 함수 (재귀 시작)
function solution(arr) {
  // 예외 : 크키가 1 * 1인 경우
  // 개수 count.
  if (arr.length === 1) {
    cntMap.set(arr[0], cntMap.get(arr[0]) + 1);
  }

  // 3 * 3 분할을 위해 3으로 나눈 값을 구함.
  const splitCnt = Math.floor(arr.length / 3);

  // 9등분 재귀 시작.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const splitArr = [];

      // 각 구역의 시작과 끝 위치 파악
      const yStart = splitCnt * i;
      const yEnd = splitCnt * (i + 1);
      const xStart = splitCnt * j;
      const xEnd = splitCnt * (j + 1);

      // 각 배열의 y축을 위한 변수.
      let col = 0;

      // 9등분 배열을 구하고
      for (let y = yStart; y < yEnd; y++) {
        splitArr[col] = [];

        for (let x = xStart; x < xEnd; x++) {
          splitArr[col].push(arr[y][x]);
        }

        col++;
      }

      // 확인해서 모든 원소가 같으면 개수 count
      // 아니면 재귀
      if (checkArr(splitArr, splitCnt)) {
        const val = splitArr[0][0];
        cntMap.set(val, cntMap.get(val) + 1);
      } else {
        solution(splitArr);
      }
    }
  }
}

// 배열의 모든 원소가 같은지 확인하는 정복 부분.
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

// 예외 처리: 시작부터 배열의 모든 원소가 같은 경우 하나만 count
// 아니면 분할 정복 시작
if (checkArr(map, map.length)) {
  const val = map[0][0];
  cntMap.set(val, cntMap.get(val) + 1);
} else {
  solution(map);
}

// 결과 출력
let result = "";
cntMap.forEach((val) => (result += val + "\n"));
console.log(result.trimEnd());