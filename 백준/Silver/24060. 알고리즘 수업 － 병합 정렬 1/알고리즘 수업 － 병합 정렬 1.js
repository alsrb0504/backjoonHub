const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n")
  .map((el) => el.trimEnd());

const [N, K] = input[0].split(" ").map(Number);
const data = input[1].split(" ").map(Number);
let answer = -1;
let mergeCnt = 0;
mergeSort(data);

console.log(answer);

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }

  let mid = Math.ceil(arr.length / 2);
  let leftArray = arr.slice(0, mid);
  let rightArray = arr.slice(mid);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

function merge(left, right) {
  let resultArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      mergeCnt++;
      if (mergeCnt === K) {
        answer = left[leftIndex];
      }

      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      mergeCnt++;
      if (mergeCnt === K) {
        answer = right[rightIndex];
      }

      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    mergeCnt++;

    if (mergeCnt === K) {
      answer = left[leftIndex];
    }

    resultArray.push(left[leftIndex++]);
  }

  while (rightIndex < right.length) {
    mergeCnt++;

    if (mergeCnt === K) {
      answer = right[rightIndex];
    }

    resultArray.push(right[rightIndex++]);
  }

  return resultArray;
}
