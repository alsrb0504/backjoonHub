const readFileSyncAddress = "/dev/stdin";
const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const lis = []; // 가장 큰 증가하는 수열 => 크기만 확인 가능.
const index = new Array(n).fill(0); // 순서 저장할 배열.

lis.push(arr[0]);

for (let i = 1; i < arr.length; i++) {
  // 이분 탐색으로 위치 찾기.
  let left = 0,
    right = lis.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[i] > lis[mid]) left = mid + 1;
    else right = mid;
  }

  if (right === lis.length) {
    lis.push(arr[i]);
  } else {
    lis[right] = arr[i];
  }

  // 순서 저장
  index[i] = right;
}

// 최장 부분 수열 찾기
const answer = [];
let cnt = lis.length - 1;
let start_idx = 0;

// 시작위치 찾기.
for (let i = n - 1; i >= 0; i--) {
  if (index[i] === cnt) {
    answer.push(arr[i]);
    start_idx = i;
    break;
  }
}

cnt--;
while (cnt >= 0 && start_idx >= 0) {
  if (index[start_idx] === cnt) {
    cnt--;
    answer.push(arr[start_idx]);
  }

  start_idx--;
}

console.log(lis.length + "\n" + answer.reverse().join(" "));