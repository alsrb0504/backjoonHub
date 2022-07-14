const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());

// 최빈값을 확인하기 위한 map
const map = new Map();

// 값들을 넣을 배열(arr)과 값들의 합을 위한 변수(sum)
const arr = [];
let sum = 0;

// 모든 입력값에 대한 연산
for (let i = 0; i < N; i++) {
  const num = Number(input[i]);

  // 최빈값을 위해
  // map에 key로 현재값이 존재한다면 값을 + 1
  // 현재값이 key로 존재하지 않는다면 key로 걸정하고 값에 1 설정.
  if (map.has(num)) {
    map.set(num, map.get(num) + 1);
  } else {
    map.set(num, 1);
  }

  // 배열에 현재값 삽입과 값 누적.
  arr.push(num);
  sum += num;
}

// 중앙값을 구하기 위해 오름차순으로 정렬.
arr.sort((a, b) => a - b);

// 최빈값이 여러개일 경우를 위한 최빈값 배열 mode
// 와 최빈값을 구하기 위한 변수(most)
let mode = [];
let most = 0;

// 1. map을 순회하며 most 보다 큰 최빈값이 존재한다면
//    최빈값 배열 갱신 및 most 값 재설정.
// 2. 만약 most 값과 동일한 최빈값이 존재한다면
//    최빈값 배열에 key 값 삽입.
map.forEach((val, key) => {
  if (most < val) {
    most = val;
    mode = [key];
  } else if (most === val) {
    mode.push(key);
  }
});

// 최빈값이 여러 개일 경우 두 번째로 작은 값을 출력해야 하므로
// 최빈값 배열을 오름차순으로 정렬.
mode.sort((a, b) => a - b);

// 산술 평균 : Math.round로 반올림,
// (예외 0이 -0으로 출력되는 경우가 있어서 0으로 변경해줌.)
console.log(Math.round(sum / N) === 0 ? 0 : Math.round(sum / N));
console.table(arr[Math.floor(N / 2)]);
// 최빈값이 여러 개일 경우 두 번째로 작은 최빈값 출력.
console.log(mode.length === 1 ? mode[0] : mode[1]);
console.log(arr[arr.length - 1] - arr[0]);
