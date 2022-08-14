const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

// const N = Number(input[0]);

let nums = input[1].trimEnd().split(" ").map(Number);

let cnt = 0;

// console.log(`result : ${mergeSort(nums)}`);
// console.log(`cnt = ${cnt}`);

mergeSort(nums);

console.log(cnt);

function mergeSort(arr) {
  const length = arr.length;

  if (length === 1) {
    return arr;
  } else {
    const mid = Math.floor(length / 2);

    // mergeSort(arr.slice(0, mid));
    // mergeSort(arr.slice(mid));

    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
  }
}

function merge(leftArr, rightArr) {
  const mergeArr = [];

  let leftIdx = 0;
  // let rightIdx = leftArr.length;
  let rightIdx = 0;

  // console.log(leftArr);
  // console.log(rightArr);

  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    if (leftArr[leftIdx] <= rightArr[rightIdx]) {
      mergeArr.push(leftArr[leftIdx]);
      leftIdx++;
    } else {
      mergeArr.push(rightArr[rightIdx]);

      cnt += leftArr.length - mergeArr.length + rightIdx + 1;

      // console.log(`inerval leftArr.length = ${leftArr.length}`);
      // console.log(`inerval mergeArr.length = ${mergeArr.length}`);
      // console.log(`inerval rightIdx = ${rightIdx}`);

      // console.log(`inerval cnt = ${cnt}`);

      rightIdx++;
    }
  }

  while (leftIdx < leftArr.length) {
    mergeArr.push(leftArr[leftIdx++]);
  }

  while (rightIdx < rightArr.length) {
    mergeArr.push(rightArr[rightIdx++]);
  }

  // console.log(`mergeArr : ${mergeArr}`);

  return mergeArr;
}