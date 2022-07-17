const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

input.shift();
const nums = input.shift().split(" ").map(Number);
const lis = [nums[0]];

nums.forEach((n) => {
  // 뒤에 붙일 수 있는 경우.
  if (lis[lis.length - 1] < n) {
    lis.push(n);
  } else {
    binarySearch(n);
  }
});

console.log(lis.length);

function binarySearch(val) {
  let start = 0;
  let mid = Math.floor(lis.length / 2);
  let end = lis.length - 1;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (lis[mid] === val) {
      return;
    } else if (lis[mid] < val) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  lis[start] = val;
}