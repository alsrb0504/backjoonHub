const readFileSyncAddress = '/dev/stdin';

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());
const nums = [];

for (let i = 0; i < N; i++) {
  const num = Number(input[i]);
  nums.push(num);
}

nums.sort((a, b) => a - b);

let answer = 0;

for (let i = 0; i < nums.length; ) {
  const cur = nums[i];

  if (i === nums.length - 1) {
    answer += cur;
    break;
  }

  const next = nums[i + 1];

  if (cur < 0 && next < 0) {
    answer += cur * next;
    i += 2;
  } else if (cur < 0 && next === 0) {
    i += 2;
  } else if (cur < 0 && next > 0) {
    const rest = (nums.length - i) % 2;

    if (rest !== 0) {
      answer += cur;
      i++;
    } else {
      answer += cur + next;
      i += 2;
    }
  } else if (cur === 0) {
    i++;
  } else if (cur > 0 && next > 0) {
    if (cur === 1 && next === 1) {
      answer += 2;
      i += 2;
    } else if (cur === 1 && next !== 1) {
      answer += 1;
      i++;
    } else {
      const rest = (nums.length - i) % 2;

      if (rest === 1) {
        answer += cur;
        i++;
      } else {
        answer += cur * next;
        i += 2;
      }
    }
  }
}

console.log(answer);