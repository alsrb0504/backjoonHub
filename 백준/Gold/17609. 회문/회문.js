const readFileSyncAddress =
  process.platform === "linux" ? "/dev/stdin" : "text.txt";

const input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trimEnd()
  .split("\n");

const N = Number(input[0]);
const answer = [];

for (let i = 1; i <= N; i++) {
  answer.push(solution(i));
}

console.log(answer.join("\n"));

function solution(line) {
  const str = input[line].trimEnd();

  if (isPalindrome(str)) return 0;

  const [leftRemove, rightRemove] = findRemovePosition(str);

  if (
    isPalindrome(str.slice(0, leftRemove) + str.slice(leftRemove + 1)) ||
    isPalindrome(str.slice(0, rightRemove) + str.slice(rightRemove + 1))
  )
    return 1;
  return 2;
}

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left <= right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      return false;
    }
  }

  return true;
}

function findRemovePosition(str) {
  let left = 0;
  let right = str.length - 1;

  while (left <= right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      return [left, right];
    }
  }

  return [0, 0];
}
